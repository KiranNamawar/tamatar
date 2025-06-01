import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/status-badge'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Code, Zap, Target, TrendingUp, Github, Calendar, BookOpen } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="aurora-hero min-h-screen">
      {/* Header with theme toggle */}
      <header className="glass-nav fixed top-0 left-0 right-0 z-50 border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Code className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-bold">Tamatar</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Track Your Developer Journey
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The ultimate companion for developers to log progress, track learning milestones, 
              and manage development projects with style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Learn More
              </Button>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {/* Daily Progress Card */}
            <Card variant="glass" className="relative">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <CardTitle>Daily Progress</CardTitle>
                    <StatusBadge status="success" label="Active" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Log your daily coding activities, breakthroughs, and challenges with rich markdown support.
                </CardDescription>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Today's Progress</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-gradient-to-r from-success to-accent h-2 rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>
              </CardContent>
            </Card>

            {/* GitHub Integration Card */}
            <Card variant="glass-aurora" className="relative">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Github className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle>GitHub Integration</CardTitle>
                    <StatusBadge status="info" label="Connected" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Seamlessly connect with GitHub to track commits, PRs, and repository activity.
                </CardDescription>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="h-2 w-2 bg-success rounded-full animate-pulse" />
                  <span className="text-muted-foreground">Last commit: 2 hours ago</span>
                </div>
              </CardContent>
            </Card>

            {/* Learning Resources Card */}
            <Card variant="glass-subtle" className="relative">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <CardTitle>Learning Hub</CardTitle>
                    <StatusBadge status="warning" label="Growing" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Curated resources, tutorials, and learning paths to accelerate your development.
                </CardDescription>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">1,247</span> resources available
                </div>
              </CardContent>
            </Card>

            {/* Analytics Card */}
            <Card variant="glass" className="relative md:col-span-2">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Progress Analytics</CardTitle>
                    <StatusBadge status="default" label="Insights" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-6">
                  Comprehensive analytics to understand your coding patterns, productivity trends, and learning progress.
                </CardDescription>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">127</div>
                    <div className="text-xs text-muted-foreground">Days Logged</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">43</div>
                    <div className="text-xs text-muted-foreground">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">892</div>
                    <div className="text-xs text-muted-foreground">Commits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning">18</div>
                    <div className="text-xs text-muted-foreground">Skills</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Goals Card */}
            <Card variant="glass-strong" className="relative">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <Target className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <CardTitle>Goals & Milestones</CardTitle>
                    <StatusBadge status="default" label="On Track" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Set and track personal development goals with milestone tracking and achievement badges.
                </CardDescription>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-success rounded-full" />
                    <span className="text-sm">Complete React certification</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-accent rounded-full" />
                    <span className="text-sm">Build 5 full-stack projects</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-muted rounded-full" />
                    <span className="text-sm">Contribute to open source</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Card variant="glass-aurora" className="max-w-2xl mx-auto">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Ready to Level Up Your Development Journey?</h2>
                <p className="text-muted-foreground mb-6">
                  Join thousands of developers who are already tracking their progress and achieving their goals with Tamatar.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" className="flex items-center space-x-2">
                    <Zap className="h-4 w-4" />
                    <span>Start Tracking Today</span>
                  </Button>
                  <Button variant="outline" size="lg">
                    View Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
