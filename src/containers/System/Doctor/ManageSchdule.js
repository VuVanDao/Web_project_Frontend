import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { LANGUAGES, dateFormat } from "../../../utils/constant";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      currentDate: "",
      rangeTime: [],
      selectedOption: "",
    };
  }
  componentDidMount() {
    this.props.getAllListDoctor();
    this.props.fetchAllSchedule();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.AllDoctor !== this.props.AllDoctor) {
      let result = this.buildInputSelect(this.props.AllDoctor);
      this.setState({
        options: result,
      });
    }
    if (prevProps.language !== this.props.language) {
      let result = this.buildInputSelect(this.props.AllDoctor);
      this.setState({
        options: result,
      });
    }
    if (prevProps.AllSchedule !== this.props.AllSchedule) {
      let data = this.props.AllSchedule;
      data = data.map((item) => {
        item.isSelected = false;
        return item;
      });
      this.setState({
        rangeTime: data,
      });
    }
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
  handleChange = async (selectedOption) => {
    this.setState({
      selectedOption: selectedOption.value,
    });
  };
  handleOnChangeDataPicker = (value) => {
    this.setState({
      currentDate: value[0],
    });
  };
  handlePickSchedule = (item) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      let result = rangeTime.map((value) => {
        if (value.id === item.id && item.isSelected === false) {
          value.isSelected = true;
        } else {
          if (value.id === item.id && item.isSelected === true) {
            value.isSelected = false;
          }
        }
        return value;
      });
      this.setState({
        rangeTime: result,
      });
    }
  };
  handleSaveSchedule = () => {
    let { selectedOption, rangeTime, currentDate } = this.state;
    if (!selectedOption || !rangeTime || !currentDate) {
      toast.error("Plz select all items");
    } else {
      let result = [];
      let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
      let rangeTimeSelected = rangeTime.filter(
        (item) => item.isSelected === true
      );
      rangeTimeSelected.map((item) => {
        let object = {};
        object.doctorId = selectedOption;
        object.date = formattedDate;
        object.time = item.keyMap;
        result.push(object);
      });
      console.log("<>", result);
    }
  };
  render() {
    let { options, rangeTime } = this.state;
    let { language } = this.props;

    return (
      <>
        <div className="container">
          <div className="title mb-5">
            <FormattedMessage id="Schedule.title" />
          </div>
          <div className="schedule-container row">
            <div className="col-6">
              <Select
                value={this.state.selectedOptionDisplay}
                onChange={this.handleChange}
                options={options}
              />
            </div>
            <div className="col-6">
              <DatePicker
                onChange={(event) => this.handleOnChangeDataPicker(event)}
                className="form-control"
                minDate={new Date()}
              />
            </div>
            <div className="col-12 time-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <div
                      // className="time-container-item"
                      className={
                        item.isSelected === true
                          ? "time-container-item active"
                          : "time-container-item"
                      }
                      key={`time-item-${index}`}
                      onClick={() => this.handlePickSchedule(item)}
                    >
                      {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                    </div>
                  );
                })}
            </div>
            <div className="col-12 text-center">
              <button
                className="btn btn-outline-primary col-2"
                onClick={() => this.handleSaveSchedule()}
              >
                <FormattedMessage id="Schedule.save" />
              </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
