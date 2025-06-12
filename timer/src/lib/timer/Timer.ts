export class Timer {
    start_time: Date | null = null;
    end_time: Date | null = null;
    remaining: [number, number, number] = [0, 0, 0];
    is_running: Boolean = false;
    has_finished: Boolean = false;

    start(hours: number, minutes: number, seconds: number): void {}
    pause(): void {} // Should break if called first
}