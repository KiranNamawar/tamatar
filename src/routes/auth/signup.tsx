import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  // TODO: Implement the signup route
  return <div>Hello "/auth/signup"!</div>
}
