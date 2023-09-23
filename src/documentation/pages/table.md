#### Definition {#Definition}

Table definition is an optional `array` of `objects` that defines columns of the table. Each object represents one column, has one required, unique `key` property and number of optional properties.

If definition is not provided component makes one using first record of data. All additional properties are set to default values. This may be enough for simple tables however to use features like sorting, filtering etc you need to provide definition array.

Example of definition array:

```javascript
let definition: ref([
  {
    key: "id",
    visible: false,
  },
  {
    key: "first_name",
    sortable: true,
  },
  {
    key: "last_name",
    sortable: true,
  },
  {
    key: "email",
    sortable: true,
  },
  {
    key: "city",
    sortable: true,
  },
  {
    key: "country",
    sortable: true,
    class: (k, v) => (v == "ID" ? "bg-red-50" : ""),
  },
  {
    key: "edit",
  },
])
```

  <!--  <p>Each column is defined by object with following properties:</p>
    <table-reference
      :items="referenceProp"
      :definition="referencePropDefinition"
      :filterable="false"
    />
    --->

#### Example - simple table {#ExampleTableSimple}

<div class="example">
  <example
    name="ExampleTableSimple"
    auto-show-code
  ></example>
</div>

#### Example - props and events {#ExampleTable}

<div class="example">
  <example name="ExampleTable"></example>
</div>

#### Example - colspan item property {#ExampleTableColspan}

Item can have special property `colspan: {}`. Properties of this object are rendered as full row below item. To render them use `colspan` slot.

<div class="example">
  <example name="ExampleTableColspan"></example>
</div>