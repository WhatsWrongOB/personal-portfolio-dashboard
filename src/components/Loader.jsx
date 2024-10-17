const Loader = ({ location = "login" }) => {
  return (
    <div
      id="modal"
      className={`fixed ${
        location === "home" ? "bg-gray-800 bg-opacity-20 " : "bg-transparent"
      } inset-0 z-50 flex justify-center items-center`}
    >
      <div className="loading-container">
        <div className="loading-circle"></div>
        <div className="loading-circle"></div>
        <div className="loading-circle"></div>
      </div>
    </div>
  );
};

export default Loader;
