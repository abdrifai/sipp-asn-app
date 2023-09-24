import { NextResponse } from "next/server";

const URL_BACKEND = process.env.URL_BACKEND;

export async function GET() {
  try {
    const res = await fetch(`${URL_BACKEND}/api/referensi/tktpend`, {
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
  const { id, tktpend, id_bkn, nama, group_tk_pend_nm } = await request.json();

  const newData = {
    id,
    tktpend,
    id_bkn,
    nama,
    group_tk_pend_nm
  };

  try {
    const res = await fetch(`${URL_BACKEND}/api/referensi/tktpend/${id}`, {
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
      "Terjadi kesalahan ke backend ketika PUT ke referensi tkt pendidikan :",
      error
    );
    return NextResponse.json({
      message: `Terjadi kesalahan ke backend ketika PUT ke referensi tkt pendidikan. ( ${error})`,
    });
  }
}

export async function POST(request: Request) {
  const { id, tktpend, id_bkn, nama, group_tk_pend_nm } = await request.json();

  const newData = {
    id,
    tktpend,
    id_bkn,
    nama,
    group_tk_pend_nm
  };

  try {
    const res = await fetch(`${URL_BACKEND}/api/referensi/tktpend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log(
      "Terjadi kesalahan ke backend ketika POST ke referensi tkt pendidikan :",
      error
    );
    return NextResponse.json({
      message: `Terjadi kesalahan ke backend ketika POST ke referensi tkt pendidikan. ( ${error})`,
    });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const tktPendId = searchParams.get("id");

  try {
    const res = await fetch(
      `${URL_BACKEND}/api/referensi/tktpend/${tktPendId}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    // console.error("Terjadi kesalahan Respon Server:", error);
    return NextResponse.json({
      message: `Terjadi kesalahan di server . ( ${error})`,
    });
  }
}
