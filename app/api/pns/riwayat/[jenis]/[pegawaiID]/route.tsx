import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: {
      jenis: string;
      pegawaiID: string;
    };
  }
) {
  const jenis = params.jenis;
  const pegawaiID = params.pegawaiID;

  const res = await fetch(
    `http://localhost:5000/api/riwayat/${jenis}/${pegawaiID}`,
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
