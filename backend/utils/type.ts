export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
}

// Define the TypeScript interface for the Task
export interface ITask extends Document {
    userId: string;         // The ID of the user associated with the task
    taskName: string;       // The name of the task
    description: string;    // A description of the task
    isCompleted: boolean;   // Whether the task is completed
    createdAt: string;
    updatedAt: string;
    __v: number;      // The date the task was last updated
  }


  export interface ITasks {
    _id: string;
    userId: string;
    taskName: string;
    description: string;
    isCompleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IEditTaskResponse {
    message: string;
    task: ITask;
}
