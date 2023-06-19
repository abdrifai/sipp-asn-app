// import fetch from "node-fetch";

export default async function getTokenSSO() {
  const client_id = "tajounaunaws";
  const grant_type = "password";
  const username = "198701022011011006";
  const password = "02Januari87";

  const param = new URLSearchParams({
    client_id: "tajounaunaws",
    grant_type: "password",
    username: "198701022011011006",
    password: "02Januari87",
  });

  let headersSSO = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  };
  const res = await fetch(
    "https://sso-siasn.bkn.go.id/auth/realms/public-siasn/protocol/openid-connect/token",
    {
      method: "POST",
      headers: headersSSO,
      body: param.toString(),
    }
  )
    .then((res) => res.json())
    .then((json) => {
      // console.log(json); // untk menampilkan token di server
      // cookies().set("token_sso", json.access_token);
      return json;
    });
  return res;
}
