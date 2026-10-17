package com.college.academic.repository

import com.college.academic.model.Attendance
import org.springframework.data.jpa.repository.JpaRepository

interface AttendanceRepository : JpaRepository<Attendance, Long> {
    fun findByStudentUsername(studentUsername: String): List<Attendance>
}