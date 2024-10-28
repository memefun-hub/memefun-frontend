import { PinataSDK } from 'pinata';
import exp from 'node:constants';

export const PINATA_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxOTA5N2M1Ny00MzEyLTRjOGMtOGIxMy1jY2Y4NTA4NjBiZDgiLCJlbWFpbCI6InhsbTk1MTAyNEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMDY0ODUwYTYyN2ViMjJiNDk4ZTUiLCJzY29wZWRLZXlTZWNyZXQiOiJiYWUyMjQ3OWU0N2M5YmU1ZTUzYjFmNzhlMjVkNjA1YWQ1M2Y3MDNjODZjMzRiNDM4NDZkNDFjMGMyMDFiNGMxIiwiaWF0IjoxNzI1MjQ4NzM1fQ.fLrZVzeNFD_16n2EU17cvexh88Zn_4JbT88PmDVx1DA' ||
  process.env.PINATA_JWT;

export const PINATA_GATEWAY = process.env.PINATA_PRIVATE_GATEWAY!;

const pinata = new PinataSDK({
  pinataJwt: PINATA_JWT,
  pinataGateway: PINATA_GATEWAY,
});

export async function imageFileToIPFS(file: File) {
  const upload = await pinata.upload.file(file);
  console.log(upload);
  return upload.IpfsHash;
}
