import { useEffect } from "react";
import DataHandler from "../utils/dataHandler";

const dataHandler = new DataHandler();

export default function ({ settingsModalVisible, setSettingsModalVisible }) {
  useEffect(() => {
    document.addEventListener("click", handleBgClick);
    return () => document.removeEventListener("click", handleBgClick);
  }, []);

  const handleBgClick = (e) =>
    e.target.classList.contains("bgRef") && setSettingsModalVisible(false);

  return (
    <div
      className={`${
        settingsModalVisible ? "flex" : "hidden"
      } bgRef items-center justify-center bg-black/50 w-screen h-screen top-0 left-0 fixed`}
    >
      <div className="bg-slate-300 rounded-3xl border-slate-700 border-8">
        <div className="flex flex-col p-20">
          <button
            onClick={() => dataHandler.downloadData()}
            className="font-semibold text-5xl md:text-7xl rounded-xl border-8 bg-slate-800 hover:bg-slate-300 border-slate-800 text-slate-300 hover:text-slate-800 p-2 w-full"
          >
            Download data!
          </button>
        </div>
      </div>
    </div>
  );
}
