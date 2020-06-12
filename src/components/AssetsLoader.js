import { videos, models, textures, audios, images } from '../data/assets';
// import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

class AssetsLoader {

    constructor() {
        this._setup();
        console.log('yoooo')
    }

    _setup() {
        this._promises = [];
        // this.videos = {};
        // this.models = {};
        // this.audios = {};
        // this._modelsLoaded = 0;
    }

    loadAssets() {
        // load videos
        for (let i = 0; i < videos.length; i++) {

            let video = document.createElement("video");
            video.setAttribute("src", videos[i].url);

            let promise = new Promise(resolve => {
                video.addEventListener('canplaythrough', () => resolve(video));
            })

            this._promises.push(promise);
        }

        // load models
        for (let i = 0; i < models.length; i++) {

            let promise = new Promise(resolve => {
                new GLTFLoader().load(models[i].url, resolve);
            })

            this._promises.push(promise);
        }

        // load audios
        for (let i = 0; i < audios.length; i++) {

            // let audio = new Audio();
            // audio.src = audios[i].url;

            let promise = new Promise(resolve => {
                // audio.addEventListener('canplaythrough', () => resolve(audio));
                fetch(audios[i].url).then( response => {
                    resolve(response.arrayBuffer());
                });
            })

            this._promises.push(promise);
        }

        // load images
        for (let i = 0; i < images.length; i++) {

            let img = new Image();
            img.src = images[i].url;

            let promise = new Promise(resolve => {
                img.addEventListener('load', () => resolve(img));
            })

            this._promises.push(promise);
        }

        return Promise.all(this._promises).then(() => {
            console.log('loading DONE', this._promises)
        });
    }

}


export default AssetsLoader;
