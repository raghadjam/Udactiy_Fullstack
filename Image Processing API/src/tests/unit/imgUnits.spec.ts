import { resizeImage } from "../../utils/utils";
import fs from "fs";
import path from "path";

describe("resizeImage", () => {
  const input = path.resolve(__dirname, "../../../images/fjord.jpg");
  const output = path.resolve(
    __dirname,
    "../../../thumbnails/fjord_100_100.jpg",
  );

  it("should create a resized image", async () => {
    await resizeImage(input, output, 100, 100);
    expect(fs.existsSync(output)).toBeTrue();
    if (fs.existsSync(output)) {
      fs.unlinkSync(output);
    }
  });

  it("should throw an error for non-positive width", async () => {
    await expectAsync(resizeImage(input, output, 0, 100)).toBeRejectedWithError(
      "Expected positive integer for width but received 0 of type number",
    );
  });

  it("should throw an error for non-positive height", async () => {
    await expectAsync(resizeImage(input, output, 100, 0)).toBeRejectedWithError(
      "Expected positive integer for height but received 0 of type number",
    );
  });
});
