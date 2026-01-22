// rafce
import React, { useEffect, useState } from "react";
import LayoutContainer from "./layouts/LayoutContainer";
import MainBox from "./components/MainBox";
import SideBar from "./components/Sidebar";
import TodoMain from "./components/TodoMain";
import { fireBigConfetti, fireSmallConfetti, formatLocalDate } from "./utils";

// default user info
const DEFAULT_PROFILE = {
  nickname: "Happy Puppy",
  avatar: null, // store Base64 string
  bio: "stay focus and explore life ✨",
};

const App = () => {
  const [selectedDate, setSelectedDate] = useState(formatLocalDate(new Date()));

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("user_profile");
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  // initialization: read todos from localStorage
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("my_todo_list");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // save achive automatically: when todos changes
  useEffect(() => {
    localStorage.setItem("my_todo_list", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("user_profile", JSON.stringify(profile));
  }, [profile]);

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
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        const newStatus = !todo.completed;

        // task from not completed to completed
        if (newStatus) {
          // check task of this day
          const dayTasks = todos.filter((t) => t.date === todo.date);
          const otherTasksDone = dayTasks
            .filter((t) => t.id !== id)
            .every((t) => t.completed);

          if (dayTasks.length > 0 && otherTasksDone) {
            // if it's the last task of today
            fireBigConfetti();
          } else {
            fireSmallConfetti();
          }
        }
        return { ...todo, completed: newStatus };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)),
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
            profile={profile}
            setProfile={setProfile}
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
