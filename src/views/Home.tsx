import { DialogueBox } from "@components/dialogue-box/DialogueBox"

/**
 * Home component for the application.
 * This component serves as the main landing page of the application.
 * @returns JSX Element representing the Home component.
 */
const Home = () => {
  return (
    <section className="w-full flex flex-col items-start gap-4">
      <h1>Mako</h1>
      <article className="w-full flex items-center justify-center">
        <DialogueBox />
      </article>
    </section>
  )
}

export default Home