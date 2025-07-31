import { afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

beforeEach(() => {
  // Mock console methods to prevent cluttering test output
  vi.spyOn(console, 'error').mockImplementation(vi.fn())
  vi.spyOn(console, 'log').mockImplementation(vi.fn())
})

// Mock environment variables
vi.stubEnv('VITE_VERSION', 'test')

afterEach(() => {
  // Clean up the DOM after each test
  cleanup()

  // Restore all mocks and clear any state
  vi.restoreAllMocks()
  vi.clearAllMocks()
  vi.resetModules()
  vi.useRealTimers()
})

// Mock browser APIs
vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => setTimeout(cb, 0))

window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

window.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  takeRecords: vi.fn().mockReturnValue([]),
}))