import { Button } from "@/components/ui/button";

interface QuickSettingsProps {
  currentMinutes: number;
  onSetTimer: (minutes: number) => void;
}

export default function QuickSettings({ currentMinutes, onSetTimer }: QuickSettingsProps) {
  const presets = [5, 10, 30, 45, 60]; // All sessions have automatic 20s preparation

  return (
    <div className="flex justify-center space-x-4 mb-8">
      {presets.map((minutes) => (
        <Button
          key={minutes}
          onClick={() => onSetTimer(minutes)}
          variant="ghost"
          className="px-4 py-2 rounded-full text-sm transition-all duration-150 touch-manipulation select-none hover:scale-105 active:scale-95"
          style={{
            background: currentMinutes === minutes 
              ? 'hsla(174, 100%, 70%, 0.2)' 
              : 'hsla(255, 255, 255, 0.05)',
            color: currentMinutes === minutes 
              ? 'var(--ethereal-cyan)' 
              : 'var(--soft-gray)'
          }}
          onMouseDown={(e) => e.preventDefault()}
          onTouchStart={(e) => e.preventDefault()}
        >
          {minutes}m
        </Button>
      ))}
    </div>
  );
}
