import React, {useEffect, useState} from 'react';
import { FormSpy } from 'react-final-form';
import PropTypes from 'prop-types';

const FormAutoSaver = ({debounce, save, values}) => {

  const [timeout, _setTimeout] = useState(null);

  useEffect(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
    _setTimeout(setTimeout(() => save(values), debounce));

    return () => {
      if (timeout) clearTimeout(timeout)
    };
  }, [timeout, debounce, save, values]);

  return <div />;
};

FormAutoSaver.propTypes = {
  debounce: PropTypes.number.isRequired,
  save: PropTypes.func.isRequired
};

export default props => (
  <FormSpy {...props} subscription={{ values: true }} component={FormAutoSaver} />
)
