import React from "react";

const ProjectModal = ({ project, closeModal }) => {
  return (
    <div
      onClick={closeModal}
      id="modal"
      className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center"
    >
      <div class="sidebar_animation flex flex-col md:flex-row justify-center items-center w-[95%] sm:w-[670px] h-auto md:h-[295px] bg-white border text-black border-[#182536] rounded-2xl relative md:static">
        <div class="w-full md:w-[25%] h-full flex md:justify-center items-start pl-4 pb-4 md:pl-0">
          <div class="mt-5 md:mt-10 section-border w-[60px] xl:w-[80px] h-[60px] xl:h-[80px] overflow-hidden rounded-2xl">
            <img
              class="w-full h-full"
              src={project.image}
              alt={project.name}
            />
          </div>
        </div>
        <div class="w-full md:w-[75%] pr-5 pb-7 md:pb-0 md:relative pl-4 md:pl-0">
          <i
            onClick={closeModal}
            class="cursor-pointer fa-solid fa-close text-black absolute right-7 top-3 md:top-[-5px]"
          ></i>
          <div>
            <h3 class="text-[1.1rem] md:text-[1.2rem] font-semibold">
              {project.name}
            </h3>
            <p class="py-1 text-[0.9rem]">
              <strong>Tech:</strong> {project.tech}
            </p>
            <p class="text-[0.9rem]">
              <strong>Description:</strong> {project.description}
            </p>
            <div class="mt-2 flex items-center gap-2">
              <a
                class="text-blue-950 hover:underline text-sm"
                href={project.link}
              >
                Github Link
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
