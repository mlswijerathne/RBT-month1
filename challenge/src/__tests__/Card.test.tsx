import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from '../components/Card/Card';

describe('Card', () => {
  describe('rendering', () => {
    it('renders children', () => {
      render(<Card><p>Body content</p></Card>);
      expect(screen.getByText('Body content')).toBeInTheDocument();
    });

    it('renders title when provided', () => {
      render(<Card title="My Card"><p>Body</p></Card>);
      expect(screen.getByText('My Card')).toBeInTheDocument();
    });

    it('renders image with correct src and alt text', () => {
      render(<Card title="Hero" image="/hero.png"><p>Body</p></Card>);
      const img = screen.getByRole('img') as HTMLImageElement;
      expect(img.src).toContain('/hero.png');
      expect(img.alt).toBe('Hero');
    });

    it('renders actions slot', () => {
      render(<Card actions={<button>Learn More</button>}><p>Body</p></Card>);
      expect(screen.getByRole('button', { name: /learn more/i })).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Card className="featured"><p>Body</p></Card>);
      expect(screen.getByText('Body').closest('.card')).toHaveClass('featured');
    });
  });

  describe('interactions', () => {
    it('fires action button click handler', async () => {
      const user = userEvent.setup();
      const onAction = jest.fn();
      render(
        <Card actions={<button onClick={onAction}>Learn More</button>}>
          <p>Body</p>
        </Card>
      );
      await user.click(screen.getByRole('button', { name: /learn more/i }));
      expect(onAction).toHaveBeenCalledTimes(1);
    });

    it('renders multiple action buttons and each fires independently', async () => {
      const user = userEvent.setup();
      const onPrimary = jest.fn();
      const onSecondary = jest.fn();
      render(
        <Card
          actions={
            <>
              <button onClick={onPrimary}>Save</button>
              <button onClick={onSecondary}>Cancel</button>
            </>
          }
        >
          <p>Body</p>
        </Card>
      );
      await user.click(screen.getByRole('button', { name: /save/i }));
      expect(onPrimary).toHaveBeenCalledTimes(1);
      expect(onSecondary).not.toHaveBeenCalled();

      await user.click(screen.getByRole('button', { name: /cancel/i }));
      expect(onSecondary).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    it('renders without optional props', () => {
      expect(() => render(<Card><p>Minimal</p></Card>)).not.toThrow();
      expect(screen.getByText('Minimal')).toBeInTheDocument();
    });

    it('does not render image when image prop is omitted', () => {
      render(<Card title="No image"><p>Body</p></Card>);
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('does not render title section when title is omitted', () => {
      render(<Card><p>Body</p></Card>);
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });

    it('image alt falls back to empty string when no title', () => {
      const { container } = render(<Card image="/pic.png"><p>Body</p></Card>);
      const img = container.querySelector('img') as HTMLImageElement;
      expect(img).not.toBeNull();
      expect(img.alt).toBe('');
    });
  });
});
