import React from 'react';
import { useStoic } from './stoic';
import { Account, AuthenticationRequest } from '@metascore/query/generated/metascore.did';


interface AccountState {
    account?: Account;
    isConnected: boolean;
    disconnect: () => void;
    loading: { [key : string] : boolean };
    setAccount: (acc : Account) => void;
};

interface ContextProviderProps {
    children?: React.ReactNode;
};

const defaultState: AccountState = {
    isConnected: false,
    disconnect: () => {},
    loading: {},
    setAccount: (acc : Account) => {},
};

export const accountContext = React.createContext<AccountState>(defaultState);
export const useAccount = () => React.useContext(accountContext);

export default function AccountProvider({ children }: ContextProviderProps) {

    const [isConnected, setIsConnected] = React.useState<boolean>(defaultState.isConnected);
    const [account, setAccount] = React.useState<Account>();
    const [loadingAccount, setLoadingAccount] = React.useState<boolean>(false);
    const [loadingMultiSig, setLoadingMultiSig] = React.useState<boolean>(false);

    const { isConnected : connectedS, actor : actorS, principal : principalS } = useStoic();

    function disconnect () {
        setAccount(undefined);
        setIsConnected(false);
    }

    React.useEffect(() => {
        // Fetch account data when we connect a wallet
        const actor = actorS;
        const wallet : 'stoic' | 'plug' = actor === actorS ? 'stoic' : 'plug';
        const principal = principalS
        if (principal && actor && !account && !loadingAccount) {
            console.info(`Requesting Metascore account...`);
            setLoadingAccount(true);
            const authRequest : AuthenticationRequest = {
                // @ts-ignore
                authenticate: {
                    [wallet]: principal
                }
            };
            actor.authenticateAccount(authRequest).then(resp => {
                //@ts-ignore
                setAccount(resp?.ok?.account);
            })
            .finally(() => {
                setLoadingAccount(false);
            });
        };
    }, [actorS, principalS, account, connectedS, principalS]);

    return <accountContext.Provider
        value={{
            isConnected,
            disconnect,
            account,
            loading : {
                account: loadingAccount,
                multisig: loadingMultiSig,
            },
            setAccount
        }}
        children={children} 
    />
};