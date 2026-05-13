import { useSokoban } from '@/hooks/useSokoban'
import { Slider } from '@/components/ui/slider'

const SPEED_LABELS: Record<number, string> = {
  600: 'Lenta',
  300: 'Normal',
  150: 'Rápida',
  60: 'Turbo',
}

export function SpeedControl() {
  const { animationSpeed, setSpeed } = useSokoban()

  const speeds = [600, 300, 150, 60]
  const sliderValue = speeds.indexOf(animationSpeed)
  const currentLabel = SPEED_LABELS[animationSpeed] ?? 'Personalizada'

  const handleChange = (value: number[]) => {
    const idx = Math.round(value[0])
    setSpeed(speeds[Math.min(idx, speeds.length - 1)])
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="sokoban-label">Velocidad</p>
        <span className="text-xs font-semibold text-sky-400">{currentLabel}</span>
      </div>
      <Slider
        min={0}
        max={3}
        step={1}
        value={[sliderValue >= 0 ? sliderValue : 1]}
        onValueChange={handleChange}
        className="sokoban-slider"
      />
      <div className="flex justify-between text-[10px] text-slate-500">
        <span>Lenta</span>
        <span>Turbo</span>
      </div>
    </div>
  )
}
