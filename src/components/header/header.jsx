import React, {useState} from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {withRouter} from 'react-router-dom'

const Header = ({history}) => {
  const [isOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!isOpen);

  const navigateAdd = () => history.push('/add');

  return <>
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">reactstrap</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink onClick={navigateAdd}>Add</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  </>

};

export default withRouter(Header);