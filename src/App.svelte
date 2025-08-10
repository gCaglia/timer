<script lang="ts">
  import Timer from "./lib/timer/Timer.svelte";
  import Player from "./lib/player/Player.svelte";
  import TaskList from "./lib/tasklist/TaskList.svelte";
  import Sound from "./lib/sound/Sound.svelte"

  let timerDone: boolean;
  let alarmSelection: string = "0";
  $: alarm = parseInt(alarmSelection);

  function handleTimerDone() {
    timerDone = true;
  }

  function handleTimerStart() {
    timerDone = false;
  }
</script>

<main class="main">
  <h1 class="title">Focus Timer</h1>
  <nav class="player-selection">
    <form>
      <input type="radio" id="fs-player" name="alarm-selection" value=0 bind:group={alarmSelection}>
      <label for="fs-player"> Use Free Sounds</label>
      <input type="radio" id="yt-player" name="alarm-selection" value=1 bind:group={alarmSelection}>
      <label for="yt-player"> Use YouTube</label>
    </form>
  </nav>
  <div class="column">
    <div class="timer-block">
      <Timer onDone={handleTimerDone} onStart={handleTimerStart}></Timer>
    </div>
    <div class="video-embedding">
      {#if alarm == 0}
        <Sound></Sound>
      {:else if alarm == 1}
        <Player timerDone={timerDone}></Player>
      {:else}
          <p>No found</p>
      {/if}
    </div>
  </div>
    <div class="taskbox">
      <TaskList></TaskList>
    </div>
</main>

<style lang="scss">
.timer-block {
  color: blue;
  border: 2px solid black;
  padding-top: 50px;
  padding-bottom: 50px;
  padding-left: 100px;
  padding-right: 100px;
}
.video-embedding {
  color: red;
  border: 2px solid black;
  padding-top: 50px;
  padding-bottom: 50px;
  padding-left: 50px;
  padding-right: 50px;
}

.column {
  justify-content: flex-start;
  display: flex;
  gap: 20px
}
.taskbox {
  border: 2px solid black;
  margin-top: 2.5%;
  padding: 10px;
  min-height: 18vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.main {
  display: flex;
  flex-direction: column;
}
.player-selection {
  margin-bottom: 2%;
}
</style>
