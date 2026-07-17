import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  console.log(session);
  if (!session) redirect("/signin");
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "16rem",
        "--sidebar-width-icon": "3rem",
        minHeight: "calc(100vh - 65px)"
      } as React.CSSProperties}
    >
      <Sidebar />
      <SidebarInset style={{ minHeight: "calc(100vh - 65px)" }}>
        <header className="flex h-14 items-center gap-2 border-b bg-background px-4 md:hidden">
          <SidebarTrigger className="cursor-pointer" />
          <Separator orientation="vertical" className="h-14" />
          <span className="font-semibold text-sm">Account Menu</span>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
