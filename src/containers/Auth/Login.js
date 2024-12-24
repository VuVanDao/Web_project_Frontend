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
  }

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
              />
            </div>
            <div className="col-12 form-group">
              <label className="my-2" htmlFor="password">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Your Password"
              />
            </div>
            <div className="col-12 form-group my-2">
              <span>Forgot your password?</span>
            </div>
            <div className="col-12 text-center mt-3">
              <button className="btn btn-primary form-control ">Login</button>
            </div>
            <div className="col-12">
              <hr />
            </div>
            <div className="col-12 text-center">
              <span>Or login with</span>
              <div className="social-login">
                <i class="fab fa-facebook"></i>
                <i class="fab fa-google"></i>
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
