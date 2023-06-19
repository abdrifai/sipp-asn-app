"use client";

import { useEffect, useState } from "react";
import getTokenAPIM from "../actions/getTokenAPIM";
import getTokenSSO from "../actions/getTokenSSO";

import Button from "../components/Button";
import {
  getPegawaiOfBKN,
  getPegawaiOfBKNRiwayatJabatan,
  getPegawaiOfBKNRiwayatGolongan,
} from "../actions/getPegawaiOfBKN";

type PegawaiOfBKN = {
  nip: string;
  auth: string;
  authorization: string;
};

export default function page() {
  const [tokenSSO, setTokenSSO] = useState("");
  const [tokenAPIM, setTokenAPIM] = useState("");
  const [data, setData] = useState<PegawaiOfBKN | null>(null);

  useEffect(() => {
    const storedNip = localStorage.getItem("nip");
    const storedAuth = localStorage.getItem("token_sso");
    const storedAuthorization = localStorage.getItem("token_apim");

    if (storedNip && storedAuth && storedAuthorization) {
      setData({
        nip: storedNip,
        auth: storedAuth,
        authorization: storedAuthorization,
      });

      setTokenAPIM(storedAuthorization);
      setTokenSSO(storedAuth);
    }
  }, []);

  const handleGetTokenAPIM = async () => {
    console.log("click token apim");
    const res = await fetch("/api/token/apim");
    // const res = await getTokenAPIM();
    if (res.ok) {
      const data = await res.json();
      // console.log(data);
      setTokenAPIM(`Bearer ${data.access_token}`);
      localStorage.setItem("token_apim", `Bearer ${data.access_token}`);
    }
  };

  const handleGetTokenSSO = async () => {
    // const res = await getTokenSSO();
    // // console.log(res);
    // setTokenSSO(`bearer ${res.access_token}`);
    // localStorage.setItem("token_sso", `bearer ${res.access_token}`);
    console.log("click token sso");
    const res = await fetch("/api/token/sso");
    // const res = await getTokenAPIM();
    if (res.ok) {
      const data = await res.json();
      // console.log(data);
      setTokenSSO(`Bearer ${data.access_token}`);
      localStorage.setItem("token_sso", `bearer ${data.access_token}`);
    }
  };

  const handlerInputTokenAPIM = (e: any) => {
    setTokenAPIM(e.target.value);
  };

  const handlerInputTokenSSO = (e: any) => {
    setTokenSSO(e.target.value);
  };

  const handleGetPegawai = async () => {
    // const result = await getPegawaiOfBKN(
    //   data.nip,
    //   data.auth,
    //   data.authorization
    // );
    // console.log(result);
    if (data) {
      const result = await getPegawaiOfBKN(
        data.nip,
        data.auth,
        data.authorization
      );
      console.log(result.data);
    } else {
      console.log("get Pegawai SIASN kosong");
    }
  };

  const handleGetPegawaiRiwayat = async () => {
    const result = await getPegawaiOfBKNRiwayatJabatan(
      data.nip,
      data.auth,
      data.authorization
    );
    console.log(result);
  };

  const handleGetPegawaiRiwayatGol = async () => {
    const result = await getPegawaiOfBKNRiwayatGolongan(
      data.nip,
      data.auth,
      data.authorization
    );
    console.log(result);
  };

  return (
    <div>
      <h3>Page Setting</h3>
      <div className="gap-3 flex w-1/2">
        <Button label="Get APIM" onClick={handleGetTokenAPIM} />
        <Button label="Get SSO" onClick={handleGetTokenSSO} />
        <Button label="Get Pegawai" onClick={handleGetPegawai} />
        <Button label="Get Rwt Jabatan" onClick={handleGetPegawaiRiwayat} />
        <Button label="Get Rwt Golongan" onClick={handleGetPegawaiRiwayatGol} />
      </div>
      <div>
        <div className="p-5 border-2 mt-4">
          <label className="block">Token SSO :</label>
          <textarea
            onChange={(e) => handlerInputTokenSSO(e)}
            rows={3}
            className="w-full border-2 p-2"
            value={tokenSSO}
          ></textarea>
        </div>
        <div className="p-5 border-2 mt-4">
          <label className="block">Token APIM :</label>
          <textarea
            value={tokenAPIM || ""}
            onChange={(e) => handlerInputTokenAPIM(e)}
            rows={3}
            className="w-full border-2 p-2"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
