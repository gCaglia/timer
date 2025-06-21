<script lang="ts">
  import Timer from "./lib/timer/Timer.svelte";
</script>

<main>
  <h1 class="title">Focus Timer</h1>
  <div class="column">
    <div class="timer-block">
      <Timer></Timer>
      </div>
    <div class="video-embedding">Video Block</div>
  </div>
</main>

<style>
.timer-block {
  color: blue;
  border: 2px solid black;
  padding-top: 150px;
  padding-bottom: 150px;
  padding-left: 300px;
  padding-right: 300px;
}
.video-embedding {
  color: red;
  border: 2px solid black;
  padding-top: 150px;
  padding-bottom: 150px;
  padding-left: 400px;
  padding-right: 400px;
}

.column {
  justify-content: flex-start;
  display: flex;
  gap: 20px
}
</style>
