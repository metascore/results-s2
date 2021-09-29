import React from 'react';
import Styles from './neon.module.css';

interface Props {
    children?: React.ReactNode;
    big?: boolean;
};

export default function Neon ({ children, big } : Props) {
    return <div className={[
        Styles.root,
        big ? Styles.big : '',
    ].join(' ')}>
        {children}
    </div>
};