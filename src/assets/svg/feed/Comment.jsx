function Comment({ isActive }) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        className={isActive ? "fill-primary" : "fill-none"}
      >
        <path
          d="M12.25 8.75C12.25 9.05942 12.1271 9.35616 11.9083 9.57496C11.6895 9.79375 11.3928 9.91667 11.0833 9.91667H4.08333L1.75 12.25V2.91667C1.75 2.60725 1.87292 2.3105 2.09171 2.09171C2.3105 1.87292 2.60725 1.75 2.91667 1.75H11.0833C11.3928 1.75 11.6895 1.87292 11.9083 2.09171C12.1271 2.3105 12.25 2.60725 12.25 2.91667V8.75Z"
          stroke="#888DA8"
          strokeWidth="1.16667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

export default Comment;
