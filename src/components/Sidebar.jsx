import React, { useState } from "react";
import Heatmap from "./Heatmap";
import DataList from "./DateList";
import { formatLocalDate } from "../utils";
import Profile from "./Profile";
import darkModeIcon from "../assets/dark_mode.svg";
import lightModeIcon from "../assets/light_mode.svg";

const ThemeToggle = ({ isDark, setIsDark }) => {
  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="flex items-center m-2 pl-2 rounded-full hover:bg-slate-100 dark:hover:bg-dark-400 transition-colors w-10 h-10"
    >
      <img
        src={isDark ? lightModeIcon : darkModeIcon}
        alt="theme-toggle"
        className="w-6 h-6" // control size
      />
    </button>
  );
};

const Sidebar = ({
  todos,
  selectedDate,
  setSelectedDate,
  profile,
  setProfile,
  isDark,
  setIsDark,
}) => {
  const [viewDate, setViewDate] = useState(new Date()); // current month on the top of sidebar, today default

  const changeMonth = (offset) => {
    // offset: last month: -1; next month: 1, this month: 0
    const newDate = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth() + offset,
      1, // the 1st day
    );
    setViewDate(newDate);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    // the 0st day of next month is the last of this month
    const lastDay = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 1; i <= lastDay; i++) {
      const day = new Date(year, month, i);
      const dateString = formatLocalDate(day); // format: YYYY-MM-DD
      days.push(dateString);
    }
    return days;
  };

  const currentMonthDays = getDaysInMonth(viewDate);

  const getLevelClass = (date, todos, isDark) => {
    const count = todos.filter((t) => t.date === date && t.completed).length;

    if (count === 0) {
      if (isDark) return "bg-dark-400";
      else return "bg-slate-100";
    }
    if (count >= 1 && count <= 2) return "bg-amber-200";
    if (count >= 3 && count <= 4) return "bg-amber-400";
    return "bg-amber-500";
  };

  return (
    <aside className="w-80 border-r border-slate-300 flex flex-col dark:border-dark-line">
      <Profile profile={profile} setProfile={setProfile} />
      <Heatmap
        currentMonthDays={currentMonthDays}
        changeMonth={changeMonth}
        todos={todos}
        getLevelClass={getLevelClass}
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
        viewDate={viewDate}
        isDark={isDark}
      />
      <DataList
        todos={todos}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
    </aside>
  );
};

export default Sidebar;
