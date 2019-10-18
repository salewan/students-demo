import React from 'react';
import {FormFeedback, FormGroup, Input, Label} from 'reactstrap';
import DatePicker from 'react-date-picker';

export const FormField = ({input, meta, placeholder, id, _type}) => (
  <FormGroup>
    <Label for={id}>{placeholder}</Label>
    <Input
      {...input}
      id={id}
      type={_type}
      placeholder={placeholder}
      invalid={meta.touched && meta.error}
    />
    {meta.touched && meta.error && <FormFeedback>{meta.error}</FormFeedback>}
  </FormGroup>
);


export const FormSelectField = ({input, meta, placeholder, id, options}) => (
  <FormGroup>
    <Label for={id}>{placeholder}</Label>
    <Input
      {...input}
      id={id}
      name="select"
      type="select"
      invalid={meta.touched && meta.error}
    >
      {options.map((r, i) => (<option key={i}>{r}</option>))}
    </Input>
    {meta.touched && meta.error && <FormFeedback>{meta.error}</FormFeedback>}
  </FormGroup>
);


export const DateField = ({input, meta, id, label}) => (
  <FormGroup>
    <Label for={id}>{label}</Label>
    <DatePicker
      {...input}
    />
  </FormGroup>
);
