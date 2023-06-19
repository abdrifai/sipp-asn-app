import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nama = searchParams.get("query");
  if (nama !== "") {
    const res = await fetch(`http://localhost:5000/api/pns/${nama}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return NextResponse.json(data);
  }

  return NextResponse.json([]);
}
