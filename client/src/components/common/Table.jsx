import React from 'react';

export const Table = ({
  columns = [],
  data = [],
  keyField = 'id',
  emptyMessage = 'No records available in this register.',
  className = '',
  caption
}) => {
  return (
    <div className={`portal-table-container ${className}`.trim()}>
      <table className="portal-table">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={col.key || index}
                style={{
                  width: col.width,
                  textAlign: col.align || 'left'
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--color-text-muted)' }}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={row[keyField] || rowIndex}>
                {columns.map((col, colIndex) => (
                  <td
                    key={col.key || colIndex}
                    style={{ textAlign: col.align || 'left' }}
                  >
                    {col.render ? col.render(row[col.key], row, rowIndex) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

