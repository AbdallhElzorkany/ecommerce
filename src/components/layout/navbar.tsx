import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import {
  ShoppingCart,
  Heart,
  User,
  Store,
  LayoutGrid,
  PackageSearch,
  UserPlus,
  LogOut,
  LogIn,
  Settings,
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
import CartButton from "../ui/cartButton";
import WishlistButton from "../ui/wishlistButton";
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
            <Link
              href="/brands"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <Store className="mr-2 size-5" />
              Brands
            </Link>
            <Link
              href="/categories"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <LayoutGrid className="mr-2 size-5" />
              Categories
            </Link>
            <Link
              href="/products"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <PackageSearch className="mr-2 size-5" />
              Products
            </Link>
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
                  <DropdownMenuItem asChild>
                    <Link
                      href="/account/orders"
                      className="w-full cursor-pointer flex items-center gap-2"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/account/addresses"
                      className="w-full cursor-pointer flex items-center gap-2"
                    >
                      <MapPin className="h-4 w-4" />
                      Addresses
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/account/security"
                      className="w-full cursor-pointer flex items-center gap-2"
                    >
                      <Shield className="h-4 w-4" />
                      Security
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/account/settings"
                      className="w-full cursor-pointer flex items-center gap-2"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
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
                  <DropdownMenuItem asChild>
                    <Link
                      href="/signin"
                      className="w-full cursor-pointer flex items-center gap-2"
                    >
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/signup"
                      className="w-full cursor-pointer flex items-center gap-2"
                    >
                      <UserPlus className="h-4 w-4" />
                      Sign Up
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
