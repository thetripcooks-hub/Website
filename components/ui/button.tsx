import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#FA93F4] from-[28.5%] to-[#EE7FE7] hover:from-[#FA84F3] hover:to-[#FA93F4] text-neutral-text",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground dark:border-[#8C909B] dark:bg-transparent",
        secondary: "bg-[#020E0B] text-white hover:opacity-80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        "green-outline":
          "border border-secondary-irish-green text-secondary-irish-green bg-transparent hover:bg-secondary-irish-green hover:text-white",
        "ghost-arrow": "text-white bg-transparent hover:bg-none",
      },
      size: {
        default: "h-[56px] px-[16px] min-w-[134px] text-base font-medium",
        sm: "h-8 rounded-full px-3 text-xs",
        lg: "h-10 rounded-full px-8",
        icon: "h-9 w-9",
        "icon-circle": "h-[48px] w-[48px] p-0 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <>
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {loading && (
            <Loader className="mr-2 h-4 w-4 animate-spin text-secondary-irish-green" />
          )}
          {props.children}
        </Comp>
      </>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
