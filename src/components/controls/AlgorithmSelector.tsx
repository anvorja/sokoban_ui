import { cn } from '@/lib/utils'
import { useSokoban } from '@/hooks/useSokoban'
import { ALGORITHM_INFO } from '@/lib/runner'
import type { AlgorithmKey } from '@/lib/runner'

const ALGORITHMS = Object.entries(ALGORITHM_INFO) as [AlgorithmKey, (typeof ALGORITHM_INFO)[AlgorithmKey]][]

export function AlgorithmSelector() {
  const { selectedAlgorithm, setSelectedAlgorithm, isAnimating } = useSokoban()

  return (
    <div className="space-y-2">
      <p className="sokoban-label">Algoritmo de Búsqueda</p>
      <div className="grid grid-cols-2 gap-1">
        {ALGORITHMS.map(([key, info]) => (
          <button
            key={key}
            onClick={() => setSelectedAlgorithm(key)}
            disabled={isAnimating}
            className={cn(
              'sokoban-algo-btn flex items-center gap-2 rounded-lg border px-2 py-1.5 text-left text-xs transition-all disabled:opacity-40',
              selectedAlgorithm === key ? 'sokoban-algo-btn-active' : 'sokoban-algo-btn-inactive'
            )}
          >
            <div
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: info.color, boxShadow: selectedAlgorithm === key ? `0 0 5px ${info.color}` : 'none' }}
            />
            <span className="block font-heading font-bold truncate" style={{ color: selectedAlgorithm === key ? info.color : undefined }}>
              {info.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
