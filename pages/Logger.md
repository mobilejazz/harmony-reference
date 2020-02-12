---
title: Logger
permalink: /logger/
---

# Logger

`Logger` is an interface that helps decouple client classes from concrete implementations of a logging system.

## Declaration

```swift
/// Information that gets logged can be labeled as one of the following informative labels.
@objc(MJLogLevel) public enum LogLevel: Int {
    case trace
    case debug
    case info
    case warning
    case error
    case fatal
}

/// Abstracts concrete implementations of a logger system.
@objc(MJLogger) public protocol Logger {
    
    /// Logs a String object using a given level
    ///
    /// - Parameters:
    ///   - level: Type of log.
    ///   - tag: An additional label to help categorise logs.
    ///   - message: The message to be logged.
    func log(level: LogLevel, tag: String?, message: String)
    
    /// Logs a key-value pair
    ///
    /// - Parameters:
    ///   - key: They key
    ///   - value: The value
    func log(key: String, value: Any?)
}
```

```kotlin
// Kotlin

enum class Level(val representation: String) {
  VERBOSE("VERBOSE"),
  DEBUG("DEBUG"),
  INFO("INFO"),
  WARNING("WARNING"),
  ERROR("ERROR")
}

/** Logs a String object using a given level.  */
fun log(level: Level, tag: String? = null, message: String)

/** Logs a String and Throwable object using a given level.  */
fun log(level: Level, throwable: Throwable, tag: String? = null, message: String)

/** Logs a key-value pair.  */
fun log(key: String, value: Any?)

/** Method to send issue to external servers or local files.  */
fun sendIssue(tag: String, message: String)

/** Sets a device detail with boolean type.  */
fun setDeviceBoolean(key: String, value: Boolean)

/** Sets a device detail with string type.  */
fun setDeviceString(key: String, value: String)

/** Sets a device detail with integer type.  */
fun setDeviceInteger(key: String, value: Int)

/** Sets a device detail with double type.  */
fun setDeviceFloat(key: String, value: Float)

/** Remove a device detail.  */
fun removeDeviceKey(key: String)

/** Get the device identifier generated.  */
val deviceIdentifier: String
```

## Usage

```swift
// Swift

#if DEBUG
    let logger = DeviceConsoleLogger()
#else
    let logger = BugfenderLogger() // This class is an example 
#endif

let manager = NetworkManager(logger) // This class is an example 
```

```kotlin
// Kotlin

val logger = if (BuildConfig.DEBUG) {
    AndroidLogger() or ConsoleLogger()
} else {
    BugfenderLogger() // This class is an example 
}

let manager = NetworkManager(logger) // This class is an example 
```

## Implementation

```swift
// MARK: - Default implementations
public extension Logger {
    /// Logs a String message using an info level.
    ///
    /// - Parameters:
    ///   - tag: An additional label to help categorise logs.
    ///   - message: String to be logged
    func info(tag: String? = nil, _ message: String) {
        self.log(level: .info, tag: tag, message: message)
    }

    /// Logs a String message using a warning level.
    ///
    /// - Parameters:
    ///   - tag: An additional label to help categorise logs.
    ///   - message: String to be logged
    func warning(tag: String? = nil, _ message: String) {
        self.log(level: .warning, tag: tag, message: message)
    }

    /// Logs a String message using an error level.
    ///
    /// - Parameters:
    ///   - tag: An additional label to help categorise logs.
    ///   - message: String to be logged
    func error(tag: String? = nil, _ message: String) {
        self.log(level: .error, tag: tag, message: message)
    }
}
```

```kotlin
// Kotlin

// Kotlin has default implementations for each log level.

  /** Log a verbose message with optional format args.  */
  fun v(tag: String, message: String, vararg args: Any) {
    this.log(Level.VERBOSE, tag, message)
  }

  /** Log a verbose exception and a message with optional format args.  */
  fun v(tag: String, t: Throwable, message: String, vararg args: Any) {
    this.log(Level.VERBOSE, t, tag, message)
  }

  /** Log a verbose message with optional format args without tag.  */
  fun v(message: String, vararg args: Any) {
    this.log(Level.VERBOSE, null, message)
  }

  /** Log a debug message with optional format args.  */
  fun d(tag: String, message: String, vararg args: Any) {
    this.log(Level.DEBUG, tag, message)
  }

  /** Log a debug exception and a message with optional format args.  */
  fun d(tag: String, t: Throwable, message: String, vararg args: Any) {
    this.log(Level.DEBUG, t, tag, message)
  }

    /** Log a debug message with optional format args.  */
  fun d(message: String, vararg args: Any) {
    this.log(Level.DEBUG, null, message)
  }

  ...

```

## Convenience loggers provided by the library

- DeviceConsoleLogger

```swift
// Swift

/// Prints to the system console
public class DeviceConsoleLogger: Logger {
    func log(level: LogLevel, tag: String?, message: String) {
        if let tag = tag {
            Swift.print("[\(levelStringRepresentation(of: level))] - TAG:\(tag), {\(message)}")
        } else {
            Swift.print("[\(levelStringRepresentation(of: level))], {\(message)}")
        }
    }
}

// MARK: - Helpers
private extension DeviceConsoleLogger {
    func levelStringRepresentation(of level: LogLevel) -> String {
        switch level
        {
            case .info:
                return "INFO"
            case .warning:
                return "WARNING"
            case .error:
                return "ERROR"
        }
    }
}
```

```kotlin
// Kotlin

class ConsoleLogger : Logger {

  override fun log(level: Logger.Level, tag: String?, message: String) {
    tag?.let {
      println("${level.representation} - [$it]: $message")
    } ?: println("${level.representation}: $message")
  }

  override fun log(level: Logger.Level, throwable: Throwable, tag: String?, message: String) {
    log(level, tag, message)
    throwable.printStackTrace()
  }

  override fun log(key: String, value: Any?) {
    value?.let {
      log(Logger.Level.INFO, "KEY", "$key: $it")
    } ?: log(Logger.Level.INFO, "KEY", "$key: null")
  }

  override fun sendIssue(tag: String, message: String) {
    this.log(Logger.Level.DEBUG, tag, message)
  }

  override fun setDeviceBoolean(key: String, value: Boolean) {
    this.log(Logger.Level.DEBUG, key, value.toString())
  }

  override fun setDeviceString(key: String, value: String) {
    this.log(Logger.Level.DEBUG, key, value)
  }

  override fun setDeviceInteger(key: String, value: Int) {
    this.log(Logger.Level.DEBUG, key, value.toString())
  }

  override fun setDeviceFloat(key: String, value: Float) {
    this.log(Logger.Level.DEBUG, key, value.toString())
  }

  override fun removeDeviceKey(key: String) {
    this.log(Logger.Level.DEBUG, "RemoveDeviceKey", key)
  }

  override val deviceIdentifier: String
    get() = ""
}
```

- Android Logger

```kotlin
// Kotlin

open class AndroidLogger : Logger {

  companion object {
    private const val MAX_TAG_LENGTH = 23
    private val ANONYMOUS_CLASS = Pattern.compile("(\\$\\d+)+$")
  }

  override fun log(level: Logger.Level, tag: String?, message: String) {
    val tag = tag ?: createClassTag()
    if (BuildConfig.DEBUG) {
      when (level) {
        Logger.Level.VERBOSE -> Log.v(tag, message)
        Logger.Level.DEBUG -> Log.d(tag, message)
        Logger.Level.INFO -> Log.i(tag, message)
        Logger.Level.WARNING -> Log.w(tag, message)
        Logger.Level.ERROR -> Log.e(tag, message)
      }
    }
  }

  override fun log(level: Logger.Level, throwable: Throwable, tag: String?, message: String) {
    val tag = tag ?: createClassTag()
    if (BuildConfig.DEBUG) {
      when (level) {
        Logger.Level.VERBOSE -> Log.v(tag, message, throwable)
        Logger.Level.DEBUG -> Log.d(tag, message, throwable)
        Logger.Level.INFO -> Log.i(tag, message, throwable)
        Logger.Level.WARNING -> Log.w(tag, message, throwable)
        Logger.Level.ERROR -> Log.e(tag, message, throwable)
      }
    }
  }

  override fun log(key: String, value: Any?) {
    value?.let {
      log(Logger.Level.INFO, "KEY", "$key: $it")
    } ?: log(Logger.Level.INFO, "KEY", "$key: null")
  }

  override fun sendIssue(tag: String, message: String) {
    log(Logger.Level.DEBUG, tag, message)
  }

  override fun setDeviceBoolean(key: String, value: Boolean) {
    log(Logger.Level.DEBUG, key, value.toString())
  }

  override fun setDeviceString(key: String, value: String) {
    log(Logger.Level.DEBUG, key, value)
  }

  override fun setDeviceInteger(key: String, value: Int) {
    log(Logger.Level.DEBUG, key, value.toString())
  }

  override fun setDeviceFloat(key: String, value: Float) {
    log(Logger.Level.DEBUG, key, value.toString())
  }

  override fun removeDeviceKey(key: String) {
    log(Logger.Level.DEBUG, key, "RemoveDeviceKey")
  }

  override val deviceIdentifier: String
    get() = ""

  private fun createClassTag(): String? {
    val ignoreClass = listOf(
        AndroidLogger::class.java.name,
        Logger::class.java.name
    )
    val stackTraceElement: StackTraceElement = Throwable().stackTrace
        .first { it.className !in ignoreClass && !it.className.contains("DefaultImpls") }
    var tag = stackTraceElement.className.substringAfterLast('.')
    val m = ANONYMOUS_CLASS.matcher(tag)
    if (m.find()) {
      tag = m.replaceAll("")
    }
    // Tag length limit was removed in API 24.
    return if (tag.length <= MAX_TAG_LENGTH || Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
      tag
    } else {
      tag.substring(0, MAX_TAG_LENGTH)
    }
  }
}
```