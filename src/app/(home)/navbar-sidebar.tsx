import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Link from "next/link";

interface NavbarItem {
  href: string;
  children: React.ReactNode;
}

interface Props {
  items: NavbarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({ items, open, onOpenChange }: Props) => (
  <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent side="left" className="p-0 transition-none">
      <SheetHeader className="p-4 border-b">
        <div className="flex items-center">
          <SheetTitle>Menu</SheetTitle>
        </div>
      </SheetHeader>
      <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="w-full hover:bg-black hover:text-white text-left flex items-center text-base font-medium p-4"
            onClick={() => onOpenChange(false)}
          >
            {item.children}
          </Link>
        ))}
        <div className="border-t">
          <Link
            href="/sign-in"
            className="w-full hover:bg-black hover:text-white text-left flex items-center text-base font-medium p-4"
            onClick={() => onOpenChange(false)}
          >
            Log in
          </Link>
          <Link
            href="/sign-up"
            className="w-full hover:bg-black hover:text-white text-left flex items-center text-base font-medium p-4"
            onClick={() => onOpenChange(false)}
          >
            Start selling
          </Link>
        </div>
      </ScrollArea>
    </SheetContent>
  </Sheet>
);
