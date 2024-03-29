import React, { FormEvent, useState } from "react"

type Props = {
    closeDialog: () => void,
    dialogRef: React.RefObject<HTMLDialogElement>
}

function LoginForm({closeDialog, dialogRef}: Props) {

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log('submit', e)
    }

    return (
        <dialog ref={dialogRef}>
            <h5>Dialog</h5>
            <form onSubmit={handleSubmit} method="post">
                <label htmlFor="username">Username</label>
                <input id="username" name="username" type="text" />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" />
                <input type="submit" value="Login" />
            </form>
            <button onClick={() => closeDialog()}>Close</button>
        </dialog>
    )
}

export default LoginForm