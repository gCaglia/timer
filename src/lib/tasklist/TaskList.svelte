<script lang="ts">
  import { TaskList } from "../tasklist/TaskList"
  import TaskElement from "../task/Task";
  import Task from "../task/Task.svelte";

  let tasklist = new TaskList();
  let tasks: TaskElement[];

  function addTask() {
    tasklist.createDefault();
    refresh()
  }

  function deleteTask(index: number) {
    tasklist.deleteTask(index);
    refresh()
  }

  function refresh() {
    tasks = tasklist.getTasks()
  }
</script>

<div class="button-box">
  <button class="add-task" on:click={addTask}> + Add Task</button>
</div>
<div class="task-subbox">
    {#each tasks as task, i}
    <div class="task-and-delete">
      <Task bind:task={task}></Task>
      <button on:click={() => {deleteTask(i)}} style="scale: 0.5">Delete</button>
    </div>
    {/each}
</div>

<style lang="scss">
.task-subbox {
  flex: 1;
  border: 1px solid black;
  background-color: antiquewhite;
  box-sizing: border-box;
  color: black;
}
.button-box {
  display: flex;
  justify-content: right;
  max-height: 10%;
}
.add-task {
  max-height: 25%;
}
.task-and-delete {
  display: flex;
  flex-direction: row;
}
</style>