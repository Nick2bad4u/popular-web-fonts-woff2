#!/usr/bin/env node

import {
    existsSync,
    mkdirSync,
    readdirSync,
    statSync,
    writeFileSync,
} from "node:fs";
import { join, resolve } from "node:path";

const POPULAR_FONTS_LIST_API =
    "https://gwfh.mranftl.com/api/fonts?sort=popularity";
const POPULAR_FONT_DETAIL_API = "https://gwfh.mranftl.com/api/fonts";
const DEFAULT_LIMIT = 200;
const MAX_LIMIT = 500;

const repoRoot = process.cwd();
const destinationDir = resolve(repoRoot, "fonts", "original");

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
 * @param {string} key
 *
 * @returns {boolean}
 */
function hasFlag(key) {
    return process.argv.includes(`--${key}`);
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
 * @returns {{
 *     allVariants: boolean;
 *     force: boolean;
 *     includeVariants: readonly string[];
 *     limit: number;
 *     maxVariantsPerFamily: number;
 * }}
 */
function parseOptions() {
    const limit = parseInteger(readStringFlag("limit"), DEFAULT_LIMIT);
    if (limit < 1 || limit > MAX_LIMIT) {
        throw new RangeError(
            `--limit must be between 1 and ${MAX_LIMIT}. Received: ${String(limit)}`
        );
    }

    const maxVariantsPerFamily = parseInteger(
        readStringFlag("max-variants"),
        4
    );
    if (maxVariantsPerFamily < 1 || maxVariantsPerFamily > 20) {
        throw new RangeError(
            `--max-variants must be between 1 and 20. Received: ${String(maxVariantsPerFamily)}`
        );
    }

    const includeVariantsRaw = readStringFlag("include-variants");
    const includeVariants =
        typeof includeVariantsRaw === "string"
            ? includeVariantsRaw
                  .split(",")
                  .map((part) => part.trim())
                  .filter((part) => part.length > 0)
            : [];

    const allVariants = hasFlag("all-variants");
    const force = hasFlag("force");

    return {
        allVariants,
        force,
        includeVariants,
        limit,
        maxVariantsPerFamily,
    };
}

/**
 * @param {string} familyName
 *
 * @returns {string}
 */
function toFamilyFolderName(familyName) {
    const collapsed = familyName.replaceAll(" ", "");
    const safe = collapsed.replaceAll(/[^A-Za-z0-9_-]/gu, "");
    return safe.length > 0 ? safe : "UnknownFamily";
}

/**
 * @param {string} url
 *
 * @returns {string}
 */
function ensureHttps(url) {
    return url.replace(/^http:\/\//iu, "https://");
}

/**
 * @param {readonly string[]} available
 * @param {readonly string[]} includeVariants
 * @param {number} maxVariantsPerFamily
 *
 * @returns {string[]}
 */
function pickVariants(available, includeVariants, maxVariantsPerFamily) {
    if (includeVariants.length > 0) {
        const includeSet = new Set(includeVariants);
        const selected = available.filter((variant) => includeSet.has(variant));
        if (selected.length > 0) {
            return selected.slice(0, maxVariantsPerFamily);
        }
    }

    const preferredOrder = [
        "regular",
        "500",
        "600",
        "700",
        "italic",
        "500italic",
        "600italic",
        "700italic",
    ];

    /** @type {string[]} */
    const result = [];
    for (const preferred of preferredOrder) {
        if (available.includes(preferred) && !result.includes(preferred)) {
            result.push(preferred);
        }

        if (result.length >= maxVariantsPerFamily) {
            return result;
        }
    }

    for (const variant of available) {
        if (!result.includes(variant)) {
            result.push(variant);
        }

        if (result.length >= maxVariantsPerFamily) {
            break;
        }
    }

    return result;
}

/**
 * @param {string} url
 *
 * @returns {Promise<unknown>}
 */
async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Request failed (${response.status}): ${url}`);
    }

    return response.json();
}

/**
 * @param {string} url
 *
 * @returns {Promise<Uint8Array>}
 */
async function fetchBinary(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Request failed (${response.status}): ${url}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
}

/**
 * @param {string} directory
 *
 * @returns {number}
 */
function countSourceFonts(directory) {
    const queue = [directory];
    let count = 0;

    while (queue.length > 0) {
        const current = queue.shift();
        if (typeof current !== "string") {
            continue;
        }

        for (const entry of readdirSync(current, { withFileTypes: true })) {
            const absolutePath = join(current, entry.name);
            if (entry.isDirectory()) {
                queue.push(absolutePath);
            } else if (entry.isFile() && /\.(?:otf|ttf)$/iu.test(entry.name)) {
                count += 1;
            }
        }
    }

    return count;
}

/**
 * @typedef {{
 *     family?: string;
 *     id?: string;
 *     lastModified?: string;
 * }} PopularFontSummary
 */

/**
 * @typedef {{
 *     id?: string;
 *     family?: string;
 *     lastModified?: string;
 *     variants?: { id?: string; ttf?: string }[];
 * }} PopularFontDetail
 */

/**
 * @returns {Promise<void>}
 */
async function main() {
    const options = parseOptions();

    process.stdout.write("Fetching popularity-ranked web fonts catalog...\n");

    const listResponse = await fetchJson(POPULAR_FONTS_LIST_API);
    if (!Array.isArray(listResponse) || listResponse.length === 0) {
        throw new Error("No font families returned by popularity API.");
    }

    const selectedFamilies = /** @type {PopularFontSummary[]} */ (
        listResponse.slice(0, options.limit)
    );

    mkdirSync(destinationDir, { recursive: true });

    /** @type {string[]} */
    const failures = [];
    /**
     * @type {{
     *     family: string;
     *     id: string;
     *     variants: string[];
     *     lastModified?: string;
     * }[]}
     */
    const downloadedFamilies = [];

    let downloadedFiles = 0;
    let skippedExistingFiles = 0;

    let processedCount = 0;
    for (const summary of selectedFamilies) {
        processedCount += 1;
        const familyId = summary.id;

        if (typeof familyId !== "string" || familyId.length === 0) {
            failures.push(
                `Family at position ${String(processedCount)} is missing id.`
            );
            continue;
        }

        const detailUrl = `${POPULAR_FONT_DETAIL_API}/${encodeURIComponent(familyId)}`;
        let detail;
        try {
            detail = /** @type {PopularFontDetail} */ (
                await fetchJson(detailUrl)
            );
        } catch (error) {
            const message =
                error instanceof Error ? error.message : String(error);
            failures.push(`${familyId}: failed to fetch detail (${message})`);
            continue;
        }

        const familyName =
            typeof detail.family === "string" && detail.family.length > 0
                ? detail.family
                : typeof summary.family === "string" &&
                    summary.family.length > 0
                  ? summary.family
                  : familyId;
        const familyFolder = toFamilyFolderName(familyName);
        const familyDir = resolve(destinationDir, familyFolder);
        mkdirSync(familyDir, { recursive: true });

        const variantEntries = Array.isArray(detail.variants)
            ? detail.variants
            : [];
        const availableVariantIds = variantEntries
            .map((entry) =>
                typeof entry.id === "string" && entry.id.length > 0
                    ? entry.id
                    : ""
            )
            .filter((entry) => entry.length > 0);

        const pickedVariants = options.allVariants
            ? availableVariantIds
            : pickVariants(
                  availableVariantIds,
                  options.includeVariants,
                  options.maxVariantsPerFamily
              );

        for (const variantId of pickedVariants) {
            const variantEntry = variantEntries.find(
                (entry) => entry.id === variantId
            );
            const ttfUrl =
                variantEntry !== undefined &&
                typeof variantEntry.ttf === "string"
                    ? ensureHttps(variantEntry.ttf)
                    : "";

            if (ttfUrl.length === 0) {
                failures.push(`${familyName} (${variantId}): missing ttf URL`);
                continue;
            }

            const targetFileName = `${familyFolder}-${variantId}.ttf`;
            const targetPath = resolve(familyDir, targetFileName);

            if (!options.force && existsSync(targetPath)) {
                const existingStats = statSync(targetPath);
                if (existingStats.isFile() && existingStats.size > 0) {
                    skippedExistingFiles += 1;
                    continue;
                }
            }

            try {
                const data = await fetchBinary(ttfUrl);
                writeFileSync(targetPath, data);
                downloadedFiles += 1;
            } catch (error) {
                const message =
                    error instanceof Error ? error.message : String(error);
                failures.push(`${familyName} (${variantId}): ${message}`);
            }
        }

        const downloadedFamily = {
            family: familyName,
            id: familyId,
            variants: pickedVariants,
            ...(typeof detail.lastModified === "string"
                ? { lastModified: detail.lastModified }
                : {}),
        };

        downloadedFamilies.push(downloadedFamily);

        if (
            processedCount % 25 === 0 ||
            processedCount === selectedFamilies.length
        ) {
            process.stdout.write(
                `  Processed ${String(processedCount)}/${String(selectedFamilies.length)} families\n`
            );
        }
    }

    if (
        !existsSync(destinationDir) ||
        !statSync(destinationDir).isDirectory()
    ) {
        throw new Error(`Destination directory is missing: ${destinationDir}`);
    }

    const sourceCount = countSourceFonts(destinationDir);

    const metadata = {
        downloadedAt: new Date().toISOString(),
        downloadedFamilies,
        allVariants: options.allVariants,
        force: options.force,
        limit: options.limit,
        maxVariantsPerFamily: options.maxVariantsPerFamily,
        selectedFamilyCount: selectedFamilies.length,
        sort: "popularity",
        sourceCount,
        sourceProvider: "google-webfonts-helper-api",
        sourceRepo: POPULAR_FONTS_LIST_API,
    };
    writeFileSync(
        resolve(destinationDir, ".source-metadata.json"),
        `${JSON.stringify(metadata, null, 2)}\n`,
        "utf8"
    );

    process.stdout.write(
        `Downloaded popular web fonts into: ${destinationDir}\n`
    );
    process.stdout.write(`Selected families: ${selectedFamilies.length}\n`);
    process.stdout.write(
        `Skipped existing source files: ${skippedExistingFiles}\n`
    );
    process.stdout.write(`Downloaded source files: ${downloadedFiles}\n`);
    process.stdout.write(`Detected source font files: ${sourceCount}\n`);
    process.stdout.write(
        `Force mode: ${options.force ? "enabled" : "disabled"}\n`
    );

    if (failures.length > 0) {
        process.stderr.write(
            `\nEncountered ${failures.length} download errors:\n`
        );
        for (const failure of failures.slice(0, 20)) {
            process.stderr.write(`  - ${failure}\n`);
        }

        if (failures.length > 20) {
            process.stderr.write(`  ... and ${failures.length - 20} more\n`);
        }

        process.exitCode = 1;
    }
}

try {
    await main();
} catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(`Error: ${message}\n`);
    process.exitCode = 1;
}
