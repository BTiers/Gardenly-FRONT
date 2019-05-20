import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ListGroupItem, Input, InputGroup, FormFeedback } from 'reactstrap';

// Must be contains inside a <ListGroup> element for optimal style

// In a purpose of optimisation, the component will not rerender itself unless the reset prop is set to true
// To make it rerender each time simply call it like: <InputWithValidation reset />
// To see a reset upon default implementation see AccountQuickAccess.jsx

const InputWithValidation = React.memo(
  ({
    className,
    onUpdate,
    validate,
    type,
    placeholder,
    autoComplete,
    feedBack,
    title,
    defaultValue,
    disabled,
    reset
  }) => {
    const [value, setValue] = useState(defaultValue);
    const [invalid, setInvalid] = useState(false);

    useEffect(() => {
      if (reset) {
        setValue(defaultValue);
        onUpdate(defaultValue, reset);
      }
    }, [reset]);

    return (
      <ListGroupItem tag="a" className={`border-0 ${className}`}>
        <div className="text-left font-weight-bold text-muted pb-2">{title}</div>
        <InputGroup>
          <Input
            disabled={disabled}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            onChange={e => {
              setValue(e.target.value);
              setInvalid(false);
            }}
            onBlur={() => {
              if (validate(value)) onUpdate(value);
              else setInvalid(true);
            }}
            invalid={invalid}
            value={value}
          />
          <FormFeedback>{feedBack}</FormFeedback>
        </InputGroup>
      </ListGroupItem>
    );
  },
  (_, { reset }) => !reset
);

InputWithValidation.defaultProps = {
  className: '',
  placeholder: '',
  autoComplete: '',
  feedBack: '',
  title: '',
  defaultValue: '',
  disabled: false,
  reset: false
};

InputWithValidation.propTypes = {
  className: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  feedBack: PropTypes.string,
  title: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  reset: PropTypes.bool
};

export default InputWithValidation;
