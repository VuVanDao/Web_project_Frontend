import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import LoadingData from "../../System/Admin/LoadingData";
import HomePageHeader from "../../HomePage/HomePageHeader";
import "./DetailSpecialty.scss";
import userService from "../../../services/userService";
import DoctorSchedule from "../../Patient/Doctor/Schedule";
import DoctorExtraInfo from "../../Patient/Doctor/DoctorExtraInfo";
import ProfileDoctor from "../../Patient/Doctor/ProfileDoctor/ProfileDoctor";
class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: [3, 7],
    };
  }
  async componentDidMount() {}
  componentDidUpdate() {}
  /* life cycle
    Run component
    1. Run constructor - init state (khoi tao state)
    2.did mount : gan gia tri cho state
    3. render
   */
  render() {
    let { language } = this.props;
    let { arrDoctor } = this.state;

    return (
      <>
        <div className="detail-specialty-container">
          <HomePageHeader />
          <div className="specialtyDescription">
            <div className="container">dasdasdasdsa</div>
          </div>
          <div className="listDoctor">
            {arrDoctor.map((item, index) => {
              return (
                <div className="container mt-2" key={`Schedule-${index}`}>
                  <div className="left">
                    <ProfileDoctor doctorId={item} showDescription={true} />
                  </div>
                  <div className="right">
                    <DoctorSchedule doctorId={item} />
                    <DoctorExtraInfo doctorId={item} />
                  </div>
                </div>
              );
            })}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
