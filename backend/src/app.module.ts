import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuditModule } from './audit/audit.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audit } from './audit/entities/audit.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'ai_agent_tool',
      entities: [
        Audit
      ],
      synchronize: true,
    }),
    AuditModule
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule { }
