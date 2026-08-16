package com.silentsync.app.services

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.pm.ServiceInfo
import android.os.Build
import android.os.IBinder
import androidx.core.app.NotificationCompat
import com.silentsync.app.R

/**
 * Persistent foreground service that keeps the app process alive for reliable
 * background geofencing. Declares foregroundServiceType="location" (required
 * on Android 14+).
 */
class LocationForegroundService : Service() {

  companion object {
    private const val CHANNEL_ID = "location-service"
    private const val NOTIFICATION_ID = 4711
  }

  override fun onBind(intent: Intent?): IBinder? = null

  override fun onStartCommand(
    intent: Intent?,
    flags: Int,
    startId: Int
  ): Int {
    startAsForeground()
    return START_STICKY
  }

  private fun startAsForeground() {
    createChannel()
    val notification = NotificationCompat.Builder(this, CHANNEL_ID)
      .setContentTitle("SilentSync active")
      .setContentText("Monitoring your silent zones.")
      .setSmallIcon(R.drawable.ic_notification)
      .setOngoing(true)
      .setPriority(NotificationCompat.PRIORITY_LOW)
      .build()

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE) {
      startForeground(
        NOTIFICATION_ID,
        notification,
        ServiceInfo.FOREGROUND_SERVICE_TYPE_LOCATION
      )
    } else {
      startForeground(NOTIFICATION_ID, notification)
    }
  }

  private fun createChannel() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      val nm =
        getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
      nm.createNotificationChannel(
        NotificationChannel(
          CHANNEL_ID,
          "Background Monitoring",
          NotificationManager.IMPORTANCE_LOW
        )
      )
    }
  }
}
