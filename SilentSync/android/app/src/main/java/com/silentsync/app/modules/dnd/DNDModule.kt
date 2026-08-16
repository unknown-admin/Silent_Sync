package com.silentsync.app.modules.dnd

import android.app.NotificationManager
import android.content.Context
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

/**
 * Controls Do Not Disturb interruption filter via NotificationManager.
 */
class DNDModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "DNDModule"

  private val notificationManager: NotificationManager
    get() = reactApplicationContext
      .getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

  @ReactMethod
  fun setInterruptionFilter(filter: String, promise: Promise) {
    try {
      if (!notificationManager.isNotificationPolicyAccessGranted) {
        promise.reject("NO_DND_PERMISSION", "DND access not granted")
        return
      }
      val value = when (filter) {
        "none" -> NotificationManager.INTERRUPTION_FILTER_NONE
        "priority" -> NotificationManager.INTERRUPTION_FILTER_PRIORITY
        "alarms" -> NotificationManager.INTERRUPTION_FILTER_ALARMS
        else -> NotificationManager.INTERRUPTION_FILTER_ALL
      }
      notificationManager.setInterruptionFilter(value)
      promise.resolve(true)
    } catch (e: Exception) {
      promise.reject("DND_ERROR", e.message, e)
    }
  }

  @ReactMethod
  fun getInterruptionFilter(promise: Promise) {
    val filter = when (notificationManager.currentInterruptionFilter) {
      NotificationManager.INTERRUPTION_FILTER_NONE -> "none"
      NotificationManager.INTERRUPTION_FILTER_PRIORITY -> "priority"
      NotificationManager.INTERRUPTION_FILTER_ALARMS -> "alarms"
      else -> "all"
    }
    promise.resolve(filter)
  }
}
