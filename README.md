# XML Parser/Stringifier

[![JSR Badge](https://jsr.io/badges/@fbik/xml)](https://jsr.io/@fbik/xml)

A minimalistic XML/HTML parser/stringifier. Fork from
[jsr:@melvdouc/xml-parser](https://jsr.io/@melvdouc/xml-parser)

It:

- breaks an input down into tag and text nodes,
- parses attributes,
- checks if all tags are closed,
- let tag and text nodes back to string.

Orphan (self-closing) tags are allowed.

## Usage

The XML string below

```xml
<?xml version="1.0" encoding="UTF-8"?>

<shopping-list>
  <item>eggs</item>
  <!-- <item>steaks</item> -->
  <item urgent="">shampoo</item>
  <item />
</shopping-list>
```

will output the following:

```javascript
[
  {
    kind: "ORPHAN_TAG_NODE",
    tagName: "xml",
    isDeclaration: true,
    attributes: { version: "1.0", encoding: "UTF-8" },
  },
  {
    kind: "REGULAR_TAG_NODE",
    tagName: "shopping-list",
    children: [
      {
        kind: "REGULAR_TAG_NODE",
        tagName: "item",
        children: [{ kind: "TEXT_NODE", value: "eggs" }],
      },
      { kind: "COMMENT_NODE", value: " <item>steaks</item> " },
      {
        kind: "REGULAR_TAG_NODE",
        tagName: "item",
        children: [{ kind: "TEXT_NODE", value: "shampoo" }],
        attributes: { urgent: "" },
      },
      {
        kind: "ORPHAN_TAG_NODE",
        tagName: "item",
        isDeclaration: false,
      },
    ],
  },
];
```
