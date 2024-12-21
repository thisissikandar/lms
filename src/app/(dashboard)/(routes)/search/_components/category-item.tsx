"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import qs from "query-string";
import { url } from "inspector";

interface CategoryItemProps {
  label: string;
  value?: string;
  icon: IconType;
}
export const CategoryItem = ({
  label,
  value,
  icon: Icon,
}: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;
  const onClick = () => {
    const url = qs.stringify(
      {
        url: pathname,
        query: {
          categoryId: isSelected ? null : value,
          title: currentTitle,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  };
  return (
    <Button
      onClick={onClick}
      className={cn(
        "px-3 py-2  text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
        isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
      )}
      type="button"
    >
      {Icon && <Icon size={20} />}
      <div className="truncate">{label}</div>
    </Button>
  );
};
