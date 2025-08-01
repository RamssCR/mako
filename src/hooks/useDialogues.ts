import type { Dialogue } from '@@types/dialogues'
import { useState } from 'react'

/**
 * Custom hook to manage dialogue state in a React application.
 * @param dialogues - An array of dialogue objects.
 * @returns An object containing the current line, mood, fallback, nextLine function, and isEnd status.
 */
export const useDialogues = (dialogues: Dialogue[]) => {
  const [currentId, setCurrentId] = useState<string | null>("intro")
  const [lineIndex, setLineIndex] = useState(0)
  const node = dialogues.find(dialogue => dialogue.id === currentId)!

  /**
   * Advances to the next line of dialogue.
   * If the current line is the last one, 
   * it will set the next dialogue based on the `next` property.
   */
  const nextLine = () => {
    if (lineIndex < node.text.length - 1) {
      setLineIndex((i) => i + 1)
    } else if (node.text) {
      setCurrentId(node.next)
      setLineIndex(0)
    }
  }

  return {
    currentLine: node.text[lineIndex],
    mood: node.mood,
    fallback: node.fallback,
    nextLine,
    isEnd: !node.next && lineIndex === node.text.length - 1,
  }
}