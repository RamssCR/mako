import { routeMap } from "@router/routeMap"
import { useRoutes } from "react-router-dom"

/**
 * Main application component.
 * This component sets up the routing for the application using the routeMap function.
 * It renders the appropriate component based on the current route.
 * @returns JSX Element representing the main application component.
 */
export const App = () => {
  const routes = useRoutes(routeMap())
  return routes
}