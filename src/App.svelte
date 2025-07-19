<script lang="ts">
  import Timer from "./lib/timer/Timer.svelte";
  import Player from "./lib/player/Player.svelte";
  import TaskList from "./lib/tasklist/TaskList.svelte";

  let timerDone: boolean;

  function handleTimerDone() {
    timerDone = true;
  }

  function handleTimerStart() {
    timerDone = false;
  }
</script>

<main class="main">
  <h1 class="title">Focus Timer</h1>
  <div class="column">
    <div class="timer-block">
      <Timer onDone={handleTimerDone} onStart={handleTimerStart}></Timer>
    </div>
    <div class="video-embedding">
      <Player timerDone={timerDone}></Player>
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
</style>
