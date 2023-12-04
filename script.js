const video = document.getElementById('video');

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
    navigator.getUserMedia(
        { video: {}},
        stream => video.srcObject = stream,
        err => console.log(err)
    )
}

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = {width: 400, height: 255}
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
        const dections = await faceapi.detectAllFaces(video, 
            new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
            const resizedDetections = faceapi.resizeResults(dections, displaySize)
            canvas.getContext('2d').clearRect(0,0, canvas.width, canvas.height)
            faceapi.draw.drawDetections(canvas, resizedDetections)
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
console.log(dections[0].expressions)

let angry = dections[0].expressions.angry;
let disgusted = dections[0].expressions.disgusted;
let fearful = dections[0].expressions.fearful;
let happy = dections[0].expressions.happy;
let neutral = dections[0].expressions.neutral;
let sad = dections[0].expressions.sad;
let surprised = dections[0].expressions.surprised;


const angrydiv = document.querySelector('#angry');
if(angry > .5){
    angrydiv.classList = 'btn emotion'
} else if(angry < .5){
    angrydiv.classList = 'btn'
}
const disgusteddiv = document.querySelector('#disgusted');
if(disgusted > .5){
    disgusteddiv.classList = 'btn emotion'
} else if(disgusted < .5){
    disgusteddiv.classList = 'btn'
}
const fearfuldiv = document.querySelector('#fearful');
if(fearful > .5){
    fearfuldiv.classList = 'btn emotion'
} else if(fearful < .5){
    fearfuldiv.classList = 'btn'
}
const happydiv = document.querySelector('#happy');
if(happy > .5){
    happydiv.classList = 'btn emotion'
} else if(happy < .5){
    happydiv.classList = 'btn'
}
const neutraldiv = document.querySelector('#neutral');
if(neutral > .5){
    neutraldiv.classList = 'btn emotion'
} else if(neutral < .5){
    neutraldiv.classList = 'btn'
}
const saddiv = document.querySelector('#sad');
if(sad > .5){
    saddiv.classList = 'btn emotion'
} else if(sad < .5){
    saddiv.classList = 'btn'
}
const surpriseddiv = document.querySelector('#surprised');
if(surprised > .5){
    surpriseddiv.classList = 'btn emotion'
} else if(surprised < .5){
    surpriseddiv.classList = 'btn'
}

    }, 100)
})