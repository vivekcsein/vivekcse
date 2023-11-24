"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import "../../../styles/page/projects/Webar_clickselfie.scss";
import Webcam_Inputform from "./Webcam_Inputform";

const imageProps = {
  src: "/images/virat.png",
};

const constraints = {
  audio: false,
  video: {
    // width: 1024,
    // height: 1024,
    aspectRatio: 1,
    facingMode: "user",
  },
};

const imgSize = 1024;

type videoStream = MediaStream | null;
let videoStream: videoStream = null;
let imgDataURL: string;
let localImglink: HTMLAnchorElement;

let webar_camera_container: HTMLElement;
let container_video: HTMLElement;
let camera_image: HTMLElement;

let camera_video: HTMLVideoElement;
let camera_canvas: HTMLCanvasElement;
let camera_canvas_ctx: CanvasRenderingContext2D | null;
let camera_canvas_img: HTMLImageElement;

let snapBtn: HTMLImageElement;
let cancelBtn: HTMLImageElement;
// let imgAR: HTMLImageElement;

let timer: any;

const Webar_clickselfie = () => {
  const [imageSaveON, setImageSaveON] = useState(false);
  const [userNameParent, setUserNameParent] = useState("");
  // const [videoStream, setVideoStream] = useState<videoStream>(null);
  const [srcImgData, setSrcImgData] = useState(imageProps.src);
  const varStat = 0;

  const loader = useCallback(() => {
    camera_video = document.getElementById("camera_video") as HTMLVideoElement;
    camera_canvas = document.getElementById(
      "camera_canvas"
    ) as HTMLCanvasElement;
    camera_canvas_img = document.getElementById(
      "camera_canvas_img"
    ) as HTMLImageElement;
    // camera_canvas_img.src = srcImgData;
    camera_canvas_ctx = camera_canvas.getContext("2d");
    camera_canvas.width = imgSize;
    camera_canvas.height = imgSize;

    webar_camera_container = document.getElementsByClassName(
      "webar_camera_container"
    )[0] as HTMLElement;
    container_video = document.getElementsByClassName(
      "container_video"
    )[0] as HTMLElement;
    camera_image = document.getElementsByClassName(
      "camera_image"
    )[0] as HTMLElement;

    snapBtn = document.getElementById("snapBtn") as HTMLImageElement;
    cancelBtn = document.getElementById("cancelBtn") as HTMLImageElement;
    // imgAR = createImageElement(imageProps);

    setResponsive();
    window.addEventListener("resize", setResponsive);
  }, []);

  const setResponsive = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 536) {
      snapBtn.style.top =
        (windowWidth - 150 * (windowWidth / 512)).toString() + "px";
      camera_image.style.height = windowWidth + 10 + "px";
    } else {
      snapBtn.style.top = "400px";
      camera_image.style.height = 512 + 10 + "px";
    }
  };

  // Get access to the webcam and display it in the 'video' element
  const cameraOpen = useCallback(async () => {
    try {
      if (videoStream == null) {
        videoStream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoStream != null) {
          handlesucess(videoStream);
        }
      } else {
        alert("Camera already in use!");
      }
    } catch (error) {
      handleError(error);
    }
  }, []);

  const handlesucess = (stream: MediaStream) => {
    if (camera_video != null) {
      camera_video.srcObject = stream;
    }
  };
  const handleError = (error: any) => {
    console.log(error);
  };

  const cameraStop = useCallback(async () => {
    console.log("camera stopped " + videoStream);

    if (videoStream != null && videoStream) {
      videoStream.getTracks().forEach((track: any) => track.stop());
      videoStream = null;
      console.log("video stopped");
    }
    if (camera_video !== null) {
      camera_video.srcObject = null;
    }
  }, []);

  const onSnap = useCallback(
    (e: any) => {
      console.log("snap clicked " + videoStream);

      e.preventDefault();
      if (videoStream) {
        setImageSaveON(true);
        if (camera_video != undefined && camera_video !== null) {
          if (camera_canvas_ctx != null) {
            camera_canvas_ctx.drawImage(camera_video, 0, 0, imgSize, imgSize);
            camera_canvas_ctx.drawImage(
              camera_canvas_img,
              0,
              0,
              imgSize,
              imgSize
            );
          }

          imgDataURL = camera_canvas.toDataURL("image/png");
          setSrcImgData(imgDataURL);
          camera_canvas.style.display = "none";
          camera_video.style.display = "none";
          console.log("photo clicked ");
          cameraStop();
        }
      }
    },
    [cameraStop]
  );

  const onCancelBtn = useCallback(
    (e: any) => {
      console.log("cancel clicked " + videoStream);
      e.preventDefault();
      if (videoStream == null) {
        videoStream = null;
        cameraOpen();
        setImageSaveON(false);
        camera_canvas.style.display = "none";
        camera_canvas_img.src = imageProps.src;
        if (camera_video !== null) {
          camera_video.style.display = "block";
        }
      }
    },
    [cameraOpen]
  );

  const init = useCallback(() => {
    container_video.style.display = "block";
    camera_video.style.display = "block";
    camera_canvas.style.display = "none";
    // camera_canvas_img.style.display = "none";
    if (camera_canvas_ctx != null) {
      camera_canvas_ctx.clearRect(0, 0, imgSize, imgSize);
    }

    if (container_video.style.display == "block") {
      cameraOpen();
      snapBtn.addEventListener("click", onSnap);
      cancelBtn.addEventListener("click", onCancelBtn);
    }
  }, [cameraOpen, onSnap, onCancelBtn]);

  const onSaveBtn = (userName: string) => {
    if (imageSaveON) {
      setUserNameParent(userName);
      localImglink = document.createElement("a") as HTMLAnchorElement;
      localImglink.href = imgDataURL;
      if (userName != "") {
        localImglink.download = `${userName}.png`;
        try {
          localStorage.clear();
          localStorage.setItem(`${userName}.png`, imgDataURL);
        } catch (error) {
          console.log("memory is full");
        }
      } else {
        localImglink.download = "image.png";
        try {
          localStorage.clear();
          localStorage.setItem(`image.png`, imgDataURL);
        } catch (error) {
          console.log("memory is full");
        }
      }
      // console.log(localStorage.getItem(`${userName}.png`));
      localImglink.target = "_blank";
      localImglink.click();
    } else {
      alert("Please take a photo first!");
    }
  };

  const finishCameraApp = () => {
    if (videoStream != null && videoStream) {
      videoStream.getTracks().forEach((track: any) => track.stop());
      videoStream = null;
    }
    if (camera_video !== null) {
      camera_video.srcObject = null;
    }
  };

  useEffect(() => {
    loader();
    init();
    const Header = document.getElementsByClassName(
      "Header"
    )[0] as HTMLHeadElement;
    const Footer = document.getElementsByClassName(
      "Footer"
    )[0] as HTMLHeadElement;
    Header.style.display = "none";
    Footer.style.display = "none";
    return () => {
      Header.style.display = "block";
      Footer.style.display = "block";
      finishCameraApp();
    };
  }, [loader, init]);

  return (
    <>
      <div className="webar_camera_container">
        <div className="container_video">
          <div className="container_camera">
            <div className="camera_image">
              <video
                id="camera_video"
                width={1024}
                height={1024}
                autoPlay
                muted
              />
              <canvas id="camera_canvas"></canvas>
              <Image
                src={srcImgData}
                id="camera_canvas_img"
                height={1024}
                width={1024}
                alt="virat picture"
              ></Image>
            </div>
            <Image
              src="/images/cancelBtn.png"
              alt="cancelBtn"
              id="cancelBtn"
              width={512}
              height={512}
            ></Image>
            <Image
              src="/images/captureBtn.png"
              alt="snapBtn"
              id="snapBtn"
              width={512}
              height={512}
            ></Image>
          </div>
          <div className="container_input">
            <Webcam_Inputform onSaveBtn={onSaveBtn} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Webar_clickselfie;
