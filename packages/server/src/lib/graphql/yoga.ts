import { useCookies } from "@whatwg-node/server-plugin-cookies";
import schema from "./schema";
import { createYoga } from "graphql-yoga";
import { EnvelopArmorPlugin } from "@escape.tech/graphql-armor";
import { useResponseCache } from "@envelop/response-cache";

const yoga = createYoga({
	schema,
	context: async ({ request }) => {
		const refreshToken = await request.cookieStore
			?.get("refreshToken")
			.then((cookie) => cookie?.value);
		const accessToken = request.headers.get("authorization")?.split(" ")[1];
		return {
			refreshToken,
			accessToken,
			cookies: request.cookieStore,
		};
	},
	plugins: [
		useCookies(),
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
