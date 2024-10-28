import { ActorSubclass, HttpAgent } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export enum Connector {
  ICPSwap = 'ICPSwap',
  PLUG = 'PLUG',
  STOIC = 'STOIC',
  IC = 'IC',
  NFID = 'NFID',
  INFINITY = 'INFINITY',
  ME = 'ME',
  STOIC_MNEMONIC = 'STOIC_MNEMONIC',
  Metamask = 'Metamask',
}

export type CreateActorArgs = {
  canisterId: string;
  interfaceFactory: IDL.InterfaceFactory;
};

export interface WalletConnectorConfig {
  whitelist: string[];
  host: string;
}

export interface IConnector {
  init: () => Promise<boolean>;
  isConnected: () => Promise<boolean>;
  createActor: <Service>({
    canisterId,
    interfaceFactory,
  }: CreateActorArgs) => Promise<ActorSubclass<Service> | undefined>;
  createAgent: () => Promise<HttpAgent>;
  connect: () => Promise<boolean>;
  disconnect: () => Promise<void>;
  getPrincipal: string | undefined;
  type: Connector;
  expired: () => Promise<boolean>;
}

export { Connector as ConnectorType };
