import React from 'react';
import Styles from './leaderboard-panel.module.css';
import Panel from 'components/panel/panel';
import Neon from 'components/neon/neon';
import Leaderboard, { LeaderboardEntry } from 'components/leaderboard/leaderboard';
import { AnimatedRoute, AnimatedSwitch } from 'components/animated-route';
import Button from 'components/button/button';
import Scores from '../../metascores-detailed.json';

interface Props {
    children?: React.ReactNode;
};

export interface StaticMetascore {
    account: {
        id: number;
        alias: string | null;
        flavorText: string | null;
        avatar: string | null;
    };
    score: number;
};

export default function LeaderboardPanel ({ children } : Props) {

    const scores : StaticMetascore[] = Scores;

    const [page, setPage] = React.useState<number>(1);
    const [perPage, setPerPage] = React.useState<number>(50);

    const offset = React.useMemo(() => (page - 1) * perPage, [page]);

    React.useEffect(() => {
        const perPage = window.localStorage.getItem('leaderboardPerPage');
        if (perPage) {
            setPerPage(parseInt(perPage));
        };
    }, []);

    React.useEffect(() => {
        window.localStorage.setItem('leaderboardPerPage', `${perPage}`)
    }, [perPage]);

    const data : LeaderboardEntry[] = scores.map((score, i) => ({
        index: i,
        player: {
            accountId: score.account.id,
            nick: score.account.alias,
            avatar: score.account.avatar,
            flavor: score.account.flavorText,
        },
        score: Number(score.score),
    })).slice(offset, perPage + offset);

    console.log(offset, page * perPage);

    return (
        <div className={Styles.root}>
            <Panel>
                <div style={{textAlign: 'center', marginBottom: '30px'}}>
                    <Neon>All Scores</Neon>
                </div>
                <Leaderboard data={data} offset={offset} type={'overall'} />
                <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
                    {page > 1 && <Button onClick={() => setPage(page - 1)}>
                        Prev
                    </Button>}
                    {data.length === perPage && <Button onClick={() => setPage(page + 1)}>
                        Next
                    </Button>}
                </div>
            </Panel>
        </div>
    );
};