import React from 'react';

function LaunchNotification() {
  return (
    <div className="py-20 px-6">
      <div className="mx-auto px-2 rounded-2xl shadow-2xl p-10 bg-gray-950 max-w-4xl">
        <h1 className="text-5xl text-center tracking-tighter font-semibold text-white">
          Get notified when we're launching
        </h1>
        <p className="text-[25px] tracking-tighter text-gray-600 dark:text-gray-400 p-6 text-center mx-auto max-w-2xl">
          Reprehenderit ad esse et non officia in nulla. Id proident tempor incididunt nostrud nulla et culpa.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email.."
            className="bg-transparent border border-gray-300 rounded-md px-4 py-2 w-full sm:w-64"
          />
          <button className="bg-white hover:bg-yellow-50 text-black rounded-md px-6 py-2 font-semibold w-full sm:w-auto">
            Notify me
          </button>
        </div>
      </div>
    </div>
  );
}

export default LaunchNotification;
