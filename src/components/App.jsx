import React from "react";
import BudgetButton from "./BudgetButton";
import NavBar from "./NavBar";
import getStoredData from "../utils/setData";

export function App() {
  const [data, setData] = React.useState(getStoredData());
  console.log(data);

  const addNewBudget = () => {
    const newId =
      data.map((item) => item.id).reduce((a, b) => Math.max(a, b)) + 1;

    const newBudget = {
      title: "New Budget",
      remaining: 100,
      max: 100,
      id: newId,
    };
    setData([...data, newBudget]);
    localStorage.setItem("data", JSON.stringify([...data, newBudget]));
  };

  const deleteBudget = (id) => {
    if (data.length === 1) return;

    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    localStorage.setItem("data", JSON.stringify(newData));
  };

  return (
    <div className="justify-center border-black p-8 bg-slate-800 min-h-screen min-w-[320px]">
      <div className="max-w-5xl mx-auto">
        <NavBar />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-28">
          {Array.from(data).map((item) => {
            return (
              <BudgetButton
                key={item.id}
                title={item.title}
                remaining={item.remaining}
                max={item.max}
                id={item.id}
                deleteBudget={deleteBudget}
              />
            );
          })}
          <button
            onClick={() => addNewBudget()}
            className="text-slate-300 font-extrabold text-[72px]"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
