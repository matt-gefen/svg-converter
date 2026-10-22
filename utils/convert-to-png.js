import path from "path";
import sharp from "sharp";
export default async function ConvertToPng(inputFilePath, width, height) {
  const outputFilePath = path.parse(inputFilePath);
  console.log(outputFilePath);
  const data = await sharp(inputFilePath)
    .toFormat("png")
    .resize({
      width,
      height,
      options: {
        fit: "cover",
      },
    })
    .toFile(
      `${outputFilePath.dir}/${outputFilePath.name}-${width.toString()}x${height.toString()}.png`,
    );
}
