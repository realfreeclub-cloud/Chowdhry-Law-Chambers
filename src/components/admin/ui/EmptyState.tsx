import { LucideIcon, FolderOpen } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    actionLink?: string;
    onAction?: () => void;
    icon?: LucideIcon;
}

export function EmptyState({ title, description, actionLabel, actionLink, onAction, icon: Icon = FolderOpen }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">{title}</h3>
            <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>
            {actionLabel && (
                <>
                    {onAction ? (
                        <button
                            onClick={onAction}
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[var(--secondary)] rounded-lg hover:bg-opacity-90 transition-colors"
                        >
                            {actionLabel}
                        </button>
                    ) : actionLink ? (
                        <Link
                            href={actionLink}
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[var(--secondary)] rounded-lg hover:bg-opacity-90 transition-colors"
                        >
                            {actionLabel}
                        </Link>
                    ) : null}
                </>
            )}
        </div>
    );
}
