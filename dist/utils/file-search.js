import { search } from "@inquirer/prompts";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { imageFileExtensions } from "./types";
const root = os.homedir();
async function fileExists(filepath) {
    return fs.access(filepath).then(() => true, () => false);
}
async function isDirectory(p) {
    try {
        return (await fs.stat(p)).isDirectory();
    }
    catch {
        return false; // ENOENT, EACCES, ENOTDIR — all mean "not usable"
    }
}
async function safeReaddir(dirPath) {
    try {
        return await fs.readdir(dirPath, { withFileTypes: true });
    }
    catch {
        return [];
    }
}
// Resolve the typed term, clamped inside root
function resolveStart(term) {
    const candidate = path.resolve(root, term);
    return candidate === root || candidate.startsWith(root + path.sep)
        ? candidate
        : root;
}
// Walk up until we find a real directory, never past root
async function nearestExistingDir(start) {
    let dirPath = start;
    while (dirPath !== root && !(await isDirectory(dirPath))) {
        const parent = path.dirname(dirPath);
        if (parent === dirPath)
            break; // filesystem root safety net
        dirPath = parent;
    }
    return (await isDirectory(dirPath)) ? dirPath : root;
}
export default async function FileSearchPrompt() {
    console.log("home", root);
    return search({
        message: "Select an image file",
        source: async (term = "") => {
            const dirPath = await nearestExistingDir(resolveStart(term));
            const entries = await safeReaddir(dirPath);
            const needle = term.toLowerCase();
            return entries
                .filter((entry) => {
                const isDotFile = entry.name.startsWith(".");
                const isEntryDirectory = entry.isDirectory();
                const ext = path.extname(entry.name).toLowerCase();
                const isImageType = imageFileExtensions.includes(ext);
                if (isDotFile || (!isEntryDirectory && !isImageType)) {
                    return false;
                }
                return path
                    .relative(root, path.join(dirPath, entry.name))
                    .toLowerCase()
                    .includes(needle);
            })
                .toSorted((a, b) => a.isDirectory() === b.isDirectory()
                ? a.name.localeCompare(b.name)
                : a.isDirectory()
                    ? -1
                    : 1)
                .map((entry) => ({
                name: path.relative(root, path.join(dirPath, entry.name)) +
                    (entry.isDirectory() ? "/" : ""),
                value: path.join(dirPath, entry.name),
            }))
                .slice(0, 250);
        },
        validate: async (selected) => {
            if (!(await fileExists(selected)) || (await isDirectory(selected))) {
                return "You must select a file";
            }
            return true;
        },
    });
}
