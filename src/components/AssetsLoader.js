import { models, videos, images } from '../data/assets';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Emitter from './Emitter';

class AssetsLoader {

    constructor() {
        this._setup()
    }

    _setup() {
        this._promises = [];
        this.videos = [];
        this.models = [];
        // this.audios = [];
    }

    _loadAssets() {

        // load videos
        for (let i = 0; i < videos.length; i++) {

            let video = document.createElement("video");
            video.setAttribute("src", videos[i].url);
            video.setAttribute('preload', 'auto')

            let promise = new Promise(resolve => {
                video.addEventListener('canplaythrough', () => resolve(video));
            })
            .then(result => {
                this.videos.push({
                    name: videos[i].name,
                    content: result
                });
                return result
            });

            this._promises.push(promise);
        }

        // load models
        for (let i = 0; i < models.length; i++) {

            let promise = new Promise(resolve => {
                new GLTFLoader().load(models[i].url, resolve);
            })
            .then(result => {
                this.models.push({
                    name: models[i].name,
                    content: result
                });
                return result
            });

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

        // // load audios
        // for (let i = 0; i < audios.length; i++) {

        //     let promise = new Promise(resolve => {
        //         fetch(audios[i].url).then( response => {
        //             resolve(response.arrayBuffer());
        //         });
        //     })

        //     this._promises.push(promise);
        // }

        return Promise.all(this._promises).then(() => {
            Emitter.emit('loadingComplete', {})
        })
    }

    getModels(name) {
        return this.models.filter(entry => {return entry.name === name})
    }

    getVideos(name) {
        return this.videos.filter(entry => {return entry.name === name})
    }

}

export default new AssetsLoader();
