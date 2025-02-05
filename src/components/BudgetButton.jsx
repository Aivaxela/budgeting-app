import { useEffect, useState } from "react";
import {
  TiMinusOutline,
  TiTrash,
  TiMediaEjectOutline,
  TiPlusOutline,
  TiTickOutline,
  TiPencil,
} from "react-icons/ti";

export default function BudgetButton({
  title,
  remaining,
  max,
  id,
  deleteBudget,
  selectBudget,
  selectedBudget,
  updateBudget,
  openConfirmModal,
}) {
  const [input, setInput] = useState(0);
  const [progressBarValue, setProgressBarValue] = useState(0);
  const [titleValue, setTitleValue] = useState(title);
  const [renameVisible, setRenameVisible] = useState(false);
  const [titleSubmitVisible, setTitleSubmitVisible] = useState(false);

  useEffect(() => {
    if (selectedBudget !== id) setRenameVisible(false);
  }, [selectedBudget, id]);

  useEffect(() => {
    setProgressBarValue(Math.floor((remaining / max) * 100));
  }, [remaining, max]);

  const onSubClick = () =>
    input > 0 && input && updateBudget({ id, newRemaining: remaining - input });

  const onAddClick = () =>
    input &&
    input > 0 &&
    updateBudget({ id, newRemaining: Math.min(remaining + input, max) });

  const onMaxClick = () =>
    input &&
    (remaining > input
      ? updateBudget({ id, newMax: input, newRemaining: input })
      : updateBudget({ id, newMax: input }));

  const hideRenamingElsAfterTime = () => {
    setTimeout(() => {
      setTitleSubmitVisible(false);
      setRenameVisible(false);
    }, 200);
  };

  const onTitleChangeClick = () =>
    titleValue && updateBudget({ id, newTitle: titleValue });

  const trackInput = (newValue) => {
    newValue.length <= 10 &&
      setInput(Math.round(parseFloat(newValue) * 100) / 100);
  };

  const trackTitle = (newTitle) => setTitleValue(newTitle);
  const onBoxClick = () => selectBudget(id);
  const onRenameClick = () => setRenameVisible(true);
  const onDeleteClick = () => deleteBudget(id);

  const colorHover = (color) =>
    `text-slate-800 hover:text-${color}-400 border-${color}-400 bg-${color}-400 hover:bg-slate-800`;
  const adjustmentButtonsClass =
    "items-center justify-items-center w-[calc(height)] font-semibold text-6xl md:text-8xl rounded-full border-8 p-1 w-full";

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-slate-200 font-medium italic self-start px-10 py-1 text-xl md:text-3xl mb-2 pl-10 bg-slate-600 rounded-lg">
        {title}
      </h2>
      {selectedBudget !== id ? (
        <button
          onClick={() => onBoxClick()}
          className=" flex flex-col border-8 bg-slate-800 border-slate-300 rounded-md w-full p-4 hover:bg-slate-300 group shadow-2xl"
        >
          <p className="text-[50px] md:text-[95px] text-slate-300 font-extrabold text-left pl-4 group-hover:text-slate-800">
            {`${remaining >= 0 ? "$" + remaining : "-$" + Math.abs(remaining)}`}
          </p>
          <p className="text-[28px] md:text-[46px] text-slate-400 font-normal text-right pr-4 pb-2 group-hover:text-slate-800 self-end">
            {` / $${max}`}
          </p>
          <div
            style={{
              width: progressBarValue.toString() + "%",
              transition: "width 0.5s, background-color 0.5s",
            }}
            className={`${
              progressBarValue > 35 ? "bg-green-400" : "bg-red-400"
            } h-10 mt-auto rounded-xl`}
          ></div>
        </button>
      ) : (
        <div className="flex flex-col border-8 bg-slate-800 border-slate-300 rounded-lg w-full p-2 md:p-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-2">
            <div className="hidden md:flex flex-col self-start w-[25%]">
              <p className="text-6xl text-slate-300 font-extrabold">
                {`$${remaining}`}
              </p>
              <p className="text-3xl text-slate-300 font-normal">
                {` / $${max}`}
              </p>
            </div>
            <input
              type="number"
              pattern="/^\d+(\.\d+)?$/"
              autoFocus={true}
              placeholder="0"
              value={input || ""}
              onFocus={() => setInput(0)}
              onChange={(e) => trackInput(e.target.value)}
              className="rounded-xl bg-slate-900 min-h-32 text-4xl sm:text-6xl w-full md:w-1/2 outline-none border-slate-300 border-4 text-slate-300 font-semibold px-4 mb-8"
            ></input>
          </div>
          <div className="flex gap-2 h-auto justify-between">
            <div className="grid grid-cols-2 w-[50%] gap-4">
              <button
                onClick={() => onAddClick()}
                className={`${
                  adjustmentButtonsClass + " " + colorHover("green")
                }`}
              >
                <TiPlusOutline />
              </button>
              <button
                onClick={() =>
                  openConfirmModal(onMaxClick, `Set new max to: $${input}?`)
                }
                className={`${
                  adjustmentButtonsClass + " " + colorHover("purple")
                } `}
              >
                <TiMediaEjectOutline />
              </button>
              <button
                onClick={() =>
                  openConfirmModal(onDeleteClick, "Delete this budget?")
                }
                className={`${
                  adjustmentButtonsClass + " " + colorHover("red")
                } `}
              >
                <TiTrash />
              </button>
              <button
                onClick={() => onRenameClick()}
                onBlur={() => titleSubmitVisible && hideRenamingElsAfterTime()}
                className={`${
                  adjustmentButtonsClass + " " + colorHover("blue")
                } `}
              >
                <TiPencil />
              </button>
            </div>
            <button
              onClick={() => onSubClick()}
              className={`${
                adjustmentButtonsClass + " " + colorHover("red")
              } w-[50%]`}
            >
              <TiMinusOutline />
            </button>
          </div>
          <div>
            <input
              placeholder="rename"
              maxLength={20}
              onFocus={() => setTitleSubmitVisible(true)}
              onBlur={() => hideRenamingElsAfterTime()}
              onChange={(e) => trackTitle(e.target.value)}
              className={`${
                renameVisible ? "mt-12" : "hidden"
              } flex mx-auto rounded-xl bg-slate-900 min-h-32 text-4xl sm:text-6xl w-full outline-none border-slate-300 border-4 text-slate-300 font-semibold px-4 mb-4`}
            ></input>
            <button
              onClick={() => onTitleChangeClick()}
              className={`${
                adjustmentButtonsClass + " " + colorHover("blue")
              } ${titleSubmitVisible ? "" : "hidden"} `}
            >
              <TiTickOutline />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
