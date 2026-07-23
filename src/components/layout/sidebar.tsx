"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, ShoppingBag, Shield, Heart, ShoppingCart } from "lucide-react";

import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const sidebarItems = [
  { title: "Cart", href: "/account/cart", icon: ShoppingCart },
  { title: "Wishlist", href: "/account/wishlist", icon: Heart },
  { title: "Orders", href: "/account/orders", icon: ShoppingBag },
  { title: "Addresses", href: "/account/addresses", icon: MapPin },
  { title: "Security", href: "/account/security", icon: Shield },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <ShadcnSidebar className="top-16 h-[calc(100svh-4rem)]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Account Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton size={"lg"} variant={"outline"} asChild isActive={isActive}>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </ShadcnSidebar>
  );
}
