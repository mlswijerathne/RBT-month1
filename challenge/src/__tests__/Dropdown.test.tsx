import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown } from '../components/Dropdown/Dropdown';

const items = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Bravo' },
];

describe('Dropdown', () => {
  describe('rendering', () => {
    it('renders placeholder text', () => {
      render(<Dropdown items={items} placeholder="Pick one" />);
      expect(screen.getByText('Pick one')).toBeInTheDocument();
    });

    it('does not show menu on initial render', () => {
      render(<Dropdown items={items} placeholder="Pick" />);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('opens menu on click', async () => {
      const user = userEvent.setup();
      render(<Dropdown items={items} placeholder="Pick" />);
      await user.click(screen.getByRole('combobox'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /alpha/i })).toBeInTheDocument();
    });

    it('selecting an item calls onChange and closes menu', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<Dropdown items={items} onChange={onChange} placeholder="Pick" />);
      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: /bravo/i }));
      expect(onChange).toHaveBeenCalledWith('b');
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('opens with Enter key and closes with Escape key', async () => {
      const user = userEvent.setup();
      render(<Dropdown items={items} placeholder="X" />);
      screen.getByRole('combobox').focus();
      await user.keyboard('{Enter}');
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      await user.keyboard('{Escape}');
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('closes when clicking outside', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Dropdown items={items} placeholder="Out" />
          <button>Outside</button>
        </div>
      );
      await user.click(screen.getByRole('combobox'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: /outside/i }));
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('shows selected item label when value is controlled', () => {
      render(<Dropdown items={items} value="a" placeholder="Pick" />);
      expect(screen.getByText('Alpha')).toBeInTheDocument();
      expect(screen.queryByText('Pick')).not.toBeInTheDocument();
    });
  });
});
