import { useStore } from "../context";


const Report = () => {

const { messages } = useStore();

  return (
    <div
      id="overflow"
      className="w-full h-full mt-2 rounded-lg bg-gray-700 border border-gray-600 p-4 overflow-auto"
    >
      <h3 className="text-lg font-bold mb-4">User Feedback</h3>
      <div className="space-y-2">
        {messages.map((feedback, index) => (
          <div key={index} className="p-3 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-400">"{feedback.message}"</p>
            <p className="text-right text-xs text-gray-500">
              - {feedback.username}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Report;
