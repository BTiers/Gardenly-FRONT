import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import Link from 'react-router-dom/Link';
import { GET_PLANT } from 'apollo/queries/queries';

export default function FlowerTooltip({ children, id, link }) {
  const [tooltipsOpen, setTooltipsOpen] = useState(false);
  const [plantThumbnail, setPlantThumbnail] = useState('');
  const [body, setBody] = useState('');
  const [plantName, setPlantName] = useState('');

  const { data, loading, error } = useQuery(GET_PLANT, {
    variables: {
      id: id
    }
  });

  function initToolTip() {
    setTooltipsOpen(true);
    if (data) {
      setBody(data.description);
      setPlantThumbnail(data.thumbnail);
      setPlantName(data.name);
    } else {
      if (error) setBody('Une erreur est survenue, reesayez plus tard.');
      if (loading) setBody('Chargement.');
      setPlantThumbnail('');
      setPlantName('');
    }
    console.log(body);
  }

  return (
    <div id={id} onMouseOver={initToolTip} onMouseOut={() => setTooltipsOpen(false)}>
      <Link to={link}>{children}</Link>
      {body ? (
        <Popover placement="top" isOpen={tooltipsOpen} target={id}>
          <PopoverHeader>{plantName}</PopoverHeader>
          <PopoverBody>
            <div className="ToolTipsMedia pull-left">
              <img
                src={plantThumbnail}
                className="MediaObject"
                alt={plantName}
                width="100%"
                height="100%"
              />
              <div className="ToolTipsBody">
                <p>{body}</p>
              </div>
            </div>
          </PopoverBody>
        </Popover>
      ) : null}
    </div>
  );
}
