import { NextResponse } from "next/server";
import { Buffer } from "buffer";
import fetch from "node-fetch";

export async function GET() {
  const URL: string = process.env.URL_APIM as string;
  const usernameAPIM = process.env.USERNAME_APIM;
  const passwordAPIM = process.env.PASSWORD_APIM;

  let auth =
    "Basic " +
    Buffer.from(usernameAPIM + ":" + passwordAPIM).toString("base64");

  let headersAPIM = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    Authorization: auth,
  };

  const response = await fetch(URL, {
    method: "POST",
    headers: headersAPIM,
    body: "grant_type=client_credentials",
  });

  if (response.ok) {
    const data: any = await response.json();

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1); // Misalnya, bertahan selama 7 hari
    const cookieOptions = {
      expires: expirationDate,
      httpOnly: true,
      sameSite: "lax",
    };

    const res = NextResponse.json(data, {
      headers: {
        "Set-Cookie": `token_apim=${data.access_token}; ${cookieOptions}`,
      },
    });

    // const res = NextResponse.json(data, {
    //   headers: {
    //     "Set-Cookie": `token_apim=${data.access_token}; HttpOnly; Secure`,
    //   },
    // });

    return res;
  } else {
    throw new Error("Failed to fetch data. Status: " + response.status);
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
