import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { Timer } from "../timer/Timer";
import { vi } from 'vitest';

describe('Timer', () => {
    let timer: Timer;

    beforeEach(
        () => {
            vi.useFakeTimers();
            timer = new Timer()
        }
    );

    afterAll(
        () => {
            vi.useRealTimers();
        }
    );

    it('should run for duration', async () => {
        const promise = timer.start(0, 0, 5);
        expect(timer.remainingMs).toBe(5000);

        vi.advanceTimersByTime(1000);
        expect(timer.remainingMs).toBe(4000);
        
        vi.advanceTimersByTime(4000);
        expect(timer.remainingMs).toBe(0);
        await promise
    });

    it('should stop and resume pause', async () => {
        const promise = timer.start(0, 0, 5);
        vi.advanceTimersByTime(1000);
        expect(timer.remainingMs).toBe(4000);
        expect(timer.is_running).toBe(true);
        timer.pause();
        expect(timer.is_running).toBe(false);
        vi.advanceTimersByTime(10000);
        expect(timer.remainingMs).toBe(4000);
        timer.pause();
        expect(timer.is_running).toBe(true);
        vi.advanceTimersByTime(4000);
        expect(timer.remainingMs).toBe(0);
        await promise;
    });

    it('should mark finish after duration', async() => {
        const promise = timer.start(0, 0, 5);
        expect(timer.has_finished).toBe(false);
        vi.advanceTimersByTime(5000);
        expect(timer.remainingMs).toBe(0)
        expect(timer.has_finished).toBe(true);
        await promise;
    })

    it('should throw if pause is called first', () => {
        const badStart = () => {
            timer.pause();
        };

        expect(badStart).toThrow("Timer was not started!")
    })

    it('should parse timestamps', async () => {
        let promise = timer.start(0, 0, 5);
        expect(timer.getRemaining()).toEqual([0, 0, 5])
        vi.advanceTimersByTime(5000);
        await promise;
        promise = timer.start(1, 2, 5);
        expect(timer.getRemaining()).toEqual([1, 2, 5]);
        vi.advanceTimersByTime((1*3600+2*60+5)*1000)
        await promise;
    })
})

