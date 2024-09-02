import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./home";
import React from "react";

describe("Page", () => {
  it("renders the page", () => {
    render(<Home />);
    expect(screen.getByText("Get started by editing")).toHaveTextContent(
      "Get started by editing"
    );
  });
});
