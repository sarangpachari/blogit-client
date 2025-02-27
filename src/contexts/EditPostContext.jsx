import React, { createContext, useState } from "react";
export const editPostShareContext = createContext();

const EditPostContext = ({ children }) => {
  const [editingPost, setEditingPost] = useState([]);

  return (
    <>
      <editPostShareContext.Provider value={{ editingPost, setEditingPost }}>
        {children}
      </editPostShareContext.Provider>
    </>
  );
};

export default EditPostContext;
