import React, { useState } from 'react';

import {
  Table,
  Collapse,
  FormGroup,
  Col,
  Row,
  Input,
  Button
} from 'reactstrap';
import { FiSend } from 'react-icons/fi';
import { GoBug, GoIssueOpened } from 'react-icons/go';

const FakeDiscussion = {
  messages: [
    {
      user: {
        firstName: 'David',
        lastName: 'Maidenberg',
        avatar_url: 'assets/img/avatars/1.jpg'
      },
      message:
        "Bonjour,\n\n J'ai repéré un bug lors de l'upload d'une image, ...\n\nCdt",
      created_at: 'Apr 11, 2019 - 10h37',
      id: '9bb6ed13-aa22-48f9-961f-8181eac2a3e7'
    },
    {
      user: {
        firstName: 'Baptiste',
        lastName: 'Tiers',
        avatar_url: 'assets/img/avatars/2.jpg'
      },
      message:
        "Bonjour David,\n\n C'est bien noté nous reviendrons vers vous dès que possible !\n\nCdt.",
      created_at: 'Apr 11, 2019 - 11h38',
      id: 'abfd1bcf-8435-4b68-b096-9e5fe1fc4864'
    },
    {
      user: {
        firstName: 'David',
        lastName: 'Maidenberg',
        avatar_url: 'assets/img/avatars/1.jpg'
      },
      message:
        "Bonjour,\n\n J'ai repéré un bug lors de l'upload d'une image, ...\n\nCdt",
      created_at: 'Apr 11, 2019 - 10h37',
      id: '9bb6ed13-aa22-48f9-961f-8181eae2a3e7'
    },
    {
      user: {
        firstName: 'Baptiste',
        lastName: 'Tiers',
        avatar_url: 'assets/img/avatars/2.jpg'
      },
      message:
        "Bonjour David,\n\n C'est bien noté nous reviendrons vers vous dès que possible !\n\nCdt.",
      created_at: 'Apr 11, 2019 - 11h38',
      id: 'abfd1bcf-8435-4b68-b096-9e5fa1fc4864'
    }
  ]
};

function TicketInput() {
  return (
    <FormGroup row>
      <Col md="1" />
      <Col md={{ size: 9, offset: 2 }}>
        <Row>
          <Col md="11">
            <Input
              className="form-control"
              type="textarea"
              placeholder="Message ..."
            />
          </Col>
          <Col md="1" className="align-self-end">
            <Button color="primary" className="rounded">
              <FiSend />
            </Button>
          </Col>
        </Row>
      </Col>
    </FormGroup>
  );
}

function UserMessage({ item }) {
  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>
          <span style={{ whiteSpace: 'pre-line' }}>{item.message}</span>
        </p>
        <span className="time_date text-right"> {item.created_at}</span>{' '}
      </div>
    </div>
  );
}

function OtherMessage({ item }) {
  return (
    <div className="incoming_msg">
      <div className="incoming_msg_img">
        <img
          src={'assets/img/avatars/1.jpg'}
          className="img-avatar"
          alt="admin@bootstrapmaster.com"
        />
      </div>
      <div className="received_msg">
        <div className="received_withd_msg">
          <p>
            <span style={{ whiteSpace: 'pre-line' }}>{item.message}</span>
          </p>
          <span className="time_date">{item.created_at}</span>
        </div>
      </div>
    </div>
  );
}

function TicketFeed({ isOpen }) {
  return (
    <React.Fragment>
      <Collapse tag="tr" isOpen={isOpen}>
        <td className="col-12">
          {FakeDiscussion.messages.map((item, idx) =>
            idx % 2 === 0 ? (
              <OtherMessage key={item.id} item={item} />
            ) : (
              <UserMessage key={item.id} item={item} />
            )
          )}
        </td>
      </Collapse>
      <Collapse tag="tr" isOpen={isOpen}>
        <td className="col-12">
          <TicketInput />
        </td>
      </Collapse>
    </React.Fragment>
  );
}

function TicketEntry() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <React.Fragment>
      <tr className="d-flex" onClick={toggle}>
        <td className="text-center col-1">
          <div className="avatar">
            <img
              src={'assets/img/avatars/1.jpg'}
              className="img-avatar"
              alt="admin@bootstrapmaster.com"
            />
            <span className="avatar-status badge-success" />
          </div>
        </td>
        <td className="col-3">
          <div>David Maidenberg</div>
          <div className="small text-muted">
            <span>New</span> | Registered: Jan 1, 2015
          </div>
        </td>
        <td className="text-center col-1 align-middle">
          <GoBug className="flag-icon h4 center text-danger" title="bug" id="bug"/>
        </td>
        <td className="col-5">
          <div>
            <strong>Bug: Upload de photos</strong>
          </div>
          <div>
            <small className="text-muted">Apr 11, 2019 - 10:37</small>
          </div>
        </td>
        <td className="text-center col-1">
          <div className="small text-muted">Last activity</div>
          <strong>10 sec ago</strong>
        </td>
        <td className="text-center col-1">
          <GoIssueOpened className="flag-icon h4 center text-warning" title="opened" id="opened"/>
        </td>
      </tr>
      <TicketFeed isOpen={open} />
    </React.Fragment>
  );
}

export default function Tickets() {
  return (
    <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
      <thead className="thead-light">
        <tr className="d-flex">
          <th className="text-center col-1 border-0">
            <i className="icon-people" />
          </th>
          <th className="col-3 border-0">User</th>
          <th className="text-center col-1 border-0">Ticket</th>
          <th className="col-5 border-0">Title</th>
          <th className="text-center col-1 border-0">Activity</th>
          <th className="text-center col-1 border-0">Status</th>
        </tr>
      </thead>
      <tbody>
        <TicketEntry />
        <TicketEntry />
        <TicketEntry />
      </tbody>
    </Table>
  );
}
