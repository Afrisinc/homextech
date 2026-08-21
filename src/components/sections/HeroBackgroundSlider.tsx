"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

/**
 * Every photograph used as a hero backdrop, in rotation order.
 * Files live in `public/images/` — add or reorder entries here and the
 * slideshow, preloading and indicators all follow automatically.
 */
export const heroImages = [
  {
    src: "/images/hero-background.jpg",
    alt: "Data centre server racks",
    objectPosition: "object-[62%_center] sm:object-center",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwClPa215cySM0m5SQUI+U9xz6Y7VXYBWIQBR6EdPyoor1oRSbkjzHJvQ//Z",
  },
  {
    src: "/images/training-lab.jpg",
    alt: "Training lab workstations",
    objectPosition: "object-[55%_center] sm:object-center",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDCS5lSRMMfLCsAu4gDIxkZNRrCJwXLr1x85yTRRUXNXuf/2Q==",
  },
  {
    src: "/images/ai-core.jpg",
    alt: "AI compute core",
    objectPosition: "object-[center] sm:object-center",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDnbVoWcrcNhQODkjmmtLHuPUjPH0oooBn/2Q==",
  },
  {
    src: "/images/network-flow.jpg",
    alt: "Network topology flow",
    objectPosition: "object-[center] sm:object-center",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDBVIvKDFwSeoPGKrtjccdKKKzOzqf/2Q==",
  },
] as const;

/** Time each image is held, and how long the crossfade between them takes. */
const HOLD_MS = 5000;
const FADE_MS = 1200;

interface HeroBackgroundSliderProps {
  className?: string;
  /** Render the clickable dots. */
  showIndicators?: boolean;
}

/**
 * Auto-advancing, crossfading hero backdrop.
 *
 * All four images are mounted at once and cross-faded with opacity, so there
 * is never a hard cut or a blank frame. The timer is cleared on unmount and
 * restarted whenever the viewer picks a slide, and the whole layer is
 * pointer-transparent apart from the indicators, so the Three.js canvas above
 * keeps every pointer event.
 */
export function HeroBackgroundSlider({
  className,
  showIndicators = true,
}: HeroBackgroundSliderProps) {
  const [index, setIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  useEffect(() => {
    clear();
    timer.current = setTimeout(
      () => setIndex((current) => (current + 1) % heroImages.length),
      HOLD_MS,
    );
    return clear;
  }, [index, clear]);

  const select = useCallback((next: number) => {
    setIndex(next);
  }, []);

  return (
    <>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 z-0 overflow-hidden select-none",
          className,
        )}
      >
        {heroImages.map((image, i) => (
          <Image
            key={image.src}
            src={image.src}
            alt=""
            fill
            priority={i === 0}
            fetchPriority={i === 0 ? "high" : "auto"}
            loading={i === 0 ? undefined : "eager"}
            sizes="100vw"
            placeholder="blur"
            blurDataURL={image.blurDataURL}
            draggable={false}
            style={{
              opacity: i === index ? 1 : 0,
              transitionDuration: `${reducedMotion ? 0 : FADE_MS}ms`,
            }}
            className={cn(
              "object-cover transition-opacity ease-[var(--ease-out-expo)] motion-reduce:transition-none",
              image.objectPosition,
              "saturate-[0.9] contrast-[1.03] brightness-[0.92]",
            )}
          />
        ))}
      </div>

      {showIndicators ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-40 flex justify-center sm:bottom-8">
          <div
            role="tablist"
            aria-label="Hero background image"
            className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-white/10 bg-void/40 px-3 py-2 backdrop-blur-md"
          >
            {heroImages.map((image, i) => (
              <button
                key={image.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={image.alt}
                onClick={() => select(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500 ease-[var(--ease-out-expo)]",
                  i === index
                    ? "w-6 bg-brand"
                    : "w-1.5 bg-white/35 hover:bg-white/70",
                )}
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default HeroBackgroundSlider;
