"use client";
import { getMessages, sendMessage } from "@/api/chat.api";
import useChatDndStore from "@/store/chatDnd.store";
// import { getChatSocket } from "@/utils/getChatSocket";
import { format, isSameDay } from "date-fns";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import ImageFallback from "../../../common/shared/ImageFallback";
import getImg from "../../../lib/getImg";
import useAuthStore from "../../../store/auth.store";
import { getChatSocket } from "../../../utils/socket";
import ChatWindowHeader from "./ChatWindowHeader";

export default function ChatWindow({ chat, onBack }) {
  const { user } = useAuthStore();
  console.log(user, "useruseruser");
  const t = useTranslations("Chat");

  const [messageOptionsIdx, setMessageOptionsIdx] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [pendingImages, setPendingImages] = useState([]); // File[] max 2
  const [pendingImagePreviews, setPendingImagePreviews] = useState([]); // string[]
  const [pendingDoc, setPendingDoc] = useState(null); // File | null
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { switchOn: isDndSwitchOn, checkDnd, error: dndError } = useChatDndStore();
  const fileInputRef = useRef(null);
  const docInputRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const textareaRef = useRef(null);
  const MAX_TEXTAREA_HEIGHT = 160;
  const hasInitialScrolledRef = useRef(false);
  // console.log(chat, "messages++++++++++++++");
  // Get current user ID from cookies
  const currentUserId = Cookies.get("userId");
  // Get current user avatar from cookies (ensure this is set at login)
  const currentUserAvatar = Cookies.get("userAvatar");

  useEffect(() => {
    useChatDndStore.getState().setSwitchOn(false);
  }, []);

  // Watch for DND state changes and broadcast them to backend
  useEffect(() => {
    if (isDndSwitchOn !== undefined) {
      console.log("[ChatWindow] DND state changed, broadcasting to backend", isDndSwitchOn);

      // Emit DND state change to backend
      const socket = getChatSocket(currentUserId);
      if (socket && socket.connected) {
        try {
          socket.emit("dnd_state_change", {
            userId: currentUserId,
            companyId: chat?.companyName ? chat?.conversationId : currentUserId,
            dndEnabled: isDndSwitchOn,
            conversationId: chat?.conversationId,
            roomId: chat?.roomId
          });
          console.log("[ChatWindow] DND state change emitted to backend");
        } catch (e) {
          console.error("[ChatWindow] error emitting DND state change to backend", e);
        }
      }
    }
  }, [isDndSwitchOn, currentUserId, chat?.companyName, chat?.conversationId, chat?.roomId]);

  // Debug: initial props/state
  console.log("[ChatWindow] init", {
    chat,
    currentUserId,
    currentUserAvatar,
    isDndSwitchOn,
    dndError,
    companyName: chat?.companyName,
    conversationId: chat?.conversationId,
    isCompanyChat: chat && chat.companyName
  });

  if (!chat || !chat.id) {
    return <div>{t("window.chatNotFound")}</div>;
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
          console.log("[ChatWindow] fetched messages (raw)", response.data.messages);

          // Transform API messages to match the expected format
          const transformedMessages = response.data.messages.map((msg) => ({
            from: msg.sender === currentUserId ? "user" : "other",
            text: msg.content,
            timestamp: msg.createdAt,
            _id: msg._id,
            receiver: msg.receiver,
            sender: msg.sender,
            seen: msg.seen,
          }));
          console.log("[ChatWindow] transformed messages", transformedMessages);
          setMessages(transformedMessages);
        } else {
          setError("Failed to fetch messages");
        }
      } catch (err) {
        console.error("[ChatWindow] error fetching messages", err);
        setError(err.message || "Failed to fetch messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chat.roomId, currentUserId]);

  // Fetch DND mode
  useEffect(() => {
    // Check DND mode for ALL chats (both company and user chats)
    if (currentUserId && chat?.conversationId) {
      console.log("[ChatWindow] checking DND", {
        currentUserId,
        conversationId: chat.conversationId,
        isCompanyChat: chat && chat.companyName,
        chat: chat,
        companyName: chat?.companyName,
        timestamp: new Date().toISOString()
      });
      checkDnd(currentUserId, chat.conversationId);
    } else {
      console.log("[ChatWindow] DND check skipped", {
        currentUserId,
        conversationId: chat?.conversationId,
        hasChat: !!chat,
        companyName: chat?.companyName,
        timestamp: new Date().toISOString()
      });
    }
  }, [currentUserId, chat?.conversationId, checkDnd, chat]);

  // Debug DND state
  useEffect(() => {
    console.log("[ChatWindow] DND state changed:", {
      isDndSwitchOn,
      dndError,
      chat: chat?.companyName,
      conversationId: chat?.conversationId,
      currentUserId,
      timestamp: new Date().toISOString()
    });
  }, [isDndSwitchOn, dndError, chat?.companyName, chat?.conversationId, currentUserId]);

  // Socket: connect and subscribe to incoming messages for this room
  useEffect(() => {
    if (!currentUserId || !chat?.roomId) return;

    const socket = getChatSocket(currentUserId);
    let dndSyncInterval = null;

    try {
      console.log("[ChatWindow] socket: connecting", { currentUserId, roomId: chat.roomId });
      socket.connect();
    } catch (e) {
      console.error("[ChatWindow] socket: connect error", e);
    }

    const onConnect = () => {
      try {
        console.log("[ChatWindow] socket: connected, joining room", chat.roomId);
        socket.emit("join", { roomId: chat.roomId });
      } catch (e) {
        console.error("[ChatWindow] socket: join error", e);
      }
    };

    const onMessage = (data = {}) => {
      // Accept messages that either match this room or, if roomId is absent,
      // match the current conversation participants. This avoids dropping
      // real-time events when backend doesn't include roomId in payload.
      const hasRoomId = typeof data.roomId !== "undefined" && data.roomId !== null;
      const otherParticipantId = chat?.conversationId;
      const senderId = data.senderId || data.sender;
      const receiverId = data.receiverId || data.receiver;

      if (hasRoomId && data.roomId !== chat.roomId) return;
      if (!hasRoomId && otherParticipantId) {
        const isForThisConversation = senderId === otherParticipantId || receiverId === otherParticipantId;
        if (!isForThisConversation) return;
      }

      console.log("[ChatWindow] socket: message received", data);
      const content = data.text || data.content || data.message;
      if (!content) return;
      setMessages((prev) => [
        ...prev,
        {
          from: senderId === currentUserId ? "user" : "other",
          text: content,
          timestamp: data.createdAt || new Date().toISOString(),
          sender: senderId,
          receiver: receiverId,
        },
      ]);
    };

    // Handle DND updates from socket for this specific chat
    const onDndUpdate = (data = {}) => {
      console.log("[ChatWindow] socket: dnd_update received", data);

      // Check if this DND update is for the current chat
      const { companyId, dndEnabled } = data;

      // If this is a company chat and the companyId matches, update DND state
      if (chat?.companyName && companyId === chat?.conversationId) {
        console.log("[ChatWindow] updating DND state for company chat", { companyId, dndEnabled });
        useChatDndStore.getState().setSwitchOn(dndEnabled);
      }
      // If this is a user chat, we might need to check if the user is the one who updated DND
      // For now, we'll update if the current user is involved in the conversation
      else if (!chat?.companyName && (companyId === currentUserId || companyId === chat?.conversationId)) {
        console.log("[ChatWindow] updating DND state for user chat", { companyId, dndEnabled });
        useChatDndStore.getState().setSwitchOn(dndEnabled);
      }
    };

    // Handle DND updates from backend (when other user changes DND state)
    const onBackendDndUpdate = (data = {}) => {
      console.log("[ChatWindow] backend dnd_update received", data);

      const { companyId, dndEnabled } = data;

      // Update DND state based on the companyId or userId
      if (companyId) {
        // Check if this DND update affects the current chat
        if (chat?.companyName && companyId === chat?.conversationId) {
          console.log("[ChatWindow] updating DND state from backend for company chat", { companyId, dndEnabled });
          useChatDndStore.getState().setSwitchOn(dndEnabled);
        } else if (!chat?.companyName && (companyId === currentUserId || companyId === chat?.conversationId)) {
          console.log("[ChatWindow] updating DND state from backend for user chat", { companyId, dndEnabled });
          useChatDndStore.getState().setSwitchOn(dndEnabled);
        }
      }
    };

    // Handle DND state change acknowledgment from backend
    const onDndStateChangeAck = (data = {}) => {
      console.log("[ChatWindow] DND state change acknowledged by backend", data);

      // Backend has confirmed the DND state change
      if (data.success) {
        console.log("[ChatWindow] DND state change confirmed by backend");
      } else {
        console.error("[ChatWindow] DND state change failed on backend", data.error);
      }
    };

    // Request current DND state from backend when connecting
    const requestDndState = () => {
      try {
        console.log("[ChatWindow] requesting current DND state from backend");
        socket.emit("request_dnd_state", {
          userId: currentUserId,
          companyId: chat?.companyName ? chat?.conversationId : currentUserId,
          conversationId: chat?.conversationId,
          roomId: chat?.roomId
        });
      } catch (e) {
        console.error("[ChatWindow] error requesting DND state from backend", e);
      }
    };

    // Handle DND state response from backend
    const onDndStateResponse = (data = {}) => {
      console.log("[ChatWindow] DND state response received from backend", data);

      if (data.dndEnabled !== undefined) {
        console.log("[ChatWindow] updating DND state from backend response", data.dndEnabled);
        useChatDndStore.getState().setSwitchOn(data.dndEnabled);
      }
    };

    // Periodic DND state sync with backend
    const startDndSync = () => {
      dndSyncInterval = setInterval(() => {
        if (socket.connected) {
          console.log("[ChatWindow] periodic DND state sync with backend");
          requestDndState();
        }
      }, 30000); // Sync every 30 seconds
    };

    socket.on("connect", onConnect);
    // Listen to backend-aligned event
    socket.on("receive_message", onMessage);
    // Backward compatibility if server emits generic 'message'
    socket.on("message", onMessage);
    // Listen for DND updates
    socket.on("dnd_update", onDndUpdate);
    // Listen for DND updates from backend
    socket.on("dnd_update", onBackendDndUpdate);
    // Listen for DND state change acknowledgment
    socket.on("dnd_state_change_ack", onDndStateChangeAck);
    // Listen for DND state response from backend
    socket.on("dnd_state_response", onDndStateResponse);

    // If already connected (e.g., existing instance), join immediately
    if (socket.connected) {
      console.log("[ChatWindow] socket already connected, joining room now", chat.roomId);
      onConnect();
      requestDndState(); // Request DND state when socket connects
      startDndSync(); // Start periodic sync
    }

    return () => {
      try {
        console.log("[ChatWindow] socket: cleanup, leaving room", chat.roomId);
        socket.emit("leave", { roomId: chat.roomId });
      } catch (e) {
        console.error("[ChatWindow] socket: leave error", e);
      }
      socket.off("connect", onConnect);
      socket.off("receive_message", onMessage);
      socket.off("message", onMessage);
      socket.off("dnd_update", onDndUpdate);
      socket.off("dnd_update", onBackendDndUpdate);
      socket.off("dnd_state_change_ack", onDndStateChangeAck);
      socket.off("dnd_state_response", onDndStateResponse);

      // Clear DND sync interval
      if (dndSyncInterval) {
        clearInterval(dndSyncInterval);
      }

      try {
        console.log("[ChatWindow] socket: disconnecting");
        socket.disconnect();
      } catch (e) {
        console.error("[ChatWindow] socket: disconnect error", e);
      }
    };
  }, [currentUserId, chat?.roomId]);

  const scrollToBottom = (behavior = "smooth") => {
    const container = messagesContainerRef.current;
    if (!container) return;
    try {
      container.scrollTo({ top: container.scrollHeight, behavior });
    } catch (e) {
      container.scrollTop = container.scrollHeight;
    }
  };

  // Reset initial scroll flag when switching chats
  useEffect(() => {
    hasInitialScrolledRef.current = false;
  }, [chat?.roomId]);

  // On first load of messages for a chat, jump to bottom instantly.
  // Afterwards, always auto-scroll to bottom for new messages
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container || messages.length === 0) return;

    if (!hasInitialScrolledRef.current) {
      scrollToBottom("auto");
      hasInitialScrolledRef.current = true;
      return;
    }

    // Always scroll to bottom for new messages
    scrollToBottom("smooth");
  }, [messages]);



  const handleSend = async () => {
    const contentToSend = newMessage;
    const hasText = contentToSend.replace(/\s+/g, "").length > 0;
    const hasImages = pendingImages.length > 0;
    const hasDoc = Boolean(pendingDoc);
    const hasAnyAttachment = hasImages || hasDoc;
    if (!hasText && !hasAnyAttachment) return;

    const timestamp = new Date().toISOString();

    const messageObj = {
      from: "user",
      text: contentToSend,
      timestamp,
      ...(hasImages ? { images: pendingImagePreviews.slice(0, 2) } : {}),
      ...(hasDoc ? { file: { name: pendingDoc?.name, type: pendingDoc?.type } } : {}),
    };

    // Optimistically add the message to the UI
    setMessages((prev) => [...prev, messageObj]);
    setNewMessage("");
    if (hasAnyAttachment) {
      setPendingImages([]);
      setPendingImagePreviews([]);
      setPendingDoc(null);
    }
    console.log("[ChatWindow] sending message", {
      content: contentToSend,
      roomId: chat.roomId,
      receiverId: chat?.conversationId,
    });

    try {
      await sendMessage({
        senderId: currentUserId,
        receiverId: chat?.conversationId, // Update this if your chat object uses a different field for receiver
        content: hasText ? contentToSend : "",
        chatFiles: [
          ...pendingImages.slice(0, 2),
          ...(hasDoc ? [pendingDoc] : []),
        ],
      });
      console.log("[ChatWindow] message sent via API");
      // Emit real-time event (ensure socket is connected)
      try {
        const socket = getChatSocket(currentUserId);
        console.log(socket, "socketsocketsocketsocketsocketsocketsocketsocketsocket");

        const payload = {
          roomId: chat.roomId,
          senderId: currentUserId,
          content: contentToSend,
          receiverId: chat?.conversationId,
        };
        if (socket?.connected) {
          // socket.emit("send_message", payload);
          console.log("[ChatWindow] socket: emitted send_message (connected)", payload);
        } else if (socket) {
          socket.once("connect", () => {
            try {
              // socket.emit("send_message", payload);
              console.log("[ChatWindow] socket: emitted send_message after connect", payload);
            } catch (e) {
              console.error("[ChatWindow] socket: emit after connect error", e);
            }
          });
          try {
            socket.connect();
          } catch (e) {
            console.error("[ChatWindow] socket: connect on send error", e);
          }
        }
      } catch (e) {
        console.error("[ChatWindow] socket: emit error", e);
      }
    } catch (error) {
      console.error("[ChatWindow] error sending message", error);
      setError("Failed to send message");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      console.log("[ChatWindow] Enter key pressed -> send");
      handleSend();
    }
  };

  const autoResizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const newHeight = Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT);
    el.style.height = `${newHeight}px`;
    el.style.overflowY = el.scrollHeight > MAX_TEXTAREA_HEIGHT ? "auto" : "hidden";
  };

  useEffect(() => {
    autoResizeTextarea();
  }, [newMessage]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const availableSlots = Math.max(0, 2 - pendingImages.length);
    const toAdd = files.filter((f) => f.type?.startsWith("image/")).slice(0, availableSlots);
    if (!toAdd.length) return;

    const newPreviews = [];
    let processed = 0;
    toAdd.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        processed += 1;
        if (processed === toAdd.length) {
          setPendingImages((prev) => [...prev, ...toAdd]);
          setPendingImagePreviews((prev) => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDocUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPendingDoc(file);
    console.log("[ChatWindow] document selected", {
      name: file.name,
      type: file.type,
      size: file.size,
    });
  };

  // Preserve user's exact input (including Shift+Enter newlines and spaces)
  const renderRawText = (text) => text;

  return (
    <div className="relative flex h-full w-full flex-col bg-gray-50">
      <ChatWindowHeader
        chat={chat}
        onBack={onBack}
        dndSwitchOn={isDndSwitchOn}
      />

      <div ref={messagesContainerRef} className="no-scrollbar flex-1 space-y-6 overflow-y-auto overflow-x-hidden bg-[#D9D9D9]/[10%] p-4">
        {loading ? (
          <div className="flex flex-col gap-6 py-2">
            {Array.from({ length: 12 }).map((_, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
                <div className="flex-1">
                  <div className="h-3 w-28 rounded bg-gray-200 animate-pulse" />
                  <div className="mt-2 max-w-[80%]">
                    <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
                    <div className="mt-2 h-4 w-3/4 rounded bg-gray-200 animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex justify-center py-8">
            <div className="text-red-500">
              {t("window.error")}: {error}
              <button
                className="ml-2 text-blue-500 underline"
                onClick={() => window.location.reload()}
              >
                {t("window.retry")}
              </button>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center py-8">
            <div className="text-gray-500">{t("window.empty")}</div>
          </div>
        ) : (
          (() => {
            let lastDate = null;
            return messages.map((msg, idx) => {
              console.log(msg, "sdfsdkfhjksdhfksdfklsd;;;;;;;;;;");

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

                  <div
                    className={`flex items-start justify-between space-x-3 ${msg.from === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`flex flex-col ${msg.from === "user" ? "items-end" : "items-start"}`}>
                      <div className={`flex items-center gap-3 ${msg.from === "user" ? "flex-row-reverse" : ""}`}>
                        <ImageFallback
                          src={
                            msg.from === "user"
                              ? (user?.logoUrl ? getImg(user.logoUrl) : getImg(user.profile.photo))
                              : chat?.avatar
                                ? getImg(chat?.avatar)
                                : "/no-img.png"
                          }
                          alt="avatar"
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="text-sm font-medium text-black">
                          {msg.from === "user" ? t("window.you") : chat.name}
                        </div>
                      </div>
                      <div className={`mt-1 max-w-md py-3 text-left ${msg.from === "user" ? "" : ""}`}>
                        {msg.text && (
                          <div
                            className={`inline-block rounded-lg px-3 py-2 text-sm whitespace-pre-wrap break-words break-all text-gray-700 ${msg.from === "user" ? "bg-green-100" : "bg-white"}`}
                          >
                            {renderRawText(msg.text)}
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
                              {t("window.open")}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* <span className="mt-2 text-xs text-gray-400">
                        {format(msgDate, "hh:mm a")}
                      </span> */}
                      {/* <div className="relative">
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
                      </div> */}
                    </div>
                  </div>
                </div>
              );
            });
          })()
        )}

      </div>

      <div className="sticky bottom-0 flex flex-col gap-2 bg-[#D9D9D9]/[10%]">
        {(() => {
          const shouldShowDnd = (isDndSwitchOn === true || isDndSwitchOn === null || isDndSwitchOn === "" || dndError);

          return shouldShowDnd;
        })() ? (
          <div className="flex items-center justify-center px-4 py-6">
            <div className="text-center">
              <div className="flex  text-sm text-red-700 font-medium text-gray-600 mb-1">
                <MdErrorOutline className="mx-2 text-xl" />  {dndError || t("window.dndOnSubtitle")}
              </div>
              {/* <div className="text-xs text-gray-500">
                {dndError || "Messaging is disabled as you have enabled Do Not Disturb."}
              </div> */}
            </div>
          </div>
        ) : (
          <>
            {(pendingImages.length > 0 || pendingDoc) && (
              <div className="px-4 pt-3">
                <div className="flex flex-wrap items-center gap-3">
                  {pendingImages.map((imgFile, index) => (
                    <div key={index} className="relative inline-block max-w-[160px]">
                      <img src={pendingImagePreviews[index] || ""} alt={`preview-${index}`} className="w-full rounded-md border border-slate-200" />
                      <button
                        type="button"
                        onClick={() => {
                          setPendingImages((prev) => prev.filter((_, i) => i !== index));
                          setPendingImagePreviews((prev) => prev.filter((_, i) => i !== index));
                        }}
                        className="absolute -right-2 -top-2 rounded-full bg-red-500 px-2 py-0.5 text-[11px] text-white"
                      >
                        {t("window.remove")}
                      </button>
                    </div>
                  ))}

                  {pendingDoc && (
                    <div className="relative inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
                      <span className="font-medium truncate max-w-[220px]" title={pendingDoc.name}>{pendingDoc.name}</span>
                      <button
                        type="button"
                        onClick={() => setPendingDoc(null)}
                        className="rounded bg-red-500 px-2 py-0.5 text-[11px] text-white"
                      >
                        {t("window.remove")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="flex items-center justify-between gap-2 border-y border-black/10 px-4 py-4">
              <textarea
                ref={textareaRef}
                placeholder={t("window.inputPlaceholder")}
                className="flex-1 bg-[#D9D9D9]/[10%] px-2 pb-2 text-[13px] font-normal outline-none resize-none"
                rows={1}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                onClick={handleSend}
                className="rounded-[2px] bg-[#0F8200] px-4 py-1 text-[13px] font-normal text-white hover:bg-green-700"
              >
                {t("window.send")}
              </button>
            </div>

            <div className="flex items-center justify-between px-4 py-2 pb-3">
              {/* <div className="flex gap-1">
                <div
                  className="cursor-pointer rounded-sm border border-transparent bg-[#CFE6CC] px-2 py-2 hover:border-[#0F8200] hover:bg-transparent"
                  onClick={() => fileInputRef.current.click()}
                >
                  <RiGalleryLine className="text-primary" />
                  <input
                    type="file"
                    src="*"
                    accept="image/*"
                    multiple
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
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.zip,.mp4,.mp3"
                    ref={docInputRef}
                    onChange={handleDocUpload}
                    className="hidden"
                  />
                </div>

                <div className="cursor-pointer rounded-sm border border-transparent bg-[#CFE6CC] px-2 py-2 hover:border-[#0F8200] hover:bg-transparent">
                  <FaCamera className="text-primary" />
                </div>
              </div> */}


            </div>
          </>
        )}
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
