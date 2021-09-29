import { AnimatedRoute, AnimatedSwitch } from 'components/animated-route';
import Container from 'components/container/container';
import Grid, { GridRow } from 'components/grid/grid';
import Head from 'components/head/head';
import Panel, { Label } from 'components/panel/panel';
import Sponsors from 'components/sponsors/sponsors';
import Stats from 'components/stats/stats';
import StoicProvider from 'context/stoic';
import AccountProvider from 'context/account';
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import Compose from './context/compose';
import Index from './screens';
import EnvProvider from 'context/env';
import Socials from 'components/socials/socials';


export default function App() {

    const contextProviders = [
        {order: 0, component: EnvProvider},
        {order: 1, component: StoicProvider},
        {order: 2, component: AccountProvider},
    ];

    return (
        <Compose components={contextProviders}>
            <Container>
                <Router>
                    <Grid>
                        <GridRow>
                            <Head />
                        </GridRow>
                    </Grid>
                    <AnimatedSwitch>
                        <AnimatedRoute exact path={['/', '/games/:principal']} Component={Index}/>
                    </AnimatedSwitch>
                    <GridRow>
                        <Panel row={true} size={'sm'}>
                            <Label>Sponsors 💖</Label>
                            <Sponsors />
                        </Panel>
                    </GridRow>
                    <Grid>
                        <GridRow center>
                            <Socials />
                            <Stats />
                        </GridRow>
                    </Grid>
                </Router>
            </Container>
        </Compose>
    );
};
