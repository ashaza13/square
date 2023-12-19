import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../style";
import { Link } from 'react-router-dom';

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
    };


    return (
        <div className={`${styles.paddingY} min-h-screen flex flex-col justify-center items-center`}>
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
                        <input type="submit" value="Register" className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 transition duration-500 rounded shadow-sm hover:bg-green-800 focus:outline-none focus:ring" />
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