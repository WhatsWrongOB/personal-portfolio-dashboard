import { useState } from "react";
import { useStore } from "../context";

const Modal = ({ data, onClose, type, accept }) => {
  const { createProject, updateProject, createSkill, updateSkill } = useStore();
  const [projectData, setProjectData] = useState({
    image: data?.image || "",
    name: data?.name || "",
    tech: data?.tech || "",
    type: data?.type || "",
    link: data?.link || "",
    description: data?.description || "",
  });
<<<<<<< HEAD
  const [projectImagePreview, setProjectImagePreview] = useState(
    data?.image || ""
  );
  const [skillImagePreview, setSkillImagePreview] = useState(data?.icon || "");
=======
>>>>>>> parent of ac2abd7 (add image func)

  const [skillData, setSkillData] = useState({
    icon: data?.icon || "",
    name: data?.name || "",
    proficiency: data?.proficiency || "",
    description: data?.description || "",
  });

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleSkillChange = (e) => {
<<<<<<< HEAD
    const { name, value, files } = e.target;
    if (name === "icon" && files && files[0]) {
      const imageFile = files[0];
      const url = URL.createObjectURL(imageFile);
      setSkillImagePreview(url);
      setSkillData({ ...skillData, [name]: imageFile });
    } else {
      setSkillData({ ...skillData, [name]: value });
    }
=======
    const { name, value } = e.target;
    setSkillData({ ...skillData, [name]: value });
>>>>>>> parent of ac2abd7 (add image func)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
  
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
      console.log(formData);
      createProject(formData);
    } else if (type === "add-skill") {
      const formData = new FormData();
      formData.append("icon", skillData.icon);
      formData.append("name", skillData.name);
      formData.append("proficiency", skillData.proficiency);
      formData.append("description", skillData.description);
      createSkill(formData);
=======

    if (type === "edit-project") {
      updateProject(data._id, projectData);
    } else if (type === "edit-skill") {
      updateSkill(data._id ,skillData);
    } else if (type === "add-project") {
      createProject(projectData);
    } else if (type === "add-skill") {
      createSkill(skillData);
>>>>>>> parent of ac2abd7 (add image func)
    }
    onClose();
  };
  
  console.log(skillData)


  return (
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
              <div>
                <label
                  className="block text-sm font-semibold mb-1"
                  htmlFor="image"
                >
<<<<<<< HEAD
                  Image
                  <input
                    name="image"
                    type="file"
                    onChange={handleProjectChange}
                    placeholder="Select Image"
                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
=======
                  Image Path
>>>>>>> parent of ac2abd7 (add image func)
                </label>
                <input
                  id="image"
                  name="image"
                  type="text"
                  value={projectData.image}
                  onChange={handleProjectChange}
                  placeholder="Enter Image Path"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
              <div>
                <label
                  className="block text-sm font-semibold mb-1"
                  htmlFor="icon"
                >
<<<<<<< HEAD
                  Icon
                  <input
                    name="icon"
                    type="file"
                    onChange={handleSkillChange}
                    placeholder="Enter Icon Path"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
                {skillImagePreview && (
                  <img
                    className="w-[60px] h-[60px] rounded-xl"
                    src={skillImagePreview}
                    alt={skillData?.name}
                  />
                )}
=======
                  Icon Path
                </label>
                <input
                  name="icon"
                  type="text"
                  value={skillData.icon}
                  onChange={handleSkillChange}
                  placeholder="Enter Icon Path"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
>>>>>>> parent of ac2abd7 (add image func)
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
  );
};

export default Modal;
