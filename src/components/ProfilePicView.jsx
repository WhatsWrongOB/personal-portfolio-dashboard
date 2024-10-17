import React from 'react'

const ProfilePicView = ({picture, toogleImageModal}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
    <div className="relative">
      {/* Enlarged Image */}
      <img
        src="https://obaidbroimages.netlify.app/obaid.png"
        alt="Profile Enlarged"
        className="w-96 h-96 rounded-full"
      />
      {/* Close Icon */}
      <button
        className="absolute top-2 right-2 text-white text-3xl font-bold cursor-pointer"
        onClick={toogleImageModal}
      >
        &times;
      </button>
    </div>
  </div>
  )
}

export default ProfilePicView