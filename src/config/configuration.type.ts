export interface ConfigurationType {
  app: {
    domain: string;
    api_domain: string;
    media_domain: string;
    name: string;
    // forgot_password_url: string;
  };

  http: {
    host: string;
    port: number;
  };

  db: {
    main_mongodb: {
      uri: string;
    };
  };

  auth: {
    jwt: {
      secret: string;
      expires_in: string;
      refresh_token_expires_in: string;
    };
    facebook: {
      app_id: string;
      secret: string;
    };
  };

  password: {
    saltOrRounds: number;
  };

  caching: {
    redis: {
      prefix: string;
      host: string;
      port: number;
    };
  };
}
