import { useEffect } from "react";

export default function ConfirmModal({
  message,
  action,
  confirmModalVisible,
  setConfirmModalVisible,
}) {
  useEffect(() => {
    document.addEventListener("click", handleBgClick);
    return () => document.removeEventListener("click", handleBgClick);
  }, []);

  const handleBgClick = (e) =>
    e.target.classList.contains("bgRef") && setConfirmModalVisible(false);

  const executeActionAndClose = () => {
    action();
    setConfirmModalVisible(false);
  };

  return (
    <div
      className={`${
        confirmModalVisible ? "flex" : "hidden"
      } bgRef items-center justify-center bg-black/75 w-screen h-screen top-0 left-0 fixed`}
    >
      <div className="bg-slate-700 rounded-3xl shadow-2xl border-slate-600 border-8">
        <div className="flex flex-col p-20">
          <button
            onClick={() => executeActionAndClose()}
            className="font-semibold text-5xl md:text-7xl rounded-xl border-8 bg-slate-800 hover:bg-slate-300 border-slate-800 text-slate-300 hover:text-slate-800 p-4 w-full"
          >
            {message}
          </button>
        </div>
      </div>
    </div>
  );
}
