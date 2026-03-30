import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown } from '../components/Dropdown/Dropdown';

const items = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Bravo' },
];

describe('Dropdown component', () => {
  test('renders placeholder and opens menu on click (Arrange, Act, Assert)', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<Dropdown items={items} placeholder="Pick" />);
    const trigger = screen.getByText(/pick/i);
    // Act
    await user.click(trigger);
    // Assert
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText(/alpha/i)).toBeInTheDocument();
  });

  test('selecting an item calls onChange and closes menu (Arrange, Act, Assert)', async () => {
    // Arrange
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Dropdown items={items} onChange={onChange} placeholder="Pick" />);
    const trigger = screen.getByText(/pick/i);
    await user.click(trigger);
    const item = screen.getByRole('option', { name: /bravo/i });
    // Act
    await user.click(item);
    // Assert
    expect(onChange).toHaveBeenCalledWith('b');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('keyboard opens with Enter/Space and Escape closes (Arrange, Act, Assert)', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<Dropdown items={items} placeholder="X" />);
    const trigger = screen.getByText(/x/i);
    // Act
    trigger.focus();
    await user.keyboard('{Enter}');
    // Assert
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('closes when clicking outside (Arrange, Act, Assert)', async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      <div>
        <Dropdown items={items} placeholder="Out" />
        <button>Outside</button>
      </div>
    );
    const trigger = screen.getByRole('combobox');
    // Act
    await user.click(trigger);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /outside/i }));
    // Assert
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
