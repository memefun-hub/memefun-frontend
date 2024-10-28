import { Config } from '@/constants';
import { APP_ENV, defaultAgent, MEME_CANISTER_ID } from '@/actor/index';
import { Actor, HttpAgent } from '@dfinity/agent';
import { _SERVICE as MEME_SERVICE } from '@/declarations/meme_backend/meme_backend.did';
// @ts-ignore
import { idlFactory as memeInterface } from '@/declarations/meme_backend/meme_backend.did.js';

export async function mintMeme(
  agent: HttpAgent,
  uuid: string,
  param: {
    name: string;
    symbol: string;
    logo: string;
    logoBase64: string;
    description: string;
  },
): Promise<string> {
  if (APP_ENV !== Config.MAINNET) agent.fetchRootKey();
  console.log(param);

  const memeActor = Actor.createActor<MEME_SERVICE>(memeInterface, {
    agent: agent,
    canisterId: MEME_CANISTER_ID,
  });
  return await memeActor!.mint(
    uuid,
    param.name,
    param.symbol,
    BigInt(1073000191 * 10 ** 8),
    param.logo,
    param.description,
    param.logoBase64,
  );
}

export async function getMemeList() {
  const agent = defaultAgent;

  if (APP_ENV !== Config.MAINNET) agent.fetchRootKey();

  const memeActor = Actor.createActor<MEME_SERVICE>(memeInterface, {
    agent: agent,
    canisterId: MEME_CANISTER_ID,
  });
  return await memeActor!.show_all_meme();
}

export async function queryTimeoutResult(uuid: string) {
  const agent = defaultAgent;

  if (APP_ENV !== Config.MAINNET) agent.fetchRootKey();

  const memeActor = Actor.createActor<MEME_SERVICE>(memeInterface, {
    agent: agent,
    canisterId: MEME_CANISTER_ID,
  });
  return await memeActor!.query_result(uuid);
}
