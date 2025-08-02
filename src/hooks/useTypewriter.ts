import { useEffect, useRef, useState } from "react"

export const useTypewriter = (text: string, speed = 30) => {
  const [displayed, setDisplayed] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [canPlaySound, setCanPlaySound] = useState(false);
  const intervalRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const enableSound = () => setCanPlaySound(true);
    window.addEventListener("pointerdown", enableSound, { once: true });
    window.addEventListener("keydown", enableSound, { once: true });
    return () => {
      window.removeEventListener("pointerdown", enableSound);
      window.removeEventListener("keydown", enableSound);
    };
  }, []);

  /**
   * Resets the typewriter effect.
   * This sets the displayed text to an empty string and marks typing as true.
   */
  const reset = () => {
    setDisplayed("")
    setIsTyping(true)
  }

  useEffect(() => {
    let character = 0
    let isCancelled = false
    const blip = new Audio('/audios/text-sound.wav')
    blip.volume = 0.2
    reset()

    intervalRef.current = window.setInterval(() => {
      if (character >= text.length || isCancelled) {
        setIsTyping(false)
        clearInterval(intervalRef.current)
        return
      }

      const nextChar = text[character]
      character++

      setDisplayed((prev) => prev + nextChar)

      if (character % 2 === 0 && canPlaySound) {
        try {
          blip.currentTime = 0
          blip.play()
        } catch (error) {
          console.error("Error playing sound:", error)
        }
      }
    }, speed)

    return () => {
      isCancelled = true
      clearInterval(intervalRef.current)
    }
  }, [text, speed, canPlaySound])

  /**
   * Skips the typing effect and displays the full text immediately.
   */
  const skip = () => {
    clearInterval(intervalRef.current)
    setDisplayed(text)
    setIsTyping(false)
  }

  return {
    displayed,
    isTyping,
    skip,
  }
}