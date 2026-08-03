import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Not Found",
  description: "Page not found",
  keywords: ["Not Found", "page not found"],
};
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-72px)]">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl mt-4">Page not found</p>
    </div>
  );
}
