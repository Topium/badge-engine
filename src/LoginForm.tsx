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
    const {setToken} = useAuth()

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
                setToken(res.data.access_token)
                setError(undefined)
            })
            .catch((err: AxiosError<ErrorResponse>) => {
                setToken(null)
                setError(err.response?.data.msg)
            })
    }

    function handleClose() {
        setError(undefined)
        closeDialog()
    }

    return (
        <dialog ref={dialogRef} className={error ? 'error' : undefined}>
            <h5>Dialog</h5>
            <form onSubmit={handleSubmit} method="post">
                <label htmlFor="username">Username</label>
                <input id="username" name="username" type="text" autoComplete="true" />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" />
                <input type="submit" value="Login" />
            </form>
            { error && (
                <div className="message">{error}</div>
            )}
            <button onClick={handleClose}>Close</button>
        </dialog>
    )
}

export default LoginForm