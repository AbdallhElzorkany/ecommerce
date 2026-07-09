export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const [brand, products] = await Promise.all([
        (await fetch(`${process.env.API_URL}/api/v1/brands/${id}`)).json(),
        (await fetch(`${process.env.API_URL}/api/v1/products?brand=${id}`)).json(),
    ]);
    console.log(products);
    return <></>
}