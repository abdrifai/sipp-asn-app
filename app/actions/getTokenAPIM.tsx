// import fetch from "node-fetch";

import { Buffer } from "buffer";

export default async function getTokenAPIM() {
  const usernameAPIM = "JKbRdABqstrShsqyz7dWKQKRM78a";
  const passwordAPIM = "7ikOpop63gZtaJ7qYuMXk9wRpdoa";

  let auth =
    "Basic " +
    Buffer.from(usernameAPIM + ":" + passwordAPIM).toString("base64");

  let headersAPIM = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    Authorization: auth,
  };

  const res = await fetch("https://apimws.bkn.go.id/oauth2/token", {
    method: "POST",
    headers: headersAPIM,
    body: "grant_type=client_credentials",
  })
    .then((res) => res.json())
    .then((json) => {
      // console.log(json); // untk menampilkan token di server
      return json;
    });
  return res;
}
