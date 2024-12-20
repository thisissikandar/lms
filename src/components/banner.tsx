import { AlertTriangle, CheckCircleIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bannerVarients = cva(
  "border text-center p-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        warning: "bg-yellow-200/80 border-yellow-300 text-primary",
        success: "bg-emerald-700 bg-emerald-800 text-secondary",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  }
);
interface BannerProps extends VariantProps<typeof bannerVarients> {
  label: string;
}

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
};
export const Banner = ({ label, variant }: BannerProps) => {
  const Icon = iconMap[ variant || "warning"];
  return (
    <div className={cn(bannerVarients({ variant }))}>
        <Icon className="h-4 w-4 mr-2" />
        {label}
    </div>
  );
};
