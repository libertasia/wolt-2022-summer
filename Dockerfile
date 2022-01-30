FROM node:16.13-alpine

RUN npm install -g serve
ADD ./build /build
EXPOSE 3000
CMD ["serve", "-s", "/build", "-l", "3000"]
