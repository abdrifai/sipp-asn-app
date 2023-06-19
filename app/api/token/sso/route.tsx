import { NextResponse } from "next/server";
import fetch from "node-fetch";

const URL: string = process.env.URL_SSO as string;

export async function GET() {
  const client_id = "";
  const grant_type = "";
  const username = "";
  const password = "";

  const param = new URLSearchParams({
    client_id: "",
    grant_type: "",
    username: "",
    password: "",
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
