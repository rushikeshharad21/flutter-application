package com.college.academic.controller

import com.college.academic.model.Grade
import com.college.academic.repository.GradeRepository
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/grades")
class GradeController(private val repo: GradeRepository) {

    // सर्व grades (admin/faculty साठी)
    @GetMapping
    fun getAll(): List<Grade> = repo.findAll()

    // एका student चे grades (Flutter app साठी)
    @GetMapping("/student/{username}")
    fun getByStudent(@PathVariable username: String): List<Grade> =
        repo.findByStudentUsername(username)

    // नवीन grade नोंद
    @PostMapping
    fun add(@RequestBody grade: Grade): Grade =
        repo.save(grade.copy(id = 0))

    // नोंद delete करा
    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long) = repo.deleteById(id)
}