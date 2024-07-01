// const startButton = document.getElementById("startButton");
// const stopButton = document.getElementById("startPause");
// const video = document.getElementById("startVideo");
// const audio = document.getElementById("startAudio");
// const recordedVideo = document.getElementById("startAudioVideo");


let mediaRecorder;
let recordedChunks = [];

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const recordedVideo = document.getElementById('recordedVideo');

startButton.addEventListener('click', startRecording);
stopButton.addEventListener('click', stopRecording);

async function startRecording(){
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: 'screen' }
    });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = function(e) {
      recordedChunks.push(e.data);
    };

    mediaRecorder.onstop = function() {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      recordedVideo.src = URL.createObjectURL(blob);
      recordedVideo.controls = true;
    };

    mediaRecorder.start();
    startButton.disabled = true;
    stopButton.disabled = false;
  } catch(err) {
    console.error('Error: ' + err);
  }
}

function stopRecording() {
  mediaRecorder.stop();
  startButton.disabled = false;
  stopButton.disabled = true;
}
