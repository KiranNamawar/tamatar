import { createFileRoute } from "@tanstack/react-router";
import {
	BellIcon,
	CheckIcon,
	HeartIcon,
	SettingsIcon,
	StarIcon,
} from "lucide-react";
import * as React from "react";
import {
	AuroraOrb,
	AuroraSection,
	FloatingElement,
	GradientText,
} from "../components/aurora";
import {
	GlassButton,
	GlassCard,
	GlassInput,
	GlassNav,
} from "../components/glass";
import {
	MotionCard,
	MotionDiv,
	MotionItem,
	MotionList,
	MotionText,
} from "../components/motion";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../components/ui/carousel";
import { Checkbox } from "../components/ui/checkbox";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuTrigger,
} from "../components/ui/context-menu";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "../components/ui/hover-card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from "../components/ui/menubar";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
} from "../components/ui/navigation-menu";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "../components/ui/pagination";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../components/ui/popover";
import { Progress } from "../components/ui/progress";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "../components/ui/resizable";
import { ScrollArea } from "../components/ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../components/ui/select";
import { Separator } from "../components/ui/separator";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../components/ui/sheet";
import { Skeleton } from "../components/ui/skeleton";
import { Slider } from "../components/ui/slider";
import { toast } from "../components/ui/sonner";
import { Switch } from "../components/ui/switch";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "../components/ui/table";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../components/ui/tabs";
import { Textarea } from "../components/ui/textarea";
import { Toggle } from "../components/ui/toggle";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../components/ui/tooltip";
import { useStagger } from "../hooks/use-animations";
import { ThemeToggle } from "../providers/theme-provider";

export const Route = createFileRoute("/showcase")({
	component: () => <ShowcasePage />,
});

function ShowcasePage() {
	const stagger = useStagger(0.1);

	return (
		<>
			<TooltipProvider>
				<div className="min-h-screen p-8 space-y-16">
					{/* Hero Section */}
					<AuroraSection className="text-center py-20">
						<MotionDiv animation="fadeInUp" className="space-y-6">
							<GradientText className="text-6xl font-bold">
								Tamatar Design System
							</GradientText>
							<MotionText className="text-xl text-muted-foreground max-w-2xl mx-auto">
								Complete component variants with glass, aurora, and semantic
								styling. Test all combinations in light and dark modes.
							</MotionText>
							<div className="flex gap-4 justify-center pt-6">
								<Button variant="aurora" size="lg">
									Get Started
								</Button>
								<Button variant="glass" size="lg">
									View Components
								</Button>
								<ThemeToggle />
							</div>
						</MotionDiv>
						{/* Floating orbs */}
						<AuroraOrb size="lg" position={{ top: "20%", left: "10%" }} />
						<AuroraOrb size="md" position={{ top: "40%", right: "20%" }} />
						<AuroraOrb size="sm" position={{ bottom: "30%", left: "25%" }} />
					</AuroraSection>

					{/* Button Variants */}
					<section className="space-y-8">
						<MotionDiv animation="fadeInUp">
							<h2 className="text-3xl font-bold mb-6">Button Variants</h2>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
								<Button variant="default">Default</Button>
								<Button variant="secondary">Secondary</Button>
								<Button variant="outline">Outline</Button>
								<Button variant="ghost">Ghost</Button>
								<Button variant="glass">Glass</Button>
								<Button variant="aurora">Aurora</Button>
								<Button variant="destructive">Destructive</Button>
								<Button variant="link">Link</Button>
							</div>
							<div className="flex gap-4 items-center mt-4">
								<Button size="sm" variant="glass">
									Small
								</Button>
								<Button size="default" variant="aurora">
									Default
								</Button>
								<Button size="lg" variant="glass">
									Large
								</Button>
							</div>
						</MotionDiv>
					</section>

					{/* Form Components */}
					<section className="space-y-8">
						<MotionDiv animation="fadeInUp">
							<h2 className="text-3xl font-bold mb-6">Form Components</h2>

							{/* Input Variants */}
							<div className="space-y-6">
								<div>
									<h3 className="text-xl font-semibold mb-4">Input Variants</h3>
									<div className="grid gap-4">
										<div className="space-y-2">
											<Label variant="default">Default Input</Label>
											<Input variant="default" placeholder="Default input..." />
										</div>
										<div className="space-y-2">
											<Label variant="glass">Glass Input</Label>
											<Input variant="glass" placeholder="Glass input..." />
										</div>
										<div className="space-y-2">
											<Label variant="aurora">Aurora Input</Label>
											<Input variant="aurora" placeholder="Aurora input..." />
										</div>
									</div>
								</div>

								{/* Textarea Variants */}
								<div>
									<h3 className="text-xl font-semibold mb-4">
										Textarea Variants
									</h3>
									<div className="grid gap-4">
										<Textarea
											variant="default"
											placeholder="Default textarea..."
										/>
										<Textarea variant="glass" placeholder="Glass textarea..." />
										<Textarea
											variant="aurora"
											placeholder="Aurora textarea..."
										/>
									</div>
								</div>

								{/* Checkbox & Radio */}
								<div className="grid md:grid-cols-2 gap-8">
									<div>
										<h3 className="text-xl font-semibold mb-4">
											Checkbox Variants
										</h3>
										<div className="space-y-3">
											<div className="flex items-center space-x-2">
												<Checkbox id="default-check" variant="default" />
												<Label htmlFor="default-check">Default Checkbox</Label>
											</div>
											<div className="flex items-center space-x-2">
												<Checkbox id="glass-check" variant="glass" />
												<Label htmlFor="glass-check" variant="glass">
													Glass Checkbox
												</Label>
											</div>
											<div className="flex items-center space-x-2">
												<Checkbox id="aurora-check" variant="aurora" />
												<Label htmlFor="aurora-check" variant="aurora">
													Aurora Checkbox
												</Label>
											</div>
										</div>
									</div>

									<div>
										<h3 className="text-xl font-semibold mb-4">
											Radio Group Variants
										</h3>
										<RadioGroup defaultValue="default" className="space-y-3">
											<div className="flex items-center space-x-2">
												<RadioGroupItem
													value="default"
													id="default-radio"
													variant="default"
												/>
												<Label htmlFor="default-radio">Default Radio</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem
													value="glass"
													id="glass-radio"
													variant="glass"
												/>
												<Label htmlFor="glass-radio" variant="glass">
													Glass Radio
												</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem
													value="aurora"
													id="aurora-radio"
													variant="aurora"
												/>
												<Label htmlFor="aurora-radio" variant="aurora">
													Aurora Radio
												</Label>
											</div>
										</RadioGroup>
									</div>
								</div>

								{/* Switch & Slider */}
								<div className="grid md:grid-cols-2 gap-8">
									<div>
										<h3 className="text-xl font-semibold mb-4">
											Switch Variants
										</h3>
										<div className="space-y-4">
											<div className="flex items-center space-x-2">
												<Switch id="default-switch" variant="default" />
												<Label htmlFor="default-switch">Default Switch</Label>
											</div>
											<div className="flex items-center space-x-2">
												<Switch id="glass-switch" variant="glass" />
												<Label htmlFor="glass-switch" variant="glass">
													Glass Switch
												</Label>
											</div>
											<div className="flex items-center space-x-2">
												<Switch id="aurora-switch" variant="aurora" />
												<Label htmlFor="aurora-switch" variant="aurora">
													Aurora Switch
												</Label>
											</div>
										</div>
									</div>

									<div>
										<h3 className="text-xl font-semibold mb-4">
											Slider Variants
										</h3>
										<div className="space-y-6">
											<div className="space-y-2">
												<Label>Default Slider</Label>
												<Slider
													variant="default"
													defaultValue={[50]}
													max={100}
													step={1}
												/>
											</div>
											<div className="space-y-2">
												<Label variant="glass">Glass Slider</Label>
												<Slider
													variant="glass"
													defaultValue={[75]}
													max={100}
													step={1}
												/>
											</div>
											<div className="space-y-2">
												<Label variant="aurora">Aurora Slider</Label>
												<Slider
													variant="aurora"
													defaultValue={[25]}
													max={100}
													step={1}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</MotionDiv>
					</section>

					{/* Data Display Components */}
					<section className="space-y-8">
						<MotionDiv animation="fadeInUp">
							<h2 className="text-3xl font-bold mb-6">
								Data Display Components
							</h2>

							{/* Badge Variants */}
							<div className="space-y-6">
								<div>
									<h3 className="text-xl font-semibold mb-4">Badge Variants</h3>
									<div className="flex flex-wrap gap-2">
										<Badge variant="default">Default</Badge>
										<Badge variant="secondary">Secondary</Badge>
										<Badge variant="destructive">Destructive</Badge>
										<Badge variant="outline">Outline</Badge>
										<Badge variant="glass">Glass</Badge>
										<Badge variant="aurora">Aurora</Badge>
									</div>
								</div>

								{/* Alert Variants */}
								<div>
									<h3 className="text-xl font-semibold mb-4">Alert Variants</h3>
									<div className="space-y-4">
										<Alert variant="default">
											<BellIcon className="h-4 w-4" />
											<AlertTitle>Default Alert</AlertTitle>
											<AlertDescription>
												This is a default alert with standard styling.
											</AlertDescription>
										</Alert>
										<Alert variant="glass">
											<StarIcon className="h-4 w-4" />
											<AlertTitle>Glass Alert</AlertTitle>
											<AlertDescription>
												This alert uses the glass variant with backdrop blur.
											</AlertDescription>
										</Alert>
										<Alert variant="aurora">
											<HeartIcon className="h-4 w-4" />
											<AlertTitle>Aurora Alert</AlertTitle>
											<AlertDescription>
												This alert features the aurora gradient background.
											</AlertDescription>
										</Alert>
										<Alert variant="success">
											<CheckIcon className="h-4 w-4" />
											<AlertTitle>Success Alert</AlertTitle>
											<AlertDescription>
												This is a success alert with green semantic styling.
											</AlertDescription>
										</Alert>
										<Alert variant="warning">
											<SettingsIcon className="h-4 w-4" />
											<AlertTitle>Warning Alert</AlertTitle>
											<AlertDescription>
												This is a warning alert with orange semantic styling.
											</AlertDescription>
										</Alert>
									</div>
								</div>

								{/* Progress Variants */}
								<div>
									<h3 className="text-xl font-semibold mb-4">
										Progress Variants
									</h3>
									<div className="space-y-4">
										<div className="space-y-2">
											<Label>Default Progress (60%)</Label>
											<Progress variant="default" value={60} />
										</div>
										<div className="space-y-2">
											<Label variant="glass">Glass Progress (45%)</Label>
											<Progress variant="glass" value={45} />
										</div>
										<div className="space-y-2">
											<Label variant="aurora">Aurora Progress (80%)</Label>
											<Progress variant="aurora" value={80} />
										</div>
										<div className="space-y-2">
											<Label>Success Progress (90%)</Label>
											<Progress variant="success" value={90} />
										</div>
										<div className="space-y-2">
											<Label>Warning Progress (30%)</Label>
											<Progress variant="warning" value={30} />
										</div>
									</div>
								</div>

								{/* Avatar Variants */}
								<div>
									<h3 className="text-xl font-semibold mb-4">
										Avatar Variants
									</h3>
									<div className="flex gap-4 items-center">
										<div className="text-center space-y-2">
											<Avatar variant="default">
												<AvatarFallback variant="default">JD</AvatarFallback>
											</Avatar>
											<Label className="text-xs">Default</Label>
										</div>
										<div className="text-center space-y-2">
											<Avatar variant="glass">
												<AvatarFallback variant="glass">GS</AvatarFallback>
											</Avatar>
											<Label className="text-xs" variant="glass">
												Glass
											</Label>
										</div>
										<div className="text-center space-y-2">
											<Avatar variant="aurora">
												<AvatarFallback variant="aurora">AU</AvatarFallback>
											</Avatar>
											<Label className="text-xs" variant="aurora">
												Aurora
											</Label>
										</div>
									</div>
								</div>

								{/* Skeleton Variants */}
								<div>
									<h3 className="text-xl font-semibold mb-4">
										Skeleton Variants
									</h3>
									<div className="space-y-4">
										<div className="space-y-2">
											<Label>Default Skeleton</Label>
											<div className="space-y-2">
												<Skeleton variant="default" className="h-4 w-[250px]" />
												<Skeleton variant="default" className="h-4 w-[200px]" />
											</div>
										</div>
										<div className="space-y-2">
											<Label variant="glass">Glass Skeleton</Label>
											<div className="space-y-2">
												<Skeleton variant="glass" className="h-4 w-[250px]" />
												<Skeleton variant="glass" className="h-4 w-[200px]" />
											</div>
										</div>
										<div className="space-y-2">
											<Label variant="aurora">Aurora Skeleton</Label>
											<div className="space-y-2">
												<Skeleton variant="aurora" className="h-4 w-[250px]" />
												<Skeleton variant="aurora" className="h-4 w-[200px]" />
											</div>
										</div>
									</div>
								</div>
							</div>
						</MotionDiv>
					</section>

					{/* Navigation Components */}
					<section className="space-y-8">
						<MotionDiv animation="fadeInUp">
							<h2 className="text-3xl font-bold mb-6">Navigation Components</h2>

							{/* Tabs Variants */}
							<div className="space-y-6">
								<div>
									<h3 className="text-xl font-semibold mb-4">Tabs Variants</h3>
									<div className="space-y-8">
										<Tabs
											defaultValue="tab1"
											variant="default"
											className="w-full"
										>
											<TabsList>
												<TabsTrigger value="tab1">Default Tab 1</TabsTrigger>
												<TabsTrigger value="tab2">Default Tab 2</TabsTrigger>
											</TabsList>
											<TabsContent value="tab1">
												Default tabs content 1
											</TabsContent>
											<TabsContent value="tab2">
												Default tabs content 2
											</TabsContent>
										</Tabs>

										<Tabs
											defaultValue="tab1"
											variant="glass"
											className="w-full"
										>
											<TabsList>
												<TabsTrigger value="tab1">Glass Tab 1</TabsTrigger>
												<TabsTrigger value="tab2">Glass Tab 2</TabsTrigger>
											</TabsList>
											<TabsContent value="tab1">
												Glass tabs content 1
											</TabsContent>
											<TabsContent value="tab2">
												Glass tabs content 2
											</TabsContent>
										</Tabs>

										<Tabs
											defaultValue="tab1"
											variant="aurora"
											className="w-full"
										>
											<TabsList>
												<TabsTrigger value="tab1">Aurora Tab 1</TabsTrigger>
												<TabsTrigger value="tab2">Aurora Tab 2</TabsTrigger>
											</TabsList>
											<TabsContent value="tab1">
												Aurora tabs content 1
											</TabsContent>
											<TabsContent value="tab2">
												Aurora tabs content 2
											</TabsContent>
										</Tabs>
									</div>
								</div>

								{/* Breadcrumb Variants */}
								<div>
									<h3 className="text-xl font-semibold mb-4">
										Breadcrumb Variants
									</h3>
									<div className="space-y-4">
										<Breadcrumb>
											<BreadcrumbList variant="default">
												<BreadcrumbItem>
													<BreadcrumbLink variant="default" href="/">
														Home
													</BreadcrumbLink>
												</BreadcrumbItem>
												<BreadcrumbSeparator />
												<BreadcrumbItem>
													<BreadcrumbLink variant="default" href="/components">
														Components
													</BreadcrumbLink>
												</BreadcrumbItem>
												<BreadcrumbSeparator />
												<BreadcrumbItem>
													<BreadcrumbPage>Default</BreadcrumbPage>
												</BreadcrumbItem>
											</BreadcrumbList>
										</Breadcrumb>

										<Breadcrumb>
											<BreadcrumbList variant="glass">
												<BreadcrumbItem>
													<BreadcrumbLink variant="glass" href="/">
														Home
													</BreadcrumbLink>
												</BreadcrumbItem>
												<BreadcrumbSeparator />
												<BreadcrumbItem>
													<BreadcrumbLink variant="glass" href="/components">
														Components
													</BreadcrumbLink>
												</BreadcrumbItem>
												<BreadcrumbSeparator />
												<BreadcrumbItem>
													<BreadcrumbPage>Glass</BreadcrumbPage>
												</BreadcrumbItem>
											</BreadcrumbList>
										</Breadcrumb>

										<Breadcrumb>
											<BreadcrumbList variant="aurora">
												<BreadcrumbItem>
													<BreadcrumbLink variant="aurora" href="/">
														Home
													</BreadcrumbLink>
												</BreadcrumbItem>
												<BreadcrumbSeparator />
												<BreadcrumbItem>
													<BreadcrumbLink variant="aurora" href="/components">
														Components
													</BreadcrumbLink>
												</BreadcrumbItem>
												<BreadcrumbSeparator />
												<BreadcrumbItem>
													<BreadcrumbPage>Aurora</BreadcrumbPage>
												</BreadcrumbItem>
											</BreadcrumbList>
										</Breadcrumb>
									</div>
								</div>

								{/* Accordion Variants */}
								<div>
									<h3 className="text-xl font-semibold mb-4">
										Accordion Variants
									</h3>
									<div className="space-y-6">
										<Accordion type="single" collapsible className="w-full">
											<AccordionItem value="item-1" variant="default">
												<AccordionTrigger variant="default">
													Default Accordion
												</AccordionTrigger>
												<AccordionContent>
													This is the content of the default accordion variant.
												</AccordionContent>
											</AccordionItem>
										</Accordion>

										<Accordion type="single" collapsible className="w-full">
											<AccordionItem value="item-1" variant="glass">
												<AccordionTrigger variant="glass">
													Glass Accordion
												</AccordionTrigger>
												<AccordionContent>
													This is the content of the glass accordion variant.
												</AccordionContent>
											</AccordionItem>
										</Accordion>

										<Accordion type="single" collapsible className="w-full">
											<AccordionItem value="item-1" variant="aurora">
												<AccordionTrigger variant="aurora">
													Aurora Accordion
												</AccordionTrigger>
												<AccordionContent>
													This is the content of the aurora accordion variant.
												</AccordionContent>
											</AccordionItem>
										</Accordion>
									</div>
								</div>
							</div>
						</MotionDiv>
					</section>

					{/* Layout Components */}
					<section className="space-y-8">
						<MotionDiv animation="fadeInUp">
							<h2 className="text-3xl font-bold mb-6">Layout Components</h2>

							{/* Card Variants */}
							<div className="space-y-6">
								<div>
									<h3 className="text-xl font-semibold mb-4">Card Variants</h3>
									<div className="grid md:grid-cols-3 gap-6">
										<Card variant="default">
											<CardHeader>
												<CardTitle>Default Card</CardTitle>
												<CardDescription>
													A standard card with default styling.
												</CardDescription>
											</CardHeader>
											<CardContent>
												<p>
													This is the default card variant with standard
													background and borders.
												</p>
											</CardContent>
										</Card>

										<Card variant="glass">
											<CardHeader>
												<CardTitle>Glass Card</CardTitle>
												<CardDescription>
													A card with glass morphism effects.
												</CardDescription>
											</CardHeader>
											<CardContent>
												<p>
													This card features backdrop blur and transparency for
													a glass effect.
												</p>
											</CardContent>
										</Card>

										<Card variant="aurora">
											<CardHeader>
												<CardTitle>Aurora Card</CardTitle>
												<CardDescription>
													A card with animated aurora background.
												</CardDescription>
											</CardHeader>
											<CardContent>
												<p>
													This card has an animated gradient background with
													aurora colors.
												</p>
											</CardContent>
										</Card>
									</div>
								</div>

								{/* Separator Variants */}
								<div>
									<h3 className="text-xl font-semibold mb-4">
										Separator Variants
									</h3>
									<div className="space-y-4">
										<div className="space-y-2">
											<Label>Default Separator</Label>
											<Separator variant="default" />
										</div>
										<div className="space-y-2">
											<Label variant="glass">Glass Separator</Label>
											<Separator variant="glass" />
										</div>
										<div className="space-y-2">
											<Label variant="aurora">Aurora Separator</Label>
											<Separator variant="aurora" />
										</div>
									</div>
								</div>

								{/* Table Variants */}
								<div>
									<h3 className="text-xl font-semibold mb-4">Table Variants</h3>
									<div className="space-y-8">
										<Table variant="default">
											<TableCaption>Default Table Variant</TableCaption>
											<TableHeader>
												<TableRow variant="default">
													<TableHead>Name</TableHead>
													<TableHead>Status</TableHead>
													<TableHead>Role</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												<TableRow variant="default">
													<TableCell>John Doe</TableCell>
													<TableCell>
														<Badge variant="default">Active</Badge>
													</TableCell>
													<TableCell>Developer</TableCell>
												</TableRow>
												<TableRow variant="default">
													<TableCell>Jane Smith</TableCell>
													<TableCell>
														<Badge variant="default">Active</Badge>
													</TableCell>
													<TableCell>Designer</TableCell>
												</TableRow>
											</TableBody>
										</Table>

										<Table variant="glass">
											<TableCaption>Glass Table Variant</TableCaption>
											<TableHeader>
												<TableRow variant="glass">
													<TableHead>Name</TableHead>
													<TableHead>Status</TableHead>
													<TableHead>Role</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												<TableRow variant="glass">
													<TableCell>John Doe</TableCell>
													<TableCell>
														<Badge variant="glass">Active</Badge>
													</TableCell>
													<TableCell>Developer</TableCell>
												</TableRow>
												<TableRow variant="glass">
													<TableCell>Jane Smith</TableCell>
													<TableCell>
														<Badge variant="glass">Active</Badge>
													</TableCell>
													<TableCell>Designer</TableCell>
												</TableRow>
											</TableBody>
										</Table>

										<Table variant="aurora">
											<TableCaption>Aurora Table Variant</TableCaption>
											<TableHeader>
												<TableRow variant="aurora">
													<TableHead>Name</TableHead>
													<TableHead>Status</TableHead>
													<TableHead>Role</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												<TableRow variant="aurora">
													<TableCell>John Doe</TableCell>
													<TableCell>
														<Badge variant="aurora">Active</Badge>
													</TableCell>
													<TableCell>Developer</TableCell>
												</TableRow>
												<TableRow variant="aurora">
													<TableCell>Jane Smith</TableCell>
													<TableCell>
														<Badge variant="aurora">Active</Badge>
													</TableCell>
													<TableCell>Designer</TableCell>
												</TableRow>
											</TableBody>
										</Table>
									</div>
								</div>
							</div>
						</MotionDiv>
					</section>

					{/* Interactive Components */}
					<section className="space-y-8">
						<MotionDiv animation="fadeInUp">
							<h2 className="text-3xl font-bold mb-6">
								Interactive Components
							</h2>

							<div className="space-y-6">
								{/* Toggle Variants */}
								<div>
									<h3 className="text-xl font-semibold mb-4">
										Toggle Variants
									</h3>
									<div className="flex gap-4">
										<Toggle variant="default" aria-label="Default toggle">
											<StarIcon className="h-4 w-4" />
											Default
										</Toggle>
										<Toggle variant="glass" aria-label="Glass toggle">
											<HeartIcon className="h-4 w-4" />
											Glass
										</Toggle>
										<Toggle variant="aurora" aria-label="Aurora toggle">
											<CheckIcon className="h-4 w-4" />
											Aurora
										</Toggle>
									</div>
								</div>
								{/* Tooltip Variants */}
								<div>
									<h3 className="text-xl font-semibold mb-4">
										Tooltip Variants
									</h3>
									<div className="flex gap-4">
										<Tooltip>
											<TooltipTrigger asChild>
												<Button variant="outline">Default Tooltip</Button>
											</TooltipTrigger>
											<TooltipContent variant="default">
												<p>This is a default tooltip</p>
											</TooltipContent>
										</Tooltip>

										<Tooltip>
											<TooltipTrigger asChild>
												<Button variant="outline">Glass Tooltip</Button>
											</TooltipTrigger>
											<TooltipContent variant="glass">
												<p>This is a glass tooltip</p>
											</TooltipContent>
										</Tooltip>

										<Tooltip>
											<TooltipTrigger asChild>
												<Button variant="outline">Aurora Tooltip</Button>
											</TooltipTrigger>
											<TooltipContent variant="aurora">
												<p>This is an aurora tooltip</p>
											</TooltipContent>
										</Tooltip>
									</div>
								</div>
								{/* Dialog & Sheet */}
								<div className="flex gap-4">
									<Dialog>
										<DialogTrigger asChild>
											<Button variant="glass">Open Glass Dialog</Button>
										</DialogTrigger>
										<DialogContent variant="glass">
											<DialogHeader>
												<DialogTitle>Glass Dialog</DialogTitle>
												<DialogDescription>
													This dialog uses the glass variant with backdrop blur.
												</DialogDescription>
											</DialogHeader>
											<DialogFooter>
												<Button variant="glass">Confirm</Button>
											</DialogFooter>
										</DialogContent>
									</Dialog>

									<Sheet>
										<SheetTrigger asChild>
											<Button variant="aurora">Open Aurora Sheet</Button>
										</SheetTrigger>
										<SheetContent variant="aurora">
											<SheetHeader>
												<SheetTitle>Aurora Sheet</SheetTitle>
												<SheetDescription>
													This sheet uses the aurora variant with gradient
													background.
												</SheetDescription>
											</SheetHeader>
										</SheetContent>
									</Sheet>
								</div>{" "}
								{/* Toast Examples */}
								<div>
									<h3 className="text-xl font-semibold mb-4">
										Toast Notifications
									</h3>
									<div className="space-y-4">
										<div className="flex gap-4">
											<Button
												variant="default"
												onClick={() =>
													toast("Default toast notification!", {
														description: "This is a default toast message.",
													})
												}
											>
												Show Default Toast
											</Button>
											<Button
												variant="glass"
												onClick={() =>
													toast.glass.info("Glass toast notification!", {
														description:
															"This is a glass variant toast message.",
													})
												}
											>
												Show Glass Toast
											</Button>
											<Button
												variant="aurora"
												onClick={() =>
													toast.aurora("Aurora toast notification!", {
														description:
															"This is an aurora variant toast message.",
													})
												}
											>
												Show Aurora Toast
											</Button>
										</div>

										<div className="grid grid-cols-2 gap-4">
											<div className="space-y-2">
												<h4 className="font-medium">Glass Variants</h4>
												<div className="flex flex-wrap gap-2">
													<Button
														size="sm"
														variant="outline"
														onClick={() =>
															toast.glass.success("Glass Success!")
														}
													>
														Glass Success
													</Button>
													<Button
														size="sm"
														variant="outline"
														onClick={() => toast.glass.error("Glass Error!")}
													>
														Glass Error
													</Button>
													<Button
														size="sm"
														variant="outline"
														onClick={() =>
															toast.glass.warning("Glass Warning!")
														}
													>
														Glass Warning
													</Button>
													<Button
														size="sm"
														variant="outline"
														onClick={() => toast.glass.info("Glass Info!")}
													>
														Glass Info
													</Button>
												</div>
											</div>

											<div className="space-y-2">
												<h4 className="font-medium">Aurora Variants</h4>
												<div className="flex flex-wrap gap-2">
													<Button
														size="sm"
														variant="outline"
														onClick={() =>
															toast.aurora.success("Aurora Success!")
														}
													>
														Aurora Success
													</Button>
													<Button
														size="sm"
														variant="outline"
														onClick={() => toast.aurora.error("Aurora Error!")}
													>
														Aurora Error
													</Button>
													<Button
														size="sm"
														variant="outline"
														onClick={() =>
															toast.aurora.warning("Aurora Warning!")
														}
													>
														Aurora Warning
													</Button>
													<Button
														size="sm"
														variant="outline"
														onClick={() => toast.aurora.info("Aurora Info!")}
													>
														Aurora Info
													</Button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</MotionDiv>
					</section>

					{/* Mixed Theme Examples */}
					<section className="space-y-8">
						<MotionDiv animation="fadeInUp">
							<h2 className="text-3xl font-bold mb-6">Mixed Theme Examples</h2>

							<div className="grid md:grid-cols-2 gap-8">
								{/* Glass Theme Form */}
								<Card variant="glass" className="p-6">
									<CardHeader className="px-0">
										<CardTitle>Glass Theme Form</CardTitle>
										<CardDescription>
											A complete form using glass variants throughout.
										</CardDescription>
									</CardHeader>
									<CardContent className="px-0 space-y-4">
										<div className="space-y-2">
											<Label variant="glass">Name</Label>
											<Input variant="glass" placeholder="Enter your name" />
										</div>
										<div className="space-y-2">
											<Label variant="glass">Message</Label>
											<Textarea variant="glass" placeholder="Your message..." />
										</div>
										<div className="flex items-center space-x-2">
											<Checkbox id="glass-terms" variant="glass" />
											<Label htmlFor="glass-terms" variant="glass">
												I agree to the terms
											</Label>
										</div>
										<Separator variant="glass" />
										<Button variant="glass" className="w-full">
											Submit
										</Button>
									</CardContent>
								</Card>

								{/* Aurora Theme Dashboard */}
								<Card variant="aurora" className="p-6">
									<CardHeader className="px-0">
										<CardTitle>Aurora Theme Dashboard</CardTitle>
										<CardDescription>
											A dashboard section using aurora variants.
										</CardDescription>
									</CardHeader>
									<CardContent className="px-0 space-y-4">
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-2">
												<Avatar variant="aurora">
													<AvatarFallback variant="aurora">AU</AvatarFallback>
												</Avatar>
												<div>
													<Label variant="aurora">Aurora User</Label>
													<Badge variant="aurora" className="ml-2">
														Pro
													</Badge>
												</div>
											</div>
											<Switch variant="aurora" />
										</div>
										<div className="space-y-2">
											<Label variant="aurora">Progress (85%)</Label>
											<Progress variant="aurora" value={85} />
										</div>
										<Tabs variant="aurora" defaultValue="overview">
											<TabsList>
												<TabsTrigger value="overview">Overview</TabsTrigger>
												<TabsTrigger value="settings">Settings</TabsTrigger>
											</TabsList>
											<TabsContent value="overview">
												Aurora overview content
											</TabsContent>
											<TabsContent value="settings">
												Aurora settings content
											</TabsContent>
										</Tabs>
										<Button variant="aurora" className="w-full">
											Aurora Action
										</Button>
									</CardContent>
								</Card>
							</div>
						</MotionDiv>
					</section>

					{/* Floating Elements */}
					<section className="relative py-20">
						<MotionDiv animation="fadeInUp" className="text-center">
							<h2 className="text-3xl font-bold mb-6">
								Component Showcase Complete
							</h2>
							<p className="text-muted-foreground max-w-lg mx-auto mb-8">
								All component variants have been implemented with consistent
								theming. Try switching between light and dark modes to see the
								full effect.
							</p>
							<div className="flex gap-4 justify-center">
								<Button variant="glass" size="lg">
									View Documentation
								</Button>
								<Button variant="aurora" size="lg">
									Get Started
								</Button>
							</div>
						</MotionDiv>

						<FloatingElement duration={3} className="absolute top-10 left-20">
							<div className="w-12 h-12 bg-primary/20 rounded-full" />
						</FloatingElement>

						<FloatingElement
							duration={4}
							direction="right"
							className="absolute top-32 right-32"
						>
							<div className="w-8 h-8 bg-secondary/30 rounded-full" />
						</FloatingElement>

						<FloatingElement
							duration={5}
							direction="down"
							className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
						>
							<div className="w-6 h-6 bg-accent/40 rounded-full" />
						</FloatingElement>
					</section>
				</div>
			</TooltipProvider>
			<div>
				{/* Glass Components */}
				<section className="space-y-8">
					<MotionDiv animation="fadeInUp">
						<h2 className="text-3xl font-bold mb-6">Glass Components</h2>
						<div className="space-y-6">
							<GlassNav className="p-4">
								<div className="flex justify-between items-center">
									<GradientText className="text-lg font-semibold">
										Glass Navigation
									</GradientText>
									<ThemeToggle />
								</div>
							</GlassNav>

							<div className="grid md:grid-cols-2 gap-6">
								<GlassCard className="p-6">
									<h3 className="text-xl font-semibold mb-4">Glass Card</h3>
									<p className="text-muted-foreground mb-4">
										This is a glass morphism card with backdrop blur effects.
									</p>
									<div className="space-y-3">
										<GlassInput placeholder="Enter your name..." />
										<div className="flex gap-2">
											<GlassButton>Submit</GlassButton>
											<GlassButton variant="secondary">Cancel</GlassButton>
										</div>
									</div>
								</GlassCard>

								<div className="space-y-4">
									<h3 className="text-xl font-semibold">
										Interactive Elements
									</h3>
									<div className="grid grid-cols-2 gap-3">
										<GlassButton>Glass Button</GlassButton>
										<GlassButton variant="secondary">Secondary</GlassButton>
										<GlassButton variant="ghost">Outline</GlassButton>
										<GlassButton disabled>Disabled</GlassButton>
									</div>
								</div>
							</div>
						</div>
					</MotionDiv>
				</section>
				{/* Animation Showcase */}
				<section className="space-y-8">
					<MotionDiv animation="fadeInUp">
						<h2 className="text-3xl font-bold mb-6">Animation Examples</h2>
					</MotionDiv>

					<MotionList
						ref={stagger.ref}
						variants={stagger.containerVariants}
						initial={stagger.initial}
						animate={stagger.animate}
						className="grid md:grid-cols-3 gap-6"
					>
						<MotionItem>
							<MotionCard hoverEffect className="p-6">
								<h3 className="text-lg font-semibold mb-2">
									Staggered Animation
								</h3>
								<p className="text-sm text-muted-foreground">
									This card appears with staggered animation timing.
								</p>
							</MotionCard>
						</MotionItem>

						<MotionItem>
							<MotionCard hoverEffect className="p-6">
								<h3 className="text-lg font-semibold mb-2">Hover Effects</h3>
								<p className="text-sm text-muted-foreground">
									Hover over this card to see the lift animation.
								</p>
							</MotionCard>
						</MotionItem>

						<MotionItem>
							<MotionCard hoverEffect className="p-6">
								<h3 className="text-lg font-semibold mb-2">Motion Card</h3>
								<p className="text-sm text-muted-foreground">
									All cards have smooth entrance and hover animations.
								</p>
							</MotionCard>
						</MotionItem>
					</MotionList>
				</section>
				{/* Floating Elements */}
				<section className="relative py-20">
					<MotionDiv animation="fadeInUp" className="text-center">
						<h2 className="text-3xl font-bold mb-6">Floating Elements</h2>
						<p className="text-muted-foreground max-w-lg mx-auto">
							These elements float and move with subtle physics-based
							animations.
						</p>
					</MotionDiv>

					<FloatingElement duration={3} className="absolute top-10 left-20">
						<div className="w-12 h-12 bg-primary/20 rounded-full" />
					</FloatingElement>

					<FloatingElement
						duration={4}
						direction="right"
						className="absolute top-32 right-32"
					>
						<div className="w-8 h-8 bg-secondary/30 rounded-full" />
					</FloatingElement>

					<FloatingElement
						duration={5}
						direction="left"
						className="absolute bottom-20 left-1/3"
					>
						<div className="w-6 h-6 bg-accent/40 rounded-full" />
					</FloatingElement>
				</section>
				{/* Input Showcase */}
				<section className="space-y-8">
					<MotionDiv animation="fadeInUp">
						<h2 className="text-3xl font-bold mb-6">Input Variants</h2>
						<div className="grid md:grid-cols-3 gap-6">
							<div className="space-y-4">
								<h3 className="text-lg font-semibold">Default Input</h3>
								<Input placeholder="Enter your name..." />
								<Input type="email" placeholder="Enter your email..." />
							</div>

							<div className="space-y-4">
								<h3 className="text-lg font-semibold">Glass Input</h3>
								<Input variant="glass" placeholder="Glass input style..." />
								<Input
									variant="glass"
									type="password"
									placeholder="Enter password..."
								/>
							</div>

							<div className="space-y-4">
								<h3 className="text-lg font-semibold">Aurora Input</h3>
								<Input
									variant="aurora"
									placeholder="Aurora gradient input..."
								/>
								<Input
									variant="aurora"
									type="search"
									placeholder="Search with aurora..."
								/>
							</div>
						</div>
					</MotionDiv>
				</section>
				{/* Dialog Showcase */}
				<section className="space-y-8">
					<MotionDiv animation="fadeInUp">
						<h2 className="text-3xl font-bold mb-6">Dialog Variants</h2>
						<div className="flex gap-4">
							<Dialog>
								<DialogTrigger asChild>
									<Button variant="default">Default Dialog</Button>
								</DialogTrigger>
								<DialogContent variant="default">
									<DialogHeader>
										<DialogTitle>Default Dialog</DialogTitle>
										<DialogDescription>
											This is a standard dialog with default styling.
										</DialogDescription>
									</DialogHeader>
									<div className="space-y-4">
										<Input placeholder="Enter some text..." />
									</div>
									<DialogFooter>
										<Button variant="outline">Cancel</Button>
										<Button>Save</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>

							<Dialog>
								<DialogTrigger asChild>
									<Button variant="glass">Glass Dialog</Button>
								</DialogTrigger>
								<DialogContent variant="glass">
									<DialogHeader>
										<DialogTitle>Glass Dialog</DialogTitle>
										<DialogDescription>
											This dialog features glass morphism effects with backdrop
											blur.
										</DialogDescription>
									</DialogHeader>
									<div className="space-y-4">
										<Input variant="glass" placeholder="Glass input..." />
									</div>
									<DialogFooter>
										<Button variant="ghost">Cancel</Button>
										<Button variant="glass">Save</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>

							<Dialog>
								<DialogTrigger asChild>
									<Button variant="aurora">Aurora Dialog</Button>
								</DialogTrigger>
								<DialogContent variant="aurora">
									<DialogHeader>
										<DialogTitle>Aurora Dialog</DialogTitle>
										<DialogDescription>
											This dialog showcases the aurora gradient styling.
										</DialogDescription>
									</DialogHeader>
									<div className="space-y-4">
										<Input variant="aurora" placeholder="Aurora input..." />
									</div>
									<DialogFooter>
										<Button variant="ghost">Cancel</Button>
										<Button variant="aurora">Save</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</div>
					</MotionDiv>
				</section>
				{/* Enhanced Components Showcase */}
				<section className="space-y-8">
					<MotionDiv animation="fadeInUp">
						<h2 className="text-3xl font-bold mb-6">Enhanced Components</h2>
					</MotionDiv>

					{/* Sheet Showcase */}
					<MotionDiv animation="fadeInUp" delay={0.1}>
						<h3 className="text-xl font-semibold mb-4">Sheet Variants</h3>
						<div className="flex gap-4">
							<Sheet>
								<SheetTrigger asChild>
									<Button variant="default">Default Sheet</Button>
								</SheetTrigger>
								<SheetContent variant="default">
									<SheetHeader>
										<SheetTitle>Default Sheet</SheetTitle>
										<SheetDescription>
											This is a standard sheet with default styling.
										</SheetDescription>
									</SheetHeader>
									<div className="py-4 space-y-4">
										<Input placeholder="Enter some text..." />
										<Button>Save Changes</Button>
									</div>
								</SheetContent>
							</Sheet>

							<Sheet>
								<SheetTrigger asChild>
									<Button variant="glass">Glass Sheet</Button>
								</SheetTrigger>
								<SheetContent variant="glass">
									<SheetHeader>
										<SheetTitle>Glass Sheet</SheetTitle>
										<SheetDescription>
											This sheet features glass morphism effects with backdrop
											blur.
										</SheetDescription>
									</SheetHeader>
									<div className="py-4 space-y-4">
										<Input variant="glass" placeholder="Glass input..." />
										<Button variant="glass">Save Changes</Button>
									</div>
								</SheetContent>
							</Sheet>

							<Sheet>
								<SheetTrigger asChild>
									<Button variant="aurora">Aurora Sheet</Button>
								</SheetTrigger>
								<SheetContent variant="aurora">
									<SheetHeader>
										<SheetTitle>Aurora Sheet</SheetTitle>
										<SheetDescription>
											This sheet showcases the aurora gradient styling.
										</SheetDescription>
									</SheetHeader>
									<div className="py-4 space-y-4">
										<Input variant="aurora" placeholder="Aurora input..." />
										<Button variant="aurora">Save Changes</Button>
									</div>
								</SheetContent>
							</Sheet>
						</div>
					</MotionDiv>

					{/* Select Showcase */}
					<MotionDiv animation="fadeInUp" delay={0.2}>
						<h3 className="text-xl font-semibold mb-4">Select Variants</h3>
						<div className="grid md:grid-cols-3 gap-6">
							<div className="space-y-4">
								<h4 className="font-medium">Default Select</h4>
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="Select an option..." />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="option1">Option 1</SelectItem>
										<SelectItem value="option2">Option 2</SelectItem>
										<SelectItem value="option3">Option 3</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-4">
								<h4 className="font-medium">Glass Select</h4>
								<Select>
									<SelectTrigger variant="glass">
										<SelectValue placeholder="Glass select..." />
									</SelectTrigger>
									<SelectContent variant="glass">
										<SelectItem value="glass1">Glass Option 1</SelectItem>
										<SelectItem value="glass2">Glass Option 2</SelectItem>
										<SelectItem value="glass3">Glass Option 3</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-4">
								<h4 className="font-medium">Aurora Select</h4>
								<Select>
									<SelectTrigger variant="aurora">
										<SelectValue placeholder="Aurora select..." />
									</SelectTrigger>
									<SelectContent variant="aurora">
										<SelectItem value="aurora1">Aurora Option 1</SelectItem>
										<SelectItem value="aurora2">Aurora Option 2</SelectItem>
										<SelectItem value="aurora3">Aurora Option 3</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</MotionDiv>

					{/* Tooltip Showcase */}
					<MotionDiv animation="fadeInUp" delay={0.3}>
						<h3 className="text-xl font-semibold mb-4">Tooltip Variants</h3>
						<TooltipProvider>
							<div className="flex gap-6">
								<Tooltip>
									<TooltipTrigger asChild>
										<Button variant="default">Default Tooltip</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>This is a default tooltip</p>
									</TooltipContent>
								</Tooltip>

								<Tooltip>
									<TooltipTrigger asChild>
										<Button variant="glass">Glass Tooltip</Button>
									</TooltipTrigger>
									<TooltipContent variant="glass">
										<p>This is a glass tooltip with backdrop blur</p>
									</TooltipContent>
								</Tooltip>

								<Tooltip>
									<TooltipTrigger asChild>
										<Button variant="aurora">Aurora Tooltip</Button>
									</TooltipTrigger>
									<TooltipContent variant="aurora">
										<p>This is an aurora tooltip with gradient background</p>
									</TooltipContent>
								</Tooltip>
							</div>
						</TooltipProvider>
					</MotionDiv>

					{/* Toast Showcase */}
					<MotionDiv animation="fadeInUp" delay={0.4}>
						<h3 className="text-xl font-semibold mb-4">Toast Notifications</h3>
						<div className="grid md:grid-cols-3 gap-4">
							<div className="space-y-2">
								<h4 className="font-medium">Default Toasts</h4>
								<div className="space-y-2">
									<Button
										size="sm"
										onClick={() => toast.success("Success toast message!")}
									>
										Success Toast
									</Button>
									<Button
										size="sm"
										variant="destructive"
										onClick={() => toast.error("Error toast message!")}
									>
										Error Toast
									</Button>
								</div>
							</div>{" "}
							<div className="space-y-2">
								<h4 className="font-medium">Glass Toasts</h4>
								<div className="space-y-2">
									<Button
										size="sm"
										variant="glass"
										onClick={() => toast.glass.success("Glass success toast!")}
									>
										Glass Success
									</Button>
									<Button
										size="sm"
										variant="glass"
										onClick={() => toast.glass.error("Glass error toast!")}
									>
										Glass Error
									</Button>
								</div>
							</div>
							<div className="space-y-2">
								<h4 className="font-medium">Aurora Toasts</h4>
								<div className="space-y-2">
									<Button
										size="sm"
										variant="aurora"
										onClick={() =>
											toast.aurora.success("Aurora success toast!")
										}
									>
										Aurora Success
									</Button>
									<Button
										size="sm"
										variant="aurora"
										onClick={() => toast.aurora.error("Aurora error toast!")}
									>
										Aurora Error
									</Button>
								</div>
							</div>
						</div>
					</MotionDiv>
				</section>{" "}
			</div>
		</>
	);
}
