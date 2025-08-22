"use client";

import { usePathname } from "next/navigation";

export default function SectionPage() {
  const pathname = usePathname();
  return <p>Section, Current pathname: {pathname}</p>;
}
