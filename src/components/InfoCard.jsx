

const InfoCard = ({ detail }) => {
  return (
    <div className="w-full lg:w-[32.55%] h-[158px] rounded-lg bg-gray-700 border border-gray-600 p-4">
      <h3 className="text-lg font-bold mb-3">{detail.title}</h3>
      <p className="text-2xl md:text-3xl font-semibold">{detail.stats}</p>
      <p className="text-sm text-gray-400 mt-2">Since last month</p>
      <div className="mt-3 section-border w-[100%] h-[7px] rounded-xl bg-[#383838] overflow-hidden">
        <div className={`h-full w-[${detail.range}%] bg-[#FFC260]`}></div>
      </div>
    </div>
  );
};

export default InfoCard;
