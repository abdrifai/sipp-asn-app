import { NextRequest, NextResponse } from "next/server";
const URL_BACKEND = process.env.URL_BACKEND;

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: {
      // jenis: string;
      pegawaiID: string;
    };
  }
) {
  // const jenis = params.jenis;
  const pegawaiID = params.pegawaiID;

  const res = await fetch(`${URL_BACKEND}/api/riwayat/diklat/${pegawaiID}`, {
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
      // jenis: string;
      pegawaiID: string;
    };
  }
) {
  // const jenis = params.jenis;
  const pegawaiID = params.pegawaiID;
  // console.log(await request.json());
  const {
    id,
    nipBaru,
    jnsDiklat_id,
    jenjangDiklat_id,
    nmDiklat,
    noSertifikat,
    tglSertifikat,
    jumlahJam,
    penyelenggara,
    angkatan,
    t4pelaksanaan,
    tglMulai,
    tglSelesai,
  } = await request.json();

  const newData = {
    nipBaru,
    pegawai_id: pegawaiID,
    jnsDiklat_id,
    jenjangDiklat_id,
    nmDiklat,
    noSertifikat,
    tglSertifikat,
    jumlahJam,
    penyelenggara,
    angkatan,
    t4pelaksanaan,
    tglMulai,
    tglSelesai,
  };

  const res = await fetch(`${URL_BACKEND}/api/riwayat/diklat`, {
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
      `${URL_BACKEND}/api/riwayat/diklat/${id}/pegawai/${pegawaiID}`,
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
      // jenis: string;
      pegawaiID: string;
    };
  }
) {
  // const jenis = params.jenis;
  const pegawaiID = params.pegawaiID;

  const {
    id,
    nipBaru,
    jnsDiklat_id,
    jenjangDiklat_id,
    nmDiklat,
    noSertifikat,
    tglSertifikat,
    jumlahJam,
    penyelenggara,
    angkatan,
    t4pelaksanaan,
    tglMulai,
    tglSelesai,
  } = await request.json();

  const newData = {
    id,
    nipBaru,
    pegawai_id: pegawaiID,
    jnsDiklat_id,
    jenjangDiklat_id,
    nmDiklat,
    noSertifikat,
    tglSertifikat,
    jumlahJam,
    penyelenggara,
    angkatan,
    t4pelaksanaan,
    tglMulai,
    tglSelesai,
  };

  try {
    const res = await fetch(
      `${URL_BACKEND}/api/riwayat/diklat/${id}/pegawai/${pegawaiID}`,
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
    // console.log("terjadi kesalahan put data:", error);
    return NextResponse.json({
      message: `terjadi kesalahan put data.. : ( ${error})`,
      statusCode: 500,
    });
  }
}
