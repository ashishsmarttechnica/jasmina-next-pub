const PlanCard = ({ title, dateRange, price, status }) => {
  return (
    <div className="mx-auto mb-6 flex w-[260px] max-w-[260px] flex-col items-center rounded-sm border border-slate-300 bg-white p-2 shadow-md">
      <h3 className="mb-1 text-center text-[14px] font-medium text-[#888DA8]">{title}</h3>
      <p className="mb-2 text-center text-[13px] whitespace-pre text-[#888DA8]/[70%]">
        {dateRange}
      </p>
      <p
        className={`mb-3 text-[12px] ${status === "pending" ? "text-yellow-600" : status === "completed" ? "text-green-600" : "text-red-600"}`}
      >
        Status: {status.charAt(0).toUpperCase() + status.slice(1)}
      </p>
      <div className="flex w-full justify-center">
        <span className="bg-secondary text-primary rounded-sm px-6 py-2 text-[13px]">{price}</span>
      </div>
    </div>
  );
};

export default PlanCard;
