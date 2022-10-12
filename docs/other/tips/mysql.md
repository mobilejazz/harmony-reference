---
title: Tips and Tricks for MySQL and MariaDB
sidebar_label: MySQL and MariaDB
---

## MySQL

### Float precision

When using SUM() function in SQL, the result “sometimes” is not as expected. There is a minor precision error.

* Example: `124` entries with the value `40,333`
* Expected sum: `5001`, `3292`
* Received result: `5001`, `3331`

From [MySQL Documentation](https://dev.mysql.com/doc/refman/8.0/en/problems-with-float.html):

> Floating-point numbers sometimes cause confusion because they are **approximate** and **not** stored as **exact** values. A floating-point value as written in an SQL statement may not be the same as the value represented internally. Attempts to treat floating-point values as exact in comparisons may lead to problems. They are also subject to platform or implementation dependencies. The **FLOAT** and **DOUBLE** data types are **subject to these issues**.

Solution from [MySQL Documentation](https://dev.mysql.com/doc/refman/8.0/en/fixed-point-types.html):
Use `DECIMAL` type to store the exact value.

> For **DECIMAL** columns, MySQL performs operations with a precision of **65 decimal digits**, which should solve most common inaccuracy problems.


## MariaDB

### Behavior of first Timestamp Column

Notice that in a table, the first column of type `TIMESTAMP` will act as `UPDATED_AT` column by default.

From [MariaDB Documentation](https://mariadb.com/kb/en/timestamp/#automatic-values):

> MariaDB has special behavior for the first column that uses the `TIMESTAMP` data type in a specific table. For the first column that uses the `TIMESTAMP` data type in a specific table, MariaDB automatically assigns the following properties to the column:
> 
>     DEFAULT CURRENT_TIMESTAMP
>     ON UPDATE CURRENT_TIMESTAMP
> 
> This means that if the column is not explicitly assigned a value in an `INSERT` or `UPDATE` query, then MariaDB will automatically initialize the column's value with the current date and time.
