import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigurationType } from './configuration.type';

@Injectable()
export class ConfigurationService {
  constructor(private readonly configService: ConfigService) {}

  get(): ConfigurationType {
    const app = this.configService.get<ConfigurationType['app']>('app');
    const db = this.configService.get<ConfigurationType['db']>('db');
    const password =
      this.configService.get<ConfigurationType['password']>('password');
    const http = this.configService.get<ConfigurationType['http']>('http');
    const caching =
      this.configService.get<ConfigurationType['caching']>('caching');
    const auth = this.configService.get<ConfigurationType['auth']>('auth');
    return {
      app,
      auth,
      caching,
      http,
      db,
      password,
    };
  }
}
