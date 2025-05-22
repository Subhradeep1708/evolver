import { TeacherAddForm } from '@/components/forms/TeacherAddForm'
import { TeacherFormTypes } from '@/types/form-types';
import React from 'react'

const EditTeacherPage = async({params}:{params:Promise<{ id: string }>}) => {
    const {id} = await params;
    console.log("EditTeacher ID:", id);
    let teacherData: TeacherFormTypes | null = null;
  return (
   <div>
              {teacherData ? (
                  <TeacherAddForm teacher={teacherData}/>
              ) : (
                  <div className="flex items-center justify-center h-screen">
                      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
                  </div>
              )}
          </div>
  )
}

export default EditTeacherPage