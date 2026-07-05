import { useState } from 'react';
import type { FaqItem } from '../data/faq';
import { faqItems } from '../data/faq';

function ChevronIcon({ open }: { open: boolean }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`shrink-0 text-gold transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
        >
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
}

function FaqAccordionItem({
    item,
    index,
    isOpen,
    onToggle,
}: {
    item: FaqItem;
    index: number;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <div
            className={`rounded-lg border transition-colors ${
                isOpen ? 'border-gold/30 bg-bronze-900/50' : 'border-gold/15 bg-bronze-900/30 hover:border-gold/25'
            }`}
        >
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-3 p-4 text-left sm:p-5"
            >
                <span className="flex gap-3">
                    <span className="mt-0.5 shrink-0 text-xs font-semibold tabular-nums text-gold">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                        className={`font-display text-sm leading-snug sm:text-base ${
                            isOpen ? 'text-parchment' : 'text-parchment-200'
                        }`}
                    >
                        {item.q}
                    </span>
                </span>
                <ChevronIcon open={isOpen} />
            </button>
            <div
                className="grid transition-[grid-template-rows] duration-200 ease-out"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
                <div className="overflow-hidden">
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                        <div className="rounded-md border border-gold/15 bg-bronze-950/70 p-4 sm:p-5">
                            <p className="text-sm leading-relaxed text-parchment-300">{item.a}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface FAQProps {
    items?: FaqItem[];
}

export default function FAQ({ items = faqItems }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const midpoint = Math.ceil(items.length / 2);
    const leftColumn = items.slice(0, midpoint);
    const rightColumn = items.slice(midpoint);

    const renderColumn = (columnItems: FaqItem[], offset: number) =>
        columnItems.map((item, i) => {
            const index = offset + i;
            return (
                <FaqAccordionItem
                    key={`${item.q}-${index}`}
                    item={item}
                    index={index}
                    isOpen={openIndex === index}
                    onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
            );
        });

    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:gap-6">
            <div className="space-y-3 md:space-y-4">{renderColumn(leftColumn, 0)}</div>
            <div className="space-y-3 md:space-y-4">{renderColumn(rightColumn, midpoint)}</div>
        </div>
    );
}
