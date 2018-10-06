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
        <Nav>
          <NavItem eventKey={1} href="#/dashboard">
            <i className="fa fa-dashboard" />
            <p className="hidden-lg hidden-md">Dashboard</p>
          </NavItem>
      {/*
        <Nav pullRight>
      */}
          <NavItem eventKey={3} href="#">
            <i className="fa fa-search" />
            <p className="hidden-lg hidden-md">Search</p>
          </NavItem>

        </Nav>
        
        <Nav pullRight>
        {/*
          <NavItem eventKey={1} href="#">
            Account
          </NavItem>
        */}
          <NavDropdown
            eventKey={2}
            title="Settings"
            id="basic-nav-dropdown-right"
          >
            <MenuItem eventKey={2.1}>My Account</MenuItem>
            <MenuItem eventKey={2.2}>Refer a Friend</MenuItem>
            <MenuItem eventKey={2.3}>Try on Testnet</MenuItem>
      {/*   <MenuItem eventKey={2.4}>Another action</MenuItem> 
            <MenuItem eventKey={2.5}>Something</MenuItem> */}
            <MenuItem divider />
            <MenuItem eventKey={2.5}>Report a bug</MenuItem>
          </NavDropdown>
          {/*
          <NavItem eventKey={1} href="#">
            Account
          </NavItem>
          */}
          
        </Nav>
        
      </div>
    );
  }
}

export default HeaderLinks;
