import { useState } from "react";
import type { Todo, FilterType } from "@/types/todo";
import { AddTodo } from "@/components/AddTodo";
import { TodoList } from "@/components/TodoList";
import { TodoFilters } from "@/components/TodoFilters";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import toast from "react-hot-toast";

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [filter, setFilter] = useState<FilterType>("all");

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos([newTodo, ...todos]);
    toast.success("Todo added!");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.success("Todo deleted!");
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
            Dark Todo App
          </h1>
          <p className="text-muted-foreground">
            Stay organized with this sleek dark-themed todo application
          </p>
        </div>

        <div className="bg-card border rounded-lg p-6 shadow-lg">
          <div className="mb-6">
            <AddTodo onAdd={addTodo} />
          </div>

          <TodoList
            todos={todos}
            filter={filter}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />

          {todos.length > 0 && (
            <TodoFilters
              currentFilter={filter}
              onFilterChange={setFilter}
              totalCount={todos.length}
              activeCount={activeCount}
              completedCount={completedCount}
            />
          )}
        </div>

        {todos.length === 0 && (
          <div className="mt-8 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Ready to get productive?
            </h2>
            <p className="text-muted-foreground">
              Add your first todo above to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
