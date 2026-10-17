package com.college.academic.repository

import com.college.academic.model.Notice
import org.springframework.data.jpa.repository.JpaRepository

interface NoticeRepository : JpaRepository<Notice, Long> {
    fun findAllByOrderByIdDesc(): List<Notice>
}