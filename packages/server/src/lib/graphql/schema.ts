// GraphQL Schema Definition
// Defines and exports the root GraphQL schema using the Pothos builder.

import builder from "./pothos";
import "@/auth";

/**
 * The root GraphQL schema includes:
 * - Query type with a test field (returns "Hello World")
 * - Mutation type (populated by imported auth mutations)
 *
 * Usage:
 *   import schema from './schema';
 *   // Use schema in GraphQL server setup
 */
builder.queryType({
	fields: (t) => ({
		test: t.field({
			type: "String",
			resolve: () => "Hello World",
		}),
	}),
});
builder.mutationType({});

const schema = builder.toSchema();

export default schema;
