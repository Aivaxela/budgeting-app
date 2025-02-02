import React, { useEffect, useState } from "react";
import BudgetButton from "./BudgetButton";
import NavBar from "./NavBar";
import DataHandler from "../utils/dataHandler";

const dataHandler = new DataHandler();

export function App() {
  const [budgets, setBudgets] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(0);

  useEffect(() => {
    const storedData = dataHandler.getStoredData();
    if (storedData) setBudgets([...storedData]);

    document.addEventListener("click", handleBgClick);
    return () => document.removeEventListener("click", handleBgClick);
  }, []);

  const addNewBudget = () => {
    const newId =
      budgets
        .map((item) => item.id)
        .reduce((acc, curr) => Math.max(acc, curr)) + 1;

    const newBudget = {
      title: "New Budget",
      remaining: 100,
      max: 100,
      id: newId,
    };
    console.log(...budgets);
    setBudgets([...budgets, newBudget]);
    dataHandler.setStoredData([...budgets, newBudget]);
    setSelectedBudget(0);
  };

  const updateBudget = ({ id, newRemaining, newMax, newTitle }) => {
    const updatedData = budgets.map((budget) => {
      if (budget.id === id)
        return {
          ...budget,
          remaining:
            newRemaining || newRemaining === 0
              ? newRemaining
              : budget.remaining,
          max: newMax || budget.max,
          title: newTitle || budget.title,
        };
      return budget;
    });
    dataHandler.setStoredData(updatedData);
    setSelectedBudget(0);
    setBudgets([...updatedData]);
  };

  const deleteBudget = (id) => {
    if (budgets.length === 1) return;

    const newData = budgets.filter((item) => item.id !== id);
    setBudgets([...newData]);
    dataHandler.setStoredData(newData);
  };

  const selectBudget = (id) => setSelectedBudget(id);
  const handleBgClick = (e) =>
    e.target.classList.contains("bgRef") && setSelectedBudget(0);

  return (
    <div className="bgRef justify-center border-black p-8 bg-slate-800 min-h-screen min-w-[320px]">
      <div className="max-w-5xl mx-auto">
        <NavBar />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-28">
          {budgets.map((budget) => {
            return (
              <BudgetButton
                key={budget.id}
                title={budget.title}
                remaining={budget.remaining}
                max={budget.max}
                id={budget.id}
                deleteBudget={deleteBudget}
                selectBudget={selectBudget}
                selectedBudget={selectedBudget}
                updateBudget={updateBudget}
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
