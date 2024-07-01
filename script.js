// const startButton = document.getElementById("startButton");
// const stopButton = document.getElementById("startPause");
// const video = document.getElementById("startVideo");
// const audio = document.getElementById("startAudio");
// const recordedVideo = document.getElementById("startAudioVideo");


let mediaRecorder;
let recordedChunks = [];
let stream;

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const recordedVideo = document.getElementById('recordedVideo');

startButton.addEventListener('click', startRecording);
stopButton.addEventListener('click', stopRecording);

async function startRecording() {
  try {
    stream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: 'screen' },
      audio: true
    });

    const options = { mimeType: 'video/webm; codecs=vp9' };
    mediaRecorder = new MediaRecorder(stream, options);

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
  stream.getTracks().forEach(track => track.stop());
  startButton.disabled = false;
  stopButton.disabled = true;
}
