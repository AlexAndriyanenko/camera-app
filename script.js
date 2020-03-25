document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const mainConstraints = {
		audio: false,
        video: {
            facingMode: { exact: 'environment' },
        },
    };

    const video = document.getElementById('video');
	const canvas = document.getElementById('canvas');
	const image = document.querySelector('.image-overlay');
    
	const button = document.getElementById('capture-btn');
    button.onclick = function() {
		const ctx = canvas.getContext('2d');

		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;

		const imageW = 100;
		const imageH = 100;
		const imagePosX = canvas.width / 2 - imageW / 2;
		const imagePosY = canvas.height / 2 - imageH / 2;

    	
		
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
		ctx.drawImage(image, imagePosX, imagePosY, imageW, imageH);
	};
	

	const getMedia = (constraints) => {
		navigator.mediaDevices.getUserMedia(constraints)
    	.then((stream) => {
        	video.srcObject = stream;
		})
		.catch((error) => {
			if (error.name === 'OverconstrainedError') {
				const localConstraints = {
					audio: false,
					video: {
						facingMode: 'user',
					},
				};

				getMedia(localConstraints);
			}
		});
	};
   
	
	getMedia(mainConstraints);
});