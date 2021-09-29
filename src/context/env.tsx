import React from 'react';
import { PRODUCTION_PRINCIPAL, STAGING_PRINCIPAL } from '@metascore/query';


interface EnvState {
    metascorePrincipal: string;
    metascoreHost: string;
    isLocal: boolean;
};

interface ContextProviderProps {
    children?: React.ReactNode;
};

const defaultState: EnvState = {
    metascorePrincipal: PRODUCTION_PRINCIPAL,
    metascoreHost: `https://raw.ic0.app`,
    isLocal: false,
};

export const envContext = React.createContext<EnvState>(defaultState);
export const useEnv = () => React.useContext(envContext);

export default function EnvProvider({ children }: ContextProviderProps) {

    const metascorePrincipal = defaultState.metascorePrincipal;
    const metascoreHost = defaultState.metascoreHost;
    const isLocal = window.location.host.includes('localhost');

    return <envContext.Provider
        value={{
            metascorePrincipal,
            metascoreHost,
            isLocal,
        }}
        children={children} 
    />
};