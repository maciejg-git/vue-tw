import { render, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom"
import Input from "../components/vInput.vue";

test("input is required (invalid)", async () => {
  const { getByRole, getByTestId, queryByText } = render(Input, {
    props: {
      rules: {
        required: true,
      }
    },
  });

  let textbox = getByRole("textbox");
  await fireEvent.click(textbox)
  await fireEvent.blur(textbox)
  expect(getByTestId("error-messages")).toBeInTheDocument()
  expect(queryByText("This field is required")).toBeInTheDocument()
});

test("input is required (valid)", async () => {
  const { getByRole, getByTestId, queryByTestId } = render(Input, {
    props: {
      rules: {
        required: true,
      },
      modelValue: "a",
    },
  });

  let textbox = getByRole("textbox");
  await fireEvent.click(textbox)
  await fireEvent.blur(textbox)
  expect(queryByTestId("error-messages")).not.toBeInTheDocument()
});
