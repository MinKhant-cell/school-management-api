import { PrismaClient, Gender, EmployeeRole, EmployeeStatus, CourseStatus  } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

function calculateDuration(start: Date, end: Date) {
  const diffMs = end.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const years = Math.floor(diffDays / 365);
  const months = Math.floor((diffDays % 365) / 30);
  const days = diffDays % 30;

  let result = '';
  if (years) result += `${years} year${years > 1 ? 's' : ''} `;
  if (months) result += `${months} month${months > 1 ? 's' : ''} `;
  if (!years && !months) result += `${days} day${days > 1 ? 's' : ''}`;

  return result.trim();
}

async function main() {
  const passwordHash = await bcrypt.hash('password', 10);

  // Create sample users
//   await prisma.user.createMany({
//   data: [
//     {
//       email: 'admin@example.com',
//       password: passwordHash,
//       name: 'Admin User',
//       role: 'admin',
//     },
//     {
//       email: 'john@example.com',
//       password: passwordHash,
//       name: 'John Doe',
//       role: 'user',
//     },
//     {
//       email: 'jane@example.com',
//       password: passwordHash,
//       name: 'Jane Smith',
//       role: 'user',
//     },
//   ],
//   // skipDuplicates: true, 
// });

//   const students = Array.from({ length: 100 }).map((_, i) => ({
//     name: `Student ${i + 1}`,
//     email: `student${i + 1}@example.com`,
//     date_of_birth: new Date(`200${Math.floor(i / 10)}-05-12`), // just random year pattern
//     gender: i % 2 === 0 ? Gender.FEMALE : Gender.MALE,
//   }));

// for (const student of students) {
//     await prisma.student.upsert({
//       where: { email: student.email },
//       update: {}, // do nothing if exists
//       create: student,
//     });
//   }

//   console.log('✅ Seeded 100 students');



  // const employees = Array.from({ length: 30 }).map((_, i) => {
  //   const gender = i % 2 === 0 ? Gender.MALE : Gender.FEMALE;
  //   const roleArray = [EmployeeRole.TEACHER, EmployeeRole.ADMIN, EmployeeRole.LIBRARIAN, EmployeeRole.JANITOR];
  //   const role = roleArray[i % roleArray.length];

  //   return {
  //     name: `Employee ${i + 1}`,
  //     email: `employee${i + 1}@school.com`,
  //     phone: `08000000${i + 1}`.padStart(10, '0'),
  //     date_of_birth: new Date(`198${i % 10}-0${(i % 9) + 1}-15`),
  //     gender,
  //     role,
  //     status: EmployeeStatus.AVAILABLE,
  //   };
  // });

  // for (const employee of employees) {
  //   await prisma.employee.upsert({
  //     where: { email: employee.email },
  //     update: {}, // do nothing if exists
  //     create: employee,
  //   });
  // }



  // for (const course of courses) {
  //   await prisma.course.upsert({
  //     where: { name: course.name },
  //     update: {}, // do nothing if exists
  //     create: course,
  //   });
  // }


  

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e)
    await prisma.$disconnect();
    process.exit(1);
  });
