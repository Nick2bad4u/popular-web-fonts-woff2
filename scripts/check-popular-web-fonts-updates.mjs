#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const POPULAR_FONTS_LIST_API =
    "https://gwfh.mranftl.com/api/fonts?sort=popularity";
const DEFAULT_LIMIT = 200;

const repoRoot = process.cwd();
const metadataFile = resolve(
    repoRoot,
    "fonts",
    "original",
    ".source-metadata.json"
);

const asJson = process.argv.includes("--json");
const failOnUpdate = process.argv.includes("--fail-on-update");

/**
 * @param {string} key
 *
 * @returns {string | undefined}
 */
function readStringFlag(key) {
    const flagIndex = process.argv.indexOf(`--${key}`);
    if (flagIndex === -1) {
        return undefined;
    }

    const raw = process.argv[flagIndex + 1];
    if (typeof raw !== "string" || raw.trim().length === 0) {
        throw new Error(`--${key} requires a non-empty value.`);
    }

    return raw.trim();
}

/**
 * @param {string | undefined} raw
 * @param {number} fallback
 *
 * @returns {number}
 */
function parseInteger(raw, fallback) {
    if (typeof raw !== "string") {
        return fallback;
    }

    const parsed = Number.parseInt(raw, 10);
    if (!Number.isFinite(parsed)) {
        throw new TypeError(`Invalid integer value: ${raw}`);
    }

    return parsed;
}

/**
 * @returns {{ limit: number }}
 */
function parseOptions() {
    const limit = parseInteger(readStringFlag("limit"), DEFAULT_LIMIT);
    if (limit < 1 || limit > 500) {
        throw new RangeError(
            `--limit must be between 1 and 500. Received: ${String(limit)}`
        );
    }

    return { limit };
}

/**
 * @returns {{
 *     downloadedAt?: string;
 *     downloadedFamilies?: {
 *         family?: string;
 *         id?: string;
 *         lastModified?: string;
 *     }[];
 *     limit?: number;
 * } | null}
 */
function readLocalMetadata() {
    if (!existsSync(metadataFile)) {
        return null;
    }

    const parsed = JSON.parse(readFileSync(metadataFile, "utf8"));
    if (typeof parsed !== "object" || parsed === null) {
        return null;
    }

    return parsed;
}

/**
 * @returns {Promise<
 *     { family?: string; id?: string; lastModified?: string }[]
 * >}
 */
async function fetchPopularityList() {
    const response = await fetch(POPULAR_FONTS_LIST_API);
    if (!response.ok) {
        throw new Error(
            `Request failed (${response.status}): ${POPULAR_FONTS_LIST_API}`
        );
    }

    const payload = await response.json();
    if (!Array.isArray(payload)) {
        throw new TypeError("Unexpected popularity API response shape.");
    }

    return /** @type {{ family?: string; id?: string; lastModified?: string }[]} */ (
        payload
    );
}

/**
 * @param {{ family?: string; id?: string; lastModified?: string }[]} families
 * @param {number} limit
 *
 * @returns {string[]}
 */
function toComparableSnapshot(families, limit) {
    return families.slice(0, limit).map((entry) => {
        const id =
            typeof entry.id === "string" && entry.id.length > 0
                ? entry.id
                : "(missing-id)";
        const family =
            typeof entry.family === "string" && entry.family.length > 0
                ? entry.family
                : "(missing-family)";
        const lastModified =
            typeof entry.lastModified === "string" &&
            entry.lastModified.length > 0
                ? entry.lastModified
                : "(missing-lastModified)";
        return `${id}::${family}::${lastModified}`;
    });
}

/**
 * @returns {Promise<void>}
 */
async function main() {
    const options = parseOptions();
    const localMeta = readLocalMetadata();
    const remoteFamilies = await fetchPopularityList();

    const localSnapshot =
        localMeta !== null && Array.isArray(localMeta.downloadedFamilies)
            ? toComparableSnapshot(localMeta.downloadedFamilies, options.limit)
            : [];
    const remoteSnapshot = toComparableSnapshot(remoteFamilies, options.limit);

    const updateAvailable =
        localSnapshot.length === 0 ||
        localSnapshot.join("\n") !== remoteSnapshot.join("\n") ||
        (typeof localMeta?.limit === "number" &&
            localMeta.limit !== options.limit);

    const result = {
        limit: options.limit,
        localDownloadedAt: localMeta?.downloadedAt ?? null,
        localEntries: localSnapshot.length,
        metadataFile,
        remoteEntries: remoteSnapshot.length,
        sourceProvider: "google-webfonts-helper-api",
        updateAvailable,
    };

    if (asJson) {
        process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    } else {
        process.stdout.write(`Source provider: google-webfonts-helper-api\n`);
        process.stdout.write(`Limit: ${String(options.limit)}\n`);
        process.stdout.write(
            `Local downloaded at: ${result.localDownloadedAt ?? "(missing metadata)"}\n`
        );
        process.stdout.write(
            `Compared entries: ${String(result.remoteEntries)}\n`
        );
        process.stdout.write(
            `Update available: ${updateAvailable ? "yes" : "no"}\n`
        );
        process.stdout.write(`Metadata file: ${metadataFile}\n`);
    }

    if (updateAvailable && failOnUpdate) {
        process.exitCode = 2;
    }
}

try {
    await main();
} catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(`Error: ${message}\n`);
    process.exitCode = 1;
}
