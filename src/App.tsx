import './App.css'

import { ImageMapDemo } from './components/ImageMapDemo'
import { OpenMapDemo } from './components/OpenMapDemo'

function App() {
  return (
    <div >
      <h1>Leaflet demo</h1>
      <h2>Normal map</h2>
      <OpenMapDemo />
      <hr />
      <h2>Image map</h2>
      <ImageMapDemo />
    </div>
  )
}

export default App
