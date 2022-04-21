package com.example.streetart.api

import com.example.streetart.model.users
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Query

interface streetartApi {

    @GET("/users")
    suspend fun getUsers() : Response<users>
}