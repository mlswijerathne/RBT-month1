import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from '../components/Alert/Alert';

describe('Alert', () => {
  describe('rendering', () => {
    it('renders children', () => {
      render(<Alert>Hello world</Alert>);
      expect(screen.getByText('Hello world')).toBeInTheDocument();
    });

    it('applies info variant class', () => {
      render(<Alert variant="info">Info</Alert>);
      expect(screen.getByText('Info').closest('.alert')).toHaveClass('alert-info');
    });

    it('applies success variant class', () => {
      render(<Alert variant="success">Done</Alert>);
      expect(screen.getByText('Done').closest('.alert')).toHaveClass('alert-success');
    });

    it('applies warning variant class', () => {
      render(<Alert variant="warning">Warn</Alert>);
      expect(screen.getByText('Warn').closest('.alert')).toHaveClass('alert-warning');
    });

    it('applies error variant class', () => {
      render(<Alert variant="error">Error</Alert>);
      expect(screen.getByText('Error').closest('.alert')).toHaveClass('alert-error');
    });
  });

  describe('interactions', () => {
    it('dismissible alert triggers onDismiss callback on click', async () => {
      const user = userEvent.setup();
      const onDismiss = jest.fn();
      render(<Alert dismissible onDismiss={onDismiss}>Bye</Alert>);
      await user.click(screen.getByRole('button', { name: /dismiss alert/i }));
      expect(onDismiss).toHaveBeenCalled();
    });

    it('dismissible alert hides content after dismiss', async () => {
      const user = userEvent.setup();
      render(<Alert dismissible>Gone</Alert>);
      await user.click(screen.getByRole('button', { name: /dismiss alert/i }));
      expect(screen.queryByText('Gone')).not.toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('non-dismissible alert has no dismiss button', () => {
      render(<Alert>Persistent</Alert>);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('defaults to info variant', () => {
      render(<Alert>Default</Alert>);
      expect(screen.getByText('Default').closest('.alert')).toHaveClass('alert-info');
    });
  });
});
