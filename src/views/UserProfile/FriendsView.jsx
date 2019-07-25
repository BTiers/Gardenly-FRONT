import React, { useState } from 'react';
import { Container, Row, InputGroup, Input, Button, Alert } from 'reactstrap';
import { useQuery, useMutation } from 'react-apollo-hooks';

import {
  USER_RELATIONS,
  CREATE_RELATION,
  CHANGE_RELATION,
  DELETE_RELATION
} from 'apollo/queries/relations';
import { GET_USER_ROOMS_WITH_MESSAGES } from 'apollo/queries/queries';
import { CREATE_ROOM } from 'apollo/mutations/chat';

export default function FollowersView() {
  const sendFriendRequest = useMutation(CREATE_RELATION);
  const changeRelation = useMutation(CHANGE_RELATION);
  const deleteRelation = useMutation(DELETE_RELATION);
  const createRoom = useMutation(CREATE_ROOM);

  const { loading, data, error } = useQuery(USER_RELATIONS);
  const [friendName, setFriendName] = useState('');
  const [errorDisplay, setErrorDisplay] = useState('');

  if (error) {
    console.error(error);
    return <p>An error occured.</p>;
  }
  if (loading) return <p>Loading</p>;

  function friendRequest() {
    sendFriendRequest({
      variables: { username: friendName, state: 0 },
      update: (cache, mutationResult) => {
        const query = USER_RELATIONS;
        const data = cache.readQuery({ query });

        data.user.relations.push(mutationResult.data.createRelation.relation);

        cache.writeQuery({ query, data });
      }
    }).then(
      result => {},
      error => {
        if (error.message === 'GraphQL error: User not found')
          setErrorDisplay("We don't know this user");
        if (error.message === 'GraphQL error: Friend has already been taken')
          setErrorDisplay('You already have a relation with this user');

        console.error(error);
      }
    );
  }

  function acceptFriend(relationId, friendId, name) {
    const users = [friendId];
    changeRelation({
      variables: { id: relationId, state: 1 },
      update: () =>
        createRoom({
          variables: { name, users },
          update: (cache, mutationResult) => {
            const query = GET_USER_ROOMS_WITH_MESSAGES;
            const data = cache.readQuery({ query });

            data.getAllUserRooms.nodes.push(mutationResult.data.createRoom.room);

            cache.writeQuery({ query, data });
          }
        }).then(
          result => {},
          error => {
            console.error(error);
          }
        )
    }).then(
      result => {},
      error => {
        console.error(error);
      }
    );
  }

  function deleteFriend(id) {
    deleteRelation({
      variables: { id },
      update: (cache, mutationResult) => {
        const query = USER_RELATIONS;
        const data = cache.readQuery({ query });
        const filteredRelation = data.user.relations.filter(
          (value, index, arr) => value.id !== mutationResult.data.deleteRelation.relation.id
        );
        data.user.relations = filteredRelation;

        cache.writeQuery({ query, data });
      }
    }).then(
      result => {},
      error => {
        console.error(error);
      }
    );
  }

  const myFriendRequests = [];
  const gotenFriendRequests = [];
  const friends = [];
  data.user.relations.map(e => {
    const user = e.user.id === data.user.id ? e.friend : e.user;
    user.relation_id = e.id;
    if (e.state === 0) {
      if (e.user.id === data.user.id) {
        myFriendRequests.push(user);
      } else {
        gotenFriendRequests.push(user);
      }
    } else {
      friends.push(user);
    }
  });

  return (
    <>
      <InputGroup className="m-1">
        <Input
          onChange={e => setFriendName(e.target.value)}
          onKeyPress={e => {
            if (e.key === 'Enter') friendRequest();
          }}
          placeholder="Username"
        />
        <Button onClick={friendRequest} color="primary">
          Send friend Request
        </Button>
      </InputGroup>
      {errorDisplay ? (
        <Alert className="m-1" color="danger">
          {errorDisplay}
        </Alert>
      ) : null}
      <hr />
      <Container className="p-0">
        {friends.length === 0 ? <div>You have no friends</div> : null}
        {friends.map(e => (
          <Row className="m-0" key={e.id}>
            <Button className="ml-0 mt-auto mb-auto">{e.username}</Button>
            <Button
              onClick={() => deleteFriend(e.relation_id)}
              className="r-0 mr-0 ml-auto mt-auto mb-auto"
              color="danger"
            >
              X
            </Button>
          </Row>
        ))}
        <hr />
        <h5>Pending Friend Request</h5>
        {myFriendRequests.length === 0 ? <div>You have no pending friend Request</div> : null}
        {myFriendRequests.map(e => (
          <Row className="m-0" key={e.id}>
            <h6 className="ml-0 mt-auto mb-auto">{e.username}</h6>
          </Row>
        ))}
        <hr />
        <h5>Received Friend Request</h5>
        {gotenFriendRequests.length === 0 ? <div>You didn't receive a friend Request</div> : null}
        {gotenFriendRequests.map(e => (
          <Row className="m-0" key={e.id}>
            <span className="ml-0 mt-auto mb-auto">{e.username}</span>
            <Button
              onClick={() => acceptFriend(e.relation_id, e.id, e.username)}
              className="r-0 mr-0 ml-auto mt-auto mb-auto"
              color="primary"
            >
              Accept
            </Button>
          </Row>
        ))}
      </Container>
    </>
  );
}
