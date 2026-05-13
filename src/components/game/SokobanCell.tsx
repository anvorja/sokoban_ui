import { cn } from '@/lib/utils'

export type CellType = 'wall' | 'floor' | 'goal' | 'player' | 'player-goal' | 'box' | 'box-goal' | 'void'

interface SokobanCellProps {
  type: CellType
  className?: string
}

function WallBlock() {
  return (
    <div className="sokoban-wall absolute inset-0">
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-px p-px opacity-20">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-sm bg-white/10" />
        ))}
      </div>
    </div>
  )
}

function PlayerSprite() {
  return (
    <div className="sokoban-player absolute inset-[8%] flex flex-col items-center justify-center">
      <svg viewBox="0 0 16 20" className="h-full w-full drop-shadow-lg">
        <rect x="4" y="0" width="8" height="8" rx="1" fill="#7dd3fc" />
        <rect x="5" y="2" width="2" height="2" fill="#0c4a6e" />
        <rect x="9" y="2" width="2" height="2" fill="#0c4a6e" />
        <rect x="6" y="5" width="4" height="1" fill="#0c4a6e" />
        <rect x="3" y="8" width="10" height="7" rx="1" fill="#2563eb" />
        <rect x="1" y="8" width="2" height="5" rx="1" fill="#3b82f6" />
        <rect x="13" y="8" width="2" height="5" rx="1" fill="#3b82f6" />
        <rect x="3" y="15" width="3" height="5" rx="1" fill="#1d4ed8" />
        <rect x="10" y="15" width="3" height="5" rx="1" fill="#1d4ed8" />
      </svg>
    </div>
  )
}

function BoxSprite({ onGoal }: { onGoal?: boolean }) {
  return (
    <div className={cn('absolute inset-[6%]', onGoal && 'sokoban-box-glow')}>
      <svg viewBox="0 0 20 20" className="h-full w-full drop-shadow-md">
        <rect x="0" y="0" width="20" height="20" rx="2" fill={onGoal ? '#16a34a' : '#92400e'} />
        <rect x="1" y="1" width="18" height="18" rx="1" fill={onGoal ? '#22c55e' : '#b45309'} />
        <rect x="9" y="1" width="2" height="18" fill={onGoal ? '#15803d' : '#78350f'} opacity="0.6" />
        <rect x="1" y="9" width="18" height="2" fill={onGoal ? '#15803d' : '#78350f'} opacity="0.6" />
        <rect x="1" y="1" width="18" height="2" fill="white" opacity="0.15" />
        <rect x="1" y="1" width="2" height="18" fill="white" opacity="0.15" />
        {onGoal && <rect x="0" y="0" width="20" height="20" rx="2" fill="#4ade80" opacity="0.15" />}
      </svg>
    </div>
  )
}

function GoalMarker() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="sokoban-goal-marker relative flex h-[45%] w-[45%] items-center justify-center">
        <div className="absolute h-full w-[12%] rotate-45 rounded-full bg-emerald-400 opacity-80" />
        <div className="absolute h-[12%] w-full rotate-45 rounded-full bg-emerald-400 opacity-80" />
        <div className="absolute h-full w-[12%] -rotate-45 rounded-full bg-emerald-400 opacity-80" />
        <div className="absolute h-[12%] w-full -rotate-45 rounded-full bg-emerald-400 opacity-80" />
      </div>
    </div>
  )
}

export function SokobanCell({ type, className }: SokobanCellProps) {
  if (type === 'void') {
    return <div className={cn('sokoban-cell-void aspect-square', className)} />
  }

  return (
    <div
      className={cn(
        'sokoban-cell relative aspect-square overflow-hidden',
        type === 'wall' && 'sokoban-cell-wall',
        (type === 'floor' || type === 'goal' || type === 'player' || type === 'player-goal' || type === 'box' || type === 'box-goal') && 'sokoban-cell-floor',
        className
      )}
    >
      {type === 'wall' && <WallBlock />}
      {(type === 'goal' || type === 'player-goal') && <GoalMarker />}
      {(type === 'player' || type === 'player-goal') && <PlayerSprite />}
      {type === 'box' && <BoxSprite />}
      {type === 'box-goal' && <BoxSprite onGoal />}
    </div>
  )
}
