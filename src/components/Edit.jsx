import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import uploadImg from "../assets/upload-image.png";
import { useNavigate, useParams } from "react-router-dom";
import { editPostShareContext } from "../contexts/EditPostContext";
import SERVER_BASE_URL from "../services/serverURL";
import { editPostAPI } from "../services/allAPI";

const Edit = () => {
  const { id } = useParams();
  const { editingPost, setEditingPost } = useContext(editPostShareContext);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //FORM DATA
  const [formData, setFormData] = useState({
    title: editingPost?.title || "",
    description: editingPost?.description || "",
    content: editingPost?.content || "",
    isPrivate: editingPost?.isPrivate || false,
    thumbnail: editingPost?.thumbnail
      ? `${SERVER_BASE_URL}/${editingPost.thumbnail}`
      : null,
  });

  //PREVIEW IMAGE
  const [previewImage, setPreviewImage] = useState(
    editingPost?.thumbnail
      ? `${SERVER_BASE_URL}/${editingPost.thumbnail}`
      : null
  );

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

  // HANDLE UPDATE POST
  const handleUpdatePost = async (event) => {
    event.preventDefault();
    setLoading(true);

    const updatedFormData = new FormData();
    updatedFormData.append("title", formData.title);
    updatedFormData.append("description", formData.description);
    updatedFormData.append("content", formData.content);
    updatedFormData.append("isPrivate", formData.isPrivate);

    if (formData.thumbnail instanceof File) {
      updatedFormData.append("thumbnail", formData.thumbnail);
    }

    const token = localStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      };

      try {
        const response = await editPostAPI(id, updatedFormData, reqHeader);

        if (response.status === 200) {
          alert("Post updated successfully!");
          setEditingPost(null);
          navigate("/dashboard");
        } else {
          setError("Failed to update post. Please try again.");
        }
      } catch (error) {
        console.error("Error updating post:", error);
        setError("An error occurred while updating the post.");
      }
    } else {
      setError("You must be logged in to update this post.");
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
                    className="w-full h-full"
                    alt="Selected thumbnail"
                  />
                ) : (
                  <>
                    <img
                      src={formData?.thumbnail}
                      className="w-full h-full"
                      alt="Choose File"
                    />
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
        <div className="flex justify-end md:gap-10 gap-2 my-5">
          <button
            type="submit"
            onClick={handleUpdatePost}
            className="w-[100px] border p-2 bg-white text-black"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
