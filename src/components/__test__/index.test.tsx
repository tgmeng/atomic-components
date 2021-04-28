import * as React from 'react';
import { render, getByText } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  test('should display text', () => {
    const { container } = render(<Button>Text</Button>);
    getByText(container, 'Text');
  });
});
