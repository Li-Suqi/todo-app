import React from "react";

const Heatmap = () => {
  // 28 days data
  // 以后这里会根据 localStorage 里的完成情况来计算颜色
  const tiles = Array.from({ length: 28 });

  return (
    <div className="p-6 border-b border-slate-50">
      <h3 className="text-sm font-semibold text-slate-500 mb-4">
        Monthly record
      </h3>

      {/* grids of sever-column */}
      <div className="grid grid-cols-7 gap-2">
        {tiles.map((_, i) => {
          // different shadows of color
          let bgColor = "bg-slate-100"; // grey as default
          if (i === 5 || i === 12) bgColor = "bg-yellow-200";
          if (i === 7 || i === 18) bgColor = "bg-yellow-400";
          if (i === 10) bgColor = "bg-yellow-600";

          return (
            <div
              key={i}
              className={`w-5.5 h-5.5 mx-auto aspect-square rounded-full ${bgColor} transition-all hover:ring-2 hover:ring-amber-200 cursor-pointer scale-120`}
              title={`${i + 1} th day`}
            />
          );
        })}
      </div>

      <div className="flex items-center gap-1 mt-3 text-[10px] text-slate-400">
        <span>less</span>
        <div className="w-2 h-2 bg-slate-100 rounded-sm"></div>
        <div className="w-2 h-2 bg-yellow-200 rounded-sm"></div>
        <div className="w-2 h-2 bg-yellow-400 rounded-sm"></div>
        <div className="w-2 h-2 bg-yellow-600 rounded-sm"></div>
        <span>more</span>
      </div>
    </div>
  );
};

export default Heatmap;
