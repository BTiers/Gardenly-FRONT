import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  ListGroupItem,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormFeedback
} from 'reactstrap';

// Must be contains inside a <ListGroup> element for optimal style

// In a purpose of optimisation, the component will not rerender itself unless the reset prop is set to true
// To make it rerender each time simply call it like: <InputWithValidation reset />
// To see a reset upon default implementation see AccountQuickAccess.jsx

// Optionnaly an updateOnChange can be passed, resulting on a call to onUpdate() on each user input

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
    icon,
    updateOnChange,
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
        {title ? <div className="text-left font-weight-bold text-muted pb-2">{title}</div> : null}
        <InputGroup>
          {icon ? (
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className={`icon-${icon}`} />
              </InputGroupText>
            </InputGroupAddon>
          ) : null}
          <Input
            disabled={disabled}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            onChange={e => {
              if (updateOnChange && validate(e.target.value)) onUpdate(e.target.value);
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
  defaultValue: '',
  disabled: false,
  updateOnChange: false,
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
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  title: (props, propName, componentName) => {
    if (props.icon === undefined && props[propName] === undefined)
      return new Error(`${componentName} must have either a title or an icon prop provided`);
    return undefined;
  },
  // eslint-disable-next-line react/require-default-props
  icon: (props, propName, componentName) => {
    if (props.title === undefined && props[propName] === undefined)
      return new Error(`${componentName} must have either a title or an icon prop provided`);
    return undefined;
  },
  updateOnChange: PropTypes.bool,
  reset: PropTypes.bool
};

export default InputWithValidation;
