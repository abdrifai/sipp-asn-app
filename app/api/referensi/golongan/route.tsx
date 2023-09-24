import { NextResponse } from "next/server";

const URL_BACKEND = process.env.URL_BACKEND;

export async function GET() {
  try {
    const res = await fetch(`${URL_BACKEND}/api/referensi/golongan`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function PUT(request: Request) {
  const { id, eselon, id_bkn, jabatan_asn } = await request.json();

  const newData = {
    id,
    eselon,
    id_bkn,
    jabatan_asn,
  };

  try {
    const res = await fetch(`${URL_BACKEND}/api/referensi/golongan/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log(
      "Terjadi kesalahan ke backend ketika PUT ke referensi eselon :",
      error
    );
    return NextResponse.json({
      message: `Terjadi kesalahan ke backend ketika PUT ke referensi eselon. ( ${error})`,
    });
  }
}
