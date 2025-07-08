const CommonTitle = ({ title, className = "" }) => {
  return (
    <h2
      className={`w-full py-4 bg-white rounded-t-[5px] text-[20px] font-medium text-black text-left px-4 border-b-2 border-gray/50 ${className}`}
    >
      {title}
    </h2>
  );
};

export default CommonTitle;
