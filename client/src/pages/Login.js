import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../style";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// Login component
const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset the errors
    setEmailError("");
    setPasswordError("");

    // Validate the email and password
    if (!email) {
      setEmailError("Email is required");
    }
    if (!password) {
      setPasswordError("Password is required");
    }

    // If there are no errors, try to login the user
    if (!emailError && !passwordError) {
      setLoading(true);

      // Send a POST request to the server
      fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => {
          setLoading(false);

          // If the credentials are invalid, show an error
          if (res.status === 401) {
            setEmailError("Invalid credentials");
            return;
          }

          toast.success("Logged in successfully");
          // If the credentials are valid, log the user in
          if (res.status === 200) {
            setLoggedIn(true);
            
            navigate("/");
            return;
          }

          // Throw an error if the status code is none of the above
          throw new Error("Unable to login");
        })
        .catch((err) => {
          console.error(err);
          setEmailError("Unable to login");
        });
    }
  };

  return (
    <div className={`${styles.paddingY} min-h-screen flex flex-col justify-center items-center`}>
      <div className="max-w-xs bg-zinc-700 rounded shadow-md p-12">
        <h2 className="text-xl font-bold text-center text-white">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control w-full px-3 py-2 text-sm text-white bg-zinc-800 rounded border-0 shadow-sm focus:outline-none focus:ring focus:ring-green-300"
            />
            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control w-full px-3 py-2 text-sm text-white bg-zinc-800 rounded border-0 shadow-sm focus:outline-none focus:ring focus:ring-green-300"
            />
            {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
          </div>
          <div className="flex items-center">
            <input type="submit" value="Login" className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded shadow-sm transition duration-500 hover:bg-green-800 focus:outline-none focus:ring focus:ring-green-300" />
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-white">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-600 transition hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;