import { NextResponse } from "next/server";
import fetch from "node-fetch";

const URL: string = process.env.URL_SSO as string;

export async function GET() {
  const client_id: string | undefined = process.env.CLIENT_ID;
  const grant_type: string | undefined = process.env.GRANT_TYPE;
  const username: string | undefined = process.env.USERNAME;
  const password: string | undefined = process.env.PASSWORD;

  if (!client_id || !grant_type || !username || !password) {
    throw new Error("Environment variables not set.");
  }

  const param = new URLSearchParams({
    client_id: client_id,
    grant_type: grant_type,
    username: username,
    password: password,
  });

  let headersSSO = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  };
  const res = await fetch(URL, {
    method: "POST",
    headers: headersSSO,
    body: param.toString(),
  })
    .then((res) => res.json())
    .then((json) => {
      // console.log(json); // untk menampilkan token di server
      return json;
    });

  return NextResponse.json(res);
}
