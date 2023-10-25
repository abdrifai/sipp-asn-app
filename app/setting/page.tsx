"use client";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
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

export default function Setting() {
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
    // console.log("click token apim");
    const res = await fetch("/api/token/apim");
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setTokenAPIM(`Bearer ${data.access_token}`);
      localStorage.setItem("token_apim", `Bearer ${data.access_token}`);

      toast("Token APIM telah diperbahrui", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success",
      });
    }
  };

  const handleGetTokenSSO = async () => {
    // console.log("click token sso");
    const res = await fetch("/api/token/sso");
    if (res.ok) {
      const data: any = await res.json();
      // console.log(data);
      setTokenSSO(`Bearer ${data.access_token}`);
      localStorage.setItem("token_sso", `bearer ${data.access_token}`);

      toast("Token SSO telah diperbahrui", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success",
      });
    }
  };

  const handlerInputTokenAPIM = (e: any) => {
    setTokenAPIM(e.target.value);
  };

  const handlerInputTokenSSO = (e: any) => {
    setTokenSSO(e.target.value);
  };

  return (
    <div>
      <h3>Page Setting</h3>
      <div className="gap-3 flex w-full items-center">
        <div className="w-1/4 flex gap-4 p-6">
          {/* <Button label="Get APIM" onClick={handleGetTokenAPIM} />
          <Button label="Get SSO" onClick={handleGetTokenSSO} /> */}
          <Button
            label="Get Token"
            onClick={() => {
              handleGetTokenAPIM();
              handleGetTokenSSO();
            }}
          />
        </div>
      </div>
      <div>
        <div className="p-5 border-2 mt-4">
          <label className="block">Token SSO :</label>
          <textarea
            onChange={(e) => handlerInputTokenSSO(e)}
            rows={5}
            className="w-full border-2 p-2"
            value={tokenSSO}
          ></textarea>
        </div>
        <div className="p-5 border-2 mt-4">
          <label className="block">Token APIM :</label>
          <textarea
            value={tokenAPIM || ""}
            onChange={(e) => handlerInputTokenAPIM(e)}
            rows={5}
            className="w-full border-2 p-2"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
