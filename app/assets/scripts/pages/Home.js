import React from "react";
import {Navbar, Nav, NavItem, ModalTrigger} from "react-bootstrap";

import LoginModal from "../components/LoginModal";

export default class Home extends React.Component {
  render() {
    return (
      <div className="Home fs">
        <div className="masthead animated fadeInDown">
          <img src="/hands_icon.png" />
          <h1>Hands@Work</h1>
          <p>a game by <a href="//kintla.io" title="Kintla">Kintla</a></p>
        </div>
      </div>
    );
  }
}