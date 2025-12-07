import { FiUser, FiFileText, FiSettings } from "react-icons/fi";

export const ProfileMenuData = [
  {
    id: "profile",
    title: "My Profile",
    href: "/dashboard/settings/general/profile",
    icon: FiUser,
  },
  // {
  //   id: "reports",
  //   title: "Reports",
  //   href: "/reports",
  //   icon: FiFileText,
  // },
  {
    id: "settings",
    title: "Settings",
    href: "/dashboard/settings/general",
    icon: FiSettings,
  },
] as const;
