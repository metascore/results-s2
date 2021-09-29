import React from 'react';
import LeaderboardPanel from 'components/leaderboard-panel/leaderboard-panel';
import { Helmet } from 'react-helmet';
import Grid, { GridRow } from 'components/grid/grid';
import Neon from 'components/neon/neon';
import Podium from 'assets/podium.png';
import Scores from '../metascores-detailed.json';
import { useAccount } from 'context/account';
import Button from 'components/button/button';
import { useStoic } from 'context/stoic';
import Panel from 'components/panel/panel';
import Loader from 'components/loader/loader';
import Badge1 from 'assets/badges/1.webp';
import Badge2 from 'assets/badges/2.webp';
import Badge3 from 'assets/badges/3.webp';
import Badge4 from 'assets/badges/4.webp';
import Badge5 from 'assets/badges/5.webp';
import Badge6 from 'assets/badges/6.webp';
import Styles from './index.module.css';

const badges = [
    Badge6,
    Badge5,
    Badge4,
    Badge3,
    Badge2,
    Badge1,
];

const ranks = [
    'Best Gamer of the Hackathon',
    '2nd Best Tournament Gamer',
    '3rd Best Tournament Gamer',
    'Elite Tournament Gamer',
    'Strong Tournament Gamer',
    'Tournament Gamer',
];


export default function Index() {

    const { account } = useAccount();
    const { connect } = useStoic();

    const [loading, setLoading] = React.useState(true);

    const userScore = React.useMemo(() => {
        if (!account) {
            setLoading(false);
            return;
        };
        setLoading(true);
        const score = Scores.find((x) => x.account.id === Number(account.id));
        setLoading(false);
        return score;
    }, [account])

    return (
        <div>
            <Helmet>
                <meta name="og:title" content="RESULTS 💎" />
            </Helmet>
            <Grid big>
                <GridRow center>
                    <Neon big>
                        The Best Gamers of the <br className="hide-sm" />
                        DSCVR Hackaton Season 2
                    </Neon>
                </GridRow>
                <div className="hide-sm">
                    <GridRow center>
                        <img className="fluid" src={Podium} />
                    </GridRow>
                </div>
                <GridRow center>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '30px'}}>
                        <Neon>Your Score</Neon>
                        {
                            loading
                            ? <Loader />
                            : account
                                ? userScore
                                    ? <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px'}}>
                                        <h1>{userScore.account.alias}, The {ranks[userScore.account.rank]}</h1>
                                        <div className={Styles.qwerty}>
                                            <div>Final Score: {numberWithCommas(userScore.score)}</div>
                                            <div>#{Scores.indexOf(userScore) + 1} / {Scores.length}</div>
                                        </div>
                                        <img src={badges[userScore.account.rank]} width={300} height={321} />
                                        <div className={Styles.flava}>{userScore.account.flavorText && `“${userScore.account.flavorText}”`}</div>
                                        <div><small><em>Your rank badge will be dropped to your stoic wallet in the next week or two.</em></small></div>
                                    </div>
                                    : <>No score for this wallet.</>
                                : <>
                                    Connect your wallet to see your score.<br />
                                    <Button onClick={() => {
                                        setLoading(true);
                                        connect();
                                    }}>
                                        Connect Wallet
                                    </Button>
                                </>
                        }
                    </div>
                </GridRow>
                <GridRow>
                    <Panel>
                        <div style={{textAlign: 'center'}}>
                            Prize pool distributions will be announced shortly. 
                            The first round of rewards will be distributed Friday October 1.
                        </div>
                    </Panel>
                </GridRow>
                <GridRow>
                    <LeaderboardPanel />
                </GridRow>
            </Grid>
        </div>
    );

};

function numberWithCommas(x : number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "_");
}