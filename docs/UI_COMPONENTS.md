# UI Components Documentation

Complete reference for all UI components in the Tamatar design system. Built on Radix UI primitives with customizable variants and accessibility features.

## Table of Contents

- [Overview](#overview)
- [Form Components](#form-components)
- [Navigation Components](#navigation-components)
- [Data Display Components](#data-display-components)
- [Feedback Components](#feedback-components)
- [Layout Components](#layout-components)
- [Overlay Components](#overlay-components)
- [Interactive Components](#interactive-components)
- [Utility Components](#utility-components)

---

## Overview

All UI components support multiple variants including:
- **default** - Standard theme styling
- **glass** - Glass morphism with backdrop blur
- **aurora** - Gradient aurora effects
- **outline**, **secondary**, **destructive** - Contextual variants

### Common Props Pattern
```tsx
interface ComponentProps {
  variant?: "default" | "glass" | "aurora" | "outline" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
}
```

---

## Form Components

### Button
Primary action component with multiple variants and sizes.

```tsx
import { Button } from "@/components/ui/button";

// Basic usage
<Button variant="default">Click me</Button>
<Button variant="glass" size="lg">Glass Button</Button>
<Button variant="aurora" size="sm">Aurora Button</Button>

// States
<Button disabled>Disabled</Button>
<Button loading>Loading...</Button>
```

**Variants**: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`, `glass`, `aurora`  
**Sizes**: `sm`, `default`, `lg`, `icon`

### Input
Text input component with validation states and variants.

```tsx
import { Input } from "@/components/ui/input";

// Basic usage
<Input placeholder="Enter text..." />
<Input variant="glass" placeholder="Glass input" />
<Input variant="aurora" type="email" placeholder="Email" />

// With validation
<Input 
  type="email" 
  placeholder="Email" 
  required 
  aria-invalid={hasError}
/>
```

**Variants**: `default`, `glass`, `aurora`  
**Types**: All HTML input types supported

### Textarea
Multi-line text input with auto-resize capabilities.

```tsx
import { Textarea } from "@/components/ui/textarea";

<Textarea placeholder="Enter message..." />
<Textarea variant="glass" rows={4} />
<Textarea variant="aurora" placeholder="Aurora textarea" />
```

**Variants**: `default`, `glass`, `aurora`

### Label
Form labels with automatic association to form controls.

```tsx
import { Label } from "@/components/ui/label";

<Label htmlFor="email">Email Address</Label>
<Label variant="glass" htmlFor="message">Message</Label>
```

**Variants**: `default`, `glass`, `aurora`

### Checkbox
Checkbox input with custom styling and variants.

```tsx
import { Checkbox } from "@/components/ui/checkbox";

<Checkbox id="terms" />
<Checkbox id="newsletter" variant="glass" />
<Checkbox id="updates" variant="aurora" defaultChecked />
```

**Variants**: `default`, `glass`, `aurora`

### Radio Group
Radio button groups with controlled selection.

```tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

<RadioGroup defaultValue="option1">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="r1" />
    <Label htmlFor="r1">Option 1</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="r2" variant="glass" />
    <Label htmlFor="r2">Option 2</Label>
  </div>
</RadioGroup>
```

**Variants**: `default`, `glass`, `aurora`

### Switch
Toggle switch component for boolean values.

```tsx
import { Switch } from "@/components/ui/switch";

<Switch />
<Switch variant="glass" defaultChecked />
<Switch variant="aurora" disabled />
```

**Variants**: `default`, `glass`, `aurora`

### Slider
Range slider input with customizable appearance.

```tsx
import { Slider } from "@/components/ui/slider";

<Slider defaultValue={[50]} max={100} step={1} />
<Slider variant="glass" defaultValue={[25, 75]} />
<Slider variant="aurora" defaultValue={[60]} max={100} />
```

**Variants**: `default`, `glass`, `aurora`

### Select
Dropdown selection component with searchable options.

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>

// With variants
<Select>
  <SelectTrigger variant="glass">
    <SelectValue placeholder="Glass select..." />
  </SelectTrigger>
  <SelectContent variant="glass">
    <SelectItem value="item1">Glass Item 1</SelectItem>
  </SelectContent>
</Select>
```

**Variants**: `default`, `glass`, `aurora`

### Form
Form context provider with validation and error handling.

```tsx
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

function ContactForm() {
  const form = useForm();
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
```

### Input OTP
One-time password input with automatic focus management.

```tsx
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
```

---

## Navigation Components

### Tabs
Tab navigation with content panels and variants.

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

<Tabs defaultValue="tab1" variant="glass">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

**Variants**: `default`, `glass`, `aurora`

### Navigation Menu
Complex navigation with dropdowns and submenus.

```tsx
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from "@/components/ui/navigation-menu";

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/products/web">
          Web Development
        </NavigationMenuLink>
        <NavigationMenuLink href="/products/mobile">
          Mobile Apps
        </NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

### Breadcrumb
Navigation breadcrumbs showing current page location.

```tsx
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/products">Products</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current Page</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

**Variants**: `default`, `glass`, `aurora`

### Pagination
Page navigation with previous/next and page numbers.

```tsx
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

### Menubar
Application menu bar with keyboard navigation.

```tsx
import { 
  Menubar, 
  MenubarContent, 
  MenubarItem, 
  MenubarMenu, 
  MenubarSeparator, 
  MenubarShortcut, 
  MenubarTrigger 
} from "@/components/ui/menubar";

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New File <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
      <MenubarItem>Open File <MenubarShortcut>⌘O</MenubarShortcut></MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Save <MenubarShortcut>⌘S</MenubarShortcut></MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

### Sidebar
Application sidebar with collapsible navigation.

```tsx
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider, 
  SidebarTrigger 
} from "@/components/ui/sidebar";

<SidebarProvider>
  <Sidebar>
    <SidebarHeader>
      <h2>Navigation</h2>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard">
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/settings">
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            Logout
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
  <main>
    <SidebarTrigger />
    {/* Your main content */}
  </main>
</SidebarProvider>
```

---

## Data Display Components

### Badge
Small status indicators and labels.

```tsx
import { Badge } from "@/components/ui/badge";

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="glass">Glass</Badge>
<Badge variant="aurora">Aurora</Badge>
```

**Variants**: `default`, `secondary`, `destructive`, `outline`, `glass`, `aurora`

### Avatar
User profile images with fallbacks.

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

<Avatar>
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

<Avatar variant="glass">
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

**Variants**: `default`, `glass`, `aurora`

### Table
Data tables with sorting and selection.

```tsx
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableFooter, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

<Table variant="glass">
  <TableCaption>A list of recent invoices</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

**Variants**: `default`, `glass`, `aurora`

### Progress
Progress bars and loading indicators.

```tsx
import { Progress } from "@/components/ui/progress";

<Progress value={33} />
<Progress variant="glass" value={66} />
<Progress variant="aurora" value={88} />
```

**Variants**: `default`, `secondary`, `destructive`, `glass`, `aurora`, `success`, `warning`

### Chart
Data visualization components powered by Recharts.

```tsx
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis } from "recharts";

<ChartContainer
  config={{
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
  }}
  className="min-h-[200px]"
>
  <LineChart data={data}>
    <XAxis dataKey="month" />
    <YAxis />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Line dataKey="desktop" strokeWidth={2} />
  </LineChart>
</ChartContainer>
```

---

## Feedback Components

### Alert
Contextual feedback messages.

```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

<Alert>
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>

<Alert variant="glass">
  <AlertDescription>Glass alert message</AlertDescription>
</Alert>
```

**Variants**: `default`, `destructive`, `glass`, `aurora`, `success`, `warning`

### Toast
Toast notifications with action buttons.

```tsx
import { toast } from "@/components/ui/sonner";

// Basic toasts
toast("Event has been created.");
toast.success("Profile updated successfully!");
toast.error("Failed to save changes.");

// Glass variant toasts
toast.glass.success("Glass success message!");
toast.glass.error("Glass error message!");
toast.glass.warning("Glass warning message!");
toast.glass.info("Glass info message!");

// Aurora variant toasts
toast.aurora.success("Aurora success message!");
toast.aurora.error("Aurora error message!");
```

### Tooltip
Contextual information on hover.

```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>This is a tooltip</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

// With variants
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="glass">Glass tooltip</Button>
  </TooltipTrigger>
  <TooltipContent variant="glass">
    <p>Glass tooltip content</p>
  </TooltipContent>
</Tooltip>
```

**Variants**: `default`, `glass`, `aurora`

---

## Layout Components

### Card
Container component for content grouping.

```tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

<Card variant="glass">
  <CardContent>Glass card content</CardContent>
</Card>
```

**Variants**: `default`, `glass`, `aurora`, `outline`

### Separator
Visual dividers between content sections.

```tsx
import { Separator } from "@/components/ui/separator";

<div>
  <p>Section 1</p>
  <Separator />
  <p>Section 2</p>
  <Separator variant="glass" />
  <p>Section 3</p>
</div>
```

**Variants**: `default`, `glass`, `aurora`

### Aspect Ratio
Maintains consistent aspect ratios for media.

```tsx
import { AspectRatio } from "@/components/ui/aspect-ratio";

<AspectRatio ratio={16 / 9}>
  <img src="/image.jpg" alt="Image" className="rounded-md object-cover" />
</AspectRatio>
```

### Skeleton
Loading placeholders for content.

```tsx
import { Skeleton } from "@/components/ui/skeleton";

<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>

<Skeleton variant="glass" className="h-20 w-full" />
```

**Variants**: `default`, `glass`, `aurora`

### Scroll Area
Custom scrollable areas with styled scrollbars.

```tsx
import { ScrollArea } from "@/components/ui/scroll-area";

<ScrollArea className="h-72 w-48 rounded-md border">
  <div className="p-4">
    {Array.from({ length: 50 }, (_, i) => (
      <div key={i} className="text-sm">Item {i + 1}</div>
    ))}
  </div>
</ScrollArea>
```

### Resizable
Resizable panel layouts with drag handles.

```tsx
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

<ResizablePanelGroup direction="horizontal" className="min-h-[200px] rounded-lg border">
  <ResizablePanel defaultSize={50}>
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Panel 1</span>
    </div>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={50}>
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Panel 2</span>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>
```

### Accordion
Collapsible content sections.

```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It comes with default styles that matches the other components.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

**Variants**: `default`, `glass`, `aurora`

### Collapsible
Simple collapsible content container.

```tsx
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

<Collapsible>
  <CollapsibleTrigger>Toggle content</CollapsibleTrigger>
  <CollapsibleContent>
    <p>This content can be collapsed</p>
  </CollapsibleContent>
</Collapsible>
```

### Carousel
Image and content carousels with navigation.

```tsx
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

<Carousel className="w-full max-w-xs">
  <CarouselContent>
    {Array.from({ length: 5 }, (_, index) => (
      <CarouselItem key={index}>
        <div className="p-1">
          <Card>
            <CardContent className="flex aspect-square items-center justify-center p-6">
              <span className="text-4xl font-semibold">{index + 1}</span>
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

### Calendar
Date picker and calendar component.

```tsx
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

function DatePicker() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  );
}
```

---

## Overlay Components

### Dialog
Modal dialogs with backdrop and focus management.

```tsx
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Edit Profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when done.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <Input placeholder="Name" />
      <Input placeholder="Email" />
    </div>
    <DialogFooter>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// With variants
<Dialog>
  <DialogTrigger asChild>
    <Button variant="glass">Glass Dialog</Button>
  </DialogTrigger>
  <DialogContent variant="glass">
    <DialogHeader>
      <DialogTitle>Glass Dialog</DialogTitle>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

**Variants**: `default`, `glass`, `aurora`

### Alert Dialog
Confirmation dialogs for destructive actions.

```tsx
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your
        account and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Sheet
Slide-out panels from screen edges.

```tsx
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";

<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when done.
      </SheetDescription>
    </SheetHeader>
    <div className="grid gap-4 py-4">
      <Input placeholder="Name" />
      <Input placeholder="Email" />
    </div>
  </SheetContent>
</Sheet>

// With variants and sides
<Sheet>
  <SheetTrigger asChild>
    <Button variant="aurora">Aurora Sheet</Button>
  </SheetTrigger>
  <SheetContent variant="aurora" side="left">
    <SheetHeader>
      <SheetTitle>Aurora Sheet</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>
```

**Variants**: `default`, `glass`, `aurora`  
**Sides**: `top`, `bottom`, `left`, `right`

### Popover
Floating content containers.

```tsx
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <h4 className="font-medium leading-none">Dimensions</h4>
      <p className="text-sm text-muted-foreground">
        Set the dimensions for the layer.
      </p>
      <div className="grid gap-2">
        <Label htmlFor="width">Width</Label>
        <Input id="width" defaultValue="100%" />
      </div>
    </div>
  </PopoverContent>
</Popover>
```

### Hover Card
Content that appears on hover.

```tsx
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">@nextjs</Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex justify-between space-x-4">
      <Avatar>
        <AvatarImage src="/vercel.png" />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h4 className="text-sm font-semibold">@nextjs</h4>
        <p className="text-sm">
          The React Framework – created and maintained by @vercel.
        </p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>
```

### Drawer
Mobile-optimized bottom sheets.

```tsx
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerDescription, 
  DrawerFooter, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerTrigger 
} from "@/components/ui/drawer";

<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <div className="mx-auto w-full max-w-sm">
      <DrawerHeader>
        <DrawerTitle>Move Goal</DrawerTitle>
        <DrawerDescription>Set your daily activity goal.</DrawerDescription>
      </DrawerHeader>
      <div className="p-4 pb-0">
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>
      <DrawerFooter>
        <Button>Submit</Button>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </div>
  </DrawerContent>
</Drawer>
```

### Context Menu
Right-click context menus.

```tsx
import { 
  ContextMenu, 
  ContextMenuContent, 
  ContextMenuItem, 
  ContextMenuLabel, 
  ContextMenuSeparator, 
  ContextMenuShortcut, 
  ContextMenuTrigger 
} from "@/components/ui/context-menu";

<ContextMenu>
  <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
    Right click here
  </ContextMenuTrigger>
  <ContextMenuContent className="w-64">
    <ContextMenuItem inset>
      Back
      <ContextMenuShortcut>⌘[</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem inset disabled>
      Forward
      <ContextMenuShortcut>⌘]</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem inset>
      Reload
      <ContextMenuShortcut>⌘R</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuLabel inset>More Tools</ContextMenuLabel>
    <ContextMenuItem inset>
      Save Page As...
      <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

### Dropdown Menu
Dropdown menus with keyboard navigation.

```tsx
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      Profile
    </DropdownMenuItem>
    <DropdownMenuItem>
      Billing
    </DropdownMenuItem>
    <DropdownMenuItem>
      Settings
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      Logout
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Command
Command palette with search and keyboard navigation.

```tsx
import { 
  Command, 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList, 
  CommandSeparator, 
  CommandShortcut 
} from "@/components/ui/command";

<Command className="rounded-lg border shadow-md">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>
        Calendar
        <CommandShortcut>⌘K</CommandShortcut>
      </CommandItem>
      <CommandItem>
        Search Emoji
        <CommandShortcut>⌘J</CommandShortcut>
      </CommandItem>
      <CommandItem>
        Calculator
        <CommandShortcut>⌘C</CommandShortcut>
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>Profile</CommandItem>
      <CommandItem>Billing</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

---

## Interactive Components

### Toggle
Binary state toggle buttons.

```tsx
import { Toggle } from "@/components/ui/toggle";
import { Bold } from "lucide-react";

<Toggle aria-label="Toggle bold">
  <Bold className="h-4 w-4" />
</Toggle>

<Toggle variant="glass" aria-label="Glass toggle">
  <Bold className="h-4 w-4" />
</Toggle>

<Toggle variant="aurora" aria-label="Aurora toggle">
  <Bold className="h-4 w-4" />
</Toggle>
```

**Variants**: `default`, `outline`, `glass`, `aurora`

### Toggle Group
Groups of related toggle buttons.

```tsx
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";

<ToggleGroup type="multiple">
  <ToggleGroupItem value="bold" aria-label="Toggle bold">
    <Bold className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Toggle italic">
    <Italic className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Toggle underline">
    <Underline className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>
```

---

## Utility Components

These are primarily helper components for layout and styling:

- **AspectRatio** - Maintains consistent aspect ratios
- **Skeleton** - Loading state placeholders  
- **ScrollArea** - Custom scrollable regions
- **Separator** - Visual content dividers
- **Resizable** - Resizable panel layouts

---

## Best Practices

### Accessibility
- All components include proper ARIA attributes
- Keyboard navigation is supported by default
- Focus management is handled automatically
- Color contrast meets WCAG guidelines

### Performance
- Components are tree-shakeable
- Lazy loading for complex components
- Minimal bundle size impact
- Optimized re-renders with React.memo

### Customization
- CSS custom properties for theming
- Variant-based styling system
- Utility class composition with cn()
- Radix UI primitives as foundation

### Error Handling
- Graceful degradation for missing props
- TypeScript for compile-time safety
- Runtime validation where needed
- Helpful error messages in development

---

## Component Status

✅ **Stable Components** (46 total)
- All form components (Button, Input, Select, etc.)
- All navigation components (Tabs, Breadcrumb, etc.) 
- All data display components (Table, Badge, etc.)
- All layout components (Card, Accordion, etc.)
- All overlay components (Dialog, Sheet, etc.)

🔄 **Regular Updates**
- New variants added based on design needs
- Performance optimizations
- Accessibility improvements
- Bug fixes and refinements

---

**For more detailed examples and advanced usage patterns, see the [Style Guide](./STYLE_GUIDE.md) and component-specific documentation.**
