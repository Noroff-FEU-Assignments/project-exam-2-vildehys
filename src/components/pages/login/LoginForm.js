import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context/AuthContext";
import { BASE_URL } from "../../../constants/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../../common/ErrorMessage";
import Heading from "../../layout/Heading";

const url = BASE_URL + "auth/login";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter your email.")
    .email("Please enter a valid email address."),
  password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [, setAuth] = useContext(AuthContext);

  async function loginSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    const formData = JSON.stringify(data);
    console.log(formData);

    const options = {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.ok) {
        setAuth(json);
        navigate("/posts");
      } else {
        setLoginError("wrong username or password");
      }
    } catch (error) {
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit(loginSubmit)}>
          <Heading title="Login" />
          <p></p>
          {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
          <div>
            <div>
              <label htmlFor="email">Email:</label>
              <input {...register("email")} id="email" />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input {...register("password")} id="password" type="password" />
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </div>
            <div className="register">
              <Link to={`/register`} className="login-links">
                Don't have an account yet? Click here to sign up!
              </Link>
            </div>
          </div>
          <button className="cta">
            {submitting ? "Logging in" : "Log in"}
          </button>
        </form>
      </div>
    </>
  );
}
