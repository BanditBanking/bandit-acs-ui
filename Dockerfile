# Use the official Node.js 14 image as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package.json yarn.lock ./

# Install the dependencies
RUN yarn install --production --frozen-lockfile

# Copy the rest of the files to the container
COPY . .

ENV PATH="./node_modules/.bin:$PATH"

ARG REACT_APP_DASHBOARD_TITLE
ENV REACT_APP_DASHBOARD_TITLE $REACT_APP_DASHBOARD_TITLE

ARG REACT_APP_DASHBOARD_COLOR
ENV REACT_APP_DASHBOARD_COLOR $REACT_APP_DASHBOARD_COLOR

ARG REACT_APP_ACS_API_URL
ENV REACT_APP_ACS_API_URL $REACT_APP_ACS_API_URL

ARG REACT_APP_BANK_ID
ENV REACT_APP_BANK_ID $REACT_APP_BANK_ID

# Build the React application
RUN yarn build

# Expose port 443
EXPOSE 443

# Start the React application
CMD ["yarn", "start", "--https", "--port", "443"]