import type { Todo, FilterType } from "@/types/todo";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, filter, onToggle, onDelete }: TodoListProps) {
  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">
          {filter === 'completed' && todos.some(t => !t.completed)
            ? "No completed todos yet"
            : filter === 'active' && todos.some(t => t.completed)
            ? "All todos completed! 🎉"
            : "No todos yet. Add one above!"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}