"use client"
import { format, isSameDay } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCamera } from "react-icons/fa6";
import { FiLink } from "react-icons/fi";
import { RiGalleryLine } from "react-icons/ri";
import ChatWindowHeader from "./ChatWindowHeader";


export default function ChatWindow({ chat, onBack }) {
  const [messageOptionsIdx, setMessageOptionsIdx] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const docInputRef = useRef(null);
  const chatEndRef = useRef(null);
  if (!chat || !chat.id) {
    return <div>Error: Chat not found.</div>;
  }

  const [messages, setMessages] = useState(() => {
    const savedChat = chat ? localStorage.getItem(`chat-${chat.id}`) : null;
    return savedChat ? JSON.parse(savedChat) : chat?.messages || [];
  });

  useEffect(() => {
    if (chat?.id) {
      localStorage.setItem(`chat-${chat.id}`, JSON.stringify(messages));
    }
  }, [messages, chat?.id]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleDeleteMessage = (index) => {
    const updatedMessages = messages.filter((_, i) => i !== index);
    setMessages(updatedMessages);
    setMessageOptionsIdx(null);
  };

  const handleSend = () => {
    const trimmed = newMessage.trim();
    if (!trimmed) return;

    const timestamp = new Date().toISOString();

    const messageObj = {
      from: "user",
      text: trimmed,
      timestamp,
    };

    setMessages((prev) => [...prev, messageObj]);
    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const timestamp = new Date().toISOString();

      const messageObj = {
        from: "user",
        image: reader.result,
        timestamp,
      };

      setMessages((prev) => [...prev, messageObj]);
    };

    reader.readAsDataURL(file);
  };

  const handleDocUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const timestamp = new Date().toISOString();

    const messageObj = {
      from: "user",
      file: {
        name: file.name,
        type: file.type,
      },
      timestamp,
    };

    setMessages((prev) => [...prev, messageObj]);
  };

  const formatText = (text) => {
    return text.split(/\s/).map((word, i) =>
      /\S+@\S+\.\S+/.test(word) ? (
        <a key={i} href={`mailto:${word}`} className="text-blue-600 underline">
          {word}
        </a>
      ) : (
        `${word} `
      )
    );
  };

  return (
    <div className="w-full flex flex-col bg-gray-50 relative h-screen md:h-[464px]">
      <ChatWindowHeader chat={chat} onBack={onBack} />

      <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar bg-[#D9D9D9]/[10%]">
        {(() => {
          let lastDate = null;
          return messages.map((msg, idx) => {
            const msgDate = msg.timestamp
              ? new Date(msg.timestamp)
              : new Date();
            if (isNaN(msgDate.getTime())) return null;

            const showDate =
              !lastDate || !isSameDay(new Date(lastDate), msgDate);
            lastDate = msgDate;

            return (
              <div key={idx} className="space-y-1 relative group">
                {showDate && (
                  <div className="sticky top-0 z-10 flex justify-center my-4">
                    <span className="bg-white text-xs text-gray-500 px-4 py-1 rounded-md shadow">
                      {format(msgDate, "MMM dd, yyyy")}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-start space-x-3">
                  <div className="flex flex-row gap-5 items-start">
                    <img
                      src={
                        msg.from === "user"
                          ? "/src/assets/CompanyHome/Profile.png"
                          : chat.avatar
                      }
                      alt="avatar"
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-black text-sm">
                        {chat.name}
                      </div>
                      <div className="py-3 mt-1 max-w-md">
                        {msg.text && (
                          <div className="text-gray-700 text-sm whitespace-pre-line">
                            {formatText(msg.text)}
                          </div>
                        )}
                        {msg.image && (
                          <img
                            src={msg.image}
                            alt="sent"
                            className="mt-2 rounded-md max-w-xs border border-slate-200 cursor-pointer"
                            onClick={() => setSelectedImage(msg.image)}
                          />
                        )}
                        {msg.file && (
                          <div className="mt-2 flex items-center gap-2 border rounded-md p-2 max-w-xs bg-white text-sm">
                            <span className="font-medium">{msg.file.name}</span>
                            <a
                              href="#"
                              className="text-blue-600 underline text-xs"
                              onClick={(e) => e.preventDefault()}
                            >
                              Open
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 mt-2">
                      {format(msgDate, "hh:mm a")}
                    </span>
                    <div className="relative">
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        onClick={() =>
                          setMessageOptionsIdx(
                            messageOptionsIdx === idx ? null : idx
                          )
                        }
                      >
                        <BsThreeDotsVertical  />
                      </button>
                      {messageOptionsIdx === idx && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10">
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 text-sm"
                            onClick={() => handleDeleteMessage(idx)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          });
        })()}
        <div ref={chatEndRef} />
      </div>

      <div className="bg-[#D9D9D9]/[10%] flex flex-col sticky bottom-0 gap-2">
        <div className="flex border-y border-black/10 py-4 items-center gap-2 px-4">
          <input
            type="text"
            placeholder="Write a message..."
            className="flex-1 pb-2 font-normal text-[13px] bg-[#D9D9D9]/[10%] outline-none px-2"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="flex justify-between items-center px-4 py-2 pb-3">
          <div className="flex gap-1">
            <div
              className="bg-[#CFE6CC] cursor-pointer border border-transparent rounded-sm py-2 px-2 hover:bg-transparent hover:border-[#0F8200]"
              onClick={() => fileInputRef.current.click()}
            >
              <RiGalleryLine className="text-primary"/>
              {/* <Image /> */}
              <input
                type="file"
                src="*"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            <div
              className="bg-[#CFE6CC] cursor-pointer border border-transparent rounded-sm py-2 px-2 hover:bg-transparent hover:border-[#0F8200]"
              onClick={() => docInputRef.current.click()}
              >
                <FiLink className="text-primary"/>
              {/* <Pin /> */}
              <input
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.zip,.mp4,.mp3"
                ref={docInputRef}
                onChange={handleDocUpload}
                className="hidden"
                />
            </div>

            <div className="bg-[#CFE6CC] cursor-pointer border border-transparent rounded-sm py-2 px-2 hover:bg-transparent hover:border-[#0F8200]">
              {/* <Camara /> */}
                <FaCamera className="text-primary"/> 
            </div>
          </div>

          <button
            onClick={handleSend}
            className="bg-[#0F8200] text-white text-[13px] font-normal px-4 py-1 rounded-[2px] hover:bg-green-700"
          >
            Send
          </button>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full View"
            className="max-h-full max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
