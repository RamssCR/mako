/**
 * Dialogue type definition for TypeScript
 * @file src/@types/dialogues.d.ts
 */
export type Dialogue = {
  readonly id: string
  readonly text: string[]
  readonly mood?: string
  readonly fallback: string
  readonly next: string | null
  readonly conditionalNext?: Record<string, string>
}