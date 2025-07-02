import { Button } from "@/components/ui/button";
import { CheckCircle, Plus } from "lucide-react";

interface CompletionControlsProps {
  onEndSession: () => void;
  onExtendSession: (minutes: number) => void;
  totalElapsedMinutes: number;
  totalElapsedSeconds: number;
  overtimeSeconds: number;
}

export default function CompletionControls({ 
  onEndSession, 
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
          <CheckCircle className="w-12 h-12 animate-pulse-slow" style={{ color: 'var(--ethereal-cyan)' }} />
        </div>
        <h2 className="text-2xl font-light mb-2" style={{ color: 'var(--ethereal-cyan)' }}>
          Meditation Complete
        </h2>
        <p className="text-sm mb-4" style={{ color: 'var(--soft-gray)' }}>
          Well done! Your session has finished.
        </p>
        
        {/* Session Statistics */}
        <div className="space-y-2 text-sm" style={{ color: 'var(--soft-gray)' }}>
          <div className="flex justify-center items-center space-x-4">
            <span>Total time: {totalElapsedMinutes}:{totalElapsedSeconds.toString().padStart(2, '0')}</span>
            {overtimeSeconds > 0 && (
              <span className="text-orange-400">
                Overtime: {Math.floor(overtimeSeconds / 60)}:{(overtimeSeconds % 60).toString().padStart(2, '0')}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* End Session Button */}
      <div className="pb-4">
        <Button
          onClick={onEndSession}
          className="px-8 py-3 rounded-full transition-all duration-150 touch-manipulation select-none hover:scale-105 active:scale-95"
          style={{
            background: 'var(--muted-white)',
            color: 'var(--soft-gray)',
            border: '1px solid hsla(255, 255, 255, 0.1)'
          }}
          onMouseDown={(e) => e.preventDefault()}
          onTouchStart={(e) => e.preventDefault()}
        >
          End Session
        </Button>
      </div>

      {/* Extend Options */}
      <div className="space-y-4">
        <p className="text-sm" style={{ color: 'var(--soft-gray)' }}>
          Continue your practice?
        </p>
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
    </div>
  );
}