import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password });
      // const newUser = {
      //   name,
      //   email,
      //   password,
      // };
      // try {
      //   const config = {
      //     header: {
      //       "Content-Type": "application/json",
      //     },
      //   };

      //   const body = JSON.stringify(newUser);

      //   const res = await axios.post("/api/users", body, config);
      //   console.log(res.data);
      // } catch (err) {
      //   console.log(err.response.data);
      // }
    }
  };

  return (
    <Fragment>
      <section className="vh-100 bg-image">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: "15px;" }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">
                      Create an account
                    </h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form3Example1cg"
                          className="form-control form-control-lg"
                          placeholder="Name"
                          name={name}
                          onChange={(e) => onChange(e)}
                          required
                        />
                        <label className="form-label" for="form3Example1cg" />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form3Example3cg"
                          className="form-control form-control-lg"
                          placeholder="Email Address"
                          name={email}
                          onChange={(e) => onChange(e)}
                          required
                        />
                        <label className="form-label" for="form3Example3cg" />
                        <small className="form-text">
                          This site uses Gravator so if you want a profile
                          image, use a gravator email
                        </small>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4cg"
                          className="form-control form-control-lg"
                          placeholder="Password"
                          name="password"
                          value={password}
                          minLength="6"
                          onChange={(e) => onChange(e)}
                          required
                        />
                        <label className="form-label" for="form3Example4cg" />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4cdg"
                          className="form-control form-control-lg"
                          placeholder="Confirm Your Password"
                          name="password2"
                          value={password2}
                          minLength="6"
                          onChange={(e) => onChange(e)}
                          required
                        />
                        <label className="form-label" for="form3Example4cdg" />
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        >
                          Register
                        </button>
                      </div>

                      <p className="text-center text-muted mt-5 mb-0">
                        Have already an account?{" "}
                        <NavLink to="/login" className="fw-bold text-body">
                          <u>Login here</u>
                        </NavLink>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, register })(Register);
