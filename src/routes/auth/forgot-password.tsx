import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/forgot-password')({
  component: RouteComponent,
})

function RouteComponent() {
  // TODO: Implement the forgot password route
  return <div>Hello "/auth/forgot-password"!</div>
}
