import React from "react";

export const Card = ({
  title,
  description,
  handleDelete,
  handleEdit,
  isDeleting,
}) => {
  return (
    <div className="mb-5 flex items-center justify-between rounded-xl border-[2px] bg-white p-5">
      <button
        className="mb-3 rounded-lg border-[2px] bg-yellow-400 px-4 py-2 font-semibold text-white transition-all duration-300 hover:border-yellow-400 hover:bg-white hover:text-yellow-400"
        onClick={handleEdit}
      >
        Edit
      </button>
      <div className="column px-4 text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-medium">{description}</p>
      </div>

      <button
        className="mb-3 rounded-lg border-[2px] bg-red-400 px-4 py-2 font-semibold text-white transition-all duration-300 hover:border-red-400 hover:bg-white hover:text-red-400"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? "Loading..." : "Delete"}
      </button>
    </div>
  );
};
