#!/usr/bin/env node
import { program } from "commander";
import ConvertToPng from "./utils/convert-to-png.js";
import { number } from "@inquirer/prompts";
import FileSearchPrompt from "./utils/file-search.js";

const main = async () => {
  program.version("1.0.0").description("My Node CLI");

  program.action(async () => {
    const inputPath = await FileSearchPrompt();
    const width = await number({ message: "Input height (px)" });
    const height = await number({ message: "Input width (px)" });
    ConvertToPng(inputPath, width, height);
  });

  program.parse(process.argv);
};

main().catch(console.error);
