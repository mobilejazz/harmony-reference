---
title: Logger
permalink: /logger/
---

# Logger

`Logger` is an interface that helps decouple client classes from concrete implementations of a logging system.

## Usage

```kotlin
// Kotlin

val logger = if (BuildConfig.DEBUG) {
    AndroidLogger() or ConsoleLogger()
} else {
    BugfenderLogger() // This class is an example 
}

val manager = NetworkManager(logger) // This class is an example 
```

```swift
// Swift

#if DEBUG
    let logger = DeviceConsoleLogger()
#else
    let logger = BugfenderLogger() // This class is an example 
#endif

let manager = NetworkManager(logger) // This class is an example 
```

```typescript
// TypeScript

let logger: Logger;

if (isDebug) {
    logger = new DeviceConsoleLogger();
} else {
    logger = new BugfenderLogger(/* ... */); // This class is an example
}

const manager = new NetworkManager(logger); // This class is an example

// Later in NetworkManager
this.logger.info('Charging flux capacitor');
this.logger.logKeyValue('foo', 'bar');
this.logger.log(LogLevel.Debug, 'network', 'Communication wires deployed');
```

## Log Levels

The logger defines the following log levels (by increasing severity):

```kotlin
// Kotlin

enum class Level(val representation: String) {
  VERBOSE("VERBOSE"),
  DEBUG("DEBUG"),
  INFO("INFO"),
  WARNING("WARNING"),
  ERROR("ERROR")
}
```

```swift
// Swift

/// Information that gets logged can be labeled as one of the following informative labels.
@objc(MJLogLevel) public enum LogLevel: Int {
    case trace
    case debug
    case info
    case warning
    case error
    case fatal
}
```

```typescript
// TypeScript

enum LogLevel {
    Trace,
    Debug,
    Info,
    Warning,
    Error,
    Fatal,
}
```

## API

```kotlin
// Kotlin

  /** Logs a String object using a given level.  */
  fun log(level: Level, tag: String? = null, message: String)

  /** Logs a String and Throwable object using a given level.  */
  fun log(level: Level, throwable: Throwable, tag: String? = null, message: String)

  /** Logs a key-value pair.  */
  fun log(key: String, value: Any?)

  /** Method to send issue to external servers or local files.  */
  funendIssue(tag: String, message: String)

  /** Sets a device detail with boolean type.  */
  fun setDeviceBoolean(key: String, value: Boolean)

  /** Sets a device detail with string type.  */
  fun setDeviceString(key: String, value: String)

  /** Sets a device detail with integer type.  */
  funetDeviceInteger(key: String, value: Int)

  /** Sets a device detail with double type.  */
  fun setDeviceFloat(key: String, value: Float)

  /** Remove a device detail.  */
  fun removeDeviceKey(key: String)

  /** Get the device identifier generated.  */
  val deviceIdentifier: String
```

```swift
// Swift

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

```typescript
// TypeScript

interface Logger {
    logKeyValue(key: string, value: any): void;

    log(level: LogLevel, message: string): void;
    log(level: LogLevel, tag: string, message: string): void;
}
```
- `logKeyValue`: logs a key-value pair.
- `log`: method has two signatures, the difference being an optional `tag` parameter.

### Default implementations

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

  ...

```

```swift
// Swift

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

### Alias methods (Typescript)

There are also few alias methods available, one for each log level, all of them with an optional first parameter: `tag`.
```typescript
// TypeScript

interface Logger {
    trace(message: string): void;
    trace(tag: string, message: string): void;

    debug(message: string): void;
    debug(tag: string, message: string): void;

    info(message: string): void;
    info(tag: string, message: string): void;

    warning(message: string): void;
    warning(tag: string, message: string): void;

    error(message: string): void;
    error(tag: string, message: string): void;

    fatal(message: string): void;
    fatal(tag: string, message: string): void;
}
```

## Default implementations

- `DeviceConsoleLogger`: Logs to the device console.
- `VoidLogger`: Ignores the logs, does nothing with them.

### TypeScript exclusive

- `AbstractLogger`: an abstract logger is available to use as the base class for the logger implementations.

### Kotlin exclusive

- `AndroidLogger`: Uses Log.X from Android framework and can create tags on the fly

