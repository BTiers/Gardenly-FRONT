import React from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import {
  AppAsideToggler,
  AppHeaderDropdown,
  AppNavbarBrand,
  AppSidebarToggler
} from '@coreui/react';
import logo from '../../assets/img/brand/gardenly_black.png';
import sygnet from '../../assets/img/brand/gardenly_black_reduced.png';

export default function DefaultHeader({ history, onLogout, asideSetActiveTab, avatar }) {
  return (
    <React.Fragment>
      <AppSidebarToggler className="d-lg-none" display="md" mobile />
      <AppNavbarBrand
        full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
        minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
      />
      <AppSidebarToggler className="d-md-down-none" display="lg" />

      <Nav className="d-md-down-none" navbar />
      <Nav className="ml-auto" navbar>
        <AppHeaderDropdown direction="down">
          <DropdownToggle nav>
            <img src={avatar} className="img-avatar" alt="profile" />
          </DropdownToggle>
          <DropdownMenu right style={{ right: 'auto' }}>
            <DropdownItem header tag="div" className="text-center">
              <strong>Settings</strong>
            </DropdownItem>
            <DropdownItem onClick={() => history.push('/profile')}>
              <i className="fa fa-user" />
              Profile
            </DropdownItem>
            <DropdownItem onClick={e => onLogout(e)}>
              <i className="fa fa-lock" />
              Logout
            </DropdownItem>
          </DropdownMenu>
        </AppHeaderDropdown>
      </Nav>
      <AppAsideToggler className="d-md-down-none" />
      <AppAsideToggler className="d-lg-none" mobile />
    </React.Fragment>
  );
}
