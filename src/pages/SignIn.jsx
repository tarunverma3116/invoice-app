import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "../partials/Header";
import { getErrorNotificationMessage, getSuccessNotificationMessage } from "../partials/NotificationMessage";

// Yup validation schema for form fields
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function SignIn() {
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (values) => {
    // Get users array from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user with matching email and password
    const user = users.find((user) => user.email === values.email && user.password === values.password);

    // Check if user exists
    if (user) {
      // If credentials match, navigate to the home page
      let currentUser = JSON.stringify(values);
      localStorage.setItem("user", currentUser);
      navigate("/");
      getSuccessNotificationMessage("Login Success!")
    } else {
      // If credentials don't match, show alert
      getErrorNotificationMessage("Invalid Credentials!")
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Site header */}
      <Header />

      {/* Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-16 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Welcome back. Please Login</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {() => (
                    <Form>
                      {/* Email Input */}
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <label
                            className="block text-gray-800 text-sm font-medium mb-1"
                            htmlFor="email"
                          >
                            Email <span className="text-red-600">*</span>
                          </label>
                          <Field
                            id="email"
                            name="email"
                            type="email"
                            className="form-input w-full text-gray-800"
                            placeholder="Enter your email address"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>

                      {/* Password Input */}
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <div className="flex justify-between">
                            <label
                              className="block text-gray-800 text-sm font-medium mb-1"
                              htmlFor="password"
                            >
                              Password <span className="text-red-600">*</span>
                            </label>
                          </div>
                          <Field
                            id="password"
                            name="password"
                            type="password"
                            className="form-input w-full text-gray-800"
                            placeholder="Enter your password"
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="flex flex-wrap -mx-3 mt-6">
                        <div className="w-full px-3">
                          <button
                            type="submit"
                            className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                          >
                            Sign In
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>

                {/* Divider */}
                <div className="flex items-center my-6">
                  <div
                    className="border-t border-gray-300 flex-grow mr-3"
                    aria-hidden="true"
                  ></div>
                  <div className="text-gray-600 italic">Or</div>
                  <div
                    className="border-t border-gray-300 flex-grow ml-3"
                    aria-hidden="true"
                  ></div>
                </div>

                {/* Signup Link */}
                <div className="text-gray-600 text-center mt-6">
                  Don’t have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignIn;
