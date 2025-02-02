import { useEffect, useState } from "react";

export default function BudgetButton({
  title,
  remaining,
  max,
  id,
  deleteBudget,
  selectBudget,
  selectedBudget,
  updateBudget,
}) {
  const [progressBarValue, setProgressBarValue] = useState(0);
  const [moreOptionsVisible, setMoreOptionsVisible] = useState(false);
  const [titleSubmitVisible, setTitleSubmitVisible] = useState(false);
  const [input, setInput] = useState(0);
  const [titleValue, setTitleValue] = useState(title);

  useEffect(() => {
    if (selectedBudget !== id) setMoreOptionsVisible(false);
  }, [selectedBudget, id]);

  useEffect(() => {
    setProgressBarValue(Math.floor((remaining / max) * 100));
  }, [remaining, max]);

  const onSubClick = () =>
    input > 0 &&
    updateBudget({ id, newRemaining: Math.max(remaining - input, 0) });

  const onAddClick = () =>
    input > 0 &&
    updateBudget({ id, newRemaining: Math.min(remaining + input, max) });

  const onMaxClick = () =>
    remaining > input
      ? updateBudget({ id, newMax: input, newRemaining: input })
      : updateBudget({ id, newMax: input });

  const onBoxClick = () => selectBudget(id);
  const onMoreOptionsClick = () => setMoreOptionsVisible(true);
  const onDeleteClick = () => deleteBudget(id);
  const trackInput = (newValue) => setInput(parseInt(newValue));
  const trackTitle = (newTitle) => updateBudget({ id, newTitle: newTitle });

  const adjustmentButtonsClass =
    "items-center justify-center text-slate-300 min-h-32 font-semibold text-[20px] sm:text-[24px] md:text-[34px] rounded-xl border-8 p-1 w-full";

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-slate-400 font-semibold italic text-center text-[20px] md:text-[30px] mb-2">
        {title}
      </h2>
      {selectedBudget !== id ? (
        <button
          onClick={() => onBoxClick()}
          className=" flex flex-col border-8 border-slate-300 rounded-3xl w-full max-w-[448px] p-4 hover:bg-slate-300 group"
        >
          <p className="text-[50px] md:text-[95px] text-slate-300 font-extrabold text-left pl-4 group-hover:text-slate-800">
            {`$${remaining}`}
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
        <div className="flex flex-col border-8 border-slate-300 rounded-3xl w-full p-2 md:p-4 max-w-[448px]">
          <div className="flex flex-col md:flex-row items-center mb-2">
            <input
              autoFocus={true}
              placeholder="0"
              maxLength={10}
              value={input || ""}
              onFocus={() => setInput(0)}
              onChange={(e) => trackInput(e.target.value)}
              className="rounded-xl bg-slate-900 min-h-32 text-4xl sm:text-6xl w-[95%] md:w-[75%] outline-none border-slate-300 border-4 text-slate-300 font-semibold px-2"
            ></input>
            <div className="hidden md:flex flex-col items-end w-[25%]">
              <p className="text-[30px] text-slate-300 font-extrabold">
                {`$${remaining}`}
              </p>
              <p className="text-[24px] text-slate-300 font-normal">
                {` / $${max}`}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 h-auto justify-between">
            <button
              onClick={() => onSubClick()}
              className=" w-full min-h-32 font-semibold text-4xl sm:text-5xl md:text-6xl rounded-xl border-8 p-1 text-red-400 border-red-400 hover:bg-red-400 hover:text-slate-800"
            >
              subtract
            </button>
            <button
              onClick={() => onMoreOptionsClick()}
              className="text-slate-300 min-h-20 font-semibold text-4xl"
            >
              - more options -
            </button>
            <div
              className={`gap-1 justify-between pb-2 min-h-20 ${
                moreOptionsVisible ? "flex" : "hidden"
              }`}
            >
              <button
                onClick={() => onAddClick()}
                className={`${adjustmentButtonsClass} text-green-400 border-green-400 hover:bg-green-400 hover:text-slate-800`}
              >
                add
              </button>
              <button
                onClick={() => onMaxClick()}
                className={`${adjustmentButtonsClass} text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-slate-800`}
              >
                max
              </button>
              <button
                onClick={() => onDeleteClick()}
                className={`${adjustmentButtonsClass} text-red-400 border-red-400 hover:bg-red-400 hover:text-slate-800`}
              >
                delete
              </button>
            </div>

            <input
              placeholder="rename"
              maxLength={20}
              onFocus={() => setTitleSubmitVisible(true)}
              onChange={(e) => trackTitle(e.target.value)}
              className={`${
                moreOptionsVisible ? "flex" : "hidden"
              } mx-auto rounded-xl bg-slate-900 min-h-32 text-4xl sm:text-6xl w-full outline-none border-slate-300 border-4 text-slate-300 font-semibold px-2`}
            ></input>
            <button
              className={`${adjustmentButtonsClass} ${
                titleSubmitVisible ? "flex" : "hidden"
              }  text-red-400 border-red-400 hover:bg-red-400 hover:text-slate-800`}
            >
              confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
