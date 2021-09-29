import React from 'react';
import LeaderboardPanel from 'components/leaderboard-panel/leaderboard-panel';
import { Helmet } from 'react-helmet';
import OG from 'assets/og/main.webp';
import Grid, { GridRow } from 'components/grid/grid';
import Neon from 'components/neon/neon';
import Podium from 'assets/podium.png';
import Scores from '../metascores-detailed.json';
import { useAccount } from 'context/account';
import Button from 'components/button/button';
import { useStoic } from 'context/stoic';
import Panel from 'components/panel/panel';


export default function Index() {

    const { account } = useAccount();
    const { connect } = useStoic();

    const userScore = React.useMemo(() => {
        if (!account) return;
        return Scores.find((x) => x.account.id === Number(account.id));
    }, [account])

    return (
        <div>
            <Helmet>
                <meta name="og:title" content="CONNECT 💰 PLAY 🕹️ WIN 💎 METASCORE" />
                <meta name="og:image" content={OG} />
            </Helmet>
            <Grid big>
                <GridRow center>
                    <Neon big>
                        The Best Gamers of the <br />
                        DSCVR Hackaton Season 2
                    </Neon>
                </GridRow>
                <GridRow center>
                    <img className="fluid" src={Podium} />
                </GridRow>
                <GridRow center>
                    <Grid>
                        <Neon>Your Score</Neon>
                        {
                            account
                            ? <>
                                {
                                    userScore
                                    ? <>Found your score.</>
                                    : <>No score for this wallet.</>
                                }
                            </>
                            : <>
                                Connect your wallet to see your score.<br />
                                <Button onClick={() => connect()}>
                                    Connect Wallet
                                </Button>
                            </>
                        }
                    </Grid>
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