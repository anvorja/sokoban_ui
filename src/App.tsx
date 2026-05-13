import { SokobanProvider } from '@/providers/SokobanProvider'
import { GameLayout } from '@/components/layout/GameLayout'

export default function App() {
  return (
    <SokobanProvider>
      <GameLayout />
    </SokobanProvider>
  )
}
