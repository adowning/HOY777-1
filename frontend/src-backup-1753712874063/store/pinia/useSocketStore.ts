// src/store/pinia/useSocketStore.ts
import { App } from "vue";
import { defineStore } from "pinia";
import { setupStore } from "./store";
import { SocketStore } from "./typeOfSocketStore";
import Emitter from "../../utils/websocket/Emitter";

export const useSocketStore = (app: App<Element>) => {
  return defineStore({
    id: "socket",
    state: (): SocketStore => ({
      // 连接状态
      isConnected: false,
      // 消息内容
      message: "",
      // 重新连接错误
      reconnectError: false,
      // 心跳消息发送时间
      heartBeatInterval: 5000, // Increased interval for sanity
      // 心跳定时器
      heartBeatTimer: 0,

      // where we can push & pop messages
      incomingMessages: [],
      outgoingMessages: [],
    }),
    actions: {
      sendMessage(message: string) {
        this.outgoingMessages.push(message);
        console.log("Queued message: " + message);
      },

      sendPendingMessages() {
        while (this.outgoingMessages.length > 0) {
          const message = this.outgoingMessages.shift(); // Gets and removes the first item
          if (message && app.config.globalProperties.$socket) {
            app.config.globalProperties.$socket.sendObj({
              verb: "begin",
              msg: message,
            });
            console.log("Sent message: " + message);
          }
        }
      },

      // 连接打开
      SOCKET_ONOPEN(event: any) {
        app.config.globalProperties.$socket = event.currentTarget;
        this.isConnected = true;
        Emitter.emit("webSocket.open", event);
        console.log("successful websocket connection");

        this.sendPendingMessages();

        // 连接成功时启动定时发送心跳消息，避免被服务器断开连接
        this.heartBeatTimer = window.setInterval(() => {
          if (this.isConnected) {
            app.config.globalProperties.$socket.sendObj({
              verb: "ping",
              msg: "heartbeat"
            });
          }
        }, this.heartBeatInterval);
      },
      // 连接关闭
      SOCKET_ONCLOSE(event: any) {
        Emitter.emit("webSocket.close", event);
        this.isConnected = false;
        // 连接关闭时停掉心跳消息
        window.clearInterval(this.heartBeatTimer);
        this.heartBeatTimer = 0;
        console.log("连接已断开: " + new Date());   // The line is disconnected
        console.log(event);
      },
      // 发生错误
      SOCKET_ONERROR(event: any) {
        Emitter.emit("webSocket.error", event);
        console.error(event);
      },
      // 收到服务端发送的消息
      SOCKET_ONMESSAGE(message: any) {
        this.message = message;
        Emitter.emit("webSocket.onMessage", message);
        console.log(message);
      },
      // 自动重连
      SOCKET_RECONNECT(count: any) {
        Emitter.emit("webSocket.Reconnect", count)
        console.info("消息系统重连中...", count);
      },
      // 重连错误
      SOCKET_RECONNECT_ERROR() {
        Emitter.emit("webSocket.ReconnectError")
        this.reconnectError = true;
      }
    }
  })();
};

// Need to be used outside the setup
export function useSocketStoreWithOut(app: App<Element>) {
  setupStore(app);
  return useSocketStore(app);
}