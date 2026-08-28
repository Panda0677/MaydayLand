import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type SecondaryActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
};

export function SecondaryActionButton({ href, icon: Icon, children, className, ...props }: SecondaryActionButtonProps) {
  const classes = cn(
    "inline-flex h-12 min-w-[108px] flex-none items-center justify-center gap-1.5 whitespace-nowrap rounded-2xl border border-line bg-white px-3 text-xs font-bold text-ink transition active:scale-[0.99] active:bg-page",
    className,
  );
  const content = (
    <>
      <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
      <span className="whitespace-nowrap">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link className={classes} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} type="button" {...props}>
      {content}
    </button>
  );
}
