export interface GenerateOptions {
  length: number;
  useUpperCase: boolean;
  useLowerCase: boolean;
  useNumber: boolean;
  useSpecialChar: boolean;
}

export async function generatePassword(opts: GenerateOptions): Promise<string> {
  const params = new URLSearchParams({
    length: String(opts.length),
    useUpperCase: String(opts.useUpperCase),
    useLowerCase: String(opts.useLowerCase),
    useNumber: String(opts.useNumber),
    useSpecialChar: String(opts.useSpecialChar),
  });

  const res = await fetch(`/api/generate?${params}`);

  if (!res.ok) {
    const body = await res.json();
    throw new Error(body.error ?? "Unknown error");
  }

  return res.text();
}