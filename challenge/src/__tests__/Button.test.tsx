import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../components/Button/Button';

describe('Button component', () => {
  test('renders with correct text (Arrange, Act, Assert)', () => {
    // Arrange
    render(<Button>Click me</Button>);
    // Act
    const btn = screen.getByRole('button', { name: /click me/i });
    // Assert
    expect(btn).toBeInTheDocument();
  });

  test('handles click events (Arrange, Act, Assert)', async () => {
    // Arrange
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click</Button>);
    const btn = screen.getByRole('button', { name: /click/i });
    // Act
    await user.click(btn);
    // Assert
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('shows loading state and disables interactions (Arrange, Act, Assert)', async () => {
    // Arrange
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <Button loading onClick={onClick}>
        Save
      </Button>
    );
    const btn = screen.getByRole('button', { name: /loading.../i });
    // Act
    await user.click(btn);
    // Assert
    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();
    expect(onClick).not.toHaveBeenCalled();
  });

  test('respects disabled prop (Arrange, Act, Assert)', async () => {
    // Arrange
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <Button disabled onClick={onClick}>
        No
      </Button>
    );
    const btn = screen.getByRole('button', { name: /no/i });
    // Act
    await user.click(btn);
    // Assert
    expect(btn).toBeDisabled();
    expect(onClick).not.toHaveBeenCalled();
  });

  test('applies variant styles and supports custom className (Arrange, Act, Assert)', () => {
    // Arrange
    const { rerender } = render(
      <Button variant="danger" className="custom-class">
        Danger
      </Button>
    );
    // Act
    const btn = screen.getByRole('button', { name: /danger/i });
    // Assert
    expect(btn.className).toContain('btn-danger');
    expect(btn.className).toContain('custom-class');
    // sanity: different variant
    rerender(<Button variant="secondary">Sec</Button>);
    expect(screen.getByRole('button', { name: /sec/i }).className).toContain('btn-secondary');
  });
});
