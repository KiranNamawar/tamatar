// server.ts
import { serve } from "bun";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const port = 5000;
const distDir = "./dist";
const htmlFilePath = join(distDir, "index.html");
const htmlContent = readFileSync(htmlFilePath, "utf8");

serve({
	port,
	fetch(request) {
		const url = new URL(request.url);
		let filePath = join(distDir, url.pathname);

		// If root, serve index.html
		if (url.pathname === "/") {
			return new Response(htmlContent, {
				headers: { "Content-Type": "text/html; charset=utf-8" },
			});
		}

		// Try to serve static files
		if (existsSync(filePath) && !filePath.endsWith("/")) {
			const ext = filePath.split(".").pop();
			const contentType =
				(
					{
						js: "application/javascript",
						css: "text/css",
						html: "text/html",
						png: "image/png",
						jpg: "image/jpeg",
						jpeg: "image/jpeg",
						ico: "image/x-icon",
						json: "application/json",
						svg: "image/svg+xml",
					} as Record<string, string>
				)[ext ?? ""] || "application/octet-stream";

			return new Response(readFileSync(filePath), {
				headers: { "Content-Type": contentType },
			});
		}

		// Fallback to 404
		return new Response("404 Not Found", { status: 404 });
	},
	error(error) {
		console.error("Server error:", error);
		return new Response("Internal Server Error", { status: 500 });
	},
});

console.log(`Bun server listening on http://localhost:${port}`);
