package com.streetsa

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object RetrofitHelper {
    private const val baseUrl ="https://streetart2.herokuapp.com"

    fun getInstance(): Retrofit {
        return Retrofit.Builder().baseUrl(baseUrl +"/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }
}