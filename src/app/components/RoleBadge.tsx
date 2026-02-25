import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './ui/utils';
import { Shield } from 'lucide-react';

const roleBadgeVariants = cva(
  'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium',
  {
    variants: {
      variant: {
        admin: 'bg-primary/10 text-primary',
        operator: 'bg-muted text-muted-foreground',
      },
    },
    defaultVariants: {
      variant: 'operator',
    },
  }
);

export interface RoleBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof roleBadgeVariants> {
  role: 'admin' | 'operator';
}

export function RoleBadge({ role, className, ...props }: RoleBadgeProps) {
  const labels = {
    admin: 'Admin',
    operator: 'CRM Operator',
  };

  return (
    <div className={cn(roleBadgeVariants({ variant: role }), className)} {...props}>
      <Shield className="size-3" />
      {labels[role]}
    </div>
  );
}