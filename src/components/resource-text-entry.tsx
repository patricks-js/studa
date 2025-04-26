"use client";

import { useId } from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCharacterLimit } from "@/hooks/use-character-limit";
import type { ControllerRenderProps } from "react-hook-form";
import type { ResourceCreatorFormValues } from "./resource-creator";

type Props = {
  field: ControllerRenderProps<ResourceCreatorFormValues, "content">;
  maxLength?: number;
  placeholder?: string;
  className?: string;
};

export function ResourceTextEntry({
  field,
  maxLength = 2000,
  placeholder,
  className,
}: Props) {
  const id = useId();
  const { remaining } = useCharacterLimit({
    maxLength,
    value: field.value || "",
  });

  return (
    <div className="*:not-first:mt-2">
      <Label
        htmlFor={id}
        className="sr-only"
      >
        Textarea with characters left
      </Label>
      <Textarea
        id={id}
        value={field.value || ""}
        onChange={field.onChange}
        maxLength={maxLength}
        placeholder={placeholder}
        aria-describedby={`${id}-description`}
        className={className}
      />
      <p
        id={`${id}-description`}
        className="mt-2 text-right text-muted-foreground text-xs"
        // biome-ignore lint/a11y/useSemanticElements: <explanation>
        role="status"
        aria-live="polite"
      >
        <span className="tabular-nums">{remaining}</span> caracteres restantes
      </p>
    </div>
  );
}
