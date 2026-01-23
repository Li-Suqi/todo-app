import React from "react";

const DateList = ({ todos, selectedDate, setSelectedDate }) => {
  const datesWithTasks = [...new Set(todos.map((todo) => todo.date))]
    .sort()
    .reverse();

  const recentDates = datesWithTasks.slice(0, 7);

  return (
    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
      <div className="space-y-2">
        {recentDates.map((date) => {
          // task number
          const dayTasks = todos.filter((t) => t.date === date);
          const count = dayTasks.length;

          const day = date.split("-")[2];
          const isSelected = date === selectedDate;
          return (
            <div
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`flex items-center justify-between p-2 rounded-2xl cursor-pointer transition-all group
                  ${
                    isSelected
                      ? "bg-amber-50 border-amber-200 shadow-sm dark:bg-dark-400" // selected
                      : "bg-slate-50/50 border-transparent hover:border-amber-100 dark:bg-dark-300" // normal and hover
                  }
                  border
                `}
            >
              <div className="flex items-baseline gap-1">
                <span className="text-slate-400 text-xs dark:text-textwhite">
                  {new Date(date).toLocaleDateString("en-US", {
                    month: "short",
                  })}
                </span>
                <span className="text-slate-700 font-bold text-lg dark:text-textwhite">
                  {parseInt(day)}
                </span>
              </div>

              <div className="bg-amber-100/50 text-amber-600 px-3 py-1 rounded-full text-xs font-medium dark:text-textwhite">
                {count} tasks
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DateList;
