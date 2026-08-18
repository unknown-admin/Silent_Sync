package com.silentsync.app.modules.ringer

import android.app.NotificationManager
import android.content.Context
import android.content.Intent
import android.media.AudioManager
import android.provider.Settings
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

/**
 * Controls the device ringer mode via AudioManager.
 * Exposed to JS as `RingerModeModule` (see soundManager.ts).
 */
class RingerModeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "RingerModeModule"

  private val audioManager: AudioManager
    get() = reactApplicationContext
      .getSystemService(Context.AUDIO_SERVICE) as AudioManager

  private val notificationManager: NotificationManager
    get() = reactApplicationContext
      .getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

  @ReactMethod
  fun setRingerMode(mode: String, promise: Promise) {
    try {
      // Changing to/from silent requires DND access on Android 6+.
      if (!notificationManager.isNotificationPolicyAccessGranted &&
        (mode == "silent" || mode == "vibrate")
      ) {
        promise.reject("NO_DND_PERMISSION", "Do Not Disturb access not granted")
        return
      }
      val ringerMode = when (mode) {
        "silent" -> AudioManager.RINGER_MODE_SILENT
        "vibrate" -> AudioManager.RINGER_MODE_VIBRATE
        "normal" -> AudioManager.RINGER_MODE_NORMAL
        else -> AudioManager.RINGER_MODE_NORMAL
      }
      audioManager.ringerMode = ringerMode
      promise.resolve(true)
    } catch (e: Exception) {
      promise.reject("SET_RINGER_ERROR", e.message, e)
    }
  }

  @ReactMethod
  fun getRingerMode(promise: Promise) {
    val mode = when (audioManager.ringerMode) {
      AudioManager.RINGER_MODE_SILENT -> "silent"
      AudioManager.RINGER_MODE_VIBRATE -> "vibrate"
      else -> "normal"
    }
    promise.resolve(mode)
  }

  @ReactMethod
  fun hasDNDPermission(promise: Promise) {
    promise.resolve(notificationManager.isNotificationPolicyAccessGranted)
  }

  @ReactMethod
  fun openDNDSettings() {
    val intent = Intent(Settings.ACTION_NOTIFICATION_POLICY_ACCESS_SETTINGS)
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
    reactApplicationContext.startActivity(intent)
  }
}
