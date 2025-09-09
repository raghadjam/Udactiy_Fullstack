import request from "supertest";
import app from "../../server";
import path from "path";
import fs from "fs";

describe("GET /api/images", () => {
  it("should return 400 if filename missing", async () => {
    const res = await request(app).get("/api/images?width=100&height=100");
    expect(res.status).toBe(400);
    expect(res.text).toBe("Filename is required");
  });

  it("should return 404 if file does not exist", async () => {
    const res = await request(app).get(
      "/api/images?filename=doesnotexist&width=100&height=100",
    );
    expect(res.status).toBe(404);
    expect(res.text).toBe("File does not exist");
  });

  it("should return 400 if width is a negative value", async () => {
    const res = await request(app).get(
      "/api/images?filename=fjord&width=-100&height=100",
    );
    expect(res.status).toBe(400);
    expect(res.text).toBe("Invalid width");
  });

  it("should return 400 if width is zero", async () => {
    const res = await request(app).get(
      "/api/images?filename=fjord&width=0&height=100",
    );
    expect(res.status).toBe(400);
    expect(res.text).toBe("Invalid width");
  });

  it("should return 400 if width is non numeric value", async () => {
    const res = await request(app).get(
      "/api/images?filename=fjord&width=W&height=100",
    );
    expect(res.status).toBe(400);
    expect(res.text).toBe("Invalid width");
  });

  it("should return 400 if height is a negative value", async () => {
    const res = await request(app).get(
      "/api/images?filename=fjord&width=100&height=-100",
    );
    expect(res.status).toBe(400);
    expect(res.text).toBe("Invalid height");
  });

  it("should return 400 if height is zero", async () => {
    const res = await request(app).get(
      "/api/images?filename=fjord&width=100&height=0",
    );
    expect(res.status).toBe(400);
    expect(res.text).toBe("Invalid height");
  });

  it("should return 400 if height is a non numeric value", async () => {
    const res = await request(app).get(
      "/api/images?filename=fjord&width=100&height=H",
    );
    expect(res.status).toBe(400);
    expect(res.text).toBe("Invalid height");
  });

  it("should resize the image", async () => {
    const res = await request(app).get(
      "/api/images?filename=fjord&width=250&height=250",
    );
    expect(res.status).toBe(200);
    const output = path.resolve(
      __dirname,
      "../../../thumbnails/fjord_250_250.jpg",
    );
    expect(fs.existsSync(output)).toBeTrue();
    if (fs.existsSync(output)) {
      fs.unlinkSync(output);
    }
  });
});
