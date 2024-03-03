import React, { useState } from "react";
import styles from "./AuthForm.module.css";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { fetchLogin, fetchSignUp } from "../db/fetchAuth";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../redux/user/userSlice";
import { PiEyeClosedLight } from "react-icons/pi";
import { PiEye } from "react-icons/pi";
import { Helmet } from "react-helmet-async";
import icon from "../assets/icons/family.png";
import { motion } from "framer-motion";

const AuthForm = () => {
  const { theme } = useSelector((state) => state.theme);
  const [isSignIn, setIsSignIn] = useState(true);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleShowSignUp = () => {
    setOpenSignUp(!openSignUp);
  };
  const handleShow = () => {
    setOpen(!open);
  };

  // signUp
  const [signUpFormData, setSignUpFormData] = useState({});
  const [errorMessageSignUp, setErrorMessageSignUp] = useState(null);
  const [loadingSignUp, setLoadingSignUp] = useState(false);

  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignUpChanges = (e) => {
    setSignUpFormData({
      ...signUpFormData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (
      !signUpFormData.username ||
      !signUpFormData.email ||
      !signUpFormData.password
    ) {
      return setErrorMessageSignUp("Please fill out all fields.");
    }
    try {
      setLoadingSignUp(true);
      setErrorMessageSignUp(null);
      const res = await fetchSignUp(signUpFormData);
      if (res.success === false) {
        setLoadingSignUp(false);
        return setErrorMessageSignUp(res.message);
      }
      setLoadingSignUp(false);
      if (res) {
        dispatch(signIn(res.user));
        navigate("/");
      }
    } catch (error) {
      setErrorMessageSignUp(error.message);
      setLoadingSignUp(false);
    }
  };

  // signIn

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setErrorMessage("Please fill all the fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetchLogin(formData);
      if (res.success === false) {
        setLoading(false);
        return setErrorMessage(res.message);
      }
      setLoading(false);
      if (res) {
        dispatch(signIn(res.user));
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <motion.div
      className={` ${
        theme === "light" ? styles.container : styles.containerDark
      } ${isSignIn ? "" : styles.active}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Helmet>
        <title>Authentication</title>
        <link rel="shortcut icon" href={icon} type="image/x-icon" />
      </Helmet>
      <div
        className={`${styles["form-container"]} ${styles["sign-up"]} flex-1`}
      >
        <h2 className="text-2xl m-4">Create an account</h2>
        <form
          className="flex flex-col gap-4 w-60"
          onSubmit={handleSignUpSubmit}
        >
          <div>
            <Label value="Your username" />
            <TextInput
              type="text"
              placeholder="Username"
              id="username"
              name="username"
              onChange={handleSignUpChanges}
            />
          </div>
          <div>
            <Label value="Your email" />
            <TextInput
              type="email"
              placeholder="name@gmail.com"
              id="emailSignUp"
              name="email"
              onChange={handleSignUpChanges}
            />
          </div>
          <div>
            <Label value="Your password" />
            <div className="relative">
              <TextInput
                type={openSignUp ? "text" : "password"}
                placeholder="Password"
                id="passwordSignUp"
                name="password"
                onChange={handleSignUpChanges}
              />
              {openSignUp ? (
                <PiEyeClosedLight
                  className="absolute top-3 right-6"
                  onClick={handleShowSignUp}
                />
              ) : (
                <PiEye
                  className="absolute top-3 right-6"
                  onClick={handleShowSignUp}
                />
              )}
            </div>
          </div>
          <Button
            className="bg-gradient-to-r from-customMediumBlue to-customGreenBlue hover:from-customGreenBlue hover:to-customMediumBlue  rounded-md"
            type="submit"
            disabled={loadingSignUp}
          >
            {loadingSignUp ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
          <OAuth />
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>Have an account?</span>
          <Link
            className="text-customMediumBlue font-semibold"
            onClick={toggleForm}
          >
            Sign In
          </Link>
        </div>
        {errorMessageSignUp ? (
          <Alert className="mt-3 w-80" color="failure">
            {errorMessageSignUp}
          </Alert>
        ) : null}
      </div>
      <div
        className={`${styles["form-container"]} ${styles["sign-in"]} flex-1`}
      >
        <h2 className="text-2xl m-4">Sign In</h2>
        <form className="flex flex-col gap-4 w-60 " onSubmit={handleSubmit}>
          <div>
            <Label value="Your email" />
            <TextInput
              type="email"
              placeholder="name@company.com"
              id="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div>
            <Label value="Your password" />
            <div className="relative">
              <TextInput
                type={open ? "text" : "password"}
                placeholder="**********"
                id="password"
                name="password"
                onChange={handleChange}
              />
              {open ? (
                <PiEyeClosedLight
                  className="absolute top-3 right-6"
                  onClick={handleShow}
                />
              ) : (
                <PiEye
                  className="absolute top-3 right-6"
                  onClick={handleShow}
                />
              )}
            </div>
          </div>
          <Button
            className="bg-gradient-to-r from-customMediumBlue to-customGreenBlue hover:from-customGreenBlue hover:to-customMediumBlue  rounded-md"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Sign In"
            )}
          </Button>
          <OAuth />
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>Dont Have an account?</span>
          <Link
            className="text-customMediumBlue font-semibold"
            onClick={toggleForm}
          >
            Sign Up
          </Link>
        </div>
        {errorMessage ? (
          <Alert className="mt-5" color="failure">
            {errorMessage}
          </Alert>
        ) : null}
      </div>
      <div className={styles["toggle-container"]}>
        <div className={styles.toggle}>
          <div className={`${styles["toggle-panel"]} ${styles["toggle-left"]}`}>
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button className={styles.hidden} onClick={toggleForm}>
              Sign In
            </button>
          </div>
          <div
            className={`${styles["toggle-panel"]} ${styles["toggle-right"]}`}
          >
            <h1>Hello, Friend!</h1>
            <p>
              Register with your personal details to use all of site features
            </p>
            <button className={styles.hidden} onClick={toggleForm}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthForm;
