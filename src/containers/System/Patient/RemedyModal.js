import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CommonUtils } from "../../../utils";
import userService from "../../../services/userService";
import { toast } from "react-toastify";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      image: "",
      timeType: "",
      language: "",
      name: "",
    };
  }
  componentDidMount() {
    this.setState({
      timeType: this.props.dataModal.timeType,
      email: this.props.dataModal.email,
      language: this.props.language,
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        timeType: this.props.dataModal.timeType,
        email: this.props.dataModal.email,
        doctorId: this.props.dataModal.doctorId,
        patientId: this.props.dataModal.patientId,
        name: this.props.dataModal.name,
        language: this.props.language,
      });
    }
  }
  toggle = () => {
    this.setState({});
    this.props.handleOpenModal();
  };
  handleKeyDown = (event) => {
    if (event.keyCode == 13) {
    }
  };
  sendRemedy = async () => {
    let res = await userService.SendRemedy(this.state);
    if (res && res.errCode === 0) {
      toast.success("Complete , plz refresh this page");
    } else {
      toast.error("Not complete ");
    }
    this.toggle();
  };
  handleOnChange = (event) => {
    let email = event.target.value;
    this.setState({
      email: email,
    });
  };
  handleOnChangeImage = async (event) => {
    let file = event.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      //   const objectUrl = URL.createObjectURL(file);
      this.setState({
        // previewImageURL: objectUrl,
        image: base64,
      });
    }
  };
  render() {
    return (
      <>
        <Modal
          show={this.props.isOpen}
          onHide={() => this.toggle()}
          size="xl"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Gửi hoá đơn khám bệnh</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <label htmlFor="email">
                    <FormattedMessage id="system.user-manage.email" />:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={this.state.email}
                    onChange={(event) => this.handleOnChange(event)}
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="password">
                    <FormattedMessage id="Patient.Remedy" />:
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="password"
                    onChange={(event) => this.handleOnChangeImage(event)}
                    // value={this.state.password}
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.toggle()}>
              <FormattedMessage id="common.close" />
            </Button>
            <Button variant="primary" onClick={() => this.sendRemedy()}>
              <FormattedMessage id="common.confirm" />
            </Button>
          </Modal.Footer>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
