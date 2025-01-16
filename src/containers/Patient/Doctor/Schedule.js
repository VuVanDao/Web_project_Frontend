import React, { Component } from "react";
import { connect } from "react-redux";
import "./Schedule.scss";
import * as actions from "../../../store/actions";
import _ from "lodash";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import userService from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import LoadingData from "../../System/Admin/LoadingData";
import localization from "moment/locale/vi";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayInWeek: [],
      ScheduleAvailable: [],
    };
  }
  setLanguageSchedule = () => {
    let arrDay = [];
    arrDay.push({ value: 0, label: "Chọn ngày đi" });
    let { language } = this.props;
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        object.label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
      } else {
        object.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("ddd - DD/MM");
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDay.push(object);
    }
    this.setState({
      dayInWeek: arrDay,
    });
  };
  handlePickSchedule = async (event) => {
    let res = await userService.getAllScheduleByDay(
      this.props.doctorId,
      event.target.value
    );
    if (res && res.errCode === 0) {
      this.setState({
        ScheduleAvailable: res.data,
      });
    }
  };
  async componentDidMount() {
    this.setLanguageSchedule();
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
      this.setLanguageSchedule();
    }
  }

  render() {
    let { dayInWeek, ScheduleAvailable } = this.state;
    let { language } = this.props;

    return (
      <>
        {!ScheduleAvailable ? (
          <LoadingData />
        ) : (
          <div className="doctor-schedule">
            <div className="all-schedule">
              <select
                className="text-capitalize"
                onChange={(event) => this.handlePickSchedule(event)}
              >
                {dayInWeek &&
                  dayInWeek.length > 0 &&
                  dayInWeek.map((item, index) => {
                    return (
                      <option value={item.value} key={`day-${index}`}>
                        {item.label}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="mt-2">
              <i className="fas fa-calendar-alt mx-2"></i>
              <FormattedMessage id="Schedule.schedule" />
            </div>
            <div className="all-schedule-available mt-3">
              {ScheduleAvailable && ScheduleAvailable.length > 0 ? (
                ScheduleAvailable.map((item, index) => {
                  // console.log("<<>>", new Date(item.date).getHours());
                  return (
                    <div
                      key={`schedule-${index}`}
                      className="all-schedule-available-item"
                    >
                      {language === LANGUAGES.VI
                        ? item.timeTypeData.valueVi
                        : item.timeTypeData.valueEn}
                    </div>
                  );
                })
              ) : (
                <span>
                  <FormattedMessage id="Schedule.noSchedule" />
                </span>
              )}
            </div>
          </div>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
