import schema from "./schema";
import { createYoga } from "graphql-yoga";
import { EnvelopArmorPlugin } from "@escape.tech/graphql-armor";
import { useResponseCache } from "@envelop/response-cache";

const yoga = createYoga({
	schema,
	context: async ({ request }) => {
		const [type, token] = request.headers.get("authorization")?.split(" ") ?? [];
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
