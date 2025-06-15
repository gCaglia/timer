<script lang="ts">
    import { Timer } from "../timer/Timer"
    let timer = new Timer()
    let hoursDiv: HTMLDivElement;
    let minutesDiv: HTMLDivElement;
    let secondsDiv: HTMLDivElement;
    let hours: number = 0;
    let minutes: number = 0;
    let seconds: number = 0;

    let is_running: boolean;
    let has_finished: boolean;

    async function startTimer() {
        console.log(seconds);
        let promise = timer.start(hours, minutes, seconds)
        while (timer.is_running) {
            [hours, minutes, seconds] = timer.getRemaining()
            is_running = timer.is_running;
            has_finished = timer.has_finished;
            await new Promise(r => setTimeout(r, 1000))
        }
        await promise
    }

    function prettyString(number: number): String {
        return number.toString().padStart(2, "0")
    }
</script>

<main>
    <div class="timer-main">
    <p>Is running: {is_running}</p>
    <p>Has finished: {has_finished}</p>
        <div class="timer">
            <div
                class="time-number-box"
                contenteditable="true"
                bind:this={hoursDiv}
                on:input={() => hours = parseInt(hoursDiv.innerText || '0')}>
                {prettyString(hours)}
            </div>
            <div class="divider">:</div>
            <div
                class="time-number-box"
                contenteditable="true"
                bind:this={minutesDiv}
                on:input={() => minutes = parseInt(minutesDiv.innerText || '0')}>
                {prettyString(minutes)}
            </div>
            <div class="divider">:</div>
            <div
                class="time-number-box-small"
                contenteditable="true"
                bind:this={secondsDiv}
                on:input={() => seconds = parseInt(secondsDiv.innerText || '0')}>
                {prettyString(seconds)}
            </div>
        </div>
        <button class="start-timer-button" on:click={startTimer}>
            Start Timer
        </button>
    </div>
</main>

<style lang="scss">
.timer {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 1%;
    margin: 10%;
}
.time-number-box {
    font-size: 50px;
    background-color: antiquewhite;
    border-radius: 15px;
    color: black;
}
.time-number-box-small {
    @extend .time-number-box;
    transform: scale(0.7);
    transform-origin: bottom left;
    // font-size: 35px;
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
</style>