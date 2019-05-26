import { CREATE_MESSAGE } from 'apollo/mutations/chat';
import { GET_USERS } from 'apollo/queries/queries';
import useMedia from 'hooks/UseMedia';
import 'moment/locale/fr';
import React, { useEffect, useRef } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { withTranslation } from 'react-i18next';
import Moment from 'react-moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import styled from 'styled-components';

const ChatLayout = styled.div`
  top: ${({ mobile }) => (mobile ? '0' : 'undefined')};
  left: 0;
  z-index: inherit;
  background: white;
  transform: translateX(calc(${({ mobile }) => (mobile ? '-100vw' : '-25vw')}));
  width: ${({ mobile }) => (mobile ? '100vw' : '25vw')};
  height: ${({ mobile }) => (mobile ? '95vh' : '90vh')};
  border: 1px solid #c8ced3;
  border-top: unset;
`;

export default withTranslation('chat')(({ className, chatRoom, setChatRoom, t }) => {
  const mobile = useMedia('(max-width: 768px)');
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
    <ChatLayout mobile={mobile} className="position-absolute">
      {/* TODO: Weird font & Adding paricipants */}
      <h3 className="d-inline-block ml-2 mt-2">{chatRoom.name}</h3>
      <button
        className="close ml-2 mt-2 mr-2"
        type="button"
        aria-label="Close"
        onClick={() => setChatRoom(null)}
      >
        <span className="mr-1" aria-hidden="true" style={{ fontSize: '2rem', fontWeight: '100' }}>
          &times;
        </span>
      </button>
      <hr className="m-0 p-0" />
      <PerfectScrollbar style={{ height: '80vh' }}>
        <table className="container h-auto">
          <tbody>
            <tr className="collapse show">
              <td className="col-12">
                {chatRoom.messages.map((message, idx) => {
                  if (message.user.username === me.data.getCurrentUser.username)
                    return (
                      <div
                        className="outgoing_msg "
                        key={message.id}
                        ref={idx === chatRoom.messages.length - 1 ? lastMessageRef : undefined}
                      >
                        <div className="sent_msg w-auto">
                          <p>
                            <span style={{ whiteSpace: 'pre-line', textAlign: 'right' }}>
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
      <div className="input-group m-auto mb-1 pb-1" style={{ width: '90%' }}>
        <input
          type="text"
          className="form-control"
          placeholder={t('enter_message')}
          aria-label={t('enter_message')}
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
            {t('send')}
          </button>
        </div>
      </div>
    </ChatLayout>
  );
});
