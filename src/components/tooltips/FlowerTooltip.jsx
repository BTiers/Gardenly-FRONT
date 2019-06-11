import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import Link from 'react-router-dom/Link';
import { GET_PLANT } from 'apollo/queries/queries';

export default function FlowerTooltip({ children, id, link, plantId }) {
  const [tooltipsOpen, setTooltipsOpen] = useState(false);

  function PopoverQuery({ id, plantId }) {
    const { data, loading, error } = useQuery(GET_PLANT, {
      variables: {
        id: plantId
      }
    });

    if (error) {
      console.error(error);
      return null;
    }
    if (loading) return null;

    const {
      getPlant: { name, description, thumbnail }
    } = data;

    return (
      <Popover placement="top" isOpen={tooltipsOpen} target={id}>
        <PopoverHeader>{name}</PopoverHeader>
        <PopoverBody>
          <div className="ToolTipsMedia pull-left">
            <img src={thumbnail} className="MediaObject" alt={name} width="100%" height="100%" />
            <div className="ToolTipsBody">
              <p>{description}</p>
            </div>
          </div>
        </PopoverBody>
      </Popover>
    );
  }

  return (
    <>
      <Link
        id={id}
        onMouseOver={() => setTooltipsOpen(true)}
        onMouseOut={() => setTooltipsOpen(false)}
        to={link}
      >
        {children}
      </Link>
      {tooltipsOpen ? <PopoverQuery id={id} plantId={plantId} /> : null}
    </>
  );
}
