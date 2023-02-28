import PageTitle from "@components/PageTitle";
import { render, screen } from "@testing-library/react";

describe("PageTitle", () => {
  it("should render title component correctly", () => {
    const { asFragment } = render(<PageTitle>Lorem Ipsum</PageTitle>);

    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText("Lorem Ipsum")).toBeInTheDocument();
  });

  it("should display divier with sent bottomDivider prop", () => {
    render(<PageTitle bottomDivider>Dolorem amet</PageTitle>);

    expect(screen.getByTestId("page-title-divider-id")).toBeInTheDocument();
  });
});
