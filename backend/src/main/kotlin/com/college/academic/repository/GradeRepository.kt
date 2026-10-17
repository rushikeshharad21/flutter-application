package com.college.academic.repository

import com.college.academic.model.Grade
import org.springframework.data.jpa.repository.JpaRepository

interface GradeRepository : JpaRepository<Grade, Long> {
    fun findByStudentUsername(studentUsername: String): List<Grade>
}