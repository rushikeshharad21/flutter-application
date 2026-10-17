package com.college.academic.controller

import com.college.academic.repository.AttendanceRepository
import com.college.academic.repository.CourseRepository
import com.college.academic.repository.StudentRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

data class StatsResponse(
    val totalStudents: Long,
    val totalCourses: Long,
    val avgAttendance: Double
)

@RestController
@RequestMapping("/api/stats")
class StatsController(
    private val studentRepo: StudentRepository,
    private val courseRepo: CourseRepository,
    private val attendanceRepo: AttendanceRepository
) {

    @GetMapping
    fun getStats(): StatsResponse {
        val all = attendanceRepo.findAll()
        val avg = if (all.isEmpty()) 0.0
        else Math.round(all.count { it.status == "PRESENT" } * 1000.0 / all.size) / 10.0

        return StatsResponse(
            totalStudents = studentRepo.count(),
            totalCourses = courseRepo.count(),
            avgAttendance = avg
        )
    }
}