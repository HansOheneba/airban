"use client";

import { Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { faqs } from "@/lib/content";

function FaqItem({
  question,
  answer,
  open,
  onToggle,
  index,
  shown,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
  index: number;
  shown: boolean;
}) {
  const id = `faq-${index}`;
  return (
    <div
      className={`transform transition-all duration-500 ease-out ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold text-gray-900 hover:text-airbanBlue transition-colors duration-200 group"
      >
        <span className="text-lg">{question}</span>
        <div className={`transform transition-transform duration-300 ease-in-out ${open ? "rotate-180" : "rotate-0"}`}>
          {open ? (
            <Minus className="h-5 w-5 text-airbanBlue" />
          ) : (
            <Plus className="h-5 w-5 text-gray-500 group-hover:text-airbanBlue transition-colors duration-200" />
          )}
        </div>
      </button>
      <div
        id={id}
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className="pb-6 pr-8 text-gray-600 leading-relaxed text-base">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Have questions about buying, renting, or real estate in general? We&apos;re here to provide clear, professional answers to help guide your decisions.
            </p>
          </div>
          <div ref={ref} className="space-y-2 divide-y divide-gray-100">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="bg-white overflow-hidden">
                <FaqItem
                  {...faq}
                  index={index}
                  shown={shown}
                  open={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
