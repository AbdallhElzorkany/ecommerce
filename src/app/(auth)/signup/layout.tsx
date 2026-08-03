import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up to create your account",
  keywords: ["Sign up", "signup", "register"],
};
export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}