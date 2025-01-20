import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import * as actions from "../../../store/actions";
import _ from "lodash";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import LoadingData from "../../System/Admin/LoadingData";
import localization from "moment/locale/vi";
class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreInfo: false,
    };
  }

  async componentDidMount() {}
  async componentDidUpdate(prevProps, prevState) {}

  render() {
    let { language, detailDoctor } = this.props;
    console.log(">><<", detailDoctor);

    return (
      <>
        <div className="doctor-extraInfo-container pt-5">
          <div className="doctor-extraInfo-title">
            <span>
              <FormattedMessage id="menu.system.doctor.addressClinic" />
            </span>
          </div>
          <div className="doctor-extraInfo-nameClinic">
            <span>{this.props.detailDoctor.Doctor_info.nameClinic}</span>
          </div>
          <div className="doctor-extraInfo-addressClinic">
            <span>{this.props.detailDoctor.Doctor_info.addressClinic}</span>
          </div>
          {!this.state.moreInfo ? (
            <div className="doctor-extraInfo-moreInfo mt-2">
              <span>
                <FormattedMessage id="menu.system.doctor.price" />:
                {language === LANGUAGES.VI
                  ? this.props.detailDoctor.Doctor_detail_price.valueVi + " VND"
                  : this.props.detailDoctor.Doctor_detail_price.valueEn +
                    " USD"}
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
                      ? this.props.detailDoctor.Doctor_detail_price.valueVi +
                        " VND"
                      : this.props.detailDoctor.Doctor_detail_price.valueEn +
                        " USD"}
                  </span>
                </div>
                <span>{this.props.detailDoctor.Doctor_info.note}</span>
              </div>
              <div className="item-2">
                <FormattedMessage id="menu.system.doctor.pay" />:
                {language === LANGUAGES.VI
                  ? this.props.detailDoctor.Doctor_detail_payment.valueVi
                  : this.props.detailDoctor.Doctor_detail_payment.valueEn}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllListDoctor: () => dispatch(actions.getAllListDoctor()),
    fetchAllSchedule: () => dispatch(actions.fetchAllSchedule()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
