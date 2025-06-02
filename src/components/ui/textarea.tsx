import * as React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ ...props }, ref) => (
    <textarea
      ref={ref}
      className="block w-full rounded border border-gray-300 p-2"
      {...props}
    />
  )
);

Textarea.displayName = "Textarea"; 