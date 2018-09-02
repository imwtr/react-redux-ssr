
## React-Redux-SSR
在React及Redux项目中进行服务端渲染（SSR: Server Side Rendering）

使用redux-saga处理异步action，使用express处理页面渲染

webpack监听编译文件，nodemon监听服务器文件变动


本项目包含四个页面
- [http://localhost:12345/message](http://localhost:12345/message)  React
- [http://localhost:12345/ssr/message](http://localhost:12345/ssr/message)  React + SSR
- [http://localhost:12345/home](http://localhost:12345/home)  React + Redux
- [http://localhost:12345/ssr/home](http://localhost:12345/ssr/home)  React + Redux + SSR


## 解析说明

[解析说明](http://www.cnblogs.com/imwtr/p/7786204.html)


## 使用
1. `cd react-redux-ssr` 进入项目
2. `npm i` 安装依赖
3. `npm run build` webpack编译文件
4. `npm run server` 启动Node服务
5. 访问上述四个页面


## DEMO
![React](./message.gif)
![React + SSR](./message-ssr.gif)
![React + Redux](./home.gif)
![React + Redux + SSR](./home-ssr.gif)

