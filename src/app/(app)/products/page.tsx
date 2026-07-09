export default async function ProductsPage() {
  const products = await (await fetch(`${process.env.API_URL}/api/v1/products`)).json();
  console.log(products);
  return <></>;
}