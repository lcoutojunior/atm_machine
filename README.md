
# atm_machine
This project is a Microsservice developed using Docker that simulates a ATM with some business rules restrictions. In this ATM only have cells of 20, 50, 100. The minimum withdraw is 20. Should priorize maximum cells. The deposits can be done in any value, except in cents.


## Requirements

docker
## Installation

1 - Download Repository.


2 - Building Images:
```bash
Inside of directory of atm_machine folder:
    cd atm_machine 
    docker build -t atm_machine:1.0 .
```

3 - Run Images and connect to recent created network:
```bash
docker run -d -p 3000:3000 atm_machine:1.0
```
    
4 - Append to logs of each container (optional):
```bash
docker ps -a
docker logs -f <CONTAINER ID>
```
## Usage/Examples

**Postman collections are included.** Please import collection from folder called **postman** inside root folder.

1 - First create an User.

2 - Then create a Account (poupance/bank_account)

## Running Tests

To run tests, enter inside container:

```bash
  docker exec -it <CONTAINER ID> /bin/bash
```


And running the following command:

```bash
Test UserService:
    npm run test_user
Test AccountService:
    npm run test_account
```


## Uninstallation

1 - Remove container:
```bash
List all containers:
    docker container ls -a
Stop each container: 
    docker stop <CONTAINER ID>
Prune (Remove all stopped containers):
    docker container prune 
```

2 - Remove image:
```bash
List all images:
    docker image ls -a 
Remove each image:
    docker rmi <IMAGE ID>
```
## Authors

- [@lcoutojunior](https://www.github.com/lcoutojunior)

