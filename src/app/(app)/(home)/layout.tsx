import { Suspense } from "react";
import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";
import Footer from "./footer";
import Navbar from "./navbar";
import { SearchFilters, SearchFiltersSkeleton } from "./search-filters";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  const queryClient = getQueryClient();

  await trpc.categories.getMany.prefetch();

  return (
    <div>
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersSkeleton />}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <div className="flex flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
