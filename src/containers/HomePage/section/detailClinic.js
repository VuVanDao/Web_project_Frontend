import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import LoadingData from "../../System/Admin/LoadingData";
import HomePageHeader from "../../HomePage/HomePageHeader";
import "./DetailSpecialty.scss";
import "./detailClinic.scss";
import userService from "../../../services/userService";
import DoctorSchedule from "../../Patient/Doctor/Schedule";
import DoctorExtraInfo from "../../Patient/Doctor/DoctorExtraInfo";
import ProfileDoctor from "../../Patient/Doctor/ProfileDoctor/ProfileDoctor";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: [],
      detailClinic: "",
      provinceList: [],
    };
  }
  async componentDidMount() {
    this.props.fetchProvinceStart();
    if (this.props.match.params.id) {
      let result = await userService.GetAllDoctorByClinic(
        this.props.match.params.id
      );
      let res = await userService.GetDetailClinic(this.props.match.params.id);
      if (result && result.errCode === 0) {
        this.setState({
          arrDoctor: result.data,
          detailClinic: res.data.descriptionHTML,
        });
      }
    }
    this.setProvinceList();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
      this.setProvinceList();
    }
  }
  HandleDetailDoctor = (doctor) => {
    this.props.history.push(`/detail-doctor/${doctor.doctorId}`);
  };
  setProvinceList = () => {
    let { provinceArr, language } = this.props;
    let provinceList = [];
    provinceList.push({ value: "all", label: "Toàn quốc" });
    provinceArr.map((item, index) => {
      let object = {};
      language === LANGUAGES.VI
        ? (object.label = item.valueVI)
        : (object.label = item.valueEN);
      object.value = item.keyMap;
      provinceList.push(object);
    });
    this.setState({
      provinceList: provinceList,
    });
  };
  handlePickProvince = async (event) => {
    let provinceId = event.target.value;
    let clinicId = this.props.match.params.id;
    let res = await userService.GetDoctorByProvince(
      clinicId,
      provinceId,
      "clinic"
    );
    if (res && res.errCode === 0) {
      this.setState({
        arrDoctor: res.data,
      });
    }
  };
  /* life cycle
    Run component
    1. Run constructor - init state (khoi tao state)
    2.did mount : gan gia tri cho state
    3. render
   */
  render() {
    let { language } = this.props;
    let { arrDoctor, detailClinic, provinceList } = this.state;
    // console.log(">>>", this.state.arrDoctor);

    return (
      <>
        <div className="detail-specialty-container">
          <HomePageHeader />
          <div className="specialtyDescription clinicDes">
            <div
              className="container "
              dangerouslySetInnerHTML={{
                __html: detailClinic,
              }}
              // style={{
              //   backgroundImage:
              //     "url(https://i.pinimg.com/originals/bd/0a/ee/bd0aee9eb281b917e9b9adb4421a6f5f.gif)",
              //   backgroundRepeat: "no-repeat",
              //   backgroundPosition: "center",
              //   backgroundSize: "contain",
              // }}
            ></div>
          </div>
          <div className="container my-3">
            <select
              className="text-capitalize p-2"
              onChange={(event) => this.handlePickProvince(event)}
            >
              {provinceList &&
                provinceList.length > 0 &&
                provinceList.map((item, index) => {
                  return (
                    <option value={item.value} key={`province-${index}`}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="listDoctor">
            {arrDoctor.map((item, index) => {
              return (
                <div className="container mt-2" key={`Schedule-${index}`}>
                  <div
                    className="left"
                    onClick={() => this.HandleDetailDoctor(item)}
                  >
                    <ProfileDoctor
                      doctorId={item.doctorId}
                      showDescription={false}
                    />
                  </div>
                  <div className="right">
                    <DoctorSchedule doctorId={item.doctorId} />
                    <DoctorExtraInfo doctorId={item.doctorId} />
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
    provinceArr: state.admin.provinceArr,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProvinceStart: () => dispatch(actions.fetchProvinceStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
