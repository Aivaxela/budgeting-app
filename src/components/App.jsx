import React from "react";
import BudgetButton from "./BudgetButton";
import NavBar from "./NavBar";

export function App() {
  return (
    <div className="justify-center border-black p-8 bg-slate-800 min-h-screen min-w-[320px]">
      <div className="max-w-5xl mx-auto">
        <NavBar />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-28">
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
