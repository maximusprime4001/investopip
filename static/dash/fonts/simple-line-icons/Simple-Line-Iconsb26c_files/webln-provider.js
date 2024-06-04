(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // ../node_modules/webln/lib/errors.js
  var require_errors = __commonJS({
    "../node_modules/webln/lib/errors.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (Object.prototype.hasOwnProperty.call(b2, p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.InternalError = exports.InvalidDataError = exports.RoutingError = exports.UnsupportedMethodError = exports.ConnectionError = exports.RejectionError = exports.MissingProviderError = void 0;
      function fixError(error, newTarget, errorType) {
        Object.setPrototypeOf(error, errorType.prototype);
        if (newTarget === errorType) {
          error.name = newTarget.name;
          if (Error.captureStackTrace) {
            Error.captureStackTrace(error, errorType);
          } else {
            var stack = new Error(error.message).stack;
            if (stack) {
              error.stack = fixStack(stack, "new ".concat(newTarget.name));
            }
          }
        }
      }
      function fixStack(stack, functionName) {
        if (!stack)
          return stack;
        if (!functionName)
          return stack;
        var exclusion = new RegExp("\\s+at\\s".concat(functionName, "\\s"));
        var lines = stack.split("\n");
        var resultLines = lines.filter(function(line) {
          return !line.match(exclusion);
        });
        return resultLines.join("\n");
      }
      var MissingProviderError = (
        /** @class */
        function(_super) {
          __extends(MissingProviderError2, _super);
          function MissingProviderError2(message) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, message) || this;
            fixError(_this, _newTarget, MissingProviderError2);
            return _this;
          }
          return MissingProviderError2;
        }(Error)
      );
      exports.MissingProviderError = MissingProviderError;
      var RejectionError = (
        /** @class */
        function(_super) {
          __extends(RejectionError2, _super);
          function RejectionError2(message) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, message) || this;
            fixError(_this, _newTarget, RejectionError2);
            return _this;
          }
          return RejectionError2;
        }(Error)
      );
      exports.RejectionError = RejectionError;
      var ConnectionError = (
        /** @class */
        function(_super) {
          __extends(ConnectionError2, _super);
          function ConnectionError2(message) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, message) || this;
            fixError(_this, _newTarget, ConnectionError2);
            return _this;
          }
          return ConnectionError2;
        }(Error)
      );
      exports.ConnectionError = ConnectionError;
      var UnsupportedMethodError2 = (
        /** @class */
        function(_super) {
          __extends(UnsupportedMethodError3, _super);
          function UnsupportedMethodError3(message) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, message) || this;
            fixError(_this, _newTarget, UnsupportedMethodError3);
            return _this;
          }
          return UnsupportedMethodError3;
        }(Error)
      );
      exports.UnsupportedMethodError = UnsupportedMethodError2;
      var RoutingError = (
        /** @class */
        function(_super) {
          __extends(RoutingError2, _super);
          function RoutingError2(message) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, message) || this;
            fixError(_this, _newTarget, RoutingError2);
            return _this;
          }
          return RoutingError2;
        }(Error)
      );
      exports.RoutingError = RoutingError;
      var InvalidDataError2 = (
        /** @class */
        function(_super) {
          __extends(InvalidDataError3, _super);
          function InvalidDataError3(message) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, message) || this;
            fixError(_this, _newTarget, InvalidDataError3);
            return _this;
          }
          return InvalidDataError3;
        }(Error)
      );
      exports.InvalidDataError = InvalidDataError2;
      var InternalError2 = (
        /** @class */
        function(_super) {
          __extends(InternalError3, _super);
          function InternalError3(message) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, message) || this;
            fixError(_this, _newTarget, InternalError3);
            return _this;
          }
          return InternalError3;
        }(Error)
      );
      exports.InternalError = InternalError2;
    }
  });

  // ../node_modules/webln/lib/client.js
  var require_client = __commonJS({
    "../node_modules/webln/lib/client.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.requestProvider = void 0;
      var errors_1 = require_errors();
      function requestProvider(_) {
        if (_ === void 0) {
          _ = {};
        }
        return new Promise(function(resolve, reject) {
          if (typeof window === "undefined") {
            return reject(new Error("Must be called in a browser context"));
          }
          var webln = window.webln;
          if (!webln) {
            return reject(new errors_1.MissingProviderError("Your browser has no WebLN provider"));
          }
          webln.enable().then(function() {
            return resolve(webln);
          }).catch(function(err) {
            return reject(err);
          });
        });
      }
      exports.requestProvider = requestProvider;
    }
  });

  // ../node_modules/webln/lib/provider.js
  var require_provider = __commonJS({
    "../node_modules/webln/lib/provider.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // ../node_modules/webln/lib/index.js
  var require_lib = __commonJS({
    "../node_modules/webln/lib/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_client(), exports);
      __exportStar(require_provider(), exports);
      __exportStar(require_errors(), exports);
    }
  });

  // webext/webln-provider.ts
  var import_webln = __toESM(require_lib());

  // ../src/constants/message.js
  var ZBD_MAKEINVOICE = "ZBD_MAKEINVOICE";
  var ZBD_SENDPAYMENT = "ZBD_SENDPAYMENT";

  // webext/webln-provider.ts
  window.webln = {
    _requests: {},
    _pubkey: null,
    async enable() {
      return { enabled: true };
    },
    async getInfo() {
      throw new import_webln.UnsupportedMethodError("getInfo not implemented");
    },
    async sendPayment(paymentRequest) {
      return this._call(ZBD_SENDPAYMENT, { invoice: paymentRequest });
    },
    async keysend() {
      throw new import_webln.UnsupportedMethodError("keysend not implemented");
    },
    async makeInvoice(amountOrArgs) {
      let args = amountOrArgs;
      if (typeof amountOrArgs === "string") {
        args = { amount: parseInt(amountOrArgs, 10) };
      } else if (typeof amountOrArgs === "number") {
        args = { amount: amountOrArgs };
      } else if (typeof args?.amount === "string") {
        args.amount = parseInt(amountOrArgs, 10);
      }
      if (args?.defaultAmount && (typeof args.defaultAmount !== "number" || !(args.defaultAmount > 0))) {
        throw new import_webln.InvalidDataError(`defaultAmount ${args?.defaultAmount} is not a valid number`);
      }
      if (!args?.defaultAmount && (typeof args?.amount !== "number" || !(args?.amount > 0))) {
        throw new import_webln.InvalidDataError(`amount ${args?.amount} is not a valid number`);
      }
      return this._call(ZBD_MAKEINVOICE, args);
    },
    async signMessage() {
      throw new import_webln.UnsupportedMethodError("signMessage not implemented");
    },
    async verifyMessage() {
      throw new import_webln.UnsupportedMethodError("verifyMessage not implemented");
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
  window.addEventListener("message", (message) => {
    if (!message.data || message.data.response === null || message.data.response === void 0 || message.data.ext !== "zbd" || !window.webln._requests[message.data.id])
      return;
    if (message.data.response.error) {
      const error = new import_webln.InternalError(`zbd: ${message.data.response.error.message}`);
      error.stack = message.data.response.error.stack;
      window.webln._requests[message.data.id].reject(error);
    } else {
      window.webln._requests[message.data.id].resolve(message.data.response);
    }
    delete window.webln._requests[message.data.id];
  });
})();
