import React, { FormEvent, useState } from "react"
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "./types/interfaces";
import { useAuth } from "./provider/authProvider";

type Props = {
    closeDialog: () => void,
    dialogRef: React.RefObject<HTMLDialogElement>,
    form: React.RefObject<HTMLFormElement>,
}

function SaveForm({closeDialog, dialogRef, form}: Props) {

    const [error, setError] = useState<string>()
    const {setUser} = useAuth()

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.currentTarget)
        for (const entry of new FormData(form.current || undefined).entries()) {
            data.append(entry[0], entry[1])
        }
        console.log('submit', data)
        axios.post('http://127.0.0.1:5000/badges',
            data,
            {headers: {
                "Content-Type": "multipart/form-data"
            }}
            )
            .then((res) => {
                console.log('result', res.data);
                setUser(res.data)
                setError(undefined)
                closeDialog()
            })
            .catch((err: AxiosError<ErrorResponse>) => {
                setUser({username: null, access_token: null})
                setError(err.response?.data.msg)
            })
    }

    function handleClose(e: React.MouseEvent) {
        e.preventDefault()
        setError(undefined)
        closeDialog()
    }

    return (
        <dialog ref={dialogRef} className={error ? 'error' : undefined}>
            <form onSubmit={handleSubmit} method="post">
                <div className="form-element">
                    <label htmlFor="badgename">Pinssin nimi</label>
                    <input id="badgename" name="badge_name" type="text" />
                </div>
                <div className="form-footer">
                    <input type="submit" value="Talleta" />
                    <button onClick={handleClose}>Peruuta</button>  
                </div>
            </form>
            { error && (
                <div className="message">{error}</div>
            )}
        </dialog>
    )
}

export default SaveForm