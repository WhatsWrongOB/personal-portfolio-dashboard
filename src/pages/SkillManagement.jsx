import { useState } from "react";
import Modal from "../components/Modal";
import { useStore } from "../context";

const SkillManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedskill, setSelectedskill] = useState(null);
  const [actionType, setactionType] = useState("");

  const { skills, deleteSkill } = useStore();

  const handleDeleteClick = (skill) => {
    setSelectedskill(skill);
    setactionType("delete");
    setIsModalOpen(true);
  };

  const handleEditClick = (skill) => {
    setSelectedskill(skill);
    setactionType("edit-skill");
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setactionType("add-skill");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const isAccepted = (skill) => deleteSkill(skill._id);

  const filteredSkills = skills.filter((skill) =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      id="overflow"
      className="w-full h-full rounded-lg bg-gray-700 border border-gray-600 p-4 overflow-auto"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h3 className="text-lg font-bold flex items-center gap-3">
          Manage Technical Skills{" "}
          <button
            className="text-green-500 hover:text-green-600 text-sm"
            title="Mark as Admin"
            onClick={() => handleAddClick}
          >
            Add skill
            <i className="ml-2 fa-solid fa-plus text-xs"></i>
          </button>{" "}
        </h3>
        <input
          type="text"
          placeholder="Search by skill name..."
          className="p-2 px-3 text-sm rounded bg-gray-600 text-white placeholder-gray-400 w-full sm:w-auto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table
        id="overflow"
        className="min-w-[600px] sm:w-full text-left text-sm overflow-auto"
      >
        <thead className="bg-gray-600">
          <tr>
            <th className="p-2  w-[120px]">Icon</th>
            <th className="p-2 w-[150px]">Name</th>
            <th className="p-2 w-[400px]">Description</th>
            <th className="p-2 w-[100px]">Proficiency</th>
            <th className="p-2 w-[100px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSkills.map((skill, index) => (
            <tr key={index} className="border-b border-gray-600">
              <td className="p-2 relative">
                <div className="relative w-10 h-10">
                  <img
                    src={`${skill.icon.slice(8)}`}
                    alt={skill.name}
                    className="w-full h-full rounded-lg"
                  />
                  {skill.isAdmin && (
                    <i className="fa-solid fa-crown absolute top-1 right-1 text-yellow-400 text-xs"></i>
                  )}
                </div>
              </td>
              <td className="p-2">{skill.name}</td>
              <td className="p-2">{skill.description.slice(0, 45) + "...."}</td>
              <td className="p-2">{skill.proficiency} %</td>
              <td className="p-2 pl-4 flex gap-5 items-center">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  title="Mark as Admin"
                  onClick={() => handleEditClick(skill)}
                >
                  <i className="fa-solid fa-edit"></i>
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                  onClick={() => handleDeleteClick(skill)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <Modal
          data={selectedskill}
          onClose={closeModal}
          type={actionType}
          accept={isAccepted}
        />
      )}
    </div>
  );
};

export default SkillManagement;
