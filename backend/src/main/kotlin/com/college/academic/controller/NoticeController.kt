package com.college.academic.controller

import com.college.academic.model.Notice
import com.college.academic.repository.NoticeRepository
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/notices")
class NoticeController(private val repo: NoticeRepository) {

    // सर्व notices, नवीन आधी (सर्वांसाठी, Flutter app साठी)
    @GetMapping
    fun getAll(): List<Notice> = repo.findAllByOrderByIdDesc()

    // नवीन notice टाका (admin/faculty साठी)
    @PostMapping
    fun add(@RequestBody notice: Notice): Notice =
        repo.save(notice.copy(id = 0))

    // notice delete करा
    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long) = repo.deleteById(id)
}