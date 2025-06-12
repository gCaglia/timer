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

    it('should record start time', () => {
        let expected_start_time = Date.now();
        timer.start(0, 0, 5);
        expect(timer.start_time).toBe(expected_start_time)
    });

    it('should calculate the end time', () => {
        timer.start(0, 0, 5)
        expect(timer.start_time).not.toBeNull();

        if (timer.start_time) {
            let expected_end_time = new Date(timer.start_time.getTime());
            expected_end_time.setSeconds(expected_end_time.getSeconds() + 5);
            expect(timer.end_time).toBe(expected_end_time);

        }
    });

    it('should run for duration', () => {
        timer.start(0, 0, 5);
        expect(timer.remaining).toEqual([0, 0, 5]);

        vi.advanceTimersByTime(1000);
        expect(timer.remaining).toEqual([0, 0, 4]);
        
        vi.advanceTimersByTime(1000);
        expect(timer.remaining).toEqual([0, 0, 0]);
    });

    it('should stop and resume pause', () => {
        timer.start(0, 0, 5);
        vi.advanceTimersByTime(1000);
        expect(timer.remaining).toEqual([0, 0, 4]);
        expect(timer.is_running).toBe(true);
        timer.pause();
        expect(timer.is_running).toBe(false);
        vi.advanceTimersByTime(10000);
        expect(timer.remaining).toEqual([0, 0, 4]);
        timer.pause();
        expect(timer.is_running).toBe(true);
        vi.advanceTimersByTime(4000);
        expect(timer.remaining).toEqual([0, 0, 0]);
    });

    it('should mark finish after duration', () => {
        timer.start(0, 0, 5);
        expect(timer.has_finished).toBe(false);
        vi.advanceTimersByTime(5000);
        expect(timer.remaining).toEqual([0, 0, 0])
        expect(timer.has_finished).toBe(true);
    })

    it('should throw if pause is called first', () => {
        const badStart = () => {
            timer.pause();
        };

        expect(badStart).toThrow("Start before pausing!")
    })
})

