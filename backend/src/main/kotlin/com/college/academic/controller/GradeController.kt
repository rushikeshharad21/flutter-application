package com.college.academic.controller

import com.college.academic.model.Grade
import com.college.academic.repository.GradeRepository
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/grades")
class GradeController(private val repo: GradeRepository) {

 
    @GetMapping
    fun getAll(): List<Grade> = repo.findAll()

    @GetMapping("/student/{username}")
    fun getByStudent(@PathVariable username: String): List<Grade> =
        repo.findByStudentUsername(username)

    @PostMapping
    fun add(@RequestBody grade: Grade): Grade =
        repo.save(grade.copy(id = 0))

   
    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long) = repo.deleteById(id)
}