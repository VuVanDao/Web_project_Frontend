import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { KeyCodeUtils, LanguageUtils } from "../../utils";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import "./Banner.scss";
class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="banner-container">
          <div className="banner-content">
            <div className="banner-content-title">Nền tảng y tế</div>
            <div className="banner-content-title">
              Chăm sóc sức khoẻ toàn diện
            </div>
            <div className="banner-content-search ">
              <label htmlFor="search">
                <i className="fas fa-search"></i>
              </label>
              <input id="search" />
            </div>
            <div className="banner-content-feature">
              <div className="feature-item">
                <i className="fas fa-hospital"></i>
                <a href="#!">Khám chuyên khoa</a>
              </div>
              <div className="feature-item">
                <i className="fas fa-mobile-alt"></i>
                <a href="#!">Khám từ xa</a>
              </div>
              <div className="feature-item">
                <i className="fas fa-procedures"></i>
                <a href="#!">Khám tổng quát</a>
              </div>
              <div className="feature-item">
                <i className="fas fa-stethoscope"></i>
                <a href="#!">Xét nghiệm y học</a>
              </div>
              <div className="feature-item">
                <i className="fas fa-user-md"></i>
                <a href="#!">Sức khoẻ tinh thần</a>
              </div>
              <div className="feature-item">
                <i className="fas fa-smile"></i>
                <a href="#!"> Khám nha khoa</a>
              </div>
            </div>
          </div>
        </div>
      </>
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

    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
