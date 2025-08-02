import { 
  lazy, 
  Suspense, 
  type ComponentType, 
  type LazyExoticComponent 
} from 'react'
import type { RouteObject } from 'react-router-dom'

type ViewModule = { default: ComponentType<unknown> }

const pages = import.meta.glob<ViewModule>('../views/*.tsx')

/**
 * Generates the route map for the application.
 * This function dynamically imports view components and maps them to route paths.
 * Each route corresponds to a view component, which is loaded lazily.
 * @returns An array of route objects for the application.
 */
export const routeMap = (): RouteObject[] => {
  return Object.entries(pages).map(([path, resolver]) => {
    const name = path
      .replace('../views/', '')
      .replace('.tsx', '')
      .toLowerCase()

    const Component: LazyExoticComponent<ComponentType<unknown>> = lazy(() => resolver())

    return {
      path: name === 'home' ? '/' : `/${name}`,
      element: (
        <Suspense fallback={<div className="w-full h-[100svh] flex flex-col items-center justify-center">Cargando {name}...</div>}>
          <Component />
        </Suspense>
      ),
    }
  })
}
