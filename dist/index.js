import { program } from "commander";
import ConvertToPng from "./utils/convert-to-png";
import { number, select } from "@inquirer/prompts";
import FileSearchPrompt from "./utils/file-search";
import { imageFileExtensions } from "./utils/types";
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
        const outputType = await select({
            message: "What output type?",
            choices: imageFileExtensions,
        });
        const width = await number({ message: "Input height (px)" });
        const height = await number({ message: "Input width (px)" });
        ConvertToPng(inputPath, width || 200, height || 200);
    });
    program.parse(process.argv);
};
main().catch(console.error);
