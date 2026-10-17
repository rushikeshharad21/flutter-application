package com.college.academic.controller

import com.college.academic.model.Attendance
import com.college.academic.repository.AttendanceRepository
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/attendance")
class AttendanceController(private val repo: AttendanceRepository) {

    // सर्व attendance (admin/faculty साठी)
    @GetMapping
    fun getAll(): List<Attendance> = repo.findAll()

    // एका student ची attendance (Flutter app साठी)
    @GetMapping("/student/{username}")
    fun getByStudent(@PathVariable username: String): List<Attendance> =
        repo.findByStudentUsername(username)

    // नवीन attendance नोंद
    @PostMapping
    fun add(@RequestBody attendance: Attendance): Attendance =
        repo.save(attendance.copy(id = 0))

    // नोंद delete करा
    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long) = repo.deleteById(id)
}