import { useEffect } from "react";
import DataHandler from "../utils/dataHandler";
import { TiDownload } from "react-icons/ti";

const dataHandler = new DataHandler();

export default function SettingsModal({
  settingsModalVisible,
  setSettingsModalVisible,
}) {
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
      } bgRef items-center justify-center bg-black/75 w-screen h-screen top-0 left-0 fixed`}
    >
      <div className="bg-slate-700 rounded-3xl shadow-2xl border-slate-600 border-8">
        <div className="flex flex-col p-20">
          <button
            onClick={() => dataHandler.downloadData()}
            className="font-semibold text-5xl md:text-7xl justify-items-center rounded-full mb-2 border-8 bg-slate-800 hover:bg-slate-300 border-slate-800 text-slate-300 hover:text-slate-800 p-4 w-full"
          >
            <TiDownload />
          </button>
          <p className="text-slate-400 text-3xl text-center">Download Data</p>
        </div>
      </div>
    </div>
  );
}
