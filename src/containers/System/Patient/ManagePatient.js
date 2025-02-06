import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import "./ManagePatient.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { LANGUAGES, dateFormat } from "../../../utils/constant";
import DatePicker from "../../../components/Input/DatePicker";
import { toast } from "react-toastify";
import moment from "moment";
import _ from "lodash";
import userService from "../../../services/userService";
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: [],
      currentDate: "",
      PatientBookedList: [],
      options: [],
    };
  }
  setLanguageSchedule = () => {
    let arrDay = [];
    let { language } = this.props;
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        object.label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
      } else {
        object.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("dddd - DD/MM");
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDay.push(object);
    }
    this.setState({
      options: arrDay,
    });
    return arrDay;
  };
  handlePickSchedule = async (event) => {
    let res = await userService.PatientBooked(
      this.props.userInfo.id,
      event.value
    );
    if (res && res.errCode === 0) {
      this.setState({
        PatientBookedList: res.data,
      });
    }
  };

  async componentDidMount() {
    let arrDay = this.setLanguageSchedule();
    let res = await userService.PatientBooked(
      this.props.userInfo.id,
      arrDay[0].value
    );
    if (res && res.errCode === 0) {
      this.setState({
        PatientBookedList: res.data ? res.data : [],
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
      this.setLanguageSchedule();
    }
  }

  render() {
    let { options, PatientBookedList } = this.state;
    let { language, userInfo } = this.props;
    // console.log("<><><>", userInfo);

    return (
      <>
        <div className="manage-patient-container">
          <div className="container">
            <div className="title">
              <FormattedMessage id={"Patient.title"} />
            </div>
            <div className="row mt-5">
              <div className="col-12 mb-3">
                {language === LANGUAGES.VI
                  ? "Bác sĩ: " + userInfo.lastName + " " + userInfo.firstName
                  : "Doctor: " + userInfo.firstName + " " + userInfo.lastName}
              </div>
              <div className="col-6">
                <label>
                  <FormattedMessage id={"Patient.ChooseSchedule"} />
                </label>
                <Select onChange={this.handlePickSchedule} options={options} />
              </div>
            </div>
            <div className="container mt-5">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Time</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Gender</th>
                    <th scope="col">PhoneNumber</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {PatientBookedList &&
                    PatientBookedList.length > 0 &&
                    PatientBookedList.map((item, index) => {
                      return (
                        <tr key={`item-${index}`}>
                          <td>
                            {language === LANGUAGES.VI
                              ? item.timeData.valueVI
                              : item.timeData.valueEN}
                          </td>
                          <td>{item.bookingData.firstName}</td>
                          <td>{item.bookingData.email}</td>
                          <td>{item.bookingData.address}</td>
                          <td>{item.bookingData.gender}</td>
                          <td>{item.bookingData.phoneNumber}</td>
                          <td>
                            <div>
                              <button
                                className="btn-update"
                                // onClick={() => this.ShowModalUpdateUser(item.id)}
                              >
                                <FormattedMessage id="system.user-manage.edit-user" />
                                <i className="fas fa-user-edit"></i>
                              </button>
                              <button
                                className="btn-Delete"
                                // onClick={() => this.ShowModalDeleteUser(item.id)}
                              >
                                <FormattedMessage id="system.user-manage.del-user" />
                                <i className="fas fa-user-times"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
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
    AllDoctor: state.admin.AllDoctor,
    AllSchedule: state.admin.AllSchedule,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllListDoctor: () => dispatch(actions.getAllListDoctor()),
    fetchAllSchedule: () => dispatch(actions.fetchAllSchedule()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
