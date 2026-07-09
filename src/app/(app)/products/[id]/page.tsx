export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, reviews] = await Promise.all([
    (await fetch(`${process.env.API_URL}/api/v1/products/${id}`)).json(),
    (await fetch(`${process.env.API_URL}/api/v1/reviews?product=${id}`)).json(),
  ]);
  console.log(product, reviews);
  return <></>;
}
