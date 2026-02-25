/*
 * @Author: Vivek J vsjaiswal@outlook.com
 * @Date: 2026-02-25 13:17:28
 * @LastEditors: Vivek J vsjaiswal@outlook.com
 * @LastEditTime: 2026-02-25 14:54:08
 * @FilePath: /gapps/src/app/components/RoleBadge.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./ui/utils";
import { Shield } from "lucide-react";
import { UserRole } from "../types/Trips";

const roleBadgeVariants = cva(
  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium",
  {
    variants: {
      variant: {
        admin: "bg-primary/10 text-primary",
        operator: "bg-muted text-muted-foreground",
        driver: "",
      },
    },
    defaultVariants: {
      variant: "operator",
    },
  },
);

export interface RoleBadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof roleBadgeVariants> {
  role: UserRole;
}

export function RoleBadge({ role, className, ...props }: RoleBadgeProps) {
  const labels = {
    admin: "Admin",
    operator: "CRM Operator",
    driver: "Driver",
  };

  return (
    <div
      className={cn(roleBadgeVariants({ variant: role }), className)}
      {...props}
    >
      <Shield className="size-3" />
      {labels[role]}
    </div>
  );
}
