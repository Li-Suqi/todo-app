import React from "react";

const DateList = () => {
  // 模拟最近10天的日期
  const dates = Array.from({ length: 10 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return {
      fullDate: d.toLocaleDateString(),
      day: d.getDate(),
      month: d.getMonth() + 1,
      isToday: i === 0,
    };
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
      <h3 className="text-sm font-semibold text-slate-500 mb-4 px-2">
        History
      </h3>

      <div className="space-y-2">
        {dates.map((item, i) => (
          <div
            key={i}
            className={`group p-3 rounded-2xl cursor-pointer transition-all ${
              item.isToday
                ? "bg-amber-100 text-slate-500 shadow-md shadow-orange-100"
                : "hover:bg-slate-50 text-slate-500"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-400">{item.month}月</p>
                <p className="text-lg font-bold">{item.day}日</p>
              </div>
              {/* 右侧的小数字，显示当天任务数 */}
              <span
                className={`text-[10px] px-2 py-1 rounded-full ${
                  item.isToday
                    ? "bg-amber-300 text-slate-400"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                7 tasks
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DateList;
