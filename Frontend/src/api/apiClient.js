export async function request(url, options) {
  const res = await fetch(url, options);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail[0].msg ?? "Unknown error");
  }

  return data;
}
