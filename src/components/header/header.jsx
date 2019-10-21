import React, {useState} from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {addStudent} from '../../actions/students.action';
import history from '../../history';

const Header = ({addStudent}) => {
  const [isOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!isOpen);

  const navigateMain = () => history.push('/');

  return <>
    <Navbar light expand="md">
      <NavbarBrand href="/">Students</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink onClick={navigateMain}>List</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={addStudent}>Add</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  </>

};

export default connect(() => ({}), dispatch => bindActionCreators({addStudent}, dispatch))(Header);
