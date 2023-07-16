import { ServerResponse } from "http";

interface CookieOptions {
  maxAge?: number;
  path?: string;
  expires?: Date;
  httpOnly?: boolean;
  secure?: boolean;
}

export function setCookie(
  res: ServerResponse,
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  const stringValue = encodeURIComponent(value);

  if (res.setHeader) {
    const cookies = [];
    let cookie = `${name}=${stringValue}`;

    if (options.maxAge) {
      options.expires = new Date(Date.now() + options.maxAge);
    }

    if (options.path) {
      cookie += `; Path=${options.path}`;
    }

    if (options.expires) {
      cookie += `; Expires=${options.expires.toUTCString()}`;
    }

    if (options.httpOnly) {
      cookie += "; HttpOnly";
    }

    if (options.secure) {
      cookie += "; Secure";
    }

    cookies.push(cookie);
    res.setHeader("Set-Cookie", cookies);
  }
}
