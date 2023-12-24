import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../style";
import Cookie from 'js-cookie';
import { Spinner } from '../components';
import { toast } from 'react-toastify';

// Register component
const Register = ({ setSignedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset the errors
        setEmailError("");
        setPasswordError("");
        setUsernameError("");

        // Validate the email, password, and username
        if (!email) {
            setEmailError("Email is required");
            return;
        }
        if (!password) {
            setPasswordError("Password is required");
            return;
        }
        if (!username) {
            setUsernameError("Username is required");
            return;
        }

        // If there are no errors, try to register the user
        if (!emailError && !passwordError && !usernameError) {
            fetch("http://localhost:3001/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            })
                .then((res) => {
                    if (!res.ok) {
                        if (res.status === 400) {
                            setEmailError("Email already exists");
                        } else {
                            throw new Error("Unable to register");
                        }
                        return;
                    }
                    return res.json();
                })
                .then((data) => {
                    if (data) {
                        // setSignedIn(true);
                        // Store the necessary data in a cookie
                        const expirationTime = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 3); // Adjust the expiration time as needed
                        Cookie.set('auth', JSON.stringify(data), { expires: expirationTime });
                        toast.success("Registered successfully");
                        navigate("/");
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };


    return (
        <div className={`${styles.paddingY} min-h-screen flex flex-col justify-center items-center`}>
            <h1 className="text-6xl font-bold text-white pb-8 animate-bounce">Welcome to Squares</h1>
            <div className="max-w-md bg-zinc-700 rounded shadow-md p-12">
                <h2 className="text-xl font-bold text-center text-white">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-white">
                            Username
                        </label>
                        <input
                            type="username"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control w-full px-3 py-2 text-sm text-white bg-zinc-800 rounded border-0 shadow-sm focus:outline-none focus:ring"
                        />
                        {usernameError && <p className="text-red-500 text-xs mt-1">{usernameError}</p>}
                    </div>
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
                            className="form-control w-full px-3 py-2 text-sm text-white bg-zinc-800 rounded border-0 shadow-sm focus:outline-none focus:ring"
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
                            className="form-control w-full px-3 py-2 text-sm text-white bg-zinc-800 rounded border-0 shadow-sm focus:outline-none focus:ring"
                        />
                        {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                    </div>
                    <div className="flex items-center">
                        <input type="submit" value="Register" className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 transition duration-500 rounded shadow-sm hover:bg-green-800 focus:outline-none focus:ring focus:ring-green-300" />
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm text-white">
                        Already have an account?{" "}
                        <Link to="/login" className="text-green-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;