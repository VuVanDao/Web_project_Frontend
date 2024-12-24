import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { KeyCodeUtils, LanguageUtils } from "../../utils";
import userIcon from "../../assets/images/user.svg";
import passIcon from "../../assets/images/pass.svg";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import adminService from "../../services/adminService";
// import { animated } from "@react-spring/web";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showPassword: false,
    };
  }
  handleOnChangeInput = (event, target) => {
    this.setState({ [target]: event.target.value });
  };
  handleLogin = () => {
    console.log("state", this.state);
  };
  handleShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-center text-login pt-3">Login</div>
            <div className="col-12 form-group">
              <label className="my-2" htmlFor="userName">
                UserName:
              </label>
              <input
                type="text"
                className="form-control"
                id="userName"
                placeholder="Your UserName"
                value={this.state.username}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "username")
                }
              />
            </div>
            <div className="col-12 form-group">
              <label className="my-2" htmlFor="password">
                Password:
              </label>
              <input
                type={this.state.showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="Your Password"
                value={this.state.password}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "password")
                }
              />
              {this.state.showPassword ? (
                <div
                  onClick={() => this.handleShowPassword()}
                  className="mt-2"
                  style={{ cursor: "pointer" }}
                >
                  <i className="fas fa-eye-slash mx-2"></i>
                  Hide password
                </div>
              ) : (
                <div
                  onClick={() => this.handleShowPassword()}
                  className="mt-2"
                  style={{ cursor: "pointer" }}
                >
                  <i className="fas fa-eye mx-2"></i>
                  Show password
                </div>
              )}
            </div>
            <div className="col-12 form-group my-2">
              <span>Forgot your password?</span>
            </div>
            <div className="col-12 text-center mt-3">
              <button
                className="btn btn-primary form-control "
                onClick={() => this.handleLogin()}
              >
                Login
              </button>
            </div>
            <div className="col-12">
              <hr />
            </div>
            <div className="col-12 text-center">
              <span>Or login with</span>
              <div className="social-login">
                <i className="fab fa-facebook"></i>
                <i className="fab fa-google"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
