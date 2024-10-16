import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { getOSAndBrowser, useGetToken } from "../utils";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const URL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [messages, setMessages] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalSkills, setTotalSkills] = useState(0);
  const [totalMessages, setTotalMessages] = useState(0);
  const [notificationMessage, setNotificationMessage] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);


  const {token} = useGetToken();
  const configuration = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const handleNotification = useCallback((message) => {
    setNotificationMessage((prev) => [...prev, message]);
    setUnreadCount((prevCout) => prevCout + 1);
    toast.success(message);
  }, []);

  useEffect(() => {
    const savedNotifications =
      JSON.parse(localStorage.getItem("notificationMessages")) || [];
    const unreadCount = localStorage.getItem("unreadCount");
    setNotificationMessage(savedNotifications);
    setUnreadCount(unreadCount);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "notificationMessages",
      JSON.stringify(notificationMessage)
    );
  }, [notificationMessage]);

  useEffect(() => {
    localStorage.setItem("unreadCount", unreadCount);
  }, [unreadCount]);

  /*_______________________Login_________________________*/

  const login = async (credentials) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${URL}/login`,
        credentials,
        configuration
      );
      if (data.success) {
        localStorage.setItem("token", JSON.stringify(data.user));
        const now = new Date();
        const formattedDate = now.toLocaleString("en-US");
        setNotificationMessage([
          ...notificationMessage,
        `🔑 Login observed on ${formattedDate} from a device using ${getOSAndBrowser()} 🌐`
        ]);
        setUnreadCount((prev) => prev + 1);
        return data.success;
      }
    } catch (error) {
      toast.error(error.response?.data.message || "Internal Server Error");
      console.log(
        "Error:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
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
        handleNotification(`${project.name} created successfully`);
        fetchProjects();
      }
    } catch (error) {
      toast.error(error.response?.data.message || "Error creating project");
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
        handleNotification(`${project.name} updated successfully ✨`);
        fetchProjects();
      }
    } catch (error) {
      toast.error(error.response?.data.message || "Error updating project");
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
        handleNotification("Project deleted successfully 🗑️");
        fetchProjects();
      }
    } catch (error) {
      toast.error(error.response?.data.message || "Error deleting project");
      console.log(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  /*_______________________Skill CRUD_________________________*/

  const fetchSkills = async () => {
    try {
      const { data } = await axios.get(`${URL}/skills`);
      if (data.success) {
        setSkills(data.skills);
        setTotalSkills(data.totalSkills);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const createSkill = async (skill) => {
    try {
      const { data } = await axios.post(`${URL}/skills`, skill, configuration);
      if (data.success) {
        handleNotification(`${skill.name} created successfully 🎉`);
        fetchSkills();
      }
    } catch (error) {
      toast.error(error.response?.data.message || "Error creating skill");
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
        handleNotification(`${skill.name} updated successfully ✨`);
        fetchSkills();
      }
    } catch (error) {
      toast.error(error.response?.data.message || "Error updating skill");
      console.log(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const deleteSkill = async (id) => {
    try {
      const { data } = await axios.delete(`${URL}/skills/${id}`);
      if (data.success) {
        handleNotification("Skill deleted successfully 🗑️");
        fetchSkills();
      }
    } catch (error) {
      toast.error(error.response?.data.message || "Error deleting skill");
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

  // Calling function in useEffect
  useEffect(() => {
    if (token) {
      fetchProjects();
      fetchSkills();
      fetchMessages();
    }
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        login,
        loading,
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
        notificationMessage,
        setNotificationMessage,
        setUnreadCount,
        unreadCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useStore = () => useContext(AppContext);

export { AppProvider, useStore };
