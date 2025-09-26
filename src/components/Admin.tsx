"use client";

import { useState, useEffect } from "react";
import Dashboard from "./dashboard/Dashboard";
import Projects from "./dashboard/Projectpost";
import Sidebar from "./dashboard/Sidebar";
import Messages from "./dashboard/Messages";
import Waitlist from "./dashboard/Waitlist";
import Settings from "./dashboard/Settings";

// ✅ Define type for waitlist entries
interface WaitlistEntry {
  id: string;
  email: string;
  created_at: string;
}

// ✅ Define type for messages
interface Message {
  id: string;
  from: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export default function Admin({ onLogout }: { onLogout: () => void }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [refreshingMessages, setRefreshingMessages] = useState(false);

  // Fetch messages from Supabase when messages page is active
  const fetchMessages = async (isRefreshing = false) => {
    if (isRefreshing) {
      setRefreshingMessages(true);
    } else {
      setLoadingMessages(true);
    }

    try {
      const res = await fetch("/api/messages");
      const data = await res.json();

      if (data.success) {
        setMessages(data.messages);
      } else {
        console.error("Error fetching messages:", data.error);
        setMessages([]);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);
    } finally {
      setLoadingMessages(false);
      setRefreshingMessages(false);
    }
  };

  // Fetch waitlist when active
  useEffect(() => {
    if (activePage === "waitlist") {
      fetch("/api/waitlist")
        .then((res) => res.json())
        .then((data: WaitlistEntry[]) => setWaitlist(data))
        .catch((error) => console.error("Error fetching waitlist:", error));
    }
  }, [activePage]);

  // Fetch messages when messages page becomes active
  useEffect(() => {
    if (activePage === "messages") {
      fetchMessages();
    }
  }, [activePage]);

  const handleDeleteWaitlist = async (id: string) => {
    try {
      await fetch("/api/waitlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setWaitlist((prev) => prev.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error("Error deleting waitlist entry:", error);
    }
  };

 const handleDeleteMessage = async (id: string) => {
  try {
    const res = await fetch('/api/messages', {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (data.success) {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } else {
      alert(`Failed to delete message: ${data.error}`);
    }
  } catch (error) {
    alert("Network error. Please try again.");
  }
};

  const handleMessageClick = async (message: Message) => {
    setSelectedMessage(message);

    // Only mark as read if it's not already read
    if (!message.read) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id ? { ...msg, read: true } : msg
        )
      );

      // Update read status in Supabase
      try {
        await fetch("/api/messages", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: message.id,
            read: true,
          }),
        });
      } catch (error) {
        console.error("Error updating message read status:", error);
      }
    }
  };

  const handleBackToList = () => {
    setSelectedMessage(null);
  };

  const handleRefreshMessages = () => {
    fetchMessages(true);
  };

  const handleSidebarItemClick = (pageName: string) => {
    console.log("Setting active page to:", pageName);
    setActivePage(pageName);
    if (pageName !== "messages") {
      setSelectedMessage(null);
    }
  };

  const renderActivePage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard messagesCount={messages.length} />;

      case "projects":
        return <Projects />;

      case "messages":
        return (
          <Messages
            messages={messages}
            loadingMessages={loadingMessages}
            refreshingMessages={refreshingMessages}
            selectedMessage={selectedMessage}
            onRefreshMessages={handleRefreshMessages}
            onMessageClick={handleMessageClick}
            onBackToList={handleBackToList}
            onDeleteMessage={handleDeleteMessage}
          />
        );

      case "waitlist":
        return <Waitlist waitlist={waitlist} onDelete={handleDeleteWaitlist} />;

      case "settings":
        return <Settings />;

      default:
        return <Dashboard messagesCount={messages.length} />;
    }
  };

  return (
    <div className="flex h-screen  w-full">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        activePage={activePage}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onPageChange={handleSidebarItemClick}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className=" shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold capitalize text-blue-700">
            {activePage.replace(/-/g, " ")}
          </h1>
          <button
            onClick={onLogout}
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors"
          >
            Logout
          </button>
        </header>

        <main className="p-6 space-y-6 overflow-y-auto flex-1">
          {renderActivePage()}
        </main>
      </div>
    </div>
  );
}
