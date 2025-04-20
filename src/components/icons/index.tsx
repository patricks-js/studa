import { Loader2, type LucideProps } from "lucide-react";

import { GitHub } from "./github";
import { Google } from "./google";

export type IconProps = LucideProps;

export const Icons = {
  github: GitHub,
  google: Google,
  loader: Loader2,
};
