package com.college.academic.model

import jakarta.persistence.*

@Entity
@Table(name = "grades")
data class Grade(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val studentUsername: String = "",
    val subject: String = "",
    val marks: Int = 0,        // मिळालेले गुण
    val maxMarks: Int = 100,   // एकूण गुण
    val grade: String = ""     // उदा. "A", "B+"
)