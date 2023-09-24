import { NextRequest, NextResponse } from "next/server";
const URL_BACKEND = process.env.URL_BACKEND;

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

  const res = await fetch(`${URL_BACKEND}/api/riwayat/${jenis}/${pegawaiID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(
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

  const {
    id,
    maskerBln,
    maskerThn,
    pengesahan,
    pertekBkn,
    sk,
    tglPertek,
    tglSk,
    tmtSk,
    gapok,
    golongan,
    jenisKP,
  } = await request.json();

  const newData = {
    pegawai_id: pegawaiID,
    maskerBln,
    maskerThn,
    pengesahan,
    pertekBkn,
    sk,
    tglPertek,
    tglSk,
    tmtSk,
    gapok,
    gol_id: golongan.id,
    jnsKp_id: jenisKP.id,
  };

  const res = await fetch(`${URL_BACKEND}/api/riwayat/golongan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });

  // console.log(await res.json());

  const data = await res.json();
  return NextResponse.json(data);
}

export async function DELETE(
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
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const pegawaiID = params.pegawaiID;

  try {
    const res = await fetch(
      `${URL_BACKEND}/api/riwayat/golongan/${id}/pegawai/${pegawaiID}`,
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

export async function PUT(
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

  const {
    id,
    maskerBln,
    maskerThn,
    pengesahan,
    pertekBkn,
    sk,
    tglPertek,
    tglSk,
    tmtSk,
    gapok,
    golongan,
    jenisKP,
  } = await request.json();

  const newData = {
    id,
    pegawai_id: pegawaiID,
    maskerBln,
    maskerThn,
    pengesahan,
    pertekBkn,
    sk,
    tglPertek,
    tglSk,
    tmtSk,
    gapok,
    gol_id: golongan.id,
    jnsKp_id: jenisKP.id,
  };

  try {
    const res = await fetch(
      `${URL_BACKEND}/api/riwayat/golongan/${id}/pegawai/${pegawaiID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      }
    );

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log("Terjadi kesalahan Respon Server ketika PUT:", error);
    return NextResponse.json({
      message: `Terjadi kesalahan pada server  response PUT : ( ${error})`,
    });
  }
}
