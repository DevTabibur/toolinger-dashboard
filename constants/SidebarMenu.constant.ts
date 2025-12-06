import {
  FiGrid,
  FiUser,
  FiLayers,
  FiLayout,
  FiBox,
  FiPlusSquare,
  FiAlertCircle,
  FiTrendingDown,
  FiList,
  FiAlignLeft,
  FiTag,
  FiDisc, 
  FiSliders,
} from "react-icons/fi";

export const SidebarMenuData = [
  {
    title: "Main",
    items: [
      {
        title: "Dashboard",
        icon: FiGrid,
        href: "/dashboard",
      },
      {
        title: "Super Admin",
        icon: FiUser,
        href: "/dashboard/super-admin",
      },
      {
        title: "Application",
        icon: FiLayers,
        href: "/dashboard/application",
      },
      {
        title: "Layouts",
        icon: FiLayout,
        href: "#",
        subItems: [
          { title: "Horizontal", href: "/dashboard/layouts/horizontal" },
          { title: "Detached", href: "/dashboard/layouts/detached" },
          { title: "Two Column", href: "/dashboard/layouts/two-column" },
          { title: "Hovered", href: "/dashboard/layouts/hovered" },
          { title: "Boxed", href: "/dashboard/layouts/boxed" },
          { title: "RTL", href: "/dashboard/layouts/rtl" },
          { title: "Dark", href: "/dashboard/layouts/dark" },
        ],
      },
    ],
  },
  {
    title: "Inventory",
    items: [
      {
        title: "Products",
        icon: FiBox,
        href: "/dashboard/products",
      },
      {
        title: "Create Product",
        icon: FiPlusSquare,
        href: "/dashboard/products/create",
      },
      {
        title: "Expired Products",
        icon: FiAlertCircle,
        href: "/dashboard/products/expired",
      },
      {
        title: "Low Stocks",
        icon: FiTrendingDown,
        href: "/dashboard/products/low-stocks",
      },
      {
        title: "Category",
        icon: FiList,
        href: "/dashboard/category",
      },
      {
        title: "Sub Category",
        icon: FiAlignLeft,
        href: "/dashboard/sub-category",
      },
      {
        title: "Brands",
        icon: FiTag,
        href: "/dashboard/brands",
      },
      {
        title: "Units",
        icon: FiDisc,
        href: "/dashboard/units",
      },
      {
        title: "Variant Attributes",
        icon: FiSliders,
        href: "/dashboard/variant-attributes",
      },
    ],
  },
];
