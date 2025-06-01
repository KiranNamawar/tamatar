import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  // TODO: Implement the login route
  return <div>Hello "/auth/login"!</div>
}
