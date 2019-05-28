import React, { useEffect, useRef, useState } from 'react';

import { withTranslation } from 'react-i18next';
import useMedia from 'hooks/UseMedia';

import { useMutation, useQuery } from 'react-apollo-hooks';
import { CREATE_MESSAGE } from 'apollo/mutations/chat';
import { GET_USERS } from 'apollo/queries/queries';

import { Col, Row, InputGroup, Input, InputGroupAddon, Button } from 'reactstrap';
import { FiSend } from 'react-icons/fi';
import styled from 'styled-components';

import Moment from 'react-moment';
import 'moment/locale/fr';

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

const ChatLayout = styled.div`
  top: ${({ mobile }) => (mobile ? '0' : 'undefined')};
  left: 0;
  z-index: inherit;
  background: white;
  transform: translateX(calc(${({ mobile }) => (mobile ? '-100vw' : '-25vw')}));
  width: ${({ mobile }) => (mobile ? '100vw' : '25vw')};
  height: ${({ mobile }) => (mobile ? '95vh' : '90vh')};
  border-left: ${({ mobile }) => (mobile ? 'none !important' : '')};
`;

export default withTranslation('chat')(({ chatRoom, setChatRoom, t }) => {
  const mobile = useMedia('(max-width: 768px)');
  const messageRef = useRef();
  const lastMessageRef = useRef();

  const sendMessage = useMutation(CREATE_MESSAGE);
  const me = useQuery(GET_USERS);

  const DEFAULT_INPUT_HEIGHT = 46;
  const [inputHeight, setInputHeight] = useState(DEFAULT_INPUT_HEIGHT);
  const [messages, setMessages] = useState();

  useEffect(() => {
    if (lastMessageRef.current) lastMessageRef.current.scrollIntoView();
  });

  useEffect(() => {
    if (!chatRoom) return;

    const newMessage = chatRoom.messages.map((message, idx) => {
      if (message.user.username === me.data.getCurrentUser.username)
        return (
          <div
            className="outgoing_msg "
            key={message.id}
            ref={idx === chatRoom.messages.length - 1 ? lastMessageRef : undefined}
          >
            <div className="sent_msg w-auto">
              <p>
                <span style={{ whiteSpace: 'pre-wrap', textAlign: 'right' }}>
                  {message.content}
                </span>
              </p>
              <span className="time_date text-right">
                <Moment locale="fr" element="strong" fromNow>
                  {message.createdAt}
                </Moment>
              </span>
            </div>
          </div>
        );
      return (
        <div
          className="incoming_msg p-3"
          key={message.id}
          ref={idx === chatRoom.messages.length - 1 ? lastMessageRef : undefined}
        >
          <div className="float-left">
            <img
              src="assets/img/avatars/1.jpg"
              className="img-avatar float-left"
              alt="admin@bootstrapmaster.com"
            />
          </div>
          <div className="received_msg" style={{ display: 'table-cell' }}>
            <div className="received_withd_msg" style={{ width: '100%' }}>
              <p>
                <span style={{ whiteSpace: 'pre-wrap' }}>{message.content}</span>
              </p>
              <span className="time_date">
                <Moment locale="fr" element="strong" fromNow>
                  {message.createdAt}
                </Moment>
              </span>
            </div>
          </div>
        </div>
      );
    });
    setMessages(newMessage);
  }, [chatRoom]);

  function messageCheckSend() {
    const { value } = messageRef.current;

    if (value) {
      const trimedMessage = value.replace(/(^\h+$|\n\h*\n)/g, '');
      if (trimedMessage)
        sendMessage({ variables: { content: trimedMessage, roomId: chatRoom.id } });
      setInputHeight(DEFAULT_INPUT_HEIGHT);
      messageRef.current.value = '';
    }
  }

  if (!chatRoom) return null;
  return (
    <ChatLayout mobile={mobile} className="position-absolute border border-top-0">
      <Col xs="12" className="h-100 p-0">
        <Row
          noGutters
          className="breadcrumb mb-0 text-middle justify-content-between"
          style={{ height: 46 }}
        >
          <span className="font-weight-normal">{chatRoom.name}</span>
          <button
            className="close"
            type="button"
            aria-label="Close"
            onClick={() => setChatRoom(null)}
          >
            <span className="mr-1" aria-hidden="true">
              &times;
            </span>
          </button>
        </Row>
        <Row
          noGutters
          className="flex-grow-1"
          style={{ height: `calc(100vh - ${55 + 46 + (mobile ? 0 : 46) + inputHeight}px - 2rem)` }}
        >
          <PerfectScrollbar style={{ height: '100%' }}>
            <table className="container h-auto">
              <tbody>
                <tr className="collapse show">
                  <td className="col-12">{messages}</td>
                </tr>
              </tbody>
            </table>
          </PerfectScrollbar>
        </Row>
        <Row noGutters className="py-2" style={{ minHeight: inputHeight }}>
          <InputGroup className="px-2">
            <Input
              style={{ resize: 'none' }}
              type="textarea"
              placeholder={t('enter_message')}
              aria-label={t('enter_message')}
              aria-describedby="basic-addon2"
              innerRef={messageRef}
              onChange={() => {
                if (inputHeight < 200) {
                  setInputHeight(
                    messageRef.current.scrollHeight > 200 ? 200 : messageRef.current.scrollHeight
                  );
                }
              }}
            />
            <InputGroupAddon addonType="append">
              <Button color="primary" onClick={messageCheckSend}>
                <FiSend />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Row>
      </Col>
    </ChatLayout>
  );
});
