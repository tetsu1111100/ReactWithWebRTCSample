
import React, { useRef } from 'react';

const ScreenSharing:React.FC = ()=>{
	const videoRef = useRef<HTMLVideoElement | null>(null);


	const startScreenShare = async () =>{
		try{
			const stream = await navigator.mediaDevices.getDisplayMedia({video:true});
			console.log('分享螢幕成功。')
			handleSuccess(stream);
		}
		catch(e){
			console.log('分享螢幕失敗。')
			handleError(e);
		}
	}
	
	const handleSuccess = (stream: MediaStream) => {
		const videoTracks = stream.getVideoTracks();
		console.log('你現在使用的設備是:' + (videoTracks[0] && videoTracks[0].label));

		// attach to window only via a cast to avoid TS error, or remove if not needed
		(window as any).stream = stream;

		if (videoRef.current) {
			videoRef.current.srcObject = stream;
		}
	}
	
	const handleError = (error: any)=>{
		console.log('getUserMedia錯誤。', error);
	}
	
	return (
		<div className=" flex flex-col items-center justify-center p-10 bg-gray-100 rounded-xl ">
			<video className="video bg-gray-500 rounded-xl" ref={videoRef} autoPlay playsInline></video>
			<div className="  m-2 p-2 bg-gray-600 text-white rounded-xl w-48 text-center cursor-pointer hover:scale-105 " onClick={startScreenShare}>分享螢幕</div>
		</div>
	)
}

export default ScreenSharing;