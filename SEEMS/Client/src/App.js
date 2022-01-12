import { Link, Typography } from '@mui/material'

import './App.css'
import { Counter } from './features/counter/Counter'
import logo from './logo.svg'

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Counter />
                <Typography variant="h5" py={2}>
                    Edit <code>src/App.js</code> and save to reload.
                </Typography>
                <span>
                    <span>Learn </span>
                    <Link
                        variant="h5"
                        color="secondary"
                        className="App-link"
                        href="https://reactjs.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        React
                    </Link>
                    <span>, </span>
                    <Link
                        variant="h5"
                        color="secondary"
                        className="App-link"
                        href="https://redux.js.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Redux
                    </Link>
                    <span>, </span>
                    <Link
                        variant="h5"
                        color="secondary"
                        className="App-link"
                        href="https://redux-toolkit.js.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Redux Toolkit
                    </Link>
                    ,<span> and </span>
                    <Link
                        variant="h5"
                        color="secondary"
                        className="App-link"
                        href="https://react-redux.js.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        React Redux
                    </Link>
                </span>
            </header>
        </div>
    )
}

export default App
