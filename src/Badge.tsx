import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { BadgeData, ListBadgeData } from './types/interfaces'
import DBForm from "./DBForm";
import { useAuth } from "./provider/authProvider";

function Badge(props: {onBadgeChange: ({fileUrl, imageX, imageY, scale, amount}: BadgeData) => void}) {
    const [fileUrl, setFileUrl] = useState('')
    const [imageX, setImageX] = useState(0)
    const [imageY, setImageY] = useState(0)
    const [scale, setScale] = useState(100)
    const [panning, setPanning] = useState(false)
    const [amount, setAmount] = useState(1)
    const [didMove, setDidMove] = useState(false)
    const [badgeClicked, setBadgeClicked] = useState(false)

    const fileInput = useRef(null);
    const {token} = useAuth()

    const handleTransform = function (n: number, f: (n:number) => void) {
        f(n);
    }

    const fileChange = function (e: BaseSyntheticEvent) {
        setBadgeClicked(false)
        if (e.target?.files?.length) {
            setFileUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleMouseMove = function (e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if(panning && fileUrl.length) {
            const target = e.target as HTMLElement
            setDidMove(true);
            const imageWidth = target.children[0].clientWidth;
            const imageHeight = target.children[0].clientHeight;
            setImageX(imageX + e.movementX * (100 / imageWidth))
            setImageY(imageY + e.movementY * (100 / imageHeight))
        }
    }

    const handleMouseUp = function () {
        if (!didMove && fileInput.current) {
            const current = fileInput.current as HTMLInputElement;
            current.click();
            setBadgeClicked(true);
            setPanning(false)
        } else {
            setDidMove(false)
            setPanning(false)
        }
    }

    const handleScroll = function (e: React.WheelEvent) {
        if (fileUrl.length) {
            let newScale = scale + 5 * Math.sign(e.deltaY) * (scale / 100);
            newScale = newScale < 50 ? 50 : newScale;
            newScale = newScale > 400 ? 400 : newScale;
            setScale(newScale)

        }
    }

    const resetBadge = function (e: React.MouseEvent) {
        e.preventDefault();
        setImageX(0)
        setImageY(0)
        setScale(100)
        setAmount(1)
    }

    function handleBadgeSelect(listBadge: ListBadgeData) {
        setFileUrl(listBadge.badge_url)
    }

    useEffect(() => {
        props.onBadgeChange({fileUrl, imageX, imageY, scale, amount})
    }, [fileUrl, imageX, imageY, scale, amount])

    return (
        <>
            <div className="hidden">
                <label htmlFor="x-input">
                    X-koordinaatti
                    <input onChange={(e) => handleTransform(parseInt(e.target.value), setImageX)} value={imageX} type="number" name="x" id="x-input" />
                </label>
                <label htmlFor="y-input">
                    Y-koordinaatti
                    <input onChange={(e) => handleTransform(parseInt(e.target.value), setImageY)} value={imageY} type="number" name="y" id="y-input" />
                </label>
                <label htmlFor="scale-input">
                    Koko
                    <input onChange={(e) => handleTransform(parseInt(e.target.value), setScale)} value={scale} type="number" name="scale" id="scale-input" />
                </label>
                <input ref={fileInput} onChange={(e) => {fileChange(e)}} type="file" accept="image/*" name="file" id="file-input" />
            </div>
            <div className="badge-main">
                <div
                    className={`badge-container ${badgeClicked ? 'clicked' : ''}`}
                    onMouseDown={e => { setPanning(true); e.preventDefault() }}
                    onMouseUp={() => handleMouseUp()}
                    onMouseOver={() => setBadgeClicked(false)}
                    onMouseLeave={() => { setPanning(false); setBadgeClicked(false) }}
                    onMouseMove={e => handleMouseMove(e)}
                    onWheel={e => handleScroll(e)}
                    >
                    <img
                        src={fileUrl}
                        alt=""
                        style={{transform: `scale(${scale}%) translate(${imageX / scale * 100}%,${imageY / scale * 100}%)`}}
                        />
                </div>
                { token &&  <DBForm onBadgeSelect={handleBadgeSelect}/> }
                <div className="form">
                    <label htmlFor="amount-input">
                        Määrä:&nbsp;
                        <input onChange={(e) => setAmount(parseInt(e.target.value))} value={amount} type="number" name="amount" id="amount-input" />
                    </label>
                    <button onClick={(e) => resetBadge(e)}>Reset</button>
                </div>
            </div>
        </>
    )
}

export default Badge
