import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import DecollageScene from './DecollageScene';

const Alaska1 = () => {

    const history = useHistory();
    const canvas = useRef(null);

    useEffect(() => {
        const threeScene = new DecollageScene(history, canvas.current);

        return () => {
            threeScene.destroyRaf();
        }
    }, [history])

    return (
        <>
            <canvas ref={canvas}></canvas>
            <h2>Drag the cube to the sky</h2>
        </>
    )
}

export default Alaska1;

// class Alaska1 extends React.Component {

//     constructor(props) {
//         super(props);
//         this.handleLoad = this.handleLoad.bind(this);
//     }

//     componentDidMount() {
//         this.handleLoad();
//     }

//     componentDidUpdate() {
//         this.handleLoad();
//     }

//     componentWillUnmount() {
//         this.threeScene.destroyRaf()
//     }

//     handleLoad() {
//         const canvas = this.refs.canvas
//         this.threeScene = new DecollageScene(canvas)
//     }

//     render() {
//         return (
//             <>
//                 <canvas ref='canvas'></canvas>
//                 <h2>Drag the cube to the sky</h2>
//             </>
//         )
//     }
// }
