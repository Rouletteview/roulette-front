import React, { useEffect } from "react";

interface PopupProps {
  message: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // El popup se cierra después de 5 segundos

    return () => clearTimeout(timer); // Limpiar el timer al desmontar el componente
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg flex items-center z-50">
      <p className="mr-4">{message}</p>
      <button
        className="bg-green-700 text-white px-2 py-1 rounded-md hover:bg-green-600 focus:outline-none"
        onClick={onClose}
      >
        Cerrar
      </button>
    </div>
  );
};

export default Popup;
