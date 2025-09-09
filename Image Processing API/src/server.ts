import express from "express";
import imagRoutes from "./routes/imgRoutes";

const app = express();
const port = 3000;

app.use("/api/images", imagRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
