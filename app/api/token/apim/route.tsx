import { NextResponse } from "next/server";
import { Buffer } from "buffer";
import fetch from "node-fetch";

export async function GET() {
  const URL: string = process.env.URL_APIM as string;
  const usernameAPIM = "";
  const passwordAPIM = "";
  let auth =
    "Basic " +
    Buffer.from(usernameAPIM + ":" + passwordAPIM).toString("base64");

  let headersAPIM = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    Authorization: auth,
  };

  const res = await fetch(URL, {
    method: "POST",
    headers: headersAPIM,
    body: "grant_type=client_credentials",
  });

  if (res.ok) {
    const data = await res.json();
    return NextResponse.json(data);
  } else {
    throw new Error("Failed to fetch data. Status: " + res.status);
  }
  // const data = await res.json();
  // return NextResponse.json(data);
  // .then((res) => res.json())
  // .then((json) => {
  // console.log(json); // untk menampilkan token di server
  // return json;
  // });
  //   const apim = await res.json();
}
