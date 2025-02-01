export default function NavBar() {
  return (
    <div className="fixed top-0 left-0 w-full p-4 backdrop-blur-xl backdrop-brightness-50">
      <div className="flex justify-between max-w-5xl mx-auto">
        <h1 className="font-extrabold text-4xl md:text-6xl text-center text-slate-300 opacity-75">
          NBS Budget
        </h1>
        <button className="text-slate-300 text-3xl border-8 border-slate-300 font-bold rounded-3xl p-2 bg-slate-800 opacity-75">
          Select Profile
        </button>
      </div>
    </div>
  );
}
