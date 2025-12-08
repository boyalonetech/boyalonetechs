"use client";

import { Mail, MapPin, X, Phone, DollarSign } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import Loading from "@/components/Loading";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    text: "",
    howMet: "",
    projectType: "", // Website or App
    websiteType: "",
    appType: "",
    budget: "",
    contactPreference: "",
    whatsappNumber: "",
    phoneNumber: "",
  });

  const [currency, setCurrency] = useState<"USD" | "NGN">("USD");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    message: "",
    type: "success",
  });

  const popupRef = useRef<HTMLDivElement | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Currency conversion rates (approximate)
  const exchangeRates = {
    USD_TO_NGN: 1500, // 1 USD = 1500 NGN (adjust as needed)
    NGN_TO_USD: 1 / 1500, // 1 NGN = 0.00067 USD
  };

  // Budget options in USD
  const usdBudgetOptions = [
    { value: "$200 - $500", label: "$200 - $500" },
    { value: "$500 - $4,500", label: "$500 - $4,500" },
    { value: "$5,000 - $10,000", label: "$5,000 - $10,000" },
    { value: "$10,000 - $100,000", label: "$10,000 - $100,000" },
    { value: "$100,000+", label: "$100,000+" },
  ];

  // Convert USD to NGN
  const convertToNGN = (usdRange: string) => {
    const ranges = usdRange.match(/\$([\d,]+)/g);
    if (!ranges) return usdRange;

    const convertNumber = (numStr: string) => {
      const num = parseInt(numStr.replace(/[$,]/g, ""));
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(num * exchangeRates.USD_TO_NGN);
    };

    if (ranges.length === 2) {
      const [start, end] = ranges;
      return `${convertNumber(start)} - ${convertNumber(end)}`;
    } else if (ranges.length === 1) {
      return `${convertNumber(ranges[0])}+`;
    }

    return usdRange;
  };

  // Get current budget options based on selected currency
  const getBudgetOptions = () => {
    if (currency === "USD") {
      return usdBudgetOptions;
    } else {
      return usdBudgetOptions.map((option) => ({
        value: convertToNGN(option.value),
        label: convertToNGN(option.value),
      }));
    }
  };

  // When currency changes, update the budget field if it has a USD value
  useEffect(() => {
    if (formData.budget && formData.budget.includes("$")) {
      const budgetOption = usdBudgetOptions.find(
        (opt) => opt.value === formData.budget
      );
      if (budgetOption) {
        const newBudget =
          currency === "NGN"
            ? convertToNGN(budgetOption.value)
            : budgetOption.value;
        setFormData((prev) => ({ ...prev, budget: newBudget }));
      }
    }
  }, [currency]);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ show: true, message, type });

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Store both the budget value and currency for backend reference
    const submissionData = {
      ...formData,
      currency, // Include currency in submission
      originalBudget: formData.budget, // Keep the formatted budget
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(submissionData),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        const errorMessage =
          data.error || "Failed to send message. Please try again.";
        showToast(errorMessage, "error");
        return;
      }

      showToast(
        "Message sent successfully! I'll get back to you soon.",
        "success"
      );
      setShowPopup(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
        text: "",
        howMet: "",
        projectType: "",
        websiteType: "",
        appType: "",
        budget: "",
        contactPreference: "",
        whatsappNumber: "",
        phoneNumber: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast(
        "Network error. Please check your connection and try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    };
    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPopup]);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const budgetOptions = getBudgetOptions();

  return (
    <section>
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-fadeIn">
          <div
            className={`px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 ${
              toast.type === "success"
                ? "bg-green-100 border border-green-300 text-green-800"
                : "bg-red-100 border border-red-300 text-red-800"
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full ${
                toast.type === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <p className="font-medium">{toast.message}</p>
            <button
              onClick={() => setToast({ ...toast, show: false })}
              className="ml-4 text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      <div className="relative min-h-screen lg:ml-[310px] text-gray-900 md:px-20 py-16">
        <h1 className="text-4xl font-bold text-center mt-14 lg:mt-6 mb-6 text-blue-600">
          Get In Touch
        </h1>

        <p className="text-center text-gray-600 mb-14 max-w-2xl px-4 mx-auto text-lg leading-relaxed">
          Ready to bring your idea to life? Whether it&apos;s a portfolio,
          business site, e-commerce store, or mobile app — share your details
          below and I&apos;ll craft a tailored solution for you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-3">
          <div className="overflow-hidden h-90 md:h-[100%] rounded-2xl shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.865256710397!2d7.356638375029525!3d5.125401994851736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10429966f24c317f%3A0xca084cdf8a33f168!2s10%20Calabar%20Street%2C%20Aba%2C%20450211%2C%20Abia!5e0!3m2!1sen!2sng!4v1757860965729!5m2!1sen!2sng"
              width="100%"
              height="450"
              style={{ border: "0" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="space-y-6">
            {[
              {
                icon: <FaWhatsapp className="text-green-600 w-6 h-6" />,
                title: "Whatsapp",
                value: "+234 816 151 4098",
                href: "https://wa.me/2348161514098",
              },
              {
                icon: <Mail className="text-red-600 w-6 h-6" />,
                title: "Email",
                value: "boyalonetechs@gmail.com",
                href: "mailto:boyalonetechs@gmail.com",
              },
              {
                icon: <Phone className="text-blue-500 w-6 h-6" />,
                title: "Phone",
                value: "08161514098",
                href: "tel:2348161514098",
              },
              {
                icon: <MapPin className="text-yellow-600 w-6 h-6" />,
                title: "Location",
                value: "Aba, Abia State, Nigeria",
              },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href || "#"}
                className="sc p-6 rounded-2xl shadow-md flex items-center gap-4 hover:shadow-lg transition"
              >
                {item.icon}
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm">{item.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-16 lg:p-8 px-2 rounded-2xl space-y-6 w-full lg:max-w-7xl sb"
        >
          <h2 className="text-2xl pl-3 font-semibold text-blue-600 mb-4">
            Send Me a Message
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="sc w-full p-3 placeholder:sc rounded-lg focus:outline-none"
              required
            />

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="sc w-full p-3 rounded-lg focus:outline-none"
              required
            />
          </div>

          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="sc w-full p-3 rounded-lg focus:outline-none"
            required
          >
            <option value="">Do you need a Website or App?</option>
            <option value="Website">Website</option>
            <option value="App">App</option>
          </select>

          {formData.projectType === "Website" && (
            <select
              name="websiteType"
              value={formData.websiteType}
              onChange={handleChange}
              className="sc w-full p-3 rounded-lg focus:outline-none"
              required
            >
              <option value="">Select Website Type</option>
              <option value="Portfolio">Portfolio</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Business">Business</option>
              <option value="Admin-Dashboard">Admin Dashboard</option>
              <option value="Blog">Blog</option>
              <option value="Other">Other(specify in the message)</option>
            </select>
          )}

          {formData.projectType === "App" && (
            <select
              name="appType"
              value={formData.appType}
              onChange={handleChange}
              className="sc w-full p-3 rounded-lg focus:outline-none"
              required
            >
              <option value="">Select App Type</option>
              <option value="Social Media">Social Media</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Business">Business</option>
              <option value="Educational">Educational</option>
              <option value="Fintech">Fintech</option>
              <option value="Other">Other(specify in the message)</option>
            </select>
          )}

          {/* Budget Field with Currency Switcher */}
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Currency:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setCurrency("USD")}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      currency === "USD"
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    USD ($)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency("NGN")}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      currency === "NGN"
                        ? "bg-green-600 text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    NGN (₦)
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex-1 relative">
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="sc w-full p-3 rounded-lg focus:outline-none pr-10"
                  required
                >
                  <option value="">Select Budget Range</option>
                  {budgetOptions.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  {currency === "USD" ? (
                    <DollarSign className="text-gray-400" size={18} />
                  ) : (
                    <span className="text-gray-400 font-semibold">₦</span>
                  )}
                </div>
              </div>
            </div>

            {/* Exchange rate note */}
            {/* <p className="text-xs text-gray-500 mt-1">
              {currency === "NGN"
                ? `Based on approximate exchange rate: $1 ≈ ₦${exchangeRates.USD_TO_NGN.toLocaleString()}`
                : "Prices in US Dollars"}
            </p> */}
          </div>

          <select
            name="contactPreference"
            value={formData.contactPreference}
            onChange={handleChange}
            className="sc w-full p-3 rounded-lg focus:outline-none"
            required
          >
            <option value="">Contact Preference</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Email">Email</option>
            <option value="Phone">Phone</option>
          </select>

          {formData.contactPreference === "WhatsApp" && (
            <input
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleChange}
              placeholder="Enter WhatsApp Number"
              className="sc w-full p-3 rounded-lg focus:outline-none"
              required
            />
          )}

          {formData.contactPreference === "Phone" && (
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              className="sc w-full p-3 rounded-lg focus:outline-none"
              required
            />
          )}

          <select
            name="howMet"
            value={formData.howMet}
            onChange={handleChange}
            className="sc w-full p-3 rounded-lg focus:ring-2 focus:outline-none"
            required
          >
            <option value="">How did you meet me?</option>
            <option value="Website">Website</option>
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="Github">Github</option>
            <option value="Twitter">Twitter</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="YouTube">YouTube</option>
            <option value="Referral">Referral</option>
          </select>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            placeholder="Describe What you Need"
            className="w-full sc p-3 rounded-lg resize-none focus:ring-2 focus:outline-none"
            required
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white px-6 py-4 rounded-xl font-medium ${
              loading ? "bg-blue-500" : "bg-blue-600 hover:bg-blue-700"
            } transition-all shadow-md hover:shadow-lg flex items-center justify-center`}
          >
            {loading ? <Loading /> : "Send Message"}
          </button>
        </form>

        {showPopup && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-60">
            <div
              ref={popupRef}
              className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 relative text-center animate-fadeIn"
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-black"
              >
                <X />
              </button>
              <h2 className="text-lg font-semibold mb-2">🎉 Message Sent</h2>
              <p className="text-sm text-gray-600">
                Thank you for reaching out. I&apos;ll get back to you soon!
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
