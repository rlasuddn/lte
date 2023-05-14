import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { NotesModule } from './notes/notes.module';
import { SearchesModule } from './searches/searches.module';

@Module({
  imports: [UsersModule, QuizzesModule, NotesModule, SearchesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
