import { NextRequest, NextResponse } from "next/server";

export async function POST(reqeust: Request) {
  const req = await reqeust.json();
  const { sso, apim, data } = req;
  // console.log("router diklat bkn");
  let headers = {
    "Content-Type": "application/json",
    Auth: sso,
    Authorization: apim,
  };

  // console.log("api frontend : ", data);

  try {
    const res = await fetch(
      `https://apimws.bkn.go.id:8243/apisiasn/1.0/diklat/save`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    return NextResponse.json({ message: "Terjadi kesalahan pada server." });
  }
}
