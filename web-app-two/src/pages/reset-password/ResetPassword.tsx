// ResetPassword.tsx
import React, { useState } from "react";
import {
  resetChallenge,
  resetStart,
  resetSubmitNewPassword,
  resetSubmitOTP,
} from "../../client/ResetPasswordService";
import {
  ChallengeResetResponse,
  ChallengeResponse,
  ErrorResponseType,
} from "../../client/ResponseTypes";

export const ResetPassword: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [otp, setOTP] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [tokenRes, setTokenRes] = useState<ChallengeResponse>({
    binding_method: "",
    challenge_channel: "",
    challenge_target_label: "",
    challenge_type: "",
    code_length: 0,
    continuation_token: "",
    interval: 0,
  });
  const [otpRes, setOTPRes] = useState<ChallengeResetResponse>({
    expires_in: 0,
    continuation_token: "",
  });

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username) {
      setError("Username is required");
      return;
    }
    setError("");
    try {
      setIsloading(true);
      const res1 = await resetStart({ username });
      const tokenRes = await resetChallenge({
        continuation_token: res1.continuation_token,
      });
      setTokenRes(tokenRes);
      setStep(2);
    } catch (err) {
      setError(
        "An error occurred during password reset " +
          (err as ErrorResponseType).error_description
      );
    } finally {
      setIsloading(false);
    }
  };

  const handleSubmitCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otp) {
      setError("All fields are required");
      return;
    }
    setError("");
    try {
      setIsloading(true);
      const res = await resetSubmitOTP({
        continuation_token: tokenRes.continuation_token,
        oob: otp,
      });
      setOTPRes(res);
      setStep(3);
    } catch (err) {
      setError(
        "An error occurred while submitting the otp code " +
          (err as ErrorResponseType).error_description
      );
    } finally {
      setIsloading(false);
    }
  };

  const handleSubmitNewPassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!newPassword) {
      setError("All fields are required");
      return;
    }
    setError("");
    try {
      setIsloading(true);
      await resetSubmitNewPassword({
        continuation_token: otpRes.continuation_token,
        new_password: newPassword,
      });
      setStep(4);
    } catch (err) {
      setError(
        "An error occurred while submitting the new password " +
          (err as ErrorResponseType).error_description
      );
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="reset-password-form">
      //collect username to initiate password reset flow
      {step === 1 && (
        <form onSubmit={handleResetPassword}>
          <h2>Reset Password</h2>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          {error && <div className="error">{error}</div>}
          {isLoading && <div className="warning">Sending request...</div>}
          <button type="submit">Reset Password</button>
        </form>
      )}
      //collect OTP
      {step === 2 && (
        <form onSubmit={handleSubmitCode}>
          <h2>
            Submit one time code received via email at{" "}
            {tokenRes.challenge_target_label}
          </h2>
          <div className="form-group">
            <label>One time code:</label>
            <input
              type="text"
              maxLength={tokenRes.code_length}
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              required
            />
          </div>
          {error && <div className="error">{error}</div>}
          {isLoading && <div className="warning">Sending request...</div>}
          <button type="submit">Submit code</button>
        </form>
      )}
      //Collect new password
      {step === 3 && (
        <form onSubmit={handleSubmitNewPassword}>
          <h2>Submit New Password</h2>
          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error">{error}</div>}
          {isLoading && <div className="warning">Sending request...</div>}
          <button type="submit">Submit New Password</button>
        </form>
      )}
      //report success after password reset is successful
      {step === 4 && (
        <div className="reset-password-success">
          <h2>Password Reset Successful</h2>
          <p>
            Your password has been reset successfully. You can now log in with
            your new password.
          </p>
        </div>
      )}
    </div>
  );
};
