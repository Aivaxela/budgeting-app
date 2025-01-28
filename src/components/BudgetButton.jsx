import { useState } from "react";

export default function BudgetButton({ title, remaining, max }) {
  const [progressBarValue, setProgressBarValue] = useState(
    Math.floor((remaining / max) * 100)
  );

  return (
    <div>
      <h2 className="text-slate-300 text-center text-[30px] mb-2">{title}</h2>
      <div className="border-8 rounded-3xl p-2">
        <p className="text-[75px] text-slate-300 font-extrabold text-left pl-4">
          {`$${remaining}`}
        </p>
        <p className="text-[36px] text-slate-300 font-normal text-right pr-4 pb-2">
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
