import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
//menuApp
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return <div className="text-center">UserRedux</div>;
  }
}

const mapStateToProps = (state) => {
  return { UserRedux };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
