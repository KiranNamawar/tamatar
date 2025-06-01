import { statusColors } from "@/lib/style-utils";
/**
 * Status Badge Component
 *
 * A badge component that displays status information with appropriate styling
 * based on our design system.
 */
import { cn } from "@/lib/utils";

export type StatusType = "success" | "error" | "warning" | "info" | "default";

interface StatusBadgeProps {
	status: StatusType;
	label: string;
	className?: string;
	icon?: React.ReactNode;
}

export function StatusBadge({
	status,
	label,
	className,
	icon,
}: StatusBadgeProps) {
	return (
		<span
			className={cn(
				"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
				statusColors[status],
				className,
			)}
		>
			{icon && <span className="mr-1">{icon}</span>}
			{label}
		</span>
	);
}
