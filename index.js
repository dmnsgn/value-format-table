const wrapString = (value, [start = "", end = ""] = []) =>
  `${start}${value}${end}`;

/**
 * @typedef {object} ColumnOptions Options for columns.
 * @property {string} [align="left"]
 * @property {Function} [formatCell]
 * @property {Function} [formatHeader]
 */

/**
 * @typedef {object} ValueFormatTableOptions Options for table creation. All optional.
 * @property {ColumnOptions[]} [columns=[]] Options for each column.
 * @property {object} [wrappings={}] Wrappings string for each cells in the form [start, end, lastEnd].
 * @property {object} [dividers={}] Dividers for top, middle and bottom of the table.
 * @property {number} [minCellSize=1] Minimum cell size.
 * @property {string} [dividerPadding=" "] Which string to add around dividers cells.
 * @property {string} [headers=" "] Filter specific keys.
 * @property {Function} [formatHeader]
 * @property {Function} [formatDivider]
 */

/**
 * Format an array of objects
 * @param {object[]} array
 * @param {ValueFormatTableOptions} [options]
 * @returns {string}
 */
const valueFormatTable = (
  array,
  {
    columns = [],
    wrappings = {},
    dividers = {},
    minCellSize = 1,
    dividerPadding = " ",
    headers = Array.from(new Set(array.flatMap((o) => Object.keys(o)))),
    formatHeader,
    formatDivider,
  } = {},
) => {
  const getCellContent = (str, column) =>
    columns[column]?.formatCell?.(str, columns[column], column) || String(str);

  // Precompute sizes
  const formattedHeaders = headers.map(
    (key, column) =>
      columns[column]?.formatHeader?.(key, columns[column], column) ||
      formatHeader?.(key, columns[column], column) ||
      key,
  );

  const columnSizes = headers.map((header, column) =>
    Math.max(
      formattedHeaders[column].length,
      minCellSize,
      ...array.map((obj) => getCellContent(obj[header], column).length),
    ),
  );

  // Table
  const row = (cells, wrapping = wrappings["row"]) =>
    wrapString(cells.join(""), wrapping);

  const formatCellContent = (str, column) => {
    if (!dividerPadding) return str;

    return str[`pad${columns[column]?.align === "right" ? "Start" : "End"}`](
      columnSizes[column],
    );
  };

  const cell = (str, column, wrapping = wrappings["cell"]) =>
    wrapString(
      formatCellContent(str, column),
      column === headers.length - 1
        ? [wrapping[0], wrapping[2] ?? wrapping[1]]
        : wrapping,
    );

  let divider = () => "";
  if (dividers.divider?.length) {
    const getDividerContent = (str, column) =>
      columns[column]?.formatDivider?.(str, columns[column], column) ||
      formatDivider?.(str, columns[column], column) ||
      str;

    const dividersCells = columnSizes.map((size, column) => {
      if (!dividerPadding) {
        return getDividerContent(
          `${dividerPadding}${dividers.divider.join("")}${dividerPadding}`,
          column,
        );
      }

      const [start, mid, end = start] = dividers.divider;
      return getDividerContent(
        `${start}${"".padStart(size + 2 * dividerPadding.length - start.length - end.length, mid)}${end}`,
        column,
      );
    });
    divider = (rowWrapping, wrapping) =>
      rowWrapping || wrapping
        ? row(
            dividersCells.map((key, column) => cell(key, column, wrapping)),
            rowWrapping,
          )
        : "";
  }

  // Content
  const header = row(
    formattedHeaders.map((formattedHeader, column) =>
      cell(formattedHeader, column, wrappings["header"]),
    ),
  );

  const body = array
    .map((obj) =>
      row(
        headers.map((key, column) =>
          cell(getCellContent(obj[key], column), column),
        ),
      ),
    )
    .join("\n");

  return wrapString(
    `${divider(dividers["rowDown"], dividers["down"])}
${wrapString(header, wrappings["head"])}
${divider(dividers["rowMiddle"], dividers["middle"])}
${wrapString(body, wrappings["body"])}
${divider(dividers["rowUp"], dividers["up"])}`,
    wrappings["table"],
  );
};

const chars = {
  horizontal: "─",
  vertical: "│",
  down: { left: "┐", middle: "┬", right: "┌" },
  middle: { left: "┤", middle: "┼", right: "├" },
  up: { left: "┘", middle: "┴", right: "└" },
};

/**
 * Format an array of objects as text
 * @param {object[]} array
 * @param {ValueFormatTableOptions} [options]
 * @returns {string}
 */
const valueFormatTableAsText = (array, options) =>
  valueFormatTable(array, {
    wrappings: {
      row: [`${chars.vertical} `, ` ${chars.vertical}`],
      header: ["", ` ${chars.vertical} `, ""],
      cell: ["", ` ${chars.vertical} `, ""],
    },
    dividers: {
      rowDown: [chars.down.right, chars.down.left],
      down: ["", chars.down.middle, ""],

      rowMiddle: [chars.middle.right, chars.middle.left],
      middle: ["", chars.middle.middle, ""],

      rowUp: [chars.up.right, chars.up.left],
      up: ["", chars.up.middle, ""],

      divider: ["", chars.horizontal, ""],
    },
    ...options,
  });

/**
 * Format an array of objects as Markdown
 * @param {object[]} array
 * @param {ValueFormatTableOptions} [options]
 * @returns {string}
 */
const valueFormatTableAsMarkdown = (array, options) =>
  valueFormatTable(array, {
    wrappings: {
      row: ["| ", " |", ""],
      header: ["", " | ", ""],
      cell: ["", " | ", ""],
    },
    dividers: {
      rowMiddle: ["|", "|"],
      middle: ["", "|", ""],

      divider: [" ", "-"],
    },
    minCellSize: 5,
    formatDivider(str, column) {
      if (column?.align === "left") return str.replace("-", ":");
      if (column?.align === "right") return str.replace(/-([^-]*)$/, ":$1");
      return str;
    },
    ...options,
  });

/**
 * Format an array of objects as HTML
 * @param {object[]} array
 * @param {ValueFormatTableOptions} [options]
 * @returns {string}
 */
const valueFormatTableAsHTML = (array, options) =>
  valueFormatTable(array, {
    wrappings: {
      table: [`<table>`, `</table>`],
      head: [`  <thead>\n`, `\n  </thead>`],
      body: [`  <tbody>\n`, `\n  </tbody>`],

      row: [`    <tr>\n`, `\n    </tr>`],
      header: [`      <th>`, `</th>\n`, `</th>`],
      cell: [`      <td>`, `</td>\n`, `</td>`],
    },
    dividerPadding: null,
    ...options,
  });

export {
  valueFormatTable,
  valueFormatTableAsText,
  valueFormatTableAsMarkdown,
  valueFormatTableAsHTML,
};
