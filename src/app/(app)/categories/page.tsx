export default async function CategoriesPage() {
    const categories = await (await fetch(`${process.env.API_URL}/api/v1/categories`)).json();
    console.log(categories);
    return <></>;
}