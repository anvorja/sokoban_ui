import { useSokoban } from '@/hooks/useSokoban'
import { SokobanCell } from './SokobanCell'
import type { CellType } from './SokobanCell'

function getCellType(
  pos: number,
  walls: Set<number>,
  goals: Set<number>,
  voidCells: Set<number>,
  player: number,
  boxes: Set<number>
): CellType {
  if (walls.has(pos)) return 'wall'
  if (voidCells.has(pos)) return 'void'
  const isGoal = goals.has(pos)
  const isPlayer = pos === player
  const isBox = boxes.has(pos)
  if (isPlayer && isGoal) return 'player-goal'
  if (isPlayer) return 'player'
  if (isBox && isGoal) return 'box-goal'
  if (isBox) return 'box'
  if (isGoal) return 'goal'
  return 'floor'
}

export function SokobanBoard() {
  const { levelData, voidCells, displayState, isComplete } = useSokoban()
  const { width, height, walls, goals } = levelData
  const { player, boxes } = displayState

  return (
    <div className="flex flex-col items-center">
      <div
        className={`sokoban-board inline-grid gap-[2px] rounded-lg p-[6px] ${isComplete ? 'sokoban-board-complete' : ''}`}
        style={{ gridTemplateColumns: `repeat(${width}, 1fr)` }}
      >
        {Array.from({ length: width * height }, (_, i) => {
          const type = getCellType(i, walls, goals, voidCells, player, boxes)
          return <SokobanCell key={i} type={type} />
        })}
      </div>

      {isComplete && (
        <div className="sokoban-win-banner mt-4 animate-bounce rounded-lg px-6 py-2 text-center font-heading text-lg font-bold">
          ¡Nivel completado!
        </div>
      )}
    </div>
  )
}
