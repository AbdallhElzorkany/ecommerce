import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your account",
  keywords: ["Sign in", "login"],
};
export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}