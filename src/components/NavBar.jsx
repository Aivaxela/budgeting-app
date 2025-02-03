export default function NavBar({ setSettingsModalVisible }) {
  return (
    <div className="fixed top-0 left-0 w-full p-4 backdrop-blur-xl backdrop-brightness-90">
      <div className="bgRef flex items-center justify-between max-w-5xl mx-auto">
        <h1 className="bgRef font-extrabold text-4xl md:text-6xl text-center text-slate-300 opacity-75">
          NBS Budget
        </h1>
        <button
          onClick={() => setSettingsModalVisible(true)}
          className="font-extrabold text-3xl md:text-4xl opacity-50 hover:opacity-100 rounded-full border-8 h-20 w-20 bg-slate-800 hover:bg-slate-300 border-slate-800 text-slate-300 hover:text-slate-800 p-2"
        >
          ⚙
        </button>
      </div>
    </div>
  );
}
