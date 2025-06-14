export class Timer {
    remainingMs: number;
    is_running: Boolean = false;
    has_finished: Boolean = false;

    getRemaining(): [number, number, number] {
        let secondsTotal = Math.floor(this.remainingMs / 1000);
        let hours = Math.floor(secondsTotal / 3600);
        let minutes = Math.floor(secondsTotal%3600 / 60)
        let seconds = Math.floor(secondsTotal%3600%60)

        return [hours, minutes, seconds]
    }

    async start(hours: number, minutes: number, seconds: number): Promise<void> {
        this.remainingMs = (hours*3600 + minutes*60  + seconds) * 1000;

        this.is_running = true;
        await new Promise<void>((resolve) => {
            const interval = setInterval(() => {
                if (this.is_running) {
                    this.remainingMs -= 100
                }
                if (this.remainingMs <= 0) {
                    clearInterval(interval);
                    this.has_finished = true;
                    resolve();
                }
            }, 100);
        })

    }
    pause(): void {
        if (this.remainingMs == null) {
            throw new Error("Timer was not started!")
        }
        if (this.is_running) {
            this.is_running = false
            return
        }
        this.is_running = true
    } // Should break if called first
}