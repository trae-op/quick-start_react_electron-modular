import type { TOptionsGenerate } from "./types";

export function gotGenerate(options: TOptionsGenerate) {
  const { isNumbers, isSpecial, isUppercase, amount } = options;

  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const special = "!@#$%^&*()_+[]{}|;:,.<>?/~";

  let characters = lowercase;

  if (isNumbers) {
    characters += numbers;
  }
  if (isUppercase) {
    characters += uppercase;
  }
  if (isSpecial) {
    characters += special;
  }

  let result = "";
  for (let i = 0; i < amount; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}
