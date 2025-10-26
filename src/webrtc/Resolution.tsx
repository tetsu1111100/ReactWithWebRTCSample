
import React, { useRef } from 'react';

/*
const constraints: MediaStreamConstraints = {
	audio: false,
	video: true
}
*/

const qvgaConstraints={
    video:{ 
        width:{exact:320}, 
        height:{exact:240} 
    }
};

const vgaConstraints={
    video:{ 
        width:{exact:640}, 
        height:{exact:480} 
    }
};

const hdConstraints={
    video:{ 
        width:{exact:1280}, 
        height:{exact:720} 
    }
};

const fullHdConstraints={
    video:{ 
        width:{exact:1920}, 
        height:{exact:1080} 
    }
};

const twoKConstraints={
    video:{ 
        width:{exact:2560}, 
        height:{exact:1440} 
    }
};

const fourKConstraints={
    video:{ 
        width:{exact:4096}, 
        height:{exact:2160} 
    }
};

const eightKConstraints={
    video:{ 
        width:{exact:7680}, 
        height:{exact:4320} 
    }
};


let stream: MediaStream | null = null;

const Resolution:React.FC = ()=>{
	const videoRef = useRef<HTMLVideoElement>(null);

    const getMedia = (constraints: MediaStreamConstraints): void => {
        if (stream) {
            stream.getTracks().forEach((track: MediaStreamTrack) => {
                track.stop();
            });
        }

        navigator.mediaDevices.getUserMedia(constraints)
            .then(gotStream)
            .catch((e: unknown) => console.log(e));
    }
	
	const gotStream = (mediaStream: MediaStream) => {
		// store the received stream in the module-level variable so other functions can access it
		stream = mediaStream;

		const videoTracks = mediaStream.getVideoTracks();
		console.log('你現在使用的設備是:' + (videoTracks[0] && videoTracks[0].label));

		// attach to window only via a cast to avoid TS error, or remove if not needed
		(window as any).stream = stream;

		if (videoRef.current) {
			videoRef.current.srcObject = stream;
		}
	}

	const handleChange = (value: string) =>{
		switch (value) {
			case 'qvga':
				getMedia(qvgaConstraints);
				break;
			case 'vga':
				getMedia(vgaConstraints);
				break;
			case 'hd':
				getMedia(hdConstraints);
				break;
			case 'fullhd':
				getMedia(fullHdConstraints);
				break;
			case '2k':
				getMedia(twoKConstraints);
				break;
			case '4k':
				getMedia(fourKConstraints);
				break;
			case '8k':
				getMedia(eightKConstraints);
				break;
			default:
				getMedia(vgaConstraints);
				break;
		}
	}
				
	return (
		<div className=" flex flex-col items-center justify-center p-10 bg-gray-100 rounded-xl ">
			<video className="video bg-gray-500 rounded-xl" ref={videoRef} autoPlay playsInline></video>
			<div>
                <button className=" m-2 p-2 bg-gray-600 text-white rounded-xl w-24 text-center cursor-pointer hover:scale-105 " onClick={()=>handleChange('qvga')}>320x240</button>
                <button className=" m-2 p-2 bg-gray-600 text-white rounded-xl w-24 text-center cursor-pointer hover:scale-105 " onClick={()=>handleChange('vga')}>640x480</button>
                <button className=" m-2 p-2 bg-gray-600 text-white rounded-xl w-24 text-center cursor-pointer hover:scale-105 " onClick={()=>handleChange('hd')}>1280x720</button>
                <button className=" m-2 p-2 bg-gray-600 text-white rounded-xl w-24 text-center cursor-pointer hover:scale-105 " onClick={()=>handleChange('fullhd')}>1920x1080</button>
                <button className=" m-2 p-2 bg-gray-600 text-white rounded-xl w-24 text-center cursor-pointer hover:scale-105 " onClick={()=>handleChange('2k')}>2560x1440</button>
                <button className=" m-2 p-2 bg-gray-600 text-white rounded-xl w-24 text-center cursor-pointer hover:scale-105 " onClick={()=>handleChange('4k')}>4096x2160</button>
                <button className=" m-2 p-2 bg-gray-600 text-white rounded-xl w-24 text-center cursor-pointer hover:scale-105 " onClick={()=>handleChange('8k')}>7680x4320</button>
            </div>
		</div>
	)
}

export default Resolution;