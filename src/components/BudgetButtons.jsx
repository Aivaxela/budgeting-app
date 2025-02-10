import BudgetButton from "./BudgetButton";
import { useContext } from "react";
import { BudgetsContext } from "../contexts/BudgetsContext";

export default function BudgetButtons({ openConfirmModal }) {
  const {
    budgets,
    deleteBudget,
    selectBudget,
    selectedBudget,
    updateBudget,
    addNewBudget,
  } = useContext(BudgetsContext);

  return (
    <div className="flex flex-col gap-8 mt-28">
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
            openConfirmModal={openConfirmModal}
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
  );
}
