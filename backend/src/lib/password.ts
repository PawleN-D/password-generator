const CHARS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  number: "0123456789",
  special: "!\"#$%&'()*+,-./:;<=>?@[\\]^_{|}~",
} as const;

export interface PasswordOptions {
  length: number;
  useUpperCase: boolean;
  useLowerCase: boolean;
  useNumber: boolean;
  useSpecialChar: boolean;
}

export function validate(opts: PasswordOptions): string | null {
  if (opts.length < 6 || opts.length > 99) return "length must be between 6 and 99";
  if (!opts.useUpperCase && !opts.useLowerCase && !opts.useNumber && !opts.useSpecialChar)
    return "at least one character class must be enabled";
  return null;
}

export function generate(opts: PasswordOptions): string {
  const pools = [
    opts.useUpperCase && CHARS.upper,
    opts.useLowerCase && CHARS.lower,
    opts.useNumber && CHARS.number,
    opts.useSpecialChar && CHARS.special,
  ].filter(Boolean) as string[];

  const combined = pools.join("");
  const chars = [
    ...pools.map(pool => pool[Math.floor(Math.random() * pool.length)]),
    ...Array.from({ length: opts.length - pools.length }, () => combined[Math.floor(Math.random() * combined.length)]),
  ];

  return chars.sort(() => Math.random() - 0.5).join("");
}