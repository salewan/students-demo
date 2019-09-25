import React from 'react';
import {Field, Form} from 'react-final-form';
import {Button, Form as BSForm} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import './studentForm.css';
import {RATES} from '../../static/edu.constants';
import FormAutoSaver from '../common/formAutoSaver';
import {saveForm, submitResults} from '../../actions/students.action';
import {FormField, FormSelectField} from './formField';


const required = value => (value ? undefined : 'Required');

class StudentForm extends React.Component {

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
              <Field name="id" initialValue={form.id} component="hidden" />

              <Field
                id="name"
                name="name"
                _type="text"
                placeholder="Full name"
                initialValue={form.name}
                validate={required}
                component={FormField}
              />


              <Field
                id="born"
                name="born"
                _type="date"
                placeholder="Date of birth"
                initialValue={form.born}
                validate={required}
                component={FormField}
              />



              <Field
                id="rate"
                name="rate"
                placeholder="Performance"
                validate={required}
                initialValue={form.rate || RATES[2]}
                component={FormSelectField}
                options={RATES}
              />

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