import path from "path";
import sharp from "sharp";
export default async function ConvertToPng(
  inputFilePath: string,
  width: number,
  height: number,
) {
  const outputFilePath = path.parse(inputFilePath);
  console.log(outputFilePath);
  const data = await sharp(inputFilePath)
    .toFormat("png")
    .resize({
      width,
      height,
    })
    .toFile(
      `${outputFilePath.dir}/${outputFilePath.name}-${width.toString()}x${height.toString()}.png`,
    );
}
