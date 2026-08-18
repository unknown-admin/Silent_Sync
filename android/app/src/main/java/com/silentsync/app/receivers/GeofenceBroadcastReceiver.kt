package com.silentsync.app.receivers

import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.media.AudioManager
import android.os.Build
import androidx.core.app.NotificationCompat
import com.google.android.gms.location.Geofence
import com.google.android.gms.location.GeofencingEvent
import com.silentsync.app.R

/**
 * Receives geofence ENTER/EXIT transitions, changes the ringer mode and posts
 * a local notification. Runs even when the app process is backgrounded.
 */
class GeofenceBroadcastReceiver : BroadcastReceiver() {

  companion object {
    const val ACTION_GEOFENCE_EVENT =
      "com.silentsync.app.action.GEOFENCE_EVENT"
    private const val CHANNEL_ID = "geofence-events"
  }

  override fun onReceive(context: Context, intent: Intent) {
    val event = GeofencingEvent.fromIntent(intent) ?: return
    if (event.hasError()) {
      return
    }

    val transition = event.geofenceTransition
    val audioManager =
      context.getSystemService(Context.AUDIO_SERVICE) as AudioManager
    val triggering = event.triggeringGeofences ?: return

    when (transition) {
      Geofence.GEOFENCE_TRANSITION_ENTER -> {
        audioManager.ringerMode = AudioManager.RINGER_MODE_SILENT
        notify(context, "Entered a silent zone", "Sound set to silent.")
      }
      Geofence.GEOFENCE_TRANSITION_EXIT -> {
        audioManager.ringerMode = AudioManager.RINGER_MODE_NORMAL
        notify(context, "Left a silent zone", "Sound restored to normal.")
      }
    }

    triggering.forEach { /* per-zone handling hook */ }
  }

  private fun notify(context: Context, title: String, body: String) {
    val nm =
      context.getSystemService(Context.NOTIFICATION_SERVICE)
        as NotificationManager
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      nm.createNotificationChannel(
        NotificationChannel(
          CHANNEL_ID,
          "Zone Events",
          NotificationManager.IMPORTANCE_HIGH
        )
      )
    }
    val notification = NotificationCompat.Builder(context, CHANNEL_ID)
      .setSmallIcon(R.drawable.ic_notification)
      .setContentTitle(title)
      .setContentText(body)
      .setAutoCancel(true)
      .setPriority(NotificationCompat.PRIORITY_HIGH)
      .build()
    nm.notify(System.currentTimeMillis().toInt(), notification)
  }
}
