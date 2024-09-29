import type { User } from "./user.type";

export interface Task {
    id: string;
    name: string;
    deadline: Date;
    completed: boolean;
    users: Array<User>;
}