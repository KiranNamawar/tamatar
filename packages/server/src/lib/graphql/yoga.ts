// GraphQL Yoga Server Utility
// Configures and exports a GraphQL Yoga server instance with context, plugins, and schema.

import schema from "./schema";
import { createYoga } from "graphql-yoga";
import { EnvelopArmorPlugin } from "@escape.tech/graphql-armor";
import { useResponseCache } from "@envelop/response-cache";

/**
 * The Yoga server is configured with:
 * - Custom context extracting access and refresh tokens from headers
 * - Security plugin (EnvelopArmorPlugin)
 * - Response cache plugin (with session-based caching)
 * - The root GraphQL schema
 *
 * Usage:
 *   import yoga from './yoga';
 *   // Use yoga as the GraphQL server handler
 */
const yoga = createYoga({
	schema,
	context: async ({ request }) => {
		const [type, token] =
			request.headers.get("authorization")?.split(" ") ?? [];
		return {
			accessToken: type === "Access" ? token : null,
			refreshToken: type === "Refresh" ? token : null,
		};
	},
	plugins: [
		EnvelopArmorPlugin(),
		useResponseCache({
			session: (context: any) => {
				return String(context.accessToken) ?? null;
			},
			includeExtensionMetadata: process.env.NODE_ENV !== "production",
		}),
	],
});

export default yoga;
