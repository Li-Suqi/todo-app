import React from "react";
import Heatmap from "./Heatmap";
import DataList from "./DateList";

const Sidebar = () => {
  return (
    <aside className="w-78 border-r border-slate-300 flex flex-col">
      <Heatmap></Heatmap>
      <DataList></DataList>
    </aside>
  );
};

export default Sidebar;
