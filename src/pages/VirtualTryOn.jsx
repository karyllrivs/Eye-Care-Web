import { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as THREE from 'three';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-converter';
import '@tensorflow/tfjs-backend-webgl';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
// import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { getFile } from '../utils/serverFileUtils';
import axiosClient from '../utils/axiosClient';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const VirtualTryOn = () => {
    const { product_id } = useParams();

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [model, setModel] = useState(null);
    const [glassesMesh, setGlassesMesh] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [productModels, setProductModels] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);



    useEffect(() => {
        setIsLoading(true);
        axiosClient
            .get("/objects/" + product_id)
            .then(({ data }) => {
                setProductModels(data);
            })
            .catch(
                ({
                    response: {
                        data: { message },
                    },
                }) => {
                    alert(message);
                }
            );
    }, [product_id]);

    useEffect(() => {
        if (!productModels.length > 0) return;
        const loadResources = async () => {
            try {
                // Camera Access
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (webcamRef.current) {
                    webcamRef.current.srcObject = stream;
                }

                // TensorFlow Model
                await tf.setBackend('webgl');
                const loadedModel = await faceLandmarksDetection.load(
                    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
                    {
                        shouldLoadIrisModel: true,
                        maxFaces: 1,
                        // returnTensors: false,
                        // predictIrises: false 
                    }
                );
                setModel(loadedModel);

                // Three.js Setup
                const width = canvasRef.current.clientWidth;
                const height = canvasRef.current.clientHeight;
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
                camera.position.z = 5;
                const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
                renderer.setSize(width, height);
                renderer.setAnimationLoop(() => renderer.render(scene, camera));

                /** 2D Glasses Mesh */
                /** Uncomment this to use the transparent bg image as filter */
                const textureLoader = new THREE.TextureLoader();
                textureLoader.load(getFile(productModels[selectedIndex].image), (texture) => {
                    texture.colorSpace = THREE.SRGBColorSpace;
                    const geometry = new THREE.PlaneGeometry(2, 1);
                    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
                    const glasses = new THREE.Mesh(geometry, material);
                    scene.add(glasses);
                    setGlassesMesh(glasses);
                    setIsLoading(false);
                });

                /** 3D Glasses Mesh */
                /** Uncomment this to use the 3D object as filter */
                // const loader = new GLTFLoader();
                // loader.load(getFile(productModels[selectedIndex].model_filename), (gltf) => {
                //     const glasses = gltf.scene;
                //     glasses.scale.set(-0.1, 0.1, -0.1);
                //     scene.add(glasses);
                //     setGlassesMesh(glasses);
                //     setIsLoading(false);
                // }, undefined, (error) => {
                //     console.error('An error happened while loading the model:', error);
                // });

            } catch (error) {
                console.error("Initialization error:", error);
                setIsLoading(false);
            }
        };

        loadResources();
    }, [productModels, selectedIndex]);

    useEffect(() => {
        if (!productModels.length > 0) return;
        const detectAndPositionGlasses = async () => {
            if (!webcamRef.current || !model || !glassesMesh) return;
            const video = webcamRef.current.video;
            if (video.readyState !== 4) return;

            const faceEstimates = await model.estimateFaces({ input: video });
            if (faceEstimates.length > 0) {
                setIsLoading(false);
                // Face mesh keypoints
                const keypoints = faceEstimates[0].scaledMesh;
                const leftEye = keypoints[130];
                const rightEye = keypoints[359];
                const eyeCenter = keypoints[168];

                // Eye distance for glasses scaling
                const eyeDistance = Math.sqrt(Math.pow(rightEye[0] - leftEye[0], 2) + Math.pow(rightEye[1] - leftEye[1], 2));
                const scaleMultiplier = eyeDistance / 140;

                // Glasses scaling and offset values
                const scaleX = -0.01;
                const scaleY = -0.01;
                const offsetX = 0.00;
                const offsetY = -0.01;

                // Glasses positioning
                glassesMesh.position.x = (eyeCenter[0] - video.videoWidth / 2) * scaleX + offsetX;
                glassesMesh.position.y = (eyeCenter[1] - video.videoHeight / 2) * scaleY + offsetY;
                glassesMesh.scale.set(scaleMultiplier, scaleMultiplier, scaleMultiplier);
                glassesMesh.position.z = 1;

                // Rotate glasses to align with eyes - rotation depth
                const eyeLine = new THREE.Vector2(rightEye[0] - leftEye[0], rightEye[1] - leftEye[1]);
                const rotationZ = Math.atan2(eyeLine.y, eyeLine.x);
                glassesMesh.rotation.z = rotationZ;
            }
        };

        // Run detection and positioning every 120ms
        const intervalId = setInterval(() => {
            detectAndPositionGlasses();
        }, 120);

        return () => clearInterval(intervalId);
    }, [model, glassesMesh, productModels]);

    const handleModelSelect = (index) => {
        setSelectedIndex(index);
        setIsLoading(true);
    }

    return (
        <>
            <Navbar />
            <div className="h-100">
                <div className='pt-12 text-center'>
                    <span className='border border-solid border-black rounded-full py-2 px-5 font-bold'>Virtual Try-On</span>
                </div>
                <div className='relative' style={{ margin: '0 auto', width: '800px', height: '800px' }}>
                    {isLoading && (
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
                            <p className='text-6xl'>Loading...</p>
                        </div>
                    )}
                    <Webcam ref={webcamRef} autoPlay playsInline style={{ width: '800px', height: '800px' }} mirrored={true} />
                    <canvas ref={canvasRef} style={{ width: '800px', height: '800px', position: 'absolute', top: 0, left: 0 }} />
                </div>
                <div className='bg-teal-950 mb-14 w-1/3 mx-auto p-5 grid grid-rows-1 grid-flow-col grid-auto-cols-20 justify-center gap-3'>
                    {productModels.length > 0
                        ? productModels.map((product, index) => <img onClick={() => handleModelSelect(index)} key={product._id} src={getFile(product.image)} className="rounded-full w-20 h-20 " alt="" />)
                        : <h1 className='text-white'>Virtual Try On is not available at the moment.</h1>
                    }
                </div>
            </div>
            <Footer />
        </>
    );
};

export default VirtualTryOn;