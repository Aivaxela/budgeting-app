import { useState } from "react";

export default function BudgetButton({ title, remaining, max }) {
  const [progressBarValue, setProgressBarValue] = useState(
    Math.floor((remaining / max) * 100)
  );

  return (
    <div>
      <h2 className="text-slate-300 font-semibold text-center text-[30px] mb-2">
        {title}
      </h2>
      <div className="border-8 border-slate-300 rounded-3xl p-2 hover:bg-slate-300 group">
        <p className="text-[75px] text-slate-300 font-extrabold text-left pl-4 group-hover:text-slate-800">
          {`$${remaining}`}
        </p>
        <p className="text-[36px] text-slate-300 font-normal text-right pr-4 pb-2 group-hover:text-slate-800">
          {` / $${max}`}
        </p>
        <div
          style={{
            width: progressBarValue.toString() + "%",
            transition: "width 0.5s, background-color 0.5s",
          }}
          className={`${
            progressBarValue > 35 ? "bg-green-400" : "bg-red-400"
          } h-6 rounded-xl`}
        ></div>
      </div>
    </div>
  );
}
