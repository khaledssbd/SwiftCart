"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import {
  LogOut,
  ShoppingCart,
  ChevronDown,
  Search,
  Menu,
  CircleX,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/services/AuthService";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "@/constants";
import { useAppSelector } from "@/redux/hooks";
import { orderedProductsSelector } from "@/redux/features/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { getProfile } from "@/services/Profile";
import { IProfile } from "@/types/profile";
import SearchInput from "../modules/home/SearchInput/SearchInput";
import MegaMenu from "./MegaMenu";
import { useFetchData } from "./Action/useFetchData";

export default function Navbar() {
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const products = useAppSelector(orderedProductsSelector);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<IProfile | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory((prev) =>
      prev === categoryName ? null : categoryName
    );
  };
  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };
  const fetchUpdatedUser = async () => {
    const { data } = await getProfile();
    setUpdatedUser(data);
  };
  useEffect(() => {
    if (user) {
      fetchUpdatedUser();
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      if (isMegaMenuOpen) {
        setIsMegaMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMegaMenuOpen]);

  const { categories, brands, featured, flash, trending } = useFetchData();

  const menuCategories = [
    {
      name: "All Products",
      subcategories: [],
      query: "",
    },
    {
      name: "Categories",
      subcategories: categories || [],
      query: "categories",
    },
    {
      name: "Brands",
      subcategories: brands || [],
      query: "brands",
    },
    {
      name: "Featured Products",
      subcategories: featured || [],
      query: "products",
    },
    {
      name: "Flash Sales",
      subcategories: flash || [],
      query: "products",
    },

    {
      name: "Trending Products",
      subcategories: trending || [],
      query: "products",
    },
  ];

  return (
    <header className="border-b bg-secondary w-full sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex justify-between items-center h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <CircleX className="text-primary" size={20} />
              ) : (
                <Menu className="text-primary" size={20} />
              )}
            </button>

            <Link href="/" className="shrink-0">
              <motion.div
                className="relative w-28 h-10 md:w-40 md:h-12"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Image
                  src="/logo.png"
                  alt="SwiftCart Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 7rem, (max-width: 1024px) 10rem, 12rem"
                />
              </motion.div>
            </Link>
          </div>

          {/* Desktop Search - Hidden on mobile */}
          <div className="hidden md:flex max-w-md flex-grow mx-4">
            <motion.div
              className="relative w-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SearchInput />
            </motion.div>
          </div>

          {/* Right Side Navigation */}
          <nav className="flex items-center gap-2">
            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100"
            >
              <Search className="text-primary" size={20} />
            </button>

            <motion.div
              className="flex gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Link href="/cart" passHref>
                <Button
                  variant="outline"
                  className="rounded-full size-10 flex bg-secondary text-primary items-center justify-center gap-1 relative"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {products?.length > 0 && (
                    <motion.span
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                    >
                      {products?.length}
                    </motion.span>
                  )}
                </Button>
              </Link>
            </motion.div>

            {user?.email ? (
              <>
                {user?.role === "user" && updatedUser?.hasShop === false ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Link href="/create-shop">
                      <Button className="rounded-full hidden md:block">
                        Create Shop
                      </Button>
                    </Link>
                  </motion.div>
                ) : null}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar>
                        {updatedUser?.profilePhoto && (
                          <AvatarImage
                            src={updatedUser?.profilePhoto}
                            alt="User avatar"
                            className="object-cover"
                          />
                        )}
                        <AvatarFallback className="text-2xl font-bold bg-indigo-500 text-white">
                          {user?.name[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-[200px]">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link href="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
                      </DropdownMenuItem>
                      {user?.role === "user" && (
                        <DropdownMenuItem>
                          <Link href="/user/dashboard">My Shop</Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-500 cursor-pointer focus:bg-red-50"
                        onClick={handleLogOut}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Link href="/login">
                  <Button
                    className="rounded-full bg-primary text-secondary font-semibold hover:text-primary hover:bg-secondary hover:border-primary"
                    variant="outline"
                  >
                    Login
                  </Button>
                </Link>
              </motion.div>
            )}
          </nav>
        </div>

        {/* Mobile Search - Appears when search button clicked */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              className="md:hidden py-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <SearchInput />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categories Navigation - Desktop */}
        <MegaMenu categories={menuCategories} />

        {/* Mobile Menu - Appears when hamburger clicked */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden bg-white shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-3 space-y-4">
                <div className="space-y-2 rounded-lg">
                  <div>
                    {user?.role === "user" && updatedUser?.hasShop === false ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Link href="/create-shop">
                          <Button className="rounded-full ">Create Shop</Button>
                        </Link>
                      </motion.div>
                    ) : null}
                  </div>
                  {menuCategories.map((category, idx) => (
                    <div key={idx + 1} className="border-b last:border-0">
                      {category.subcategories.length === 0 ? (
                        // Render as Link if no subcategories
                        <Link
                          href="/products" // Direct link for "All Products"
                          className="w-full text-left px-2 py-3 flex justify-between items-center"
                        >
                          {category.name}
                        </Link>
                      ) : (
                        // Otherwise, render dropdown button and subcategories
                        <>
                          <button
                            onClick={() => toggleCategory(category.name)}
                            className="w-full text-left px-2 py-3 flex justify-between items-center"
                            aria-expanded={expandedCategory === category.name}
                          >
                            {category.name}
                            {expandedCategory === category.name ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </button>

                          {expandedCategory === category.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 space-y-2"
                            >
                              {category.subcategories.map((sub, idx) => (
                                <Link
                                  key={idx + 1}
                                  href={
                                    category.query === "products"
                                      ? `/products/${sub.id}`
                                      : {
                                          pathname: "/products",
                                          query: { [category.query]: sub.id },
                                        }
                                  }
                                  className="block py-2 text-sm hover:text-primary transition-colors"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
