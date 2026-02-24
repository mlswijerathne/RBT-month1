import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../components/Input/Input';

describe('Input component', () => {
  test('renders with placeholder (Arrange, Act, Assert)', () => {
    // Arrange
    render(<Input placeholder="Enter name" />);
    // Act
    const el = screen.getByPlaceholderText(/enter name/i);
    // Assert
    expect(el).toBeInTheDocument();
  });

  test('updates value on change (Arrange, Act, Assert)', async () => {
    // Arrange
    const user = userEvent.setup();
    function Wrapper() {
      const [value, setValue] = useState('');
      return <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Type" />;
    }
    render(<Wrapper />);
    const el = screen.getByPlaceholderText(/type/i) as HTMLInputElement;
    // Act
    await user.type(el, 'hello');
    // Assert
    expect(el.value).toBe('hello');
  });

  test('shows error message and aria attributes (Arrange, Act, Assert)', () => {
    // Arrange
    render(<Input label="Name" error="Required" />);
    const input = screen.getByLabelText(/name/i);
    // Act
    const alert = screen.getByRole('alert');
    // Assert
    expect(alert).toHaveTextContent('Required');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toBeDefined();
  });

  test('validates required field via attribute (Arrange, Act, Assert)', () => {
    // Arrange
    render(<Input label="Email" required />);
    const input = screen.getByLabelText(/email/i);
    // Act / Assert
    expect(input).toBeRequired();
  });

  test('handles focus and blur callbacks (Arrange, Act, Assert)', async () => {
    // Arrange
    const user = userEvent.setup();
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    render(<Input label="Test" onFocus={onFocus} onBlur={onBlur} />);
    const input = screen.getByLabelText(/test/i);
    // Act
    await user.click(input);
    await user.tab(); // move focus away
    // Assert
    expect(onFocus).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalled();
  });

  test('supports different types (Arrange, Act, Assert)', () => {
    // Arrange
    render(<Input type="password" label="PW" />);
    const input = screen.getByLabelText(/pw/i) as HTMLInputElement;
    // Act / Assert
    expect(input.type).toBe('password');
  });
});
