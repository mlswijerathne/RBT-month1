import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../components/Button/Button';

describe('Button', () => {
  describe('rendering', () => {
    it('renders with correct text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('applies variant styles', () => {
      const { rerender } = render(<Button variant="danger">Danger</Button>);
      expect(screen.getByRole('button').className).toContain('btn-danger');
      rerender(<Button variant="secondary">Sec</Button>);
      expect(screen.getByRole('button').className).toContain('btn-secondary');
      rerender(<Button variant="primary">Pri</Button>);
      expect(screen.getByRole('button').className).toContain('btn-primary');
    });

    it('supports custom className', () => {
      render(<Button className="my-class">Label</Button>);
      expect(screen.getByRole('button').className).toContain('my-class');
    });

    it('renders loading spinner text when loading', () => {
      render(<Button loading>Save</Button>);
      expect(screen.getByRole('button', { name: /loading.../i })).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('handles click events', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();
      render(<Button onClick={onClick}>Click</Button>);
      await user.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('respects disabled prop — does not fire onClick', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();
      render(<Button disabled onClick={onClick}>No</Button>);
      const btn = screen.getByRole('button', { name: /no/i });
      await user.click(btn);
      expect(btn).toBeDisabled();
      expect(onClick).not.toHaveBeenCalled();
    });

    it('loading state disables button and prevents onClick', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();
      render(<Button loading onClick={onClick}>Save</Button>);
      const btn = screen.getByRole('button', { name: /loading.../i });
      await user.click(btn);
      expect(btn).toBeDisabled();
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('sets aria-busy when loading', () => {
      render(<Button loading>Save</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    });

    it('does not set aria-busy when not loading', () => {
      render(<Button>Save</Button>);
      expect(screen.getByRole('button')).not.toHaveAttribute('aria-busy');
    });
  });

  describe('edge cases', () => {
    it('renders without onClick without throwing', () => {
      expect(() => render(<Button>Safe</Button>)).not.toThrow();
    });

    it('applies default primary variant when no variant given', () => {
      render(<Button>Default</Button>);
      expect(screen.getByRole('button').className).toContain('btn-primary');
    });
  });
});
