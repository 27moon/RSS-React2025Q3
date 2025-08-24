import { useEffect, useRef, useState } from 'react';
import { Modal } from '../Modal/modal';
import { UncontrolledForm } from '../UncontrolledForm/uncontrolledForm';
import { ReactHookForm } from '../ReactHookForm/reactHookForm';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

type FormType = 'controlled' | 'uncontrolled' | null;

export function Main() {
  const [typeActive, setTypeActive] = useState<FormType>(null);
  const [highlight, setHighlight] = useState(false);
  const allData = useSelector((state: RootState) => state.formData.data);
  const prevLengthRef = useRef(allData.length);

  const closeModal = () => {
    setTypeActive(null);
  };

  useEffect(() => {
    if (allData.length > prevLengthRef.current) {
      setHighlight(true);
      const timer = setTimeout(() => setHighlight(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [allData]);

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
            <UncontrolledForm onClose={closeModal} />
          ) : (
            <ReactHookForm onClose={closeModal} />
          )}
        </Modal>
      )}

      <div style={{ marginTop: '2rem' }}>
        {allData.map((data, index) => {
          const isLast = index === allData.length - 1;
          return (
            <div
              key={index}
              style={{
                border: '1px solid black',
                padding: '1rem',
                marginBottom: '1rem',
                backgroundColor:
                  isLast && highlight ? 'cornflowerblue' : 'white',
                transition: 'background-color 0.5s',
              }}
            >
              <div>
                <strong>Name:</strong> {data.name}
              </div>
              <div>
                <strong>Email:</strong> {data.email}
              </div>
              <div>
                <strong>Age:</strong> {data.age}
              </div>
              <div>
                <strong>Password:</strong> {data.password}
              </div>
              <div>
                <strong>Gender:</strong> {data.gender}
              </div>
              <div>
                <strong>Country:</strong> {data.country}
              </div>
              <div>
                <strong>Terms Accepted:</strong> {data.terms ? 'Yes' : 'No'}
              </div>
              <div>
                <strong>Form Type:</strong> {data.formType}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
