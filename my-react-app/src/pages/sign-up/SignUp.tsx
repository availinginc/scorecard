import React, { useState } from "react";
import { signupChallenge, signupStart } from "../../client/SignUpService";
import { useNavigate } from "react-router-dom";
import type { ErrorResponseType } from "../../client/ResponseTypes";

export const SignUp: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const navigate = useNavigate();
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !surname || !email) {
      setError("All fields are required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    setError("");
    try {
      setIsloading(true);
      const res1 = await signupStart({
        name,
        surname,
        username: email,
        password,
      });
      const res2 = await signupChallenge({
        continuation_token: res1.continuation_token,
      });
      navigate("/signup/challenge", { state: { ...res2 } });
    } catch (err) {
      console.log("Submitting sign up form", err);
      setError(
        "An error occurred during sign up " +
          (err as ErrorResponseType).error_description
      );
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="sign-up-form">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        {isLoading && <div className="warning">Sending request...</div>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
