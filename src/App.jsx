// rafce
import React, { useEffect, useState } from "react";
import LayoutContainer from "./layouts/LayoutContainer";
import MainBox from "./components/MainBox";
import SideBar from "./components/Sidebar";
import TodoMain from "./components/TodoMain";
import { formatLocalDate } from "./utils";

const App = () => {
  const [selectedDate, setSelectedDate] = useState(formatLocalDate(new Date()));
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
      date: selectedDate, //use YYYY-MM-DD of selectedDate
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

  // only show filtered todos in TodoMain
  const filteredTodos = todos.filter((t) => t.date === selectedDate);

  return (
    <>
      <LayoutContainer>
        <MainBox>
          <SideBar
            todos={todos}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <TodoMain
            todos={filteredTodos}
            selectedDate={selectedDate}
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
