import { BullModule } from '@nestjs/bull';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '@nestjs/schedule';
import { graphqlUploadExpress } from 'graphql-upload';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './config/configuration.module';
import { ConfigurationService } from './config/configuration.service';
import { AuthModule } from './modules/auth/auth.module';
import { FilesModule } from './modules/files/files.module';
import { QueuesModule } from './modules/queues/queues.module';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule,
    ConfigurationModule.register(),
    MongooseModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: async (configurationService: ConfigurationService) => ({
        uri: configurationService.get().db.main_mongodb.uri,
        retryWrites: false,
      }),
      inject: [ConfigurationService],
    }),
    GraphQLModule.forRootAsync({
      imports: [AuthModule, UsersModule],
      useFactory: async () => {
        return {
          context: ({ req, connection }) =>
            connection
              ? {
                  req: {
                    ...connection,
                    headers: connection.context,
                  },
                }
              : { req },
          uploads: false,
          installSubscriptionHandlers: true,
          subscriptions: {
            'graphql-ws': true,
            'subscriptions-transport-ws': {
              path: '/graphql',
            },
          },
          debug: true,
          tracing: true,
          playground: true,
          sortSchema: true,
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        };
      },
      inject: [],
    }),
    BullModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: async (configurationService: ConfigurationService) => ({
        redis: {
          host: 'localhost',
          port: 6379,
        },
        prefix: configurationService.get().caching.redis.prefix,
      }),
      inject: [ConfigurationService],
    }),
    ScheduleModule.forRoot(),
    SchedulesModule,
    SubscriptionsModule,
    PassportModule,
    AuthModule,
    FilesModule,
    QueuesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress()).forRoutes('graphql');
  }
}
