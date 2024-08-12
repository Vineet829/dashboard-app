import React, { useState, useMemo } from 'react';
import styles from './DataTable.module.css';

interface DataTableProps {
  data: {
    headers: string[];
    rows: string[][];
  };
  caption?: string;
  className?: string;
}

const DataTable: React.FC<DataTableProps> = ({ data, caption, className }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null);

  const sortedData = useMemo(() => {
    const sortableData = [...data.rows];

    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        const aIndex = data.headers.indexOf(sortConfig.key);
        const bIndex = data.headers.indexOf(sortConfig.key);

        if (a[aIndex] < b[bIndex]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[aIndex] > b[bIndex]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableData;
  }, [data.rows, data.headers, sortConfig]);

  const requestSort = (header: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';

    if (sortConfig && sortConfig.key === header && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    setSortConfig({ key: header, direction });
  };

  return (
    <div className={`${styles['data-table-container']} ${className}`}>
      <table className={styles['data-table']}>
        {caption && <caption className={styles['data-table-caption']}>{caption}</caption>}
        <thead>
          <tr>
            {data.headers.map((header, index) => (
              <th
                key={index}
                scope="col"
                aria-label={header}
                className={styles['data-table-header']}
                onClick={() => requestSort(header)}
              >
                {header}
                {sortConfig && sortConfig.key === header && (
                  <span className={styles['sort-icon']}>
                    {sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} role="cell" className={styles['data-table-cell']}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
