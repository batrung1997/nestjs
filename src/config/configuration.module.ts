import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { ConfigurationService } from './configuration.service';

@Module({})
export class ConfigurationModule {
  static register(): DynamicModule {
    return {
      global: true,
      module: ConfigurationModule,
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      providers: [ConfigService, ConfigurationService],
      exports: [ConfigService, ConfigurationService],
    };
  }
}
