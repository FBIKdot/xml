import { assert, assertEquals, assertThrows } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import stringify from "$/stringify.ts";
import parse from "$/parse.ts";

describe("stringify test", () => {
  const input = `<?xml version="1.0" encoding="UTF-8"?>

<shopping-list>
  <item>eggs</item>
  <!-- <item>steaks</item> -->
  <item urgent="">shampoo</item>
  <item />
  <h1>
    <div1 />
    <h2>
      <div2 />
    </h2>
  </h1>
</shopping-list>`;
  const des = parse(input);
  it("#1", () => {
    assertEquals(
      stringify(des),
      `<?xml version="1.0" encoding="UTF-8"?><shopping-list><item>eggs</item><!-- <item>steaks</item> --><item urgent="">shampoo</item><item /><h1><div1 /><h2><div2 /></h2></h1></shopping-list>`,
    );
  });
  it("#2", () => {
    assertEquals(
      stringify(des, { mode: "space" }),
      `<?xml version="1.0" encoding="UTF-8"?> <shopping-list> <item> eggs </item> <!-- <item>steaks</item> --> <item urgent=""> shampoo </item> <item /> <h1> <div1 /> <h2> <div2 /> </h2> </h1> </shopping-list>`,
    );
  });
  it("#3", () => {
    assertEquals(
      stringify(des, { mode: "indent" }),
      `<?xml version="1.0" encoding="UTF-8"?>
<shopping-list>
  <item>eggs</item>
  <!-- <item>steaks</item> -->
  <item urgent="">shampoo</item>
  <item />
  <h1>
    <div1 />
    <h2>
      <div2 />
    </h2>
  </h1>
</shopping-list>`,
    );
    assertEquals(
      stringify(des, { mode: "indent", indentWidth: 4 }),
      `<?xml version="1.0" encoding="UTF-8"?>
<shopping-list>
    <item>eggs</item>
    <!-- <item>steaks</item> -->
    <item urgent="">shampoo</item>
    <item />
    <h1>
        <div1 />
        <h2>
            <div2 />
        </h2>
    </h1>
</shopping-list>`,
    );
  });
});
