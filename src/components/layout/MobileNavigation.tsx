"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { primaryNav } from "@/data/navigation";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);

  // Close the panel when the route changes. Deriving this during render
  // (rather than in an effect) avoids a cascading second render pass.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-ink transition-colors hover:border-brand/40 hover:text-brand xl:hidden"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-18 z-40 xl:hidden"
          >
            <div
              className="absolute inset-0 bg-void/95 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              aria-label="Mobile"
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full overflow-y-auto px-5 pt-6 pb-24"
            >
              <ul className="space-y-1">
                {primaryNav.map((item, index) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * index, duration: 0.4 }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-baseline justify-between border-b border-white/6 py-4",
                          active ? "text-brand" : "text-ink",
                        )}
                      >
                        <span className="text-xl font-medium tracking-tight">
                          {item.label}
                        </span>
                        {item.description ? (
                          <span className="ml-4 max-w-[52%] text-right text-xs text-ink-faint">
                            {item.description}
                          </span>
                        ) : null}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-8 flex flex-col gap-3">
                <ButtonLink href="/contact/consultation" size="lg">
                  Request a consultation
                </ButtonLink>
                <ButtonLink href="/contact" variant="outline" size="lg">
                  Contact us
                </ButtonLink>
              </div>

              <p className="mt-8 font-mono text-[0.6875rem] tracking-[0.16em] text-ink-faint uppercase">
                {company.location} · {company.email}
              </p>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
