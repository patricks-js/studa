import {
  BellIcon,
  Home,
  Loader2,
  LogOut,
  Settings2,
  User,
  type LucideProps,
} from "lucide-react";

import { GitHub } from "./github";
import { Google } from "./google";

export type IconProps = LucideProps;

export const Icons = {
  github: GitHub,
  google: Google,
  loader: Loader2,
  home: Home,
  settings: Settings2,
  bell: BellIcon,
  user: User,
  logout: LogOut,
};
