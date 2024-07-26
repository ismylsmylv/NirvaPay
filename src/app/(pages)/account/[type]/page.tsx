"use client";
import LogoImg from "@/assets/img/logo.png";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect } from "react";
import "./style.scss";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { auth } from "@/lib/firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useParams, useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { checkAuth } from "@/redux/slice/auth";
type Props = {};

function Login({}: Props) {
  const params = useParams<{ type: string }>();
  const type = params.type;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth.auth);
  useEffect(() => {
    dispatch(checkAuth());
    if (type != "signup") {
      if (type != "login") {
        router.push("/account/login");
      }
    }
    authState && router.push("/dashboard");
  }, []);
  const notify = (alert) => toast(alert);
  return (
    <>
      {!authState && (
        <div className="Login container">
          <ToastContainer style={{ color: "black" }} autoClose={4000} />
          <Image alt="logo" src={LogoImg} height={80} />
          <Formik
            initialValues={{ email: "", password: "" }}
            // validate={(values) => {
            //   const errors: { email: string } = {
            //     email: "",
            //   };
            //   if (!values.email) {
            //     errors.email = "Required";
            //   } else if (
            //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            //   ) {
            //     errors.email = "Invalid email address";
            //   }
            //   return errors;
            // }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);

              console.log(values);

              type == "signup"
                ? createUserWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password
                  )
                    .then((userCredential) => {
                      // Signed up
                      const user = userCredential.user;
                      // ...
                      notify("Signed up successfully");
                    })
                    .then(() => {
                      setTimeout(() => {
                        router.push("/account/login");
                      }, 1000);
                    })
                    .catch((error) => {
                      const errorCode = error.code;
                      const errorMessage = error.message;
                      notify("Error while signing up");
                      console.log(error);

                      // ..
                    })
                : signInWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password
                  )
                    .then((userCredential) => {
                      // Signed in
                      const user = userCredential.user;
                      // ...
                      notify("Logged in successfully");
                      localStorage.setItem("auth", JSON.stringify(user));
                    })
                    .then(() => {
                      router.push("/dashboard");
                    })
                    .catch((error) => {
                      const errorCode = error.code;
                      const errorMessage = error.message;
                      notify("Incorrect username or password");
                      console.log(error);
                    });
            }}
          >
            {({ isSubmitting }) => (
              <div className="formContainer">
                <Form>
                  <h1>{type == "login" ? "Log in" : "Sign up"}</h1>
                  <Field
                    type="email"
                    name="email"
                    placeholder="johndoe@example.com"
                  />
                  <ErrorMessage name="email" component="div" />
                  <Field
                    type="password"
                    name="password"
                    placeholder="password"
                  />
                  <ErrorMessage name="password" component="div" />
                  <button type="submit" disabled={isSubmitting}>
                    {type == "login" ? "Log in" : "Sign up"}
                  </button>
                  <Link
                    href={`/account/${type == "login" ? "signup" : "login"}`}
                  >
                    {type == "login"
                      ? "Don't have an account?"
                      : "Already have an account?"}

                    <p>{type == "login" ? "Sign up " : "Log in "}instead</p>
                  </Link>
                </Form>
                <div className="line"></div>
                <div className="google">
                  <button className="signin">
                    <svg
                      viewBox="0 0 256 262"
                      preserveAspectRatio="xMidYMid"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                        fill="#4285F4"
                      ></path>
                      <path
                        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                        fill="#34A853"
                      ></path>
                      <path
                        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                        fill="#FBBC05"
                      ></path>
                      <path
                        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                        fill="#EB4335"
                      ></path>
                    </svg>
                    Continue with Google
                  </button>
                </div>
              </div>
            )}
          </Formik>
        </div>
      )}
    </>
  );
}

export default Login;
