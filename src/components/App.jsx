import React from "react";
import BudgetButton from "./BudgetButton";

export function App() {
  return (
    <div className="justify-center border-black p-8 bg-slate-800 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-extrabold text-[60px] md:text-[96px] border-b-2 pb-4 text-center text-slate-300 mb-8">
          No BS Budget
        </h1>
        <div className="grid grid-cols-2 gap-8">
          <BudgetButton
            title={"General Spending"}
            remaining={174}
            max={250}
          ></BudgetButton>
          <BudgetButton
            title={"Groceries"}
            remaining={112}
            max={300}
          ></BudgetButton>
          <BudgetButton
            title={"Takeout"}
            remaining={20}
            max={100}
          ></BudgetButton>
        </div>
      </div>
    </div>
  );
}
