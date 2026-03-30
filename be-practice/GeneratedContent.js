This is a highly reusable, accessible, and "headless-style" professional Button component. It uses `tailwind-merge` and `clsx` to handle class merging properly (preventing style conflicts).

### 1. Prerequisites
You’ll need to install these small utilities for clean class management:
```bash
npm install lucide-react clsx tailwind-merge
```

### 2. The Component (`Button.jsx`)

```jsx
import React from 'react';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility to merge tailwind classes safely
 */
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  leftIcon: LeftIcon, 
  rightIcon: RightIcon, 
  children, 
  disabled, 
  ...props 
}, ref) => {
  
  // Base Styles
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

  // Variant Styles
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
    outline: "border border-slate-300 bg-transparent hover:bg-slate-50 text-slate-700",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-700",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
  };

  // Size Styles
  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 py-2 text-sm",
    lg: "h-12 px-6 text-base",
    icon: "h-10 w-10",
  };

  return (
    <button
      ref={ref}
      disabled={isLoading || disabled}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : LeftIcon ? (
        <LeftIcon className="mr-2 h-4 w-4" />
      ) : null}
      
      {children}

      {!isLoading && RightIcon && (
        <RightIcon className="ml-2 h-4 w-4" />
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
```

---

### 3. Usage Examples
Here is how you can use this component in your application:

```jsx
import Button from './components/Button';
import { Mail, ArrowRight, Save } from 'lucide-react';

export default function Example() {
  return (
    <div className="p-10 flex flex-wrap gap-4 items-center">
      {/* Primary */}
      <Button>
        Default Button
      </Button>

      {/* With Icons */}
      <Button leftIcon={Mail}>
        Email Login
      </Button>

      {/* Loading State */}
      <Button isLoading variant="primary">
        Saving Changes
      </Button>

      {/* Variants */}
      <Button variant="outline" rightIcon={ArrowRight}>
        Learn More
      </Button>

      <Button variant="danger">
        Delete Account
      </Button>

      <Button variant="ghost">
        Cancel
      </Button>

      {/* Sizes */}
      <Button size="sm">Small</Button>
      <Button size="lg">Large Scale</Button>
    </div>
  );
}
```

### Key Features of this Component:

1.  **Polymorphic-ready:** Uses `forwardRef` so it works perfectly with animation libraries like Framer Motion or UI kits like Headless UI.
2.  **`twMerge` Integration:** If you pass a custom `className` (e.g., `className="bg-red-500"`), it will correctly override the default background color without CSS conflicts.
3.  **Loading State:** Includes a built-in spinner that automatically disables the button and maintains layout consistency.
4.  **Accessible:** Includes focus rings and disabled states for keyboard navigation and screen readers.
5.  **Clean API:** Support for `leftIcon` and `rightIcon` props makes adding visual context easy without nesting extra `<span>` tags manually.
6.  **Micro-interactions:** Includes a subtle `active:scale-[0.98]` effect to give the user tactile feedback when clicking.