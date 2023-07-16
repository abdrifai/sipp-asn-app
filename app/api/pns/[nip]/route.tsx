import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { nip: string } }
) {
  const nip = params.nip;
  try {
    const res = await fetch(`http://localhost:5000/api/pns/${nip}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    return NextResponse.json({ message: "Terjadi kesalahan pada server." });
  }
}
