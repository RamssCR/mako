import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind classes with a class list.
 * @example
 * <DummyComponent
 *  className={classMerger('bg-amber-100 text-blue-600', isActive && 'bg-teal-500')}
 * />
 */
export const classMerger = (...inputs: ClassValue[]) => twMerge(clsx(inputs))