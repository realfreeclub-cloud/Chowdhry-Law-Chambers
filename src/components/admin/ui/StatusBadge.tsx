import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
    {
        variants: {
            status: {
                published: "bg-green-100 text-green-800",
                draft: "bg-slate-100 text-slate-800",
                pending: "bg-amber-100 text-amber-800",
                rejected: "bg-red-100 text-red-800",
                archived: "bg-gray-100 text-gray-800",
                new: "bg-blue-100 text-blue-800",
            },
        },
        defaultVariants: {
            status: "draft",
        },
    }
);

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement>, Omit<VariantProps<typeof badgeVariants>, "status"> {
    status: string;
}

export function StatusBadge({ className, status, ...props }: StatusBadgeProps) {
    // Normalize status string to match variant keys (lowercase)
    const normalizedStatus = status?.toLowerCase() || "draft";

    // Fallback to draft if variant doesn't exist
    const variant = ["published", "draft", "pending", "rejected", "archived", "new"].includes(normalizedStatus)
        ? normalizedStatus
        : "draft";

    return (
        <span className={badgeVariants({ status: variant as any, className })} {...props}>
            {status}
        </span>
    );
}
