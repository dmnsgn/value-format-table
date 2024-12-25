# value-format-table

[![npm version](https://img.shields.io/npm/v/value-format-table)](https://www.npmjs.com/package/value-format-table)
[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://www.npmjs.com/package/value-format-table)
[![npm minzipped size](https://img.shields.io/bundlephobia/minzip/value-format-table)](https://bundlephobia.com/package/value-format-table)
[![dependencies](https://img.shields.io/librariesio/release/npm/value-format-table)](https://github.com/dmnsgn/value-format-table/blob/main/package.json)
[![types](https://img.shields.io/npm/types/value-format-table)](https://github.com/microsoft/TypeScript)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-fa6673.svg)](https://conventionalcommits.org)
[![styled with prettier](https://img.shields.io/badge/styled_with-Prettier-f8bc45.svg?logo=prettier)](https://github.com/prettier/prettier)
[![linted with eslint](https://img.shields.io/badge/linted_with-ES_Lint-4B32C3.svg?logo=eslint)](https://github.com/eslint/eslint)
[![license](https://img.shields.io/github/license/dmnsgn/value-format-table)](https://github.com/dmnsgn/value-format-table/blob/main/LICENSE.md)

Format an array of objects as text, Markdown, HTML, and more.

[![paypal](https://img.shields.io/badge/donate-paypal-informational?logo=paypal)](https://paypal.me/dmnsgn)
[![coinbase](https://img.shields.io/badge/donate-coinbase-informational?logo=coinbase)](https://commerce.coinbase.com/checkout/56cbdf28-e323-48d8-9c98-7019e72c97f3)
[![twitter](https://img.shields.io/twitter/follow/dmnsgn?style=social)](https://twitter.com/dmnsgn)

![](https://raw.githubusercontent.com/dmnsgn/value-format-table/main/screenshot.png)

## Installation

```bash
npm install value-format-table
```

## Usage

```js
import {
  valueFormatTableAsHTML,
  valueFormatTableAsMarkdown,
} from "value-format-table";

const data = [
  {
    // ...
  },
  {
    // ...
  },
  {
    // ...
  },
];

const formatHeader = (header) => header.toUpperCase();

const htmlTable = valueFormatTableAsHTML(data, {
  formatHeader,
  columns: [{ formatCell: toLink }, { formatCell: toLink }],
});
element.innerHTML = htmlTable;

const textTable = valueFormatTableAsMarkdown(data, {
  formatHeader,
  columns: [{ align: "right" }, { align: "right" }],
});
console.log(textTable);
```

## API

<!-- api-start -->

Auto-generated API content.

<!-- api-end -->

## License

MIT. See [license file](https://github.com/dmnsgn/value-format-table/blob/main/LICENSE.md).