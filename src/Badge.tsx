import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { BadgeData, ListBadgeData } from './types/interfaces'
import BadgeSelector from "./BadgeSelector";
import { useAuth } from "./provider/authProvider";
import BadgeSaver from "./BadgeSaver";
import SaveForm from "./SaveForm";

type Props = {
    onBadgeChange: ({fileUrl, imageX, imageY, scale, amount}: BadgeData) => void
}

function Badge({onBadgeChange}: Props) {
    const [fileUrl, setFileUrl] = useState('')
    const [imageX, setImageX] = useState(0)
    const [imageY, setImageY] = useState(0)
    const [scale, setScale] = useState(100)
    const [amount, setAmount] = useState(1)
    const [panning, setPanning] = useState(false)
    const [didMove, setDidMove] = useState(false)
    const [badgeClicked, setBadgeClicked] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const {user} = useAuth()
    const saveDialogRef = useRef<HTMLDialogElement>(null)

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
            const deltaX = e.movementX * (100 / imageWidth)
            const deltaY = e.movementY * (100 / imageHeight)
            const newX = Math.round((imageX + deltaX) * 100) / 100
            const newY = Math.round((imageY + deltaY) * 100) / 100
            setImageX(newX)
            setImageY(newY)
        }
    }

    const handleMouseUp = function () {
        if (!didMove && fileInputRef.current) {
            const current = fileInputRef.current as HTMLInputElement;
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
            let newScale = scale + e.deltaY * (scale / 100);
            newScale = Math.round(newScale * 10) / 10
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
        setImageX(listBadge.x_pos)
        setImageY(listBadge.y_pos)
        setScale(parseFloat(listBadge.scale))
    }

    function closeSaveDialog() {
        saveDialogRef.current && saveDialogRef.current?.close()
      }
      
      function openSaveDialog() {
        saveDialogRef.current?.showModal()
      }

    useEffect(() => {
        onBadgeChange({fileUrl, imageX, imageY, scale, amount})
    }, [fileUrl, imageX, imageY, scale, amount])

    return (
        <>
            <div className="hidden">
                <form ref={formRef} id="badgeForm">
                    <label htmlFor="x-input">
                        X-koordinaatti
                        <input onChange={(e) => setImageX(parseInt(e.target.value))} value={imageX} type="number" name="x_pos" id="x-input" />
                    </label>
                    <label htmlFor="y-input">
                        Y-koordinaatti
                        <input onChange={(e) => setImageY(parseInt(e.target.value))} value={imageY} type="number" name="y_pos" id="y-input" />
                    </label>
                    <label htmlFor="scale-input">
                        Koko
                        <input onChange={(e) => setScale(parseInt(e.target.value))} value={scale} type="number" name="scale" id="scale-input" />
                    </label>
                    <input ref={fileInputRef} onChange={(e) => {fileChange(e)}} type="file" accept=".png, .jpg, .jpeg, .gif" name="file" id="file-input" />
                </form>
            </div>
            <div className="badge-main">
            { user.access_token && (
                <>
                    <BadgeSelector onBadgeSelect={handleBadgeSelect}/>
                    <button onClick={openSaveDialog}>Talleta</button>
                    <BadgeSaver scale={scale} xPos={imageX} yPos={imageY} />
                </>
                ) }

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
                <div className="form">
                    <label htmlFor="amount-input">
                        Määrä:&nbsp;
                        <input onChange={(e) => setAmount(parseInt(e.target.value))} value={amount} type="number" name="amount" id="amount-input" />
                    </label>
                    <button onClick={(e) => resetBadge(e)}>Reset</button>
                </div>
            </div>
            <SaveForm
                closeDialog={closeSaveDialog}
                dialogRef={saveDialogRef}
                form={formRef}
                />
        </>
    )
}

export default Badge
