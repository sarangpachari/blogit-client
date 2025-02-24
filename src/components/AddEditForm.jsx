import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import React from "react";
import uploadImg from "../assets/upload-image.png";

const AddEditForm = () => {
  const label = { inputProps: { "aria-label": "Make it Private" } };
  return (
    <div>
      <form className="">
        <div className="w-full flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-1/2 flex flex-col gap-5">
            {/* TITLE */}
            <TextField
              label="Title"
              name="title"
              type="text"
              color="info"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputLabel-outlined": { color: "white" },
              }}
            />
            {/* DESCRIPTION */}
            <TextField
              label="Description"
              name="description"
              multiline
              rows={4}
              color="info"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputLabel-outlined": { color: "white" },
              }}
            />

            {/* PRIVACY CHECKING */}
            <FormGroup>
              <FormControlLabel
                control={<Checkbox color="warning" />}
                label="Make it Private"
              />
            </FormGroup>
          </div>
          <div className="w-full md:w-1/2">
            <label>
              <div className="w-full border h-[250px] flex items-center justify-center">
                <input type="file" className="w-full hidden" />
                <img
                  src={uploadImg}
                  className="w-1/2 md:w-1/3 p-5 md:m-5"
                  alt="Choose File"
                />
                <p className="px-5 lg:text-lg text-gray-400">
                  Upload Thumbnail For Your Blog
                </p>
              </div>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEditForm;
