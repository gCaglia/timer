export class Timer {
    remainingMs: number;
    is_running: boolean = false;
    has_finished: boolean = false;

    getRemaining(): [number, number, number] {
        let secondsTotal = Math.floor(this.remainingMs / 1000);
        let hours = Math.floor(secondsTotal / 3600);
        let minutes = Math.floor(secondsTotal%3600 / 60)
        let seconds = Math.floor(secondsTotal%3600%60)

        return [hours, minutes, seconds]
    }

    private async getMs(hours: number, minutes: number, seconds: number): Promise<number> {
        return (hours*3600 + minutes*60  + seconds) * 1000;
    }

    async set(hours: number, minutes: number, seconds: number): Promise<void> {
        this.remainingMs = await this.getMs(hours, minutes, seconds);
    }

    async start(hours: number, minutes: number, seconds: number): Promise<void> {
        this.remainingMs = await this.getMs(hours, minutes, seconds);

        this.is_running = true;
        this.has_finished = false;
        await new Promise<void>((resolve) => {
            const interval = setInterval(() => {
                if (this.is_running) {
                    this.remainingMs -= 100
                }
                if (this.remainingMs <= 0) {
                    clearInterval(interval);
                    this.has_finished = true;
                    this.is_running = false;
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