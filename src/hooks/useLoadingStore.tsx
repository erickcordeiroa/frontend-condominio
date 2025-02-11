import { useState } from "react";

const useSpinner = () => {
  const [loading, setLoading] = useState(false);

  const Spinner = () => (
    loading ? (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50  z-50">
        <div className="w-10 h-10 border-4 border-t-transparent border-blue-800 rounded-full animate-spin"></div>
      </div>
    ) : null
  );

  return { loading, setLoading, Spinner };
};

export default useSpinner;
