"use client";

import { trpc } from "@/trpc/client";

export default function Home() {
  const categories = trpc.categories.getMany.useQuery();

  if (!categories.data) return <div>Loading...</div>;
  return <div>{JSON.stringify(categories.data)}</div>;
}
