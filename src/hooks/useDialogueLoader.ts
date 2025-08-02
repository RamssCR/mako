import { useEffect, useState } from 'react'
import type { Dialogue } from '@@types/dialogues'

const dialoguesModules = import.meta.glob<{ default: Dialogue[] }>('@data/*.json')

/**
 * Loads a dialogue by its ID from the dialogues JSON files.
 * It uses dynamic imports to fetch the dialogue data.
 * @param id The ID of the dialogue to load.
 * @returns An object containing the loaded dialogue or an error message.
 */
export const useDialogueLoader = (id: string) => {
  const [dialogues, setDialogues] = useState<Dialogue[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const match = dialoguesModules[`@data/${id}.json`]
        if (!match) throw new Error(`Dialogue with id "${id}" not found.`)
        const module = await match()
        setDialogues(module.default)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        }
      }
    }
    load()
  }, [id])

  return { dialogues, error }
}