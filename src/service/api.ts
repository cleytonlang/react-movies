export default async function getData(url: string) {
  const data: any = await fetch(
    `https://api.themoviedb.org/3${url}?api_key=7989dca5c23c2723160af19f9234a5a9`
  );
  return data;
}
