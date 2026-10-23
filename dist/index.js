#!/usr/bin/env node
import { program } from "commander";
import ConvertToPng from "./utils/convert-to-png.js";
import { number, select } from "@inquirer/prompts";
import FileSearchPrompt from "./utils/file-search.js";
import { imageFileExtensions } from "./utils/types.js";
const main = async () => {
    program
        .version("0.0.1")
        .description("Image Conversion")
        .action(async () => {
        const inputPath = await FileSearchPrompt();
        const outputType = await select({
            message: "What output type?",
            choices: imageFileExtensions.map((ext) => ({ name: ext, value: ext })),
        });
        const width = await number({ message: "Input width (px)" });
        const height = await number({ message: "Input height (px)" });
        await ConvertToPng(inputPath.toString(), width || 0, height || 0); // ← Added await
    });
    program.parse(process.argv);
};
main().catch(console.error);
