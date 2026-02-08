import { Mail } from "lucide-react";
import {
  FiGrid,
  FiUser,
  FiLayers,
  FiFileText,
  FiBookOpen,
  FiMapPin,
  FiStar,
  FiHelpCircle,
  FiSettings,
  FiGlobe,
  FiSmartphone,
  FiMonitor,
  FiDollarSign,
  FiMoreHorizontal,
  FiLogOut,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { LucideIcon } from "lucide-react";

export interface SidebarSubItem {
  title: string;
  href: string;
}

export interface SidebarItem {
  title: string;
  icon: IconType | LucideIcon;
  href: string;
  subItems?: SidebarSubItem[];
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export const SidebarMenuData: SidebarSection[] = [
  {
    title: "Main",
    items: [
      {
        title: "Dashboard",
        icon: FiGrid,
        href: "/dashboard",
      },
      // {
      //   title: "Super Admin",
      //   icon: FiUser,
      //   href: "/dashboard/super-admin",
      // },
      // {
      //   title: "Application",
      //   icon: FiLayers,
      //   href: "/dashboard/application",
      // },
    ],
  },
  {
    title: "Content (CMS)",
    items: [
      // {
      //   title: "Pages",
      //   icon: FiFileText,
      //   href: "#",
      //   subItems: [{ title: "Pages", href: "/dashboard/cms/pages" }],
      // },
      {
        title: "Blog",
        icon: FiBookOpen,
        href: "#",
        subItems: [
          { title: "All Blog", href: "/dashboard/cms/blog" },
          // { title: "Create Blog", href: "/dashboard/cms/blog/create" },
          { title: "Blog Tags", href: "/dashboard/cms/blog/tag" },
          { title: "Categories", href: "/dashboard/cms/blog/category" },
          { title: "Blog Comments", href: "/dashboard/cms/blog/comments" },
        ],
      },
      // {
      //   title: "Location",
      //   icon: FiMapPin,
      //   href: "#",
      //   subItems: [
      //     { title: "Countries", href: "/dashboard/cms/location/countries" },
      //     { title: "States", href: "/dashboard/cms/location/states" },
      //     { title: "Cities", href: "/dashboard/cms/location/cities" },
      //   ],
      // },
      // {
      //   title: "Testimonials",
      //   icon: FiStar,
      //   href: "/dashboard/cms/testimonials",
      // },
      // {
      //   title: "FAQ",
      //   icon: FiHelpCircle,
      //   href: "/dashboard/cms/faq",
      // },
    ],
  },
  // {
  //   title: "CRM",
  //   items: [
  //     {
  //       title: "Customers",
  //       icon: FiFileText,
  //       href: "#",
  //       subItems: [{ title: "Pages", href: "/dashboard/cms/pages" }],
  //     },
  //   ],
  // },
  {
    title: "User Management",
    items: [
      {
        title: "Users",
        icon: FiUser,
        href: "/dashboard/user-management/user",
        // subItems: [
        //   { title: "Users", href: "/dashboard/user-management/users" },
        // ],
      },
      {
        title: "User Permissions",
        icon: FiBookOpen,
        href: "/dashboard/user-management/permissions",
        // subItems: [
        //   { title: "Roles", href: "/dashboard/user-management/roles" },
        //   {
        //     title: "Permissions",
        //     href: "/dashboard/user-management/permissions",
        //   },
        // ],
      },
      // {
      //   title: "Delete Account Request",
      //   icon: FiMapPin,
      //   href: "#",
      //   subItems: [
      //     {
      //       title: "Delete Account Request",
      //       href: "/dashboard/user-management/delete-account-request",
      //     },
      //   ],
      // },
      {
        title: "Send Messages",
        icon: Mail,
        href: "/dashboard/user-management/send-message",
        // subItems: [
        //   { title: "Users", href: "/dashboard/user-management/users" },
        // ],
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "General Settings",
        icon: FiSettings,
        href: "#",
        subItems: [
          { title: "Profile", href: "/dashboard/settings/general/profile" },
          { title: "Security", href: "/dashboard/settings/general/security" },
          {
            title: "Notifications",
            href: "/dashboard/settings/general/notification",
          },
          // {
          //   title: "Connected Apps",
          //   href: "/dashboard/settings/general/connected-apps",
          // },
        ],
      },
      {
        title: "Website",
        icon: FiGlobe,
        href: "#",
        subItems: [
          // {
          //   title: "System Settings",
          //   href: "/dashboard/settings/website/system",
          // },
          {
            title: "Company Settings",
            href: "/dashboard/settings/website/company",
          },
          {
            title: "Localization",
            href: "/dashboard/settings/website/localization",
          },
          // { title: "Prefixes", href: "/dashboard/settings/website/prefixes" },
          {
            title: "Preference",
            href: "/dashboard/settings/website/preference",
          },
          {
            title: "Appearance",
            href: "/dashboard/settings/website/appearance",
          },
          // {
          //   title: "Social Authentication",
          //   href: "/dashboard/settings/website/social-auth",
          // },
          // { title: "Language", href: "/dashboard/settings/website/language" },
        ],
      },
      // {
      //   title: "App Settings",
      //   icon: FiSmartphone,
      //   href: "#",
      //   subItems: [
      //     { title: "Invoice", href: "/dashboard/settings/app/invoice" },
      //     { title: "Printer", href: "/dashboard/settings/app/printer" },
      //     { title: "POS", href: "/dashboard/settings/app/pos" },
      //     {
      //       title: "Custom Fields",
      //       href: "/dashboard/settings/app/custom-fields",
      //     },
      //   ],
      // },
      {
        title: "System Settings",
        icon: FiMonitor,
        href: "#",
        subItems: [
          // { title: "Email", href: "/dashboard/settings/system/email" },
          // { title: "SMS", href: "/dashboard/settings/system/sms" },
          { title: "OTP", href: "/dashboard/settings/system/otp" },
          // {
          //   title: "GDPR Cookies",
          //   href: "/dashboard/settings/system/gdpr-cookies",
          // },
        ],
      },
      // {
      //   title: "Financial Settings",
      //   icon: FiDollarSign,
      //   href: "/dashboard/settings/financial",
      // },
      // {
      //   title: "Other Settings",
      //   icon: FiMoreHorizontal,
      //   href: "/dashboard/settings/other",
      // },
      // {
      //   title: "Logout",
      //   icon: FiLogOut,
      //   href: "/logout",
      // },
    ],
  },
];
