interface PopupProps {
  title?: string;
  message?: string;
  showButton?: boolean; 
  behavior?: () => void; 
}

const Popup: React.FC<PopupProps> = ({
  title,
  message,
  showButton = true, 
  behavior,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center">
      <div className="relative bg-white p-5 rounded-lg text-center z-20">
        {!showButton && behavior && (
          <button
            onClick={behavior}
            className="absolute top-0 right-0 mt-2 mr-2 text-2xl font-semibold"
            aria-label="Close"
          >
            &times; {/* This is a common symbol used for a close button */}
          </button>
        )}
        {title && <h2 className="font-bold mb-4">{title}</h2>}
        {message && <h3 className="mb-4">{message}</h3>}
        {showButton && behavior && (
          <button
            className="px-6 py-2 bg-tertiary text-white rounded-lg shadow hover:bg-blue-400"
            onClick={behavior}
          >
            Shop mere
          </button>
        )}
      </div>
    </div>
  );
};

export default Popup;
