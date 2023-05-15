
/* ========== Video background on landing page ========== */
export function displayVideo(){
	const waterVideo = document.createElement('video');
	waterVideo.src = 'data/videos/water.mp4';
	waterVideo.muted = true;
	waterVideo.loop = true;
	waterVideo.autoplay = true;
	waterVideo.setAttribute('id', 'videoBackground');
	document.querySelector('#homeMainScreen').appendChild(waterVideo);
}