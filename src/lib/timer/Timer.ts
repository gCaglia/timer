export class Timer {
    isRunning: boolean = false;
    hasFinished: boolean = false;
    endTime: number;

    getRemaining(): [number, number, number] {
        if (!this.endTime) {
            return [0, 0, 0]
        }
        const remainingMs = this.endTime - Date.now();
        let secondsTotal = Math.floor(remainingMs / 1000);
        let hours = Math.floor(secondsTotal / 3600);
        let minutes = Math.floor(secondsTotal%3600 / 60)
        let seconds = Math.floor(secondsTotal%3600%60)

        return [Math.max(hours, 0), Math.max(minutes, 0), Math.max(seconds, 0)]
    }

    private async getMs(hours: number, minutes: number, seconds: number): Promise<number> {
        return (hours*3600 + minutes*60  + seconds) * 1000;
    }

    async set(hours: number, minutes: number, seconds: number): Promise<void> {
        this.endTime = Date.now() + await this.getMs(hours, minutes, seconds);
    }

    async start(hours: number, minutes: number, seconds: number): Promise<void> {
        this.endTime = Date.now() + await this.getMs(hours, minutes, seconds)
        
        this.isRunning = true;
        this.hasFinished = false;
        let currentTime = Date.now();
        while (this.isRunning && (currentTime < this.endTime)) {
            currentTime = Date.now();
            await new Promise(resolve => setTimeout(resolve, 100))
        }
        this.isRunning = false;
        if (currentTime >= this.endTime) {
            this.hasFinished = true;
        }
    }

    pause(): void {
        if (!this.endTime) {
            throw Error("Timer was not started!");
        }
        this.isRunning = false;
    }
}