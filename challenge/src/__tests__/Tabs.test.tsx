import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from '../components/Tabs/Tabs';

const tabs = [
  { label: 'One', content: <div>First content</div> },
  { label: 'Two', content: <div>Second content</div> },
  { label: 'Three', content: <div>Third content</div> },
];

describe('Tabs', () => {
  describe('rendering', () => {
    it('renders all tab labels', () => {
      render(<Tabs tabs={tabs} />);
      expect(screen.getByRole('tab', { name: /one/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /two/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /three/i })).toBeInTheDocument();
    });

    it('shows content of the default first tab', () => {
      render(<Tabs tabs={tabs} />);
      expect(screen.getByText('First content')).toBeInTheDocument();
    });

    it('respects defaultIndex prop', () => {
      render(<Tabs tabs={tabs} defaultIndex={1} />);
      expect(screen.getByText('Second content')).toBeInTheDocument();
      expect(screen.queryByText('First content')).not.toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('switches content when a tab is clicked', async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={tabs} />);
      await user.click(screen.getByRole('tab', { name: /two/i }));
      expect(screen.getByText('Second content')).toBeInTheDocument();
      expect(screen.queryByText('First content')).not.toBeInTheDocument();
    });

    it('calls onChange with zero-based index on tab click', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<Tabs tabs={tabs} onChange={onChange} />);
      await user.click(screen.getByRole('tab', { name: /two/i }));
      expect(onChange).toHaveBeenCalledWith(1);
      await user.click(screen.getByRole('tab', { name: /three/i }));
      expect(onChange).toHaveBeenCalledWith(2);
    });
  });

  describe('edge cases', () => {
    it('renders a single tab without errors', () => {
      const single = [{ label: 'Only', content: <div>Solo</div> }];
      render(<Tabs tabs={single} />);
      expect(screen.getByRole('tab', { name: /only/i })).toBeInTheDocument();
      expect(screen.getByText('Solo')).toBeInTheDocument();
    });

    it('marks the active tab as aria-selected', async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={tabs} />);
      expect(screen.getByRole('tab', { name: /one/i }).getAttribute('aria-selected')).toBe('true');
      await user.click(screen.getByRole('tab', { name: /two/i }));
      expect(screen.getByRole('tab', { name: /two/i }).getAttribute('aria-selected')).toBe('true');
      expect(screen.getByRole('tab', { name: /one/i }).getAttribute('aria-selected')).toBe('false');
    });
  });
});
