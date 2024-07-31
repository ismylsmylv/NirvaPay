"use client";
import LogoImg from "@/assets/img/logo.png";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./style.scss";
import { auth, db } from "@/lib/firebase/config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { checkAuth } from "@/redux/slice/auth";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useParams, useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { collection, doc, setDoc } from "firebase/firestore";

type Props = {};

function Login({}: Props) {
  const usersCollection = collection(db, "users");
  const userDoc = doc(usersCollection);
  const provider = new GoogleAuthProvider();
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
  }, [authState]);
  authState && router.push("/dashboard");
  const notify = (alert: any) => toast(alert);
  return (
    <>
      {!authState && (
        <div className="Login container">
          <ToastContainer style={{ color: "black" }} autoClose={4000} />
          <Image alt="logo" src={LogoImg} height={80} />
          <Formik
            initialValues={{ email: "", password: "", name: "", surname: "" }}
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
              // console.log(values);
              type == "signup"
                ? createUserWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password
                  )
                    .then((userCredential) => {
                      // Signed up
                      const user = userCredential.user;
                      console.log(user);
                      // ...
                      notify("Signed up successfully");
                      setDoc(doc(usersCollection, user.uid), {
                        user: `${values.name} ${values.surname}`,
                        email: values.email,
                        card: {
                          balance: 0,
                          number: "1234567887654321",
                          expire: "07/12",
                          cvv: 233,
                          cardholder: `${values.name} ${values.surname}`,
                        },
                        crypto: {
                          bitcoin: {
                            balance: 0,
                            address: "",
                          },
                          ethereum: {
                            balance: 0,
                            address: "",
                          },
                          ton: {
                            balance: 0,
                            address: "",
                          },
                        },
                      })
                        .then(() => {
                          console.log("Document successfully written!");
                        })
                        .catch((error) => {
                          console.error("Error writing document: ", error);
                        });
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

                  {type == "signup" && (
                    <Field type="text" name="name" placeholder="Name" />
                  )}
                  {type == "signup" && (
                    <Field type="text" name="surname" placeholder="Surname" />
                  )}
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
                  {type == "signup" && (
                    <p className="signupagreement">
                      By clicking the &apos;Sign Up&apos; button, you are
                      creating a NirvaPay account and agree to NirvaPay&apos;s
                      <a href="#">Terms of Use</a> and
                      <a href="#">Privacy Policy</a>
                    </p>
                  )}
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
                  <button
                    className="signin"
                    onClick={() => {
                      signInWithPopup(auth, provider)
                        .then((result) => {
                          // This gives you a Google Access Token. You can use it to access the Google API.
                          const credential =
                            GoogleAuthProvider.credentialFromResult(result);
                          // const token = credential.accessToken;
                          // The signed-in user info.
                          const user = result.user;
                          localStorage.setItem("auth", JSON.stringify(user));
                          notify("Authentication success");
                          // IdP data available using getAdditionalUserInfo(result)
                          // ...
                        })
                        .catch((error) => {
                          // Handle Errors here.
                          const errorCode = error.code;
                          const errorMessage = error.message;
                          const email = error.customData.email;
                          notify(
                            errorCode
                              ? "There was an error while authenticating"
                              : email
                              ? "Email is already in use"
                              : errorMessage
                          );

                          // The email of the user's account used.
                          // The AuthCredential type that was used.
                          const credential =
                            GoogleAuthProvider.credentialFromError(error);
                          // ...
                          console.log(error);
                        })
                        .then(() => {
                          router.push("/dashboard");
                        });
                    }}
                  >
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
