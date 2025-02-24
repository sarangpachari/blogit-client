import React from "react";
import AddEditForm from "../components/AddEditForm";

const AddEditPost = () => {
  return (
    <div className="mt-5">
      {/* HEADING */}
      <div className="w-full py-5 border-b-6 border-b-white">
        <h1 className="text-2xl md:text-5xl text-white font-extralight">
          Blog Here !
        </h1>
      </div>

      {/* FORM */}
      <div className="w-full py-5 text-white">
        <AddEditForm />
      </div>
    </div>
  );
};

export default AddEditPost;
