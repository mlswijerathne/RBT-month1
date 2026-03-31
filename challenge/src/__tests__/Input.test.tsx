import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../components/Input/Input';

describe('Input', () => {
  describe('rendering', () => {
    it('renders with placeholder', () => {
      render(<Input placeholder="Enter name" />);
      expect(screen.getByPlaceholderText(/enter name/i)).toBeInTheDocument();
    });

    it('renders label when provided', () => {
      render(<Input label="Email" />);
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });

    it('renders required indicator when required', () => {
      render(<Input label="Name" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
      expect(screen.getByLabelText(/name/i)).toBeRequired();
    });

    it('supports different input types', () => {
      render(<Input type="password" label="Password" />);
      expect((screen.getByLabelText(/password/i) as HTMLInputElement).type).toBe('password');
    });
  });

  describe('interactions', () => {
    it('updates value on change', async () => {
      const user = userEvent.setup();
      function Wrapper() {
        const [val, setVal] = useState('');
        return <Input value={val} onChange={(e) => setVal(e.target.value)} placeholder="Type" />;
      }
      render(<Wrapper />);
      const el = screen.getByPlaceholderText(/type/i) as HTMLInputElement;
      await user.type(el, 'hello');
      expect(el.value).toBe('hello');
    });

    it('handles focus and blur callbacks', async () => {
      const user = userEvent.setup();
      const onFocus = jest.fn();
      const onBlur = jest.fn();
      render(<Input label="Test" onFocus={onFocus} onBlur={onBlur} />);
      await user.click(screen.getByLabelText(/test/i));
      await user.tab();
      expect(onFocus).toHaveBeenCalled();
      expect(onBlur).toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('shows error message and aria-invalid when error provided', () => {
      render(<Input label="Name" error="Required" />);
      const input = screen.getByLabelText(/name/i);
      expect(screen.getByRole('alert')).toHaveTextContent('Required');
      expect(input.getAttribute('aria-invalid')).toBe('true');
      expect(input.getAttribute('aria-describedby')).toContain('error');
    });

    it('does not set aria-describedby when no label and error present', () => {
      render(<Input error="Required" />);
      const input = screen.getByRole('textbox');
      expect(input.getAttribute('aria-describedby')).toBeNull();
    });

    it('renders without error state by default', () => {
      render(<Input label="Clean" />);
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(screen.getByLabelText(/clean/i).getAttribute('aria-invalid')).toBe('false');
    });
  });
});
