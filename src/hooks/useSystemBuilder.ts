import { useContext } from 'react'
import {
  SystemBuilderContext,
  type SystemBuilderApi,
} from '../context/systemBuilderContext'

/** Access the system-builder logic. Must be used inside SystemBuilderProvider. */
export function useSystemBuilder(): SystemBuilderApi {
  const ctx = useContext(SystemBuilderContext)
  if (!ctx) {
    throw new Error(
      'useSystemBuilder must be used within a <SystemBuilderProvider>',
    )
  }
  return ctx
}
