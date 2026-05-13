import { useSokoban } from '@/hooks/useSokoban'
import { ALGORITHM_INFO } from '@/lib/runner'
import { cn } from '@/lib/utils'

interface StatItemProps {
  label: string
  value: string | number
  highlight?: boolean
  color?: string
}

function StatItem({ label, value, highlight, color }: StatItemProps) {
  return (
    <div className="sokoban-stat-item rounded-lg p-2.5">
      <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">{label}</p>
      <p
        className={cn('mt-0.5 font-heading text-base font-bold tabular-nums leading-tight', highlight ? 'text-white' : 'text-slate-300')}
        style={color ? { color } : undefined}
      >
        {value}
      </p>
    </div>
  )
}

function formatTime(ms: number): string {
  if (ms < 1) return `${(ms * 1000).toFixed(0)} µs`
  if (ms < 1000) return `${ms.toFixed(2)} ms`
  return `${(ms / 1000).toFixed(2)} s`
}

export function StatsPanel() {
  const { solveResult, selectedAlgorithm } = useSokoban()
  const algInfo = ALGORITHM_INFO[selectedAlgorithm]

  if (!solveResult) {
    return (
      <div className="space-y-2">
        <p className="sokoban-label">Estadísticas</p>
        <div className="sokoban-stats-empty rounded-lg px-4 py-6 text-center">
          <p className="text-xs text-slate-500">Ejecuta un algoritmo para ver las estadísticas</p>
        </div>
      </div>
    )
  }

  const { searchResult, timeMs } = solveResult

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="sokoban-label">Estadísticas</p>
        <span className="rounded-full px-2 py-0.5 text-xs font-bold" style={{ backgroundColor: `${algInfo.color}25`, color: algInfo.color }}>
          {algInfo.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        <StatItem label="Tiempo" value={formatTime(timeMs)} highlight color={algInfo.color} />
        <StatItem label="Movimientos" value={searchResult.path?.length ?? '—'} highlight />
        <StatItem label="Explorados" value={searchResult.explored.toLocaleString()} />
        <StatItem label="Generados" value={searchResult.generated.toLocaleString()} />
        <StatItem label="Costo" value={searchResult.cost ?? '—'} />
        <StatItem label="Profundidad" value={searchResult.depth ?? '—'} />
      </div>

      {searchResult.path && (
        <div className="sokoban-path-display rounded-lg p-2.5">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-slate-500">Camino</p>
          <p className="break-all font-mono text-[11px] leading-relaxed text-slate-300">
            {searchResult.path.join('')}
          </p>
        </div>
      )}
    </div>
  )
}
