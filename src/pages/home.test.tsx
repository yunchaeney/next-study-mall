import { render } from "@testing-library/react";
import "@testing-library/dom";
import Home from "./home";

describe("Page", () => {
  it("renders the page", () => {
    render(<Home />);
  });
});
