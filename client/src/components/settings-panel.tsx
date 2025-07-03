import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings, Volume2, X, RefreshCw } from "lucide-react";

interface SettingsPanelProps {
  onTestSound: () => void;
  onCheckUpdate?: () => void;
}

export default function SettingsPanel({ onTestSound, onCheckUpdate }: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Settings Button */}
      <Button
        onClick={() => setIsOpen(true)}
        variant="ghost"
        size="sm"
        className="p-2 rounded-full transition-all duration-150 touch-manipulation select-none hover:scale-105 active:scale-95"
        style={{
          background: 'hsla(174, 100%, 70%, 0.1)',
          color: 'var(--ethereal-cyan)',
          border: '1px solid hsla(174, 100%, 70%, 0.3)'
        }}
        onMouseDown={(e) => e.preventDefault()}
        onTouchStart={(e) => e.preventDefault()}
      >
        <Settings className="w-4 h-4" />
      </Button>

      {/* Settings Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal Content */}
          <div 
            className="relative bg-slate-900/95 backdrop-blur-md rounded-2xl p-6 mx-4 max-w-sm w-full border"
            style={{ 
              borderColor: 'hsla(174, 100%, 70%, 0.3)',
              background: 'hsla(224, 71%, 4%, 0.95)'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium" style={{ color: 'var(--ethereal-cyan)' }}>
                Settings
              </h3>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="p-1 rounded-full"
                style={{ color: 'var(--soft-gray)' }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Settings Options */}
            <div className="space-y-4">
              {/* Sound Test */}
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: 'var(--soft-gray)' }}>
                  Audio
                </label>
                <Button
                  onClick={() => {
                    onTestSound();
                    setIsOpen(false);
                  }}
                  variant="outline"
                  className="w-full justify-start space-x-2"
                  style={{
                    background: 'hsla(174, 100%, 70%, 0.1)',
                    color: 'var(--ethereal-cyan)',
                    border: '1px solid hsla(174, 100%, 70%, 0.3)'
                  }}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Test Meditation Sounds</span>
                </Button>
                <p className="text-xs" style={{ color: 'var(--soft-gray)' }}>
                  5-second preview of gong sounds and completion experience
                </p>
              </div>

              {/* App Updates */}
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: 'var(--soft-gray)' }}>
                  App Updates
                </label>
                <Button
                  onClick={() => {
                    if (onCheckUpdate) {
                      onCheckUpdate();
                    }
                    setIsOpen(false);
                  }}
                  variant="outline"
                  className="w-full justify-start space-x-2"
                  style={{
                    background: 'hsla(120, 100%, 70%, 0.1)',
                    color: 'var(--ethereal-cyan)',
                    border: '1px solid hsla(120, 100%, 70%, 0.3)'
                  }}
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Check for Updates</span>
                </Button>
                <p className="text-xs" style={{ color: 'var(--soft-gray)' }}>
                  Manually check for the latest app updates
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}