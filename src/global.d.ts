declare module 'config' {
  interface Config {
    ENV: string
    APP: {
      PORT: number
      HOST: string
      ROUTE: string
    }
  }

  const config: Config
  export = config
}
