import { useState } from "react";
import { useStore } from "../context/index";
import ProjectModal from "../components/ProjectModal";
import Modal from "../components/Modal";

const ProjectManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [actionType, setActionType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { projects, deleteProject } = useStore();

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isAccepted = (project) => deleteProject(project._id);

  return (
    <>
      <div
        id="overflow"
        className="w-full h-full rounded-lg bg-gray-700 border border-gray-600 p-4 overflow-auto"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <h3 className="text-lg font-bold flex items-center gap-3">
            Manage Personal Projects
            <button
              onClick={() => {
                setActionType("add-project");
                setIsModalOpen(!isModalOpen);
              }}
              className="text-green-500 hover:text-green-600 text-sm"
              title="Add Project"
            >
              Add project
              <i className="fa-solid fa-plus text-xs ml-2"></i>
            </button>
          </h3>
          <input
            type="text"
            placeholder="Search by project name..."
            className="p-2 px-3 text-sm rounded bg-gray-600 text-white placeholder-gray-400 w-full sm:w-auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="min-w-[800px] sm:w-full text-left text-sm">
          <thead className="bg-gray-600">
            <tr>
              <th className="p-2 w-[130px]">Image</th>
              <th className="p-2">Name</th>
              <th className="p-2">Type</th>
              <th className="p-2">Tech Used</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => (
              <tr key={project._id} className="border-b border-gray-600">
                <td className="px-2 py-4">
                  <img
                    src={`${project.image.slice(8)}`}
                    alt={project.name}
                    className="w-[50px] rounded-lg"
                  />
                </td>
                <td className="px-2 py-4">{project.name}</td>
                <td className="px-2 py-4">{project.type}</td>
                <td className="px-2 py-4">{project.tech}</td>
                <td className="px-2 py-4 pl-4 flex gap-3 items-center">
                  <button
                    onClick={() => {
                      setSelectedProject(project);
                      setShowModal(!showModal);
                    }}
                    className="text-blue-500 hover:text-blue-700"
                    title="View Details"
                  >
                    <i className="fa-solid fa-eye"></i>
                  </button>
                  <button
                    onClick={() => {
                      setActionType("edit-project");
                      setSelectedProject(project);
                      setIsModalOpen(!isModalOpen);
                    }}
                    className="text-green-500 hover:text-green-700"
                    title="Edit"
                  >
                    <i className="fa-solid fa-edit"></i>
                  </button>
                  <button
                    onClick={() => {
                      setActionType("delete");
                      setSelectedProject(project);
                      setIsModalOpen(!isModalOpen);
                    }}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <ProjectModal
          project={selectedProject}
          closeModal={() => setShowModal(!showModal)}
        />
      )}
      {isModalOpen && (
        <Modal
          data={selectedProject}
          onClose={() => setIsModalOpen(!isModalOpen)}
          type={actionType}
          accept={isAccepted}
        />
      )}
    </>
  );
};

export default ProjectManagement;
