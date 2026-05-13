import { GameHeader } from './GameHeader'
import { SokobanBoard } from '@/components/game/SokobanBoard'
import { AlgorithmSelector } from '@/components/controls/AlgorithmSelector'
import { LevelSelector } from '@/components/controls/LevelSelector'
import { SolverControls } from '@/components/controls/SolverControls'
import { SpeedControl } from '@/components/controls/SpeedControl'
import { StatsPanel } from '@/components/stats/StatsPanel'

export function GameLayout() {
  return (
    <div className="sokoban-root h-screen flex flex-col overflow-hidden">
      <GameHeader />

      <main className="flex-1 overflow-hidden mx-auto w-full max-w-5xl px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start h-full">
          {/* Board column */}
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-full">
              <SokobanBoard />
            </div>
          </div>

          {/* Controls column */}
          <div className="w-full lg:w-72 xl:w-80 h-full overflow-y-auto sokoban-scrollbar">
            <div className="sokoban-panel rounded-xl border p-3 space-y-3">
              <LevelSelector />
              <div className="sokoban-divider h-px" />
              <AlgorithmSelector />
              <div className="sokoban-divider h-px" />
              <SolverControls />
              <div className="sokoban-divider h-px" />
              <SpeedControl />
              <div className="sokoban-divider h-px" />
              <StatsPanel />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
