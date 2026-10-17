package com.college.academic.controller

import com.college.academic.model.Course
import com.college.academic.repository.CourseRepository
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = ["http://localhost:5173"])
class CourseController(private val repo: CourseRepository) {

    @GetMapping
    fun getAll(): List<Course> = repo.findAll()

    @PostMapping
    fun add(@RequestBody course: Course): Course = repo.save(course)

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long) = repo.deleteById(id)
}