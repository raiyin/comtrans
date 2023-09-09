package com.publicmaders.comtrans

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface RetrofitAPI {
    @POST("location")
    fun postData(@Body locationDetails: LocationDetails): Call<LocationDetails?>?
}
