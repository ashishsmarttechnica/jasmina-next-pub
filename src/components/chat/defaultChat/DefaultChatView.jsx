"use client";
// import logo from "@/assets/form/logo.png";
// import Image from "next/image";

export default function DefaultChatView() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <div className="mb-6 flex justify-center">
          {/* <Image src={logo} alt="Chat Logo" className="" /> */}
        </div>
        <h2 className="mb-2 text-2xl font-semibold text-gray-800">Welcome to Your Inbox</h2>
        <p className="text-sm text-gray-500">
          Select a chat from the left panel to start messaging or pick a contact to begin a new
          conversation.
        </p>
      </div>
    </div>
  );
}
