import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { useStoic } from 'context/stoic';
import Button from 'components/button/button';
import Styles from './head.module.css';
import logo from 'assets/logo.webp';
import logoSmall from 'assets/logo-small.svg';
import stoic from 'assets/stoic.png';

export default function Head () {

    const { isConnected } = useStoic();

    const smallLogo = useMediaQuery({ query: '(max-width: 459px'});

    return (
        <header className={Styles.root}>
            <Link to='/'>
                <img
                    width={smallLogo ? 50 : 400}
                    height={50}
                    src={smallLogo ? logoSmall : logo}
                    alt="Metascore Logo"
                    className={Styles.logo}
                />
            </Link>
            <nav className={Styles.nav}>
                <div />
                <div className={Styles.utilNav}>
                    {isConnected ? <Account /> : <Connect />}
                </div>
            </nav>
        </header>
    );
};

function Connect () {
    const { connect } = useStoic();
    return (
        <Button onClick={() => connect()}>
            Connect
            <span className={Styles.textWallet}>&nbsp;Wallet</span>
        </Button>
    );
};

function Account () {
    const { principal } = useStoic();
    

    return (
        <Button>
            <img src={stoic}
                width={18}
                height={18}
            />
            {`${principal?.toText().slice(0, 4)}...${principal?.toText().slice(principal?.toText().length - 3)}`}
        </Button>
    );
};