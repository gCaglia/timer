export default class Task {
    isDone: boolean
    description: string

    constructor (description: string) {
        this.description = description;
        this.isDone = false;
    }

    mark() {
        if (!this.isDone) {
            this.markDone()
        }
        this.markNotDone()
    }

    markDone() {
        this.isDone = true;
    }

    markNotDone() {
        this.isDone = false;
    }
}