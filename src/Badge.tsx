import { BaseSyntheticEvent, useState } from "react";
import './badge.css';

function Badge() {
    const [fileUrl, setFileUrl] = useState('')
    const [imageX, setImageX] = useState(0)
    const [imageY, setImageY] = useState(0)
    const [scale, setScale] = useState(100)
    const [panning, setPanning] = useState(false)

    const handleTransform = function (n: number, f: (n:number) => void) {
        f(n);
    }

    const fileChange = function (e: BaseSyntheticEvent) {
        if (e.target?.files?.length) {
            setFileUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleMouseMove = function (e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if(panning) {
            const imageWidth = e.target.children[0].clientWidth;
            const imageHeight = e.target.children[0].clientHeight;
            setImageX(imageX + e.movementX * (100 / imageWidth))
            setImageY(imageY + e.movementY * (100 / imageHeight))
        }
    }

    const handleScroll = function (e: React.WheelEvent) {
        let newScale = scale + 5 * Math.sign(e.deltaY) * (scale / 100);
        newScale = newScale < 50 ? 50 : newScale;
        newScale = newScale > 400 ? 400 : newScale;
        setScale(newScale)
    }

    return (
        <>
            <h2>Badge</h2>
            <form action="">
                <label htmlFor="x">
                    X-koordinaatti
                    <input onChange={(e) => handleTransform(parseInt(e.target.value), setImageX)} value={imageX} type="number" name="x" id="x-input" />
                </label>
                <label htmlFor="y">
                    Y-koordinaatti
                    <input onChange={(e) => handleTransform(parseInt(e.target.value), setImageY)} value={imageY} type="number" name="y" id="y-input" />
                </label>
                <label htmlFor="scale">
                    Koko
                    <input onChange={(e) => handleTransform(parseInt(e.target.value), setScale)} value={scale} type="number" name="scale" id="scale-input" />
                </label>
                <input  onChange={(e) => {fileChange(e)}} type="file" accept="image/*" name="file" id="file-input" />
            </form>
            <div
                className="badge-container"
                onMouseDown={(e) => {setPanning(true); e.preventDefault()}}
                onMouseUp={() => setPanning(false)}
                onMouseLeave={() => setPanning(false)}
                onMouseMove={(e) => handleMouseMove(e)}
                onWheel={e => handleScroll(e)}
                >
                <img
                    src={fileUrl}
                    alt=""
                    style={{transform: `scale(${scale}%) translate(${imageX / scale * 100}%,${imageY / scale * 100}%)`}}
                    />
            </div>
        </>
    )
}

export default Badge