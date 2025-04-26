type UseCharacterLimitProps = {
  maxLength: number;
  value: string;
};

export function useCharacterLimit({
  maxLength,
  value,
}: UseCharacterLimitProps) {
  const characterCount = value.length;

  return {
    characterCount,
    maxLength,
    remaining: maxLength - characterCount,
  };
}
