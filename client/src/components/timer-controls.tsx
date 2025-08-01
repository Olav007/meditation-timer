
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Square } from "lucide-react";
import SettingsPanel from "./settings-panel";

interface TimerControlsProps {
  isRunning: boolean;
  isPaused: boolean;
  onToggle: () => void;
  onReset: () => void;
  onStop: () => void;
  onTestSound: () => void;
  onCheckUpdate?: () => void;
  showMeditationControls: boolean;
}

export default function TimerControls({ 
  isRunning, 
  isPaused, 
  onToggle, 
  onReset, 
  onStop, 
  onTestSound,
  onCheckUpdate,
  showMeditationControls 
}: TimerControlsProps) {
  if (showMeditationControls) {
    return (
      <div className="flex justify-center items-center space-x-6 mb-12">
        {/* Pause/Resume Button */}
        <Button
          onClick={onToggle}
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl hover:scale-110 active:scale-95 transition-all duration-150 shadow-lg touch-manipulation select-none"
          style={{ 
            background: 'var(--ethereal-cyan)',
            color: 'var(--cosmic-deep)'
          }}
          onMouseDown={(e) => e.preventDefault()}
          onTouchStart={(e) => e.preventDefault()}
        >
          {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </Button>
        
        {/* Stop Button */}
        <Button
          onClick={onStop}
          variant="ghost"
          className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-150 touch-manipulation select-none"
          style={{ 
            background: 'hsla(0, 70%, 50%, 0.2)',
            color: 'hsla(0, 70%, 60%, 1)',
            border: '1px solid hsla(0, 70%, 50%, 0.3)'
          }}
          onMouseDown={(e) => e.preventDefault()}
          onTouchStart={(e) => e.preventDefault()}
        >
          <Square className="w-5 h-5" />
        </Button>
        
        {/* Restart Button */}
        <Button
          onClick={onReset}
          variant="ghost"
          className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-150 touch-manipulation select-none"
          style={{ 
            background: 'var(--muted-white)',
            color: 'var(--soft-gray)'
          }}
          onMouseDown={(e) => e.preventDefault()}
          onTouchStart={(e) => e.preventDefault()}
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center space-x-6 mb-12">
      {/* Start/Pause Button */}
      <Button
        onClick={onToggle}
        className="w-16 h-16 rounded-full flex items-center justify-center text-2xl hover:scale-110 active:scale-95 transition-all duration-150 shadow-lg touch-manipulation select-none"
        style={{ 
          background: 'var(--ethereal-cyan)',
          color: 'var(--cosmic-deep)'
        }}
        onMouseDown={(e) => e.preventDefault()}
        onTouchStart={(e) => e.preventDefault()}
      >
        {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
      </Button>
      
      

      {/* Settings Panel */}
      <SettingsPanel onTestSound={onTestSound} onCheckUpdate={onCheckUpdate} />
    </div>
  );
}
