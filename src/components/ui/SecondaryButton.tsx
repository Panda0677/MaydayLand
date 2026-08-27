import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SecondaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  children: ReactNode;
  className?: string;
};

export function SecondaryButton({ href, children, className, ...props }: SecondaryButtonProps) {
  const classes = cn(
    "inline-flex h-12 items-center justify-center gap-1.5 rounded-2xl border border-line bg-white px-5 text-sm font-bold text-ink transition active:scale-[0.99] active:bg-page",
    className,
  );

  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  );
}
