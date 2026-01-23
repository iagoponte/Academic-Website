/**
 @openapi
 components:
   schemas:

     AssignTeacher:
       type: object
       required:
         - classId
         - teacherId
       properties:
         classId:
           type: string
           format: uuid
           example: 8a1b2c3d-4e5f-6789-abcd-1234567890ef
         teacherId:
           type: string
           format: uuid
           example: d1e2f3a4-b5c6-7890-abcd-ef1234567890

     ClassTeacherAssignmentResponse:
       type: object
       properties:
         message:
           type: string
           example: Teacher assigned successfully

     ErrorResponse:
       type: object
       properties:
         statusCode:
           type: number
           example: 400
         error:
           type: string
           example: Bad Request
         message:
           type: string
           example: Teacher already assigned to this class
 */
