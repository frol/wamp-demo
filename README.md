WAMP-proto Demo Application
===========================

This demo features the design of an application with interactive UI updates.
The application uses remote-procedure calls (RPC) and publish-subscribe
(PubSub) communication over WebSocket using
[WAMP-proto](https://wamp-proto.org/).


Play
----

### Get Started with Docker-Compose

You need to have Docker and Docker-Compose installed on your host before
proceeding. Once Docker is up and running, pull the repository and run:

```
$ docker-compose up -d
```

This will run WAMP router ([crossbar](https://crossbar.io/)), backend node
written in Python, another backend node written in Node.js, and frontend
server using Next.js framework. Start exploring the project by accessing the
frontend [http://localhost:3000](http://localhost:3000).

To play with individual services without Docker, stop a relevant service via
`docker-compose stop` command, e.g.:

```
$ docker-compose stop backend-python
```

, and follow the setup instuctions from the relevant README file in the service
subfolder.
