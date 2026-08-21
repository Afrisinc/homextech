"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  Honeypot,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/ui/Field";
import { GlassCard } from "@/components/ui/GlassCard";
import { projectTypeOptions, serviceOptions } from "@/data/services";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [service, setService] = useState("");

  // Pre-fill the service when arriving from a service or programme card.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("service");
    if (!requested || !(serviceOptions as readonly string[]).includes(requested)) {
      return;
    }
    // Applied after paint so hydration output always matches the server HTML.
    const id = window.setTimeout(() => setService(requested), 0);
    return () => window.clearTimeout(id);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});
    setFormError(null);

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        setErrors(data.fieldErrors ?? {});
        setFormError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      form.reset();
      setService("");
      setStatus("success");
    } catch {
      setFormError(
        "We could not reach the server. Please check your connection and try again.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <GlassCard accent="brand" className="p-9 text-center">
        <CheckCircle2 className="mx-auto text-brand" size={34} aria-hidden />
        <h2 className="mt-5 text-2xl font-semibold tracking-tight text-ink">
          Message received
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
          Thank you. An engineer will review your enquiry and respond with next
          steps. If it is urgent, call the number listed on this page.
        </p>
        <Button
          variant="outline"
          className="mt-7"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-6 sm:p-9">
      <form onSubmit={onSubmit} noValidate className="relative">
        <Honeypot />

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Full name"
            name="fullName"
            required
            autoComplete="name"
            placeholder="Your name"
            error={errors.fullName?.[0]}
          />
          <TextField
            label="Organization"
            name="organization"
            autoComplete="organization"
            placeholder="Company, school or institution"
            error={errors.organization?.[0]}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@organisation.com"
            error={errors.email?.[0]}
          />
          <TextField
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+250 …"
            error={errors.phone?.[0]}
          />
          <TextField
            label="Country"
            name="country"
            autoComplete="country-name"
            placeholder="Rwanda"
            error={errors.country?.[0]}
          />
          <SelectField
            label="Service needed"
            name="service"
            required
            options={serviceOptions}
            placeholder="Select a service"
            value={service}
            onChange={(event) => setService(event.target.value)}
            error={errors.service?.[0]}
          />
          <SelectField
            label="Project type"
            name="projectType"
            options={projectTypeOptions}
            placeholder="Select a type"
            error={errors.projectType?.[0]}
            className="sm:col-span-2"
          />
          <TextAreaField
            label="Message"
            name="message"
            required
            placeholder="Describe the site, the number of users and the problem you need solved."
            error={errors.message?.[0]}
            className="sm:col-span-2"
          />
        </div>

        {formError ? (
          <p role="alert" className="mt-5 text-sm text-[#ff8a8a]">
            {formError}
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button type="submit" size="lg" disabled={status === "submitting"}>
            {status === "submitting" ? (
              <>
                <Loader2 size={16} className="animate-spin" aria-hidden />
                Sending
              </>
            ) : (
              <>
                Send message
                <Send size={15} aria-hidden />
              </>
            )}
          </Button>
          <p className="text-xs text-ink-faint">
            We use your details only to respond to this enquiry.
          </p>
        </div>
      </form>
    </GlassCard>
  );
}
