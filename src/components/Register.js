import React, { useState } from "react";
import "./Register.css";
import { Formik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [errors, setErrors] = useState({});
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    number: Yup.string()
      .required("Number is required")
      .matches(/^\d{10}$/, "Mobile number should be 10 digits")
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      // handle successful submit here
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      }
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ fullName, email, number }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <div className="main1">
            <div className="container1">
              <div className="left1">
                <h1 className="heading">GET IN TOUCH</h1>
                <br />
                <p className="sub">
                  Please complete the form and we will get back to you.
                </p>
              </div>
              <hr />
              <div className="right1">
                <div className="form">
                  <div>
                    <label htmlFor="fullName">Name*</label>
                    <input
                      placeholder="Enter Your Name"
                      className={`name input ${
                        errors.fullName && "notValid"
                      }`}
                      type="text"
                      id="fullName"
                      name="fullName"
                      onChange={e => setFullName(e.target.value)}
                    />
                    {errors.fullName && (
                      <div className="error">{errors.fullName}</div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email">Email*</label>
                    <input
                      placeholder="Enter Your Email"
                      className={`input email ${
                        errors.email && "notValid"
                      }`}
                      type="email"
                      id="email"
                      name="email"
                      onChange={e => setEmail(e.target.value)}
                      />
                      {errors.email && (
                        <div className="error">{errors.email}</div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="number">Mobile Number*</label>
                      <input
                        placeholder="Enter Your Mobile Number"
                        className={`input mobileNumber ${
                          errors.number && "notValid"
                        }`}
                        type="number"
                        id="number"
                        name="number"
                        onChange={e => setNumber(e.target.value)}
                      />
                      {errors.number && (
                        <div className="error">{errors.number}</div>
                      )}
                    </div>
                    <button
                      className="btn_blue"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    );
  };
  
  export default Register;
  
