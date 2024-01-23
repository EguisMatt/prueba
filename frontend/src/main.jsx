import ReactDOM from 'react-dom/client'
import MainRoute from './components/index.jsx'
import { BrowserRouter } from 'react-router-dom'
import "./index.css"
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MainRoute/>
  </BrowserRouter>,
)
