import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const URL = import.meta.env.VITE_API_URL;
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [messages, setMessages] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalSkills, setTotalSkills] = useState(0);
  const [totalMessages, setTotalMessages] = useState(0);
  const configuration = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  /*_______________________Projects CRUD_________________________*/

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get(`${URL}/projects`);
      if (data.success) {
        setProjects(data.projects);
        setTotalProjects(data.totalProjects);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const createProject = async (project) => {
    try {
      const { data } = await axios.post(
        `${URL}/projects`,
        project,
        configuration
      );
      if (data.success) {
        toast.success(data.message);
        fetchProjects();
      }
    } catch (error) {
      toast.error(error.response?.data.message);
      console.log(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const updateProject = async (id, project) => {
    try {
      const { data } = await axios.patch(
        `${URL}/projects/${id}`,
        project,
        configuration
      );
      if (data.success) {
        toast.success(data.message);
        fetchProjects();
      }
    } catch (error) {
      toast.error(error.response?.data.message);
      console.log(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const deleteProject = async (id) => {
    try {
      const { data } = await axios.delete(`${URL}/projects/${id}`);
      if (data.success) {
        toast.success(data.message);
        fetchProjects();
      }
    } catch (error) {
      toast.error(error.response?.data.message);
      console.log(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  /*_______________________Skill CRUD_________________________*/

  const fetchSkills = async () => {
    try {
      console.log("Skill fetched");
      const { data } = await axios.get(`${URL}/skills`);
      if (data.success) {
        setSkills(data.skills);
        setTotalSkills(data.totalSkills);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteSkill = async (id) => {
    try {
      const { data } = await axios.delete(`${URL}/skills/${id}`);
      if (data.success) {
        toast.success(data.message);
        fetchSkills();
      }
    } catch (error) {
      toast.error(error.response?.data.message);
      console.log(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const createSkill = async (skill) => {
    try {
      const { data } = await axios.post(`${URL}/skills`, skill, configuration);
      console.log(data)
      if (data.success) {
        toast.success(data.message);
        fetchSkills();
      }
    } catch (error) {
      toast.error(error.response?.data.message);
      console.log(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const updateSkill = async (id, skill) => {
    try {
      const { data } = await axios.patch(
        `${URL}/skills/${id}`,
        skill,
        configuration
      );
      if (data.success) {
        toast.success(data.message);
        fetchSkills();
      }
    } catch (error) {
      toast.error(error.response?.data.message);
      console.log(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  /*_______________________Messages________________________*/

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(`${URL}/message`);
      if (data.success) {
        setMessages(data.messages.toReversed());
        setTotalMessages(data.totalMessages);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  /*
  Calling function in use effect
  */
  useEffect(() => {
    fetchProjects();
    fetchSkills();
    fetchMessages();
  }, []);

  return (
    <AppContext.Provider
      value={{
        projects,
        totalProjects,
        updateProject,
        createProject,
        deleteProject,
        skills,
        totalSkills,
        deleteSkill,
        createSkill,
        updateSkill,
        messages,
        totalMessages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useStore = () => useContext(AppContext);

export { AppProvider, useStore };

// "icon":"./assets/images/sass.svg",
// "name": "sdfgh",
// "description":"Experienced in using SASS for writing maintainable and reusable styles",
// "proficiency":"70"

// "image": "./assets/images/project-2.png",
// "name": "📚 Check",
// "type": "Web Development",
// "tech": "Node.js, Express, MongoDB",
// "description": "🔧 Built the backend of a Learning Management System (LMS) using modern technologies.",
// "link": "https://github.com/WhatsWrongOB/lms-server-typescript"
