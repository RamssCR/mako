import { useCallback, useEffect, type MouseEventHandler } from "react"
import dialogues from "@data/dialogues.json"
import { motion } from "motion/react"
import { useDialogues } from "@hooks/useDialogues"
import { useTypewriter } from "@hooks/useTypewriter"
import { ChevronDown, X } from "lucide-react"

/**
 * DialogueBox component displays a dialogue box with text that can be typed out character by character.
 * It uses a typewriter effect for the text and allows skipping through the dialogue.
 * @returns The rendered DialogueBox component.
 */
export const DialogueBox = () => {
  const {
    currentLine,
    fallback,
    isEnd,
    nextLine,
  } = useDialogues(dialogues)
  const {
    displayed,
    isTyping,
    skip
  } = useTypewriter(currentLine ?? "")

  /**
   * Handles the skip action for the dialogue.
   * If currently typing, it skips to the end of the current line.
   */
  const handleSkip: MouseEventHandler<HTMLDivElement> = () => {
    if (isTyping) {
      skip()
    } else {
      nextLine()
    }
  }

  /**
   * Handles the keyboard events for the dialogue box.
   * If the 'x' key is pressed while typing, it skips the current line.
   * If the 'z' key is pressed when not typing, it moves to the next line.
   * @param e The keyboard event triggered when a key is pressed.
   */
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "x") {
      if (isTyping) {
        const dialogueElement = document.querySelector("[data-dialogue]")
        if (dialogueElement) dialogueElement.textContent = ""
        skip()
      }
    }

    if (e.key === "z") {
      if (!isTyping) nextLine()
    }
  }, [isTyping, nextLine, skip])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  if (!currentLine) return null

  return (
    <article
      className="w-full px-4 py-6 min-h-[15em] relative max-w-xl bg-dark text-light border-4 border-light focus-visible:ring-2 focus-visible:ring-light focus-visible:ring-offset-2 focus:outline-none"
      onClick={handleSkip}
      role="dialogue"
    >
      <motion.p
        data-dialogue
        key={currentLine}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="whitespace-pre-wrap text-lg"
      >
        {displayed}
      </motion.p>
      {!isTyping && (
        <motion.div
          className="size-5 absolute bottom-2 right-2 animate-bounce cursor-pointer"
          initial={{ opacity: 0, transition: { delay: 0.2 } }}
          animate={{ opacity: 1 }}
        >
          {isEnd
            ? <X className="text-light size-full" />
            : <ChevronDown className="text-light size-full" />
          }
        </motion.div>
      )}
      {!isTyping && (
        <motion.p
          className="text-sm text-light/30 absolute bottom-2 left-2"
          initial={{ opacity: 0, transition: { delay: 0.2 } }}
          animate={{ opacity: 1 }}
        >
          {fallback}
        </motion.p>
      )}
    </article>
  )
}