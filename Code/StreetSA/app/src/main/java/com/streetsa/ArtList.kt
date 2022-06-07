package com.streetsa

import retrofit2.Response
import retrofit2.http.GET

data class ArtList (
    val art_id: Int,
    val art_year: Int,
    val art_address: String,
    val art_state: String,
    val art_coords: Coords,
    val image_id: Int,
    val image_link: String,
    val art_fk_id: String
)
data class Coords(
    val x: Double,
    val y: Double
)
interface ArtsApi{
    @GET("/api/arts")
    suspend fun getArts(): Response<List<ArtList>>
}