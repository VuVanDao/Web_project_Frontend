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
import _ from "lodash";
import userService from "../../../services/userService";
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: [],
      selectedDoctor: "",
      currentDate: "",
      PatientBookedList: [],
    };
  }
  buildInputSelect = (data) => {
    let result = [];
    let { language } = this.props;
    if (data && data.length > 0) {
      data.map((item, index) => {
        let object = {};
        let labelVi = item.lastName + " " + item.firstName;
        let labelEn = item.firstName + " " + item.lastName;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
  handleOnChangeDataPicker = async (value) => {
    this.setState({
      currentDate: value[0],
    });
    let formattedDate = new Date(this.state.currentDate).getTime().toString();
    let res = await userService.PatientBooked(
      this.state.selectedDoctor,
      formattedDate
    );
    console.log(">><<", res);
    if (res && res.errCode === 0) {
      this.setState({
        PatientBookedList: res.data,
      });
    }
  };
  handleChange = async (selectedDoctor) => {
    this.setState({
      selectedDoctor: selectedDoctor.value,
    });
  };
  componentDidMount() {
    this.props.getAllListDoctor();
    this.props.fetchAllSchedule();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.AllDoctor !== this.props.AllDoctor) {
      let result = this.buildInputSelect(this.props.AllDoctor);
      this.setState({
        arrDoctor: result,
      });
    }
    if (prevProps.language !== this.props.language) {
      let result = this.buildInputSelect(this.props.AllDoctor);
      this.setState({
        arrDoctor: result,
      });
    }
  }

  render() {
    let { arrDoctor, PatientBookedList } = this.state;
    let { language } = this.props;

    return (
      <>
        <div className="manage-patient-container">
          <div className="container">
            <div className="title">
              <FormattedMessage id={"Patient.title"} />
            </div>
            <div className="row mt-5">
              <div className="col-6">
                <label>
                  <FormattedMessage id={"Patient.ChooseDoctor"} />
                </label>
                <Select onChange={this.handleChange} options={arrDoctor} />
              </div>
              <div className="col-6">
                <label>
                  <FormattedMessage id={"Patient.ChooseSchedule"} />
                </label>
                <DatePicker
                  onChange={(event) => this.handleOnChangeDataPicker(event)}
                  className="form-control"
                  options={{ minDate: new Date() }}
                />
              </div>
            </div>
            <div className="container mt-5">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Gender</th>
                    <th scope="col">PhoneNumber</th>
                  </tr>
                </thead>
                <tbody>
                  {PatientBookedList &&
                    PatientBookedList.length > 0 &&
                    PatientBookedList.map((item, index) => {
                      return (
                        <tr>
                          <td>{item.bookingData.firstName}</td>
                          <td>{item.bookingData.email}</td>
                          <td>{item.bookingData.address}</td>
                          <td>{item.bookingData.gender}</td>
                          <td>{item.bookingData.phoneNumber}</td>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllListDoctor: () => dispatch(actions.getAllListDoctor()),
    fetchAllSchedule: () => dispatch(actions.fetchAllSchedule()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
