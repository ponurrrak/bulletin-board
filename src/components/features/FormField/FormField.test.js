import React from 'react';
import { shallow } from 'enzyme';
import { FormFieldComponent } from './FormField';

describe('Component Formfield', () => {
  it('should render without crashing', () => {
    const component = shallow(<FormFieldComponent />);
    expect(component).toBeTruthy();
  });
});
