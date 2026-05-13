import { createContext } from 'react'
import type { ParsedLevel } from '@/lib/sokoban/types'
import type { AlgorithmKey, GameState, SolveRunResult } from '@/lib/runner'
import type { LevelData } from '@/lib/levels'

export interface SokobanContextValue {
  levels: LevelData[]
  currentLevelIndex: number
  levelData: ParsedLevel
  voidCells: Set<number>

  displayState: GameState

  selectedAlgorithm: AlgorithmKey
  setSelectedAlgorithm: (alg: AlgorithmKey) => void

  solveResult: SolveRunResult | null
  isSolving: boolean

  isAnimating: boolean
  isPaused: boolean
  currentStep: number
  totalSteps: number
  animationSpeed: number
  isComplete: boolean

  selectLevel: (index: number) => void
  solve: () => void
  play: () => void
  pause: () => void
  reset: () => void
  setSpeed: (ms: number) => void
}

export const SokobanContext = createContext<SokobanContextValue | undefined>(undefined)
