import { BaseSyntheticEvent, useState } from "react";

function Badge() {
    const [fileUrl, changeFileUrl] = useState('')

    const logChange = function (e: any) {
        console.log(e);
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
                    <input onChange={(e) => {logChange(e)}} type="number" name="x" id="x-input" />
                </label>
                <label htmlFor="y">
                    Y-koordinaatti
                    <input onChange={(e) => {logChange(e)}} type="number" name="y" id="y-input" />
                </label>
                <label htmlFor="scale">
                    Koko
                    <input onChange={(e) => {logChange(e)}} type="number" name="scale" id="scale-input" />
                </label>
                <input  onChange={(e) => {fileChange(e)}} type="file" accept="image/*" name="file" id="file-input" />
            </form>
            <img src={fileUrl} alt="" />
        </>
    )
}

export default Badge