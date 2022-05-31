package com.streetsa

import retrofit2.Response
import retrofit2.http.GET

data class UserList (
    val user_id: Int,
    val user_firstname: String,
    val user_lastname: String,
    val user_username: String,
    val user_email: String,
    val user_bdate: String,
    val user_gender: String
)

interface UsersApi {
    @GET("/api/users")
    suspend fun getUsers(): Response<List<UserList>>
}