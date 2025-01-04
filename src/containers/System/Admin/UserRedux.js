import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import userService from "../../../services/userService";
import * as actions from "../../../store/actions";
//menuApp
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
    };
  }

  // async componentDidMount() {
  //   try {
  //     let gender = await userService.getAllCode("gender");
  //     let position = await userService.getAllCode("position");
  //     let role = await userService.getAllCode("role");
  //     if (gender && gender.data) {
  //       this.setState({
  //         genderArr: gender.data,
  //       });
  //     }
  //     if (position && position.data) {
  //       this.setState({
  //         positionArr: position.data,
  //       });
  //     }
  //     if (role && role.data) {
  //       this.setState({
  //         roleArr: role.data,
  //       });
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // }
  async componentDidMount() {
    await this.props.getGenderStart();
    await this.props.getPositionStart();
    await this.props.getRoleStart();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.genderArr !== this.props.genderArr) {
      this.setState({
        genderArr: this.props.genderArr,
      });
    }
    if (prevProps.positionArr !== this.props.positionArr) {
      this.setState({
        positionArr: this.props.positionArr,
      });
    }
    if (prevProps.roleArr !== this.props.roleArr) {
      this.setState({
        roleArr: this.props.roleArr,
      });
    }
  }
  render() {
    let { userInfo, language } = this.props;
    let { genderArr, positionArr, roleArr } = this.state;
    return (
      <>
        <div className="text-center title">
          <FormattedMessage id="create-user.title" />
        </div>
        <div className="container">
          <div className="row my-3">
            <form className="row g-3">
              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">
                  <FormattedMessage id="system.user-manage.email" />:
                </label>
                <input type="email" className="form-control" id="inputEmail4" />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">
                  <FormattedMessage id="system.user-manage.password" />:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword4"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">
                  <FormattedMessage id="system.user-manage.firstName" />:
                </label>
                <input type="text" className="form-control" id="firstName" />
              </div>
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">
                  <FormattedMessage id="system.user-manage.lastName" />:
                </label>
                <input type="text" className="form-control" id="lastName" />
              </div>
              <div className="col-6">
                <label htmlFor="inputCity" className="form-label">
                  <FormattedMessage id="system.user-manage.address" />:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputCity"
                  placeholder="1234 Main St"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="mobile" className="form-label">
                  <FormattedMessage id="system.user-manage.mobile" />:
                </label>
                <input type="text" className="form-control" id="mobile" />
              </div>
              <div className="col-md-3">
                <label htmlFor="inputState" className="form-label">
                  <FormattedMessage id="system.user-manage.gender" />
                </label>
                <select id="inputState" className="form-select">
                  {genderArr &&
                    genderArr.length > 0 &&
                    genderArr.map((item, index) => {
                      return (
                        <option key={index}>
                          {language === "vi" ? item.valueVI : item.valueEN}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="inputState" className="form-label">
                  <FormattedMessage id="system.user-manage.level" />
                </label>
                <select id="inputState" className="form-select">
                  {positionArr &&
                    positionArr.length > 0 &&
                    positionArr.map((item, index) => {
                      return (
                        <option key={index}>
                          {language === "vi" ? item.valueVI : item.valueEN}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="inputState" className="form-label">
                  <FormattedMessage id="system.user-manage.role" />
                </label>
                <select id="inputState" className="form-select">
                  {roleArr &&
                    roleArr.length > 0 &&
                    roleArr.map((item, index) => {
                      return (
                        <option key={index}>
                          {language === "vi" ? item.valueVI : item.valueEN}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="image" className="form-label">
                  <FormattedMessage id="system.user-manage.image" />
                </label>
                <input type="text" className="form-control" id="image" />
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  <FormattedMessage id="common.confirm" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  // return { UserRedux };
  return {
    userInfo: state.user.userInfo,
    language: state.app.language,
    genderArr: state.admin.genderArr,
    positionArr: state.admin.positionArr,
    roleArr: state.admin.roleArr,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
