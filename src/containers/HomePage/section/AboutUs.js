import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import "./AboutUs.scss";
class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    return (
      <div>
        <div className="AboutUs-container ">
          <div className="left">
            <iframe
              src="https://www.youtube.com/embed/jNQXAC9IVRw"
              title="Me at the zoo"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
          <div className="right content">
            <div className="right-title">Về chúng tôi</div>
            <div className="right-description">
              <span>
                Tự đánh giá thì bệnh viện chúng tôi khá là uy tín , nên cứ giao
                cái mạng của bạn cho chúng tôi,với dàn bác sĩ giỏi vcl, tốt
                nghiệp bằng chatGPT nên cứ là oke, sống thì thôi, chết thì sáng
                kiếp khác, ok không? Xem cái video bên trái đi, tuy không có tác
                dụng gì nhưng xem hay lắm ...
              </span>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);
