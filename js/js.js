//kamera
window.onload = function () {
    const video = document.querySelector("video");
    const switchBtn = document.querySelector("#switch");
    const captureBtn = document.querySelector("#capture");
    const canvas = document.querySelector("#canvas");
    const photo = document.querySelector("#photo");
    let front = false;
    let width = 200;
    let height = 0;
    let streaming = false;
    let godkendImg = document.querySelector(".skjul");
    let lsImg;

    getStream();
    switchBtn.onclick = function () {
        front = !front;
        getStream();
    };
    captureBtn.onclick = function () {
        takePicture();
        godkendImg.removeAttribute("class");
        godkendImg.setAttribute("class", "vis");
        localStorage.setItem("userImg", lsImg);
    };
    video.addEventListener("canplay", function () {
        if (!streaming){
            height = video.videoHeight / (video.videoWidth/width);
        }
    });
    function getStream() {
        if(window.stream){
            window.stream.getTracks().forEach(function (track) {
                track.stop();
            });
        }
        let constraints = {
            video: {facingMode: (front ? "user" : "environment") //?=if/else statement
            }
        };
        navigator.mediaDevices.getUserMedia(constraints).then(gotStream).catch(handleError);
    }
    function gotStream(stream) {
        window.stream = stream;
        video.srcObject = stream;

    }
    function takePicture() {
        let context = canvas.getContext("2d");
        if(width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);
            let data = canvas.toDataURL("image/png");
            photo.setAttribute("src", data);
            lsImg = data;
        }
    }
    function handleError(error) {
        console.log(error);
    }
};
//kamera slut