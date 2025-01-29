import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "../containers/Header/Header";
import ManageSpecialty from "../containers/System/Specialty/ManageSpecialty";
class Specialty extends Component {
  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route
                path="/specialties/specialties-manage"
                component={ManageSpecialty}
              />
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
