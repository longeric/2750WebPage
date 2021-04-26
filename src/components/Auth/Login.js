import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login, googleLogin } from "../../actions/auth.js";

const Login = ({ login, googleLogin, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const body = JSON.stringify({ email, password });

  console.log(body);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    // console.log("LOGIN SUCCESS");
    login(email, password);
  };

  const googleSuccess = async googleData => {
//     const result = res?.profileObj;
//     const token = res?.tokenId;
    
    console.log(googleData.profileObj)
    await googleLogin(googleData)
    
    // const res = await fetch("/api/auth/google", {
    //   method: "POST",
    //   body: JSON.stringify({
    //   token: googleData.tokenId
    // }),
    // headers: {
    //   "Content-Type": "application/json"
    // }
  // })
    // return <Redirect to="/scheduler" />;
  };

  const googleError = (e) =>{
    console.log(e)
     alert("Google Sign In was unsuccessful. Try again later");
  }
   

  if (isAuthenticated) {
    return <Redirect to="/scheduler" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>

      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
        <GoogleLogin
          clientId="894835653167-icpg1mdrbp9qr6tlpiosgr3ejnr5qdav.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={googleSuccess}
          onFailure={googleError}
          cookiePolicy="single_host_origin"
        />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  googleLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login, googleLogin }
)(Login);

// export default Login;


// render={renderProps => (
//             <Button
//               color="primary"
//               fullWidth
//               onClick={renderProps.onClick}
//               disabled={renderProps.disabled}
//               variant="contained"
//             >
//               Google Sign In
//             </Button>
//           )}