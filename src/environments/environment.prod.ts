export const environment = {
  production: true,
  // production: false,
  apiUrl: 'http://localhost:4000',
  baseUrl: 'http://localhost:9091',
  keycloak: {
    issuer: 'https://reg.beautech.biz/auth/',
    realm: 'accto',
    clientId: 'web-client',
  },
  ACCOUNT_NAME:"azlogviewer",
  SAS:"?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-10-04T16:38:36Z&st=2022-10-04T08:38:36Z&spr=https,http&sig=gaV5PJp3fsoq0TGS0VsWs9nY1IWs0GT%2BfxNOvSEPGmM%3D",
};
