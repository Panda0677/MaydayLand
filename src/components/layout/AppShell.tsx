import type { ReactNode } from "react";
import { BottomNav } from "@/components/layout/BottomNav";

type AppShellProps = {
  children: ReactNode;
  hideBottomNav?: boolean;
};

export function AppShell({ children, hideBottomNav = false }: AppShellProps) {
  return (
    <div className="min-h-dvh bg-[#EEF0F3]">
      <main className="phone-shell relative">{children}</main>
      {!hideBottomNav && <BottomNav />}
    </div>
  );
}
