import React from 'react'
import { render } from 'react-dom'
import App from './App'
import data from './data.json'

render(<App data={data} />, document.getElementById('app'))
