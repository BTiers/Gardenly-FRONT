import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from 'react-apollo-hooks';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Moment from 'react-moment';

import { CREATE_MESSAGE } from 'apollo/mutations/chat';
import { GET_USERS } from 'apollo/queries/queries';
import 'moment/locale/fr';

const ChatLayout = styled.div`
  z-index: inherit;
  background: white;
  transform: translateX(calc(-250px - 36%));
  width: 155%;
  height: 90%;
  border: 1px solid #c8ced3;
  /* overflow-y: scroll; */
`;

export default function Chat({ className, chatRoom, setChatRoom }) {
  const messageRef = useRef();
  const lastMessageRef = useRef();

  const sendMessage = useMutation(CREATE_MESSAGE);
  const me = useQuery(GET_USERS);

  useEffect(() => {
    if (lastMessageRef.current) lastMessageRef.current.scrollIntoView();
  });

  function messageCheckSend() {
    const { value } = messageRef.current;

    if (value) {
      sendMessage({ variables: { content: value, roomId: chatRoom.id } });
      messageRef.current.value = '';
    }
  }

  if (!chatRoom) return null;
  return (
    <ChatLayout className={`${className} position-absolute p-1 `}>
      <div className="text-center" style={{ height: '10%' }}>
        <h3 className="d-inline-block">{chatRoom.name}</h3>
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={() => setChatRoom(null)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <hr />
      </div>
      <div style={{ height: '85%' }}>
        <div style={{ height: '100%' }}>
          <PerfectScrollbar>
            <table className="container h-auto">
              <tbody>
                <tr className="collapse show">
                  <td className="col-12">
                    {chatRoom.messages.map((message, idx) => {
                      if (message.user.username === me.data.getCurrentUser.username)
                        return (
                          <div
                            className="outgoing_msg"
                            key={message.id}
                            ref={idx === chatRoom.messages.length - 1 ? lastMessageRef : undefined}
                          >
                            <div className="sent_msg">
                              <p>
                                <span style={{ whiteSpace: 'pre-line' }}>{message.content}</span>
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
                                <span style={{ whiteSpace: 'pre-line' }}>{message.content}</span>
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
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          </PerfectScrollbar>
        </div>
        <div style={{ height: '5%' }} className="input-group mb-3">
          <input
            type="text"
            className="form-control h-100"
            placeholder="Entrez votre message ici..."
            aria-label="Entrez votre message ici..."
            aria-describedby="basic-addon2"
            ref={messageRef}
            onKeyPress={e => {
              if (e.key === 'Enter') messageCheckSend();
            }}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary bg-primary"
              type="button"
              onClick={messageCheckSend}
            >
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </ChatLayout>
  );
}
