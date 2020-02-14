---
title: Logger
permalink: /logger/
---

# Logger

`Logger` is an interface that helps decouple client classes from concrete implementations of a logging system.

## Usage

```TypeScript
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

```TypeScript
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

There are two main methods:

```TypeScript
// TypeScript
interface Logger {
    logKeyValue(key: string, value: any): void;

    log(level: LogLevel, message: string): void;
    log(level: LogLevel, tag: string, message: string): void;
}
```

- `logKeyValue`: logs a key-value pair.
- `log`: method has two signatures, the difference being an optional `tag` parameter.

### Alias methods

There are also few alias methods available, one for each log level, all of them with an optional first parameter: `tag`.

```TypeScript
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
