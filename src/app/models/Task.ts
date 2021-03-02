export interface Task {
    IdTask?: number;
    IdUser: number;
    Name: string;
    Description: string;
    Priority: string;
    Status: number;
    CreateTask: Date;
    isCompleted: Boolean;
  }