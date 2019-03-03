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
  func print(tag: String, message: String)
  func warning(tag: String, message: String) 
  func error(tag: String, message: String)
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
  let logger = DeviceConsoleLogger() // This class is an example
#else
  let logger = BugfenderLogger() // This class is an example 
#endif

let manager = NetworkManager(logger) // This class is an example 

```

## Implementation

```swift
// Swift
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
    func log(_ level: LogLevel, tag: String, message: String)
    
    /// Logs a String object using an info level.
    ///
    /// - Parameters:
    ///   - tag: An additional label to help categorise logs.
    ///   - message: The message to be logged.
    func print(tag: String, message: String)
    
    /// Logs a String object using a warning level.
    ///
    /// - Parameters:
    ///   - tag: An additional label to help categorise logs.
    ///   - message: The message to be logged.
    func warning(tag: String, message: String)
    
    /// Logs a String object using an error level.
    ///
    /// - Parameters:
    ///   - tag: An additional label to help categorise logs.
    ///   - message: The message to be logged.
    func error(tag: String, message: String)
}

// MARK: - Default implementations
public extension Logger {
    
    func print(tag: String, message: String) {
        self.log(.info, tag: tag, message: message)
    }
    
    func warning(tag: String, message: String) {
        self.log(.warning, tag: tag, message: message)
    }
    
    func error(tag: String, message: String) {
        self.log(.error, tag: tag, message: message)
    }
}
```

```kotlin
// Kotlin
TODO
```
