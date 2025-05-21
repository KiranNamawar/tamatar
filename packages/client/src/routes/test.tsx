import { getClient } from "@/graphql/client";
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
		queryFn: () => getClient().request(testQuery),
	});

	return <div>{data?.test}</div>;
}
