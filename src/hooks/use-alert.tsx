import { useContext } from 'react';
import AlertContext from "../contexts/alert-context.tsx";

const useAlert = () => useContext(AlertContext);

export default useAlert;