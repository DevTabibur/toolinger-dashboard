import { FiLayout, FiSidebar, FiColumns } from "react-icons/fi";
export const layouts = [
  { id: "default", name: "Default", icon: FiLayout },
  // { id: 'mini', name: 'Mini', icon: FiSidebar },
  { id: "rtl", name: "RTL", icon: FiLayout },
  { id: "horizontal", name: "Horizontal", icon: FiLayout },
  { id: "detached", name: "Detached", icon: FiLayout },
  { id: "without-header", name: "Without Header", icon: FiLayout },
] as const;
