package com.silentsync.app.modules.geofence

import android.annotation.SuppressLint
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Arguments
import com.google.android.gms.location.Geofence
import com.google.android.gms.location.GeofencingClient
import com.google.android.gms.location.GeofencingRequest
import com.google.android.gms.location.LocationServices
import com.silentsync.app.receivers.GeofenceBroadcastReceiver

/**
 * Registers / unregisters geofences with the Google Play Services Geofencing
 * API. Trigger events are delivered to GeofenceBroadcastReceiver.
 */
class GeofenceModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "GeofenceModule"

  private val geofencingClient: GeofencingClient by lazy {
    LocationServices.getGeofencingClient(reactApplicationContext)
  }

  private val registeredIds = mutableSetOf<String>()

  private val geofencePendingIntent: PendingIntent by lazy {
    val intent = Intent(
      reactApplicationContext,
      GeofenceBroadcastReceiver::class.java
    ).apply { action = GeofenceBroadcastReceiver.ACTION_GEOFENCE_EVENT }
    PendingIntent.getBroadcast(
      reactApplicationContext,
      0,
      intent,
      PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_MUTABLE
    )
  }

  @SuppressLint("MissingPermission")
  @ReactMethod
  fun registerGeofence(
    id: String,
    lat: Double,
    lng: Double,
    radius: Double,
    promise: Promise
  ) {
    try {
      val geofence = Geofence.Builder()
        .setRequestId(id)
        .setCircularRegion(lat, lng, radius.toFloat())
        .setExpirationDuration(Geofence.NEVER_EXPIRE)
        .setTransitionTypes(
          Geofence.GEOFENCE_TRANSITION_ENTER or
            Geofence.GEOFENCE_TRANSITION_EXIT
        )
        .build()

      val request = GeofencingRequest.Builder()
        .setInitialTrigger(GeofencingRequest.INITIAL_TRIGGER_ENTER)
        .addGeofence(geofence)
        .build()

      geofencingClient.addGeofences(request, geofencePendingIntent)
        .addOnSuccessListener {
          registeredIds.add(id)
          promise.resolve(true)
        }
        .addOnFailureListener { e ->
          promise.reject("GEOFENCE_ADD_FAILED", e.message, e)
        }
    } catch (e: SecurityException) {
      promise.reject("NO_LOCATION_PERMISSION", e.message, e)
    }
  }

  @ReactMethod
  fun unregisterGeofence(id: String, promise: Promise) {
    geofencingClient.removeGeofences(listOf(id))
      .addOnSuccessListener {
        registeredIds.remove(id)
        promise.resolve(true)
      }
      .addOnFailureListener { e ->
        promise.reject("GEOFENCE_REMOVE_FAILED", e.message, e)
      }
  }

  @ReactMethod
  fun unregisterAllGeofences(promise: Promise) {
    geofencingClient.removeGeofences(geofencePendingIntent)
      .addOnSuccessListener {
        registeredIds.clear()
        promise.resolve(true)
      }
      .addOnFailureListener { e ->
        promise.reject("GEOFENCE_REMOVE_ALL_FAILED", e.message, e)
      }
  }

  @ReactMethod
  fun getRegisteredGeofences(promise: Promise) {
    val array = Arguments.createArray()
    registeredIds.forEach { array.pushString(it) }
    promise.resolve(array)
  }
}
