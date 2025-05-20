import builder from "./pothos";
import '@/auth'

builder.queryType({
    fields: (t) => ({
        test: t.field({
            type: "String",
            resolve: () => "Hello World",
        }),
    }),
})
builder.mutationType({})

const schema = builder.toSchema();

export default schema;
