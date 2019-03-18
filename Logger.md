# Logger

`Logger` is an interface that helps decouple client classes from concrete implementations of a logging system.

## Declaration

```swift
public enum LogLevel {
    case info
    case warning
    case error
}

public protocol Logger {
  func log(_ level: LogLevel, tag: String, message: String)
}
```

```kotlin
// Kotlin
TODO
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

## Implementation

```swift
// Swift
/// Information that gets logged can be labeled as one of the following informative labels.
public enum LogLevel {
    case info
    case warning
    case error
}

/// Abstracts concrete implementations of a logger system.
public protocol Logger {
    
    /// Logs a String object using a given level
    ///
    /// - Parameters:
    ///   - level: Type of log.
    ///   - tag: An additional label to help categorise logs.
    ///   - message: The message to be logged.
    func log(level: LogLevel, tag: String?, message: String)
}

// MARK: - Default implementations
public extension Logger {
    
    /// Logs a String message using an info level.
    ///
    /// - Parameters:
    ///   - tag: An additional label to help categorise logs.
    ///   - message: String to be logged
    func print(tag: String? = nil, _ message: String) {
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
## Convenience loggers provided by the library

- DeviceConsoleLogger

```swift
// Swift

/// Prints to the system console
public class DeviceConsoleLogger: Logger {

    public func log(_ level: LogLevel, tag: String?, _ message: String) {
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
TODO
```
