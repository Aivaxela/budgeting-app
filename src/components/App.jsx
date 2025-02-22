import React, { useEffect, useState } from "react";
import "react-icons";
import BudgetButtons from "./BudgetButtons";
import NavBar from "./NavBar";
import DataHandler from "../utils/dataHandler";
import SettingsModal from "./SettingsModal";
import ConfirmModal from "./ConfirmModal";
import { BudgetsContext } from "../contexts/BudgetsContext";

const dataHandler = new DataHandler();

export function App() {
  const [budgets, setBudgets] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(0);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [confirmProps, setConfirmProps] = useState({});

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
            Math.round(
              (newRemaining || newRemaining === 0
                ? newRemaining
                : budget.remaining) * 100
            ) / 100,
          max: Math.abs(Math.round((newMax || budget.max) * 100) / 100),
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

  const openConfirmModal = (action, message) => {
    setConfirmModalVisible(true);
    setConfirmProps({ action, message });
  };

  const selectBudget = (id) => setSelectedBudget(id);
  const handleBgClick = (e) =>
    e.target.classList.contains("bgRef") && setSelectedBudget(0);

  const budgetsContext = {
    budgets,
    addNewBudget,
    updateBudget,
    deleteBudget,
    selectBudget,
    selectedBudget,
  };

  return (
    <div className="bgRef justify-center border-black p-8 bg-slate-700 min-h-screen min-w-[320px]">
      <div className="relative max-w-5xl mx-auto">
        <BudgetsContext.Provider value={budgetsContext}>
          <NavBar setSettingsModalVisible={setSettingsModalVisible} />
          <BudgetButtons openConfirmModal={openConfirmModal} />
          <SettingsModal
            settingsModalVisible={settingsModalVisible}
            setSettingsModalVisible={setSettingsModalVisible}
          />
          <ConfirmModal
            confirmModalVisible={confirmModalVisible}
            setConfirmModalVisible={setConfirmModalVisible}
            action={confirmProps.action}
            message={confirmProps.message}
          />
        </BudgetsContext.Provider>
      </div>
    </div>
  );
}
