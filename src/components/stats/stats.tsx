import { HttpAgent } from '@dfinity/agent';
import { createActor } from '@metascore/query';
import { useEnv } from 'context/env';
import React from 'react';
import Styles from './stats.module.css';

interface Props {};

export default function Stats ({} : Props) {
    const { metascorePrincipal, metascoreHost } = useEnv();
    const metascore = React.useMemo(() => {
        const agent = new HttpAgent({
            host: metascoreHost
        });
        return createActor(agent, metascorePrincipal);
    }, []);
    const [players, setPlayers] = React.useState<number>()
    const [scores, setScores] = React.useState<number>()

    React.useEffect(() => {
        metascore.getPlayerCount().then((r) => setPlayers(Number(r))).catch(console.error);
        metascore.getScoreCount().then((r) => setScores(Number(r))).catch(console.error);
    }, []);

    return <div className={Styles.root}>
        <div>3 Games</div>
        <div>4975 Gamers</div>
        <div>6000+ High Scores</div>
        <div>100+ NFTs</div>
        <div>1 Champion</div>
    </div>
};