import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { LANGUAGES } from "../../../../utils";
import userService from "../../../../services/userService";
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: "",
    };
  }
  async componentDidMount() {
    if (this.props.doctorId) {
      let result = await userService.getDetailDoctor(this.props.doctorId);
      if (result && result.errCode === 0) {
        this.setState({
          detailDoctor: result.data,
        });
      }
    }
  }

  render() {
    let { language } = this.props;
    let { detailDoctor } = this.state;

    return (
      <>
        <div className="detail-doctor-container">
          <div className="left">
            <div className="img">
              <img src={detailDoctor.image} />
            </div>
          </div>
          <div className="right">
            <span className="title-doctor">
              {detailDoctor.positionData
                ? language === LANGUAGES.VI
                  ? detailDoctor.positionData.valueVi +
                    ": " +
                    detailDoctor.lastName +
                    " " +
                    detailDoctor.firstName
                  : detailDoctor.positionData.valueEn +
                    ": " +
                    detailDoctor.firstName +
                    " " +
                    detailDoctor.lastName
                : ""}
            </span>
            <span className="description-doctor">
              {detailDoctor.Markdown && detailDoctor.Markdown.description
                ? detailDoctor.Markdown.description
                : ""}
            </span>
            <span>
              {detailDoctor.Doctor_detail_price
                ? language === LANGUAGES.VI
                  ? "Giá khám: " +
                    detailDoctor.Doctor_detail_price.valueVi +
                    " VND"
                  : "Price: " +
                    detailDoctor.Doctor_detail_price.valueEn +
                    " USD"
                : ""}
            </span>
            <span>
              {detailDoctor.Doctor_detail_province
                ? language === LANGUAGES.VI
                  ? "Địa chỉ: " + detailDoctor.Doctor_detail_province.valueVi
                  : "Province: " + detailDoctor.Doctor_detail_province.valueEn
                : ""}
            </span>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
