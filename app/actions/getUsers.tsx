export default async function getAllUser() {
  const res = await fetch("http://localhost:5000/pns");
  const result = res.json();
  return result.then((response) => {
    return response.data;
  });
}
