package com.silentsync.app.receivers

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Build
import com.silentsync.app.services.LocationForegroundService

/**
 * On device reboot, restarts the foreground service so geofence monitoring
 * survives restarts. Cached zones are re-registered from the JS layer when the
 * app/service starts (MMKV holds the zone list).
 */
class BootReceiver : BroadcastReceiver() {
  override fun onReceive(context: Context, intent: Intent) {
    if (intent.action == Intent.ACTION_BOOT_COMPLETED ||
      intent.action == "android.intent.action.QUICKBOOT_POWERON"
    ) {
      val serviceIntent =
        Intent(context, LocationForegroundService::class.java)
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        context.startForegroundService(serviceIntent)
      } else {
        context.startService(serviceIntent)
      }
    }
  }
}
