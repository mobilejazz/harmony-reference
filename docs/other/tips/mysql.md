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

### Debug Strange Characters

Sometimes it can happen that the data saved contains strange characters because of charset configuration issues.

A way to see the real content of a column with this problem is the function `HEX(column)`.

### Charset Configuration

> TL;DR → Use always `utf8mb4` everywhere

Originally MySQL used a UTF8 format based on 3 bytes instead of 4 to have a better performance. The problem is that with 3 bytes you can’t store all the characters, for example emojis.

MySql have many places where you can configure a charset, double check always that you are using the same:

* Database CHARACTER
* Database COLLATE
* Table CHARACTER
* Table COLLATE
* Column CHARACTER
* Column COLLATE
* Client CHARSET
* Server CHARSET

> **Character or Charset** means how we store the data in the DB
> 
> **Collate or Collation** means how we will fetch, order and serve the Data. So, if you don't use the same 
> configuration of the Charset, MySQL will do a real-time transformation of the data before delivering it

Example for a DB:

```mysql
# For each database:
ALTER DATABASE database_name CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
# For each table:
ALTER TABLE table_name CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
# For each column (The exact statement depends on the column type):
ALTER TABLE table_name CHANGE column_name column_name VARCHAR(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Example for `my.cnf`:

```
[client]
default-character-set = utf8mb4

[mysql]
default-character-set = utf8mb4

[mysqld]
character-set-client-handshake = FALSE
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
```

Confirm the configuration with:

```mysql
SHOW VARIABLES WHERE Variable_name LIKE 'character\_set\_%' OR Variable_name LIKE 'collation%';
+--------------------------+--------------------+
| Variable_name            | Value              |
+--------------------------+--------------------+
| character_set_client     | utf8mb4            |
| character_set_connection | utf8mb4            |
| character_set_database   | utf8mb4            |
| character_set_filesystem | binary             |
| character_set_results    | utf8mb4            |
| character_set_server     | utf8mb4            |
| character_set_system     | utf8               |
| collation_connection     | utf8mb4_unicode_ci |
| collation_database       | utf8mb4_unicode_ci |
| collation_server         | utf8mb4_unicode_ci |
+--------------------------+--------------------+
10 rows in set (0.00 sec)
```

[Source](https://mathiasbynens.be/notes/mysql-utf8mb4)

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
