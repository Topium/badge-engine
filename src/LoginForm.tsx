import React, { FormEvent, useState } from "react"
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "./types/interfaces";
import { useAuth } from "./provider/authProvider";
import { UserData } from "./types/User";

type Props = {
    closeDialog: () => void,
    dialogRef: React.RefObject<HTMLDialogElement>
}

function LoginForm({closeDialog, dialogRef}: Props) {

    const [error, setError] = useState<string>()
    const {setUser} = useAuth()

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.currentTarget)
        const username = data.get('username')
        const password = data.get('password')
        console.log('submit', data)
        axios.post<UserData>('http://127.0.0.1:5000/token',
            {username, password},
            {headers: {
                'Content-Type': 'application/json'
            }})
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
                    <label htmlFor="username">Käyttäjänimi</label>
                    <input id="username" name="username" type="text" autoComplete="true" />
                </div>
                <div className="form-element">
                    <label htmlFor="password">Salasana</label>
                    <input id="password" name="password" type="password" />
                </div>
                <div className="form-footer">
                    <input type="submit" value="Kirjaudu" />
                    <button onClick={handleClose}>Peruuta</button>  
                </div>
            </form>
            { error && (
                <div className="message">{error}</div>
            )}
        </dialog>
    )
}

export default LoginForm