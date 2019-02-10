export type Todo = {
  readonly id: number;
  readonly text: string;
  readonly creationTime: number;
  readonly completeTime: number | null;
};

export type RootState = {
  readonly todos: Todo[];
};
