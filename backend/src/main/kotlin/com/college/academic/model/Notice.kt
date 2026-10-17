package com.college.academic.model

import jakarta.persistence.*

@Entity
@Table(name = "notices")
data class Notice(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val title: String = "",
    @Column(length = 2000)
    val message: String = "",
    val date: String = "",        // उदा. "2026-10-17"
    val postedBy: String = ""     // उदा. "admin"
)