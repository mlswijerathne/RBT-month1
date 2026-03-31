import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../components/Button/Button';
import { Input } from '../components/Input/Input';
import { Modal } from '../components/Modal/Modal';
import { Dropdown } from '../components/Dropdown/Dropdown';
import { Alert } from '../components/Alert/Alert';

// Integration Test 1: Form submission flow (Input + Button)
describe('Form submission flow', () => {
  function ContactForm({ onSubmit }: { onSubmit: (name: string) => void }) {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
      if (!name.trim()) {
        setError('Name is required');
        return;
      }
      setError('');
      setSubmitted(true);
      onSubmit(name);
    };

    if (submitted) return <Alert variant="success">Submitted: {name}</Alert>;

    return (
      <div>
        <Input
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={error}
          required
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    );
  }

  it('shows validation error when submitted with empty name', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<ContactForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByRole('alert')).toHaveTextContent('Name is required');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits successfully when name is filled in', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<ContactForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/full name/i), 'Lakshitha');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(onSubmit).toHaveBeenCalledWith('Lakshitha');
    expect(screen.getByText(/submitted: lakshitha/i)).toBeInTheDocument();
  });

  it('clears error once valid input is submitted', async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={jest.fn()} />);

    await user.click(screen.getByRole('button', { name: /submit/i }));
    expect(screen.getByRole('alert')).toHaveTextContent('Name is required');

    await user.type(screen.getByLabelText(/full name/i), 'Jane');
    await user.click(screen.getByRole('button', { name: /submit/i }));
    expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
  });
});

// Integration Test 2: Modal with a form inside
describe('Modal with form inside', () => {
  function ModalForm() {
    const [open, setOpen] = useState(false);
    const [saved, setSaved] = useState('');
    const [value, setValue] = useState('');

    return (
      <div>
        <Button onClick={() => setOpen(true)}>Edit Profile</Button>
        <Modal isOpen={open} onClose={() => setOpen(false)} title="Edit Profile">
          <Input
            label="Username"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            onClick={() => {
              setSaved(value);
              setOpen(false);
            }}
          >
            Save
          </Button>
        </Modal>
        {saved && <p>Saved: {saved}</p>}
      </div>
    );
  }

  it('opens modal on button click', async () => {
    const user = userEvent.setup();
    render(<ModalForm />);
    await user.click(screen.getByRole('button', { name: /edit profile/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /edit profile/i })).toBeInTheDocument();
  });

  it('fills form inside modal and saves on button click', async () => {
    const user = userEvent.setup();
    render(<ModalForm />);
    await user.click(screen.getByRole('button', { name: /edit profile/i }));
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'Lakshitha' } });
    await user.click(screen.getByRole('button', { name: /save/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByText(/saved:/i)).toBeInTheDocument();
  });

  it('closes modal without saving when Escape is pressed', async () => {
    const user = userEvent.setup();
    render(<ModalForm />);
    await user.click(screen.getByRole('button', { name: /edit profile/i }));
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'Unsaved' } });
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByText(/saved:/i)).not.toBeInTheDocument();
  });
});

// Integration Test 3: Dropdown selection affects other component state
describe('Dropdown selection affecting other components', () => {
  const themes = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
  ];

  function ThemeSelector() {
    const [theme, setTheme] = useState('');

    return (
      <div>
        <Dropdown
          items={themes}
          value={theme}
          onChange={setTheme}
          placeholder="Choose theme"
        />
        {theme === 'dark' && (
          <Alert variant="info">Dark mode is active</Alert>
        )}
        {theme === 'light' && (
          <Alert variant="success">Light mode is active</Alert>
        )}
        {!theme && (
          <p>No theme selected</p>
        )}
      </div>
    );
  }

  it('shows no theme message initially', () => {
    render(<ThemeSelector />);
    expect(screen.getByText('No theme selected')).toBeInTheDocument();
  });

  it('selecting dark theme shows dark mode alert', async () => {
    const user = userEvent.setup();
    render(<ThemeSelector />);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByRole('option', { name: /dark/i }));
    expect(screen.getByText('Dark mode is active')).toBeInTheDocument();
    expect(screen.queryByText('No theme selected')).not.toBeInTheDocument();
  });

  it('switching from dark to light updates the alert', async () => {
    const user = userEvent.setup();
    render(<ThemeSelector />);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByRole('option', { name: /dark/i }));
    expect(screen.getByText('Dark mode is active')).toBeInTheDocument();

    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByRole('option', { name: /light/i }));
    expect(screen.getByText('Light mode is active')).toBeInTheDocument();
    expect(screen.queryByText('Dark mode is active')).not.toBeInTheDocument();
  });
});
