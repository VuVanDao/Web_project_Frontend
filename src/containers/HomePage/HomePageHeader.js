import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { KeyCodeUtils, LanguageUtils } from "../../utils";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import "./HomePageHeader.scss";
class HomePageHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="HomePageHeader-container">
          <div className="left">
            <i className="fas fa-bars"></i>
            <img src="https://cf-sparkai-live.s3.amazonaws.com/users/2qqwVX7WxKwrLfu1L0wf530U2U8/spark_ai/o_bg-remover-gen_2qqwzHpFhVHt1gKwJW7phiQHUFO.png" />
          </div>
          <div className="center">
            <div>
              <span>Chuyên khoa</span>
              <p>Tìm các bác sĩ theo chuyên khoa</p>
            </div>
            <div>
              <span>Cơ sở y tế</span>
              <p>Chọn phòng bệnh, phòng khám</p>
            </div>
            <div>
              <span>Bác sĩ</span>
              <p>Chọn bác sĩ giỏi</p>
            </div>
            <div>
              <span>Gói khám</span>
              <p>Khám sức khoẻ tổng quát</p>
            </div>
          </div>
          <div className="right">
            <i className="fas fa-question-circle"></i>
            <span>Hỗ trợ</span>
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

    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageHeader);
