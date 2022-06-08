package com.streetsa

import android.Manifest
import android.annotation.SuppressLint
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Color
import android.location.Location
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices

import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.CameraPosition
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import com.google.android.gms.maps.model.PolylineOptions
import com.maps.route.extensions.drawMarker
import com.maps.route.extensions.drawRouteOnMap
import com.maps.route.extensions.moveCameraOnMap
import com.streetsa.databinding.ActivityMapsBinding
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch

class MapsActivity : AppCompatActivity(), OnMapReadyCallback {

    private lateinit var mMap: GoogleMap
    private lateinit var binding: ActivityMapsBinding
    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private var locationPermissionGranted = false
    private val PERMISSIONS_REQUEST_ACCESS_FINE_LOCATION = 1
    private val KEY_CAMERA_POSITION = "Camera_position"
    private val KEY_LOCATION = "location"
    private var cameraPosition: CameraPosition? = null
    private var lastKnownLocation: Location? = null


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMapsBinding.inflate(layoutInflater)
        setContentView(binding.root)

        if(savedInstanceState != null){
            lastKnownLocation = savedInstanceState.getParcelable(KEY_LOCATION)
            cameraPosition = savedInstanceState.getParcelable(KEY_CAMERA_POSITION)
        }

        val toLogin = findViewById<Button>(R.id.login)
        toLogin.setOnClickListener {
            val intent = Intent(this, LoginActivity::class .java)
            startActivity(intent)
        }
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)
        val createRoute = findViewById<Button>(R.id.route)
        createRoute.setOnClickListener {
            val options = PolylineOptions()
            options.color(Color.RED)
            options.width(5f)
            mMap.run {
                //if you want to move the map on specific location
                moveCameraOnMap(latLng = LatLng(38.7065681,-9.1519146))
                drawRouteOnMap(
                    getString(R.string.google_map_api_key),//your API key
                    context = applicationContext, //Activity context
                    source = LatLng(38.7065681,-9.1519146), // Source from where you want to draw path
                    destination =  LatLng(38.789169, -9.190097) // destination to where you want to draw path

                )
            }}

        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        val mapFragment = supportFragmentManager
            .findFragmentById(R.id.map) as SupportMapFragment
        mapFragment.getMapAsync(this)
    }

    override fun onSaveInstanceState(outState: Bundle) {
        mMap.let { mMap ->
            outState.putParcelable(KEY_CAMERA_POSITION, mMap.cameraPosition)
            outState.putParcelable(KEY_LOCATION, lastKnownLocation)
        }
        super.onSaveInstanceState(outState)
    }
    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap
        val iade = LatLng(38.7065681,-9.1519146)
        val artsApi = RetrofitHelper.getInstance().create(ArtsApi::class.java)
        val zoomLevel = 15f

        GlobalScope.launch(Dispatchers.Main) {
            val result = artsApi.getArts()
            //Log.d("Art: ", result.body().toString())
            if(result.body() != null){
                val arts = result.body()
                for(art in arts!!){
                    val artPosition = LatLng(art.art_coords.x,art.art_coords.y)
                    //Log.d("coord: ", artPosition.toString())
                    mMap.addMarker(MarkerOptions().title(art.art_address).position(artPosition))
                    mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(iade, zoomLevel))
                }
            }
        }
        getLocationPermission()
    }

    private fun getLocationPermission(){
        if(ContextCompat.checkSelfPermission(this.applicationContext, Manifest.permission.ACCESS_FINE_LOCATION)
            == PackageManager.PERMISSION_GRANTED){
            locationPermissionGranted = true
        }else{
            ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.ACCESS_FINE_LOCATION), PERMISSIONS_REQUEST_ACCESS_FINE_LOCATION)
        }
        updateLocationUI()
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<String>,
        grantResults: IntArray
    ) {
        locationPermissionGranted = false
        when(requestCode){
            PERMISSIONS_REQUEST_ACCESS_FINE_LOCATION -> {
                if(grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_DENIED){
                    locationPermissionGranted = true
                }
            }
            else -> super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        }

    }
    @SuppressLint("MissingPermission")
    private fun updateLocationUI(){
        if(mMap==null){
            return
        }
        try {
            if (locationPermissionGranted) {
                mMap.isMyLocationEnabled = true
                mMap.uiSettings.isMyLocationButtonEnabled = true
                mMap.uiSettings.isZoomControlsEnabled=true
                mMap.uiSettings.isCompassEnabled=true
            } else {
                mMap.isMyLocationEnabled = false
                mMap.uiSettings.isMyLocationButtonEnabled = false
                lastKnownLocation = null
                getLocationPermission()
            }
        }catch (e: SecurityException){
            Log.e("Exception: %s", e.message, e)
        }
    }
}