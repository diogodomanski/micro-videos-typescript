FROM node:18-slim

RUN apt update && apt install -y --no-install-recommends \
    git \
    ca-certificates \
    default-jre \
    zsh \
    curl \
    wget \
    fonts-firacode

ENV JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"

USER node

WORKDIR /home/node/app

# Default powerline10k theme, no plugins installed
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.3/zsh-in-docker.sh)" -- \
    -t https://github.com/romkatv/powerlevel10k \
    -p git \
    -p git-flow \
    -p https://github.com/zdharma-continuum/fast-syntax-highlighting \
    -p https://github.com/zsh-users/zsh-autosuggestions \
    -p https://github.com/zsh-users/zsh-completions \
    -a 'export TERM=xterm-256color'

RUN echo '[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh' >> ~/.zshrc \ 
    && echo 'HISTFILE=/home/node/zsh/.zsh_history' >> ~/.zshrc


CMD [ "sh", "-c", "npm install && tail -f /dev/null" ]