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
    input &&
    updateBudget({ id, newRemaining: Math.max(remaining - input, 0) });

  const onAddClick = () =>
    input &&
    input > 0 &&
    updateBudget({ id, newRemaining: Math.min(remaining + input, max) });

  const onMaxClick = () =>
    input &&
    (remaining > input
      ? updateBudget({ id, newMax: input, newRemaining: input })
      : updateBudget({ id, newMax: input }));

  const hideTitleSubmitButtonAfterTime = () =>
    setTimeout(() => setTitleSubmitVisible(false), 200);

  const onTitleChangeClick = () =>
    titleValue && updateBudget({ id, newTitle: titleValue });

  const onBoxClick = () => selectBudget(id);
  const onMoreOptionsClick = () => setMoreOptionsVisible(true);
  const onDeleteClick = () => deleteBudget(id);
  const trackInput = (newValue) => setInput(parseInt(newValue));
  const trackTitle = (newTitle) => setTitleValue(newTitle);

  const colorHover = (color) =>
    `text-${color}-400 border-${color}-400 hover:bg-${color}-400 hover:text-slate-800 bg-${color}-400/10`;
  const adjustmentButtonsClass =
    "items-center justify-center min-h-32 font-semibold text-4xl md:text-5xl rounded-xl border-8 p-1 w-full";

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
        <div className="flex flex-col border-8 bg-slate-800 border-slate-300 rounded-lg w-full p-2 md:p-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-2">
            <input
              autoFocus={true}
              placeholder="0"
              maxLength={5}
              value={input || ""}
              onFocus={() => setInput(0)}
              onChange={(e) => trackInput(e.target.value)}
              className="rounded-xl bg-slate-900 min-h-32 text-4xl sm:text-6xl w-full md:w-1/2 outline-none border-slate-300 border-4 text-slate-300 font-semibold px-4 mb-2"
            ></input>
            <div className="hidden md:flex flex-col items-end w-[25%]">
              <p className="text-6xl text-slate-300 font-extrabold">
                {`$${remaining}`}
              </p>
              <p className="text-3xl text-slate-300 font-normal">
                {` / $${max}`}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-10 h-auto justify-between">
            <button
              onClick={() => onSubClick()}
              className=" w-full min-h-32 font-semibold text-4xl sm:text-5xl md:text-6xl rounded-xl border-8 p-1 bg-red-400/10 text-red-500 border-red-400 hover:bg-red-400 hover:text-slate-800"
            >
              subtract
            </button>
            <button
              onClick={() => onMoreOptionsClick()}
              className={`text-slate-500 min-h-20 font-semibold text-5xl ${
                moreOptionsVisible ? "hidden" : "block"
              }`}
            >
              more options
            </button>
            <div
              className={`gap-2 sm:gap-4 md:gap-6 justify-between pb-2 min-h-20 ${
                moreOptionsVisible ? "flex flex-col sm:flex-row" : "hidden"
              }`}
            >
              <button
                onClick={() => onAddClick()}
                className={`${
                  adjustmentButtonsClass + " " + colorHover("green")
                } `}
              >
                add
              </button>
              <button
                onClick={() => onMaxClick()}
                className={`${
                  adjustmentButtonsClass + " " + colorHover("purple")
                } `}
              >
                max
              </button>
              <button
                onClick={() => onDeleteClick()}
                className={`${
                  adjustmentButtonsClass + " " + colorHover("red")
                }`}
              >
                delete
              </button>
            </div>
            <div>
              <input
                placeholder="rename"
                maxLength={20}
                onFocus={() => setTitleSubmitVisible(true)}
                onBlur={() => hideTitleSubmitButtonAfterTime()}
                onChange={(e) => trackTitle(e.target.value)}
                className={`${
                  moreOptionsVisible ? "flex" : "hidden"
                } mx-auto rounded-xl bg-slate-900 min-h-32 text-4xl sm:text-6xl w-full outline-none border-slate-300 border-4 text-slate-300 font-semibold px-4 mb-4`}
              ></input>
              <button
                onClick={() => onTitleChangeClick()}
                className={`${
                  adjustmentButtonsClass + " " + colorHover("blue")
                } ${titleSubmitVisible ? "flex" : "hidden"} `}
              >
                confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
