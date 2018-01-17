import React, { Component, PropTypes, } from 'react';
import { getRenderedComponent, } from '../AppLayoutMap';
import ResponsiveForm from '../ResponsiveForm';

const propTypes = {
  // headerColor: PropTypes.object,
};

state.formdata = {
firstname: 'john'
};

let formFunctions = {
  firstname: 'window.firstname'function(...arguments, form) {
    form.setState({formdata: {firstname: e.target.value}})
    if (this.state.formdata === 'john') {
      return {
        label: '',
        type: 'select',
      }
    } else {
      return {
        label: '',
        type: 'select',
      }
    }
  }
}

props.order = [ 'firstname', 'lastname' ];


this.props.order.forEach(element => {
  (formFunctions[element]? 
})


const defaultProps = {
  // cardTitle: '',
  // display: true,
  contents: {
    variable_type: {
      hidden: true,
    },
    state_property_attribute: {
      formElements: [ {
        label: 'Value',
        name: 'state_property_attribute',
        type: 'select',
        options: [ { label: 'True', value: 'true' }, { label: 'False', value: 'false' },],
      }, {
        label: 'Value',  
        name: 'state_property_attribute',
        type: 'text',
      }],
      validations: [ {
        firstname: {
          presence: true,
        }
      }, {
          firstname: {
          minLength: 2,
          maxLength: 10,
        }
      }]
    },
  },
  formgroups: [],
};

class ResponsiveFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // cardProps: props.cardProps,
      formgroups: props.formgroups, 
      formdata: {},
    };
  }

  returnFormState() {
    return this.getState().formdata;
  }

  updateFormLayout() {
    //match the state of the form
    this.setState({ formdata: returnFormState() }, () => {
      //iterate through and create formElements
    })
  }
  /**
   * @param event function that will be registered
   * @param elements elements that the event function will be registered to
   */
  registerListener(event, element) {
    //swap is onChange event
    event = function swap(e) {
      console.log({ e });
      let value = e.target.value;
      if (this.state.formdata.variable_type === 'Boolean') {
        this.updateFormLayout({ add: [], subtract: [], swap: [ ['first_name', ]]});
      }
    }
    event = event.bind(this);

    elements = ['firstname'];
    elements = (Array.isArray(elements)) ? elements.map(elmt => this.props.contents[ elmt ]) : this.props.contents[ elmt ];
    let buildFormProps = Object.assign({}, { useFormOptions: true }, {formgroups: [] });
    elements.forEach(elmt => {
      if (Array.isArray(elmt.formElements)) {
        //push validations,
        //push formElements into formgroups
      } else {
        
      }
    })
  }

  render() {
    return (<ResponsiveForm returnFormState {...buildFormProps} />)
  }
}

ResponsiveFormContainer.propTypes = propTypes;
ResponsiveFormContainer.defaultProps = defaultProps;

export default ResponsiveFormContainer;
