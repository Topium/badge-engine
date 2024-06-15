import logoUrl from './assets/tursakelogos-05-square.png';
import infoIcon from './assets/info-icon.svg';
import { useState } from 'react';
import { useAuth } from './provider/authProvider';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from './types/interfaces';

type Props = {openLoginDialog: () => void}

const Header = function ({openLoginDialog}: Props) {
    const [helpOpen, setHelpOpen] = useState(false);
    const {user, setUser} = useAuth()

    function logout() {
        axios.post('http://127.0.0.1:5000/logout')
            .then(() => {
                setUser({username: null, access_token: null})
            })
            .catch((err: AxiosError<ErrorResponse>) => {
                console.log('err', err)
                setUser({username: null, access_token: null})
            })
    }

    return (
        <div className="header-container">
            <div className="header">
                <span id="logo">
                    <img src={logoUrl} alt="" />
                    <span id="logo-text">TURSAKKEEN PINSSIAUTOMAATTI</span>
                </span>
                { user.access_token ? (
                    <button onClick={logout}>Kirjaa ulos {user.username}</button>
                ) : (
                    <button onClick={openLoginDialog}>Kirjaudu</button>
                )}
                <a id="help" onClick={() => setHelpOpen(!helpOpen)}>
                    <img src={infoIcon} alt="" />
                </a>
            </div>
            <div onClick={() => setHelpOpen(false)} className={`help-container ${helpOpen ? 'open' : ''}`}>
                <div className="help">
                    <ol>
                        <li>Klikkaa pinssiaihiota ja valitse haluamasi kuva</li>
                        <li>Asettele kuva raahaamalla sitä hiirellä ja skaalaamalla hiiren rullalla</li>
                        <li>Valitse tulostettava määrä</li>
                        <li>Valitse pinssien koko</li>
                        <li>Paina Tulosta-painiketta</li>
                    </ol>
                    HUOM: Valitse tulostusasetuksista 100% skaalaus! Esim Chromessa: Tulosta &gt; Lisää asetuksia &gt; Asteikko &gt; Muokattu ja arvoksi "100".
                </div>
            </div>
        </div>
    )
}

export default Header;