// this is the main file where the react app is rendered
// we are importing the react module and the react-dom module
// we are importing the StrictMode component from the react module
import { StrictMode } from 'react'
// we are importing the createRoot function from the react-dom/client module
import { createRoot } from 'react-dom/client'
// we are importing the index.css file
import './index.css'
import App from './App.jsx'
// we are importing the App component from the App.jsx file
// we are looking for the div element in the html file and rendering the react app in it
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
