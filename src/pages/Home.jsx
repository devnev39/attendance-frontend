import {useEffect,useState} from "react";
import * as faceapi from "face-api.js"

import "./styles.css";
function Home() {
    const videoH = 480;
    const videoW = 640;
    let detected = false;

    const [modelsLoaded,setModelsLoaded] = useState(false);
    const [videoCapture,setVideoCapture] = useState(false);
    const [detectedState,setDetectedState] = useState(false);
    const [user,setUser] = useState(null);
    
    useEffect(() => {
        const loadModels = () => {
            const MODEL_URL = process.env.PUBLIC_URL+'/models';
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            ]).then(setModelsLoaded(true))
        }
        loadModels();
    },[]);

    const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
      
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);
      
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
      
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
      
        const blob = new Blob(byteArrays, {type: contentType});
        return blob;
      }

    useEffect(() => {
        if(!detectedState) return;
        const video = document.getElementById("videoElement");
        const canvas = document.createElement("canvas");
        canvas.width = videoW;
        canvas.height = videoH;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video,0,0,canvas.width,canvas.height);
        let image = canvas.toDataURL("image/jpeg");
        const content_type = image.split(";")[0].split(":")[1];
        const bs64 = image.split(";")[1].split(",")[1];
        const blob = b64toBlob(bs64,content_type);

        let formData = new FormData();
        formData.append("image",blob);
        fetch("/recognize",{
            method : "POST",
            body : formData
        }).then(res => res.json()).then(res =>{
            if(res.data && res.status === 200) {setUser(res.data);setTimeout(() => setUser(null),3000);}
            else alert(`Error ${res.status} ${JSON.stringify(res.data)}`)
        })
    },[detectedState]);

    const startVideo = () => {
        setVideoCapture(true);
        setDetectedState(current => {detected=false;return false});
        let video = document.getElementById("videoElement");
        if(navigator.mediaDevices.getUserMedia){
            navigator.mediaDevices.getUserMedia({video : true})
            .then(stream => video.srcObject = stream)
            .catch(err => console.log(err))
        }else console.log("No media devices !");
    }

    const closeVideo = () => {
        const video = document.getElementById("videoElement");
        video.pause();
        video.srcObject.getTracks()[0].stop();
        setVideoCapture(false);
    }

    const handleVideoOnPlay = () => {
        const video = document.getElementById("videoElement");
        const canvas = document.getElementById("videoCanvas");
        const displaySize = {width : video.width,height : video.height};
        const interval = setInterval(async () => {
            if(detected) {clearInterval(interval);closeVideo();}
            const detections = await faceapi.detectAllFaces(video,new faceapi.TinyFaceDetectorOptions());
            faceapi.matchDimensions(canvas,displaySize);
            const resizedDetections = faceapi.resizeResults(detections,displaySize);
            canvas.getContext("2d").clearRect(0,0,video.width,video.height);
            faceapi.draw.drawDetections(canvas,resizedDetections);
            if(detections.length) setDetectedState(current => {detected=true;return true});
        },100)
    }

    return (
        <>
            <div className="recognize-root">
                <div className="row">
                    <div className="col-8">
                        <div className="controls d-flex justify-content-center m-3">
                            {videoCapture && modelsLoaded ? 
                            <button onClick={closeVideo} className="btn btn-danger">Close Camera</button>
                             :
                            <button onClick={startVideo} className="btn btn-primary">Open camera</button>}
                        </div>
                        <div className="video-container">
                            <div className="d-flex justify-content-center">
                                <video autoPlay={true} id="videoElement" onPlay={handleVideoOnPlay} width={videoW} height={videoH} />
                                <canvas style={{"position" : "absolute"}} id="videoCanvas" />
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        {user ? 
                        <div className="userCard shadow p-5">
                            <div className="row">
                                <div className="col-4">
                                    Email : 
                                </div>
                                <div className="col-8">
                                    {user.email}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    Name :  
                                </div>
                                <div className="col-8">
                                    {user.name}
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mt-5">
                                <i className="fa-regular fa-circle-check fa-3x text-success"></i>
                            </div>
                            
                        </div> : <div>No user detected</div>}
                    </div>
                </div>
            </div>        
        </>
    )
}

export default Home;