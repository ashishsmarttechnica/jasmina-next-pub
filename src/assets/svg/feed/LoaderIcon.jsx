const LoaderIcon = ({ size = 18, color = "#888DA8" }) => (
  <svg
    className="animate-spin"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke={color} strokeWidth="4" />
    <path className="opacity-75" fill={color} d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
);

export default LoaderIcon;
