import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/allAPI";
import { tokenContext } from "../contexts/TokenAuth";

const Login = () => {
  const { authorisedUser, setAuthorisedUser } = useContext(tokenContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //HANDLE SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.email && formData.password) {
      //API CALL
      try {
        setLoading(true);
        const result = await loginAPI(formData);
        if (result.status == 200) {
          localStorage.setItem("user", JSON.stringify(result.data.user));
          localStorage.setItem("token", result.data.token);
          setAuthorisedUser(true);
          setTimeout(() => {
            navigate("/");
            setFormData({ email: "", password: "" });
          }, 2000);
        } else if (result.status == 400) {
          setError(result.response.data.message);
          setLoading(false)
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setError("Please fill all fields");
      setLoading(false)
    }
  };

  
  

  return (
    <>
      <div className="w-full h-lvh flex justify-center items-center">
        <div className="flex flex-col gap-5 md:w-1/3">
          {/* FORM TITLE */}
          <div className="">
            <h1 className="text-white text-4xl">Open Your Blog Space</h1>
          </div>

          {/* LOGIN FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <TextField
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              color="success"
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
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              color="success"
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

            {error && <p className="text-red-500">{error}</p>}

            {/* LOGIN BUTTON */}
            <Button
              variant="contained"
              color="inherit"
              fullWidth
              type="submit"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </form>

          {/* NEW REGISTRATION */}
          <div className="">
            <p className="text-white">
              Don't have an account?
              <Link to={"/register"}>
                <span className="hover:cursor-pointer hover:text-red-600">
                  {" "}
                  Create Now !
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
