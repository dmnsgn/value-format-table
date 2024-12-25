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

## Functions

<dl>
<dt><a href="#valueFormatTable">valueFormatTable(array, [options])</a> ⇒ <code>string</code></dt>
<dd><p>Format an array of objects</p>
</dd>
<dt><a href="#valueFormatTableAsText">valueFormatTableAsText(array, [options])</a> ⇒ <code>string</code></dt>
<dd><p>Format an array of objects as text</p>
</dd>
<dt><a href="#valueFormatTableAsMarkdown">valueFormatTableAsMarkdown(array, [options])</a> ⇒ <code>string</code></dt>
<dd><p>Format an array of objects as Markdown</p>
</dd>
<dt><a href="#valueFormatTableAsHTML">valueFormatTableAsHTML(array, [options])</a> ⇒ <code>string</code></dt>
<dd><p>Format an array of objects as HTML</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ColumnOptions">ColumnOptions</a> : <code>object</code></dt>
<dd><p>Options for columns.</p>
</dd>
<dt><a href="#ValueFormatTableOptions">ValueFormatTableOptions</a> : <code>object</code></dt>
<dd><p>Options for table creation. All optional.</p>
</dd>
</dl>

<a name="valueFormatTable"></a>

## valueFormatTable(array, [options]) ⇒ <code>string</code>

Format an array of objects

**Kind**: global function

| Param     | Type                                                             |
| --------- | ---------------------------------------------------------------- |
| array     | <code>Array.&lt;object&gt;</code>                                |
| [options] | [<code>ValueFormatTableOptions</code>](#ValueFormatTableOptions) |

<a name="valueFormatTableAsText"></a>

## valueFormatTableAsText(array, [options]) ⇒ <code>string</code>

Format an array of objects as text

**Kind**: global function

| Param     | Type                                                             |
| --------- | ---------------------------------------------------------------- |
| array     | <code>Array.&lt;object&gt;</code>                                |
| [options] | [<code>ValueFormatTableOptions</code>](#ValueFormatTableOptions) |

<a name="valueFormatTableAsMarkdown"></a>

## valueFormatTableAsMarkdown(array, [options]) ⇒ <code>string</code>

Format an array of objects as Markdown

**Kind**: global function

| Param     | Type                                                             |
| --------- | ---------------------------------------------------------------- |
| array     | <code>Array.&lt;object&gt;</code>                                |
| [options] | [<code>ValueFormatTableOptions</code>](#ValueFormatTableOptions) |

<a name="valueFormatTableAsHTML"></a>

## valueFormatTableAsHTML(array, [options]) ⇒ <code>string</code>

Format an array of objects as HTML

**Kind**: global function

| Param     | Type                                                             |
| --------- | ---------------------------------------------------------------- |
| array     | <code>Array.&lt;object&gt;</code>                                |
| [options] | [<code>ValueFormatTableOptions</code>](#ValueFormatTableOptions) |

<a name="ColumnOptions"></a>

## ColumnOptions : <code>object</code>

Options for columns.

**Kind**: global typedef
**Properties**

| Name           | Type                  | Default                                     |
| -------------- | --------------------- | ------------------------------------------- |
| [align]        | <code>string</code>   | <code>&quot;\&quot;left\&quot;&quot;</code> |
| [formatCell]   | <code>function</code> |                                             |
| [formatHeader] | <code>function</code> |                                             |

<a name="ValueFormatTableOptions"></a>

## ValueFormatTableOptions : <code>object</code>

Options for table creation. All optional.

**Kind**: global typedef
**Properties**

| Name             | Type                                                       | Default                                  | Description                                                        |
| ---------------- | ---------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------ |
| [columns]        | [<code>Array.&lt;ColumnOptions&gt;</code>](#ColumnOptions) | <code>[]</code>                          | Options for each column.                                           |
| [wrappings]      | <code>object</code>                                        | <code>{}</code>                          | Wrappings string for each cells in the form [start, end, lastEnd]. |
| [dividers]       | <code>object</code>                                        | <code>{}</code>                          | Dividers for top, middle and bottom of the table.                  |
| [minCellSize]    | <code>number</code>                                        | <code>1</code>                           | Minimum cell size.                                                 |
| [dividerPadding] | <code>string</code>                                        | <code>&quot;\&quot; \&quot;&quot;</code> | Which string to add around dividers cells.                         |
| [headers]        | <code>string</code>                                        | <code>&quot;\&quot; \&quot;&quot;</code> | Filter specific keys.                                              |
| [formatHeader]   | <code>function</code>                                      |                                          |                                                                    |
| [formatDivider]  | <code>function</code>                                      |                                          |                                                                    |

<!-- api-end -->

## License

MIT. See [license file](https://github.com/dmnsgn/value-format-table/blob/main/LICENSE.md).
