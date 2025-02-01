import React, { useEffect, useState } from "react";
import BudgetButton from "./BudgetButton";
import NavBar from "./NavBar";
import DataHandler from "../utils/dataHandler";

const dataHandler = new DataHandler();

export function App() {
  const [data, setData] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(0);

  const addNewBudget = () => {
    console.log("new budget method");

    const newId =
      data.map((item) => item.id).reduce((a, b) => Math.max(a, b)) + 1;

    const newBudget = {
      title: "New Budget",
      remaining: 100,
      max: 100,
      id: newId,
    };
    setData([...data, newBudget]);
    dataHandler.setStoredData([...data, newBudget]);
    setSelectedBudget(0);
  };

  const deleteBudget = (id) => {
    console.log("delete budget method");

    if (data.length === 1) return;

    const newData = data.filter((item) => item.id !== id);
    setData([...newData]);
    dataHandler.setStoredData(newData);
  };

  const subtractFromBudget = (id, remainder) => {
    const updatedData = data.map((budget) => {
      if (budget.id === id) {
        return { ...budget, remaining: remainder };
      }
      return budget;
    });
    dataHandler.setStoredData(updatedData);
    setSelectedBudget(0);
    setData([...updatedData]);
  };

  const selectBudget = (id) => {
    setSelectedBudget(id);
  };

  const handleBgClick = (e) => {
    if (e.target.classList.contains("bgRef")) {
      setSelectedBudget(0);
    }
  };

  useEffect(() => {
    const storedData = dataHandler.getStoredData();
    if (storedData) setData([...storedData]);
  }, [dataHandler]);

  useEffect(() => {
    document.addEventListener("click", handleBgClick);
    return () => {
      document.removeEventListener("click", handleBgClick);
    };
  }, []);

  return (
    <div className="bgRef justify-center border-black p-8 bg-slate-800 min-h-screen min-w-[320px]">
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
                selectBudget={selectBudget}
                selectedBudget={selectedBudget}
                subtractFromBudget={subtractFromBudget}
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
