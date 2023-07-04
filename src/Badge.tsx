import { BaseSyntheticEvent, useState } from "react";
import './badge.css';

function Badge() {
    const [fileUrl, changeFileUrl] = useState('')
    const [x, changeX] = useState(0)
    const [y, changeY] = useState(0)
    const [scale, changeScale] = useState(100)

    const handleTransform = function (n: number, f: (n:number) => void) {
        f(n);
    }

    const fileChange = function (e: BaseSyntheticEvent) {
        if (e.target?.files?.length) {
            changeFileUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

    return (
        <>
            <h2>Badge</h2>
            <form action="">
                <label htmlFor="x">
                    X-koordinaatti
                    <input onChange={(e) => handleTransform(parseInt(e.target.value), changeX)} value={x} type="number" name="x" id="x-input" />
                </label>
                <label htmlFor="y">
                    Y-koordinaatti
                    <input onChange={(e) => handleTransform(parseInt(e.target.value), changeY)} value={y} type="number" name="y" id="y-input" />
                </label>
                <label htmlFor="scale">
                    Koko
                    <input onChange={(e) => handleTransform(parseInt(e.target.value), changeScale)} value={scale} type="number" name="scale" id="scale-input" />
                </label>
                <input  onChange={(e) => {fileChange(e)}} type="file" accept="image/*" name="file" id="file-input" />
            </form>
            <div className="badge-container">
                <img
                    src={fileUrl}
                    alt=""
                    style={{transform: `scale(${scale}%) translate(${x / scale * 100}%,${y / scale * 100}%)`}}
                    />
            </div>
        </>
    )
}

export default Badge