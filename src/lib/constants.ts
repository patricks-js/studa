import { Icons } from "@/components/icons";

export const NAVIGATION = [
  { label: "Home", href: "/home", icon: Icons.home },
  { label: "Notebooks", href: "/modules", icon: Icons.book },
] as const;

export const DROPDOWN_MENU_ITEMS = [
  {
    label: "Perfil",
    href: "/profile",
    icon: Icons.user,
    shortcut: "⇧⌘P",
  },
  {
    label: "Configurações",
    href: "/settings",
    icon: Icons.settings,
    shortcut: "⌘S",
  },
  {
    label: "Assinatura",
    icon: Icons.credit,
    href: "/billing",
    shortcut: "⌘B",
  },
] as const;
