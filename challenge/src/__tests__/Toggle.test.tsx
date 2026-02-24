import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toggle } from '../components/Toggle/Toggle';

describe('Toggle component', () => {
  test('renders with label and toggles (Arrange, Act, Assert)', async () => {
    // Arrange
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Toggle label="Switch" onChange={onChange} />);
    const sw = screen.getByRole('switch');
    expect(screen.getByText(/switch/i)).toBeInTheDocument();
    // Act
    await user.click(sw);
    // Assert
    expect(onChange).toHaveBeenCalledWith(true);
  });

  test('respects disabled prop and is not focusable (Arrange, Act, Assert)', async () => {
    // Arrange
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Toggle label="No" onChange={onChange} disabled />);
    const sw = screen.getByRole('switch');
    // Act
    await user.click(sw);
    // Assert
    expect(onChange).not.toHaveBeenCalled();
    expect(sw.getAttribute('tabindex')).toBe('-1');
  });
});
