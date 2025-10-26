
import React, { useRef } from 'react';

const constraints: MediaStreamConstraints = {
	audio: true,
	video: false
}

const Microphone:React.FC = ()=>{
	const audioRef = useRef<HTMLAudioElement | null>(null);

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
	}
	
	const handleError = (error: any)=>{
		console.log('取得麥克風錯誤。',error.message, error.name)
	}
	
	return (
		<div className=" flex flex-col items-center justify-center p-10 bg-gray-400 rounded-xl ">
			<audio className="audio  " ref={audioRef} controls autoPlay></audio>
			<div className="  m-2 p-2 bg-gray-100 text-gray-600 rounded-xl w-48 text-center cursor-pointer hover:scale-105 " onClick={openMicrophone}>開啟麥克風</div>
		</div>
	)
}

export default Microphone;

