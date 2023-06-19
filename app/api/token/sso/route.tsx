import { NextResponse } from "next/server";
import fetch from "node-fetch";

const URL: string = process.env.URL_SSO as string;

export async function GET() {
  const client_id = "tajounaunaws";
  const grant_type = "password";
  const username = "198701022011011006";
  const password = "02Januari87";

  const param = new URLSearchParams({
    client_id: "tajounaunaws",
    grant_type: "password",
    username: "198701022011011006",
    password: "02Januari87",
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
      // cookies().set("token_sso", json.access_token);
      return json;
    });

  return NextResponse.json(res);
}
