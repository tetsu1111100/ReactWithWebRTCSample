
import './App.css'

import Camera from './webrtc/Camera'

function App() {  

  return (
    <div className=" bg-black h-screen w-screen">
      <div className="flex flex-col items-center justify-center bg-gray-900">
        <Camera />  
      </div>    
    </div>
  )
}

export default App
