import { Modal } from '../Modal/modal';
import './columnsPicker.css';

type ColumnModalProps = {
  extraColumns: string[];
  selectedColumns: string[];
  toggleColumn: (col: string) => void;
  close: () => void;
};

export function ColumnsPicker({
  extraColumns,
  selectedColumns,
  toggleColumn,
  close,
}: ColumnModalProps) {
  return (
    <Modal close={close}>
      <h3>Select additional columns:</h3>
      <div className="modal-columns">
        {extraColumns.map((column) => (
          <label key={column} style={{ display: 'block' }}>
            <input
              type="checkbox"
              checked={selectedColumns.includes(column)}
              onChange={() => toggleColumn(column)}
            />{' '}
            {column}
          </label>
        ))}
      </div>
      <button onClick={close}>Close</button>
    </Modal>
  );
}
