"use client";

import type {
  ReactNode,
  SelectHTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { useId } from "react";

import { cn } from "@/lib/utils";

const control =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-ink-faint transition-colors duration-200 focus:border-brand/60 focus:bg-white/[0.05] focus:outline-none";

function Wrapper({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={htmlFor}
        className="font-mono text-[0.6875rem] tracking-[0.16em] text-ink-muted uppercase"
      >
        {label}
        {required ? <span className="ml-1 text-brand">*</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p className="text-xs text-ink-faint">{hint}</p>
      ) : null}
      {error ? (
        <p role="alert" className="text-xs text-[#ff8a8a]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextField({
  label,
  error,
  hint,
  className,
  ...props
}: {
  label: string;
  error?: string;
  hint?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <Wrapper
      label={label}
      htmlFor={id}
      error={error}
      hint={hint}
      required={props.required}
      className={className}
    >
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        className={cn(control, error && "border-[#ff8a8a]/60")}
        {...props}
      />
    </Wrapper>
  );
}

export function TextAreaField({
  label,
  error,
  hint,
  className,
  ...props
}: {
  label: string;
  error?: string;
  hint?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <Wrapper
      label={label}
      htmlFor={id}
      error={error}
      hint={hint}
      required={props.required}
      className={className}
    >
      <textarea
        id={id}
        rows={5}
        aria-invalid={error ? true : undefined}
        className={cn(control, "resize-y", error && "border-[#ff8a8a]/60")}
        {...props}
      />
    </Wrapper>
  );
}

export function SelectField({
  label,
  error,
  hint,
  options,
  placeholder,
  className,
  ...props
}: {
  label: string;
  error?: string;
  hint?: string;
  options: readonly string[];
  placeholder?: string;
} & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <Wrapper
      label={label}
      htmlFor={id}
      error={error}
      hint={hint}
      required={props.required}
      className={className}
    >
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        className={cn(
          control,
          "appearance-none bg-[#0b1119] pr-10",
          error && "border-[#ff8a8a]/60",
        )}
        {...props}
      >
        {placeholder ? (
          <option value="">{placeholder}</option>
        ) : null}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}

/** Off-screen honeypot input used to filter unsophisticated bots. */
export function Honeypot() {
  return (
    <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
      <label htmlFor="website-field">Website</label>
      <input
        id="website-field"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
