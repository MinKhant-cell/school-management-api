import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { EmployeesModule } from './employees/employees.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [AuthModule, UsersModule, StudentsModule, EmployeesModule, CoursesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
