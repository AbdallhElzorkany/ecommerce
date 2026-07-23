import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import {
  ShoppingCart,
  User,
  Store,
  LayoutGrid,
  PackageSearch,
  UserPlus,
  LogOut,
  LogIn,
  ShoppingBag,
  MapPin,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CartButton from "@/components/cartButton";
import WishlistButton from "@/components/wishlistButton";
const accountDropdownContent = [
  { title: "Orders", href: "/account/orders", icon: ShoppingBag },
  { title: "Addresses", href: "/account/addresses", icon: MapPin },
  { title: "Security", href: "/account/security", icon: Shield },
];
const signInDropdownContent = [
  { title: "Sign In", href: "/signin", icon: LogIn },
  { title: "Sign Up", href: "/signup", icon: UserPlus },
];
const navLinks = [
  { title: "Brands", href: "/brands", icon: Store },
  { title: "Categories", href: "/categories", icon: LayoutGrid },
  { title: "Products", href: "/products", icon: PackageSearch },
];
export default async function Navbar() {
  const session = await auth();
  const isSignedIn = !!session?.user;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingCart className="size-6" />
            <span className="inline-block font-bold text-xl tracking-tight text-primary">
              Souq
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <link.icon className="mr-2 size-5" />
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center justify-end space-x-2">
          {isSignedIn && (
            <>
              <WishlistButton />
              <CartButton />
            </>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="cursor-pointer"
                variant="ghost"
                size="icon"
                title="Account"
              >
                <User className="size-5" />
                <span className="sr-only">Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isSignedIn ? (
                <>
                  {accountDropdownContent.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        href={item.href}
                        className="w-full cursor-pointer flex items-center gap-2"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <form
                    action={async () => {
                      "use server";
                      await signOut();
                    }}
                    className="w-full"
                  >
                    <Button
                      variant="destructive"
                      type="submit"
                      className="w-full text-left cursor-pointer flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </form>
                </>
              ) : (
                <>
                  {signInDropdownContent.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        href={item.href}
                        className="w-full cursor-pointer flex items-center gap-2"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
