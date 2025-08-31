import type { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import './modal.css';

type ModalProps = {
  children: ReactNode;
  close: () => void;
};

export function Modal({ children, close }: ModalProps) {
  return ReactDOM.createPortal(
    <div className="modal-wrapper" onClick={close}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}
