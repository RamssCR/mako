import { 
  lazy, 
  Suspense, 
  type ComponentType, 
  type LazyExoticComponent 
} from 'react'
import type { RouteObject } from 'react-router-dom'

type ViewModule = { default: ComponentType<unknown> }

const pages = import.meta.glob<ViewModule>('../views/*.tsx')

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
