import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Store from "./store/store.ts";
import App from "./App.tsx";

interface State {
  store: Store,
}

const store = new Store();

export const Context = createContext<State>({
  store,
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Context.Provider value={{store}}>
      <App />
    </Context.Provider>
  </React.StrictMode>,
)
