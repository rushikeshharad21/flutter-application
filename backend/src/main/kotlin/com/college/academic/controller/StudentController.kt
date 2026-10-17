package com.college.academic.controller

import com.college.academic.model.Student
import com.college.academic.repository.StudentRepository
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = ["http://localhost:5173"])
class StudentController(private val repo: StudentRepository) {

    @GetMapping
    fun getAll(): List<Student> = repo.findAll()

    @PostMapping
    fun add(@RequestBody student: Student): Student = repo.save(student)

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long) = repo.deleteById(id)
}