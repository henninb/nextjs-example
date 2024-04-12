// import React from 'react';
import React, { useState } from 'react';
// import { Auth } from "aws-amplify";
import { Auth } from '@aws-amplify/auth';



export default function LogIn({auth}) {
  // const navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    password: "",
    errors: {
      cognito: null,
      blankfield: false
    }
  });

  const clearErrorState = () => {
    setState({
      ...state,
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    // Form validation
    clearErrorState();
    const error = Validate(event, state);
    if (error) {
      setState({
        ...state,
        errors: { ...state.errors, ...error }
      });
    }

    // AWS Cognito integration here
    try {
      await Auth.signIn(state.username, state.password);
      auth.setAuthenticatedStatus(true);
      // Redirect after successful signup if needed
      //navigate("/")
      console.log('logged in');
    } catch (error) {
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);
      setState({
        ...state,
        errors: {
          ...state.errors,
          cognito: err
        }
      });
    }
  };

  const onInputChange = event => {
    setState({
      ...state,
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  return (
    <section className="section auth">
      <div className="container">
        <h1>Log in</h1>


        <form onSubmit={handleSubmit}>
          <div className="field">
            <p className="control">
              <input
                className="input"
                type="text"
                id="username"
                aria-describedby="usernameHelp"
                placeholder="username"
                value={state.username}
                onChange={onInputChange}
              />
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="password"
                id="password"
                placeholder="Password"
                value={state.password}
                onChange={onInputChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <a href="/forgotpassword">Forgot password?</a>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className="button is-success">
                Login
              </button>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
