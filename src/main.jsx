import { render } from "preact";
import "./index.scss";
import { BrowserRouter } from 'react-router-dom';
import { App } from "./app.jsx";
import {MoviesProvider} from "./context/moviesContext.js"


render(
 
    <MoviesProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </MoviesProvider>,
  document.getElementById("app")
);
