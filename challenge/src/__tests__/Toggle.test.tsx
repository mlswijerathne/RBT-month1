import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toggle } from '../components/Toggle/Toggle';

describe('Toggle', () => {
  describe('rendering', () => {
    it('renders with label', () => {
      render(<Toggle label="Dark mode" />);
      expect(screen.getByText('Dark mode')).toBeInTheDocument();
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('renders without label', () => {
      render(<Toggle />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
      expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
    });

    it('reflects initial unchecked state via aria-checked', () => {
      render(<Toggle label="Switch" />);
      expect(screen.getByRole('switch').getAttribute('aria-checked')).toBe('false');
    });

    it('reflects controlled checked state via aria-checked', () => {
      render(<Toggle label="On" checked={true} onChange={jest.fn()} />);
      expect(screen.getByRole('switch').getAttribute('aria-checked')).toBe('true');
    });
  });

  describe('interactions', () => {
    it('calls onChange with new value on click', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<Toggle label="Switch" onChange={onChange} />);
      await user.click(screen.getByRole('switch'));
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('toggles with Enter key', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<Toggle label="Switch" onChange={onChange} />);
      screen.getByRole('switch').focus();
      await user.keyboard('{Enter}');
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('toggles with Space key', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<Toggle label="Switch" onChange={onChange} />);
      screen.getByRole('switch').focus();
      await user.keyboard(' ');
      expect(onChange).toHaveBeenCalledWith(true);
    });
  });

  describe('edge cases', () => {
    it('disabled toggle does not call onChange on click', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<Toggle label="Off" onChange={onChange} disabled />);
      await user.click(screen.getByRole('switch'));
      expect(onChange).not.toHaveBeenCalled();
    });

    it('disabled toggle has tabIndex -1', () => {
      render(<Toggle label="Off" disabled />);
      expect(screen.getByRole('switch').getAttribute('tabindex')).toBe('-1');
    });
  });
});
