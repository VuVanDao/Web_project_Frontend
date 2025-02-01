import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import * as actions from "../../../store/actions";
import _ from "lodash";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import localization from "moment/locale/vi";
import userService from "../../../services/userService";
class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreInfo: false,
      detailDoctor: {},
    };
  }

  async componentDidMount() {
    this.props.fetchDetailDoctor(this.props.doctorId);
    let result = await userService.getDetailDoctor(this.props.doctorId);
    if (result && result.errCode === 0) {
      this.setState({
        detailDoctor: result.data,
      });
    }
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.detailDoctor != this.props.detailDoctor) {
      this.setState({
        detailDoctor: this.props.detailDoctor,
      });
    }
  }

  render() {
    let { language } = this.props;

    return (
      <>
        <div className="doctor-extraInfo-container pt-5">
          <div className="doctor-extraInfo-title">
            <span>
              <FormattedMessage id="menu.system.doctor.addressClinic" />
            </span>
          </div>
          <div className="doctor-extraInfo-nameClinic">
            <span>
              {this.state.detailDoctor.Doctor_info &&
              this.state.detailDoctor.Doctor_info.nameClinic
                ? this.state.detailDoctor.Doctor_info.nameClinic
                : ""}
            </span>
          </div>
          <div className="doctor-extraInfo-addressClinic">
            <span>
              {this.state.detailDoctor.Doctor_info &&
              this.state.detailDoctor.Doctor_info.addressClinic
                ? this.state.detailDoctor.Doctor_info.addressClinic
                : ""}
            </span>
          </div>
          {!this.state.moreInfo ? (
            <div className="doctor-extraInfo-moreInfo mt-2">
              <span>
                <FormattedMessage id="menu.system.doctor.price" />:
                {this.state.detailDoctor &&
                this.state.detailDoctor.Doctor_detail_price ? (
                  <p>
                    {language === LANGUAGES.VI
                      ? this.state.detailDoctor.Doctor_detail_price.valueVi +
                        " VND"
                      : this.state.detailDoctor.Doctor_detail_price.valueEn +
                        " USD"}
                  </p>
                ) : (
                  ""
                )}
              </span>
              <p
                onClick={() =>
                  this.setState({ moreInfo: !this.state.moreInfo })
                }
              >
                <FormattedMessage id="menu.system.doctor.moreInfo" />
              </p>
            </div>
          ) : (
            <div className="doctor-extraInfo-detailMoreInfo mt-2">
              <div className="item-1 mt-3">
                <div>
                  <span>
                    <FormattedMessage id="menu.system.doctor.price" />:
                  </span>
                  <span>
                    {language === LANGUAGES.VI
                      ? this.state.detailDoctor.Doctor_detail_price.valueVi +
                        " VND"
                      : this.state.detailDoctor.Doctor_detail_price.valueEn +
                        " USD"}
                  </span>
                </div>
                <span>{this.state.detailDoctor.Doctor_info.note}</span>
              </div>
              <div className="item-2">
                <FormattedMessage id="menu.system.doctor.pay" />:
                {language === LANGUAGES.VI
                  ? this.state.detailDoctor.Doctor_detail_payment.valueVi
                  : this.state.detailDoctor.Doctor_detail_payment.valueEn}
              </div>
              <p
                onClick={() =>
                  this.setState({ moreInfo: !this.state.moreInfo })
                }
              >
                <FormattedMessage id="menu.system.doctor.HideInfo" />
              </p>
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    detailDoctor: state.admin.detailDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllListDoctor: () => dispatch(actions.getAllListDoctor()),
    fetchAllSchedule: () => dispatch(actions.fetchAllSchedule()),
    fetchDetailDoctor: (doctorId) =>
      dispatch(actions.fetchDetailDoctorStart(doctorId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
