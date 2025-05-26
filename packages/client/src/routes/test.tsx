import { graphqlRequest } from "@/graphql/client";
import { graphql } from "@/graphql/graphql";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({
	component: RouteComponent,
});

const testQuery = graphql(`
  query Test {
    test
  }
`);

function RouteComponent() {
	const { data } = useQuery({
		queryKey: ["test"],
		queryFn: () => graphqlRequest({ query: testQuery }),
	});

	return (
		<div>
			your test query result: <br />
			{data?.success ? data.data.test : "Error fetching test query"}
		</div>
	);
}
