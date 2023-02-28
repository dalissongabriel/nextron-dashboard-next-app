import BackIconButton from "@components/BackIconButton";
import { render } from "@testing-library/react";

describe("BackIconButton", () => {
  it("should render back button correctly", () => {
    const { asFragment } = render(<BackIconButton href="#" />);

    expect(asFragment()).toMatchSnapshot();
  });
});
