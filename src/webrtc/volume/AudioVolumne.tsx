
import React, { useRef, useState } from 'react';
import SoundMeter from './soundmeter';

const constraints: MediaStreamConstraints = {
    audio: true,
    video: false
}

const AudioVolumne:React.FC = ()=>{
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [audioLevel, setAudioLevel] = useState<number>(0);

    const openMicrophone = async () =>{
        try{
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            console.log('開啟麥克風成功。')
            handleSuccess(stream);
        }
        catch(e){
            console.log('開啟麥克風失敗。')
            handleError(e);
        }
    }
    
    const handleSuccess = (stream: MediaStream)=>{
        const audioTracks = stream.getAudioTracks();		
        console.log('你現在使用的設備是:' + audioTracks[0].label);
        
        (window as any).stream = stream;

        if (audioRef.current) {
            audioRef.current.srcObject = stream;
        }


        //音量檢測
        try{
            window.AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            (window as any).audioContext = new AudioContext();
        }catch(e){
            console.log('瀏覽器不支援Web Audio API');
            return;
        }
        const soundMeter = (window as any).soundMeter = SoundMeter((window as any).audioContext);
        soundMeter.connectToSource(stream);
        soundMeterProcess();
    }
    
    const soundMeterProcess = ()=>{
        var val = ((window as any).soundMeter.instant.toFixed(2) * 348) + 1;
        setAudioLevel(val);
        setTimeout(() => {
            soundMeterProcess();
        }, 100);
    }

    const handleError = (error: any)=>{
        console.log('取得麥克風錯誤。',error.message, error.name)
    }
    
    return (
        <div className=" flex flex-col items-center justify-center p-10 bg-gray-400 rounded-xl ">
            <h1>音量檢測</h1>
            <div className=" m-2 p-1" style={{width:audioLevel + 'px', height: '50px', backgroundColor: 'gray'}}></div>
            <audio className="audio" ref={audioRef} controls autoPlay></audio>
            <div className="  m-2 p-2 bg-gray-100 text-gray-600 rounded-xl w-48 text-center cursor-pointer hover:scale-105 " onClick={openMicrophone}>開啟麥克風</div>
        </div>
    )
}

export default AudioVolumne;

