import { graphql } from "@/graphql";
import { getClient } from "@/graphql";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo/tanstack-query")({
	component: TanStackQueryDemo,
});

const testQuery = graphql(`
  query TestQuery {
    test
  }
  `);

function TanStackQueryDemo() {
	const { data } = useQuery({
		queryKey: ["test"],
		queryFn: () => getClient().request(testQuery),
	});

	return (
		<div className="p-4">
			<h1 className="text-2xl mb-4">Test Query</h1>
			<ul>{data?.test}</ul>
		</div>
	);
}
