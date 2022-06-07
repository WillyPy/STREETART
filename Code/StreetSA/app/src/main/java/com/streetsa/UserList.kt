package com.streetsa

import okhttp3.ResponseBody
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Headers
import retrofit2.http.POST

data class UserList (
    val user_id: Int,
    val user_firstname: String,
    val user_lastname: String,
    val user_username: String,
    val user_email: String,
    val user_bdate: String,
    val user_gender: String
)
data class SignInBody(val user_username: String, val user_password: String)
interface UsersApi {
    @GET("/api/users")
    suspend fun getUsers(): Response<List<UserList>>

    @Headers("Content-Type:application/json")
    @POST("/api/users/login")
    suspend fun signin(@Body info: SignInBody): retrofit2.Call<ResponseBody>
}



