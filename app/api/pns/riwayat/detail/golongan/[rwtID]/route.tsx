import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: {
      rwtID: string;
    };
  }
) {
  const RwtID = params.rwtID;

  const res = await fetch(
    `http://localhost:5000/api/riwayat/golongan/detail/${RwtID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}
