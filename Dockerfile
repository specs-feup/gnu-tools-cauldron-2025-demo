FROM ubuntu:latest

RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    software-properties-common \
    build-essential \
    clang \
    openjdk-17-jdk

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
