
import './App.css'

import Camera from './webrtc/Camera'
import Microphone from './webrtc/Microphone'
import Canvas from './webrtc/Canvas'
import ScreenSharing from './webrtc/ScreenShare'
import Resolution from './webrtc/Resolution'


function App() {  

  return (
    <div className=" bg-black h-screen w-screen">
      <div className="flex flex-col items-center justify-center bg-gray-900 gap-4">
        <Camera />  
        <Microphone />
        <Canvas />
        <ScreenSharing />
        <Resolution />
      </div>    
    </div>
  )
}

export default App
