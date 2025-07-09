<script lang="ts">
    import { Timer } from "../timer/Timer"

    export let onDone;
    export let onStart;
    let timer: Timer
    let hoursString: string = "00";
    let minutesString: string = "00";
    let secondsString: string = "00";
    let hours: number = 0;
    let minutes: number = 0;
    let seconds: number = 0;
    let pause_resume_label: string;

    let is_running: boolean;
    let has_finished: boolean;

    $: pause_resume_label = is_running ? "Pause" : (has_finished===false ? "Resume" : "Start Timer");

    async function startTimer() {
        if (timer && timer.isRunning) {
            return
        }
        onStart()
        timer = new Timer()
        if (hours == 0 && minutes == 0 && seconds == 0) {
            return 
        }
        let promise = timer.start(hours, minutes, seconds)
        is_running = true
        has_finished = false
        while (!timer.hasFinished) {
            if (timer.isRunning) {
                updateValues();
            }
            await new Promise(r => setTimeout(r, 100))
        }
        updateValues();
        onDone();
        await promise
    }

    function updateValues() {
        [hours, minutes, seconds] = timer.getRemaining()
        secondsString = seconds.toString().padStart(2, "0")
        minutesString = minutes.toString().padStart(2, "0")
        hoursString = hours.toString().padStart(2, "0")
        is_running = timer.isRunning;
        has_finished = timer.hasFinished;
        document.title = `⏳ ${hoursString}:${minutesString}:${secondsString}`
    }

    function setValues(event) {
        seconds = parseInt(secondsString);
        secondsString = seconds.toString().padStart(2, "0");
        minutes = parseInt(minutesString);
        minutesString = minutes.toString().padStart(2, "0");
        hours = parseInt(hoursString);
        hoursString = hours.toString().padStart(2, "0");
        if (timer !== undefined) {
            timer.set(hours, minutes, seconds);
        }
    }

    function pause_resume() {
        if (is_running) {
            timer.pause();
            updateValues();
        } else {
            startTimer();
        }
    }
</script>

<main>
    <div class="timer-main">
        <div class="timer">
            <div
                class="time-number-box">
                <input
                    type="text"
                    name="hours"
                    class="input-box"
                    bind:value={hoursString}
                    on:change={setValues}
                    >
            </div>
            <div class="divider">:</div>
            <div
                class="time-number-box">
                <input
                    type="text"
                    name="minutes"
                    class="input-box"
                    bind:value={minutesString}
                    on:change={setValues}
                    >
            </div>
            <div class="divider">:</div>
            <div
                class="time-number-box-small">
                <input
                    type="text"
                    name="seconds"
                    class="input-box"
                    bind:value={secondsString}
                    on:change={setValues}
                    >
            </div>
        </div>
        <button class="start-timer-button" on:click={pause_resume}>
            {pause_resume_label}
        </button>
    </div>
</main>

<style lang="scss">
.timer {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 10%;
    margin: 10%;
}
.time-number-box {
    font-size: 50px;
    background-color: antiquewhite;
    border-radius: 15px;
    color: black;
    width: 60px;
}
.time-number-box-small {
    @extend .time-number-box;
    transform: scale(0.7);
    transform-origin: bottom left;
    width: 60px;
}
.divider {
    font-size: 50px;
    color: black;
}
.start-timer-button {
    background-color: azure;
    color: black;
    margin-left: 20%;
}
.input-box {
    @extend .time-number-box;
    max-width: 100%;}
</style>