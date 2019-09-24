import React from 'react';
import {Form, Field} from 'react-final-form';
import { Button, Form as BSForm, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import './studentForm.css';
import { RATES } from '../../static/edu.constants';
import FormAutoSaver from '../common/formAutoSaver';
import {saveForm, submitResults} from '../../actions/students.action';


const required = value => (value ? undefined : 'Required');

class StudentForm extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {saveForm, submitResults, form} = this.props;

    return <>
      <Form onSubmit={submitResults}>
        {
          ({handleSubmit, values, submitting}) => (
            <BSForm onSubmit={handleSubmit}>
              <Field
                name="name"
                validate={required}
                placeholder="Full name"
                id="name"
                initialValue={form.name}
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
                initialValue={form.born}
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
                initialValue={form.rate || RATES[2]}
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

              <FormAutoSaver debounce={300} save={saveForm}/>

              <Button disabled={submitting}>Submit</Button>
            </BSForm>
          )
        }
      </Form>
    </>
  }
}

function mapStateToProps(state) {
  return {
    form: state.students.form || {}
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({saveForm, submitResults}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);