export default async function BrandsPage() {
  const brands = await (
    await fetch(`${process.env.API_URL}/api/v1/brands`)
  ).json();
  console.log(brands);
  return <></>;
}