import { useEffect, useState } from "react"

export const useTypewriter = (text: string, speed = 30) => {
  const [displayed, setDisplayed] = useState("")
  const [isTyping, setIsTyping] = useState(true)

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
    const blip = new Audio('/audios/text-sound.wav')
    blip.volume = 0.2
    reset()

    const interval = setInterval(() => {
      if (character < text.length) {
        setDisplayed((prev) => prev + text[character])
        if (character % 2 === 0) {
          try {
            blip.currentTime = 0
            blip.play()
          } catch (error) {
            console.error("Error playing sound:", error)
          }
        }
        character++
      } else {
        setIsTyping(false)
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  /**
   * Skips the typing effect and displays the full text immediately.
   */
  const skip = () => {
    setDisplayed(text)
    setIsTyping(false)
  }

  return {
    displayed,
    isTyping,
    skip,
  }
}