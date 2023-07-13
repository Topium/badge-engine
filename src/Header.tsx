import logoUrl from './assets/tursakelogos-05-square.png';
import infoIcon from './assets/info-icon.svg';
import { useState } from 'react';

const Header = function () {
    const [helpOpen, setHelpOpen] = useState(false);

    return (
        <div className="header-container">
            <div className="header">
                <span id="logo">
                    <img src={logoUrl} alt="" />
                    <span id="logo-text">TURSAKKEEN PINSSIAUTOMAATTI</span>
                </span>
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