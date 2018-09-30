import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";

class HeaderLinks extends Component {
  render() {
    const notification = (
      <div>
        <i className="fa fa-globe" />
        <b className="caret" />
        <span className="notification">3</span>
        <p className="hidden-lg hidden-md">Notification</p>
      </div>
    );
    return (
      <div>
        <Nav pullRight>
          <NavDropdown
              eventKey={2}
              title={notification}
              noCaret
              id="basic-nav-dropdown"
            >
              <MenuItem eventKey={2.1}>Notification 1</MenuItem>
              <MenuItem eventKey={2.2}>Notification 2</MenuItem>
              <MenuItem eventKey={2.3}>Notification 3</MenuItem>
              <MenuItem eventKey={2.4}>Notification 4</MenuItem>
              <MenuItem eventKey={2.5}>Another notifications</MenuItem>
          </NavDropdown>
          <NavItem eventKey={1} href="#">
            Account
          </NavItem>
          <NavItem eventKey={3} href="#">
            Log out
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default HeaderLinks;
