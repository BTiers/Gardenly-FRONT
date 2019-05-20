import React, { useState } from 'react';
import { useQuery, useSubscription } from 'react-apollo-hooks';
import { GET_USER_ROOMS_WITH_MESSAGES } from 'apollo/queries/queries';
import { CHAT_SUBSCRIPTION } from 'apollo/subscriptions/chat';

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
  return (
    <div>
      <Rooms setChatRoom={setChatRoom} chatRoom={chatRoom} rooms={data.getAllUserRooms.nodes} />
    </div>
  );
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

  const faker = require('faker');
  return (
    <div>
      {rooms.map(element => {
        const lastMessage = element.messages[element.messages.length - 1];

        return (
          <div className="message" key={element.id} onClick={() => setChatRoom(element)}>
            <div className="py-3 pb-5 mr-3 float-left">
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
              <small className="text-muted">{element.name}</small>
              <small className="text-muted float-right mt-1">13h31</small>
            </div>
            <div className="text-truncate font-weight-bold">{lastMessage.user.username}</div>
            <small className="text-muted">{lastMessage.content}</small>
          </div>
        );
      })}
    </div>
  );
}
