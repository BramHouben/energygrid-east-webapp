import React, { Component } from "react";
import ScenarioForm from "components/shared/forms/scenario-form";
import "./index.css";

export default class Modal extends Component {
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
        <button id="myBtn" onClick={() => this.openModel()}>
          Open Modal
        </button>
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
