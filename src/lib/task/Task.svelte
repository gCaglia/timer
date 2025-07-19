<script lang="ts">
    import Task from "../task/Task"
    export let task: Task;
</script>
<div class="task">
    <input class="task-checkbox" type="checkbox" on:change={task.mark.bind(task)}>
    <textarea class="task-description" bind:value={task.description}></textarea>
</div>
<style lang="scss">
    .task {
        display: flex;
        justify-content: center;
        gap: 2%;
        margin: 1%;
        width:100%
    }
    .task-checkbox {
        background-color: grey;
        border-radius: 10px;
    }
    .task-description {
        background-color: grey;
        border-radius: 10px;
        width: 75%;
    }
</style>