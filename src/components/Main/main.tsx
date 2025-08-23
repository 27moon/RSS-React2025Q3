import { useState } from 'react';
import { Modal } from '../Modal/modal';
import { UncontrolledForm } from '../UncontrolledForm/uncontrolledForm';
import { ReactHookForm } from '../ReactHookForm/reactHookForm';

type FormType = 'controlled' | 'uncontrolled' | null;

export function Main() {
  const [typeActive, setTypeActive] = useState<FormType>(null);

  const closeModal = () => {
    setTypeActive(null);
  };

  return (
    <div>
      <button onClick={() => setTypeActive('uncontrolled')}>
        Uncontrolled Form
      </button>
      <button onClick={() => setTypeActive('controlled')}>
        React Hook Form
      </button>
      {typeActive !== null && (
        <Modal close={closeModal}>
          {typeActive === 'uncontrolled' ? (
            <UncontrolledForm />
          ) : (
            <ReactHookForm />
          )}
        </Modal>
      )}
    </div>
  );
}
