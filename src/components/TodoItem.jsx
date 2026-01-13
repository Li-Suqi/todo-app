import React, { useState } from "react";

const TodoItem = ({ todo, toggleTodo, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleUpdate = () => {
    if (editText.trim() && editText !== todo.text) {
      updateTodo(todo.id, editText);
    }
    setIsEditing(false);
  };

  return (
    <div className="flex items-center p-4 bg-slate-50 rounded-2xl group transition-all hover:bg-slate-100/80 border border-transparent hover:border-amber-100">
      {/* checkbox */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="w-5 h-5 rounded-full border-slate-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
      />

      {/* task text */}
      <div className="ml-4 flex-1 flex items-center min-h-[2.25lvh] h-9 transition-all">
        {isEditing ? (
          <input
            autoFocus
            className="w-full bg-white border border-amber-200 rounded-lg px-2 py-1 outline-none shadow-inner text-slate-700"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUpdate();
                setIsEditing(false);
              }
            }}
          />
        ) : (
          <span // double click to edit
            onDoubleClick={() => setIsEditing(true)}
            className={`ml-4 flex-1 text-slate-700 ${
              todo.completed ? "line-through text-slate-400" : ""
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>

      {/* edit button */}
      {!isEditing && ( // only when not in editing mode
        <button
          onClick={() => setIsEditing(true)}
          className="text-slate-300 hover:text-amber-500 transition-colors p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
      )}

      {/* delete button */}
      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-slate-300 hover:text-red-400 transition-colors p-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default TodoItem;
