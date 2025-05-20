// server.ts
import { serve } from "bun";
import { readFileSync } from "node:fs"; // To read the HTML file

const port = 5000;
const htmlFilePath = "./dist/index.html"; // Path to your HTML file

// Read the HTML file once when the server starts
const htmlContent = readFileSync(htmlFilePath, "utf8");

serve({
	port,
	fetch(request) {
		const url = new URL(request.url);

		// Serve the HTML file for the root path
		if (url.pathname === "/") {
			return new Response(htmlContent, {
				headers: { "Content-Type": "text/html; charset=utf-8" },
			});
		}

		// Handle other paths if needed (e.g., 404 for not found)
		return new Response("404 Not Found", { status: 404 });
	},
	error(error) {
		console.error("Server error:", error);
		return new Response("Internal Server Error", { status: 500 });
	},
});

console.log(`Bun server listening on http://localhost:${port}`);