import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CategoriesGetManyOutput } from "@/modules/categories/types";
import { trpc } from "@/trpc/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CategoriesSidebar = ({ open, onOpenChange }: Props) => {
  const router = useRouter();
  const [data] = trpc.categories.getMany.useSuspenseQuery();

  const [parentCategories, setParentCategories] = useState<CategoriesGetManyOutput | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoriesGetManyOutput[1] | null>(null);

  // if we have parent categories, show them, else show root categories
  const currentCategories = parentCategories ?? data ?? [];

  const handleOpenChange = () => {
    setParentCategories(null);
    setSelectedCategory(null);
    onOpenChange(false);
  };

  const handleCategoryClick = (category: CategoriesGetManyOutput[1]) => {
    if (category.subcategories.length > 0) {
      setParentCategories(category.subcategories as CategoriesGetManyOutput);
      setSelectedCategory(category);
    } else {
      // This is a leaf category, not subcategory
      if (parentCategories && selectedCategory) {
        // This is a subcategory
        router.push(`/${selectedCategory.slug}/${category.slug}`);
      } else {
        // This is a root category
        if (category.slug === "all") {
          router.push(`/`);
        } else {
          router.push(`/${category.slug}`);
        }
      }

      // Close the sidebar after selection
      handleOpenChange();
    }
  };

  const handleBackClick = () => {
    if (parentCategories) {
      setParentCategories(null);
    }
    setSelectedCategory(null);
  };

  const backgroundColor = selectedCategory?.color || "white";

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{ backgroundColor }}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center font-medium text-base cursor-pointer"
              onClick={handleBackClick}
            >
              <ChevronLeftIcon className="size-4 mr-2" />
              Back
            </button>
          )}
          {currentCategories.map((category) => (
            <button
              key={category.slug}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center font-medium text-base cursor-pointer"
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
              {category.subcategories.length > 0 && <ChevronRightIcon className="size-4" />}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
