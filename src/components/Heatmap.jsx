import React from "react";

const Heatmap = ({
  currentMonthDays,
  changeMonth,
  todos,
  getLevelClass,
  selectedDate,
  setSelectedDate,
  viewDate,
}) => {
  // get weekday of 1st of the month
  const firstDayOfMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth(),
    1,
  ).getDay(); // get the day of the week

  // null array as placeholders
  const blanks = Array(firstDayOfMonth).fill(null);

  return (
    <div className="p-6 pt-2 pb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-800 font-bold text-sm dark:text-textwhite">
          {viewDate.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}
        </h3>
        <div className="flex gap-1">
          <button
            onClick={() => changeMonth(-1)}
            className="p-1 hover: text-amber-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => changeMonth(1)}
            className="p-1 hover: text-amber-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {/* header from sun to mon */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((wd) => (
          <div
            key={wd}
            className="text-[10px] text-slate-400 text-center font-medium w-5.5"
          >
            {wd}
          </div>
        ))}
        {/* heatmap of this month */}
        {/* blank placeholders */}
        {blanks.map((_, i) => (
          <div key={`blank-${i}`} className="w-5.5 h-5.5"></div>
        ))}
        {/* real date dots */}
        {currentMonthDays.map((day) => {
          const isSelected = day === selectedDate;
          return (
            <div
              key={day}
              title={day} // hover to show date
              onClick={() => setSelectedDate(day)}
              className={`w-5.5 h-5.5 mt-1.5 rounded-full transition-all duration-300  cursor-pointer dark:bg-dark-200 ${getLevelClass(
                day,
                todos,
              )} ${
                isSelected
                  ? "ring-2 ring-amber-400 scale-110 shadow-lg" // selected
                  : "hover:ring-2 hover:ring-amber-200 hover:scale-110" // hover
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Heatmap;
