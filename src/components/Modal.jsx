import { useState } from "react";
import { useStore } from "../context";
import Loader from "./Loader";

const Modal = ({ data, onClose, type, accept }) => {
  const { createProject, updateProject, createSkill, updateSkill, loading } = useStore();
  const [projectData, setProjectData] = useState({
    image: data?.image || "",
    name: data?.name || "",
    tech: data?.tech || "",
    type: data?.type || "",
    link: data?.link || "",
    description: data?.description || "",
  });

  const [skillData, setSkillData] = useState({
    icon: data?.icon || "",
    name: data?.name || "",
    proficiency: data?.proficiency || "",
    description: data?.description || "",
  });
  const [projectImagePreview, setProjectImagePreview] = useState(
    projectData.image || ""
  );
  const [skillImagePreview, setSkillImagePreview] = useState(
    skillData.icon || ""
  );

  const handleProjectChange = (e) => {
    const { name, value } = e.target;

    if (name === "image") {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setProjectData({ ...projectData, image: file });
        setProjectImagePreview(imageUrl);
      }
    } else {
      setProjectData({ ...projectData, [name]: value });
    }
  };

  const handleSkillChange = (e) => {
    const { name, value } = e.target;

    if (name === "icon") {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setSkillData({ ...skillData, icon: file });
        setSkillImagePreview(imageUrl);
      }
    } else {
      setSkillData({ ...skillData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "edit-project") {
      const formData = new FormData();
      formData.append("image", projectData.image);
      formData.append("name", projectData.name);
      formData.append("tech", projectData.tech);
      formData.append("type", projectData.type);
      formData.append("link", projectData.link);
      formData.append("description", projectData.description);
      updateProject(data._id, formData);
    } else if (type === "edit-skill") {
      const formData = new FormData();
      formData.append("icon", skillData.icon);
      formData.append("name", skillData.name);
      formData.append("proficiency", skillData.proficiency);
      formData.append("description", skillData.description);
      updateSkill(data._id, formData);
    } else if (type === "add-project") {
      const formData = new FormData();
      formData.append("image", projectData.image);
      formData.append("name", projectData.name);
      formData.append("tech", projectData.tech);
      formData.append("type", projectData.type);
      formData.append("link", projectData.link);
      formData.append("description", projectData.description);
      createProject(formData);
    } else if (type === "add-skill") {
      const formData = new FormData();
      formData.append("icon", skillData.icon);
      formData.append("name", skillData.name);
      formData.append("proficiency", skillData.proficiency);
      formData.append("description", skillData.description);
      console.log(formData);
      createSkill(formData);
    }

      onClose();
  };

  return (
    <>
      <div
        id="modal"
        className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center"
      >
        {type === "delete" ? (
          <div className="bg-white text-black p-4 rounded-lg w-[92%] md:w-[400px] max-w-md">
            <h3 className="text-lg font-bold mb-4" id="modal-title">
              Confirmation
            </h3>
            <p id="modal-message">
              Are you sure you want to delete {data?.name}?
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                id="modal-confirm"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  accept(data);
                  onClose();
                }}
              >
                Confirm
              </button>
              <button
                id="modal-cancel"
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white text-black p-6 rounded-lg w-[92%] md:w-[500px]">
            {type === "edit-project" || type === "add-project" ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Project form */}
                <div className="flex justify-between items-center">
                  <label
                    className="block text-sm font-semibold mb-1"
                    htmlFor="image"
                  >
                    Image Path
                    <input
                      id="image"
                      name="image"
                      type="file"
                      onChange={handleProjectChange}
                      accept="image/*"
                      className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                  {projectImagePreview && (
                    <img
                      className="w-[70px] h-[60px] rounded-md"
                      src={projectImagePreview}
                      alt={projectData.name}
                    />
                  )}
                </div>
                <div>
                  <label
                    className="block text-sm font-semibold mb-1"
                    htmlFor="name"
                  >
                    Project Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={projectData.name}
                    onChange={handleProjectChange}
                    placeholder="Enter Project Name"
                    required
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-semibold mb-1"
                    htmlFor="tech"
                  >
                    Technology Used
                  </label>
                  <input
                    name="tech"
                    type="text"
                    value={projectData.tech}
                    onChange={handleProjectChange}
                    placeholder="Enter Technology Used"
                    required
                    className="w-full px-4 py-2 border text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-semibold mb-1"
                    htmlFor="type"
                  >
                    Project Type
                  </label>
                  <input
                    name="type"
                    type="text"
                    value={projectData.type}
                    onChange={handleProjectChange}
                    placeholder="Enter Project Type"
                    required
                    className="w-full px-4 py-2 border text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-semibold mb-1"
                    htmlFor="image"
                  >
                    Github Link
                  </label>
                  <input
                    name="link"
                    type="text"
                    value={projectData.link}
                    onChange={handleProjectChange}
                    placeholder="Enter Github Link"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-semibold mb-1"
                    htmlFor="description"
                  >
                    Project Description
                  </label>
                  <textarea
                    name="description"
                    rows="4"
                    value={projectData.description}
                    onChange={handleProjectChange}
                    placeholder="Enter Project Description"
                    required
                    className="w-full px-4 py-2 border text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    className="bg-gray-500 text-sm text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-sm text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    {type === "add-project" ? "Add Project" : "Edit Project"}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Skill form */}
                <div className="flex justify-between items-center">
                  <label
                    className="block text-sm font-semibold mb-1"
                    htmlFor="icon"
                  >
                    Icon Path
                    <input
                      name="icon"
                      type="file"
                      onChange={handleSkillChange}
                      accept="image/*"
                      className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                  {skillImagePreview && (
                    <img
                      className="w-[70px] h-[60px] rounded-md"
                      src={skillImagePreview}
                      alt={projectData.name}
                    />
                  )}
                </div>
                <div>
                  <label
                    className="block text-sm font-semibold mb-1"
                    htmlFor="name"
                  >
                    Skill Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={skillData.name}
                    onChange={handleSkillChange}
                    placeholder="Enter Skill Name"
                    required
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-semibold mb-1"
                    htmlFor="proficiency"
                  >
                    Proficiency
                  </label>
                  <input
                    name="proficiency"
                    type="text"
                    value={skillData.proficiency}
                    onChange={handleSkillChange}
                    placeholder="Enter Proficiency"
                    required
                    className="w-full px-4 py-2 border text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-semibold mb-1"
                    htmlFor="description"
                  >
                    Skill Description
                  </label>
                  <textarea
                    name="description"
                    rows="4"
                    value={skillData.description}
                    onChange={handleSkillChange}
                    placeholder="Enter Skill Description"
                    required
                    className="w-full px-4 py-2 border text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    className="bg-gray-500 text-sm text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-sm text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    {type === "add-skill" ? "Add Skill" : "Edit Skill"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Modal;
