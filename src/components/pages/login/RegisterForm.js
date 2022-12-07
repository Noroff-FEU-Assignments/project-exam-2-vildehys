import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../constants/api";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../../common/ErrorMessage";
import Heading from "../../layout/Heading";

const nameRegex = /^[a-zA-Z0-9_]+$/;
const emailRegex = /^\w+([-+.']\w+)*@?(stud.noroff.no|noroff.no)$/;

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your name")
    .matches(nameRegex, "Only underscore symbol (_) allowed"),
  email: yup
    .string()
    .required("Please enter a valid email.")
    .email()
    .matches(
      emailRegex,
      "your email must belong to Noroff; stud.noroff.no or noroff.no"
    ),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "Password must be atleast 8 characters."),
  avatar: yup.string(),
  banner: yup.string(),
});

export default function RegisterForm() {
  const [, setMessage] = useState("");
  const [, setSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const url = BASE_URL + "auth/register";

  async function registerSubmit(data) {
    setSubmitting(true);
    setRegisterError(null);
    console.log(data);

    const formData = JSON.stringify(data);

    const options = {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        navigate("/login");
        setMessage("Account is successfully created");
      } else {
        setRegisterError(
          "Ooops! Your account is already registered in our system."
        );
      }
    } catch (error) {
      console.log("error", error);
      setRegisterError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(registerSubmit)}>
        <Heading title="Register" />
        {registerError && <ErrorMessage>{registerError}</ErrorMessage>}
        <div>
          <label htmlFor="name">
            Name:<span className="required">*</span>
          </label>
          <input id="name" {...register("name")} />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div>
          <label htmlFor="email">
            Email:<span className="required">*</span>
          </label>
          <input id="email" {...register("email")} />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div>
          <label htmlFor="password">
            Password:<span className="required">*</span>
          </label>
          <input id="password" {...register("password")} type="password" />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>
        <div>
          <label htmlFor="avatar">
            Avatar:<span className="optional"> (optional)</span>
          </label>
          <input id="avatar" {...register("avatar")} />
          {errors.avatar && (
            <ErrorMessage>{errors.avatar.message}</ErrorMessage>
          )}
        </div>
        <div>
          <label htmlFor="banner">
            Banner:<span className="optional"> (optional)</span>
          </label>
          <input id="banner" {...register("banner")} />
          {errors.banner && (
            <ErrorMessage>{errors.banner.message}</ErrorMessage>
          )}
        </div>
        <div className="login">
          <Link to={`/login`} className="login-links">
            Already have an account? Click to login here.
          </Link>
        </div>
        <button className="cta">Register</button>
      </form>
    </div>
  );
}
