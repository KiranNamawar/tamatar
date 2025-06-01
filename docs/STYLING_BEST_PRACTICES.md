# Tamatar Styling Best Practices

This document provides practical guidance on implementing the Tamatar style guide in your components and pages.

## Quick Reference

- Use the `cn()` utility for combining class names
- Follow the "dark mode first" design approach
- Use semantic color variables instead of hardcoded colors
- Follow the component composition pattern
- Use responsive utilities consistently

## Common Patterns

### 1. Creating Accessible Components

Always consider accessibility when styling components:

```tsx
// Good: Accessible button with proper contrast and focus states
<Button 
  variant="primary"
  aria-label="Save changes"
  className="focus:ring-2 focus:ring-offset-2 focus:ring-primary"
>
  Save
</Button>

// Bad: Inaccessible button with poor contrast and no focus state
<button 
  className="bg-[#333] text-[#555] px-4 py-2 rounded"
>
  Save
</button>
```

### 2. Responsive Layouts

Use Tailwind's responsive modifiers consistently:

```tsx
// Good: Mobile-first approach with clear breakpoints
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {items.map(item => (
    <Card key={item.id} item={item} />
  ))}
</div>

// Bad: Inconsistent breakpoints and desktop-first approach
<div className="grid grid-cols-4 tablet:grid-cols-2 phone:grid-cols-1 gap-4">
  {items.map(item => (
    <Card key={item.id} item={item} />
  ))}
</div>
```

### 3. Dark Mode Implementation

Follow the "dark mode first" approach:

```tsx
// Good: Using semantic color variables that adapt to theme
<div className="bg-card text-card-foreground">
  <h3 className="text-foreground">Title</h3>
  <p className="text-muted-foreground">Description</p>
</div>

// Bad: Hardcoded colors that don't respect theme
<div className="bg-white dark:bg-gray-800">
  <h3 className="text-gray-900 dark:text-white">Title</h3>
  <p className="text-gray-500 dark:text-gray-400">Description</p>
</div>
```

### 4. Using the Design System

Leverage our component library and design tokens:

```tsx
// Good: Using our design system components and tokens
<Card>
  <CardHeader>
    <CardTitle>Project Analytics</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      <StatusBadge status="success" label="Completed" />
      <Progress value={75} />
    </div>
  </CardContent>
</Card>

// Bad: Custom HTML without using our design system
<div className="border rounded p-4 shadow-md">
  <h3 className="text-lg font-bold mb-4">Project Analytics</h3>
  <div className="mb-4">
    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
      Completed
    </span>
  </div>
  <div className="w-full bg-gray-200 rounded-full h-2.5">
    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
  </div>
</div>
```

## Common Issues and Solutions

### Issue: Inconsistent Spacing

```tsx
// Problem: Mixed spacing values
<div className="p-4">
  <h2 className="mb-3">Title</h2>
  <p className="mb-5">Description</p>
  <Button className="mt-6">Action</Button>
</div>

// Solution: Consistent spacing using our spacing scale
<div className="p-4">
  <h2 className="mb-2">Title</h2>
  <p className="mb-4">Description</p>
  <Button className="mt-4">Action</Button>
</div>

// Better: Using the space-y utility for consistent vertical spacing
<div className="p-4 space-y-4">
  <h2>Title</h2>
  <p>Description</p>
  <Button>Action</Button>
</div>
```

### Issue: Mixed Color Approaches

```tsx
// Problem: Mix of semantic colors and hardcoded values
<div className="bg-card">
  <h3 className="text-gray-800 dark:text-gray-200">Title</h3>
  <p className="text-muted-foreground">Description</p>
</div>

// Solution: Consistent use of semantic colors
<div className="bg-card">
  <h3 className="text-foreground">Title</h3>
  <p className="text-muted-foreground">Description</p>
</div>
```

### Issue: Inconsistent Typography

```tsx
// Problem: Inconsistent font weights and sizes
<div>
  <h1 className="text-2xl font-bold">Main Heading</h1>
  <h2 className="text-xl font-semibold">Subheading</h2>
  <h3 className="text-lg font-600">Section Title</h3>
</div>

// Solution: Using consistent text styles
<div>
  <h1 className="text-2xl font-bold">Main Heading</h1>
  <h2 className="text-xl font-semibold">Subheading</h2>
  <h3 className="text-lg font-semibold">Section Title</h3>
</div>

// Better: Using our text variants
<div>
  <h1 className={cn(variants.text.h1)}>Main Heading</h1>
  <h2 className={cn(variants.text.h2)}>Subheading</h2>
  <h3 className={cn(variants.text.h3)}>Section Title</h3>
</div>
```

## Practical Examples

### 1. Card Component with Proper Styling

```tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  project: {
    id: string
    name: string
    description: string
    status: 'active' | 'completed' | 'paused'
    progress: number
  }
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const getStatusType = (status: string): StatusType => {
    switch (status) {
      case 'active': return 'success'
      case 'paused': return 'warning'
      case 'completed': return 'info'
      default: return 'default'
    }
  }
  
  return (
    <Card className={cn('transition-all duration-300 hover:shadow-md', className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{project.name}</CardTitle>
          <StatusBadge 
            status={getStatusType(project.status)} 
            label={project.status} 
          />
        </div>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">
            Progress: {project.progress}%
          </div>
          <Progress value={project.progress} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="ghost" size="sm">Details</Button>
        <Button size="sm">Update</Button>
      </CardFooter>
    </Card>
  )
}
```

### 2. Form Component with Proper Validation Styling

```tsx
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const projectSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters"),
  description: z.string().optional(),
  githubUrl: z.string().url("Please enter a valid URL").optional().or(z.literal('')),
})

type ProjectFormValues = z.infer<typeof projectSchema>

export function ProjectForm({ onSubmit }: { onSubmit: (data: ProjectFormValues) => void }) {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      githubUrl: "",
    },
  })

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="githubUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/username/repo (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button type="button" variant="outline">Cancel</Button>
            <Button type="submit">Create Project</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
```

## Code Review Checklist for Styling

When reviewing code for styling consistency, check for:

- [ ] Uses semantic color variables instead of hardcoded values
- [ ] Follows spacing guidelines with consistent values
- [ ] Uses the component composition pattern
- [ ] Has proper dark mode implementation
- [ ] Uses responsive utilities correctly
- [ ] Has consistent typography (sizes, weights, line heights)
- [ ] Implements proper accessibility features
- [ ] Uses animation consistently
- [ ] Follows our z-index layering system
- [ ] Uses the `cn()` utility for class name merging
- [ ] Has no inline styles (uses Tailwind classes instead)

## Resources

- [Tailwind Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Motion Documentation](https://www.framer.com/motion/)
- [WCAG Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [Color Contrast Checker](https://colourcontrast.cc/)

---

*Last Updated: June 1, 2025*
