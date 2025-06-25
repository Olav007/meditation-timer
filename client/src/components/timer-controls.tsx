
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Square, Volume2 } from "lucide-react";

interface TimerControlsProps {
  isRunning: boolean;
  isPaused: boolean;
  onToggle: () => void;
  onReset: () => void;
  onStop: () => void;
  onTestSound: () => void;
  showMeditationControls: boolean;
}

export default function TimerControls({ 
  isRunning, 
  isPaused, 
  onToggle, 
  onReset, 
  onStop, 
  onTestSound,
  showMeditationControls 
}: TimerControlsProps) {
  if (showMeditationControls) {
    return (
      <div className="flex justify-center items-center space-x-6 mb-12">
        {/* Pause/Resume Button */}
        <Button
          onClick={onToggle}
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg"
          style={{ 
            background: 'var(--ethereal-cyan)',
            color: 'var(--cosmic-deep)'
          }}
        >
          {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </Button>
        
        {/* Stop Button */}
        <Button
          onClick={onStop}
          variant="ghost"
          className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200"
          style={{ 
            background: 'var(--muted-white)',
            color: 'var(--soft-gray)'
          }}
        >
          <Square className="w-5 h-5" />
        </Button>
        
        {/* Restart Button */}
        <Button
          onClick={onReset}
          variant="ghost"
          className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200"
          style={{ 
            background: 'var(--muted-white)',
            color: 'var(--soft-gray)'
          }}
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
        className="w-16 h-16 rounded-full flex items-center justify-center text-2xl hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg"
        style={{ 
          background: 'var(--ethereal-cyan)',
          color: 'var(--cosmic-deep)'
        }}
      >
        {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
      </Button>
      
      

      {/* Test Sound Button */}
      <Button
        onClick={onTestSound}
        variant="ghost"
        className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200"
        style={{ 
          background: 'var(--muted-white)',
          color: 'var(--soft-gray)'
        }}
      >
        <Volume2 className="w-5 h-5" />
      </Button>
    </div>
  );
}
