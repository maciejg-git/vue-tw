import { render, fireEvent } from "@testing-library/vue";
import userEvent from "@testing-library/user-event"
import Select from "../components/vSelect.vue";

const states = [
  {
    text: "Alabama",
    value: "Alabama",
  },
  {
    text: "Alaska",
    value: "Alaska",
  },
  {
    text: "American Samoa",
    value: "American Samoa",
  },
  {
    text: "Arizona",
    value: "Arizona",
  },
  {
    text: "Arkansas",
    value: "Arkansas",
  },
  {
    text: "California",
    value: "California",
  },
  {
    text: "Colorado",
    value: "Colorado",
  },
  {
    text: "Connecticut",
    value: "Connecticut",
  },
]

const statesWithLabel = [
  {
    label: "Alabama",
    value: "Alabama",
  },
  {
    label: "Alaska",
    value: "Alaska",
  },
  {
    label: "American Samoa",
    value: "American Samoa",
  },
  {
    label: "Arizona",
    value: "Arizona",
  },
  {
    label: "Arkansas",
    value: "Arkansas",
  },
  {
    label: "California",
    value: "California",
  },
  {
    label: "Colorado",
    value: "Colorado",
  },
  {
    label: "Connecticut",
    value: "Connecticut",
  },
]

test("renders component", () => {
  const { getByRole } = render(Select, {
    props: {},
  });

  getByRole("combobox");
});

test("opens select dropdown with no items (click)", async () => {
  const { getByRole } = render(Select, {
    props: {},
  });

  let select = getByRole("combobox");
  await fireEvent.click(select)
  getByRole("listbox")
});

test("opens select dropdown with no items (focus)", async () => {
  const { getByRole } = render(Select, {
    props: {},
  });

  let select = getByRole("combobox");
  await userEvent.tab(select)
  getByRole("listbox")
});

test("does not open autocomplete dropdown with no items", async () => {
  const { getByRole, queryByRole } = render(Select, {
    props: {
      autocomplete: true,
    },
  });

  let select = getByRole("combobox");
  await fireEvent.click(select)
  expect(queryByRole("listbox")).toBeNull()
});

test("opens autocomplete on input update", async () => {
  const { getByRole, findByRole } = render(Select, {
    props: {
      items: states,
      autocomplete: true,
    },
  });

  let select = getByRole("combobox");
  await fireEvent.click(select)
  let input = select.querySelector("input")
  await fireEvent.update(input, "a")
  await findByRole("listbox")

});

test("renders options", async () => {
  const { getByRole, getAllByRole } = render(Select, {
    props: {
      items: states,
    },
  });

  let select = getByRole("combobox");
  await fireEvent.click(select)
  expect(getAllByRole("option").length).toBe(8)
});

test("filters options", async () => {
  const { getByRole, findAllByRole } = render(Select, {
    props: {
      items: states,
      autocomplete: true,
    },
  });

  let select = getByRole("combobox");
  await fireEvent.click(select)
  let input = select.querySelector("input")
  await fireEvent.update(input, "c")
  expect((await findAllByRole("option")).length).toBe(4)
});

test("filters options (filter-keys prop)", async () => {
  const { getByRole, findAllByRole } = render(Select, {
    props: {
      items: statesWithLabel,
      autocomplete: true,
      filterKeys: ["label"],
    },
  });

  let select = getByRole("combobox");
  await fireEvent.click(select)
  let input = select.querySelector("input")
  await fireEvent.update(input, "c")
  expect((await findAllByRole("option")).length).toBe(4)
});

test("does not filter options (no-filter prop)", async () => {
  const { getByRole, findAllByRole } = render(Select, {
    props: {
      items: states,
      autocomplete: true,
      noFilter: true,
    },
  });

  let select = getByRole("combobox");
  await fireEvent.click(select)
  let input = select.querySelector("input")
  await fireEvent.update(input, "c")
  expect((await findAllByRole("option")).length).toBe(8)
});

test("paginates options", async () => {
  const { getByRole, getAllByRole, } = render(Select, {
    props: {
      items: states,
      itemsPerPage: 2,
    },
  });

  let select = getByRole("combobox");
  await fireEvent.click(select)
  expect(getAllByRole("option").length).toBe(2)
});

test("does not paginate options (no-pagination prop)", async () => {
  const { getByRole, getAllByRole, } = render(Select, {
    props: {
      items: states,
      itemsPerPage: 2,
      noPagination: true,
    },
  });

  let select = getByRole("combobox");
  await fireEvent.click(select)
  expect(getAllByRole("option").length).toBe(8)
});

test("closes menu after selecting option in single mode", async () => {
  const { getByRole, getAllByRole, queryByRole } = render(Select, {
    props: {
      items: states,
    },
  });

  let select = getByRole("combobox");
  await fireEvent.click(select)
  let option = getAllByRole("option")
  await fireEvent.click(option[0])
  expect(queryByRole("listbox")).toBeNull()
});

test("does no close menu after selecting option in multi value mode", async () => {
  const { getByRole, getAllByRole, queryByRole } = render(Select, {
    props: {
      items: states,
    },
  });

  let select = getByRole("combobox");
  await fireEvent.click(select)
  let option = getAllByRole("option")
  await fireEvent.click(option[0])
  queryByRole("listbox")
});

test("selects item in single mode", async () => {
  const { getByRole, getAllByRole, queryByText } = render(Select, {
    props: {
      items: states,
    },
  });

  let select = getByRole("combobox");
  await fireEvent.click(select)
  let option = getAllByRole("option")
  await fireEvent.click(option[0])
  queryByText("Alabama")
});

test("shows no items message", async () => {
  const { getByRole, getByText } = render(Select, {
    props: {
      emptyDataMessage: "empty"
    },
  });

  let select = getByRole("combobox");
  await fireEvent.click(select)
  getByText("empty")
});

test("opens autocomplete on items update", async () => {
  const { getByRole, findByRole, rerender } = render(Select, {
    props: {
      items: [],
      noFilter: true,
      autocomplete: true,
    },
  });

  let select = getByRole("combobox");
  await fireEvent.click(select)
  let input = select.querySelector("input")
  await fireEvent.update(input, "a")
  await rerender({
    items: states,
  })
  await findByRole("listbox")

});

// click outside