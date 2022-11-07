---
title: DevOps
---

This section explains the recommended configuration related to DevOps on new projects.
Check the [Harmony DevOps repository](https://github.com/mobilejazz/harmony-devops) to see an example.

## Environments

* Services
  * **Keyword**: `services`
  * **Purpose**: It’s for the backend developers to have all the services in just one docker-compose file, for example, the databases, phpadmin, php, etc…
* Backend
   * **Keyword**: `backend`
   * **Purpose**: Optional environment. It’s only needed when we have a web-frontend application that requires to 
     run the backend in their development machines. So, we have this environment to run the backend in docker so the web-frontend developer doesn’t need to have installed all the dependencies in their machine.
* Local
   * **Keyword**: `local`
   * **Purpose**: Replica of the Stage / Production environment to test it in local the whole infrastructure in 
     the local machine. It’s going to build the image directly from the Docker files, instead of pulling it from the docker registry.
* Stage
   * **Keyword**: `stage`
   * **Purpose**: Staging environment. It’s going to pull the docker images directly from the docker registry.
* Production
   * **Keyword**: `prod`
   * **Purpose**: Production environment. It’s going to pull the docker images directly from the docker registry.

## Docker-compose files

Taking into account the definition of the environments specified before. We are going to specify the docker-compose files required and the naming convention.

The idea is to have one base docker-compose file and another for the environment, so ideally to run any environment, you will only need to compose two docker-compose files.

Naming conventions:

* `compose.yml`
  * Base docker-compose file.
* `compose.{{ENVIRONMENT}}.yml`
  * `compose.backend.yml`
  * `compose.services.yml`
  * `compose.local.yml`
  * `compose.stage.yml`
  * `compose.prod.yml`

Ideally, you will only need to run the following command to execute any of the environments:

`docker-compose -f compose.yml -f compose.{{ENVIRONMENT}}.yml up`

## Docker files

Most of the time it is not necessary to have one Dockerfile per environment as we can build a Dockerfile more generically using ENV and ARGS features.

In case we need to have different Dockerfiles per environment, we are going to use the same convention as the Docker compose files (Dockerfile.{{ENVIRONMENT}}).

For example:

* `Dockerfile.local`
* `Dockerfile.stage`

## Scripts

### Common

* `common.sh`
  * It will contain the common functionalities for the different scripts.
    * Input Parameters:
    * `-e` | `--env`
      * Specify the environment, for example, `--env=local`
    * `-b` | `--build`
      * Set a flag to force build the docker images.
  * Features:
    * Set the `ENVIRONMENT` variable due the `-e` / `--env` parameter.
      * Default value: `services`
    * Set the `FORCE_BUILD` variable due the `-f` / `--force` parameter.
      * Default value: `false`
    * Set the `SERVER_ADDRESS` variable depending on the environment.
      * Default value: `empty`
  * **Note**: Please do not overuse this file adding many different functionalities just to save you a line or two words in some of the scripts. Keep it simple and don’t overcomplicate it.

### Development

* `start.sh`
  * Responsible for starting the specified environments.
  * Example: `start.sh --env=local`
* `stop.sh`
   * Responsible for stopping the specified environment.
   * Example: `stop.sh --env=local`

**Note**: What is really doing under the hood the scripts listed above, it’s just composing the different docker-compose files to be more convenient.

For example, the start.sh script, it’s basically doing the following command:
`docker-compose -f compose.yml -f compose."${ENVIRONMENT}".yml up -d --remove-orphans`

### Deployment

* `build.sh`
  * Responsible for:
    * **Building** the different docker images, for example, build the backend and web-frontend docker image
* `deploy.sh`
  * Responsible for:
    * **Login** to the docker registry
    * **Push** the docker images built to the docker registry
    * Transfer the respective docker-compose file due the environment, stage or production.
    * **Transfer** the **.env** file that contains the docker image tag.
    * Transfer all the required files for establish the system, for example, *.sql files to start up the database, migration files, up.sh, etc.
* `up.sh`
  * Scripts that live in the server and it’s responsible for starting the system.
  * It’s going to be transferred to the server in the exec.sh script. 
