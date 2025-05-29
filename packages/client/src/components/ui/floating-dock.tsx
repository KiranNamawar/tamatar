/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import { PanelBottomClose, PanelBottomOpen } from "lucide-react";
import {
	AnimatePresence,
	type MotionValue,
	motion,
	useMotionValue,
	useSpring,
	useTransform,
} from "motion/react";
import { useRef, useState } from "react";

export const FloatingDock = ({
	items,
	desktopClassName,
	mobileClassName,
}: {
	items: { title: string; icon: React.ReactNode; to: LinkProps["to"] }[];
	desktopClassName?: string;
	mobileClassName?: string;
}) => {
	return (
		<>
			<FloatingDockDesktop
				items={items}
				className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 ${desktopClassName}`}
			/>
			<FloatingDockMobile
				items={items}
				className={`fixed bottom-4 right-4 z-50 ${mobileClassName}`}
			/>
		</>
	);
};

const FloatingDockMobile = ({
	items,
	className,
}: {
	items: { title: string; icon: React.ReactNode; to: LinkProps["to"] }[];
	className?: string;
}) => {
	const [open, setOpen] = useState(false);
	return (
		<div className={cn("relative block md:hidden", className)}>
			<AnimatePresence>
				{open && (
					<motion.div
						layoutId="nav"
						className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
					>
						{items.map((item, idx) => (
							<motion.div
								key={item.title}
								initial={{ opacity: 0, y: 10 }}
								animate={{
									opacity: 1,
									y: 0,
								}}
								exit={{
									opacity: 0,
									y: 10,
									transition: {
										delay: idx * 0.05,
									},
								}}
								transition={{ delay: (items.length - 1 - idx) * 0.05 }}
							>
								{" "}
								<Link
									to={item.to}
									key={item.title}
									className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 dark:bg-gray-900/90 backdrop-blur-lg border border-white/60 dark:border-gray-800/80"
								>
									<div className="flex items-center justify-center h-4 w-4">
										{item.icon}
									</div>
								</Link>
							</motion.div>
						))}
					</motion.div>
				)}
			</AnimatePresence>{" "}
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 dark:bg-gray-900/90 backdrop-blur-lg border border-white/60 dark:border-gray-800/80"
			>
				{open ? (
					<PanelBottomClose className="h-5 w-5 text-muted-foreground" />
				) : (
					<PanelBottomOpen className="h-5 w-5 text-muted-foreground" />
				)}
			</button>
		</div>
	);
};

const FloatingDockDesktop = ({
	items,
	className,
}: {
	items: { title: string; icon: React.ReactNode; to: LinkProps["to"] }[];
	className?: string;
}) => {
	const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
	return (
		<motion.div
			onMouseMove={(e) => mouseX.set(e.pageX)}
			onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
			className={cn(
				"mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-white/80 dark:bg-gray-900/90 backdrop-blur-lg border border-white/60 dark:border-gray-800/80 px-4 pb-3 md:flex",
				className,
			)}
		>
			{items.map((item) => (
				<IconContainer mouseX={mouseX} key={item.title} {...item} />
			))}
		</motion.div>
	);
};

function IconContainer({
	mouseX,
	title,
	icon,
	to,
}: {
	mouseX: MotionValue;
	title: string;
	icon: React.ReactNode;
	to: LinkProps["to"];
}) {
	const ref = useRef<HTMLDivElement>(null);

	const distance = useTransform(mouseX, (val) => {
		const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

		return val - bounds.x - bounds.width / 2;
	});

	const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
	const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

	const widthTransformIcon = useTransform(
		distance,
		[-150, 0, 150],
		[20, 40, 20],
	);
	const heightTransformIcon = useTransform(
		distance,
		[-150, 0, 150],
		[20, 40, 20],
	);

	const width = useSpring(widthTransform, {
		mass: 0.1,
		stiffness: 150,
		damping: 12,
	});
	const height = useSpring(heightTransform, {
		mass: 0.1,
		stiffness: 150,
		damping: 12,
	});

	const widthIcon = useSpring(widthTransformIcon, {
		mass: 0.1,
		stiffness: 150,
		damping: 12,
	});
	const heightIcon = useSpring(heightTransformIcon, {
		mass: 0.1,
		stiffness: 150,
		damping: 12,
	});

	const [hovered, setHovered] = useState(false);

	return (
		<Link to={to}>
			<motion.div
				ref={ref}
				style={{ width, height }}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				className="relative flex aspect-square items-center justify-center rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm"
			>
				<AnimatePresence>
					{hovered && (
						<motion.div
							initial={{ opacity: 0, y: 10, x: "-50%" }}
							animate={{ opacity: 1, y: 0, x: "-50%" }}
							exit={{ opacity: 0, y: 2, x: "-50%" }}
							className="absolute -top-10 left-1/2 w-fit rounded-md border border-border bg-popover px-2 py-1 text-xs whitespace-pre text-popover-foreground leading-normal"
						>
							{title}
						</motion.div>
					)}
				</AnimatePresence>
				<motion.div
					style={{ width: widthIcon, height: heightIcon }}
					className="flex items-center justify-center"
				>
					{icon}
				</motion.div>
			</motion.div>
		</Link>
	);
}
