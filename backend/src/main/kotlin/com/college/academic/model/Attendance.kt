package com.college.academic.model

import jakarta.persistence.*

@Entity
@Table(name = "attendance")
data class Attendance(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val studentUsername: String = "",
    val subject: String = "",
    val date: String = "",      // उदा. "2026-10-17"
    val status: String = ""     // "PRESENT" किंवा "ABSENT"
)