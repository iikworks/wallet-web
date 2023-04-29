import {createContext, ReactNode, useState} from 'react';

const ALERT_TIME = 5000;
const initialState: {
  text: string;
  type: 'success'|'error';
} = {
  text: '',
  type: 'success',
};

const AlertContext = createContext({
  ...initialState,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment
  // @ts-ignore
  setAlert: (text: string, type: 'success'|'error') => { return }
});

type AlertProviderProps = {
  children: ReactNode;
};

export const AlertProvider = (props: AlertProviderProps) => {
  const [text, setText] = useState('');
  const [type, setType] = useState<'success'|'error'>('success');

  const setAlert = (text: string, type: 'success'|'error') => {
    setText(text);
    setType(type);

    setTimeout(() => {
      setText('');
      setType('success');
    }, ALERT_TIME);
  };

  return (
    <AlertContext.Provider
      value={{
        text,
        type,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertContext;