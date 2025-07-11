
import logo from "../../../assets/Form/Logo.png";

export default function DefaultChatView() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Chat Logo" className="" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Welcome to Your Inbox
        </h2>
        <p className="text-gray-500 text-sm">
          Select a chat from the left panel to start messaging or pick a contact
          to begin a new conversation.
        </p>
      </div>
    </div>
  );
}
