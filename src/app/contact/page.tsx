"use client";

import { Mail, Phone, MapPin, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

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

  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

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

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      setShowPopup(true);
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
    } else {
      alert("Failed to send message. Please try again.");
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

  return (
    <div className="relative min-h-screen lg:ml-[310px] text-gray-900 px-6 md:px-20 py-16">
      {/* Heading */}
      {/* <div className="text-3xl flex relative flex-col gap-2 font-bold text-left mt-16 lg:mt-0 mb-12 w-full text-blue-600">
        <h1 className="text-4xl">Contact</h1>
        <span className="h-[4px] rounded-full w-24 bg-gradient-to-r from-blue-500 to-blue-700"></span>
      </div> */}

      {/* Subheading */}
      <h1 className="text-4xl font-bold text-center mt-8 lg:mt-6 mb-6 text-blue-600">
        Get In Touch
      </h1>

      <p className="text-center text-gray-600 mb-14 max-w-2xl mx-auto text-lg leading-relaxed">
        Ready to bring your idea to life? Whether it&apos;s a portfolio,
        business site, e-commerce store, or mobile app — share your details
        below and I&apos;ll craft a tailored solution for you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Map */}
        <div className="overflow-hidden rounded-2xl shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.865256710397!2d7.356638375029525!3d5.125401994851736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10429966f24c317f%3A0xca084cdf8a33f168!2s10%20Calabar%20Street%2C%20Aba%2C%20450211%2C%20Abia!5e0!3m2!1sen!2sng!4v1757860965729!5m2!1sen!2sng"
            width="100%"
            height="450"
            style={{ border: "0" }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          {[
            {
              icon: <Phone className="text-green-600 w-6 h-6" />,
              title: "Phone",
              value: "+234 816 151 4098",
              href: "tel:+2348161514098",
            },
            {
              icon: <Mail className="text-blue-600 w-6 h-6" />,
              title: "Email",
              value: "boyalonetechs@gmail.com",
              href: "mailto:boyalonetechs@gmail.com",
            },
            {
              icon: <MapPin className="text-red-500 w-6 h-6" />,
              title: "Location",
              value: "Aba, Abia State, Nigeria",
            },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href || "#"}
              className="sk p-6 rounded-2xl shadow-md flex items-center gap-4 hover:shadow-lg transition"
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

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-16 lg:p-8 rounded-2xl  space-y-6 w-full lg:max-w-7xl sb sk"
      >
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          Send Me a Message
        </h2>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className=" sc w-full p-3  rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />

          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className=" sc w-full p-3  rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <select
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          className=" sc w-full p-3  rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
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
            className=" sc w-full p-3  rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
            required
          >
            <option value="">Select Website Type</option>
            <option value="Portfolio">Portfolio</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Business">Business</option>
            <option value="Blog">Blog</option>
            <option value="Other">Other</option>
          </select>
        )}

        {formData.projectType === "App" && (
          <select
            name="appType"
            value={formData.appType}
            onChange={handleChange}
            className=" sc w-full p-3  rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
            required
          >
            <option value="">Select App Type</option>
            <option value="Social Media">Social Media</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Business">Business</option>
            <option value="Educational">Educational</option>
            <option value="Other">Other</option>
          </select>
        )}

        <select
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className=" sc w-full p-3  rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
          required
        >
          <option value="">Select Budget</option>
          <option value="₦200,000 - ₦500,000">₦200,000 - ₦500,000</option>
          <option value="₦500,000 - ₦1,500,000">₦500,000 - ₦1,500,000</option>
          <option value="₦1,500,000 - ₦10,000,000">
            ₦1,500,000 - ₦10,000,000
          </option>
          <option value="₦10,000,000 - ₦100,000,000">
            ₦10,000,000 - ₦100,000,000
          </option>
          <option value="₦100,000,000+">₦100,000,000+</option>
        </select>

        <select
          name="contactPreference"
          value={formData.contactPreference}
          onChange={handleChange}
          className=" sc w-full p-3  rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
          required
        >
          <option value="">Preferred Contact Method</option>
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
            className=" sc w-full p-3  rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
            required
          />
        )}

        {formData.contactPreference === "Phone" && (
          <input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter Phone Number"
            className=" sc w-full p-3  rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        )}

        <select
          name="howMet"
          value={formData.howMet}
          onChange={handleChange}
          className=" sc w-full p-3  rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        >
          <option value="">How did you meet me?</option>
          <option value="Website">Website</option>
          <option value="Instagram">Instagram</option>
          <option value="Facebook">Facebook</option>
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
          placeholder="Any additional information?"
          className="w-full sc p-3  rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 w-full lg:w-max text-white px-6 py-3 rounded-xl font-medium ${
            loading ? "bg-blue-400" : "bg-blue-600"
          } hover:bg-blue-700 transition-all shadow-md hover:shadow-lg`}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-60">
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
            <Link
              href="/"
              onClick={() => setShowPopup(false)}
              className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Close
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
