import { useContext } from 'react'
import { SokobanContext } from '@/contexts/SokobanContext'

export function useSokoban() {
  const ctx = useContext(SokobanContext)
  if (!ctx) throw new Error('useSokoban debe usarse dentro de SokobanProvider')
  return ctx
}
