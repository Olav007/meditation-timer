// TypeScript version of the meditation timer
interface TimerState {
  timeLeft: number;
  totalTime: number;
  isRunning: boolean;
  interval: NodeJS.Timeout | null;
}

class MeditationTimer {
  private state: TimerState;
  private elements: {
    hours: HTMLElement;
    minutes: HTMLElement;
    seconds: HTMLElement;
    state: HTMLElement;
    toggleBtn: HTMLButtonElement;
    resetBtn: HTMLButtonElement;
    presetBtns: NodeListOf<HTMLButtonElement>;
  };

  constructor(initialMinutes: number = 31) {
    this.state = {
      timeLeft: initialMinutes * 60,
      totalTime: initialMinutes * 60,
      isRunning: false,
      interval: null
    };

    this.elements = {
      hours: document.getElementById('hours') as HTMLElement,
      minutes: document.getElementById('minutes') as HTMLElement,
      seconds: document.getElementById('seconds') as HTMLElement,
      state: document.getElementById('timer-state') as HTMLElement,
      toggleBtn: document.getElementById('toggle-btn') as HTMLButtonElement,
      resetBtn: document.getElementById('reset-btn') as HTMLButtonElement,
      presetBtns: document.querySelectorAll('.preset-btn') as NodeListOf<HTMLButtonElement>
    };

    this.setupEventListeners();
    this.updateDisplay();
  }

  private updateDisplay(): void {
    const hours = Math.floor(this.state.timeLeft / 3600);
    const minutes = Math.floor((this.state.timeLeft % 3600) / 60);
    const seconds = this.state.timeLeft % 60;

    this.elements.hours.textContent = hours.toString();
    this.elements.minutes.textContent = minutes.toString();
    this.elements.seconds.textContent = seconds.toString().padStart(2, '0');
  }

  private startTimer(): void {
    if (this.state.interval) return;
    
    this.state.isRunning = true;
    this.elements.toggleBtn.textContent = 'Pause';
    this.elements.state.textContent = 'Meditating...';

    this.state.interval = setInterval(() => {
      this.state.timeLeft--;
      this.updateDisplay();

      if (this.state.timeLeft <= 0) {
        this.stopTimer();
        this.elements.state.textContent = 'Meditation Complete!';
        this.playCompletionSound();
      }
    }, 1000);
  }

  private pauseTimer(): void {
    if (!this.state.interval) return;
    
    clearInterval(this.state.interval);
    this.state.interval = null;
    this.state.isRunning = false;
    this.elements.toggleBtn.textContent = 'Start';
    this.elements.state.textContent = 'Paused';
  }

  private stopTimer(): void {
    if (this.state.interval) {
      clearInterval(this.state.interval);
      this.state.interval = null;
    }
    this.state.isRunning = false;
    this.elements.toggleBtn.textContent = 'Start';
  }

  private resetTimer(): void {
    this.stopTimer();
    this.state.timeLeft = this.state.totalTime;
    this.updateDisplay();
    this.elements.state.textContent = 'Ready to begin';
  }

  private setTimer(minutes: number): void {
    this.stopTimer();
    this.state.totalTime = minutes * 60;
    this.state.timeLeft = this.state.totalTime;
    this.updateDisplay();
    this.elements.state.textContent = 'Ready to begin';

    // Update preset button styles
    this.elements.presetBtns.forEach(btn => {
      btn.classList.remove('bg-cyan-600', 'hover:bg-cyan-500');
      btn.classList.add('bg-gray-700', 'hover:bg-gray-600');
    });

    const activeBtn = document.querySelector(`[data-minutes="${minutes}"]`) as HTMLButtonElement;
    if (activeBtn) {
      activeBtn.classList.remove('bg-gray-700', 'hover:bg-gray-600');
      activeBtn.classList.add('bg-cyan-600', 'hover:bg-cyan-500');
    }
  }

  private playCompletionSound(): void {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 528; // Meditation frequency
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1);
    } catch (e) {
      console.log('Audio not available');
    }
  }

  private setupEventListeners(): void {
    this.elements.toggleBtn.addEventListener('click', () => {
      if (this.state.isRunning) {
        this.pauseTimer();
      } else {
        this.startTimer();
      }
    });

    this.elements.resetBtn.addEventListener('click', () => {
      this.resetTimer();
    });

    this.elements.presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const minutes = parseInt(btn.dataset.minutes || '31');
        this.setTimer(minutes);
      });
    });
  }
}

// Initialize timer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MeditationTimer(31);
});

// PWA functionality
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log('Service Worker registered'))
    .catch((error: Error) => console.log('Service Worker registration failed:', error));
}