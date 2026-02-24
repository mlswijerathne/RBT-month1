import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from '../components/Tabs/Tabs';

describe('Tabs component', () => {
  test('renders default tab and switches on click, onChange receives zero-based index (Arrange, Act, Assert)', async () => {
    // Arrange
    const user = userEvent.setup();
    const onChange = jest.fn();
    const tabs = [
      { label: 'One', content: <div>First</div> },
      { label: 'Two', content: <div>Second</div> },
    ];
    render(<Tabs tabs={tabs} defaultIndex={0} onChange={onChange} />);
    // Act / Assert initial
    expect(screen.getByText(/first/i)).toBeInTheDocument();
    const second = screen.getByRole('button', { name: /two/i });
    await user.click(second);
    // Assert
    expect(screen.getByText(/second/i)).toBeInTheDocument();
    expect(onChange).toHaveBeenCalledWith(1);
  });
});
