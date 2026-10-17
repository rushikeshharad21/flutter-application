package com.college.academic.controller

import com.college.academic.model.User
import com.college.academic.repository.UserRepository
import org.springframework.http.ResponseEntity
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.bind.annotation.*

data class LoginRequest(val username: String = "", val password: String = "")
data class LoginResponse(val username: String, val role: String)

@RestController
@RequestMapping("/api/auth")

class AuthController(private val repo: UserRepository) {

    private val encoder = BCryptPasswordEncoder()

    @PostMapping("/register")
    fun register(@RequestBody user: User): ResponseEntity<Any> {
        if (repo.findByUsername(user.username) != null)
            return ResponseEntity.badRequest().body("Username already exists")
        val saved = repo.save(user.copy(password = encoder.encode(user.password)!!))
        return ResponseEntity.ok(LoginResponse(saved.username, saved.role))
    }

    @PostMapping("/login")
    fun login(@RequestBody req: LoginRequest): ResponseEntity<Any> {
        val user = repo.findByUsername(req.username)
        if (user == null || !encoder.matches(req.password, user.password))
            return ResponseEntity.status(401).body("Invalid username or password")
        return ResponseEntity.ok(LoginResponse(user.username, user.role))
    }
}