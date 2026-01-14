// rafce
import React, { useEffect, useState } from "react";
import LayoutContainer from "./layouts/LayoutContainer";
import MainBox from "./components/MainBox";
import SideBar from "./components/Sidebar";
import TodoMain from "./components/TodoMain";

const App = () => {
  // initialization: read todos from localStorage
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("my_todo_list");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // save achive automatically: when todos changes
  useEffect(() => {
    localStorage.setItem("my_todo_list", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now().toString(),
      text: text,
      completed: false,
      date: new Date().toISOString().split("T")[0], //get YYYY-MM-DD of today
      createdAt: Date.now(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  return (
    <>
      <LayoutContainer>
        <MainBox>
          <SideBar />
          <TodoMain
            todos={todos}
            addTodo={addTodo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        </MainBox>
      </LayoutContainer>
    </>
  );
};

export default App;
