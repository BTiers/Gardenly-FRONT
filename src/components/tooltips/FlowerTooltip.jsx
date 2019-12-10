import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import Link from 'react-router-dom/Link';
import { GET_PLANT } from 'apollo/queries/queries';

function PopoverContent({ id, plantId }) {
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
    <Popover placement="top" isOpen target={id}>
      <PopoverHeader>{name}</PopoverHeader>
      <PopoverBody>
        <div className="tooltips-media pull-left">
          <img src={thumbnail} className="media-object" alt={name} width="100%" height="100%" />
          <div className="tooltips-body">
            <br />
            <p>{description}</p>
            <br />
          </div>
        </div>
      </PopoverBody>
    </Popover>
  );
}

PopoverContent.propTypes = {
  id: PropTypes.string.isRequired,
  plantId: PropTypes.string.isRequired
};

export default function FlowerTooltip({ children, id, link, plantId }) {
  const [tooltipsOpen, setTooltipsOpen] = useState(false);

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
      {tooltipsOpen ? <PopoverContent id={id} plantId={plantId} /> : null}
    </>
  );
}

FlowerTooltip.defaultProps = { link: '/' };

FlowerTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  link: PropTypes.string,
  plantId: PropTypes.string.isRequired
};
