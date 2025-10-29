import React, { useState } from 'react';
import { Download, X } from 'lucide-react'; // Using lucide-react for icons

// 1. DownloadBrochureModal Component (Integrated)
// This component was previously being imported incorrectly from a separate file.
const DownloadBrochureModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate brochure download logic
    console.log("Form Submitted for brochure download.");
    // In a real app, you would handle form submission (e.g., API call) here.
    alertMessage("Thank you! Your brochure download link has been sent to your email.", "success");
    onClose();
  };

  const alertMessage = (message, type) => {
    const alertBox = document.getElementById('global-alert');
    if (alertBox) {
      alertBox.textContent = message;
      alertBox.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white transition-opacity duration-300 ${
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
      }`;
      alertBox.style.opacity = '1';
      setTimeout(() => {
        alertBox.style.opacity = '0';
      }, 3000);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-40 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <Download className="w-5 h-5 mr-2 text-indigo-500" />
            Download Our Brochure
          </h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Fill in your details below to receive a direct download link to our comprehensive product brochure.
          </p>
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            <Download className="w-5 h-5 mr-2" />
            Send Download Link
          </button>
        </form>
      </div>
    </div>
  );
};


// 2. Main App Component
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Simple array for mock feature list
  const features = [
    { title: "Blazing Fast Performance", description: "Experience lightning-fast load times and seamless responsiveness.", icon: '🚀' },
    { title: "Intuitive Design", description: "A clean, modern interface designed for maximum user comfort.", icon: '✨' },
    { title: "24/7 Support", description: "Dedicated support team available around the clock for any issues.", icon: '📞' },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-sans flex flex-col items-center">
      
      {/* Global Alert Box (for non-alert() messages) */}
      <div id="global-alert" className="fixed top-4 right-4 z-50 opacity-0 pointer-events-none"></div>

      {/* Header/Hero Section */}
      <header className="w-full pt-16 pb-24 text-center bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight mb-4">
            Future-Proof Your Platform
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            The next generation of software solutions, designed for scalability and efficiency.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center mx-auto px-8 py-3 border border-transparent text-lg font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800"
          >
            <Download className="w-6 h-6 mr-3" />
            Get the Full Brochure
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="w-full py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 border border-gray-100 dark:border-gray-700/50"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Footer */}
      <footer className="w-full bg-gray-100 dark:bg-gray-800 mt-auto py-8 text-center border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Ready to get started? Download our full guide today.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 border border-indigo-600 text-base font-medium rounded-full text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 transition"
          >
            Request Brochure
          </button>
        </div>
      </footer>

      {/* The Modal itself */}
      <DownloadBrochureModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default App;
