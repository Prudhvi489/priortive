#baseimage
FROM node
# specifying the working directory
WORKDIR /usr/gomytrip

# copy build filed
# COPY ./package.json package-lock.json./
# copy build files
COPY package.json package-lock.json ./

# install dependencies
RUN npm install --silent
# installing scripts
RUN npm install react-scripts@5.0.1 -g --silent

# copying whole data
COPY ./ ./

# startup command
CMD ["npm","start"]