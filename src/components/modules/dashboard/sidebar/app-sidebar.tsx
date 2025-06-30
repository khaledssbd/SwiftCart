'use client';

import * as React from 'react';
import {
  Bot,
  // LifeBuoy,
  // Send,
  Settings,
  SquareTerminal,
  ShoppingCart,
  Package,
  Tag,
  Award,
  CreditCard,
  DollarSign,
  File,
  User,
} from 'lucide-react';
import Link from 'next/link';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import Image from 'next/image';

// User Navigation Items
const USER_NAV_ITEMS = [
  {
    title: 'Dashboard',
    url: '/user/dashboard',
    icon: SquareTerminal,
    isActive: true,
  },
  {
    title: 'Shop',
    url: '/user/shop/products',
    icon: ShoppingCart,
    items: [
      { title: 'Products', url: '/user/shop/products', icon: Package },
      { title: 'Categories', url: '/user/shop/category', icon: Tag },
      { title: 'Brands', url: '/user/shop/brand', icon: Award },
      { title: 'Coupons', url: '/user/shop/manage-coupon', icon: CreditCard },
    ],
  },
  {
    title: 'Profile',
    url: '/profile',
    icon: Settings,
   
  },
];

// Admin Navigation Items
const ADMIN_NAV_ITEMS = [
  {
    title: 'Admin Dashboard',
    url: '/admin/dashboard',
    icon: SquareTerminal,
    isActive: true,
  },
  {
    title: 'Shop Management',
    url: '#',
    icon: Bot,
    items: [
      { title: 'All-Shops', url: '/admin/shop/all-shops', icon: Tag },
      { title: 'Categories', url: '/admin/shop/category', icon: File },
      { title: 'Brands', url: '/admin/shop/brand', icon: Award }
    ],
  },
  {
    title: 'Payment Management',
    url: '/admin/payment',
    icon: DollarSign,
  },
  {
    title: 'User Management',
    url: '/admin/user-management',
    icon: User,
  },
  {
    title: 'Profile',
    url: '/profile',
    icon: Settings,
  },
];

// // Common Secondary Items
// const COMMON_SECONDARY_ITEMS = [
//   { title: 'Support', url: '/support', icon: LifeBuoy },
//   { title: 'Feedback', url: '/feedback', icon: Send },
// ];

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole: 'user' | 'admin'; // Role-based prop
}

export function AppSidebar({ userRole, ...props }: AppSidebarProps) {
  const navItems = userRole === 'admin' ? ADMIN_NAV_ITEMS : USER_NAV_ITEMS;

  return (
    <Sidebar  collapsible="icon" {...props}>
      <SidebarHeader>
        <LogoHeader />
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <NavMain items={navItems} />

        {/* Common Secondary Navigation */}
        {/* <div className="mt-4">
          <NavMain items={COMMON_SECONDARY_ITEMS} />
        </div> */}
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

const LogoHeader = () => (
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton size="lg" asChild>
        <Link href="/">
          <div className="w-full">
            <Image
              src="/logo.png"
              alt="SwiftCart Logo"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 7rem, (max-width: 1024px) 10rem, 12rem"
            />
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
);
