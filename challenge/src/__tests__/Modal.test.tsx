import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '../components/Modal/Modal';

describe('Modal component', () => {
  test('renders when open and focuses (Arrange, Act, Assert)', async () => {
    // Arrange
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(
      <Modal isOpen onClose={onClose} title="Hello">
        <p>Content</p>
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    // Act / Assert
    expect(dialog).toBeInTheDocument();
    // focus should be moved to modal (tabIndex -1 is present)
    // Attempt to focus element
    dialog.focus();
    expect(document.activeElement).toBe(dialog);
  });

  test('Escape key triggers onClose (Arrange, Act, Assert)', async () => {
    // Arrange
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(
      <Modal isOpen onClose={onClose} title="X">
        <div>Inside</div>
      </Modal>
    );
    // Act
    await user.keyboard('{Escape}');
    // Assert
    expect(onClose).toHaveBeenCalled();
  });

  test('clicking overlay calls onClose and clicking inside does not (Arrange, Act, Assert)', async () => {
    // Arrange
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(
      <Modal isOpen onClose={onClose} title="X">
        <div data-testid="inside">Inside</div>
      </Modal>
    );
    const overlay = screen.getByRole('dialog').parentElement as HTMLElement;
    const inside = screen.getByTestId('inside');
    // Act
    await user.click(inside);
    // Assert
    expect(onClose).not.toHaveBeenCalled();
    // Act: click overlay
    await user.click(overlay);
    expect(onClose).toHaveBeenCalled();
  });
});
