import { Button } from "@/components/ui/button";

interface QuickSettingsProps {
  currentMinutes: number;
  onSetTimer: (minutes: number) => void;
}

export default function QuickSettings({ currentMinutes, onSetTimer }: QuickSettingsProps) {
  const presets = [5, 10, 31, 45, 60];

  return (
    <div className="flex justify-center space-x-4 mb-8">
      {presets.map((minutes) => (
        <Button
          key={minutes}
          onClick={() => onSetTimer(minutes)}
          variant="ghost"
          className="px-4 py-2 rounded-full text-sm transition-all duration-200"
          style={{
            background: currentMinutes === minutes 
              ? 'hsla(174, 100%, 70%, 0.2)' 
              : 'hsla(255, 255, 255, 0.05)',
            color: currentMinutes === minutes 
              ? 'var(--ethereal-cyan)' 
              : 'var(--soft-gray)'
          }}
        >
          {minutes}m
        </Button>
      ))}
    </div>
  );
}
