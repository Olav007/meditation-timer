
import { useState, useEffect, useRef, useCallback } from 'react';
import { wakeLock } from '@/lib/wake-lock';

export function useTimer(initialMinutes: number = 31) {
  const [totalTime, setTotalTime] = useState(initialMinutes * 60);
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [overtimeSeconds, setOvertimeSeconds] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate display time (handle negative time for overtime)
  const displayTime = isCompleted && overtimeSeconds > 0 ? -overtimeSeconds : timeLeft;
  const isNegativeTime = isCompleted && overtimeSeconds > 0;
  
  const absTime = Math.abs(displayTime);
  const hours = Math.floor(absTime / 3600);
  const minutes = Math.floor((absTime % 3600) / 60);
  const seconds = absTime % 60;
  const progress = totalTime > 0 ? (totalTime - timeLeft) / totalTime : 0;

  // Calculate total elapsed time since session start
  const totalElapsedTime = sessionStartTime ? Math.floor((Date.now() - sessionStartTime) / 1000) : 0;
  const totalElapsedMinutes = Math.floor(totalElapsedTime / 60);
  const totalElapsedSecondsDisplay = totalElapsedTime % 60;

  const playGongSound = useCallback((intensity: number = 0.3) => {
    // Trigger visual pulsing effect
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 2000);
    
    // Create a realistic gong sound with varying intensity
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create multiple oscillators for rich harmonic content
    const fundamentalOsc = audioContext.createOscillator();
    const harmonic2 = audioContext.createOscillator();
    const harmonic3 = audioContext.createOscillator();
    
    const fundamentalGain = audioContext.createGain();
    const harmonic2Gain = audioContext.createGain();
    const harmonic3Gain = audioContext.createGain();
    const masterGain = audioContext.createGain();
    
    // Connect oscillators to their gain nodes
    fundamentalOsc.connect(fundamentalGain);
    harmonic2.connect(harmonic2Gain);
    harmonic3.connect(harmonic3Gain);
    
    // Connect all to master gain
    fundamentalGain.connect(masterGain);
    harmonic2Gain.connect(masterGain);
    harmonic3Gain.connect(masterGain);
    masterGain.connect(audioContext.destination);
    
    // Set frequencies for gong-like sound
    const baseFreq = 200; // Lower base frequency for gong
    fundamentalOsc.frequency.setValueAtTime(baseFreq, audioContext.currentTime);
    harmonic2.frequency.setValueAtTime(baseFreq * 1.5, audioContext.currentTime);
    harmonic3.frequency.setValueAtTime(baseFreq * 2.3, audioContext.currentTime);
    
    // Frequency wobble for metallic effect
    fundamentalOsc.frequency.exponentialRampToValueAtTime(baseFreq * 0.95, audioContext.currentTime + 3);
    
    // Set gains with varying intensity
    const baseIntensity = Math.min(intensity, 0.8);
    fundamentalGain.gain.setValueAtTime(baseIntensity, audioContext.currentTime);
    harmonic2Gain.gain.setValueAtTime(baseIntensity * 0.3, audioContext.currentTime);
    harmonic3Gain.gain.setValueAtTime(baseIntensity * 0.1, audioContext.currentTime);
    
    // Master gain envelope - starts weak, builds up quickly, then long decay
    masterGain.gain.setValueAtTime(0.01, audioContext.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(baseIntensity, audioContext.currentTime + 0.1);
    masterGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 4);
    
    // Start all oscillators
    const startTime = audioContext.currentTime;
    fundamentalOsc.start(startTime);
    harmonic2.start(startTime);
    harmonic3.start(startTime);
    
    // Stop all oscillators
    fundamentalOsc.stop(startTime + 4);
    harmonic2.stop(startTime + 4);
    harmonic3.stop(startTime + 4);
  }, []);

  const playCompletionSound = useCallback(() => {
    // Triple gong for completion with increasing intensity
    playGongSound(0.4);
    setTimeout(() => playGongSound(0.6), 800);
    setTimeout(() => playGongSound(0.8), 1600);
  }, [playGongSound]);

  const triggerVibration = useCallback(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]); // Short-pause-short vibration pattern
    }
  }, []);

  const testSound = useCallback(() => {
    // Start a 10-second preview session to test the end of meditation
    const originalTotalTime = totalTime;
    const originalTimeLeft = timeLeft;
    const originalHasStarted = hasStarted;
    const originalIsRunning = isRunning;
    const originalIsPaused = isPaused;
    
    // Set up 5-second test session
    setTotalTime(5);
    setTimeLeft(5);
    setIsRunning(true);
    setHasStarted(true);
    setIsPaused(false);
    setIsCompleted(false);
    setOvertimeSeconds(0);
    setSessionStartTime(Date.now());
    wakeLock.request();
  }, [playGongSound]);

  const toggle = useCallback(() => {
    if (isRunning) {
      setIsRunning(false);
      setIsPaused(true);
      wakeLock.release();
    } else {
      setIsRunning(true);
      setIsPaused(false);
      setHasStarted(true);
      if (!sessionStartTime) {
        setSessionStartTime(Date.now());
      }
      wakeLock.request();
    }
  }, [isRunning, sessionStartTime]);

  const reset = useCallback(() => {
    setIsRunning(true);
    setIsPaused(false);
    setHasStarted(true);
    setTimeLeft(totalTime);
    wakeLock.request();
  }, [totalTime]);

  const stop = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setHasStarted(false);
    setIsCompleted(false);
    setOvertimeSeconds(0);
    setSessionStartTime(null);
    setTimeLeft(totalTime);
    wakeLock.release();
  }, [totalTime]);

  const endSession = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setHasStarted(false);
    setIsCompleted(false);
    setOvertimeSeconds(0);
    setSessionStartTime(null);
    setTimeLeft(totalTime);
    wakeLock.release();
  }, [totalTime]);

  const extendSession = useCallback((additionalMinutes: number) => {
    const additionalSeconds = additionalMinutes * 60;
    
    if (isCompleted && overtimeSeconds > 0) {
      // Subtract overtime from extension
      const remainingExtension = additionalSeconds - overtimeSeconds;
      if (remainingExtension > 0) {
        setTimeLeft(remainingExtension);
        setTotalTime(prev => prev + additionalSeconds);
      } else {
        setTimeLeft(0);
        setOvertimeSeconds(overtimeSeconds - additionalSeconds);
        return; // Don't restart if still in overtime
      }
      setOvertimeSeconds(0);
    } else {
      setTimeLeft(prev => prev + additionalSeconds);
      setTotalTime(prev => prev + additionalSeconds);
    }
    
    setIsCompleted(false);
    setIsRunning(true);
    setHasStarted(true);
    wakeLock.request();
  }, [isCompleted, overtimeSeconds]);

  const setTimer = useCallback((minutes: number) => {
    const newTotalTime = minutes * 60;
    setTotalTime(newTotalTime);
    setTimeLeft(newTotalTime);
    setIsRunning(false);
    setIsPaused(false);
    setHasStarted(false);
    setIsCompleted(false);
    wakeLock.release();
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const newTimeLeft = prev - 1;
          
          // Play gong every 15 seconds with increasing intensity
          if (newTimeLeft > 0 && newTimeLeft % 15 === 0) {
            const elapsedTime = totalTime - newTimeLeft;
            const gongNumber = Math.floor(elapsedTime / 15);
            const intensity = Math.min(0.2 + (gongNumber * 0.1), 0.6);
            playGongSound(intensity);
          }
          
          // Vibrate after 30 seconds have passed (every 30 seconds)
          const elapsedTime = totalTime - newTimeLeft;
          if (newTimeLeft > 0 && elapsedTime >= 30 && elapsedTime % 30 === 0) {
            triggerVibration();
          }
          
          if (newTimeLeft <= 0 && !isCompleted) {
            setIsCompleted(true);
            playCompletionSound();
            triggerVibration();
            
            // Show notification
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Meditation Complete', {
                body: 'Your meditation session has finished.',
                icon: '/favicon.ico'
              });
            }
            
            setOvertimeSeconds(1); // Start counting overtime
            // Don't stop the timer - continue running to count overtime
            return 0;
          } else if (newTimeLeft <= 0 && isCompleted) {
            // Continue running in overtime mode
            setOvertimeSeconds(prev => prev + 1);
            return 0;
          }
          return newTimeLeft;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, timeLeft, totalTime, playCompletionSound, playGongSound, triggerVibration]);

  // Handle page visibility change to maintain wake lock
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && isRunning) {
        await wakeLock.request();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isRunning]);

  const state = isRunning 
    ? 'Meditating...' 
    : isPaused 
      ? 'Paused' 
      : hasStarted 
        ? 'Stopped' 
        : '';

  return {
    hours,
    minutes,
    seconds,
    totalMinutes: Math.floor(totalTime / 60),
    progress,
    isRunning,
    isPaused,
    hasStarted,
    isCompleted,
    isPulsing,
    isNegativeTime,
    overtimeSeconds,
    totalElapsedTime,
    totalElapsedMinutes,
    totalElapsedSecondsDisplay,
    state,
    toggle,
    reset,
    stop,
    setTimer,
    testSound,
    endSession,
    extendSession
  };
}
