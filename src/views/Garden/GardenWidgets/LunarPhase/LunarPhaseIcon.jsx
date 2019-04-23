import React from 'react';
import PropTypes from 'prop-types';

import FullMoon from './FullMoon';
import WaxingGibbous from './WaxingGibbous';
import FirstQuarter from './FirstQuarter';
import WaxingCrescent from './WaxingCrescent';
import NewMoon from './NewMoon';
import WaningCrescent from './WaningCrescent';
import ThirdQuarter from './ThirdQuarter';
import WaningGibbous from './WaningGibbous';

function LunarPhaseIcon({ state, size }) {
  switch (state) {
    case 'Full Moon':
      return <FullMoon size={size} />;
    case 'waxing_gibbous':
      return <WaxingGibbous size={size} />;
    case 'First Quarter':
      return <FirstQuarter size={size} />;
    case 'waxing_crescent':
      return <WaxingCrescent size={size} />;
    case 'New Moon':
      return <NewMoon size={size} />;
    case 'waning_crescent':
      return <WaningCrescent size={size} />;
    case 'Last Quarter':
      return <ThirdQuarter size={size} />;
    case 'waning_gibbous':
      return <WaningGibbous size={size} />;
    default:
      console.error('The state props must be set to a valid moon phase');
      console.error(
        "Use one of: ['full', 'waxing_gibbous', 'first_quarter', 'waxing_crescent', 'new', 'waning_crescent', 'third_quarter', 'waning_gibbous']"
      );
      return null;
  }
}

LunarPhaseIcon.defaultProps = {
  size: 40
};

LunarPhaseIcon.propTypes = {
  state: PropTypes.oneOf([
    'Full Moon',
    'waxing_gibbous',
    'First Quarter',
    'waxing_crescent',
    'New Moon',
    'waning_crescent',
    'Last Quarter',
    'waning_gibbous'
  ]).isRequired,
  size: PropTypes.number
};

export default LunarPhaseIcon;
