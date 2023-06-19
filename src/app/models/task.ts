import { User } from "./user";
import { State } from "./enums/state";
import { Priority } from "./enums/priority";
import { Sprint } from "./sprint";

export class Task {
    id: number;
    title: string;
    description: string;
    reporterId: number;
    assignedId: number;
    estimatedTime: Date;
    state: State;
    priority: Priority;
    sprints: Sprint[];
}
