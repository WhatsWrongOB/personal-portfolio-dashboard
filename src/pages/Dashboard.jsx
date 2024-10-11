import BarGraph from "../components/Bar";
import PieGraph from "../components/Pie";
import InfoCard from "../components/InfoCard";
import { useStore } from "../context";

const Dashboard = () => {
  const { totalProjects, totalSkills, totalMessages, messages } = useStore();

  const infoCardData = [
    {
      id: 1,
      title: "Personal Projects",
      stats: totalProjects,
      range: 90,
    },
    {
      id: 2,
      title: "Technical Skills",
      stats: totalSkills,
      range: 50,
    },
    {
      id: 3,
      title: "Messages",
      stats: totalMessages,
      range: 30,
    },
  ];

  return (
    <>
      <div
        id="overview"
        className="w-full flex flex-col lg:flex-row justify-between gap-2 lg:gap-0"
      >
        {infoCardData.map((item) => (
          <InfoCard key={item.id} detail={item} />
        ))}
      </div>

      <div className="flex justify-between md:flex-row flex-col h-auto md:h-[400px] mb-4">
        <div className="w-full md:w-[59%] h-full mt-2 rounded-lg bg-gray-700 border border-gray-600 p-4">
          <h3 className="text-lg font-bold mb-10">Student Admmisions</h3>
          <div className="w-full flex justify-center">
            <BarGraph />
          </div>
        </div>

        <div className="w-full md:w-[40%] h-full mt-2 rounded-lg bg-gray-700 border border-gray-600 p-4">
          <h3 className="text-lg font-bold mb-10">Student Application</h3>
          <div className="w-full flex justify-center h-[300px] pb-4">
            <PieGraph />
          </div>
        </div>
      </div>

      <div
        id="overflow"
        className="w-full mt-2 rounded-lg bg-gray-700 border border-gray-600 p-4 overflow-auto"
      >
        <h3 className="text-lg font-bold mb-4">User Messages</h3>
        <div className="space-y-4">
          {messages?.slice(0, 3).map((item) => (
            <div key={item._id} className="p-3 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400">"{item.message}"</p>
              <p className="text-right mt-2 text-xs text-gray-500">
                - {item.username}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
