import React from "react";
import { Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Add from "../components/Add";
import Edit from "../components/Edit";

const AddEditPost = () => {
  const addOrEdit = useParams();

  return (
    <div className="mt-5">
      {/* HEADING */}
      <div className="w-full flex justify-between py-5 border-b-6 border-b-white">
        <h1 className="text-2xl md:text-5xl text-white font-extralight">
          Blog Here !
        </h1>
        <Link to={"/dashboard"}>
          <Button color="info" variant="contained">
            Dashboard
          </Button>
        </Link>
      </div>

      {/* FORM */}
      <div className="w-full py-5 text-white">
        {addOrEdit.id == "new" ? <Add /> : <Edit />}
      </div>
    </div>
  );
};

export default AddEditPost;
