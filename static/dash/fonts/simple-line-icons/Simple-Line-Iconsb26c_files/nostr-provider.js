(() => {
  // ../src/constants/message.js
  var ZBD_GETPUBLICKEY = "ZBD_GETPUBLICKEY";
  var ZBD_SIGNEVENT = "ZBD_SIGNEVENT";
  var ZBD_NIP04ENCRYPT = "ZBD_NIP04ENCRYPT";
  var ZBD_NIP04DECRYPT = "ZBD_NIP04DECRYPT";

  // webext/nostr-provider.ts
  var globalNostr = {
    _requests: {},
    _pubkey: null,
    async getPublicKey() {
      if (this._pubkey)
        return this._pubkey;
      this._pubkey = await this._call(ZBD_GETPUBLICKEY, {});
      return this._pubkey;
    },
    async signEvent(event) {
      return this._call(ZBD_SIGNEVENT, { event });
    },
    async getRelays() {
      if ("https://browser-extension.zebedee.io".includes("extension.voltorb.zebedee.io")) {
        return { "wss://nostr-dev.zbd.gg": { read: true, write: true } };
      }
      if ("https://browser-extension.zebedee.io".includes("extension.zebedee.io")) {
        return { "wss://nostr.zbd.gg": { read: true, write: true } };
      }
      return {};
    },
    nip04: {
      async encrypt(peer, plaintext) {
        return window.nostr._call(ZBD_NIP04ENCRYPT, { peer, plaintext });
      },
      async decrypt(peer, ciphertext) {
        return window.nostr._call(ZBD_NIP04DECRYPT, { peer, ciphertext });
      }
    },
    _call(type, payload) {
      return new Promise((resolve, reject) => {
        const id = Math.random().toString().slice(4);
        this._requests[id] = { resolve, reject };
        window.postMessage(
          {
            id,
            ext: "zbd",
            type,
            payload
          },
          "*"
        );
      });
    }
  };
  var emptyObject = {};
  window.nostr = new Proxy(window.nostr || emptyObject, {
    get(target, prop) {
      switch (prop) {
        case "getPublicKey":
        case "getRelays":
        case "signEvent":
        case "nip04.decrypt":
        case "nip04.encrypt":
          return async (...args) => {
            try {
              await globalNostr.getPublicKey();
              window.nostr = globalNostr;
              return window.nostr[prop](...args);
            } catch (err) {
              if (target !== emptyObject) {
                window.nostr = target;
                return window.nostr[prop](...args);
              }
              window.nostr = void 0;
              return void 0;
            }
          };
        default:
          return null;
      }
    }
  });
  window.addEventListener("message", (message) => {
    if (!message.data || message.data.response === null || message.data.response === void 0 || message.data.ext !== "zbd" || !globalNostr._requests[message.data.id])
      return;
    if (message.data.response.error) {
      const error = new Error(`zbd: ${message.data.response.error.message}`);
      error.stack = message.data.response.error.stack;
      globalNostr._requests[message.data.id].reject(error);
    } else {
      globalNostr._requests[message.data.id].resolve(message.data.response);
    }
    delete globalNostr._requests[message.data.id];
  });
})();
