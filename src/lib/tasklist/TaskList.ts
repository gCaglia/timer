import Task from "../task/Task";


export class TaskList {
    tasks: Task[] = [];

    createTask(description: string) {
        this.tasks.push(new Task(description))
    }

    createDefault() {
        this.createTask("description...")
    }

    getTasks(): Task[] {
        return this.tasks
    }

    deleteTask(index: number): void {
        console.log(index)
        this.tasks.splice(index, 1)
    }
}