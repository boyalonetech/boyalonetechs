"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Mail,
  Calendar,
  User,
  Trash2,
  Reply,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  DollarSign,
  Phone,
  MessageCircle,
  Globe,
  Smartphone,
  X,
  AlertTriangle,
} from "lucide-react";

interface Message {
  id: string;
  from: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

interface MessagesProps {
  messages: Message[];
  loadingMessages: boolean;
  refreshingMessages: boolean;
  selectedMessage: Message | null;
  onRefreshMessages: () => void;
  onMessageClick: (message: Message) => void;
  onBackToList: () => void;
  onDeleteMessage: (id: string) => void;
}

export default function Messages({
  messages,
  loadingMessages,
  refreshingMessages,
  selectedMessage,
  onRefreshMessages,
  onMessageClick,
  onBackToList,
  onDeleteMessage,
}: MessagesProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<{
    id: string;
    from: string;
  } | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  // Function to extract additional information from the message
  const extractAdditionalInfo = (message: string) => {
    const info: { [key: string]: string } = {};

    // Extract project type
    const projectTypeMatch = message.match(/Project Type:\s*(.+)/);
    if (projectTypeMatch) info.projectType = projectTypeMatch[1];

    // Extract website/app type
    const websiteTypeMatch = message.match(/Website Type:\s*(.+)/);
    if (websiteTypeMatch) info.websiteType = websiteTypeMatch[1];

    const appTypeMatch = message.match(/App Type:\s*(.+)/);
    if (appTypeMatch) info.appType = appTypeMatch[1];

    // Extract budget
    const budgetMatch = message.match(/Budget:\s*(.+)/);
    if (budgetMatch) info.budget = budgetMatch[1];

    // Extract contact preference
    const contactPrefMatch = message.match(/Contact Preference:\s*(.+)/);
    if (contactPrefMatch) info.contactPreference = contactPrefMatch[1];

    // Extract phone numbers
    const whatsappMatch = message.match(/WhatsApp Number:\s*(.+)/);
    if (whatsappMatch) info.whatsappNumber = whatsappMatch[1];

    const phoneMatch = message.match(/Phone Number:\s*(.+)/);
    if (phoneMatch) info.phoneNumber = phoneMatch[1];

    // Extract how they met
    const howMetMatch = message.match(/How they found you:\s*(.+)/);
    if (howMetMatch) info.howMet = howMetMatch[1];

    return info;
  };

  // Function to extract the main message content (textarea content)
  const extractMainMessage = (message: string): string => {
    // Look for the "Message:" section which contains the textarea content
    const messageStart = message.indexOf("Message:");
    if (messageStart !== -1) {
      // Get everything after "Message:"
      const mainMessage = message
        .substring(messageStart + "Message:".length)
        .trim();
      return mainMessage;
    }

    // If no "Message:" section found, return the entire message
    return message;
  };

  const handleDeleteClick = (id: string, from: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the message click

    // Show the custom popup instead of confirm
    setMessageToDelete({ id, from });
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    if (!messageToDelete) return;

    setDeletingId(messageToDelete.id);
    setShowDeletePopup(false);

    try {
      await onDeleteMessage(messageToDelete.id);
    } finally {
      setDeletingId(null);
      setMessageToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setMessageToDelete(null);
  };

  if (loadingMessages) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading messages...</p>
      </div>
    );
  }

  if (selectedMessage) {
    // Extract the main message content (textarea content)
    const mainMessage = extractMainMessage(selectedMessage.message);

    // Extract additional information from the form data
    const additionalInfo = extractAdditionalInfo(selectedMessage.message);
    const hasAdditionalInfo = Object.keys(additionalInfo).length > 0;

    return (
      <>
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow">
            <div className="border-b p-4 flex items-center justify-between">
              <button
                onClick={onBackToList}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
              >
                <ArrowLeft size={20} />
                <span>Back to messages</span>
              </button>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-500 hover:text-blue-600">
                  <Reply size={20} />
                </button>
                <button
                  onClick={(e) =>
                    handleDeleteClick(
                      selectedMessage.id,
                      selectedMessage.from,
                      e
                    )
                  }
                  disabled={deletingId === selectedMessage.id}
                  className="p-2 text-gray-500 hover:text-red-600 disabled:opacity-50"
                >
                  {deletingId === selectedMessage.id ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                  ) : (
                    <Trash2 size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {selectedMessage.subject}
                </h3>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <User size={16} />
                    <span className="font-medium">{selectedMessage.from}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail size={16} />
                    <span>{selectedMessage.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{formatDate(selectedMessage.date)}</span>
                  </div>
                </div>
              </div>

              {/* Actual Message Content (Textarea Content) - NOW SHOWS FIRST */}
              {mainMessage && (
                <div className="border-t pt-6">
                  <p className="whitespace-pre-line leading-relaxed bg-gray-50 h-auto rounded-xl p-5">
                    {mainMessage}
                  </p>
                </div>
              )}

              {/* Contact Form Details - Collapsible Section Below */}
              {hasAdditionalInfo && (
                <div className="border-t pt-6">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-3"
                  >
                    {showDetails ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                    <span>
                      <h4 className="font-semibold text-lg cursor-pointer text-blue-700">
                        Project Details
                      </h4>
                    </span>
                  </button>

                  {showDetails && (
                    <div className="pt-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50 rounded-lg p-4">
                        {additionalInfo.projectType && (
                          <div className="flex items-center space-x-3">
                            <Globe size={18} className="text-blue-600" />
                            <div>
                              <span className="text-sm font-medium text-gray-600">
                                Project Type
                              </span>
                              <p className="font-semibold">
                                {additionalInfo.projectType}
                              </p>
                            </div>
                          </div>
                        )}

                        {additionalInfo.websiteType && (
                          <div className="flex items-center space-x-3">
                            <Globe size={18} className="text-green-600" />
                            <div>
                              <span className="text-sm font-medium text-gray-600">
                                Website Type
                              </span>
                              <p className="font-semibold">
                                {additionalInfo.websiteType}
                              </p>
                            </div>
                          </div>
                        )}

                        {additionalInfo.appType && (
                          <div className="flex items-center space-x-3">
                            <Smartphone size={18} className="text-purple-600" />
                            <div>
                              <span className="text-sm font-medium text-gray-600">
                                App Type
                              </span>
                              <p className="font-semibold">
                                {additionalInfo.appType}
                              </p>
                            </div>
                          </div>
                        )}

                        {additionalInfo.budget && (
                          <div className="flex items-center space-x-3">
                            <DollarSign size={18} className="text-green-600" />
                            <div>
                              <span className="text-sm font-medium text-gray-600">
                                Budget
                              </span>
                              <p className="font-semibold">
                                {additionalInfo.budget}
                              </p>
                            </div>
                          </div>
                        )}

                        {additionalInfo.contactPreference && (
                          <div className="flex items-center space-x-3">
                            <MessageCircle
                              size={18}
                              className="text-orange-600"
                            />
                            <div>
                              <span className="text-sm font-medium text-gray-600">
                                Contact Preference
                              </span>
                              <p className="font-semibold">
                                {additionalInfo.contactPreference}
                              </p>
                            </div>
                          </div>
                        )}

                        {additionalInfo.whatsappNumber && (
                          <div className="flex items-center space-x-3">
                            <MessageCircle
                              size={18}
                              className="text-green-600"
                            />
                            <div>
                              <span className="text-sm font-medium text-gray-600">
                                WhatsApp
                              </span>
                              <p className="font-semibold">
                                {additionalInfo.whatsappNumber}
                              </p>
                            </div>
                          </div>
                        )}

                        {additionalInfo.phoneNumber && (
                          <div className="flex items-center space-x-3">
                            <Phone size={18} className="text-blue-600" />
                            <div>
                              <span className="text-sm font-medium text-gray-600">
                                Phone
                              </span>
                              <p className="font-semibold">
                                {additionalInfo.phoneNumber}
                              </p>
                            </div>
                          </div>
                        )}

                        {additionalInfo.howMet && (
                          <div className="flex items-center space-x-3">
                            <User size={18} className="text-purple-600" />
                            <div>
                              <span className="text-sm font-medium text-gray-600">
                                Found Via
                              </span>
                              <p className="font-semibold">
                                {additionalInfo.howMet}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-6">
                <h4 className="font-semibold mb-3">
                  Reply to {selectedMessage.from}
                </h4>
                <textarea
                  className="w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your reply here..."
                />
                <button className="mt-3 bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Popup */}
        {showDeletePopup && messageToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-scale-in">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="text-red-500" size={24} />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Delete Message
                  </h3>
                </div>
                <button
                  onClick={cancelDelete}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="text-gray-600 mb-1">
                Are you sure you want to delete this message from{" "}
                <strong>{messageToDelete.from}</strong>?
              </p>
              <p className="text-sm text-gray-500 mb-6">
                This action cannot be undone. The message will be permanently
                removed from the database.
              </p>

              <div className="flex space-x-3 justify-end">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center space-x-2"
                >
                  <Trash2 size={16} />
                  <span>Delete Message</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-blue-700">Messages</h2>
          <button
            onClick={onRefreshMessages}
            disabled={refreshingMessages}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={refreshingMessages ? "animate-spin" : ""}
            />
            <span>Refresh</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                {messages.filter((msg) => !msg.read).length} unread messages
              </span>
              <span className="text-gray-600">
                Total: {messages.length} messages
              </span>
            </div>
          </div>

          <div className="divide-y">
            {messages.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Mail size={48} className="mx-auto mb-4 text-gray-300" />
                <p>No messages yet</p>
                <p className="text-sm mt-2">
                  Messages from your contact form will appear here
                </p>
              </div>
            ) : (
              messages.map((message) => {
                // Extract the main message content (textarea content)
                const mainMessage = extractMainMessage(message.message);

                return (
                  <div
                    key={message.id}
                    onClick={() => onMessageClick(message)}
                    className={`p-4 cursor-pointer hover:bg-blue-50 transition-colors ${
                      !message.read
                        ? "bg-blue-25 border-l-4 border-blue-600"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {!message.read ? (
                          <div className="w-3 h-3 rounded-full bg-blue-600" />
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-gray-400/50" />
                        )}
                        <div>
                          <h3
                            className={`font-semibold ${
                              !message.read ? "text-blue-900" : "text-gray-900"
                            }`}
                          >
                            {message.from}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {message.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500 text-sm">
                          {formatDate(message.date)}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                      {mainMessage || "Contact form submission"}
                    </p>

                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={(e) =>
                          handleDeleteClick(message.id, message.from, e)
                        }
                        disabled={deletingId === message.id}
                        className="text-red-600 hover:text-red-800 text-sm flex items-center space-x-1 disabled:opacity-50"
                      >
                        {deletingId === message.id ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-600"></div>
                            <span>Deleting...</span>
                          </>
                        ) : (
                          <>
                            <Trash2 size={14} />
                            <span>Delete</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Popup for List View */}
      {showDeletePopup && messageToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="text-red-500" size={24} />
                <h3 className="text-lg font-semibold text-gray-900">
                  Delete Message
                </h3>
              </div>
              <button
                onClick={cancelDelete}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-gray-600 mb-1">
              Are you sure you want to delete this message from{" "}
              <strong>{messageToDelete.from}</strong>?
            </p>
            <p className="text-sm text-gray-500 mb-6">
              This action cannot be undone. The message will be permanently
              removed from the database.
            </p>

            <div className="flex space-x-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center space-x-2"
              >
                <Trash2 size={16} />
                <span>Delete Message</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
