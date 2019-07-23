import React, { useState } from 'react';
import { useQuery, useSubscription } from 'react-apollo-hooks';
import { GET_USER_ROOMS_WITH_MESSAGES } from 'apollo/queries/queries';
import { CHAT_SUBSCRIPTION } from 'apollo/subscriptions/chat';
import useMedia from 'hooks/UseMedia';

export default function AsideChatPreview({ setChatRoom, chatRoom }) {
  const { data, error, loading } = useQuery(GET_USER_ROOMS_WITH_MESSAGES);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        Error!
        {error.message}
      </div>
    );
  }
  return <Rooms setChatRoom={setChatRoom} chatRoom={chatRoom} rooms={data.getAllUserRooms.nodes} />;
}

function Rooms({ rooms: initialRooms, chatRoom, setChatRoom }) {
  const [rooms, setRooms] = useState(initialRooms);

  useSubscription(CHAT_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      const newMessage = subscriptionData.data.chatSubscription;

      setRooms(
        rooms.map(room => {
          if (room.id === newMessage.room.id) {
            const newRoom = { ...room };

            newRoom.messages.push(newMessage);
            if (chatRoom && chatRoom.id === newRoom.id) setChatRoom(newRoom);
            return newRoom;
          }
          return room;
        })
      );
    }
  });

  const truncateToLength = (str, charNb) => {
    if (str.length > charNb) return `${str.substring(0, charNb)}...`;
    return str;
  };

  const faker = require('faker');
  const mobile = useMedia('(max-width: 768px)');

  return (
    <React.Fragment>
      {rooms.map(room => {
        const lastMessage = room.messages[room.messages.length - 1] || {
          user: { username: 'Aucun' },
          content: 'Pas encore de message'
        };

        return (
          <React.Fragment key={room.id}>
            <div
              className="message clearfix"
              onClick={() => {
                if (mobile) {
                  document.body.classList.remove('aside-menu-show');
                }
                setChatRoom(room);
              }}
            >
              <div className="py-3 mr-3 float-left">
                <div className="avatar">
                  <img
                    src={faker.image.avatar()}
                    className="img-avatar"
                    alt="admin@bootstrapmaster.com"
                  />
                  <span className="avatar-status badge-warning" />
                </div>
              </div>
              <div>
                <small className="text-muted">{room.name}</small>
                <small className="text-muted float-right mt-1">13h31</small>
              </div>
              <div className="text-truncate font-weight-bold">{lastMessage.user.username}</div>
              <small className="text-muted">{truncateToLength(lastMessage.content, 40)}</small>
            </div>
            <hr />
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}
