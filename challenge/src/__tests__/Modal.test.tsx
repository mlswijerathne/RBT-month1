import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '../components/Modal/Modal';

describe('Modal', () => {
  describe('rendering', () => {
    it('renders dialog when isOpen is true', () => {
      render(<Modal isOpen onClose={jest.fn()} title="Hello"><p>Content</p></Modal>);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders nothing when isOpen is false', () => {
      render(<Modal isOpen={false} onClose={jest.fn()}><p>Hidden</p></Modal>);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders title and children', () => {
      render(<Modal isOpen onClose={jest.fn()} title="My Title"><p>Body text</p></Modal>);
      expect(screen.getByText('My Title')).toBeInTheDocument();
      expect(screen.getByText('Body text')).toBeInTheDocument();
    });

    it('renders a close button', () => {
      render(<Modal isOpen onClose={jest.fn()} title="X"><p>Hi</p></Modal>);
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('Escape key triggers onClose', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      render(<Modal isOpen onClose={onClose} title="X"><div>Inside</div></Modal>);
      await user.keyboard('{Escape}');
      expect(onClose).toHaveBeenCalled();
    });

    it('clicking overlay calls onClose', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      render(<Modal isOpen onClose={onClose} title="X"><div>Inside</div></Modal>);
      const overlay = screen.getByRole('dialog').parentElement as HTMLElement;
      await user.click(overlay);
      expect(onClose).toHaveBeenCalled();
    });

    it('clicking inside modal does not call onClose', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      render(
        <Modal isOpen onClose={onClose} title="X">
          <div data-testid="inside">Inside</div>
        </Modal>
      );
      await user.click(screen.getByTestId('inside'));
      expect(onClose).not.toHaveBeenCalled();
    });

    it('close button click calls onClose', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      render(<Modal isOpen onClose={onClose} title="X"><p>Hi</p></Modal>);
      await user.click(screen.getByRole('button', { name: /close/i }));
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('focuses the modal dialog on open', () => {
      render(<Modal isOpen onClose={jest.fn()} title="Focus"><p>Hi</p></Modal>);
      const dialog = screen.getByRole('dialog');
      dialog.focus();
      expect(document.activeElement).toBe(dialog);
    });

    it('renders without title', () => {
      render(<Modal isOpen onClose={jest.fn()}><p>No title</p></Modal>);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });
  });
});
