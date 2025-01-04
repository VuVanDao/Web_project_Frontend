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
import { userService } from "../../services";
import { toast } from "react-toastify";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showPassword: false,
      errMassage: "",
    };
  }
  handleOnChangeInput = (event, target) => {
    if (this.state.email || this.state.password) {
      this.setState({ errMassage: "" });
    }
    this.setState({ [target]: event.target.value });
  };
  handleLogin = async () => {
    if (this.state.email && this.state.password) {
      let result = await userService.handleLogin(
        this.state.email,
        this.state.password
      );
      if (result && result.errCode === 1) {
        this.setState({ errMassage: result.errMessage });
        toast.error(result.errMessage);
      } else {
        toast.success("Login success");
        this.props.userLoginSuccess(result.userData);
      }
    } else {
      this.setState({ errMassage: "Please fill in all fields !!!!" });
      toast.error("Please fill in all fields !!!!");
    }
  };
  handleShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };
  handleKeyDown = (event) => {
    if (event.keyCode == 13) {
      this.handleLogin();
    }
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-center text-login pt-3">Login</div>
            <div className="col-12 form-group">
              <label className="my-2" htmlFor="userName">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="userName"
                placeholder="Your Email"
                value={this.state.email}
                onChange={(event) => this.handleOnChangeInput(event, "email")}
                onKeyDown={(event) => this.handleKeyDown(event)}
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
                onKeyDown={(event) => this.handleKeyDown(event)}
              />
              <div
                onClick={() => this.handleShowPassword()}
                className="mt-2"
                style={{ cursor: "pointer" }}
              >
                <i
                  className={
                    this.state.showPassword
                      ? "fas fa-eye-slash mx-2"
                      : "fas fa-eye mx-2"
                  }
                ></i>
                {this.state.showPassword ? "Hide password" : "Show password"}
              </div>
            </div>
            <div className="col-12">
              <span style={{ color: "red" }}>{this.state.errMassage}</span>
            </div>
            <div className="col-12 text-center mt-3">
              <button
                className="btn btn-primary form-control "
                onClick={() => this.handleLogin()}
              >
                Login
              </button>
            </div>
            <div className="col-12  mt-2" style={{ cursor: "pointer" }}>
              <span>Forgot your password?</span>
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
        {/* <ToastContainer /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
    IsLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),

    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
