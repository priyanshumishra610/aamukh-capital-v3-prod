'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Search, X } from 'lucide-react';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

type SelectMenuProps = {
  id: string;
  options: readonly string[];
  placeholder?: string;
  searchable?: boolean;
  error?: string;
  multiple?: boolean;
  max?: number;
  value: string | string[];
  onChange: (value: string | string[]) => void;
};

export default function SelectMenu({
  id,
  options,
  placeholder = 'Select an option',
  searchable = false,
  error,
  multiple = false,
  max,
  value,
  onChange,
}: SelectMenuProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [openUp, setOpenUp] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const reduce = useReducedMotion();

  const selected = useMemo(
    () => (multiple ? (value as string[]) : value ? [value as string] : []),
    [multiple, value]
  );

  const remaining = useMemo(
    () => options.filter((option) => !selected.includes(option)),
    [options, selected]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return remaining;
    return remaining.filter((option) => option.toLowerCase().includes(q));
  }, [query, remaining]);

  const closeMenu = () => {
    setOpen(false);
    setQuery('');
  };

  useEffect(() => {
    if (!open) return;

    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) closeMenu();
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };

    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open || !rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    setOpenUp(window.innerHeight - rect.bottom < 280 && rect.top > 280);
    if (searchable) {
      requestAnimationFrame(() => searchRef.current?.focus());
    }
  }, [open, searchable]);

  const pickOption = (option: string) => {
    if (multiple) {
      if (selected.includes(option)) return;
      if (max && selected.length >= max) return;
      onChange([...selected, option]);
    } else {
      onChange(option);
    }
    closeMenu();
  };

  const removeOption = (option: string) => {
    if (multiple) {
      onChange(selected.filter((item) => item !== option));
      return;
    }
    onChange('');
  };

  const atMax = Boolean(multiple && max && selected.length >= max);
  const triggerLabel = multiple
    ? selected.length
      ? atMax
        ? `${selected.length} selected`
        : 'Add another'
      : placeholder
    : selected[0] || placeholder;

  const menuMotion = reduce
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.16, ease: EASE_OUT },
      }
    : {
        initial: { opacity: 0, transform: 'translateY(-6px) scale(0.97)' },
        animate: { opacity: 1, transform: 'translateY(0px) scale(1)' },
        exit: { opacity: 0, transform: 'translateY(-6px) scale(0.97)' },
        transition: { duration: 0.18, ease: EASE_OUT },
      };

  return (
    <div className={`relative ${open ? 'z-20' : 'z-0'}`} ref={rootRef}>
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={Boolean(error)}
        disabled={atMax}
        onClick={() => {
          if (atMax) return;
          setOpen((prev) => !prev);
        }}
        className={`flex h-14 w-full items-center justify-between gap-3 rounded-2xl border bg-white px-4 text-left text-[15px] transition-[border-color,box-shadow,opacity] duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          error
            ? 'border-red-400 ring-2 ring-red-100'
            : open
              ? 'border-brand ring-2 ring-brand/15'
              : 'border-[#e8e8e8] hover:border-brand/40'
        } ${atMax ? 'cursor-default opacity-70' : ''}`}
      >
        <span
          className={
            !multiple && selected.length
              ? 'truncate text-text-primary'
              : selected.length && multiple
                ? 'truncate text-text-primary'
                : 'truncate text-text-muted'
          }
        >
          {triggerLabel}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-text-muted transition-transform duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {multiple && selected.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-2">
          <AnimatePresence initial={false}>
            {selected.map((option) => (
              <motion.span
                key={option}
                initial={reduce ? { opacity: 0 } : { opacity: 0, transform: 'scale(0.96)' }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, transform: 'scale(1)' }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, transform: 'scale(0.96)' }}
                transition={{ duration: 0.16, ease: EASE_OUT }}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 py-1.5 pl-3 pr-1.5 text-[13px] font-medium text-brand"
              >
                {option}
                <button
                  type="button"
                  aria-label={`Remove ${option}`}
                  onClick={() => removeOption(option)}
                  className="flex h-6 w-6 items-center justify-center rounded-full text-brand transition-colors hover:bg-brand/15"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={2.2} />
                </button>
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      )}

      {multiple && max ? (
        <p className="mt-2 text-[12px] text-text-muted">
          {selected.length} of {max} selected
        </p>
      ) : null}

      <AnimatePresence>
        {open && (
          <motion.div
            {...menuMotion}
            style={{ transformOrigin: openUp ? 'bottom center' : 'top center' }}
            className={`absolute z-30 w-full overflow-hidden rounded-2xl border border-[#ececec] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.12)] ${
              openUp ? 'bottom-[calc(100%+8px)]' : 'top-[calc(100%+8px)]'
            }`}
          >
            {searchable && remaining.length > 6 && (
              <div className="flex items-center gap-2 border-b border-[#f3f3f3] px-3 py-2.5">
                <Search className="h-4 w-4 text-text-muted" />
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search remaining options"
                  autoComplete="off"
                  className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
                />
              </div>
            )}

            <ul role="listbox" aria-multiselectable={multiple} className="max-h-64 overflow-y-auto py-1.5">
              {filtered.length === 0 && (
                <li className="px-4 py-3 text-sm text-text-muted">
                  {remaining.length === 0 ? 'All options selected.' : 'No matching options.'}
                </li>
              )}
              {filtered.map((option) => (
                <li key={option}>
                  <button
                    type="button"
                    onPointerDown={(event) => event.preventDefault()}
                    onClick={(event) => {
                      event.stopPropagation();
                      pickOption(option);
                    }}
                    className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm text-text-primary transition-colors hover:bg-[#f7f8fc]"
                  >
                    <span>{option}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
