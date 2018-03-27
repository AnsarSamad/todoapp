export class ToDo {
    id: number;
    title: string;
    complete: boolean;

    constructor(title, complete) {
        this.title = title;
        this.complete = complete;
    }
}