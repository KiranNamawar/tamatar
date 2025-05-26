import { registerGlobalMiddleware } from "@tanstack/react-start";
import { authHeader } from "./middleware/auth";

registerGlobalMiddleware({
    middleware: [authHeader],
})