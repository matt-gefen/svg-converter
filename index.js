#!/usr/bin/env node
import path from "path";
import { program } from "commander";
import sharp from "sharp";

const main = async () => {
  program
    .version("1.0.0")
    .description("SVG to PNG Converter")
    .option("-c, --path <type>", "add file path to svg")
    .action(async (options) => {
      const inputFilePath = options.path;
      const outputFilePath = path.parse(inputFilePath);
      console.log(outputFilePath);
      const data = await sharp(inputFilePath)
        .toFormat("png")
        .toFile(`${outputFilePath.dir}/${outputFilePath.name}.png`);
      console.log(data);
    });
  program.parse(process.argv);
};

main().catch(console.error);
