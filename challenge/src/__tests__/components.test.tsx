import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../components/Button/Button";
import { Tabs } from "../components/Tabs/Tabs";
import { Input } from "../components/Input/Input";
import { Toggle } from "../components/Toggle/Toggle";

describe("Component bug detection tests", () => {
  test("Button: disabled prop should disable the button and prevent clicks", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <Button onClick={onClick} disabled>
        Click me
      </Button>
    );

    const btn = screen.getByRole("button", { name: /click me/i });
    expect(btn).toBeDisabled();
    await user.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  test("Button: loading state should disable the button and prevent clicks", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <Button onClick={onClick} loading>
        Save
      </Button>
    );

    const btn = screen.getByRole("button", { name: /loading.../i });
    expect(btn).toBeDisabled();
    await user.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  test("Tabs: onChange should receive zero-based index when tab clicked", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const tabs = [
      { label: "One", content: <div>One</div> },
      { label: "Two", content: <div>Two</div> },
    ];

    render(<Tabs tabs={tabs} onChange={onChange} />);

    const second = screen.getByRole("button", { name: /two/i });
    await user.click(second);
    expect(onChange).toHaveBeenCalledWith(1);
  });

  test("Input: when no label is provided, aria-describedby should not contain 'undefined'", () => {
    render(<Input error="Required" />);

    const input = screen.getByRole("textbox");
    const described = input.getAttribute("aria-describedby");
    expect(described).not.toBeDefined();

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
  });

  test("Toggle: clicking should call onChange with the new checked value", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Toggle onChange={onChange} />);

    const toggle = screen.getByRole("switch");
    await user.click(toggle);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
