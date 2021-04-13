import React, { Component } from "react";
import ScenarioForm from "components/shared/forms/scenario-form";
import "./index.css";

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("open-modal", () => {
      this.openModel();
    });
  }

  openModel() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }

  closeModel() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  render() {
    return (
      <div>
        <div id="myModal" className="modal-container">
          <div className="modal-items">
            <div className="modal-top">
              <h2>Scenario toevoegen</h2>
              <span className="modal-close" onClick={() => this.closeModel()}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <ScenarioForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
