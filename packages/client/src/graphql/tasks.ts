import { gql } from '@apollo/client';

export interface Task {
  _id: string;
  title: string;
  description: string;
  date: Date;
  complete: boolean;
  createTask?: Task;
}

export interface TaskData {
  imcompleteTask: Task[];
  completeTask: Task[];
}

export interface TaskVars {
  page: number;
}

// TODO: verify types number or int
export const IMCOMPLET_TASK = gql`
  query imcompleteTask($page: Int!) {
    imcompleteTask(page: $page) {
      _id
      title
      description
      date
      complete
    }
  }
`;

export const TASKS_COMPLETE = gql`
  query completeTask {
    completeTask {
      _id
      title
      description
      complete
      date
    }
  }
`;

export interface CreateTaskVars {
  title: string;
  description: string;
  date: Date;
}

export const CREATE_TASK = gql`
  mutation createTask(
    $title: String!
    $description: String!
    $date: DateTime!
  ) {
    createTask(title: $title, description: $description, date: $date) {
      _id
      title
      description
      date
      complete
    }
  }
`;

export interface CompleteTaskVars {
  id: string;
}

export const COMPLETE_TASK = gql`
  mutation completeTask($id: ID!) {
    completeTask(id: $id)
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;
