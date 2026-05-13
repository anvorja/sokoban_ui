import { Loader2, Pause, Play, RotateCcw, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSokoban } from '@/hooks/useSokoban'

export function SolverControls() {
  const { solve, play, pause, reset, isSolving, isAnimating, isPaused, solveResult, currentStep, totalSteps, isComplete } = useSokoban()

  const hasSolution = solveResult !== null && (solveResult.states.length > 0 || solveResult.searchResult.path === null)
  const hasNoSolution = solveResult !== null && solveResult.searchResult.path === null
  const canPlay = hasSolution && !hasNoSolution && !isAnimating && currentStep < totalSteps

  const progress = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0

  return (
    <div className="space-y-3">
      <p className="sokoban-label">Controles</p>

      <button
        onClick={solve}
        disabled={isSolving || isAnimating}
        className={cn(
          'sokoban-btn-solve w-full rounded-lg px-4 py-2.5 font-heading text-sm font-bold transition-all',
          'flex items-center justify-center gap-2',
          (isSolving || isAnimating) && 'opacity-50 cursor-not-allowed'
        )}
      >
        {isSolving ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Calculando...
          </>
        ) : (
          <>
            <Zap className="h-4 w-4" />
            Resolver
          </>
        )}
      </button>

      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={isAnimating ? pause : play}
          disabled={!canPlay && !isAnimating}
          className={cn(
            'sokoban-btn-play flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 font-heading text-sm font-semibold transition-all',
            (!canPlay && !isAnimating) && 'opacity-40 cursor-not-allowed'
          )}
        >
          {isAnimating && !isPaused ? (
            <><Pause className="h-4 w-4" /> Pausa</>
          ) : (
            <><Play className="h-4 w-4" /> {isPaused ? 'Reanudar' : 'Jugar'}</>
          )}
        </button>

        <button
          onClick={reset}
          disabled={!hasSolution || isAnimating}
          className={cn(
            'sokoban-btn-reset col-span-2 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 font-heading text-sm font-semibold transition-all',
            (!hasSolution || isAnimating) && 'opacity-40 cursor-not-allowed'
          )}
        >
          <RotateCcw className="h-4 w-4" />
          Reiniciar
        </button>
      </div>

      {hasSolution && !hasNoSolution && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Paso {currentStep} / {totalSteps}</span>
            {isComplete && <span className="font-semibold text-emerald-400">Completado</span>}
          </div>
          <div className="sokoban-progress-track h-2 w-full overflow-hidden rounded-full">
            <div
              className="sokoban-progress-bar h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {hasNoSolution && (
        <div className="rounded-lg border border-red-500/30 bg-red-950/30 px-3 py-2 text-center text-xs font-semibold text-red-400">
          Sin solución para este nivel
        </div>
      )}
    </div>
  )
}
