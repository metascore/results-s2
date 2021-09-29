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
                                    ? <>
                                        Alias: {userScore.account.alias}<br />
                                        Rank: {userScore.account.rank}<br />
                                        Position: #{Scores.indexOf(userScore) + 1}<br />
                                        Final Score: {userScore.score}<br />
                                        Flavor Text: {userScore.account.flavorText}<br />
                                    </>
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