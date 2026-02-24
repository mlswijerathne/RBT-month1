import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from '../components/Card/Card';

describe('Card component', () => {
  test('renders title, image, children and actions (Arrange, Act, Assert)', () => {
    // Arrange
    render(
      <Card title="Hello" image="/img.png" actions={<button>Act</button>} className="my-card">
        <p>Body</p>
      </Card>
    );
    // Act / Assert
    expect(screen.getByText(/hello/i)).toBeInTheDocument();
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.src).toContain('/img.png');
    expect(img.alt).toBe('Hello');
    expect(screen.getByText(/body/i)).toBeInTheDocument();
    expect(screen.getByText(/act/i)).toBeInTheDocument();
    const container = screen.getByText(/body/i).closest('.card');
    expect(container).toHaveClass('my-card');
  });
});
