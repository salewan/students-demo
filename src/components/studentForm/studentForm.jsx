import React from 'react';
import {Form, Field} from 'react-final-form';
import { Button, Form as BSForm, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';

import './studentForm.css';
import { RATES } from '../../static/edu.constants';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const showResults = async values => {
  await sleep(500);
  window.alert(JSON.stringify(values, undefined, 2));
};

const required = value => (value ? undefined : 'Required');

const StudentForm = () => {

  return <>
    <Form onSubmit={showResults}>
      {
        ({ handleSubmit, values, submitting }) => (
          <BSForm onSubmit={handleSubmit}>
            <Field
              name="name"
              validate={required}
              placeholder="Full name"
              id="name"
            >
              {({input, meta, placeholder, id}) => (
                <FormGroup>
                  <Label for={id}>{placeholder}</Label>
                  <Input
                    {...input}
                    id={id}
                    type="text"
                    placeholder={placeholder}
                    invalid={meta.touched && meta.error}
                    onChange={input.onChange}
                  />
                  {meta.touched && meta.error && <FormFeedback>{meta.error}</FormFeedback>}
                </FormGroup>
              )}
            </Field>


            <Field
              name="born"
              validate={required}
              placeholder="Date of birth"
              id="born"
            >
              {({input, meta, placeholder, id}) => (
                <FormGroup>
                  <Label for={id}>{placeholder}</Label>
                  <Input
                    {...input}
                    id={id}
                    type="date"
                    placeholder={placeholder}
                    invalid={meta.touched && meta.error}
                  />
                  {meta.touched && meta.error && <FormFeedback>{meta.error}</FormFeedback>}
                </FormGroup>
              )}
            </Field>


            <Field
              name="rate"
              placeholder="Performance"
              validate={required}
              id="rate"
              initialValue={RATES[2]}
            >
              {({input, meta, placeholder, id}) => (
                <FormGroup>
                  <Label for={id}>{placeholder}</Label>
                  <Input
                    {...input}
                    id={id}
                    type="select"
                    name="select"
                    invalid={meta.touched && meta.error}
                  >
                    {RATES.map((r, i) => (<option key={i}>{r}</option>))}
                  </Input>
                  {meta.touched && meta.error && <FormFeedback>{meta.error}</FormFeedback>}
                </FormGroup>
              )}
            </Field>

            <Button disabled={submitting}>Submit</Button>
          </BSForm>
        )
      }
    </Form>
  </>
};

export default StudentForm;