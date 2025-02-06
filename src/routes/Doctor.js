import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import ManageSchedule from "../containers/System/Doctor/ManageSchdule";
import Header from "../containers/Header/Header";
import ManagePatient from "../containers/System/Patient/ManagePatient";
class Doctor extends Component {
  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route
                path="/doctor/doctor-schedule"
                component={ManageSchedule}
              />
              <Route path="/doctor/doctor-patient" component={ManagePatient} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
