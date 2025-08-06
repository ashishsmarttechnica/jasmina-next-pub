"use client";
import { getMessages, sendMessage } from "@/api/chat.api";
import { format, isSameDay } from "date-fns";
import Cookies from "js-cookie";
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
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const docInputRef = useRef(null);
  const chatEndRef = useRef(null);
  console.log(messages, "messages");
  // Get current user ID from cookies
  const currentUserId = Cookies.get("userId");

  if (!chat || !chat.id) {
    return <div>Error: Chat not found.</div>;
  }

  // Fetch messages when chat changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (!chat.roomId) return;

      setLoading(true);
      setError(null);
      try {
        const response = await getMessages(chat.roomId);
        if (response.success) {
          console.log(response.data.messages, "response.data.messages");

          // Transform API messages to match the expected format
          const transformedMessages = response.data.messages.map((msg) => ({
            from: msg.sender === currentUserId ? "user" : "other",
            text: msg.content,
            timestamp: msg.createdAt,
            _id: msg._id,

            seen: msg.seen,
          }));
          setMessages(transformedMessages);
        } else {
          setError("Failed to fetch messages");
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError(err.message || "Failed to fetch messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chat.roomId, currentUserId]);

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

  const handleSend = async () => {
    const trimmed = newMessage.trim();
    if (!trimmed) return;

    const timestamp = new Date().toISOString();

    const messageObj = {
      from: "user",
      text: trimmed,
      timestamp,
    };

    // Optimistically add the message to the UI
    setMessages((prev) => [...prev, messageObj]);
    setNewMessage("");

    try {
      await sendMessage({
        senderId: currentUserId,
        receiverId: chat.id, // Update this if your chat object uses a different field for receiver
        content: trimmed,
      });
      // Optionally, refetch messages or update the last message with server data
    } catch (error) {
      setError("Failed to send message");
    }
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
    <div className="relative flex h-screen w-full flex-col bg-gray-50 md:h-[464px]">
      <ChatWindowHeader chat={chat} onBack={onBack} />

      <div className="no-scrollbar flex-1 space-y-6 overflow-y-auto bg-[#D9D9D9]/[10%] p-4">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="text-gray-500">Loading messages...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center py-8">
            <div className="text-red-500">
              Error: {error}
              <button
                className="ml-2 text-blue-500 underline"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center py-8">
            <div className="text-gray-500">No messages yet. Start a conversation!</div>
          </div>
        ) : (
          (() => {
            let lastDate = null;
            return messages.map((msg, idx) => {
              const msgDate = msg.timestamp ? new Date(msg.timestamp) : new Date();
              if (isNaN(msgDate.getTime())) return null;

              const showDate = !lastDate || !isSameDay(new Date(lastDate), msgDate);
              lastDate = msgDate;

              return (
                <div key={idx} className="group relative space-y-1">
                  {showDate && (
                    <div className="sticky top-0 z-10 my-4 flex justify-center">
                      <span className="rounded-md bg-white px-4 py-1 text-xs text-gray-500 shadow">
                        {format(msgDate, "MMM dd, yyyy")}
                      </span>
                    </div>
                  )}

                  <div className="flex items-start justify-between space-x-3">
                    <div className="flex flex-row items-start gap-5">
                      <img
                        src={
                          msg.from === "user"
                            ? "/src/assets/CompanyHome/Profile.png"
                            : chat.avatar || "/src/assets/CompanyHome/Profile.png"
                        }
                        alt="avatar"
                        className="h-9 w-9 rounded-full object-cover"
                        onError={(e) => {
                          e.target.src = "/src/assets/CompanyHome/Profile.png";
                        }}
                      />
                      <div>
                        <div className="text-sm font-medium text-black">
                          {msg.from === "user" ? "You" : chat.name}
                        </div>
                        <div className="mt-1 max-w-md py-3">
                          {msg.text && (
                            <div className="text-sm whitespace-pre-line text-gray-700">
                              {formatText(msg.text)}
                            </div>
                          )}
                          {msg.image && (
                            <img
                              src={msg.image}
                              alt="sent"
                              className="mt-2 max-w-xs cursor-pointer rounded-md border border-slate-200"
                              onClick={() => setSelectedImage(msg.image)}
                            />
                          )}
                          {msg.file && (
                            <div className="mt-2 flex max-w-xs items-center gap-2 rounded-md border bg-white p-2 text-sm">
                              <span className="font-medium">{msg.file.name}</span>
                              <a
                                href="#"
                                className="text-xs text-blue-600 underline"
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
                      <span className="mt-2 text-xs text-gray-400">
                        {format(msgDate, "hh:mm a")}
                      </span>
                      <div className="relative">
                        <button
                          className="text-gray-400 hover:text-gray-600"
                          onClick={() =>
                            setMessageOptionsIdx(messageOptionsIdx === idx ? null : idx)
                          }
                        >
                          <BsThreeDotsVertical />
                        </button>
                        {messageOptionsIdx === idx && (
                          <div className="absolute right-0 z-10 mt-2 w-32 rounded border bg-white shadow">
                            <button
                              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
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
          })()
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="sticky bottom-0 flex flex-col gap-2 bg-[#D9D9D9]/[10%]">
        <div className="flex items-center gap-2 border-y border-black/10 px-4 py-4">
          <input
            type="text"
            placeholder="Write a message..."
            className="flex-1 bg-[#D9D9D9]/[10%] px-2 pb-2 text-[13px] font-normal outline-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="flex items-center justify-between px-4 py-2 pb-3">
          <div className="flex gap-1">
            <div
              className="cursor-pointer rounded-sm border border-transparent bg-[#CFE6CC] px-2 py-2 hover:border-[#0F8200] hover:bg-transparent"
              onClick={() => fileInputRef.current.click()}
            >
              <RiGalleryLine className="text-primary" />
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
              className="cursor-pointer rounded-sm border border-transparent bg-[#CFE6CC] px-2 py-2 hover:border-[#0F8200] hover:bg-transparent"
              onClick={() => docInputRef.current.click()}
            >
              <FiLink className="text-primary" />
              {/* <Pin /> */}
              <input
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.zip,.mp4,.mp3"
                ref={docInputRef}
                onChange={handleDocUpload}
                className="hidden"
              />
            </div>

            <div className="cursor-pointer rounded-sm border border-transparent bg-[#CFE6CC] px-2 py-2 hover:border-[#0F8200] hover:bg-transparent">
              {/* <Camara /> */}
              <FaCamera className="text-primary" />
            </div>
          </div>

          <button
            onClick={handleSend}
            className="rounded-[2px] bg-[#0F8200] px-4 py-1 text-[13px] font-normal text-white hover:bg-green-700"
          >
            Send
          </button>
        </div>
      </div>

      {selectedImage && (
        <div
          className="bg-opacity-90 fixed inset-0 z-50 flex items-center justify-center bg-black"
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
