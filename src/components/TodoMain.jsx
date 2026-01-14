import React, { useState } from "react";
import TodoItem from "./TodoItem";

const TodoMain = ({
  todos,
  addTodo,
  toggleTodo,
  deleteTodo,
  updateTodo,
  selectedDate,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return; // if nothing in input

    addTodo(inputValue);
    setInputValue(""); // clear input
  };

  return (
    <main className="flex-1 flex flex-col bg-white">
      {/* header: show date */}
      <header className="p-8 pb-4">
        <h1 className="text-2xl font-semibold text-slate-700">
          {new Date(selectedDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </h1>
      </header>

      {/* form: add an item */}
      <section className="px-8 mb-6 mt-6">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="add a new task"
            className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-100 outline-none transition-all placeholder:text-slate-300"
          />
          <button
            type="submit"
            className="bg-amber-400 text-white px-6 py-2 rounded-xl hover:bg-amber-500 transition-all font-medium"
          >
            add
          </button>
        </form>
      </section>

      {/* show todo list */}
      <section className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
        <div className="space-y-3">
          {/* todo items below */}
          <section className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
            {todos.length === 0 ? (
              <div className="text-center mt-20 text-slate-300">
                <p className="text-base">No task yet.</p>
                <p className="text-base">
                  Let's start a wonderful day with a coffee ☕️
                </p>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                {todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                    updateTodo={updateTodo}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
};

export default TodoMain;
