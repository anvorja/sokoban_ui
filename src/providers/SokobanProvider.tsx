import { useCallback, useEffect, useRef, useState } from 'react'
import { SokobanContext } from '@/contexts/SokobanContext'
import { LEVELS } from '@/lib/levels'
import type { LevelData } from '@/lib/levels'
import { computeVoidCells, parseLevelData, runSolver } from '@/lib/runner'
import type { AlgorithmKey, GameState, SolveRunResult } from '@/lib/runner'
import type { ParsedLevel } from '@/lib/sokoban/types'

function buildInitialDisplayState(levelData: ParsedLevel): GameState {
  return { player: levelData.player, boxes: new Set(levelData.boxes) }
}

export function SokobanProvider({ children }: { children: React.ReactNode }) {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0)
  const [levelData, setLevelData] = useState<ParsedLevel>(() => parseLevelData(LEVELS[0]))
  const [voidCells, setVoidCells] = useState<Set<number>>(() => computeVoidCells(parseLevelData(LEVELS[0])))
  const [displayState, setDisplayState] = useState<GameState>(() => buildInitialDisplayState(parseLevelData(LEVELS[0])))

  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmKey>('astar')
  const [solveResult, setSolveResult] = useState<SolveRunResult | null>(null)
  const [isSolving, setIsSolving] = useState(false)

  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [animationSpeed, setAnimationSpeed] = useState(300)
  const [isComplete, setIsComplete] = useState(false)

  const solveResultRef = useRef<SolveRunResult | null>(null)
  solveResultRef.current = solveResult

  const selectLevel = useCallback((index: number) => {
    const level: LevelData = LEVELS[index]
    const parsed = parseLevelData(level)
    setCurrentLevelIndex(index)
    setLevelData(parsed)
    setVoidCells(computeVoidCells(parsed))
    setDisplayState(buildInitialDisplayState(parsed))
    setSolveResult(null)
    setIsAnimating(false)
    setIsPaused(false)
    setCurrentStep(0)
    setIsComplete(false)
  }, [])

  const solve = useCallback(() => {
    setIsSolving(true)
    setIsAnimating(false)
    setIsPaused(false)
    setCurrentStep(0)
    setIsComplete(false)

    const currentLevel = parseLevelData(LEVELS[currentLevelIndex])
    setDisplayState(buildInitialDisplayState(currentLevel))

    setTimeout(() => {
      try {
        const result = runSolver(currentLevel, selectedAlgorithm)
        setSolveResult(result)
        if (result.states.length > 0) {
          setDisplayState(result.states[0])
        }
      } finally {
        setIsSolving(false)
      }
    }, 10)
  }, [currentLevelIndex, selectedAlgorithm])

  const play = useCallback(() => {
    const result = solveResultRef.current
    if (!result || result.states.length === 0) return
    setIsPaused(false)
    setIsAnimating(true)
  }, [])

  const pause = useCallback(() => {
    setIsPaused(true)
    setIsAnimating(false)
  }, [])

  const reset = useCallback(() => {
    setIsAnimating(false)
    setIsPaused(false)
    setCurrentStep(0)
    setIsComplete(false)
    const result = solveResultRef.current
    if (result && result.states.length > 0) {
      setDisplayState(result.states[0])
    } else {
      setDisplayState(buildInitialDisplayState(levelData))
    }
  }, [levelData])

  const setSpeed = useCallback((ms: number) => {
    setAnimationSpeed(ms)
  }, [])

  useEffect(() => {
    if (!isAnimating || isPaused || !solveResult) return

    const totalSteps = solveResult.states.length - 1
    if (currentStep >= totalSteps) {
      setIsAnimating(false)
      setIsComplete(true)
      return
    }

    const timer = setTimeout(() => {
      setCurrentStep((prev) => {
        const next = prev + 1
        setDisplayState(solveResult.states[next])
        if (next >= totalSteps) {
          setIsAnimating(false)
          setIsComplete(true)
        }
        return next
      })
    }, animationSpeed)

    return () => clearTimeout(timer)
  }, [isAnimating, isPaused, currentStep, solveResult, animationSpeed])

  const totalSteps = solveResult ? solveResult.states.length - 1 : 0

  const value = {
    levels: LEVELS,
    currentLevelIndex,
    levelData,
    voidCells,
    displayState,
    selectedAlgorithm,
    setSelectedAlgorithm,
    solveResult,
    isSolving,
    isAnimating,
    isPaused,
    currentStep,
    totalSteps,
    animationSpeed,
    isComplete,
    selectLevel,
    solve,
    play,
    pause,
    reset,
    setSpeed,
  }

  return <SokobanContext.Provider value={value}>{children}</SokobanContext.Provider>
}
