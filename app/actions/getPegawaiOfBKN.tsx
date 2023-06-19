// import fetch from "node-fetch";

const getPegawaiOfBKN = async (
  nip: string,
  auth: string,
  authorization: string
) => {
  let headers = {
    "Content-Type": "application/json",
    Auth: auth,
    Authorization: authorization,
  };

  const res = await fetch(
    `https://apimws.bkn.go.id:8243/apisiasn/1.0/pns/data-utama/${nip}`,
    {
      method: "GET",
      headers: headers,
    }
  )
    .then((res) => res.json())
    .then((json) => {
      // console.log(json); // untk menampilkan token di server
      return json;
    });
  return res;
};

const getPegawaiOfBKNRiwayatJabatan = async (
  nip: string,
  auth: string,
  authorization: string
) => {
  let headers = {
    "Content-Type": "application/json",
    Auth: auth,
    Authorization: authorization,
  };

  const res = await fetch(
    `https://apimws.bkn.go.id:8243/apisiasn/1.0/jabatan/pns/${nip}`,
    {
      method: "GET",
      headers: headers,
    }
  )
    .then((res) => res.json())
    .then((json) => {
      // console.log(json); // untk menampilkan token di server
      return json;
    });
  return res;
};

const getPegawaiOfBKNRiwayatGolongan = async (
  nip: string,
  auth: string,
  authorization: string
) => {
  let headers = {
    "Content-Type": "application/json",
    Auth: auth,
    Authorization: authorization,
  };

  const res = await fetch(
    `https://apimws.bkn.go.id:8243/apisiasn/1.0/pns/rw-golongan/${nip}`,
    {
      method: "GET",
      headers: headers,
    }
  )
    .then((res) => res.json())
    .then((json) => {
      // console.log(json); // untk menampilkan token di server
      return json;
    });
  return res;
};

export {
  getPegawaiOfBKN,
  getPegawaiOfBKNRiwayatJabatan,
  getPegawaiOfBKNRiwayatGolongan,
};
