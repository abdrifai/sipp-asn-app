export default async function getAllPns() {
  const res = await fetch("http://localhost:5000/pns", { cache: "no-store" });

  if (!res.ok) throw new Error("terjadi kesalahan fetch data Pns");

  const result = res.json();

  return result.then((response) => {
    return response.data;
  });
}
