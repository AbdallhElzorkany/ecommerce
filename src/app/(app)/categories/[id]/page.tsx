export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [category, products] = await Promise.all([
    (await fetch(`${process.env.API_URL}/api/v1/categories/${id}`)).json(),
    (await fetch(`${process.env.API_URL}/api/v1/products?category=${id}`)).json(),
  ]);
  console.log(products);
  return <></>;
}
