import { useEffect } from "react";
import TimerDisplay from "@/components/timer-display";
import TimerControls from "@/components/timer-controls";
import QuickSettings from "@/components/quick-settings";
import CompletionControls from "@/components/completion-controls";
import { useTimer } from "@/hooks/use-timer";
import { usePWA } from "@/hooks/use-pwa";

export default function MeditationTimer() {
  const timer = useTimer(31); // 31 minutes default
  const { installPrompt, installApp, hideInstallPrompt } = usePWA();

  // Register service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registered'))
        .catch((error) => console.log('Service Worker registration failed:', error));
    }
  }, []);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Generate floating stars
  const stars = Array.from({ length: 8 }, (_, i) => (
    <div
      key={i}
      className="star animate-twinkle"
      style={{
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
        width: `${Math.random() * 2 + 1}px`,
        height: `${Math.random() * 2 + 1}px`,
        animationDelay: `${Math.random() * 4}s`,
      }}
    />
  ));

  return (
    <div className="spiritual-bg min-h-screen flex flex-col items-center justify-center text-white relative font-['Inter']">
      {/* Full-screen red pulsing overlay */}
      {timer.isPulsing && (
        <div 
          className="fixed inset-0 z-20 pointer-events-none animate-pulse"
          style={{ 
            background: 'radial-gradient(circle at center, hsla(0, 100%, 60%, 0.15) 0%, hsla(0, 100%, 60%, 0.08) 40%, transparent 70%)',
            animation: 'pulse 2s ease-in-out'
          }}
        />
      )}
      
      {/* Floating stars */}
      {stars}
      
      {/* Main Container */}
      <div className="container mx-auto px-4 py-8 max-w-2xl relative z-10">
        
        {/* Header */}
        <header className="text-center mb-12 animate-float">
          <h1 className="text-3xl md:text-4xl font-light mb-2" style={{ color: 'var(--ethereal-cyan)' }}>
            {timer.isCompleted ? 'Session Complete' : timer.hasStarted ? 'Meditating' : 'Meditation Timer'}
          </h1>
        </header>
        
        {/* Timer Display */}
        <TimerDisplay 
          hours={timer.hours}
          minutes={timer.minutes}
          seconds={timer.seconds}
          state={timer.state}
          progress={timer.progress}
          isPulsing={timer.isPulsing}
        />
        
        {/* Completion Controls - shown when meditation is finished */}
        {timer.isCompleted ? (
          <CompletionControls
            onEndSession={timer.endSession}
            onExtendSession={timer.extendSession}
          />
        ) : (
          <>
            {/* Timer Controls */}
            <TimerControls
              isRunning={timer.isRunning}
              isPaused={timer.isPaused}
              onToggle={timer.toggle}
              onReset={timer.reset}
              onStop={timer.stop}
              onTestSound={timer.testSound}
              showMeditationControls={timer.hasStarted}
            />
            
            {/* Quick Settings - hidden during meditation */}
            {!timer.hasStarted && (
              <QuickSettings
                currentMinutes={timer.totalMinutes}
                onSetTimer={timer.setTimer}
              />
            )}
          </>
        )}
        
        {/* PWA Install Prompt */}
        {installPrompt && (
          <div className="fixed bottom-6 left-6 right-6 rounded-xl p-4 flex items-center justify-between z-50"
               style={{ 
                 background: 'hsla(252, 44%, 25%, 0.9)',
                 backdropFilter: 'blur(16px)',
                 border: '1px solid hsla(174, 100%, 70%, 0.2)'
               }}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                   style={{ background: 'hsla(174, 100%, 70%, 0.2)' }}>
                <svg className="w-5 h-5" style={{ color: 'var(--ethereal-cyan)' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">Install Meditation Timer</p>
                <p className="text-sm" style={{ color: 'var(--soft-gray)' }}>
                  Add to home screen for quick access
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={hideInstallPrompt}
                className="px-3 py-1 text-sm rounded transition-colors"
                style={{ color: 'var(--soft-gray)' }}
              >
                Maybe later
              </button>
              <button 
                onClick={installApp}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{ 
                  background: 'var(--ethereal-cyan)',
                  color: 'var(--cosmic-deep)'
                }}
              >
                Install
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
