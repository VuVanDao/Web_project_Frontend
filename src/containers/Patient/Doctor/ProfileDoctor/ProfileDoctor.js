import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { LANGUAGES } from "../../../../utils";
import userService from "../../../../services/userService";
import _ from "lodash";
import moment from "moment";
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
    let { language, currentDatePicked, showDescription } = this.props;
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
              {detailDoctor && detailDoctor.positionData
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
              {showDescription &&
              detailDoctor &&
              detailDoctor.Markdown &&
              detailDoctor.Markdown.description
                ? detailDoctor.Markdown.description
                : ""}
            </span>
            <span>
              {detailDoctor && detailDoctor.Doctor_detail_price
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
              {detailDoctor && detailDoctor.Doctor_detail_province
                ? language === LANGUAGES.VI
                  ? "Địa chỉ: " + detailDoctor.Doctor_detail_province.valueVi
                  : "Province: " + detailDoctor.Doctor_detail_province.valueEn
                : ""}
            </span>
            <span>
              {currentDatePicked && currentDatePicked.timeTypeData
                ? language === LANGUAGES.VI
                  ? "Thời gian: " + currentDatePicked.timeTypeData.valueVi
                  : "Time: " + currentDatePicked.timeTypeData.valueEn
                : ""}
            </span>
            <span style={{ textTransform: "capitalize" }}>
              {currentDatePicked && currentDatePicked.date
                ? language === LANGUAGES.VI
                  ? moment(+currentDatePicked.date).format("dddd") +
                    " " +
                    moment(+currentDatePicked.date).format("DD/MM/YYYY")
                  : moment(+currentDatePicked.date)
                      .locale("en")
                      .format("dddd") +
                    " " +
                    moment(new Date(+currentDatePicked.date)).format(
                      "DD/MM/YYYY"
                    )
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
