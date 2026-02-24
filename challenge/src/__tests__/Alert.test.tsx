import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from '../components/Alert/Alert';

describe('Alert component', () => {
  test('renders children and applies variant class (Arrange, Act, Assert)', () => {
    // Arrange
    render(<Alert variant="error">Oh no</Alert>);
    // Act / Assert
    const el = screen.getByText(/oh no/i);
    expect(el).toBeInTheDocument();
    const container = el.closest('.alert');
    expect(container).toHaveClass('alert-error');
  });

  test('dismissible shows button and triggers onDismiss (Arrange, Act, Assert)', async () => {
    // Arrange
    const user = userEvent.setup();
    const onDismiss = jest.fn();
    render(
      <Alert dismissible onDismiss={onDismiss}>
        Bye
      </Alert>
    );
    const btn = screen.getByRole('button', { name: /dismiss alert/i });
    // Act
    await user.click(btn);
    // Assert
    expect(onDismiss).toHaveBeenCalled();
    expect(screen.queryByText(/bye/i)).not.toBeInTheDocument();
  });
});
