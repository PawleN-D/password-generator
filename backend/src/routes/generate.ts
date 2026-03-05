import { Router, Request, Response } from "express";
import { validate, generate, PasswordOptions } from "../lib/password";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const options = parseOptions(req.query);
  const err = validate(options);

  if (err) {
    res.status(400).json(err);
    return;
  }

  const password = generate(options);
  res.status(200).type("text/plain; charset=utf-8").send(password);
});

function parseOptions(query: Request["query"]): PasswordOptions {
  const rawLength = query.length !== undefined ? Number(query.length) : 12;
  return {
    length: Number.isFinite(rawLength) ? Math.trunc(rawLength) : NaN,
    useUpperCase: parseBool(query.useUpperCase, true),
    useLowerCase: parseBool(query.useLowerCase, true),
    useNumber: parseBool(query.useNumber, true),
    useSpecialChar: parseBool(query.useSpecialChar, false),
  };
}

/** Accepts "true"/"false" strings; falls back to defaultValue for missing params. */
function parseBool(value: unknown, defaultValue: boolean): boolean {
  if (value === undefined || value === null) return defaultValue;
  if (typeof value === "string") return value.toLowerCase() !== "false";
  return Boolean(value);
}

export default router;