import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import app from "./server";

const PORT = Number(process.env.PORT || 3001);

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`FinSight AI running on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("SERVER_START_ERROR:", error);
  process.exitCode = 1;
});
