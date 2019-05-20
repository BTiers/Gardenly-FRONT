import React, { Component, useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane, ListGroup, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AppSwitch } from '@coreui/react';
import AsideChatPreview from './AsideChatPreview';
import Chat from './Chat';

export default function DefaultAside() {
  const faker = require('faker');
  const [chatRoom, setChatRoom] = useState();
  const [activeTab, setActiveTab] = useState('1');

  function toggle(tab) {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  }

  return (
    <React.Fragment>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classNames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            <i className="icon-list" />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classNames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            <i className="icon-speech" />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classNames({ active: activeTab === '3' })}
            onClick={() => {
              toggle('3');
            }}
          >
            <i className="icon-settings" />
          </NavLink>
        </NavItem>
      </Nav>
      <Chat chatRoom={chatRoom} setChatRoom={setChatRoom} />
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <ListGroup className="list-group-accent" tag="div">
            <ListGroupItem className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">
              Aujourd'hui
            </ListGroupItem>
            <ListGroupItem
              action
              tag="a"
              href="#"
              className="list-group-item-accent-warning list-group-item-divider"
            >
              <div className="avatar float-right">
                <img
                  className="img-avatar"
                  src={faker.image.nature()}
                  alt="admin@bootstrapmaster.com"
                />
              </div>
              <div>
                Arroser
                <strong>Tulipes</strong>
              </div>
              <small className="text-muted mr-3">
                <i className="icon-calendar" />
                &nbsp; 18 - 23h
              </small>
              <br />
              <small className="text-muted">
                <i className="icon-location-pin" />
                Versailles, FR
              </small>
            </ListGroupItem>
            <ListGroupItem className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">
              Demain
            </ListGroupItem>
            <ListGroupItem
              action
              tag="a"
              href="#"
              className="list-group-item-accent-danger list-group-item-divider"
            >
              <div className="avatar float-right">
                <img
                  className="img-avatar"
                  src={faker.image.nature()}
                  alt="admin@bootstrapmaster.com"
                />
              </div>
              <div>
                Arroser
                <strong>Tulipes</strong>
              </div>
              <small className="text-muted mr-3">
                <i className="icon-calendar" />
                &nbsp; 18 - 23h
              </small>
              <br />
              <small className="text-muted">
                <i className="icon-location-pin" />
                Versailles, FR
              </small>
            </ListGroupItem>
            <ListGroupItem
              action
              tag="a"
              href="#"
              className="list-group-item-accent-danger list-group-item-divider"
            >
              <div className="avatar float-right">
                <img
                  className="img-avatar"
                  src={faker.image.nature()}
                  alt="admin@bootstrapmaster.com"
                />
              </div>
              <div>
                Tailler
                <strong>Rosier</strong>
              </div>
              <small className="text-muted mr-3">
                <i className="icon-calendar" />
                &nbsp; 09 - 00h
              </small>
              <br />
              <small className="text-muted">
                <i className="icon-location-pin" />
                Jardin de Versailles, FR
              </small>
            </ListGroupItem>
          </ListGroup>
        </TabPane>
        <TabPane tabId="2" className="p-3">
          <AsideChatPreview chatRoom={chatRoom} setChatRoom={setChatRoom} />
        </TabPane>
        <TabPane tabId="3" className="p-3">
          <h6>Settings</h6>

          <div className="aside-options">
            <div className="clearfix mt-4">
              <small>
                <b>Option 1</b>
              </small>
              <AppSwitch
                className="float-right"
                variant="pill"
                label
                color="success"
                defaultChecked
                size="sm"
              />
            </div>
            <div>
              <small className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </small>
            </div>
          </div>

          <div className="aside-options">
            <div className="clearfix mt-3">
              <small>
                <b>Option 2</b>
              </small>
              <AppSwitch className="float-right" variant="pill" label color="success" size="sm" />
            </div>
            <div>
              <small className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </small>
            </div>
          </div>

          <div className="aside-options">
            <div className="clearfix mt-3">
              <small>
                <b>Option 3</b>
              </small>
              <AppSwitch
                className="float-right"
                variant="pill"
                label
                color="success"
                defaultChecked
                size="sm"
                disabled
              />
              <div>
                <small className="text-muted">Option disabled.</small>
              </div>
            </div>
          </div>

          <div className="aside-options">
            <div className="clearfix mt-3">
              <small>
                <b>Option 4</b>
              </small>
              <AppSwitch
                className="float-right"
                variant="pill"
                label
                color="success"
                defaultChecked
                size="sm"
              />
            </div>
          </div>
        </TabPane>
      </TabContent>
    </React.Fragment>
  );
}
