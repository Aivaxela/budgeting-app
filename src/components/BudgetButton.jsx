import { useEffect, useState } from "react";

export default function BudgetButton({ title, remaining, max }) {
  const [progressBarValue, setProgressBarValue] = useState(0);
  const [remainingValue, setRemainingValue] = useState(remaining);
  const [maxValue, setMaxValue] = useState(max);
  const [buttonState, setButtonState] = useState("view");
  const [inputValue, setInputValue] = useState(0);

  const onBoxClick = () => {
    setButtonState("adjust");
  };

  const onAddClick = () => {
    setRemainingValue((prev) =>
      Math.min(prev + parseInt(inputValue), maxValue)
    );
    setButtonState("view");
  };

  const onSubClick = () => {
    setRemainingValue((prev) => Math.max(prev - parseInt(inputValue), 0));
    setButtonState("view");
  };

  const onMaxClick = () => {
    setMaxValue(parseInt(inputValue));
    if (remainingValue > parseInt(inputValue)) {
      setRemainingValue(parseInt(inputValue));
    }
  };

  const onBackClick = () => {
    setButtonState("view");
  };

  const adjustmentButtonsClass =
    "text-slate-300 font-semibold text-[16px] sm:text-[18px] md:text-[28px] rounded-xl border-8 p-1 w-full";

  useEffect(() => {
    setProgressBarValue(Math.floor((remainingValue / maxValue) * 100));
  }, [remainingValue, maxValue]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-slate-400 font-semibold italic text-center text-[20px] md:text-[30px] mb-2">
        {title}
      </h2>
      {buttonState === "view" && (
        <button
          onClick={() => onBoxClick()}
          className=" flex flex-col border-8 border-slate-300 rounded-3xl w-full max-w-[448px] p-4 hover:bg-slate-300 group"
        >
          <p className="text-[50px] md:text-[95px] text-slate-300 font-extrabold text-left pl-4 group-hover:text-slate-800">
            {`$${remainingValue}`}
          </p>
          <p className="text-[28px] md:text-[46px] text-slate-400 font-normal text-right pr-4 pb-2 group-hover:text-slate-800 self-end">
            {` / $${maxValue}`}
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
      )}
      {buttonState === "adjust" && (
        <div className="flex flex-col border-8 border-slate-300 rounded-3xl w-full p-2 md:p-4 max-w-[448px]">
          <div className="flex flex-col md:flex-row items-center mb-2 md:mb-8">
            <input
              placeholder="0"
              maxLength={10}
              onClick={() => setInputValue("")}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="rounded-xl bg-slate-900 text-5xl sm:text-[50px] w-[95%] md:w-[75%] outline-none border-slate-300 border-4 text-slate-300 font-semibold px-2"
            ></input>
            <div className="hidden md:flex flex-col items-end w-[25%]">
              <p className="text-[30px] text-slate-300 font-extrabold">
                {`$${remainingValue}`}
              </p>
              <p className="text-[24px] text-slate-300 font-normal">
                {` / $${maxValue}`}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 h-auto justify-between">
            <button
              onClick={() => onSubClick()}
              className=" w-full font-semibold text-[16px] sm:text-[18px] md:text-[28px] rounded-xl border-8 p-1 text-red-400 border-red-400 hover:bg-red-400 hover:text-slate-800"
            >
              subtract
            </button>
            <div className="flex gap-4 justify-between">
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
                onClick={() => onBackClick()}
                className={`${adjustmentButtonsClass} text-gray-400 border-gray-400 hover:bg-gray-400 hover:text-slate-800`}
              >
                back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
