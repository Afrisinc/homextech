"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  Honeypot,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/ui/Field";
import { GlassCard } from "@/components/ui/GlassCard";

type Status = "idle" | "submitting" | "success" | "error";

const infrastructureTypes = [
  "Office network",
  "School or campus",
  "Multi-site organisation",
  "Data centre / server room",
  "CCTV and physical security",
  "Cloud or virtualization platform",
  "AI / GPU infrastructure",
  "Not sure yet",
];

const userCounts = ["1 – 10", "11 – 50", "51 – 150", "151 – 500", "500+"];
const yesNoPartial = ["Yes", "Partially", "No", "Not sure"];
const cloudNeeds = [
  "Private cloud",
  "Hybrid cloud",
  "Backup and recovery only",
  "Not required",
  "Advice needed",
];
const trainingNeeds = [
  "Staff training required",
  "Technician training required",
  "Both",
  "Not required",
];

/**
 * Longer consultation intake.
 * Grouped into three short steps visually so the field count never feels like
 * a wall of inputs.
 */
export function ConsultationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [formError, setFormError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});
    setFormError(null);

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/consultation", {
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
          Consultation request received
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
          We will review what you have described and come back with an initial
          assessment, the questions we still need answered, and a proposed
          sequence of work.
        </p>
        <Button
          variant="outline"
          className="mt-7"
          onClick={() => setStatus("idle")}
        >
          Submit another request
        </Button>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-6 sm:p-9">
      <form onSubmit={onSubmit} noValidate className="relative">
        <Honeypot />

        <fieldset className="border-0 p-0">
          <legend className="font-mono text-[0.625rem] tracking-[0.2em] text-brand-300 uppercase">
            01 — Organisation
          </legend>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <TextField
              label="Organization"
              name="organization"
              required
              autoComplete="organization"
              placeholder="Name of the organisation"
              error={errors.organization?.[0]}
            />
            <TextField
              label="Contact name"
              name="contactName"
              required
              autoComplete="name"
              placeholder="Who should we speak to?"
              error={errors.contactName?.[0]}
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
          </div>
        </fieldset>

        <fieldset className="mt-10 border-0 p-0">
          <legend className="font-mono text-[0.625rem] tracking-[0.2em] text-brand-300 uppercase">
            02 — Current environment
          </legend>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <SelectField
              label="Infrastructure type"
              name="infrastructureType"
              required
              options={infrastructureTypes}
              placeholder="Select the closest match"
              error={errors.infrastructureType?.[0]}
            />
            <SelectField
              label="Estimated users"
              name="userCount"
              required
              options={userCounts}
              placeholder="Select a range"
              error={errors.userCount?.[0]}
            />
            <SelectField
              label="Existing servers"
              name="hasServers"
              required
              options={yesNoPartial}
              placeholder="Select"
              error={errors.hasServers?.[0]}
            />
            <SelectField
              label="Existing networking"
              name="hasNetworking"
              required
              options={yesNoPartial}
              placeholder="Select"
              error={errors.hasNetworking?.[0]}
            />
          </div>
        </fieldset>

        <fieldset className="mt-10 border-0 p-0">
          <legend className="font-mono text-[0.625rem] tracking-[0.2em] text-brand-300 uppercase">
            03 — Requirements
          </legend>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <SelectField
              label="Cloud requirement"
              name="cloudRequirement"
              required
              options={cloudNeeds}
              placeholder="Select"
              error={errors.cloudRequirement?.[0]}
            />
            <SelectField
              label="Training requirement"
              name="trainingRequirement"
              required
              options={trainingNeeds}
              placeholder="Select"
              error={errors.trainingRequirement?.[0]}
            />
            <TextAreaField
              label="Current challenges"
              name="challenges"
              required
              placeholder="What is failing, slow, unsupported or missing today?"
              error={errors.challenges?.[0]}
              className="sm:col-span-2"
            />
          </div>
        </fieldset>

        {formError ? (
          <p role="alert" className="mt-6 text-sm text-[#ff8a8a]">
            {formError}
          </p>
        ) : null}

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Button type="submit" size="lg" disabled={status === "submitting"}>
            {status === "submitting" ? (
              <>
                <Loader2 size={16} className="animate-spin" aria-hidden />
                Submitting
              </>
            ) : (
              <>
                Request consultation
                <Send size={15} aria-hidden />
              </>
            )}
          </Button>
          <p className="text-xs text-ink-faint">
            No obligation. We will tell you honestly if something is not needed.
          </p>
        </div>
      </form>
    </GlassCard>
  );
}
