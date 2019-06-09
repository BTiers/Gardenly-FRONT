import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import Link from 'react-router-dom/Link';
import { GET_ALL_PLANTS } from 'apollo/queries/queries';

export default function ToolTips({ children, Name, link }) {
  const [tooltipsOpen, setTooltipsOpen] = useState(false);
  const [plantTips, setPlantTips] = useState(null);

  const { data, loading, error } = useQuery(GET_ALL_PLANTS, {
    variables: {
      name: Name
    }
  });

  const { getAllPlants: plants } = data;

  if (error) return 'Une erreur est survenue, reesayez plus tard.';
  if (loading) return 'Chargement.';

  // LINK REACT ROUTER A USE POUR REDIRECT

  function initToolTip() {
    setTooltipsOpen(true);
    if (plantTips === null) setPlantTips(plants.edges[0].node);
  }

  return (
    <div id={Name} onMouseOver={initToolTip} onMouseOut={() => setTooltipsOpen(false)}>
      <Link to={link}>{children}</Link>
      {plantTips ? (
        <Popover placement="top" isOpen={tooltipsOpen} target={Name}>
          <PopoverHeader>{plants.edges[0].node.name}</PopoverHeader>
          <PopoverBody>
            <div className="ToolTipsMedia pull-left">
              <img
                src={plantTips.thumbnail}
                className="MediaObject"
                alt={plantTips.name}
                width="100%"
                height="100%"
              />
              <div className="ToolTipsBody">
                <p>{plantTips.description}</p>
              </div>
            </div>
          </PopoverBody>
        </Popover>
      ) : null}
    </div>
  );
}
