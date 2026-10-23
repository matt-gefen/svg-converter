#!/usr/bin/env node
import { program } from "commander";
import ConvertToPng from "./utils/convert-to-png.js";
import { number } from "@inquirer/prompts";
import FileSearchPrompt from "./utils/file-search.ts";

const main = async () => {
  program.version("0.0.1").description("Image Conversion");
  // input file
  // output type
  // output file name (will be saved to the same directory as original)
  // resize?
  // if so what width and height
  // fit type?
  program.action(async () => {
    const inputPath = await FileSearchPrompt();
    const width = await number({ message: "Input height (px)" });
    const height = await number({ message: "Input width (px)" });
    ConvertToPng(inputPath, width, height);
  });

  program.parse(process.argv);
};

main().catch(console.error);
