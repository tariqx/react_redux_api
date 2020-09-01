import React from 'react';
import ReactDOM from 'react-dom';
import DisplayErrors from './DisplayErrors';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DisplayErrors />, div);
  ReactDOM.unmountComponentAtNode(div);
});