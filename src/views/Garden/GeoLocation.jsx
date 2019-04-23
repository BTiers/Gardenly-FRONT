import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { geolocated } from 'react-geolocated';
import { withTranslation } from 'react-i18next';

import styled from 'styled-components';

import { InputGroup, InputGroupAddon, Tooltip, Input } from 'reactstrap';
import { FiMapPin, FiInfo, FiRefreshCcw } from 'react-icons/fi';

const BlueInfo = styled(FiInfo)`
`;

function GeoLocation({ t, isGeolocationEnabled, onInputChange, coords }) {
  const [otherLocation, setOtherLocation] = useState(false);
  const [openLocInfo, toggleLocInfoTooltip] = useState(false);
  const [openDisableAutoGeo, toggleDisableAutoGeoTooltip] = useState(false);

  useEffect(() => {
    if (isGeolocationEnabled && coords) {
      onInputChange({
        country: '',
        latitude: toString(coords.latitude),
        longitude: toString(coords.longitude)
      });
    }
  }, [isGeolocationEnabled, coords]);

  if (isGeolocationEnabled && !otherLocation)
    return (
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <span className="input-group-text">
            <FiMapPin />
          </span>
        </InputGroupAddon>
        <Input disabled placeholder={t('loc_successfull')} />
        <InputGroupAddon
          addonType="append"
          id="TooltipDisableGeolocation"
          onClick={() => setOtherLocation(!otherLocation)}
        >
          <span className="input-group-text">
            <FiRefreshCcw />
          </span>
        </InputGroupAddon>
        <InputGroupAddon addonType="append" id="TooltipLocationInfo">
          <span className="input-group-text">
            <BlueInfo />
          </span>
        </InputGroupAddon>
        <Tooltip
          placement="top"
          isOpen={openLocInfo}
          target="TooltipLocationInfo"
          toggle={() => toggleLocInfoTooltip(!openLocInfo)}
        >
          {t('geolocation_usage')}
        </Tooltip>
        <Tooltip
          placement="top"
          isOpen={openDisableAutoGeo}
          target="TooltipDisableGeolocation"
          toggle={() => toggleDisableAutoGeoTooltip(!openDisableAutoGeo)}
        >
          {t('disable_geoloc')}
        </Tooltip>
      </InputGroup>
    );
  return (
    <InputGroup>
      <InputGroupAddon addonType="prepend">
        <span className="input-group-text">
          <FiMapPin />
        </span>
      </InputGroupAddon>
      <Input
        placeholder={t('garden_loc_placeholder')}
        onChange={e => onInputChange({ country: e.target.value, latitude: '', longitude: '' })}
      />
      <InputGroupAddon addonType="append" id="TooltipedInfo">
        <span className="input-group-text">
          <BlueInfo />
        </span>
      </InputGroupAddon>
      <Tooltip
        placement="top"
        isOpen={openLocInfo}
        target="TooltipedInfo"
        toggle={() => toggleLocInfoTooltip(!openLocInfo)}
      >
        {t('geolocation_usage')}
      </Tooltip>
    </InputGroup>
  );
}

GeoLocation.defaultProps = {
  coords: null
};

GeoLocation.propTypes = {
  t: PropTypes.func.isRequired,
  isGeolocationEnabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  coords: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number
  })
};

export default geolocated({ positionOptions: { enableHighAccuracy: false } })(
  withTranslation('gardens')(GeoLocation)
);
