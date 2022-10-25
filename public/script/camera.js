const CameraAPI = {};

CameraAPI.getCamera = async () => {
	console.log("Getting Camera");
	if (hasGetUserMedia()) {
		return await navigator.mediaDevices.getUserMedia({video: true});
	} else {
	    alert('getUserMedia() is not supported in your browser, please use Chrome');
	}
};

CameraAPI.invertColours = (stream) => {
	console.log("Inverting Colours");
	
	const video = document.createElement('video');
	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d");

    video.srcObject = stream;

    const drawFrame = (video) => {
      context.drawImage(video, 0, 0);
      
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      invertColors(imageData.data);
      context.putImageData(imageData, 0, 0);
      
      setTimeout(function () {
        drawFrame(video);
      }, 10);
    }

    const invertColors = (data) => {
      for (let i = 0; i < data.length; i+= 4) {
        data[i] = data[i] ^ 255;
        data[i+1] = data[i+1] ^ 255;
        data[i+2] = data[i+2] ^ 255;
      }
    }

    const readyToPlay = () => {
    	canvas.width = video.videoWidth;
    	canvas.height = video.videoHeight;

		video.play();
		drawFrame(video);
    }

    if(video.readyState >=3) {
    	readyToPlay();
      } else {
        video.addEventListener('canplay', readyToPlay);
      }

	return canvas.captureStream();
}

CameraAPI.setStreamToElement = (element, stream) => {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();
    element.appendChild(video);
}

const hasGetUserMedia =() => {
    return !!(navigator.mediaDevices) && !!(navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia ||
            navigator.mediaDevices.mozGetUserMedia || navigator.mediaDevices.msGetUserMedia);
}
