import React, { useState } from "react";
import Heatmap from "./Heatmap";
import DataList from "./DateList";
import { formatLocalDate } from "../utils";

const Sidebar = ({ todos, selectedDate, setSelectedDate }) => {
  const [viewDate, setViewDate] = useState(new Date()); // current month on the top of sidebar, today default

  const changeMonth = (offset) => {
    // offset: last month: -1; next month: 1, this month: 0
    const newDate = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth() + offset,
      1 // the 1st day
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

  const getLevelClass = (date, todos) => {
    const count = todos.filter((t) => t.date === date && t.completed).length;

    if (count === 0) return "bg-slate-100";
    if (count >= 1 && count <= 2) return "bg-amber-200";
    if (count >= 3 && count <= 4) return "bg-amber-400";
    return "bg-amber-500";
  };

  return (
    <aside className="w-80 border-r border-slate-300 flex flex-col">
      <Heatmap
        currentMonthDays={currentMonthDays}
        changeMonth={changeMonth}
        todos={todos}
        getLevelClass={getLevelClass}
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
        viewDate={viewDate}
      />
      <DataList
        todos={todos}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </aside>
  );
};

export default Sidebar;
