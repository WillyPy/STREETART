package com.example.streetart

import android.Manifest
import android.content.pm.PackageManager
import android.graphics.Paint
import android.os.Bundle
import android.util.Log
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.google.android.material.snackbar.Snackbar
import androidx.appcompat.app.AppCompatActivity
import android.view.Menu
import android.view.MenuItem
import android.widget.Toast
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.mapbox.android.core.permissions.PermissionsManager
import com.mapbox.android.core.permissions.PermissionsListener
import com.mapbox.mapboxsdk.location.LocationComponent
import com.mapbox.mapboxsdk.location.modes.CameraMode
import com.mapbox.mapboxsdk.maps.OnMapReadyCallback
import com.mapbox.maps.MapView
import com.mapbox.maps.MapboxMap
import com.mapbox.maps.Style

class MainActivity : AppCompatActivity(){

    private var mapboxMap: MapboxMap? = null
    private var permissionsManager: PermissionsManager? = null
    private var locationComponent: LocationComponent? = null
    private var mapView: MapView? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setSupportActionBar(findViewById(R.id.toolbar))
        mapView= findViewById(R.id.mapView)
        mapView?.getMapboxMap()?.loadStyleUri(Style.MAPBOX_STREETS)

        findViewById<FloatingActionButton>(R.id.fab).setOnClickListener { view ->
            Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                    .setAction("Action", null).show()
        }
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        // Inflate the menu; this adds items to the action bar if it is present.
        menuInflater.inflate(R.menu.menu_main, menu)
        return true
    }

    /*private fun enableLocationComponent(loadedMapStyle: Style?){
        if(PermissionsManager.areLocationPermissionsGranted(this)){
            locationComponent = mapboxMap!!.locationComponent
            locationComponent!!.activateLocationComponent(this, loadedMapStyle!!)
            locationComponent!!.setLocationComponentEnabled(true)

            locationComponent!!.setCameraMode(CameraMode.TRACKING)
        }else{
            permissionsManager = PermissionsManager(this)
            permissionsManager!!.requestLocationPermissions(this)
        }
    }*/

   /* private fun onExplanationNeeded(permissionsToExplain: MutableList<String?>){
        Toast.makeText(this, R.string.user_location_permission_explanation, Toast.LENGTH_SHORT).show()
    }

    private fun onPermissionResult(granted: Boolean){
        if(granted){
            enableLocationComponent(mapboxMap!!.style)
        }else{
            Toast.makeText(this, R.string.user_location_permission_not_granted, Toast.LENGTH_SHORT).show()
            finish()
        }
    }*/

   /* private fun requestPermissionLauncher(){
        requestPermission(Manifest.permission.CAMERA)
    }

    private fun requestPermission(permission: String){
        when{
            ContextCompat.checkSelfPermission(
                    this,
                    permission
            ) == PackageManager.PERMISSION_GRANTED -> {
                Log.i("Kilo", "Permission previously granted")
            }
            ActivityCompat.shouldShowRequestPermissionRationale(
                    this,
                    permission
            ) ->
                Log.i("Kilo", "Show camera permissions dialog")
            else ->
                requestPermissionLauncher.launch(permission)
        }
    }*/

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
    }
    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            R.id.action_settings -> true
            else -> super.onOptionsItemSelected(item)
        }
    }

    override fun onStart() {
        super.onStart()
        mapView?.onStart()
    }

    override fun onStop() {
        super.onStop()
        mapView?.onStop()
    }

    override fun onLowMemory() {
        super.onLowMemory()
        mapView?.onLowMemory()
    }

    override fun onDestroy() {
        super.onDestroy()
        mapView?.onDestroy()
    }


}