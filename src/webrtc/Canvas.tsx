
import React, { useRef } from 'react';

const constraints: MediaStreamConstraints = {
	audio: false,
	video: true
}

const Canvas:React.FC = ()=>{
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	
	const openCamera = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia(constraints);
			console.log('開啟攝像頭成功。');
			handleSuccess(stream);
		} catch (e) {
			console.log('開啟攝像頭失敗。');
			handleError(e);
		}
	}
	
	const takSnap = async () =>{
		if (!videoRef.current || !canvasRef.current) return;
		const video = videoRef.current;
		const canvas = canvasRef.current;

		// set canvas pixel size to video size
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;

		const ctx = canvas.getContext('2d');
		if (ctx) {
			ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
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
	
	const handleError = (error: any) => {
		if (error && error.name === 'ConstraintNotSatisfiedError') {
			console.log('設備不支援所要求的解析度。');
		} else if (error && (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError')) {
			console.log('無視訊鏡頭與麥克風的使用權限，請執行允許使用權限設定。');
		} else {
			console.log('getUserMedia錯誤。', error);
		}
	}
	
	return (
		<div className=" flex flex-col items-center justify-center p-10 bg-gray-100 rounded-xl ">
			<video className="video bg-gray-500 rounded-xl " ref={videoRef} autoPlay playsInline></video>
			<canvas className="bg-gray-500 rounded-xl mt-2 " ref={canvasRef}></canvas>
            <div className="  m-2 p-2 bg-gray-600 text-white rounded-xl w-48 text-center cursor-pointer hover:scale-105 " onClick={openCamera}>開啟視訊鏡頭</div>
			<div className="  m-2 p-2 bg-gray-600 text-white rounded-xl w-48 text-center cursor-pointer hover:scale-105 " onClick={takSnap}>截圖</div>
		</div>
	)
}

export default Canvas;