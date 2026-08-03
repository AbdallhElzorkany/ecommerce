import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Forgot your password? Reset it now",
  keywords: ["Forgot Password", "forgot-password", "reset-password"],
};
export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}