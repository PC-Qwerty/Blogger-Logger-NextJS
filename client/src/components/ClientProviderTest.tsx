"use client";

type props = {
  children: React.ReactNode;
};
export default function ClientProviderTest({ children }: props) {
  return <div>{children}</div>;
}
