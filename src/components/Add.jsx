import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import uploadImg from "../assets/upload-image.png";
import { createPostAPI } from "../services/allAPI";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const label = { inputProps: { "aria-label": "Make it Private" } };
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  

  //FORM DATA
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isPrivate: false,
    content: "",
    thumbnail: null,
  });

  //HANDLE FILE SELECTION
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, thumbnail: file });

      //SHOW IMAGE PREVIEW
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  //HANDLE CLEAR FORM
  const handleClearForm = () => {
    setFormData({
      title: "",
      description: "",
      isPrivate: false,
      content: "",
      thumbnail: null,
    });
  };

  //HANDLE FORM SUBMISSION
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    //PREPARING FORM
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("isPrivate", formData.isPrivate);
      formDataToSend.append("content", formData.content);

      if (formData.thumbnail) {
        formDataToSend.append("thumbnail", formData.thumbnail);
      }

      const token = localStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        };

        //API CALL
        const result = await createPostAPI(formDataToSend,reqHeader);

        if (result.status === 201) {
          navigate("/dashboard");
        } else {
          setError("Failed to create post. Please try again.");
        }
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  

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
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
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
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
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
                control={
                  <Checkbox
                    color="warning"
                    checked={formData.isPrivate}
                    onChange={(e) =>
                      setFormData({ ...formData, isPrivate: e.target.checked })
                    }
                  />
                }
                label="Make it Private"
              />
            </FormGroup>
          </div>

          {/* THUMBNAIL UPLOAD */}
          <div className="w-full md:w-1/2">
            <label>
              <div className="w-full border h-[250px] flex items-center justify-center">
                <input
                  type="file"
                  className="w-full hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {previewImage ? (
                  <img
                    src={previewImage}
                    className="w-full h-full "
                    alt="Selected thumbnail"
                  />
                ) : (
                  <>
                    <img
                      src={uploadImg}
                      className="w-1/2 md:w-1/3 p-5 md:m-5 object-cover"
                      alt="Choose File"
                    />
                    <p className="px-5 lg:text-lg text-gray-400">
                      Upload Thumbnail For Your Blog
                    </p>
                  </>
                )}
              </div>
            </label>
          </div>
        </div>
        {/* CONTENT AREA */}
        <div className="mt-10">
          <TextField
            label="Content"
            placeholder="Type here"
            name="content"
            multiline
            rows={20}
            color="info"
            fullWidth
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
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
        </div>

        {/* ERROR MESSAGE */}
        {error && <p className="text-red-500 mt-3">{error}</p>}

        {/* SUBMIT SECTION */}
        {/* SUBMIT BUTTON */}
        <div className="flex justify-between mt-5">
          <Button
            type="reset"
            variant="text"
            color="error"
            onClick={handleClearForm}
          >
            Clear
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Posting..." : "Post"}
          </Button>
        </div>
      </form>

      
    </div>
  );
};

export default Add;
