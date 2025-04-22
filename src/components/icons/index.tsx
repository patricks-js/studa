import {
  BellIcon,
  Book,
  CreditCard,
  Home,
  Laptop,
  Loader,
  LogOut,
  MoonStar,
  Settings2,
  SmartphoneCharging,
  SquareCheck,
  Sun,
  User,
  type LucideProps,
} from "lucide-react";

import { GitHub } from "./github";
import { Google } from "./google";

export type IconProps = LucideProps;

export const Icons = {
  github: GitHub,
  google: Google,
  loader: Loader,
  home: Home,
  settings: Settings2,
  bell: BellIcon,
  user: User,
  logout: LogOut,
  book: Book,
  flashcard: SmartphoneCharging,
  quiz: SquareCheck,
  credit: CreditCard,
  sun: Sun,
  moon: MoonStar,
  desktop: Laptop,
};
