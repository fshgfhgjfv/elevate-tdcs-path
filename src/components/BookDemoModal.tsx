import React from "react";

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookDemoModal = ({ isOpen, onClose }: BookDemoModalProps) => {
  if (!isOpen) return null;

  // ✅ Show alert message (toast-style notification)
  const showAlert = (message: string, type: "success" | "error") => {
    // Check if the global alert element exists, if not, we create a temporary one for the modal context
    let alertBox = document.getElementById("global-alert-hero");
    
    // Fallback if global alert box isn't found in the DOM (self-contained safety)
    if (!alertBox) {
        alertBox = document.createElement("div");
        alertBox.id = "global-alert-hero";
        document.body.appendChild(alertBox);
    }

    if (alertBox) {
      alertBox.textContent = message;
      alertBox.className = `fixed top-4 right-4 z-[9999] p-4 rounded-lg shadow-xl text-white transition-opacity duration-300 opacity-100 ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`;
      setTimeout(() => {
        if (alertBox) {
            alertBox.className = alertBox.className.replace("opacity-100", "opacity-0");
        }
      }, 3000);
    }
  };

  // ✅ Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const phone = formData.get("phone")?.toString().trim() || "";
    const course = formData.get("course")?.toString().trim() || "";

    // Validate fields
    if (!name || !email || !phone || !course) {
      showAlert("Please fill in all fields.", "error");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      showAlert("Please enter a valid 10-digit mobile number.", "error");
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
      showAlert("Please enter a valid Gmail address.", "error");
      return;
    }

    // ✅ Success: Notify user and redirect to Calendly
    showAlert("Redirecting to booking page...", "success");

    // Construct Calendly URL with pre-filled data (Name & Email)
    const calendlyUrl = "https://calendly.com/rudranarayanswain/30min";
    const params = new URLSearchParams();
    params.append("name", name);
    params.append("email", email);
    // Note: Phone and Course are not standard Calendly pre-fill fields without custom setup, 
    // but name/email will work automatically.

    // Slight delay to allow the user to read the alert before the new tab opens
    setTimeout(() => {
        window.open(`${calendlyUrl}?${params.toString()}`, '_blank');
        onClose();
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 animate-in fade-in-0 zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Book a Free Demo Session
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Gmail Address
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="example@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              name="phone"
              pattern="[0-9]{10}"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="10-digit mobile number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Course Interested In
            </label>
            <input
              type="text"
              name="course"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="e.g. Cyber Master's Pro, Full Stack"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
          >
            Submit & Book Slot
          </button>
        </form>
      </div>
    </div>
  );
};