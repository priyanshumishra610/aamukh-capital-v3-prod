'use client';

import React from 'react';
import { Check, X } from 'lucide-react';

type ChoiceGroupProps = {
  options: readonly string[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  max?: number;
  variant?: 'slots' | 'bar' | 'rows';
  name: string;
  slotLabel?: string;
  error?: string;
};

export default function ChoiceGroup({
  options,
  value,
  onChange,
  multiple = false,
  max,
  variant = 'rows',
  name,
  slotLabel = 'Selection',
  error,
}: ChoiceGroupProps) {
  const selected = multiple ? (value as string[]) : value ? [value as string] : [];
  const atMax = Boolean(multiple && max && selected.length >= max);

  const pick = (option: string) => {
    if (multiple) {
      if (selected.includes(option)) {
        onChange(selected.filter((item) => item !== option));
        return;
      }
      if (atMax) return;
      onChange([...selected, option]);
      return;
    }
    onChange(selected[0] === option ? '' : option);
  };

  if (variant === 'bar') {
    return (
      <div
        role="radiogroup"
        aria-label={name}
        className={`grid grid-cols-5 overflow-hidden rounded-2xl border bg-white ${
          error ? 'border-red-400 ring-2 ring-red-100' : 'border-[#e8e8e8]'
        }`}
      >
        {options.map((option, index) => {
          const active = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => pick(option)}
              className={`h-12 text-[12px] font-medium transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] sm:text-[13px] ${
                index < options.length - 1 ? 'border-r border-[#f0f0f0]' : ''
              } ${
                active
                  ? 'bg-[#0A1128] text-white'
                  : 'text-text-secondary hover:bg-black/[0.03] hover:text-text-primary'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'slots') {
    const slots = Array.from({ length: max || 3 }, (_, index) => selected[index] || '');

    return (
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-3 gap-2">
          {slots.map((slot, index) => (
            <div
              key={`slot-${index}`}
              className={`flex h-11 items-center justify-between gap-2 rounded-xl border px-3 ${
                slot
                  ? 'border-brand/20 bg-brand/[0.07] text-brand'
                  : 'border-dashed border-[#d9d9d9] text-text-muted'
              }`}
            >
              <span className="truncate text-[13px] font-medium">
                {slot || `${slotLabel} ${index + 1}`}
              </span>
              {slot ? (
                <button
                  type="button"
                  aria-label={`Remove ${slot}`}
                  onClick={() => pick(slot)}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full hover:bg-brand/10"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={2.2} />
                </button>
              ) : null}
            </div>
          ))}
        </div>

        <div
          role="group"
          aria-label={name}
          className={`max-h-[260px] overflow-y-auto rounded-2xl border bg-white [scrollbar-width:thin] ${
            error ? 'border-red-400 ring-2 ring-red-100' : 'border-[#e8e8e8]'
          }`}
        >
          {options.map((option, index) => {
            const active = selected.includes(option);
            const locked = atMax && !active;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={active}
                disabled={locked}
                onClick={() => pick(option)}
                className={`flex h-12 w-full items-center gap-3 px-4 text-left text-[14px] transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] disabled:cursor-not-allowed disabled:opacity-35 ${
                  index < options.length - 1 ? 'border-b border-[#f3f3f3]' : ''
                } ${
                  active
                    ? 'bg-brand/[0.06] font-medium text-text-primary'
                    : 'text-text-primary hover:bg-black/[0.025]'
                }`}
              >
                <span
                  className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border transition-colors ${
                    active ? 'border-brand bg-brand text-white' : 'border-[#cfcfcf] bg-white'
                  }`}
                >
                  {active && <Check className="h-3 w-3" strokeWidth={3} />}
                </span>
                <span className="min-w-0 leading-snug">{option}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      role={multiple ? 'group' : 'radiogroup'}
      aria-label={name}
      className={`overflow-hidden rounded-2xl border bg-white ${
        error ? 'border-red-400 ring-2 ring-red-100' : 'border-[#e8e8e8]'
      }`}
    >
      {options.map((option, index) => {
        const active = selected.includes(option);
        const locked = atMax && !active;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            disabled={locked}
            onClick={() => pick(option)}
            className={`flex min-h-[56px] w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] disabled:cursor-not-allowed disabled:opacity-35 ${
              index < options.length - 1 ? 'border-b border-[#f3f3f3]' : ''
            } ${active ? 'bg-black/[0.03]' : 'hover:bg-black/[0.02]'}`}
          >
            <span className={`text-[15px] leading-snug ${active ? 'font-medium text-text-primary' : 'text-text-primary'}`}>
              {option}
            </span>
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                active ? 'border-[#0A1128] bg-[#0A1128]' : 'border-[#cfcfcf] bg-white'
              }`}
            >
              {active && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
            </span>
          </button>
        );
      })}
    </div>
  );
}
