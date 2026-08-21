import { redirect } from "next/navigation";

/** The Academy lives at /training; this keeps older links working. */
export default function AcademyPage() {
  redirect("/training");
}
