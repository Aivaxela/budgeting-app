export default function BudgetButton({ title, remaining, max }) {
  return (
    <div>
      <h2 className="text-slate-300 text-center text-[22px]">{title}</h2>
      <div className="border-8px rounded-3xl p-2">
        <p className="text-[75px] text-slate-300 font-extrabold text-left pl-4">
          {`$${remaining}`}
        </p>
        <p className="text-[30px] text-slate-300 font-normal text-right pr-4">
          {` / $${max}`}
        </p>
      </div>
    </div>
  );
}
