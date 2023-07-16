import { NextRequest, NextResponse } from "next/server";

export async function POST(reqeust: Request) {
  const data = await reqeust.json();
  const { sso, apim } = data;

  let headers = {
    "Content-Type": "application/json",
    Auth: sso,
    Authorization: apim,
  };

  try {
    const res = await fetch(
      `https://apimws.bkn.go.id:8243/apisiasn/1.0/pns/rw-pnsunor/${data.nip}`,
      {
        method: "GET",
        headers: headers,
      }
    );
    const result = await res.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    return NextResponse.json({ message: "Terjadi kesalahan pada server." });
  }
}
