import * as React from "react";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, ...props }, ref) => (
    <select
      ref={ref}
      className="block w-full rounded border border-gray-300 p-2"
      {...props}
    >
      {children}
    </select>
  )
);

Select.displayName = "Select";

export const SelectTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const SelectValue = ({ placeholder }: { placeholder?: string }) => <>{placeholder}</>;
export const SelectContent = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const SelectItem = ({ value, children }: { value: string, children: React.ReactNode }) => (
  <option value={value}>{children}</option>
); 