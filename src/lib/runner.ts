import { searchAStar } from './sokoban/algorithms/a-star'
import { searchBreadthFirst } from './sokoban/algorithms/breadth-first'
import { searchDepthFirst } from './sokoban/algorithms/depth-first'
import { searchGreedyBestFirst } from './sokoban/algorithms/greedy-best-first'
import { searchIterativeDeepening } from './sokoban/algorithms/iterative-deepening'
import { DIRECTIONS } from './sokoban/constants'
import { parseLevel } from './sokoban/level-parser'
import { SokobanSolver } from './sokoban/solver-core'
import type { MoveLabel, ParsedLevel, SearchResult } from './sokoban/types'
import type { LevelData } from './levels'

export type AlgorithmKey = 'dfs' | 'bfs' | 'ids' | 'greedy' | 'astar'

export const ALGORITHM_INFO: Record<AlgorithmKey, { label: string; description: string; color: string }> = {
  dfs: { label: 'DFS', description: 'Búsqueda en Profundidad', color: '#f59e0b' },
  bfs: { label: 'BFS', description: 'Búsqueda en Anchura', color: '#3b82f6' },
  ids: { label: 'IDS', description: 'Profundización Iterativa', color: '#8b5cf6' },
  greedy: { label: 'Greedy', description: 'Primero el Mejor', color: '#ec4899' },
  astar: { label: 'A*', description: 'A Estrella (óptimo)', color: '#22c55e' },
}

export interface GameState {
  player: number
  boxes: Set<number>
}

export interface SolveRunResult {
  searchResult: SearchResult
  timeMs: number
  states: GameState[]
}

export function parseLevelData(levelData: LevelData): ParsedLevel {
  return parseLevel(levelData.content.split('\n'))
}

export function computeVoidCells(levelData: ParsedLevel): Set<number> {
  const { width, height, walls } = levelData
  const visited = new Set<number>()
  const queue: number[] = []

  for (let x = 0; x < width; x++) {
    const top = x
    const bottom = (height - 1) * width + x
    if (!walls.has(top) && !visited.has(top)) { queue.push(top); visited.add(top) }
    if (!walls.has(bottom) && !visited.has(bottom)) { queue.push(bottom); visited.add(bottom) }
  }
  for (let y = 1; y < height - 1; y++) {
    const left = y * width
    const right = y * width + width - 1
    if (!walls.has(left) && !visited.has(left)) { queue.push(left); visited.add(left) }
    if (!walls.has(right) && !visited.has(right)) { queue.push(right); visited.add(right) }
  }

  let i = 0
  while (i < queue.length) {
    const pos = queue[i++]
    const x = pos % width
    const y = Math.floor(pos / width)
    const neighbors = [
      x > 0 ? pos - 1 : -1,
      x < width - 1 ? pos + 1 : -1,
      y > 0 ? pos - width : -1,
      y < height - 1 ? pos + width : -1,
    ]
    for (const n of neighbors) {
      if (n >= 0 && !walls.has(n) && !visited.has(n)) {
        visited.add(n)
        queue.push(n)
      }
    }
  }

  return visited
}

function simulatePath(levelData: ParsedLevel, path: MoveLabel[]): GameState[] {
  const states: GameState[] = []
  let player = levelData.player
  let boxes = new Set(levelData.boxes)

  states.push({ player, boxes: new Set(boxes) })

  for (const move of path) {
    const dir = DIRECTIONS.find((d) => d.label === move)
    if (!dir) continue

    const x = player % levelData.width
    const y = Math.floor(player / levelData.width)
    const nx = x + dir.dx
    const ny = y + dir.dy

    if (nx < 0 || ny < 0 || nx >= levelData.width || ny >= levelData.height) continue
    const next = ny * levelData.width + nx

    if (levelData.walls.has(next)) continue

    if (boxes.has(next)) {
      const bx = nx + dir.dx
      const by = ny + dir.dy
      if (bx < 0 || by < 0 || bx >= levelData.width || by >= levelData.height) continue
      const beyond = by * levelData.width + bx
      if (levelData.walls.has(beyond) || boxes.has(beyond)) continue
      boxes = new Set(boxes)
      boxes.delete(next)
      boxes.add(beyond)
    }

    player = next
    states.push({ player, boxes: new Set(boxes) })
  }

  return states
}

const ALGORITHM_FNS: Record<AlgorithmKey, (solver: SokobanSolver) => SearchResult> = {
  dfs: searchDepthFirst,
  bfs: searchBreadthFirst,
  ids: searchIterativeDeepening,
  greedy: searchGreedyBestFirst,
  astar: searchAStar,
}

export function runSolver(levelData: ParsedLevel, algorithm: AlgorithmKey): SolveRunResult {
  const solver = new SokobanSolver(levelData)
  const start = performance.now()
  const searchResult = ALGORITHM_FNS[algorithm](solver)
  const timeMs = performance.now() - start
  const states = searchResult.path ? simulatePath(levelData, searchResult.path) : []
  return { searchResult, timeMs, states }
}
