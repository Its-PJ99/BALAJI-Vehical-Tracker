import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './ui/utils';

const statusBadgeVariants = cva(
  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
  {
    variants: {
      variant: {
        ontime: 'bg-success/10 text-success',
        delayed: 'bg-destructive/10 text-destructive',
        early: 'bg-primary/10 text-primary',
        completed: 'bg-muted text-muted-foreground',
      },
    },
    defaultVariants: {
      variant: 'ontime',
    },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  status: 'ontime' | 'delayed' | 'early' | 'completed';
}

export function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
  const labels = {
    ontime: 'On Time',
    delayed: 'Delayed',
    early: 'Early',
    completed: 'Completed',
  };

  return (
    <div className={cn(statusBadgeVariants({ variant: status }), className)} {...props}>
      {labels[status]}
    </div>
  );
}