
export class WakeLock {
  private wakeLock: WakeLockSentinel | null = null;
  private isSupported: boolean;

  constructor() {
    this.isSupported = 'wakeLock' in navigator;
  }

  async request(): Promise<boolean> {
    if (!this.isSupported) {
      console.warn('Wake Lock API not supported');
      return false;
    }

    try {
      this.wakeLock = await navigator.wakeLock.request('screen');
      console.log('Wake lock acquired');
      
      this.wakeLock.addEventListener('release', () => {
        console.log('Wake lock released');
      });
      
      return true;
    } catch (err) {
      console.error('Failed to acquire wake lock:', err);
      return false;
    }
  }

  async release(): Promise<void> {
    if (this.wakeLock) {
      await this.wakeLock.release();
      this.wakeLock = null;
    }
  }

  get isActive(): boolean {
    return this.wakeLock !== null && !this.wakeLock.released;
  }

  get supported(): boolean {
    return this.isSupported;
  }
}

export const wakeLock = new WakeLock();
