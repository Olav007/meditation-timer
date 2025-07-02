import { Button } from "@/components/ui/button";
import { CheckCircle, Plus, Square } from "lucide-react";

interface CompletionControlsProps {
  onStopSession: () => void;
  onExtendSession: (minutes: number) => void;
  totalElapsedMinutes: number;
  totalElapsedSeconds: number;
  overtimeSeconds: number;
}

export default function CompletionControls({ 
  onStopSession, 
  onExtendSession, 
  totalElapsedMinutes, 
  totalElapsedSeconds, 
  overtimeSeconds 
}: CompletionControlsProps) {
  const extendOptions = [5, 10, 15];

  return (
    <div className="text-center space-y-8">
      {/* Completion Message */}
      <div className="mb-8">
        <div className="flex justify-center items-center mb-4">
          <CheckCircle className="w-8 h-8 animate-pulse-slow" style={{ color: 'var(--ethereal-cyan)' }} />
        </div>
      </div>

      {/* Stop Session Button */}
      <div className="pb-4">
        <Button
          onClick={onStopSession}
          className="w-16 h-16 rounded-xl transition-all duration-150 touch-manipulation select-none hover:scale-105 active:scale-95 flex items-center justify-center"
          style={{
            background: 'hsla(0, 70%, 50%, 0.2)',
            color: 'hsla(0, 70%, 60%, 1)',
            border: '1px solid hsla(0, 70%, 50%, 0.3)'
          }}
          onMouseDown={(e) => e.preventDefault()}
          onTouchStart={(e) => e.preventDefault()}
        >
          <Square className="w-6 h-6" />
        </Button>
      </div>

      {/* Extend Options */}
      <div className="flex justify-center space-x-3">
        {extendOptions.map((minutes) => (
          <Button
            key={minutes}
            onClick={() => onExtendSession(minutes)}
            variant="ghost"
            className="px-4 py-2 rounded-full text-sm transition-all duration-150 touch-manipulation select-none hover:scale-105 active:scale-95"
            style={{
              background: 'hsla(174, 100%, 70%, 0.1)',
              color: 'var(--ethereal-cyan)',
              border: '1px solid hsla(174, 100%, 70%, 0.3)'
            }}
            onMouseDown={(e) => e.preventDefault()}
            onTouchStart={(e) => e.preventDefault()}
          >
            <Plus className="w-4 h-4 mr-1" />
            {minutes}m
          </Button>
        ))}
      </div>
    </div>
  );
}