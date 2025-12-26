/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 79
(module, __unused_webpack_exports, __webpack_require__) {

var listCacheClear = __webpack_require__(3702),
    listCacheDelete = __webpack_require__(80),
    listCacheGet = __webpack_require__(4739),
    listCacheHas = __webpack_require__(8655),
    listCacheSet = __webpack_require__(1175);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ },

/***/ 80
(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(6025);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ },

/***/ 104
(module, __unused_webpack_exports, __webpack_require__) {

var MapCache = __webpack_require__(3661);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ },

/***/ 258
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DefaultQueryBuilder = void 0;
class DefaultQueryBuilder {
    globalStorage;
    queryOptions;
    constructor(globalStorage, queryOptions = {}) {
        this.globalStorage = globalStorage;
        this.queryOptions = queryOptions;
    }
    where(field, where) {
        return new DefaultQueryBuilder(this.globalStorage, {
            ...this.queryOptions,
            where: [
                {
                    field,
                    ...where
                }
            ]
        });
    }
    cursor(cursor) {
        return new DefaultQueryBuilder(this.globalStorage, {
            ...this.queryOptions,
            cursor
        });
    }
    limit(limit) {
        return new DefaultQueryBuilder(this.globalStorage, {
            ...this.queryOptions,
            limit
        });
    }
    async getOne() {
        const { results } = await this.limit(1).getMany();
        if (results && results.length > 0) {
            return results[0];
        }
    }
    async getMany() {
        return this.globalStorage.list(this.queryOptions);
    }
}
exports.DefaultQueryBuilder = DefaultQueryBuilder;


/***/ },

/***/ 289
(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(2651);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ },

/***/ 290
(module) {

"use strict";
module.exports = require("async_hooks");

/***/ },

/***/ 346
(module) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ },

/***/ 392
(module) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ },

/***/ 659
(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(1873);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ },

/***/ 972
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.invokeService = exports.invokeRemote = void 0;
const errors_1 = __webpack_require__(9742);
const fetch_1 = __webpack_require__(8265);
var InvokeType;
(function (InvokeType) {
    InvokeType["REMOTE"] = "Remote";
    InvokeType["CONTAINER"] = "Service";
})(InvokeType || (InvokeType = {}));
async function invokeRemote(remoteKey, options) {
    return invokeEndpoint(remoteKey, options, InvokeType.REMOTE);
}
exports.invokeRemote = invokeRemote;
async function invokeService(serviceKey, options) {
    return invokeEndpoint(serviceKey, options, InvokeType.CONTAINER);
}
exports.invokeService = invokeService;
async function invokeEndpoint(key, options, type) {
    const { path, ...fetchOptions } = options;
    if (!key) {
        throw new Error(`Missing ${type.toLowerCase()} key provided to invoke${type}`);
    }
    if (!path) {
        throw new Error(`Missing or empty path provided to invoke${type}`);
    }
    const response = await global.__forge_fetch__(constructInvokePayload(key, type), path, fetchOptions);
    handleResponseErrors(response, key);
    return response;
}
function constructInvokePayload(key, type) {
    switch (type) {
        case InvokeType.REMOTE:
            return {
                type: 'frc',
                remote: key
            };
        case InvokeType.CONTAINER:
            return {
                type: 'fcc',
                service: key
            };
    }
}
function handleResponseErrors(response, key) {
    const forgeProxyError = (0, fetch_1.getForgeProxyError)(response);
    if (forgeProxyError === 'INVALID_SERVICE_KEY') {
        throw new errors_1.InvalidContainerServiceError(`Invalid service key provided: "${key}"`, key);
    }
    else if (forgeProxyError === 'INVALID_REMOTE') {
        throw new errors_1.InvalidRemoteError(`Invalid remote key provided: "${key}"`, key);
    }
    (0, fetch_1.handleProxyResponseErrors)(response);
}


/***/ },

/***/ 1026
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomEntityBuilder = exports.CustomEntityIndexBuilder = void 0;
class CustomEntityQueryBuilder {
    globalStorage;
    queryOptions;
    constructor(globalStorage, queryOptions = {}) {
        this.globalStorage = globalStorage;
        this.queryOptions = queryOptions;
        this.queryOptions = {
            ...queryOptions
        };
    }
    clone(overrides) {
        return new (Object.getPrototypeOf(this).constructor)(this.globalStorage, {
            ...this.queryOptions,
            ...overrides
        });
    }
    where(condition) {
        return this.clone({
            range: {
                ...condition
            }
        });
    }
    sort(sort) {
        return this.clone({
            sort
        });
    }
    cursor(cursor) {
        return this.clone({
            cursor
        });
    }
    limit(limit) {
        return this.clone({
            limit
        });
    }
    async getOne() {
        const { results } = await this.limit(1).getMany();
        return results?.[0];
    }
    async getMany() {
        if (!this.queryOptions.entityName) {
            throw new Error('entityName is mandatory');
        }
        if (!this.queryOptions.indexName) {
            throw new Error('indexName is mandatory');
        }
        const queryOptions = { ...this.queryOptions };
        if (!queryOptions.filterOperator && queryOptions.filters) {
            queryOptions.filterOperator = 'and';
        }
        return this.globalStorage.listCustomEntities(this.queryOptions);
    }
}
class CustomEntityAndFilterQueryBuilder extends CustomEntityQueryBuilder {
    globalStorage;
    queryOptions;
    constructor(globalStorage, queryOptions = {}) {
        super(globalStorage, queryOptions);
        this.globalStorage = globalStorage;
        this.queryOptions = queryOptions;
        this.queryOptions = {
            ...queryOptions
        };
    }
    andFilter(field, condition) {
        const newQueryOptions = {
            ...this.queryOptions
        };
        newQueryOptions.filters = [...(this.queryOptions.filters ?? []), { property: field, ...condition }];
        newQueryOptions.filterOperator = 'and';
        return new CustomEntityAndFilterQueryBuilder(this.globalStorage, newQueryOptions);
    }
}
class CustomEntityOrFilterQueryBuilder extends CustomEntityQueryBuilder {
    globalStorage;
    queryOptions;
    constructor(globalStorage, queryOptions = {}) {
        super(globalStorage, queryOptions);
        this.globalStorage = globalStorage;
        this.queryOptions = queryOptions;
        this.queryOptions = {
            ...queryOptions
        };
    }
    orFilter(field, condition) {
        const newQueryOptions = {
            ...this.queryOptions
        };
        newQueryOptions.filters = [...(this.queryOptions.filters ?? []), { property: field, ...condition }];
        newQueryOptions.filterOperator = 'or';
        return new CustomEntityOrFilterQueryBuilder(this.globalStorage, newQueryOptions);
    }
}
class CustomEntityFilterQueryBuilder extends CustomEntityQueryBuilder {
    globalStorage;
    queryOptions;
    constructor(globalStorage, queryOptions = {}) {
        super(globalStorage, queryOptions);
        this.globalStorage = globalStorage;
        this.queryOptions = queryOptions;
        this.queryOptions = {
            ...queryOptions
        };
    }
    andFilter(field, condition) {
        return new CustomEntityAndFilterQueryBuilder(this.globalStorage, this.queryOptions).andFilter(field, condition);
    }
    orFilter(field, condition) {
        return new CustomEntityOrFilterQueryBuilder(this.globalStorage, this.queryOptions).orFilter(field, condition);
    }
}
class CustomEntityIndexBuilder {
    globalStorage;
    queryOptions;
    constructor(globalStorage, queryOptions = {}) {
        this.globalStorage = globalStorage;
        this.queryOptions = queryOptions;
        this.queryOptions = {
            ...queryOptions
        };
    }
    index(name, indexOptions) {
        const indexProperties = indexOptions ? { indexName: name, ...indexOptions } : { indexName: name };
        return new CustomEntityFilterQueryBuilder(this.globalStorage, {
            ...this.queryOptions,
            ...indexProperties
        });
    }
}
exports.CustomEntityIndexBuilder = CustomEntityIndexBuilder;
class CustomEntityBuilder {
    globalStorage;
    queryOptions;
    constructor(globalStorage, queryOptions = {}) {
        this.globalStorage = globalStorage;
        this.queryOptions = queryOptions;
        this.queryOptions = {
            ...queryOptions
        };
    }
    entity(name) {
        return new CustomEntityIndexBuilder(this.globalStorage, {
            ...this.queryOptions,
            entityName: name
        });
    }
}
exports.CustomEntityBuilder = CustomEntityBuilder;


/***/ },

/***/ 1042
(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(6110);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ },

/***/ 1100
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Translator = void 0;
const translationValueGetter_1 = __webpack_require__(1813);
class Translator {
    locale;
    translationsGetter;
    localeLookupOrderedTranslations = null;
    cache = new Map();
    constructor(locale, translationsGetter) {
        this.locale = locale;
        this.translationsGetter = translationsGetter;
    }
    async init() {
        this.localeLookupOrderedTranslations = await this.translationsGetter.getTranslationsByLocaleLookupOrder(this.locale);
    }
    translate(i18nKey) {
        if (!this.localeLookupOrderedTranslations) {
            throw new Error('TranslationLookup not initialized');
        }
        let result = this.cache.get(i18nKey);
        if (result === undefined) {
            for (const { translations } of this.localeLookupOrderedTranslations) {
                const translationValue = (0, translationValueGetter_1.getTranslationValueFromContent)(translations, i18nKey);
                if (translationValue !== null) {
                    result = translationValue;
                    break;
                }
            }
            result = result ?? null;
            this.cache.set(i18nKey, result);
        }
        return result;
    }
}
exports.Translator = Translator;


/***/ },

/***/ 1175
(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(6025);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ },

/***/ 1228
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.assumeTrustedRoute = exports.requireSafeUrl = exports.route = exports.routeFromAbsolute = exports.isRoute = void 0;
class ReadonlyRoute {
    value_;
    constructor(value_) {
        this.value_ = value_;
    }
    set value(_) {
        throw new Error('modification of a Route is not allowed');
    }
    get value() {
        return this.value_;
    }
}
function isRoute(x) {
    return x instanceof ReadonlyRoute;
}
exports.isRoute = isRoute;
function routeFromAbsolute(absolutePath) {
    const absoluteURL = new URL(absolutePath);
    return assumeTrustedRoute(`${absoluteURL.pathname}${absoluteURL.search}`);
}
exports.routeFromAbsolute = routeFromAbsolute;
const DOUBLE_DOT = ['..', '.%2e', '%2e.', '%2e%2e', '.%2E', '%2E.', '%2E%2e'];
const DIRECTORY_PATH = ['/', '\\'];
const ENDS_PATH = ['?', '#'];
function containsOneOf(needles, haystack) {
    return needles.some((needle) => haystack.includes(needle));
}
function escapeParameter(parameter, mode) {
    switch (mode) {
        case 'path':
            if (isRoute(parameter)) {
                return parameter.value;
            }
            parameter = String(parameter);
            if (containsOneOf(DOUBLE_DOT, parameter) ||
                containsOneOf(ENDS_PATH, parameter) ||
                containsOneOf(DIRECTORY_PATH, parameter)) {
                throw new Error('Disallowing path manipulation attempt. For more information see: https://go.atlassian.com/product-fetch-api-route');
            }
            return parameter;
        case 'query':
            if (isRoute(parameter)) {
                return encodeURIComponent(parameter.value);
            }
            else if (parameter instanceof URLSearchParams) {
                return parameter.toString();
            }
            else {
                return encodeURIComponent(parameter);
            }
    }
}
function route(template, ...parameters) {
    let mode = 'path';
    let result = '';
    for (let i = 0; i < template.length; i++) {
        const templateFragment = template[i];
        if (containsOneOf(ENDS_PATH, templateFragment)) {
            mode = 'query';
        }
        result += templateFragment;
        if (i >= parameters.length) {
            break;
        }
        result += escapeParameter(parameters[i], mode);
    }
    return new ReadonlyRoute(result);
}
exports.route = route;
function requireSafeUrl(url) {
    if (url instanceof ReadonlyRoute) {
        return url;
    }
    throw new Error(`You must create your route using the 'route' export from '@forge/api'.
See https://go.atlassian.com/forge-fetch-route for more information.`);
}
exports.requireSafeUrl = requireSafeUrl;
function assumeTrustedRoute(route) {
    return new ReadonlyRoute(route);
}
exports.assumeTrustedRoute = assumeTrustedRoute;


/***/ },

/***/ 1317
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createReportPersonalData = exports.LIMIT = exports.URL = void 0;
exports.URL = '/app/report-accounts';
exports.LIMIT = 90;
const createReportPersonalData = (requestAtlassian) => {
    return function fetchUpdates(accounts) {
        if (accounts.length === 0) {
            return Promise.resolve([]);
        }
        const request = requestAtlassian(exports.URL, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ accounts: accounts.slice(0, exports.LIMIT) })
        }).then(async (resp) => {
            if (resp.status === 200) {
                return (await resp.json()).accounts;
            }
            if (resp.status === 204) {
                return [];
            }
            return Promise.reject(resp);
        });
        return Promise.all([request, fetchUpdates(accounts.slice(exports.LIMIT))]).then(([first, second]) => first.concat(second));
    };
};
exports.createReportPersonalData = createReportPersonalData;


/***/ },

/***/ 1549
(module, __unused_webpack_exports, __webpack_require__) {

var hashClear = __webpack_require__(2032),
    hashDelete = __webpack_require__(3862),
    hashGet = __webpack_require__(6721),
    hashHas = __webpack_require__(2749),
    hashSet = __webpack_require__(5749);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ },

/***/ 1635
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __addDisposableResource: () => (/* binding */ __addDisposableResource),
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldIn: () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __disposeResources: () => (/* binding */ __disposeResources),
/* harmony export */   __esDecorate: () => (/* binding */ __esDecorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __propKey: () => (/* binding */ __propKey),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __rewriteRelativeImportExtension: () => (/* binding */ __rewriteRelativeImportExtension),
/* harmony export */   __runInitializers: () => (/* binding */ __runInitializers),
/* harmony export */   __setFunctionName: () => (/* binding */ __setFunctionName),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArray: () => (/* binding */ __spreadArray),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  }
  return __assign.apply(this, arguments);
}

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
  function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
  function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

var ownKeys = function(o) {
  ownKeys = Object.getOwnPropertyNames || function (o) {
    var ar = [];
    for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
    return ar;
  };
  return ownKeys(o);
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  var r, s = 0;
  function next() {
    while (r = env.stack.pop()) {
      try {
        if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
        if (r.dispose) {
          var result = r.dispose.call(r.value);
          if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
        }
        else s |= 1;
      }
      catch (e) {
        fail(e);
      }
    }
    if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
    if (env.hasError) throw env.error;
  }
  return next();
}

function __rewriteRelativeImportExtension(path, preserveJsx) {
  if (typeof path === "string" && /^\.\.?\//.test(path)) {
      return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
          return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
      });
  }
  return path;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __esDecorate,
  __runInitializers,
  __propKey,
  __setFunctionName,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
  __rewriteRelativeImportExtension,
});


/***/ },

/***/ 1769
(module, __unused_webpack_exports, __webpack_require__) {

var isArray = __webpack_require__(6449),
    isKey = __webpack_require__(8586),
    stringToPath = __webpack_require__(1802),
    toString = __webpack_require__(3222);

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;


/***/ },

/***/ 1802
(module, __unused_webpack_exports, __webpack_require__) {

var memoizeCapped = __webpack_require__(2224);

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;


/***/ },

/***/ 1813
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getTranslationValueFromContent = exports.getTranslationValue = void 0;
const tslib_1 = __webpack_require__(1635);
const get_1 = tslib_1.__importDefault(__webpack_require__(8156));
const getTranslationValue = (translationLookup, i18nKey, locale) => {
    const translation = translationLookup[locale];
    if (!translation) {
        return null;
    }
    return (0, exports.getTranslationValueFromContent)(translation, i18nKey);
};
exports.getTranslationValue = getTranslationValue;
const getTranslationValueFromContent = (translationContent, i18nKey) => {
    let translationValue = translationContent[i18nKey];
    if (!translationValue) {
        const keyTokens = i18nKey.split('.');
        if (keyTokens.length > 1) {
            translationValue = (0, get_1.default)(translationContent, keyTokens, null);
        }
    }
    return typeof translationValue === 'string' ? translationValue : null;
};
exports.getTranslationValueFromContent = getTranslationValueFromContent;


/***/ },

/***/ 1839
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1635);
tslib_1.__exportStar(__webpack_require__(7953), exports);
tslib_1.__exportStar(__webpack_require__(6836), exports);
tslib_1.__exportStar(__webpack_require__(7194), exports);


/***/ },

/***/ 1873
(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(9325);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ },

/***/ 1882
(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(2552),
    isObject = __webpack_require__(3805);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ },

/***/ 2032
(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(1042);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ },

/***/ 2167
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getInstallationAri = exports.getEnvironmentAri = exports.getAppAri = void 0;
const getAppAri = (appId) => ({
    appId,
    toString: () => `ari:cloud:ecosystem::app/${appId}`,
    toJSON: () => `ari:cloud:ecosystem::app/${appId}`
});
exports.getAppAri = getAppAri;
const getEnvironmentAri = (appId, environmentId) => ({
    environmentId,
    toString: () => `ari:cloud:ecosystem::environment/${appId}/${environmentId}`,
    toJSON: () => `ari:cloud:ecosystem::environment/${appId}/${environmentId}`
});
exports.getEnvironmentAri = getEnvironmentAri;
const getInstallationAri = (installationId) => ({
    installationId,
    toString: () => `ari:cloud:ecosystem::installation/${installationId}`,
    toJSON: () => `ari:cloud:ecosystem::installation/${installationId}`
});
exports.getInstallationAri = getInstallationAri;


/***/ },

/***/ 2224
(module, __unused_webpack_exports, __webpack_require__) {

var memoize = __webpack_require__(104);

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;


/***/ },

/***/ 2275
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EntityStorageBuilder = void 0;
var storage_builder_1 = __webpack_require__(7560);
Object.defineProperty(exports, "EntityStorageBuilder", ({ enumerable: true, get: function () { return storage_builder_1.EntityStorageBuilder; } }));


/***/ },

/***/ 2552
(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(1873),
    getRawTag = __webpack_require__(659),
    objectToString = __webpack_require__(9350);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ },

/***/ 2651
(module, __unused_webpack_exports, __webpack_require__) {

var isKeyable = __webpack_require__(4218);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ },

/***/ 2749
(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(1042);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ },

/***/ 2949
(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(2651);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ },

/***/ 3040
(module, __unused_webpack_exports, __webpack_require__) {

var Hash = __webpack_require__(1549),
    ListCache = __webpack_require__(79),
    Map = __webpack_require__(8223);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ },

/***/ 3122
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomEntityQueries = exports.UntypedQueries = void 0;
class UntypedQueries {
    static get = (key, encrypted) => ({
        query: `
      query forge_app_getApplicationStorageEntity($key: ID!, $encrypted: Boolean!) {
        appStoredEntity(key: $key, encrypted: $encrypted) {
          key
          value
        }
      }
    `,
        variables: {
            key,
            encrypted
        }
    });
    static set = (key, value, encrypted) => ({
        query: `
      mutation forge_app_setApplicationStorageEntity($input: SetAppStoredEntityMutationInput!) {
        appStorage{
          setAppStoredEntity(input: $input) {
            success

            errors {
              message
              extensions {
                errorType
                statusCode
              }
            }
          }
        }
      }
    `,
        variables: {
            input: {
                key,
                value,
                encrypted
            }
        }
    });
    static delete = (key, encrypted) => ({
        query: `
      mutation forge_app_deleteApplicationStorageEntity($input: DeleteAppStoredEntityMutationInput!) {
        appStorage {
          deleteAppStoredEntity(input: $input) {
            success
  
            errors {
              message
              extensions {
                errorType
                statusCode
              }
            }
          }
        }
      }
    `,
        variables: {
            input: {
                key,
                encrypted
            }
        }
    });
    static listQuery = (options) => ({
        query: `
      query forge_app_getApplicationStorageEntities($where: [AppStoredEntityFilter!], $cursor: String, $limit: Int) {
        appStoredEntities(where: $where, after: $cursor, first: $limit) {
          edges {
            node {
              value
              key
            }
  
            cursor
          }
        }
      }
    `,
        variables: {
            where: options.where ?? null,
            cursor: options.cursor ?? null,
            limit: options.limit ?? null
        }
    });
}
exports.UntypedQueries = UntypedQueries;
class CustomEntityQueries {
    static get = (entityName, key) => ({
        query: `
    query forge_app_getApplicationStorageCustomEntity ($key: ID!, $entityName: String!) {
      appStoredCustomEntity(key: $key, entityName: $entityName) {
          value
          entityName
          key
      }
  }
    `,
        variables: {
            entityName,
            key
        }
    });
    static set = (entityName, key, value) => ({
        query: `
      mutation forge_app_setApplicationStorageCustomEntity($input: SetAppStoredCustomEntityMutationInput!) {
        appStorageCustomEntity{
          setAppStoredCustomEntity(input: $input) {
            success
  
            errors {
              message
              extensions {
                errorType
                statusCode
              }
            }
          }
        }
      }
    `,
        variables: {
            input: {
                entityName,
                key,
                value
            }
        }
    });
    static delete = (entityName, key) => ({
        query: `
      mutation forge_app_deleteApplicationStorageCustomEntity($input: DeleteAppStoredCustomEntityMutationInput!) {
        appStorageCustomEntity {
          deleteAppStoredCustomEntity(input: $input) {
            success
  
            errors {
              message
              extensions {
                errorType
                statusCode
              }
            }
          }
        }
      }
    `,
        variables: {
            input: {
                entityName,
                key
            }
        }
    });
    static listQuery = (options) => {
        return {
            query: `
      query AppStorageCustomEntityQueries ($entityName: String!, $indexName: String!, $range: AppStoredCustomEntityRange, $filters: AppStoredCustomEntityFilters, $sort:SortOrder, $limit: Int, $cursor: String, $partition: [AppStoredCustomEntityFieldValue!]) {
        appStoredCustomEntities(entityName: $entityName, indexName: $indexName, range: $range, filters: $filters, sort:$sort, limit: $limit, cursor: $cursor, partition: $partition) {
            edges {
                node {
                    key
                    value
                }
                cursor
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
            }
            totalCount
            cursor
        }
  } 
      `,
            variables: {
                entityName: options.entityName,
                indexName: options.indexName,
                range: options.range,
                ...(options.filters && options.filters.length
                    ? {
                        filters: {
                            [options.filterOperator || 'and']: options.filters
                        }
                    }
                    : {}),
                ...(options.partition ? { partition: options.partition } : {}),
                ...(options.sort ? { sort: options.sort } : {}),
                ...(options.cursor ? { cursor: options.cursor } : {}),
                ...(options.limit ? { limit: options.limit } : {})
            }
        };
    };
}
exports.CustomEntityQueries = CustomEntityQueries;


/***/ },

/***/ 3222
(module, __unused_webpack_exports, __webpack_require__) {

var baseToString = __webpack_require__(7556);

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ },

/***/ 3318
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.authorizeJiraWithFetch = exports.authorizeConfluenceWithFetch = void 0;
var confluence_1 = __webpack_require__(3445);
Object.defineProperty(exports, "authorizeConfluenceWithFetch", ({ enumerable: true, get: function () { return confluence_1.authorizeConfluenceWithFetch; } }));
var jira_1 = __webpack_require__(3743);
Object.defineProperty(exports, "authorizeJiraWithFetch", ({ enumerable: true, get: function () { return jira_1.authorizeJiraWithFetch; } }));


/***/ },

/***/ 3445
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.authorizeConfluenceWithFetch = void 0;
const tslib_1 = __webpack_require__(1635);
const api_1 = __webpack_require__(3534);
const permissions_1 = tslib_1.__importDefault(__webpack_require__(8393));
const checkConfluencePermissions = async (requestConfluence, accountId, contentId, permission) => {
    const res = await requestConfluence(`/rest/api/content/${contentId}/permission/check`, {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            subject: {
                type: 'user',
                identifier: accountId
            },
            operation: permission
        })
    });
    return res;
};
const getPermissionsCheckFactory = (requestConfluence, accountId, contentId) => (permission) => {
    return async () => {
        const res = await checkConfluencePermissions(requestConfluence, accountId, contentId, permission);
        return Boolean(res?.hasPermission);
    };
};
const authorizeConfluenceWithFetch = (requestConfluence, accountId) => {
    return {
        onConfluenceContent: (contentId) => (0, api_1.createApiMethods)(permissions_1.default, getPermissionsCheckFactory(requestConfluence, accountId, contentId))
    };
};
exports.authorizeConfluenceWithFetch = authorizeConfluenceWithFetch;


/***/ },

/***/ 3534
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createApiMethods = void 0;
const fromEntries = (array) => {
    return array.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});
};
const createApiMethods = (methodToPermissionMap, permissionCheckFactory) => {
    const apiMethodEntries = Object.entries(methodToPermissionMap).map(([methodName, permission]) => [methodName, permissionCheckFactory(permission)]);
    return fromEntries(apiMethodEntries);
};
exports.createApiMethods = createApiMethods;


/***/ },

/***/ 3661
(module, __unused_webpack_exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(3040),
    mapCacheDelete = __webpack_require__(7670),
    mapCacheGet = __webpack_require__(289),
    mapCacheHas = __webpack_require__(4509),
    mapCacheSet = __webpack_require__(2949);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ },

/***/ 3702
(module) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ },

/***/ 3743
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.authorizeJiraWithFetch = void 0;
const api_1 = __webpack_require__(3534);
const permissions_1 = __webpack_require__(8207);
const arrayEquals = (a, b) => {
    return JSON.stringify(Array.from(a.map(String)).sort()) === JSON.stringify(Array.from(b.map(String)).sort());
};
const checkJiraPermissions = async (requestJira, accountId, projectPermissions) => {
    const res = await requestJira('/rest/api/3/permissions/check', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            accountId,
            projectPermissions
        })
    });
    return res;
};
const hasPermissionsForEntities = (projectPermissions, permission, type, entities) => {
    if (!entities || entities.length === 0)
        return true;
    const allowedEntities = projectPermissions.find((permissionResponse) => permissionResponse.permission === permission)?.[type];
    return !!allowedEntities && arrayEquals(allowedEntities, entities);
};
const getPermissionCheckFactory = (requestJira, accountId, type, entities) => (permission) => {
    return async () => {
        const { projectPermissions } = await checkJiraPermissions(requestJira, accountId, [
            {
                permissions: [permission],
                [type]: entities
            }
        ]);
        return hasPermissionsForEntities(projectPermissions, permission, type, entities);
    };
};
const toArray = (id) => (Array.isArray(id) ? id : [id]);
const authorizeJiraWithFetch = (requestJira, accountId) => {
    return {
        onJira: async (projectPermissionsInput) => {
            const result = await checkJiraPermissions(requestJira, accountId, projectPermissionsInput);
            return result.projectPermissions || [];
        },
        onJiraProject: (projects) => (0, api_1.createApiMethods)(permissions_1.API_PROJECTS_PERMISSIONS_MAP, getPermissionCheckFactory(requestJira, accountId, 'projects', toArray(projects))),
        onJiraIssue: (issues) => (0, api_1.createApiMethods)(permissions_1.API_ISSUES_PERMISSIONS_MAP, getPermissionCheckFactory(requestJira, accountId, 'issues', toArray(issues)))
    };
};
exports.authorizeJiraWithFetch = authorizeJiraWithFetch;


/***/ },

/***/ 3765
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.permissions = exports.canLoadResource = exports.canFetchFrom = exports.hasScope = exports.hasPermission = exports.extractUrlString = void 0;
const runtime_1 = __webpack_require__(5429);
const errors_1 = __webpack_require__(9742);
const egress_1 = __webpack_require__(6079);
function extractUrlString(url) {
    if (typeof url === 'string') {
        return url;
    }
    if ('address' in url) {
        return url.address;
    }
    return url.remote;
}
exports.extractUrlString = extractUrlString;
function wrapInSyncMetrics(options, cb) {
    const metrics = (0, runtime_1.__getRuntime)().metrics;
    metrics.counter(options.name, options.tags).incr();
    return cb();
}
const getMissingScopes = (requiredScopes, currentlyGrantedScopes) => {
    if (!requiredScopes) {
        return undefined;
    }
    if (Array.isArray(requiredScopes) && requiredScopes.length > 0) {
        const currentGrantedScopes = Array.isArray(currentlyGrantedScopes) ? currentlyGrantedScopes : [];
        const missingScopes = requiredScopes.filter((scope) => !currentGrantedScopes.includes(scope));
        if (missingScopes.length > 0) {
            return missingScopes;
        }
    }
    return undefined;
};
const getMissingUrls = (requiredUrls, currentlyGrantedUrls, useCSP) => {
    const allowList = currentlyGrantedUrls.map((url) => extractUrlString(url));
    const egressFilter = new egress_1.EgressFilteringService(allowList);
    const missingUrls = requiredUrls.filter((requiredUrl) => {
        const urlString = extractUrlString(requiredUrl);
        if (useCSP) {
            return !egressFilter.isValidUrlCSP(urlString);
        }
        return !egressFilter.isValidUrl(urlString);
    });
    return missingUrls;
};
const VALID_REQUIREMENT_KEYS = ['scopes', 'external'];
const VALID_EXTERNAL_TYPES = [
    'fetch',
    'fonts',
    'frames',
    'images',
    'media',
    'scripts',
    'styles'
];
const VALID_FETCH_TYPES = ['backend', 'client'];
const validateKeys = (obj, validKeys) => {
    const validKeysSet = new Set(validKeys);
    const providedKeys = Object.keys(obj);
    const invalidKeys = providedKeys.filter((key) => !validKeysSet.has(key));
    if (invalidKeys.length > 0) {
        throw new Error(`Invalid permission key(s): ${invalidKeys.join(', ')}. ` +
            `Visit https://go.atlassian.com/forge-permissions for more information.`);
    }
};
const validatePermissionRequirements = (requirements) => {
    validateKeys(requirements, VALID_REQUIREMENT_KEYS);
    if (requirements.external) {
        validateKeys(requirements.external, VALID_EXTERNAL_TYPES);
        if (requirements.external.fetch) {
            validateKeys(requirements.external.fetch, VALID_FETCH_TYPES);
        }
    }
};
const getMissingFetchPermissions = (requiredFetch, currentlyGrantedFetch) => {
    if (!requiredFetch) {
        return undefined;
    }
    const missingFetch = {};
    Object.keys(requiredFetch).forEach((fetchType) => {
        const requiredUrls = requiredFetch[fetchType];
        if (!requiredUrls || !Array.isArray(requiredUrls) || requiredUrls.length === 0)
            return;
        const missingUrls = getMissingUrls(requiredUrls, currentlyGrantedFetch?.[fetchType] ?? [], fetchType === 'client');
        if (missingUrls.length) {
            missingFetch[fetchType] = missingUrls.map(extractUrlString);
        }
    });
    return Object.keys(missingFetch).length ? missingFetch : undefined;
};
const getMissingExternalPermissions = (requiredExternal, currentGrantedExternal) => {
    let missingExternal = undefined;
    Object.keys(requiredExternal).forEach((type) => {
        if (type === 'fetch') {
            const missingFetchPerms = getMissingFetchPermissions(requiredExternal.fetch, currentGrantedExternal.fetch);
            if (missingFetchPerms) {
                if (!missingExternal) {
                    missingExternal = {};
                }
                missingExternal.fetch = missingFetchPerms;
            }
            return;
        }
        const externalUrls = requiredExternal[type];
        if (!externalUrls || !Array.isArray(externalUrls) || externalUrls.length === 0) {
            return;
        }
        const missingUrls = getMissingUrls(externalUrls, currentGrantedExternal[type] || [], true);
        if (missingUrls.length > 0) {
            if (!missingExternal) {
                missingExternal = {};
            }
            missingExternal[type] = missingUrls.map(extractUrlString);
        }
    });
    return missingExternal;
};
const hasPermission = (requirements) => {
    return wrapInSyncMetrics({ name: 'api.permissions.hasPermission' }, () => hasPermissionWithoutMetrics(requirements));
};
exports.hasPermission = hasPermission;
const hasPermissionWithoutMetrics = (requirements) => {
    const appContext = (0, runtime_1.getAppContext)();
    const currentlyGrantedPermissions = appContext.permissions;
    const arePermissionsAvailable = !!(currentlyGrantedPermissions && typeof currentlyGrantedPermissions === 'object');
    if (!arePermissionsAvailable) {
        throw new errors_1.ApiNotReadyError('This feature is not available yet');
    }
    validatePermissionRequirements(requirements);
    const missingPermissions = {};
    let hasMissingPermissions = false;
    const missingScopes = getMissingScopes(requirements.scopes, currentlyGrantedPermissions.scopes);
    if (missingScopes) {
        missingPermissions.scopes = missingScopes;
        hasMissingPermissions = true;
    }
    if (requirements.external) {
        const { external: requiredExternal } = requirements;
        const currentlyGrantedExternal = currentlyGrantedPermissions.external || {};
        const missingExternalPerms = getMissingExternalPermissions(requiredExternal, currentlyGrantedExternal);
        if (missingExternalPerms) {
            missingPermissions.external = {
                ...missingPermissions.external,
                ...missingExternalPerms
            };
            hasMissingPermissions = true;
        }
    }
    return {
        granted: !hasMissingPermissions,
        ...(hasMissingPermissions && {
            missing: new runtime_1.MissingPermissions(missingPermissions.scopes, missingPermissions.external)
        })
    };
};
const hasScope = (scope) => {
    return wrapInSyncMetrics({ name: 'api.permissions.hasScope' }, () => hasPermissionWithoutMetrics({ scopes: [scope] }).granted);
};
exports.hasScope = hasScope;
const canFetchFrom = (type, url) => {
    return wrapInSyncMetrics({ name: 'api.permissions.canFetchFrom' }, () => hasPermissionWithoutMetrics({ external: { fetch: { [type]: [url] } } }).granted);
};
exports.canFetchFrom = canFetchFrom;
const canLoadResource = (type, url) => {
    return wrapInSyncMetrics({ name: 'api.permissions.canLoadResource' }, () => hasPermissionWithoutMetrics({ external: { [type]: [url] } }).granted);
};
exports.canLoadResource = canLoadResource;
exports.permissions = {
    hasPermission: exports.hasPermission,
    hasScope: exports.hasScope,
    canFetchFrom: exports.canFetchFrom,
    canLoadResource: exports.canLoadResource
};


/***/ },

/***/ 3805
(module) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ },

/***/ 3862
(module) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ },

/***/ 3976
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GlobalStorage = void 0;
const errors_1 = __webpack_require__(4636);
const gql_queries_1 = __webpack_require__(3122);
function assertNoErrors(errors) {
    if (errors && errors.length > 0) {
        const { message, extensions: { errorType } } = errors[0];
        throw errors_1.APIError.forErrorCode(errorType, message);
    }
}
async function getResponseBody(response) {
    if (response.status !== 200) {
        throw errors_1.APIError.forStatus(response.status);
    }
    const responseText = await response.text();
    let responseBody;
    try {
        responseBody = JSON.parse(responseText);
    }
    catch (error) {
        throw errors_1.APIError.forUnexpected(`Response text was not a valid JSON: ${responseText}`);
    }
    assertNoErrors(responseBody.errors);
    return responseBody.data;
}
class GlobalStorage {
    apiClient;
    getMetrics;
    endpoint = '/forge/entities/graphql';
    constructor(apiClient, getMetrics) {
        this.apiClient = apiClient;
        this.getMetrics = getMetrics;
    }
    async get(key) {
        return this.getInternal(key, false);
    }
    async getSecret(key) {
        return this.getInternal(key, true);
    }
    async list(options) {
        const requestBody = gql_queries_1.UntypedQueries.listQuery(options);
        const response = await this.wrapInMetric('untyped', 'query', false, async () => await this.query(requestBody));
        const edges = response.appStoredEntities.edges;
        const nextCursor = edges.length > 0 ? edges[edges.length - 1].cursor : undefined;
        const results = edges.map(({ node }) => node);
        return {
            results,
            nextCursor
        };
    }
    async listCustomEntities(options) {
        const requestBody = gql_queries_1.CustomEntityQueries.listQuery(options);
        const response = await this.wrapInMetric('typed', 'query', false, async () => await this.query(requestBody));
        const edges = response.appStoredCustomEntities.edges;
        const results = edges.map(({ node }) => node);
        return {
            results,
            nextCursor: response.appStoredCustomEntities.cursor || null
        };
    }
    async set(key, value) {
        const requestBody = gql_queries_1.UntypedQueries.set(key, value, false);
        await this.wrapInMetric('untyped', 'set', false, async () => await this.mutation(requestBody, 'appStorage', 'setAppStoredEntity'));
    }
    async setSecret(key, value) {
        const requestBody = gql_queries_1.UntypedQueries.set(key, value, true);
        await this.wrapInMetric('untyped', 'set', true, async () => await this.mutation(requestBody, 'appStorage', 'setAppStoredEntity'));
    }
    async delete(key) {
        const requestBody = gql_queries_1.UntypedQueries.delete(key, false);
        await this.wrapInMetric('untyped', 'delete', false, async () => this.mutation(requestBody, 'appStorage', 'deleteAppStoredEntity'));
    }
    async deleteSecret(key) {
        const requestBody = gql_queries_1.UntypedQueries.delete(key, true);
        await this.wrapInMetric('untyped', 'delete', true, async () => this.mutation(requestBody, 'appStorage', 'deleteAppStoredEntity'));
    }
    async getEntity(entityName, entityKey) {
        return this.getEntityInternal(entityName, entityKey);
    }
    async setEntity(entityName, entityKey, value) {
        const requestBody = gql_queries_1.CustomEntityQueries.set(entityName, entityKey, value);
        await this.wrapInMetric('typed', 'set', false, async () => this.mutation(requestBody, 'appStorageCustomEntity', 'setAppStoredCustomEntity'));
    }
    async deleteEntity(entityName, entityKey) {
        const requestBody = gql_queries_1.CustomEntityQueries.delete(entityName, entityKey);
        await this.wrapInMetric('typed', 'delete', false, async () => await this.mutation(requestBody, 'appStorageCustomEntity', 'deleteAppStoredCustomEntity'));
    }
    async getInternal(key, encrypted) {
        const requestBody = gql_queries_1.UntypedQueries.get(key, encrypted);
        const { appStoredEntity: { value } } = await this.wrapInMetric('untyped', 'get', encrypted, async () => await this.query(requestBody));
        return value ?? undefined;
    }
    async getEntityInternal(entityName, entityKey) {
        const requestBody = gql_queries_1.CustomEntityQueries.get(entityName, entityKey);
        const { appStoredCustomEntity: { value } } = await this.wrapInMetric('typed', 'get', false, async () => await this.query(requestBody));
        return value ?? undefined;
    }
    buildRequest(requestBody) {
        return {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'content-type': 'application/json'
            }
        };
    }
    async query(body) {
        const response = await this.apiClient(this.endpoint, this.buildRequest(body));
        return await getResponseBody(response);
    }
    async mutation(body, namespace, mutationMethod) {
        const response = await this.apiClient(this.endpoint, this.buildRequest(body));
        const { [namespace]: { [mutationMethod]: { success, errors } } } = await getResponseBody(response);
        assertNoErrors(errors);
        if (!success) {
            throw errors_1.APIError.forStatus(500);
        }
        return response;
    }
    async wrapInMetric(store, operation, encrypted, fn) {
        const metrics = this.getMetrics();
        if (!metrics) {
            return await fn();
        }
        const timer = metrics
            .timing('forge.runtime.storage.operation.latency', { store, operation, encrypted: String(encrypted) })
            .measure();
        try {
            const result = await fn();
            timer.stop({ success: 'true' });
            metrics
                .counter('forge.runtime.storage.operation', {
                store,
                operation,
                encrypted: String(encrypted),
                success: 'true'
            })
                .incr();
            return result;
        }
        catch (error) {
            timer.stop({ success: 'false' });
            metrics
                .counter('forge.runtime.storage.operation', {
                store,
                operation,
                encrypted: String(encrypted),
                success: 'false'
            })
                .incr();
            throw error;
        }
    }
}
exports.GlobalStorage = GlobalStorage;


/***/ },

/***/ 4218
(module) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ },

/***/ 4280
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getI18nSupportedModuleEntries = exports.extractI18nPropertiesFromModules = exports.extractI18nKeysFromModules = exports.getTranslationValue = void 0;
const tslib_1 = __webpack_require__(1635);
tslib_1.__exportStar(__webpack_require__(6893), exports);
tslib_1.__exportStar(__webpack_require__(6829), exports);
tslib_1.__exportStar(__webpack_require__(1100), exports);
tslib_1.__exportStar(__webpack_require__(7898), exports);
var translationValueGetter_1 = __webpack_require__(1813);
Object.defineProperty(exports, "getTranslationValue", ({ enumerable: true, get: function () { return translationValueGetter_1.getTranslationValue; } }));
var moduleI18nHelper_1 = __webpack_require__(9962);
Object.defineProperty(exports, "extractI18nKeysFromModules", ({ enumerable: true, get: function () { return moduleI18nHelper_1.extractI18nKeysFromModules; } }));
Object.defineProperty(exports, "extractI18nPropertiesFromModules", ({ enumerable: true, get: function () { return moduleI18nHelper_1.extractI18nPropertiesFromModules; } }));
Object.defineProperty(exports, "getI18nSupportedModuleEntries", ({ enumerable: true, get: function () { return moduleI18nHelper_1.getI18nSupportedModuleEntries; } }));
tslib_1.__exportStar(__webpack_require__(5181), exports);


/***/ },

/***/ 4394
(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(2552),
    isObjectLike = __webpack_require__(346);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ },

/***/ 4509
(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(2651);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ },

/***/ 4636
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.APIError = exports.getErrorMessage = exports.getErrorMessageFromCode = void 0;
const getErrorMessageFromCode = (code, message) => {
    return message ?? code;
};
exports.getErrorMessageFromCode = getErrorMessageFromCode;
const getErrorMessage = (statusCode) => {
    switch (statusCode) {
        case 400:
        case 413:
            return 'Bad request';
        case 401:
            return 'Authentication error';
        case 403:
        case 404:
            return 'Permissions error or key does not exist';
        case 409:
            return 'Conflicting update occurred';
        case 500:
            return 'Internal server error';
        default:
            return `Unknown error. Received status code '${statusCode}'`;
    }
};
exports.getErrorMessage = getErrorMessage;
class APIError extends Error {
    constructor(message) {
        super(message);
    }
    static forStatus(status) {
        return new APIError((0, exports.getErrorMessage)(status));
    }
    static forErrorCode(code, message) {
        return new APIError((0, exports.getErrorMessageFromCode)(code, message));
    }
    static forUnexpected(message) {
        return new APIError(message);
    }
}
exports.APIError = APIError;


/***/ },

/***/ 4739
(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(6025);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ },

/***/ 4840
(module) {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;


/***/ },

/***/ 4932
(module) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ },

/***/ 5083
(module, __unused_webpack_exports, __webpack_require__) {

var isFunction = __webpack_require__(1882),
    isMasked = __webpack_require__(7296),
    isObject = __webpack_require__(3805),
    toSource = __webpack_require__(7473);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ },

/***/ 5181
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ 5288
(module) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ },

/***/ 5429
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.bindInvocationContext = exports.wrapInMetrics = exports.getAppContext = exports.__getRuntime = exports.MissingPermissions = exports.PermissionRequirements = exports.RuntimePermissions = exports.Permissions = void 0;
const errors_1 = __webpack_require__(9742);
const ari_1 = __webpack_require__(2167);
const extractUrlString = (item) => {
    if (typeof item === 'string') {
        return item;
    }
    else if ('address' in item) {
        return item.address;
    }
    else {
        return item.remote;
    }
};
const formatScopesSection = (scopes) => {
    if (scopes && Array.isArray(scopes) && scopes.length > 0) {
        return `Scopes: ${scopes.join(', ')}`;
    }
    return null;
};
const formatExternalSection = (external) => {
    if (!external) {
        return null;
    }
    const externalParts = [];
    Object.keys(external).forEach((type) => {
        if (type === 'fetch') {
            const fetchParts = getFetchPermissions(external.fetch);
            externalParts.push(...fetchParts);
        }
        else {
            const externalUrls = external[type];
            if (externalUrls && Array.isArray(externalUrls) && externalUrls.length > 0) {
                const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
                const urlList = externalUrls.map(extractUrlString).join(', ');
                externalParts.push(`${capitalizedType}: ${urlList}`);
            }
        }
    });
    return externalParts.length > 0 ? `External: ${externalParts.join('; ')}` : null;
};
const getFetchPermissions = (fetch) => {
    if (!fetch) {
        return [];
    }
    const fetchParts = [];
    Object.keys(fetch).forEach((fetchType) => {
        const urls = fetch[fetchType];
        if (urls && urls.length > 0) {
            const urlList = urls.map(extractUrlString).join(', ');
            const capitalizedType = fetchType.charAt(0).toUpperCase() + fetchType.slice(1);
            fetchParts.push(`Fetch ${capitalizedType}: ${urlList}`);
        }
    });
    return fetchParts;
};
class Permissions {
    format() {
        const parts = [];
        const scopesSection = formatScopesSection(this.scopes);
        if (scopesSection) {
            parts.push(scopesSection);
        }
        const externalSection = formatExternalSection(this.external);
        if (externalSection) {
            parts.push(externalSection);
        }
        return parts.length > 0 ? parts.join('; ') : 'No permissions specified';
    }
}
exports.Permissions = Permissions;
class RuntimePermissions extends Permissions {
    scopes;
    external;
    constructor(scopes, external) {
        super();
        this.scopes = scopes;
        this.external = external;
    }
}
exports.RuntimePermissions = RuntimePermissions;
class PermissionRequirements extends Permissions {
    scopes;
    external;
    constructor(scopes, external) {
        super();
        this.scopes = scopes;
        this.external = external;
    }
}
exports.PermissionRequirements = PermissionRequirements;
class MissingPermissions extends Permissions {
    scopes;
    external;
    constructor(scopes, external) {
        super();
        this.scopes = scopes;
        this.external = external;
    }
}
exports.MissingPermissions = MissingPermissions;
function __getRuntime() {
    const runtime = global.__forge_runtime__;
    if (!runtime) {
        throw new Error('Forge runtime not found.');
    }
    return runtime;
}
exports.__getRuntime = __getRuntime;
function getAppContext() {
    const runtime = __getRuntime();
    const { appId, appVersion, environmentId, environmentType, invocationId, installationId, moduleKey, license, installation, permissions } = runtime.appContext;
    const invocationRemainingTimeInMillis = runtime.lambdaContext.getRemainingTimeInMillis ??
        (() => {
            throw new Error('Lambda remaining time is not available. If tunnelling, update Forge CLI to the latest version.');
        });
    return {
        appAri: (0, ari_1.getAppAri)(appId),
        appVersion,
        environmentAri: (0, ari_1.getEnvironmentAri)(appId, environmentId),
        environmentType,
        installationAri: (0, ari_1.getInstallationAri)(installationId),
        invocationId,
        invocationRemainingTimeInMillis,
        moduleKey,
        license,
        installation,
        permissions: new RuntimePermissions(permissions?.scopes || [], permissions?.external || {})
    };
}
exports.getAppContext = getAppContext;
function wrapInMetrics(name, fn) {
    return async (...args) => {
        const { metrics } = __getRuntime();
        metrics.counter(name).incr();
        const timer = metrics.timing(name).measure();
        let success = true;
        try {
            return await fn(...args);
        }
        catch (e) {
            const undiciError = global.__forge_undici_error__;
            if (e instanceof errors_1.ProxyRequestError ||
                (undiciError && typeof undiciError === 'function' && e instanceof undiciError)) {
                success = false;
            }
            throw e;
        }
        finally {
            timer.stop({ success: success.toString() });
        }
    };
}
exports.wrapInMetrics = wrapInMetrics;
function bindInvocationContext(fn) {
    const AsyncLocalStorage = (__webpack_require__(290).AsyncLocalStorage);
    return AsyncLocalStorage.bind(fn);
}
exports.bindInvocationContext = bindInvocationContext;


/***/ },

/***/ 5481
(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(9325);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ },

/***/ 5749
(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(1042);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ },

/***/ 6014
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.webTrigger = void 0;
const runtime_1 = __webpack_require__(5429);
const fetch_1 = __webpack_require__(8265);
const proxyGetWebTriggerURL = (0, runtime_1.wrapInMetrics)('api.getWebTriggerUrl', async (webTriggerModuleKey, forceCreate) => {
    const runtime = (0, runtime_1.__getRuntime)();
    const response = await (0, fetch_1.__requestAtlassianAsApp)('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
            mutation forge_app_createWebTriggerUrl($input: WebTriggerUrlInput!, $forceCreate: Boolean) {
              createWebTriggerUrl(input: $input, forceCreate: $forceCreate) {
                url
              }
            }
          `,
            variables: {
                input: {
                    appId: runtime.appContext.appId,
                    envId: runtime.appContext.environmentId,
                    triggerKey: webTriggerModuleKey,
                    contextId: runtime.contextAri
                },
                forceCreate
            }
        })
    });
    if (!response.ok) {
        throw new Error(`Internal error occurred: Failed to get web trigger URL: ${response.statusText}.`);
    }
    const responseBody = (await response.json());
    if (!responseBody?.data?.createWebTriggerUrl?.url) {
        throw new Error(`Internal error occurred: Failed to get web trigger URL.`);
    }
    return responseBody.data.createWebTriggerUrl.url;
});
const proxyDeleteWebTriggerURL = (0, runtime_1.wrapInMetrics)('api.deleteWebTriggerUrl', async (webTriggerUrl) => {
    const callDelete = async (webTriggerUrlId) => {
        const response = await (0, fetch_1.__requestAtlassianAsApp)('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
            mutation forge_app_deleteWebTriggerUrl($id: ID!) {
              deleteWebTriggerUrl(id: $id) {
                success
                message
              }
            }
          `,
                variables: {
                    id: webTriggerUrlId
                }
            })
        });
        if (!response.ok) {
            throw new Error(`Internal error occurred: Failed to delete web trigger URL: ${response.statusText}.`);
        }
        const responseBody = (await response.json());
        if (!responseBody?.data?.deleteWebTriggerUrl?.success) {
            const errorText = responseBody?.data?.deleteWebTriggerUrl?.message || 'unknown error';
            throw new Error(`Internal error occurred: Failed to delete web trigger URL: ${errorText}`);
        }
    };
    const urlIds = await exports.webTrigger.getUrlIds(webTriggerUrl);
    for (const urlId of urlIds) {
        await callDelete(urlId);
    }
});
const proxyGetWebTriggerUrlIds = (0, runtime_1.wrapInMetrics)('api.getWebTriggerUrlIds', async (webTriggerUrl) => {
    const runtime = (0, runtime_1.__getRuntime)();
    const response = await (0, fetch_1.__requestAtlassianAsApp)('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
            query forge_app_webTriggerUrlsByAppContext($appId: ID!, $envId: ID!, $contextId: ID!) {
              webTriggerUrlsByAppContext(appId: $appId, envId: $envId, contextId: $contextId) {
                id
                url
              }
            }
          `,
            variables: {
                appId: runtime.appContext.appId,
                envId: runtime.appContext.environmentId,
                contextId: runtime.contextAri
            }
        })
    });
    if (!response.ok) {
        throw new Error(`Internal error occurred: Failed to get web trigger URLs: ${response.statusText}.`);
    }
    const responseBody = (await response.json());
    if (!responseBody?.data?.webTriggerUrlsByAppContext || responseBody.data.webTriggerUrlsByAppContext.length == 0) {
        throw new Error('Internal error occurred: No web trigger URLs found');
    }
    const result = responseBody.data.webTriggerUrlsByAppContext
        .filter((webTriggerResult) => webTriggerResult.url == webTriggerUrl)
        .map((webTriggerResult) => webTriggerResult.id);
    if (!result || result.length == 0) {
        throw new Error('Internal error occurred: Web trigger URL matching URL not found');
    }
    return result;
});
exports.webTrigger = {
    getUrl: async (webTriggerModuleKey, forceCreate = false) => proxyGetWebTriggerURL(webTriggerModuleKey, forceCreate),
    deleteUrl: async (webTriggerUrl) => proxyDeleteWebTriggerURL(webTriggerUrl),
    getUrlIds: async (webTriggerUrl) => proxyGetWebTriggerUrlIds(webTriggerUrl)
};


/***/ },

/***/ 6019
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomEntityIndexBuilder = exports.APIError = exports.SortOrder = exports.EntityStorageBuilder = exports.FilterConditions = exports.WhereConditions = exports.startsWith = exports.GlobalStorage = exports.getStorageInstanceWithQuery = void 0;
const entity_storage_1 = __webpack_require__(2275);
const query_api_1 = __webpack_require__(258);
const getStorageInstanceWithQuery = (adapter) => {
    return {
        get: adapter.get.bind(adapter),
        set: adapter.set.bind(adapter),
        delete: adapter.delete.bind(adapter),
        getSecret: adapter.getSecret.bind(adapter),
        setSecret: adapter.setSecret.bind(adapter),
        deleteSecret: adapter.deleteSecret.bind(adapter),
        query: () => new query_api_1.DefaultQueryBuilder(adapter),
        entity: (entityName) => new entity_storage_1.EntityStorageBuilder(entityName, adapter)
    };
};
exports.getStorageInstanceWithQuery = getStorageInstanceWithQuery;
var global_storage_1 = __webpack_require__(3976);
Object.defineProperty(exports, "GlobalStorage", ({ enumerable: true, get: function () { return global_storage_1.GlobalStorage; } }));
var conditions_1 = __webpack_require__(6229);
Object.defineProperty(exports, "startsWith", ({ enumerable: true, get: function () { return conditions_1.startsWith; } }));
var conditions_2 = __webpack_require__(8054);
Object.defineProperty(exports, "WhereConditions", ({ enumerable: true, get: function () { return conditions_2.WhereConditions; } }));
Object.defineProperty(exports, "FilterConditions", ({ enumerable: true, get: function () { return conditions_2.FilterConditions; } }));
var entity_storage_2 = __webpack_require__(2275);
Object.defineProperty(exports, "EntityStorageBuilder", ({ enumerable: true, get: function () { return entity_storage_2.EntityStorageBuilder; } }));
var query_interfaces_1 = __webpack_require__(9872);
Object.defineProperty(exports, "SortOrder", ({ enumerable: true, get: function () { return query_interfaces_1.SortOrder; } }));
var errors_1 = __webpack_require__(4636);
Object.defineProperty(exports, "APIError", ({ enumerable: true, get: function () { return errors_1.APIError; } }));
var query_api_2 = __webpack_require__(1026);
Object.defineProperty(exports, "CustomEntityIndexBuilder", ({ enumerable: true, get: function () { return query_api_2.CustomEntityIndexBuilder; } }));


/***/ },

/***/ 6025
(module, __unused_webpack_exports, __webpack_require__) {

var eq = __webpack_require__(5288);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ },

/***/ 6079
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1635);
tslib_1.__exportStar(__webpack_require__(1839), exports);


/***/ },

/***/ 6110
(module, __unused_webpack_exports, __webpack_require__) {

var baseIsNative = __webpack_require__(5083),
    getValue = __webpack_require__(392);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ },

/***/ 6229
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.startsWith = void 0;
function startsWith(value) {
    return {
        condition: 'STARTS_WITH',
        value: value
    };
}
exports.startsWith = startsWith;


/***/ },

/***/ 6449
(module) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ },

/***/ 6613
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.i18n = exports.createTranslationFunction = exports.getTranslations = exports.resetTranslationsCache = void 0;
const i18n_1 = __webpack_require__(4280);
const fs_1 = __webpack_require__(9896);
const path_1 = __webpack_require__(6928);
const runtime_1 = __webpack_require__(5429);
const getI18nBundleFolderPath = () => {
    const { appCodeDir } = (0, runtime_1.__getRuntime)().container;
    return appCodeDir ? [appCodeDir, i18n_1.I18N_BUNDLE_FOLDER_NAME] : [i18n_1.I18N_BUNDLE_FOLDER_NAME];
};
const readLocaleFileContent = async (filePath) => {
    const fileContent = await fs_1.promises.readFile((0, path_1.join)(...getI18nBundleFolderPath(), filePath));
    return JSON.parse(fileContent.toString());
};
const makeResourceAccessorErrorMessage = (message) => {
    if (global.__forge_tunnel__) {
        const cliUpdateWarning = 'To access i18n resources while using `forge tunnel`, please ensure that your Forge CLI is up to date. Run `npm install -g @forge/cli` to update to the latest version.';
        return `${message}\n${cliUpdateWarning}`;
    }
    return message;
};
const resolverResourcesAccessor = {
    getI18nInfoConfig: async () => {
        try {
            const info = (await readLocaleFileContent(i18n_1.I18N_INFO_FILE_NAME));
            return info.config;
        }
        catch (error) {
            throw new i18n_1.TranslationGetterError(makeResourceAccessorErrorMessage('Failed to get i18n info config.'));
        }
    },
    getTranslationResource: async (locale) => {
        try {
            return await readLocaleFileContent(`${locale}.json`);
        }
        catch (error) {
            throw new i18n_1.TranslationGetterError(makeResourceAccessorErrorMessage(`Failed to get translation resource for locale: ${locale}.`));
        }
    }
};
const translationsFunctionCache = new Map();
const translationsGetter = new i18n_1.TranslationsGetter(resolverResourcesAccessor);
const resetTranslationsCache = () => {
    translationsGetter.reset();
    translationsFunctionCache.clear();
};
exports.resetTranslationsCache = resetTranslationsCache;
const getTranslations = async (rawLocale, options = {
    fallback: true
}) => {
    const locale = doEnsureLocale(rawLocale);
    return await translationsGetter.getTranslations(locale, options);
};
exports.getTranslations = getTranslations;
const createTranslationFunction = async (rawLocale) => {
    const locale = doEnsureLocale(rawLocale);
    let translator = translationsFunctionCache.get(locale);
    if (!translator) {
        translator = await createTranslationFunctionImpl(locale);
        translationsFunctionCache.set(locale, translator);
    }
    return translator;
};
exports.createTranslationFunction = createTranslationFunction;
const doEnsureLocale = (rawLocale) => {
    const ensuredLocale = (0, i18n_1.ensureLocale)(rawLocale);
    if (!ensuredLocale) {
        console.warn(`The locale "${rawLocale}" is not supported, defaulting to the default locale.`);
        return rawLocale;
    }
    return ensuredLocale;
};
const createTranslationFunctionImpl = async (locale) => {
    const translator = new i18n_1.Translator(locale, translationsGetter);
    await translator.init();
    return (i18nKey, defaultValue) => translator.translate(i18nKey) ?? defaultValue ?? i18nKey;
};
exports.i18n = {
    createTranslationFunction: exports.createTranslationFunction,
    getTranslations: exports.getTranslations
};


/***/ },

/***/ 6721
(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(1042);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ },

/***/ 6829
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TranslationsGetter = exports.TranslationGetterError = void 0;
const pushIfNotExists = (array, item) => {
    if (!array.includes(item)) {
        array.push(item);
    }
};
class TranslationGetterError extends Error {
    constructor(message) {
        super(message);
        this.name = 'TranslationGetterError';
    }
}
exports.TranslationGetterError = TranslationGetterError;
class TranslationsGetter {
    resourcesAccessor;
    i18nInfoConfig = null;
    translationResources = new Map();
    constructor(resourcesAccessor) {
        this.resourcesAccessor = resourcesAccessor;
    }
    async getTranslations(locale, options = { fallback: true }) {
        const i18nInfoConfig = await this.getI18nInfoConfig();
        const { fallback } = options;
        if (!fallback) {
            let translationResource;
            if (i18nInfoConfig.locales.includes(locale)) {
                translationResource = await this.getTranslationResource(locale);
            }
            return {
                translations: translationResource ?? null,
                locale
            };
        }
        for (const targetLocale of this.getLocaleLookupOrder(locale, i18nInfoConfig)) {
            const translationResource = await this.getTranslationResource(targetLocale);
            if (translationResource) {
                return {
                    translations: translationResource,
                    locale: targetLocale
                };
            }
        }
        return {
            translations: null,
            locale
        };
    }
    async getTranslationsByLocaleLookupOrder(locale) {
        const i18nInfoConfig = await this.getI18nInfoConfig();
        const lookupOrder = this.getLocaleLookupOrder(locale, i18nInfoConfig);
        return await Promise.all(lookupOrder.map(async (targetLocale) => {
            const translationResource = await this.getTranslationResource(targetLocale);
            return {
                locale: targetLocale,
                translations: translationResource
            };
        }));
    }
    reset() {
        this.i18nInfoConfig = null;
        this.translationResources.clear();
    }
    async getTranslationResource(locale) {
        let resource = this.translationResources.get(locale);
        if (!resource) {
            try {
                resource = await this.resourcesAccessor.getTranslationResource(locale);
                this.translationResources.set(locale, resource);
            }
            catch (error) {
                if (error instanceof TranslationGetterError) {
                    throw error;
                }
                throw new TranslationGetterError(`Failed to get translation resource for locale: ${locale}`);
            }
        }
        return resource;
    }
    async getI18nInfoConfig() {
        if (!this.i18nInfoConfig) {
            try {
                this.i18nInfoConfig = await this.resourcesAccessor.getI18nInfoConfig();
            }
            catch (error) {
                if (error instanceof TranslationGetterError) {
                    throw error;
                }
                throw new TranslationGetterError('Failed to get i18n info config');
            }
        }
        return this.i18nInfoConfig;
    }
    getLocaleLookupOrder(locale, config) {
        const { locales, fallback } = config;
        const lookupOrder = [locale];
        const fallbackLocales = fallback[locale];
        if (fallbackLocales && Array.isArray(fallbackLocales) && fallbackLocales.length > 0) {
            lookupOrder.push(...fallbackLocales);
        }
        pushIfNotExists(lookupOrder, config.fallback.default);
        return lookupOrder.filter((locale) => locales.includes(locale));
    }
}
exports.TranslationsGetter = TranslationsGetter;


/***/ },

/***/ 6836
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseUrl = void 0;
function parseUrl(url) {
    var _a, _b;
    const protocol = (_b = (_a = url.match(/^(.*?:)/)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : 'https:';
    const hostAndPath = url.replace(protocol, '').replace(/^\/*/, '').replace(/^\\*/, '').split('?')[0].split('#')[0];
    const hostname = hostAndPath.split('/')[0];
    const pathname = hostAndPath.slice(hostname.length) || '/';
    return { protocol, hostname, pathname };
}
exports.parseUrl = parseUrl;


/***/ },

/***/ 6893
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FORGE_SUPPORTED_LOCALE_CODES = exports.I18N_BUNDLE_FOLDER_NAME = exports.I18N_INFO_FILE_NAME = void 0;
exports.I18N_INFO_FILE_NAME = 'i18n-info.json';
exports.I18N_BUNDLE_FOLDER_NAME = '__LOCALES__';
exports.FORGE_SUPPORTED_LOCALE_CODES = [
    'zh-CN',
    'zh-TW',
    'cs-CZ',
    'da-DK',
    'nl-NL',
    'en-US',
    'en-GB',
    'et-EE',
    'fi-FI',
    'fr-FR',
    'de-DE',
    'hu-HU',
    'is-IS',
    'it-IT',
    'ja-JP',
    'ko-KR',
    'no-NO',
    'pl-PL',
    'pt-BR',
    'pt-PT',
    'ro-RO',
    'ru-RU',
    'sk-SK',
    'tr-TR',
    'es-ES',
    'sv-SE'
];


/***/ },

/***/ 6928
(module) {

"use strict";
module.exports = require("path");

/***/ },

/***/ 7194
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getEgressesBasedOnToggles = exports.sortAndGroupEgressPermissionsByDomain = exports.EgressCategory = exports.EgressType = exports.globToRegex = void 0;
const url_parser_1 = __webpack_require__(6836);
function globToRegex(pattern) {
    const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
    const regexPattern = escaped.replace(/\*/g, '.*');
    return new RegExp(`^${regexPattern}$`);
}
exports.globToRegex = globToRegex;
const sortAndGroupEgressPermissionsByDomain = (egressAddresses) => {
    if ((egressAddresses === null || egressAddresses === void 0 ? void 0 : egressAddresses.length) === 0) {
        return [];
    }
    const protocolRegex = /^(.*?:\/\/)/;
    const domains = new Set();
    const wildcardDomains = [];
    egressAddresses.forEach((item) => {
        const itemWithProtocol = protocolRegex.test(item) ? item : `https://${item}`;
        const url = (0, url_parser_1.parseUrl)(itemWithProtocol);
        if (url.hostname.startsWith('*')) {
            domains.add(url.hostname.substring(2));
            wildcardDomains.push(globToRegex(url.hostname));
        }
        else {
            domains.add(url.hostname);
        }
    });
    return [...domains].sort().reduce((grouped, domain) => {
        if (!wildcardDomains.some((pattern) => pattern.test(domain))) {
            grouped.push(domain);
        }
        return grouped;
    }, []);
};
exports.sortAndGroupEgressPermissionsByDomain = sortAndGroupEgressPermissionsByDomain;
var EgressType;
(function (EgressType) {
    EgressType["FetchBackendSide"] = "FETCH_BACKEND_SIDE";
    EgressType["FetchClientSide"] = "FETCH_CLIENT_SIDE";
    EgressType["Fonts"] = "FONTS";
    EgressType["Frames"] = "FRAMES";
    EgressType["Images"] = "IMAGES";
    EgressType["Media"] = "MEDIA";
    EgressType["Navigation"] = "NAVIGATION";
    EgressType["Scripts"] = "SCRIPTS";
    EgressType["Styles"] = "STYLES";
})(EgressType = exports.EgressType || (exports.EgressType = {}));
var EgressCategory;
(function (EgressCategory) {
    EgressCategory["ANALYTICS"] = "ANALYTICS";
})(EgressCategory = exports.EgressCategory || (exports.EgressCategory = {}));
const getEgressesBasedOnToggles = (input) => {
    const filteredEgresses = input.egress.filter((egress) => {
        var _a;
        if (((_a = egress.category) === null || _a === void 0 ? void 0 : _a.toUpperCase()) === EgressCategory.ANALYTICS) {
            if (input.installationConfig) {
                const analyticsConfig = input.installationConfig.find((config) => config.key.toUpperCase() === 'ALLOW_EGRESS_ANALYTICS');
                return (analyticsConfig === null || analyticsConfig === void 0 ? void 0 : analyticsConfig.value) !== false;
            }
            else {
                return input.overrides.ALLOW_EGRESS_ANALYTICS !== false;
            }
        }
        return true;
    });
    const egressByType = new Map();
    for (const egress of filteredEgresses) {
        if (!egressByType.has(egress.type)) {
            egressByType.set(egress.type, egress.addresses);
        }
        egressByType.set(egress.type, [...egressByType.get(egress.type), ...egress.addresses]);
    }
    return [...egressByType.entries()].map(([type, egresses]) => ({
        type,
        addresses: [...new Set(egresses)]
    }));
};
exports.getEgressesBasedOnToggles = getEgressesBasedOnToggles;


/***/ },

/***/ 7274
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.permissions = exports.i18n = exports.routeFromAbsolute = exports.route = exports.assumeTrustedRoute = exports.getAppContext = exports.bindInvocationContext = exports.__getRuntime = exports.RequestProductNotAllowedError = exports.ProxyRequestError = exports.ProductEndpointNotAllowedError = exports.NotAllowedError = exports.NeedsAuthenticationError = exports.isHostedCodeError = exports.isForgePlatformError = exports.isExpectedError = exports.InvalidWorkspaceRequestedError = exports.HttpError = exports.FUNCTION_ERR = exports.FetchError = exports.ExternalEndpointNotAllowedError = exports.WhereConditions = exports.startsWith = exports.SortOrder = exports.FilterConditions = exports.createRequestStargateAsApp = exports.webTrigger = exports.storage = exports.requestJira = exports.requestConfluence = exports.requestBitbucket = exports.invokeService = exports.invokeRemote = exports.fetch = exports.authorize = exports.asUser = exports.asApp = exports.__requestAtlassianAsUser = exports.__requestAtlassianAsApp = exports.__fetchProduct = exports.privacy = void 0;
const storage_1 = __webpack_require__(6019);
const endpoint_1 = __webpack_require__(972);
Object.defineProperty(exports, "invokeRemote", ({ enumerable: true, get: function () { return endpoint_1.invokeRemote; } }));
Object.defineProperty(exports, "invokeService", ({ enumerable: true, get: function () { return endpoint_1.invokeService; } }));
const fetch_1 = __webpack_require__(8265);
Object.defineProperty(exports, "__fetchProduct", ({ enumerable: true, get: function () { return fetch_1.__fetchProduct; } }));
Object.defineProperty(exports, "__requestAtlassianAsApp", ({ enumerable: true, get: function () { return fetch_1.__requestAtlassianAsApp; } }));
Object.defineProperty(exports, "__requestAtlassianAsUser", ({ enumerable: true, get: function () { return fetch_1.__requestAtlassianAsUser; } }));
const runtime_1 = __webpack_require__(5429);
const authorization_1 = __webpack_require__(9140);
Object.defineProperty(exports, "authorize", ({ enumerable: true, get: function () { return authorization_1.authorize; } }));
const privacy_1 = __webpack_require__(1317);
const webTrigger_1 = __webpack_require__(6014);
Object.defineProperty(exports, "webTrigger", ({ enumerable: true, get: function () { return webTrigger_1.webTrigger; } }));
const fetchAPI = (0, fetch_1.getFetchAPI)();
const asUser = fetchAPI.asUser;
exports.asUser = asUser;
const asApp = fetchAPI.asApp;
exports.asApp = asApp;
const fetch = fetchAPI.fetch;
exports.fetch = fetch;
const requestJira = fetchAPI.requestJira;
exports.requestJira = requestJira;
const requestConfluence = fetchAPI.requestConfluence;
exports.requestConfluence = requestConfluence;
const requestBitbucket = fetchAPI.requestBitbucket;
exports.requestBitbucket = requestBitbucket;
const storage = (0, storage_1.getStorageInstanceWithQuery)(new storage_1.GlobalStorage(fetch_1.__requestAtlassianAsApp, () => (0, runtime_1.__getRuntime)().metrics));
exports.storage = storage;
const API = {
    ...fetchAPI,
    invokeRemote: endpoint_1.invokeRemote,
    invokeService: endpoint_1.invokeService
};
exports.privacy = {
    reportPersonalData: (0, privacy_1.createReportPersonalData)(fetch_1.__requestAtlassianAsApp)
};
exports["default"] = API;
const createRequestStargateAsApp = () => fetch_1.__requestAtlassianAsApp;
exports.createRequestStargateAsApp = createRequestStargateAsApp;
var storage_2 = __webpack_require__(6019);
Object.defineProperty(exports, "FilterConditions", ({ enumerable: true, get: function () { return storage_2.FilterConditions; } }));
Object.defineProperty(exports, "SortOrder", ({ enumerable: true, get: function () { return storage_2.SortOrder; } }));
Object.defineProperty(exports, "startsWith", ({ enumerable: true, get: function () { return storage_2.startsWith; } }));
Object.defineProperty(exports, "WhereConditions", ({ enumerable: true, get: function () { return storage_2.WhereConditions; } }));
var errors_1 = __webpack_require__(9742);
Object.defineProperty(exports, "ExternalEndpointNotAllowedError", ({ enumerable: true, get: function () { return errors_1.ExternalEndpointNotAllowedError; } }));
Object.defineProperty(exports, "FetchError", ({ enumerable: true, get: function () { return errors_1.FetchError; } }));
Object.defineProperty(exports, "FUNCTION_ERR", ({ enumerable: true, get: function () { return errors_1.FUNCTION_ERR; } }));
Object.defineProperty(exports, "HttpError", ({ enumerable: true, get: function () { return errors_1.HttpError; } }));
Object.defineProperty(exports, "InvalidWorkspaceRequestedError", ({ enumerable: true, get: function () { return errors_1.InvalidWorkspaceRequestedError; } }));
Object.defineProperty(exports, "isExpectedError", ({ enumerable: true, get: function () { return errors_1.isExpectedError; } }));
Object.defineProperty(exports, "isForgePlatformError", ({ enumerable: true, get: function () { return errors_1.isForgePlatformError; } }));
Object.defineProperty(exports, "isHostedCodeError", ({ enumerable: true, get: function () { return errors_1.isHostedCodeError; } }));
Object.defineProperty(exports, "NeedsAuthenticationError", ({ enumerable: true, get: function () { return errors_1.NeedsAuthenticationError; } }));
Object.defineProperty(exports, "NotAllowedError", ({ enumerable: true, get: function () { return errors_1.NotAllowedError; } }));
Object.defineProperty(exports, "ProductEndpointNotAllowedError", ({ enumerable: true, get: function () { return errors_1.ProductEndpointNotAllowedError; } }));
Object.defineProperty(exports, "ProxyRequestError", ({ enumerable: true, get: function () { return errors_1.ProxyRequestError; } }));
Object.defineProperty(exports, "RequestProductNotAllowedError", ({ enumerable: true, get: function () { return errors_1.RequestProductNotAllowedError; } }));
var runtime_2 = __webpack_require__(5429);
Object.defineProperty(exports, "__getRuntime", ({ enumerable: true, get: function () { return runtime_2.__getRuntime; } }));
Object.defineProperty(exports, "bindInvocationContext", ({ enumerable: true, get: function () { return runtime_2.bindInvocationContext; } }));
Object.defineProperty(exports, "getAppContext", ({ enumerable: true, get: function () { return runtime_2.getAppContext; } }));
var safeUrl_1 = __webpack_require__(1228);
Object.defineProperty(exports, "assumeTrustedRoute", ({ enumerable: true, get: function () { return safeUrl_1.assumeTrustedRoute; } }));
Object.defineProperty(exports, "route", ({ enumerable: true, get: function () { return safeUrl_1.route; } }));
Object.defineProperty(exports, "routeFromAbsolute", ({ enumerable: true, get: function () { return safeUrl_1.routeFromAbsolute; } }));
var i18n_1 = __webpack_require__(6613);
Object.defineProperty(exports, "i18n", ({ enumerable: true, get: function () { return i18n_1.i18n; } }));
var permissions_1 = __webpack_require__(3765);
Object.defineProperty(exports, "permissions", ({ enumerable: true, get: function () { return permissions_1.permissions; } }));


/***/ },

/***/ 7296
(module, __unused_webpack_exports, __webpack_require__) {

var coreJsData = __webpack_require__(5481);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ },

/***/ 7422
(module, __unused_webpack_exports, __webpack_require__) {

var castPath = __webpack_require__(1769),
    toKey = __webpack_require__(7797);

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;


/***/ },

/***/ 7473
(module) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ },

/***/ 7556
(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(1873),
    arrayMap = __webpack_require__(4932),
    isArray = __webpack_require__(6449),
    isSymbol = __webpack_require__(4394);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ },

/***/ 7560
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EntityStorageBuilder = void 0;
const query_api_1 = __webpack_require__(1026);
class EntityStorageBuilder {
    entityName;
    globalStorage;
    constructor(entityName, globalStorage) {
        this.entityName = entityName;
        this.globalStorage = globalStorage;
    }
    query() {
        return new query_api_1.CustomEntityBuilder(this.globalStorage).entity(this.entityName);
    }
    get(entityKey) {
        return this.globalStorage.getEntity(this.entityName, entityKey);
    }
    set(entityKey, value) {
        return this.globalStorage.setEntity(this.entityName, entityKey, value);
    }
    delete(entityKey) {
        return this.globalStorage.deleteEntity(this.entityName, entityKey);
    }
}
exports.EntityStorageBuilder = EntityStorageBuilder;


/***/ },

/***/ 7670
(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(2651);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ },

/***/ 7797
(module, __unused_webpack_exports, __webpack_require__) {

var isSymbol = __webpack_require__(4394);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;


/***/ },

/***/ 7898
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ensureLocale = void 0;
const constants_1 = __webpack_require__(6893);
const forgeSupportedLocaleCodesSet = new Set(constants_1.FORGE_SUPPORTED_LOCALE_CODES);
const localeFallbacks = {
    'en-UK': 'en-GB',
    'nb-NO': 'no-NO'
};
const languageToLocaleCodeMap = constants_1.FORGE_SUPPORTED_LOCALE_CODES.reduce((agg, code) => {
    const [lng] = code.split('-');
    if (!agg[lng]) {
        agg[lng] = code;
    }
    return agg;
}, {
    nb: 'no-NO',
    pt: 'pt-PT'
});
const ensureLocale = (rawLocale) => {
    const locale = rawLocale.replace('_', '-');
    if (forgeSupportedLocaleCodesSet.has(locale)) {
        return locale;
    }
    return languageToLocaleCodeMap[locale] ?? localeFallbacks[locale] ?? null;
};
exports.ensureLocale = ensureLocale;


/***/ },

/***/ 7953
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EgressFilteringService = void 0;
const url_parser_1 = __webpack_require__(6836);
const utils_1 = __webpack_require__(7194);
class EgressFilteringService {
    constructor(allowList) {
        this.URLs = allowList.filter((domainOrURL) => !domainOrURL.startsWith('*')).map((url) => this.parseUrl(url));
        this.wildcardDomains = allowList
            .filter((domainOrURL) => domainOrURL !== '*')
            .map((url) => this.parseUrl(url))
            .filter((url) => decodeURIComponent(url.hostname).startsWith('*'))
            .map((url) => ({
            ...url,
            regex: (0, utils_1.globToRegex)(decodeURIComponent(url.hostname))
        }));
        this.allowsEverything = allowList.includes('*');
    }
    parseUrl(url) {
        return (0, url_parser_1.parseUrl)(url);
    }
    containsWildCardEgress() {
        return this.allowsEverything;
    }
    isValidUrl(url) {
        if (this.allowsEverything) {
            return true;
        }
        const parsedUrl = this.parseUrl(url);
        return this.allowedDomainExact(parsedUrl, this.URLs) || this.allowedDomainPattern(parsedUrl, this.wildcardDomains);
    }
    isValidUrlCSP(url) {
        if (this.allowsEverything) {
            return true;
        }
        const parsedUrl = this.parseUrl(url);
        return (this.allowedDomainExactAndPath(parsedUrl, this.URLs) ||
            this.allowedDomainPatternAndPath(parsedUrl, this.wildcardDomains));
    }
    allowedDomainExact(domain, allowList) {
        return allowList
            .filter((allowed) => allowed.protocol === domain.protocol)
            .some((url) => url.hostname === domain.hostname);
    }
    allowedDomainExactAndPath(domain, allowList) {
        return allowList
            .filter((allowed) => this.protocolMatchesCSP(allowed.protocol, domain.protocol))
            .filter((allowed) => allowed.hostname === domain.hostname)
            .some((allowed) => this.pathMatches(allowed.pathname, domain.pathname));
    }
    allowedDomainPattern(domain, allowList) {
        return allowList
            .filter((allowed) => allowed.protocol === domain.protocol)
            .some((pattern) => pattern.regex.test(domain.hostname));
    }
    allowedDomainPatternAndPath(domain, allowList) {
        return allowList
            .filter((pattern) => this.protocolMatchesCSP(pattern.protocol, domain.protocol))
            .filter((pattern) => pattern.regex.test(domain.hostname))
            .some((allowed) => this.pathMatches(allowed.pathname, domain.pathname));
    }
    protocolMatchesCSP(allowedProtocol, requestProtocol) {
        if (allowedProtocol === requestProtocol) {
            return true;
        }
        if (allowedProtocol === 'http:' && requestProtocol === 'https:') {
            return true;
        }
        if (allowedProtocol === 'ws:' && requestProtocol === 'wss:') {
            return true;
        }
        return false;
    }
    pathMatches(allowedPath, requestPath) {
        if (allowedPath === '/') {
            return true;
        }
        if (allowedPath.endsWith('/')) {
            return requestPath.startsWith(allowedPath);
        }
        return requestPath === allowedPath;
    }
}
exports.EgressFilteringService = EgressFilteringService;


/***/ },

/***/ 8054
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilterConditions = exports.WhereConditions = exports.isIn = exports.isNotEqualTo = void 0;
function isNotEqualTo(value) {
    return {
        condition: 'NOT_EQUAL_TO',
        value
    };
}
exports.isNotEqualTo = isNotEqualTo;
function isIn(values) {
    return {
        condition: 'IN',
        value: values
    };
}
exports.isIn = isIn;
function beginsWith(value) {
    return {
        condition: 'BEGINS_WITH',
        values: [value]
    };
}
function between(values) {
    return {
        condition: 'BETWEEN',
        values
    };
}
function exists() {
    return {
        condition: 'EXISTS',
        values: [true]
    };
}
function doesNotExist() {
    return {
        condition: 'NOT_EXISTS',
        values: [true]
    };
}
function isGreaterThan(value) {
    return {
        condition: 'GREATER_THAN',
        values: [value]
    };
}
function isGreaterThanEqualTo(value) {
    return {
        condition: 'GREATER_THAN_EQUAL_TO',
        values: [value]
    };
}
function isLessThan(value) {
    return {
        condition: 'LESS_THAN',
        values: [value]
    };
}
function isLessThanEqualTo(value) {
    return {
        condition: 'LESS_THAN_EQUAL_TO',
        values: [value]
    };
}
function contains(value) {
    return {
        condition: 'CONTAINS',
        values: [value]
    };
}
function doesNotContain(value) {
    return {
        condition: 'NOT_CONTAINS',
        values: [value]
    };
}
function equalsTo(value) {
    return {
        condition: 'EQUAL_TO',
        values: [value]
    };
}
function notEqualsTo(value) {
    return {
        condition: 'NOT_EQUAL_TO',
        values: [value]
    };
}
exports.WhereConditions = {
    beginsWith,
    between,
    equalsTo,
    isGreaterThan,
    isGreaterThanEqualTo,
    isLessThan,
    isLessThanEqualTo
};
exports.FilterConditions = {
    beginsWith,
    between,
    contains,
    doesNotContain,
    equalsTo,
    notEqualsTo,
    exists,
    doesNotExist,
    isGreaterThan,
    isGreaterThanEqualTo,
    isLessThan,
    isLessThanEqualTo
};


/***/ },

/***/ 8156
(module, __unused_webpack_exports, __webpack_require__) {

var baseGet = __webpack_require__(7422);

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;


/***/ },

/***/ 8207
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.API_PROJECTS_PERMISSIONS_MAP = exports.API_ISSUES_PERMISSIONS_MAP = void 0;
const API_ISSUES_PERMISSIONS_MAP = {
    canAssign: 'ASSIGN_ISSUES',
    canCreate: 'CREATE_ISSUES',
    canEdit: 'EDIT_ISSUES',
    canMove: 'MOVE_ISSUES',
    canDelete: 'DELETE_ISSUES',
    canAddComments: 'ADD_COMMENTS',
    canEditAllComments: 'EDIT_ALL_COMMENTS',
    canDeleteAllComments: 'DELETE_ALL_COMMENTS',
    canCreateAttachments: 'CREATE_ATTACHMENTS',
    canDeleteAllAttachments: 'DELETE_ALL_ATTACHMENTS'
};
exports.API_ISSUES_PERMISSIONS_MAP = API_ISSUES_PERMISSIONS_MAP;
const API_PROJECTS_PERMISSIONS_MAP = {
    canAssignIssues: 'ASSIGN_ISSUES',
    canCreateIssues: 'CREATE_ISSUES',
    canEditIssues: 'EDIT_ISSUES',
    canMoveIssues: 'MOVE_ISSUES',
    canDeleteIssues: 'DELETE_ISSUES',
    canAddComments: 'ADD_COMMENTS',
    canEditAllComments: 'EDIT_ALL_COMMENTS',
    canDeleteAllComments: 'DELETE_ALL_COMMENTS',
    canCreateAttachments: 'CREATE_ATTACHMENTS',
    canDeleteAllAttachments: 'DELETE_ALL_ATTACHMENTS'
};
exports.API_PROJECTS_PERMISSIONS_MAP = API_PROJECTS_PERMISSIONS_MAP;


/***/ },

/***/ 8223
(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(6110),
    root = __webpack_require__(9325);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ },

/***/ 8265
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.__requestAtlassianAsUser = exports.__requestAtlassianAsApp = exports.getFetchAPI = exports.wrapRequestConnectedData = exports.wrapRequestTeamworkGraph = exports.wrapRequestGraph = exports.handleProxyResponseErrors = exports.getForgeProxyError = exports.fetchRemote = exports.__fetchProduct = void 0;
const safeUrl_1 = __webpack_require__(1228);
const errors_1 = __webpack_require__(9742);
const runtime_1 = __webpack_require__(5429);
async function wrapInMetrics(options, cb) {
    const metrics = (0, runtime_1.__getRuntime)().metrics;
    metrics.counter(options.name, options.tags).incr();
    const timer = metrics.timing(options.name, options.tags).measure();
    try {
        return await cb();
    }
    finally {
        timer.stop();
    }
}
function __fetchProduct(args) {
    return async (path, init) => {
        const response = await global.__forge_fetch__({
            type: args.type,
            provider: args.provider,
            remote: args.remote,
            accountId: args.accountId
        }, path, init);
        (0, exports.handleProxyResponseErrors)(response);
        return response;
    };
}
exports.__fetchProduct = __fetchProduct;
function fetchRemote(args) {
    return async (path, init) => {
        const response = await global.__forge_fetch__({
            type: 'tpp',
            provider: args.provider,
            remote: args.remote,
            accountId: args.account
        }, path, init);
        (0, exports.handleProxyResponseErrors)(response);
        return response;
    };
}
exports.fetchRemote = fetchRemote;
function getDefaultRemote(provider) {
    const externalAuthProvider = findExternalAuthProviderConfigOrThrow(provider);
    if (!externalAuthProvider.remotes.length) {
        throw new Error(`Missing remote config for provider ${provider}`);
    }
    return externalAuthProvider.remotes[0].key;
}
function findExternalAuthProviderConfigOrThrow(provider) {
    const { externalAuth } = (0, runtime_1.__getRuntime)();
    const externalAuthProvider = externalAuth?.find((externalAuthMetaData) => {
        return externalAuthMetaData.service === provider;
    });
    if (!externalAuthProvider) {
        throw new Error(`Bad provider or missing config for provider ${provider}`);
    }
    return externalAuthProvider;
}
const ATLASSIAN_TOKEN_SERVICE_KEY = 'atlassian-token-service-key';
const getForgeProxyError = (response) => response.headers.get('forge-proxy-error');
exports.getForgeProxyError = getForgeProxyError;
const handleProxyResponseErrors = (response) => {
    const errorReason = (0, exports.getForgeProxyError)(response);
    if (errorReason) {
        if (errorReason === 'NEEDS_AUTHENTICATION_ERR') {
            throw new errors_1.NeedsAuthenticationError('Authentication Required', ATLASSIAN_TOKEN_SERVICE_KEY);
        }
        throw new errors_1.ProxyRequestError(response.status, errorReason);
    }
};
exports.handleProxyResponseErrors = handleProxyResponseErrors;
function lazyThrowNeedsAuthenticationError(serviceKey) {
    return async (scopes) => wrapInMetrics({ name: 'api.asUser.withProvider.requestCredentials', tags: { passingScopes: String(!!scopes) } }, async () => {
        throw new errors_1.NeedsAuthenticationError('Authentication Required', serviceKey, { scopes, isExpectedError: true });
    });
}
function buildExternalAuthAccountsInfo(provider, remote) {
    const { accounts } = findExternalAuthProviderConfigOrThrow(provider);
    const buildAccountModel = (account) => {
        const { externalAccountId: id, ...rest } = account;
        return { ...rest, id };
    };
    const buildExternalAuthAccountMethods = (account, outboundAuthAccountId) => ({
        hasCredentials: async (scopes) => wrapInMetrics({ name: 'api.asUser.withProvider.hasCredentials', tags: { passingScopes: String(!!scopes) } }, async () => !scopes || scopes.every((scope) => account.scopes.includes(scope))),
        requestCredentials: lazyThrowNeedsAuthenticationError(provider),
        getAccount: async () => wrapInMetrics({ name: 'api.asUser.withProvider.getAccount' }, async () => account),
        fetch: wrapWithRouteUnwrapper(fetchRemote({ provider, remote: remote ?? getDefaultRemote(provider), account: outboundAuthAccountId }))
    });
    return accounts.map((account) => {
        const authAccount = buildAccountModel(account);
        return {
            account: authAccount,
            methods: buildExternalAuthAccountMethods(authAccount, account.id)
        };
    });
}
const throwNotImplementedError = () => {
    throw new Error('not implemented');
};
const withProvider = (provider, remote) => {
    const accountsInfo = buildExternalAuthAccountsInfo(provider, remote);
    const defaultAccountInfo = accountsInfo.length ? accountsInfo[0] : undefined;
    const lazyThrowNoValidCredentialsError = () => {
        return (url) => {
            throw new Error(`Fetch failed for ${remote ? `remote '${remote}', ` : ''}provider '${provider}', path '${url}' no credentials previously requested`);
        };
    };
    return {
        hasCredentials: async (scopes) => {
            return defaultAccountInfo
                ? await defaultAccountInfo.methods.hasCredentials(scopes)
                : await wrapInMetrics({ name: 'api.asUser.withProvider.hasCredentials', tags: { passingScopes: String(!!scopes) } }, async () => false);
        },
        getAccount: async () => wrapInMetrics({ name: 'api.asUser.withProvider.getAccount' }, async () => {
            return defaultAccountInfo ? defaultAccountInfo.account : undefined;
        }),
        requestCredentials: lazyThrowNeedsAuthenticationError(provider),
        listCredentials: throwNotImplementedError,
        listAccounts: async () => wrapInMetrics({ name: 'api.asUser.withProvider.listAccounts' }, async () => {
            return accountsInfo.map(({ account }) => account);
        }),
        asAccount: (externalAccountId) => {
            const accountInfo = accountsInfo.find(({ account }) => account.id === externalAccountId);
            if (!accountInfo) {
                throw new Error(`No account with ID ${externalAccountId} found for provider ${provider}`);
            }
            return accountInfo.methods;
        },
        fetch: defaultAccountInfo ? defaultAccountInfo.methods.fetch : lazyThrowNoValidCredentialsError()
    };
};
const wrapWithRouteUnwrapper = (fetch) => (path, init) => {
    const stringPath = (0, safeUrl_1.isRoute)(path) ? path.value : path;
    return fetch(stringPath, init);
};
const wrapRequestProduct = (requestProduct) => (path, init) => {
    const safeUrl = (0, safeUrl_1.requireSafeUrl)(path);
    return requestProduct(safeUrl.value, init);
};
const wrapRequestGraph = (requestGraphApi) => (query, variables, headers = {}) => requestGraphApi('/graphql', {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
        query,
        ...(variables ? { variables } : {})
    })
});
exports.wrapRequestGraph = wrapRequestGraph;
const wrapRequestTeamworkGraph = (requestGraphApi) => (query, variables, operationName, extensions, headers = {}) => requestGraphApi('/graphql/twg', {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
        query,
        ...(variables ? { variables } : {}),
        ...(operationName ? { operationName } : {}),
        ...(extensions ? { extensions } : {})
    })
});
exports.wrapRequestTeamworkGraph = wrapRequestTeamworkGraph;
const wrapRequestConnectedData = (fetch) => (path, init) => {
    const safeUrl = (0, safeUrl_1.requireSafeUrl)(path);
    return fetch(`/connected-data/${safeUrl.value.replace(/^\/+/, '')}`, init);
};
exports.wrapRequestConnectedData = wrapRequestConnectedData;
function getFetchAPI() {
    if (global.fetch === undefined) {
        global.fetch = async () => {
            throw new Error('The fetch function is not available');
        };
    }
    return {
        fetch: wrapWithRouteUnwrapper(fetch),
        requestJira: wrapRequestProduct(__fetchProduct({ provider: 'none', remote: 'jira', type: 'fpp' })),
        requestConfluence: wrapRequestProduct(__fetchProduct({ provider: 'none', remote: 'confluence', type: 'fpp' })),
        requestBitbucket: wrapRequestProduct(__fetchProduct({ provider: 'none', remote: 'bitbucket', type: 'fpp' })),
        asUser: (userId) => ({
            requestJira: wrapRequestProduct(__fetchProduct({ provider: 'user', remote: 'jira', type: 'fpp', accountId: userId })),
            requestConfluence: wrapRequestProduct(__fetchProduct({ provider: 'user', remote: 'confluence', type: 'fpp', accountId: userId })),
            requestBitbucket: wrapRequestProduct(__fetchProduct({ provider: 'user', remote: 'bitbucket', type: 'fpp', accountId: userId })),
            requestGraph: (0, exports.wrapRequestGraph)(__fetchProduct({ provider: 'user', remote: 'stargate', type: 'fpp', accountId: userId })),
            requestTeamworkGraph: (0, exports.wrapRequestTeamworkGraph)(__fetchProduct({ provider: 'user', remote: 'stargate', type: 'fpp', accountId: userId })),
            requestConnectedData: (0, exports.wrapRequestConnectedData)(__fetchProduct({ provider: 'user', remote: 'stargate', type: 'fpp' })),
            requestAtlassian: wrapRequestProduct(__fetchProduct({ provider: 'user', remote: 'stargate', type: 'fpp', accountId: userId })),
            withProvider
        }),
        asApp: () => ({
            requestJira: wrapRequestProduct(__fetchProduct({ provider: 'app', remote: 'jira', type: 'fpp' })),
            requestConfluence: wrapRequestProduct(__fetchProduct({ provider: 'app', remote: 'confluence', type: 'fpp' })),
            requestBitbucket: wrapRequestProduct(__fetchProduct({ provider: 'app', remote: 'bitbucket', type: 'fpp' })),
            requestGraph: (0, exports.wrapRequestGraph)(__fetchProduct({ provider: 'app', remote: 'stargate', type: 'fpp' })),
            requestConnectedData: (0, exports.wrapRequestConnectedData)(__fetchProduct({ provider: 'app', remote: 'stargate', type: 'fpp' })),
            requestAtlassian: wrapRequestProduct(__fetchProduct({ provider: 'app', remote: 'stargate', type: 'fpp' }))
        })
    };
}
exports.getFetchAPI = getFetchAPI;
function getRequestStargate(provider) {
    if (provider !== 'app' && provider !== 'user') {
        throw new Error(`Unsupported provider: ${provider}`);
    }
    return __fetchProduct({ provider, remote: 'stargate', type: 'fpp' });
}
exports.__requestAtlassianAsApp = getRequestStargate('app');
exports.__requestAtlassianAsUser = getRequestStargate('user');


/***/ },

/***/ 8393
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const API_PERMISSIONS_MAP = {
    canRead: 'read',
    canUpdate: 'update',
    canDelete: 'delete'
};
exports["default"] = API_PERMISSIONS_MAP;


/***/ },

/***/ 8586
(module, __unused_webpack_exports, __webpack_require__) {

var isArray = __webpack_require__(6449),
    isSymbol = __webpack_require__(4394);

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;


/***/ },

/***/ 8655
(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(6025);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ },

/***/ 9140
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.authorize = void 0;
const auth_1 = __webpack_require__(3318);
const __1 = __webpack_require__(7274);
const authorize = () => {
    const accountId = (0, __1.__getRuntime)().aaid;
    if (!accountId) {
        throw new Error(`Couldn’t find the accountId of the invoking user. This API can only be used inside user-invoked modules.`);
    }
    return {
        ...(0, auth_1.authorizeConfluenceWithFetch)(async (path, opts) => {
            const res = await (0, __1.asUser)().requestConfluence((0, __1.assumeTrustedRoute)(path), opts);
            return res.json();
        }, accountId),
        ...(0, auth_1.authorizeJiraWithFetch)(async (path, opts) => {
            const res = await (0, __1.asUser)().requestJira((0, __1.assumeTrustedRoute)(path), opts);
            return res.json();
        }, accountId)
    };
};
exports.authorize = authorize;


/***/ },

/***/ 9325
(module, __unused_webpack_exports, __webpack_require__) {

var freeGlobal = __webpack_require__(4840);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ },

/***/ 9350
(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ },

/***/ 9742
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiNotReadyError = exports.ProxyRequestError = exports.InvalidContainerServiceError = exports.InvalidRemoteError = exports.NeedsAuthenticationError = exports.InvalidWorkspaceRequestedError = exports.RequestProductNotAllowedError = exports.ProductEndpointNotAllowedError = exports.ExternalEndpointNotAllowedError = exports.NotAllowedError = exports.FetchError = exports.HttpError = exports.isExpectedError = exports.isHostedCodeError = exports.isForgePlatformError = exports.API_NOT_READY_ERR = exports.PROXY_ERR = exports.INVALID_CONTAINER_SERVICE_ERR = exports.INVALID_REMOTE_ERR = exports.NEEDS_AUTHENTICATION_ERR = exports.FUNCTION_FETCH_ERR = exports.REQUEST_EGRESS_ALLOWLIST_ERR = exports.FUNCTION_ERR = void 0;
exports.FUNCTION_ERR = 'FUNCTION_ERR';
exports.REQUEST_EGRESS_ALLOWLIST_ERR = 'REQUEST_EGRESS_ALLOWLIST_ERR';
exports.FUNCTION_FETCH_ERR = 'FUNCTION_FETCH_ERR';
exports.NEEDS_AUTHENTICATION_ERR = 'NEEDS_AUTHENTICATION_ERR';
exports.INVALID_REMOTE_ERR = 'INVALID_REMOTE_ERR';
exports.INVALID_CONTAINER_SERVICE_ERR = 'INVALID_CONTAINER_SERVICE_ERR';
exports.PROXY_ERR = 'PROXY_ERR';
exports.API_NOT_READY_ERR = 'API_NOT_READY_ERR';
function isForgePlatformError(err) {
    return [
        exports.REQUEST_EGRESS_ALLOWLIST_ERR,
        exports.FUNCTION_FETCH_ERR,
        exports.NEEDS_AUTHENTICATION_ERR,
        exports.PROXY_ERR,
        exports.API_NOT_READY_ERR
    ].includes(err.name);
}
exports.isForgePlatformError = isForgePlatformError;
function isHostedCodeError(err) {
    return [exports.FUNCTION_ERR, exports.REQUEST_EGRESS_ALLOWLIST_ERR, exports.FUNCTION_FETCH_ERR, exports.NEEDS_AUTHENTICATION_ERR].includes(typeof err === 'string' ? err : err.name);
}
exports.isHostedCodeError = isHostedCodeError;
function isExpectedError(err) {
    return err.name === exports.NEEDS_AUTHENTICATION_ERR && !!err.options?.isExpectedError;
}
exports.isExpectedError = isExpectedError;
class HttpError extends Error {
    status;
    constructor(message) {
        super(message);
    }
}
exports.HttpError = HttpError;
class FetchError extends Error {
    constructor(cause) {
        super(cause);
        this.stack = undefined;
        this.name = exports.FUNCTION_FETCH_ERR;
    }
}
exports.FetchError = FetchError;
class NotAllowedError extends HttpError {
    constructor(message) {
        super(message);
        this.stack = undefined;
        this.name = exports.REQUEST_EGRESS_ALLOWLIST_ERR;
        this.status = 403;
    }
}
exports.NotAllowedError = NotAllowedError;
class ExternalEndpointNotAllowedError extends NotAllowedError {
    constructor(failedURL) {
        super(`URL not included in the external fetch backend permissions: ${failedURL}. Visit go.atlassian.com/forge-egress for more information.`);
    }
}
exports.ExternalEndpointNotAllowedError = ExternalEndpointNotAllowedError;
class ProductEndpointNotAllowedError extends NotAllowedError {
    constructor(failedURL) {
        super(`URL not allowed: ${failedURL}.`);
    }
}
exports.ProductEndpointNotAllowedError = ProductEndpointNotAllowedError;
class RequestProductNotAllowedError extends NotAllowedError {
    constructor(requestedProduct, invocationProduct) {
        super(`Request ${requestedProduct} is not allowed from ${invocationProduct} context.`);
    }
}
exports.RequestProductNotAllowedError = RequestProductNotAllowedError;
class InvalidWorkspaceRequestedError extends NotAllowedError {
    constructor(failedURL) {
        super(`Invalid workspace requested in URL: ${failedURL}.`);
    }
}
exports.InvalidWorkspaceRequestedError = InvalidWorkspaceRequestedError;
class NeedsAuthenticationError extends HttpError {
    serviceKey;
    options;
    constructor(error, serviceKey, options) {
        super(error);
        this.serviceKey = serviceKey;
        this.options = options;
        this.stack = undefined;
        this.name = exports.NEEDS_AUTHENTICATION_ERR;
        this.status = 401;
    }
}
exports.NeedsAuthenticationError = NeedsAuthenticationError;
class InvalidRemoteError extends HttpError {
    remoteKey;
    constructor(error, remoteKey) {
        super(error);
        this.remoteKey = remoteKey;
        this.name = exports.INVALID_REMOTE_ERR;
        this.status = 400;
    }
}
exports.InvalidRemoteError = InvalidRemoteError;
class InvalidContainerServiceError extends HttpError {
    serviceKey;
    constructor(error, serviceKey) {
        super(error);
        this.serviceKey = serviceKey;
        this.name = exports.INVALID_CONTAINER_SERVICE_ERR;
        this.status = 400;
    }
}
exports.InvalidContainerServiceError = InvalidContainerServiceError;
class ProxyRequestError extends HttpError {
    status;
    errorCode;
    constructor(status, errorCode) {
        super(`Forge platform failed to process runtime HTTP request - ${status} - ${errorCode}`);
        this.status = status;
        this.errorCode = errorCode;
        this.name = exports.PROXY_ERR;
    }
}
exports.ProxyRequestError = ProxyRequestError;
class ApiNotReadyError extends Error {
    constructor(message = 'Forge API currently not available') {
        super(message);
        this.name = exports.API_NOT_READY_ERR;
    }
}
exports.ApiNotReadyError = ApiNotReadyError;


/***/ },

/***/ 9872
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SortOrder = void 0;
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(SortOrder = exports.SortOrder || (exports.SortOrder = {}));


/***/ },

/***/ 9896
(module) {

"use strict";
module.exports = require("fs");

/***/ },

/***/ 9962
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.extractI18nPropertiesFromModules = exports.extractI18nKeysFromModules = exports.getI18nSupportedModuleEntries = void 0;
const isObject = (value) => {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
};
const isI18nValue = (value) => {
    return typeof value?.i18n === 'string';
};
const isConnectModuleKey = (moduleKey) => moduleKey.startsWith('connect-');
const isCoreModuleKey = (moduleKey) => moduleKey.startsWith('core:');
const getI18nKeysFromObject = (obj) => {
    const visited = new Set();
    const visit = (value, i18nPath) => {
        if (!isObject(value) || visited.has(value)) {
            return [];
        }
        visited.add(value);
        return Object.entries(value).flatMap(([propKey, propValue]) => {
            const currentPath = [...i18nPath, propKey];
            if (isI18nValue(propValue)) {
                return [{ propertyPath: currentPath, key: propValue.i18n }];
            }
            else if (Array.isArray(propValue)) {
                return propValue.flatMap((item) => visit(item, currentPath));
            }
            return visit(propValue, currentPath);
        });
    };
    return visit(obj, []);
};
const getI18nSupportedModuleEntries = (modules) => {
    return Object.entries(modules).flatMap(([moduleKey, moduleEntries]) => {
        if (!isConnectModuleKey(moduleKey) &&
            !isCoreModuleKey(moduleKey) &&
            moduleEntries &&
            Array.isArray(moduleEntries) &&
            moduleEntries.length > 0) {
            return moduleEntries.map((moduleEntry) => [moduleEntry, moduleKey]);
        }
        return [];
    });
};
exports.getI18nSupportedModuleEntries = getI18nSupportedModuleEntries;
const extractI18nKeysFromModules = (modules) => {
    const i18nKeys = new Set();
    for (const moduleEntry of (0, exports.getI18nSupportedModuleEntries)(modules)) {
        const i18nKeysForEntryValue = getI18nKeysFromObject(moduleEntry[0]);
        for (const { key } of i18nKeysForEntryValue) {
            i18nKeys.add(key);
        }
    }
    return i18nKeys.size > 0 ? Array.from(i18nKeys) : [];
};
exports.extractI18nKeysFromModules = extractI18nKeysFromModules;
const extractI18nPropertiesFromModules = (modules) => {
    const moduleI18nProperties = [];
    for (const moduleEntry of (0, exports.getI18nSupportedModuleEntries)(modules)) {
        const i18nKeysForEntryValue = getI18nKeysFromObject(moduleEntry[0]);
        for (const i18nObj of i18nKeysForEntryValue) {
            moduleI18nProperties.push({ moduleName: moduleEntry[1], ...i18nObj });
        }
    }
    return moduleI18nProperties;
};
exports.extractI18nPropertiesFromModules = extractI18nPropertiesFromModules;


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAllUserDetails: () => (/* binding */ getAllUserDetails),
/* harmony export */   getCollaborators: () => (/* binding */ getCollaborators),
/* harmony export */   getOrgTree: () => (/* binding */ getOrgTree),
/* harmony export */   getPositionDetails: () => (/* binding */ getPositionDetails)
/* harmony export */ });
/* harmony import */ var _forge_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7274);


// Hard-coded GraphQL endpoint for Talent API
//const TALENT_GRAPHQL_ENDPOINT = 'https://one-atlas-jevs.atlassian.net/gateway/api/graphql';
const TALENT_GRAPHQL_ENDPOINT = 'https://sk-demo-site.atlassian.net/gateway/api/graphql';

/**
 * Create a Basic Authentication header for the Talent GraphQL API.
 * The API requires Basic Auth with email:api_token in Base64 format.
 * 
 * @param {string} email - The Atlassian account email
 * @param {string} apiToken - The Atlassian API token
 * @returns {string} The Authorization header value for Basic auth
 */
function createBasicAuthHeader(email, apiToken) {
  // Combine email and API token as "email:api_token"
  const credentials = `${email}:${apiToken}`;

  // Base64 encode the credentials
  const encodedCredentials = Buffer.from(credentials).toString('base64');

  // Return the Authorization header value
  return `Basic ${encodedCredentials}`;
}

/**
 * Query the Talent GraphQL API to retrieve organizational data for a user.
 * This function fetches the user's position, manager, direct reports, and peers.
 * 
 * @param {string} userEmail - The email address of the user to query
 * @param {string} cloudId - The Atlassian cloud ID
 * @param {string> authEmail - The email address for Basic Auth
 * @param {string} apiToken - The API token for Basic Auth
 * @returns {Promise<Object>} The user's position data and organizational relationships
 */
async function queryTalentGraphQL(userEmail, cloudId, authEmail, apiToken) {
  const query = `
    query positionsSearchQuery($cloudId: ID!, $fieldIdIsIn: [ID!], $first: Int = 100, $rql: String) {
      radar_positionsSearch(
        first: $first
        cloudId: $cloudId
        rql: $rql
      ) @optIn(to: ["RadarPositionsSearch"]) {
        totalCount
        edges {
          node {
            id
            fieldValues(fieldIdIsIn: $fieldIdIsIn) {
              fieldId
              fieldValue {
                ... on RadarStringFieldValue {
                  stringValue: value
                }
                ... on RadarAriFieldValue {
                  value {
                    ... on RadarWorker {
                      id
                      preferredName
                    }
                    ... on TeamV2 {
                      id
                      displayName
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const variables = {
    cloudId: cloudId,
    fieldIdIsIn: ["workerEmail", "positionWorker", "positionReportingLine"],
    first: 100,
    rql: `workerEmail = '${userEmail}'`
  };
  try {
    console.log('DEBUG: Making GraphQL request to:', TALENT_GRAPHQL_ENDPOINT);
    console.log('DEBUG: GraphQL variables:', JSON.stringify(variables, null, 2));

    // Create Basic Auth header with email and API token
    const authHeader = createBasicAuthHeader(authEmail, apiToken);

    // Use fetch API which is available in Forge Node.js resolvers
    // to make HTTP requests to external APIs
    const response = await fetch(TALENT_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    });
    console.log('DEBUG: GraphQL response status:', response.status);
    const responseText = await response.text();
    console.log('DEBUG: GraphQL response raw text (first 500 chars):', responseText.substring(0, 500));
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      const errorMsg = `GraphQL API returned non-JSON response (status ${response.status}): ${responseText.substring(0, 200)}`;
      console.error('ERROR:', errorMsg);
      throw new Error(errorMsg);
    }
    console.log('DEBUG: GraphQL response data:', JSON.stringify(data, null, 2));
    if (data.errors) {
      const errorMsg = `GraphQL error: ${JSON.stringify(data.errors)}`;
      console.error('ERROR:', errorMsg);
      throw new Error(errorMsg);
    }

    // Validate that data.data exists before returning
    if (!data.data) {
      const errorMsg = 'GraphQL response does not contain a data property';
      console.error('ERROR:', errorMsg);
      console.error('ERROR: Response structure:', JSON.stringify(data, null, 2));
      throw new Error(errorMsg);
    }
    return data.data;
  } catch (error) {
    const errorMsg = `Failed to query Talent GraphQL API: ${error.message}`;
    console.error('ERROR:', errorMsg);
    console.error('ERROR: Full stack trace:', error.stack);
    throw new Error(errorMsg);
  }
}

/**
 * Fetch manager details for a list of position UUIDs.
 * This function queries the Talent GraphQL API to get the names of managers in the hierarchy.
 * 
 * @param {Array} managerUUIDs - Array of manager position UUIDs
 * @param {string} cloudId - The Atlassian cloud ID
 * @param {string} authEmail - The email address for Basic Auth
 * @param {string} apiToken - The API token for Basic Auth
 * @returns {Promise<Array>} Array of manager objects with uuid and preferredName
 */
async function fetchManagerDetails(managerUUIDs, cloudId, authEmail, apiToken) {
  if (!managerUUIDs || managerUUIDs.length === 0) {
    return [];
  }
  const managers = [];

  // Fetch details for each manager UUID
  for (const uuid of managerUUIDs) {
    try {
      var _data$data;
      console.log('DEBUG: Fetching manager details for UUID:', uuid);
      const managerQuery = `
        query positionsSearchQuery($cloudId: ID!, $fieldIdIsIn: [ID!], $first: Int = 100, $rql: String) {
          radar_positionsSearch(
            first: $first
            cloudId: $cloudId
            rql: $rql
          ) @optIn(to: ["RadarPositionsSearch"]) {
            edges {
              node {
                fieldValues(fieldIdIsIn: $fieldIdIsIn) {
                  fieldId
                  fieldValue {
                    ... on RadarAriFieldValue {
                      value {
                        ... on RadarWorker {
                          preferredName
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;
      const variables = {
        cloudId: cloudId,
        fieldIdIsIn: ["positionWorker"],
        first: 100,
        rql: `id = '${uuid}'`
      };
      const authHeader = createBasicAuthHeader(authEmail, apiToken);
      const response = await fetch(TALENT_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader
        },
        body: JSON.stringify({
          query: managerQuery,
          variables: variables
        })
      });
      const responseText = await response.text();
      const data = JSON.parse(responseText);
      if (data.errors) {
        console.warn('WARNING: Error fetching manager', uuid, ':', JSON.stringify(data.errors));
        managers.push({
          uuid,
          preferredName: 'Unknown Manager'
        });
      } else if ((_data$data = data.data) !== null && _data$data !== void 0 && (_data$data = _data$data.radar_positionsSearch) !== null && _data$data !== void 0 && _data$data.edges && data.data.radar_positionsSearch.edges.length > 0) {
        const edge = data.data.radar_positionsSearch.edges[0];
        let managerName = 'Unknown Manager';
        if (edge.node.fieldValues) {
          var _workerField$fieldVal;
          const workerField = edge.node.fieldValues.find(f => f.fieldId === 'positionWorker');
          if (workerField !== null && workerField !== void 0 && (_workerField$fieldVal = workerField.fieldValue) !== null && _workerField$fieldVal !== void 0 && (_workerField$fieldVal = _workerField$fieldVal.value) !== null && _workerField$fieldVal !== void 0 && _workerField$fieldVal.preferredName) {
            managerName = workerField.fieldValue.value.preferredName;
          }
        }
        console.log('DEBUG: Found manager name:', managerName, 'for UUID:', uuid);
        managers.push({
          uuid,
          preferredName: managerName
        });
      } else {
        managers.push({
          uuid,
          preferredName: 'Unknown Manager'
        });
      }
    } catch (error) {
      console.error('ERROR: Error fetching manager details for', uuid, ':', error.message);
      managers.push({
        uuid,
        preferredName: 'Unknown Manager'
      });
    }
  }
  return managers;
}

/**
 * Build an ASCII text visualization of the organizational tree.
 * Shows the user's reporting line (managers), direct reports, and peers in a tree format.
 * 
 * @param {string} userName - The name of the user
 * @param {Array} managerHierarchy - Array of manager objects with preferredName, from direct manager to top-level
 * @param {Array} directReports - Array of direct report objects with preferredName
 * @param {Array} peers - Array of peer objects with preferredName
 * @returns {string} Formatted ASCII tree visualization
 */
function buildOrgTreeVisualization(userName, managerHierarchy, directReports, peers) {
  let tree = '';

  // Display the user
  tree += `${userName}\n`;

  // Display reporting line (managers) if exists
  if (managerHierarchy && managerHierarchy.length > 0) {
    // Reverse the hierarchy so direct manager appears first
    const reversedHierarchy = [...managerHierarchy].reverse();
    tree += `├── Reporting Line (Managers, up to ${reversedHierarchy.length} levels):\n`;
    reversedHierarchy.forEach((manager, index) => {
      const isLast = index === reversedHierarchy.length - 1;
      const levelIndicator = index === 0 ? 'Direct Manager' : `Level ${index + 1}`;
      const prefix = isLast ? '│   └──' : '│   ├──';
      tree += `${prefix} ${manager.preferredName} (${levelIndicator})\n`;
    });
  } else {
    tree += `├── Reporting Line: None\n`;
  }

  // Display direct reports
  if (directReports && directReports.length > 0) {
    tree += `├── Direct Reports (${directReports.length}):\n`;
    directReports.forEach((report, index) => {
      const isLast = index === directReports.length - 1;
      const prefix = isLast ? '│   └──' : '│   ├──';
      const displayText = report.email ? `${report.preferredName} (${report.email})` : report.preferredName;
      tree += `${prefix} ${displayText}\n`;
    });
  } else {
    tree += `├── Direct Reports: None\n`;
  }

  // Display peers
  if (peers && peers.length > 0) {
    tree += `└── Peers (${peers.length}):\n`;
    peers.forEach((peer, index) => {
      const isLast = index === peers.length - 1;
      const prefix = isLast ? '    └──' : '    ├──';
      const displayText = peer.email ? `${peer.preferredName} (${peer.email})` : peer.preferredName;
      tree += `${prefix} ${displayText}\n`;
    });
  } else {
    tree += `└── Peers: None\n`;
  }
  return tree;
}

/**
 * Main function to retrieve the organizational tree for a user from Talent.
 * This function is called by the Rovo agent when the user requests organizational data.
 * 
 * @param {Object} request - The request object containing user email
 * @returns {Promise<Object>} Response with the organizational tree visualization
 */
async function getOrgTree(request) {
  // Log immediately, even if an error occurs during parsing
  console.error('=== DEBUG: getOrgTree CALLED ===');
  console.log('📥 Received payload:', JSON.stringify(request, null, 2));
  try {
    var _request$context;
    console.log('DEBUG: getOrgTree function called');
    console.log('DEBUG: Request object:', JSON.stringify(request, null, 2));

    // Retrieve the API token and email from environment variables
    // These should be set as Forge variables during deployment
    const apiToken = process.env.TALENT_API_TOKEN;
    const authEmail = process.env.TALENT_AUTH_EMAIL;
    console.log('DEBUG: API token present:', !!apiToken);
    console.log('DEBUG: Auth email present:', !!authEmail);
    if (apiToken) {
      console.log('DEBUG: API token first 20 chars:', apiToken.substring(0, 20));
    }
    if (authEmail) {
      console.log('DEBUG: Auth email:', authEmail);
    }
    if (!apiToken) {
      console.error('ERROR: TALENT_API_TOKEN environment variable not set');
      return {
        type: 'error',
        message: 'TALENT_API_TOKEN environment variable is not configured. Please set this variable in your deployment configuration.'
      };
    }
    if (!authEmail) {
      console.error('ERROR: TALENT_AUTH_EMAIL environment variable not set');
      return {
        type: 'error',
        message: 'TALENT_AUTH_EMAIL environment variable is not configured. Please set this variable in your deployment configuration.'
      };
    }

    // Extract user email from the request
    // The structure from Rovo actions has userEmail directly on the request object
    const userEmail = request === null || request === void 0 ? void 0 : request.userEmail;
    console.log('DEBUG: User email provided:', userEmail);
    if (!userEmail) {
      console.error('ERROR: No user email provided in request');
      return {
        type: 'error',
        message: 'User email is required.'
      };
    }

    // Get the current cloud ID from the context
    const cloudId = request === null || request === void 0 || (_request$context = request.context) === null || _request$context === void 0 ? void 0 : _request$context.cloudId;
    console.log('DEBUG: Cloud ID:', cloudId);
    if (!cloudId) {
      console.error('ERROR: Cloud ID not found in request');
      return {
        type: 'error',
        message: 'Cloud ID is required.'
      };
    }

    // Query for the user's position and manager information
    console.log('DEBUG: Querying Talent GraphQL API for user position data');
    const userPositionData = await queryTalentGraphQL(userEmail, cloudId, authEmail, apiToken);
    console.log('DEBUG: User position data received:', JSON.stringify(userPositionData, null, 2));

    // Validate that userPositionData and radar_positionsSearch exist
    if (!userPositionData || !userPositionData.radar_positionsSearch) {
      console.error('ERROR: Invalid response structure from Talent GraphQL API');
      console.error('ERROR: userPositionData:', userPositionData);
      return {
        type: 'error',
        message: 'Invalid response received from Talent GraphQL API. The API may be temporarily unavailable.'
      };
    }
    if (!userPositionData.radar_positionsSearch.edges || userPositionData.radar_positionsSearch.edges.length === 0) {
      console.error('ERROR: User not found in Talent system:', userEmail);
      return {
        type: 'error',
        message: `User with email ${userEmail} not found in Talent system.`
      };
    }

    // Extract user information from the position data
    const userPosition = userPositionData.radar_positionsSearch.edges[0].node;
    const userPositionId = userPosition.id;

    // Extract just the UUID from the position ARN (last part after the final slash)
    // ARN format: ari:cloud:radar:...:position/.../.../uuid
    const userPositionUUID = userPositionId.split('/').pop();
    console.log('DEBUG: User position UUID:', userPositionUUID);

    // Extract field values
    let userName = userEmail;
    let reportingLineString = null;
    let managerHierarchy = [];
    if (userPosition.fieldValues) {
      userPosition.fieldValues.forEach(field => {
        var _field$fieldValue, _field$fieldValue2;
        if (field.fieldId === 'positionWorker' && (_field$fieldValue = field.fieldValue) !== null && _field$fieldValue !== void 0 && (_field$fieldValue = _field$fieldValue.value) !== null && _field$fieldValue !== void 0 && _field$fieldValue.preferredName) {
          userName = field.fieldValue.value.preferredName;
        }
        if (field.fieldId === 'positionReportingLine' && (_field$fieldValue2 = field.fieldValue) !== null && _field$fieldValue2 !== void 0 && _field$fieldValue2.stringValue) {
          reportingLineString = field.fieldValue.stringValue;
        }
      });
    }
    console.log('DEBUG: Reporting line string:', reportingLineString);

    // Parse the reporting line to get manager position UUIDs
    // Format is: uuid1.uuid2.uuid3... (dot-separated, from direct manager to top-level manager)
    if (reportingLineString) {
      const managerUUIDs = reportingLineString.split('.');
      console.log('DEBUG: Manager UUIDs in hierarchy:', managerUUIDs);

      // Create a list to fetch manager details for each UUID
      managerHierarchy = managerUUIDs.filter(uuid => uuid && uuid.trim()).map(uuid => ({
        uuid: uuid.trim(),
        preferredName: null
      }));
      console.log('DEBUG: Manager hierarchy to fetch:', managerHierarchy.length, 'managers');
    }

    // Query for direct reports
    let directReports = [];
    const directReportsQuery = `
      query positionsSearchQuery($cloudId: ID!, $fieldIdIsIn: [ID!], $first: Int = 100, $rql: String) {
        radar_positionsSearch(
          first: $first
          cloudId: $cloudId
          rql: $rql
        ) @optIn(to: ["RadarPositionsSearch"]) {
          edges {
            node {
              fieldValues(fieldIdIsIn: $fieldIdIsIn) {
                fieldId
                fieldValue {
                  ... on RadarStringFieldValue {
                    stringValue: value
                  }
                  ... on RadarAriFieldValue {
                    value {
                      ... on RadarWorker {
                        id
                        preferredName
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
    const directReportsVariables = {
      cloudId: cloudId,
      fieldIdIsIn: ["workerEmail", "positionWorker"],
      first: 100,
      rql: `manager = '${userPositionUUID}'`
    };
    try {
      var _directReportsData$da;
      console.log('DEBUG: Querying direct reports for position UUID:', userPositionUUID);

      // Create Basic Auth header for the request
      const authHeader = createBasicAuthHeader(authEmail, apiToken);

      // Use fetch API to make HTTP requests to the Talent GraphQL API
      const directReportsResponse = await fetch(TALENT_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader
        },
        body: JSON.stringify({
          query: directReportsQuery,
          variables: directReportsVariables
        })
      });
      console.log('DEBUG: Direct reports response status:', directReportsResponse.status);
      const directReportsText = await directReportsResponse.text();
      console.log('DEBUG: Direct reports response raw text (first 500 chars):', directReportsText.substring(0, 500));
      let directReportsData;
      try {
        directReportsData = JSON.parse(directReportsText);
      } catch (parseError) {
        const errorMsg = `Direct reports API returned non-JSON response (status ${directReportsResponse.status}): ${directReportsText.substring(0, 200)}`;
        console.error('ERROR:', errorMsg);
        throw new Error(errorMsg);
      }
      console.log('DEBUG: Direct reports data received:', JSON.stringify(directReportsData, null, 2));

      // Check for GraphQL errors in the response
      if (directReportsData.errors) {
        console.warn('WARNING: GraphQL errors in direct reports query:', JSON.stringify(directReportsData.errors));
        console.warn('WARNING: Continuing without direct reports due to API error');
        // Continue without direct reports instead of throwing
      } else if ((_directReportsData$da = directReportsData.data) !== null && _directReportsData$da !== void 0 && (_directReportsData$da = _directReportsData$da.radar_positionsSearch) !== null && _directReportsData$da !== void 0 && _directReportsData$da.edges) {
        directReports = directReportsData.data.radar_positionsSearch.edges.map(edge => {
          let reportName = 'Unknown';
          if (edge.node.fieldValues) {
            var _workerField$fieldVal2;
            const workerField = edge.node.fieldValues.find(f => f.fieldId === 'positionWorker');
            if (workerField !== null && workerField !== void 0 && (_workerField$fieldVal2 = workerField.fieldValue) !== null && _workerField$fieldVal2 !== void 0 && (_workerField$fieldVal2 = _workerField$fieldVal2.value) !== null && _workerField$fieldVal2 !== void 0 && _workerField$fieldVal2.preferredName) {
              reportName = workerField.fieldValue.value.preferredName;
            }
          }
          return {
            preferredName: reportName
          };
        });
        console.log('DEBUG: Found', directReports.length, 'direct reports');
      }
    } catch (error) {
      console.error('ERROR: Error fetching direct reports:', error.message);
      console.error('ERROR: Full stack trace:', error.stack);
      // Continue without direct reports
    }

    // Fetch manager names for the reporting line hierarchy
    let populatedManagerHierarchy = [];
    if (managerHierarchy.length > 0) {
      try {
        const managerUUIDs = managerHierarchy.map(m => m.uuid);
        console.log('DEBUG: Fetching details for managers:', managerUUIDs);
        populatedManagerHierarchy = await fetchManagerDetails(managerUUIDs, cloudId, authEmail, apiToken);
        console.log('DEBUG: Populated manager hierarchy:', JSON.stringify(populatedManagerHierarchy, null, 2));
      } catch (error) {
        console.error('ERROR: Error fetching manager details:', error.message);
        // Continue with empty manager hierarchy
      }
    }

    // Query for peers (people who report to the same direct manager as the user)
    let peers = [];
    if (reportingLineString) {
      // Extract the direct manager's UUID from the reporting line
      // The reporting line contains position UUIDs in order from direct manager to top-level manager
      // The LAST UUID in the dot-separated string is the DIRECT MANAGER's position UUID
      const positionUUIDs = reportingLineString.split('.');
      console.log('DEBUG: Position UUIDs in reporting line:', positionUUIDs);
      const directManagerPositionUUID = positionUUIDs[positionUUIDs.length - 1];
      console.log('DEBUG: Direct manager position UUID:', directManagerPositionUUID);
      const peersQuery = `
        query positionsSearchQuery($cloudId: ID!, $fieldIdIsIn: [ID!], $first: Int = 100, $rql: String) {
          radar_positionsSearch(
            first: $first
            cloudId: $cloudId
            rql: $rql
          ) @optIn(to: ["RadarPositionsSearch"]) {
            edges {
              node {
                fieldValues(fieldIdIsIn: $fieldIdIsIn) {
                  fieldId
                  fieldValue {
                    ... on RadarStringFieldValue {
                      stringValue: value
                    }
                    ... on RadarAriFieldValue {
                      value {
                        ... on RadarWorker {
                          id
                          preferredName
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;

      // directManagerPositionUUID was already calculated earlier from positionUUIDs

      const peersVariables = {
        cloudId: cloudId,
        fieldIdIsIn: ["workerEmail", "positionWorker"],
        first: 100,
        rql: `manager = '${directManagerPositionUUID}'`
      };
      try {
        var _peersData$data;
        console.log('DEBUG: Querying peers for direct manager UUID:', directManagerPositionUUID);

        // Create Basic Auth header for the request
        const authHeader = createBasicAuthHeader(authEmail, apiToken);

        // Use fetch API to make HTTP requests to the Talent GraphQL API
        const peersResponse = await fetch(TALENT_GRAPHQL_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader
          },
          body: JSON.stringify({
            query: peersQuery,
            variables: peersVariables
          })
        });
        console.log('DEBUG: Peers response status:', peersResponse.status);
        const peersText = await peersResponse.text();
        console.log('DEBUG: Peers response raw text (first 500 chars):', peersText.substring(0, 500));
        let peersData;
        try {
          peersData = JSON.parse(peersText);
        } catch (parseError) {
          const errorMsg = `Peers API returned non-JSON response (status ${peersResponse.status}): ${peersText.substring(0, 200)}`;
          console.error('ERROR:', errorMsg);
          throw new Error(errorMsg);
        }
        console.log('DEBUG: Peers data received:', JSON.stringify(peersData, null, 2));

        // Check for GraphQL errors in the response
        if (peersData.errors) {
          console.warn('WARNING: GraphQL errors in peers query:', JSON.stringify(peersData.errors));
          console.warn('WARNING: Continuing without peers due to API error');
          // Continue without peers instead of throwing
        } else if ((_peersData$data = peersData.data) !== null && _peersData$data !== void 0 && (_peersData$data = _peersData$data.radar_positionsSearch) !== null && _peersData$data !== void 0 && _peersData$data.edges) {
          peers = peersData.data.radar_positionsSearch.edges.map(edge => {
            let peerName = 'Unknown';
            let peerEmail = null;
            if (edge.node.fieldValues) {
              var _workerField$fieldVal3, _emailField$fieldValu;
              const workerField = edge.node.fieldValues.find(f => f.fieldId === 'positionWorker');
              if (workerField !== null && workerField !== void 0 && (_workerField$fieldVal3 = workerField.fieldValue) !== null && _workerField$fieldVal3 !== void 0 && (_workerField$fieldVal3 = _workerField$fieldVal3.value) !== null && _workerField$fieldVal3 !== void 0 && _workerField$fieldVal3.preferredName) {
                peerName = workerField.fieldValue.value.preferredName;
              }
              const emailField = edge.node.fieldValues.find(f => f.fieldId === 'workerEmail');
              if (emailField !== null && emailField !== void 0 && (_emailField$fieldValu = emailField.fieldValue) !== null && _emailField$fieldValu !== void 0 && _emailField$fieldValu.stringValue) {
                peerEmail = emailField.fieldValue.stringValue;
              }
            }
            return {
              preferredName: peerName,
              email: peerEmail
            };
          })
          // Filter out the user themselves from peers (compare by email for accuracy)
          .filter(peer => peer.email !== userEmail && peer.preferredName !== userName);
          console.log('DEBUG: Found', peers.length, 'peers');
        }
      } catch (error) {
        console.error('ERROR: Error fetching peers:', error.message);
        console.error('ERROR: Full stack trace:', error.stack);
        // Continue without peers
      }
    }

    // Build the organizational tree visualization
    console.log('DEBUG: Building organizational tree visualization');
    const orgTree = buildOrgTreeVisualization(userName, populatedManagerHierarchy, directReports, peers);
    console.log('DEBUG: Organizational tree built successfully');
    console.log('DEBUG: Returning success response with tree visualization');
    return {
      type: 'success',
      output: orgTree
    };
  } catch (error) {
    console.error('ERROR: Caught error in getOrgTree function:', error.message);
    console.error('ERROR: Full error stack:', error.stack);
    const errorMessage = error.message || 'An unexpected error occurred while fetching organizational data.';
    console.error('ERROR: Returning error response to user:', errorMessage);
    return {
      type: 'error',
      message: errorMessage
    };
  }
}

/**
 * Main function to retrieve detailed position information for a user from Talent.
 * This function retrieves position details such as job family, level, job title, role, position title, and key.
 * 
 * @param {Object} request - The request object containing user email
 * @returns {Promise<Object>} Response with the position details
 */
async function getPositionDetails(request) {
  console.log('DEBUG: getPositionDetails function called');
  console.log('📥 Received payload:', JSON.stringify(request, null, 2));
  try {
    var _request$context2, _data$data2;
    // Retrieve the API token and email from environment variables
    const apiToken = process.env.TALENT_API_TOKEN;
    const authEmail = process.env.TALENT_AUTH_EMAIL;
    if (!apiToken || !authEmail) {
      return {
        type: 'error',
        message: 'API credentials are not configured. Please contact your administrator.'
      };
    }

    // Extract user email from the request
    const userEmail = request === null || request === void 0 ? void 0 : request.userEmail;
    if (!userEmail) {
      return {
        type: 'error',
        message: 'User email is required.'
      };
    }

    // Get the current cloud ID from the context
    const cloudId = request === null || request === void 0 || (_request$context2 = request.context) === null || _request$context2 === void 0 ? void 0 : _request$context2.cloudId;
    if (!cloudId) {
      return {
        type: 'error',
        message: 'Cloud ID is required.'
      };
    }
    console.log('DEBUG: Querying position details for user:', userEmail);

    // Query for the position details
    const query = `
      query positionsSearchQuery($cloudId: ID!, $fieldIdIsIn: [ID!], $first: Int = 100, $rql: String) {
        radar_positionsSearch(
          first: $first
          cloudId: $cloudId
          rql: $rql
        ) @optIn(to: ["RadarPositionsSearch"]) {
          totalCount
          edges {
            node {
              id
              fieldValues(fieldIdIsIn: $fieldIdIsIn) {
                fieldId
                fieldValue {
                  ... on RadarStringFieldValue {
                    stringValue: value
                  }
                  ... on RadarAriFieldValue {
                    value {
                      ... on RadarWorker {
                        id
                        preferredName
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
    const variables = {
      cloudId: cloudId,
      fieldIdIsIn: ["workerEmail", "positionWorker", "positionJobFamily", "positionLevel", "positionJobTitle", "positionRole", "positionPositionTitle", "positionKey"],
      first: 100,
      rql: `workerEmail = '${userEmail}'`
    };
    const authHeader = createBasicAuthHeader(authEmail, apiToken);
    const response = await fetch(TALENT_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    });
    const responseText = await response.text();
    const data = JSON.parse(responseText);
    if (data.errors) {
      throw new Error(`GraphQL error: ${JSON.stringify(data.errors)}`);
    }
    if (!((_data$data2 = data.data) !== null && _data$data2 !== void 0 && (_data$data2 = _data$data2.radar_positionsSearch) !== null && _data$data2 !== void 0 && _data$data2.edges) || data.data.radar_positionsSearch.edges.length === 0) {
      return {
        type: 'error',
        message: `User with email ${userEmail} not found in the system.`
      };
    }

    // Extract position information
    const position = data.data.radar_positionsSearch.edges[0].node;
    let positionDetails = {};
    let userName = userEmail;

    // Define field display names
    const fieldDisplayNames = {
      'positionWorker': 'Worker',
      'positionJobFamily': 'Job Family',
      'positionLevel': 'Level',
      'positionJobTitle': 'Job Title',
      'positionRole': 'Role',
      'positionPositionTitle': 'Position Title',
      'positionKey': 'Key'
    };

    // Extract field values
    if (position.fieldValues) {
      position.fieldValues.forEach(field => {
        var _field$fieldValue3, _field$fieldValue4;
        const displayName = fieldDisplayNames[field.fieldId];
        if (field.fieldId === 'positionWorker' && (_field$fieldValue3 = field.fieldValue) !== null && _field$fieldValue3 !== void 0 && (_field$fieldValue3 = _field$fieldValue3.value) !== null && _field$fieldValue3 !== void 0 && _field$fieldValue3.preferredName) {
          userName = field.fieldValue.value.preferredName;
          positionDetails[displayName] = field.fieldValue.value.preferredName;
        } else if (field.fieldId !== 'positionWorker' && (_field$fieldValue4 = field.fieldValue) !== null && _field$fieldValue4 !== void 0 && _field$fieldValue4.stringValue) {
          // For string values
          positionDetails[displayName] = field.fieldValue.stringValue;
        }
      });
    }

    // Build the response message
    let message = `Position Details for ${userName} (${userEmail}):\n\n`;
    Object.entries(positionDetails).forEach(([displayName, value]) => {
      if (value) {
        message += `${displayName}: ${value}\n`;
      }
    });
    console.log('DEBUG: Position details retrieved successfully');
    return {
      type: 'success',
      output: message
    };
  } catch (error) {
    console.error('ERROR: Caught error in getPositionDetails function:', error.message);
    console.error('ERROR: Full error stack:', error.stack);
    return {
      type: 'error',
      message: error.message || 'An unexpected error occurred while fetching position details.'
    };
  }
}

/**
 * Main function to retrieve all details (org tree + position information) for a user.
 * This function combines organizational structure and position details in a comprehensive, well-formatted output.
 * 
 * @param {Object} request - The request object containing user email
 * @returns {Promise<Object>} Response with all user details
 */
async function getAllUserDetails(request) {
  console.log('DEBUG: getAllUserDetails function called');
  console.log('📥 Received payload:', JSON.stringify(request, null, 2));
  try {
    var _request$context3, _data$data3;
    // Retrieve the API token and email from environment variables
    const apiToken = process.env.TALENT_API_TOKEN;
    const authEmail = process.env.TALENT_AUTH_EMAIL;
    if (!apiToken || !authEmail) {
      return {
        type: 'error',
        message: 'API credentials are not configured. Please contact your administrator.'
      };
    }

    // Extract user email from the request
    const userEmail = request === null || request === void 0 ? void 0 : request.userEmail;
    if (!userEmail) {
      return {
        type: 'error',
        message: 'User email is required.'
      };
    }

    // Get the current cloud ID from the context
    const cloudId = request === null || request === void 0 || (_request$context3 = request.context) === null || _request$context3 === void 0 ? void 0 : _request$context3.cloudId;
    if (!cloudId) {
      return {
        type: 'error',
        message: 'Cloud ID is required.'
      };
    }
    console.log('DEBUG: Querying all details for user:', userEmail);

    // Query for all position details including reporting line
    const query = `
      query positionsSearchQuery($cloudId: ID!, $fieldIdIsIn: [ID!], $first: Int = 100, $rql: String) {
        radar_positionsSearch(
          first: $first
          cloudId: $cloudId
          rql: $rql
        ) @optIn(to: ["RadarPositionsSearch"]) {
          totalCount
          edges {
            node {
              id
              fieldValues(fieldIdIsIn: $fieldIdIsIn) {
                fieldId
                fieldValue {
                  ... on RadarStringFieldValue {
                    stringValue: value
                  }
                  ... on RadarAriFieldValue {
                    value {
                      ... on RadarWorker {
                        id
                        preferredName
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
    const variables = {
      cloudId: cloudId,
      fieldIdIsIn: ["workerEmail", "positionWorker", "positionReportingLine", "positionJobFamily", "positionLevel", "positionJobTitle", "positionRole", "positionPositionTitle", "positionKey"],
      first: 100,
      rql: `workerEmail = '${userEmail}'`
    };
    const authHeader = createBasicAuthHeader(authEmail, apiToken);
    const response = await fetch(TALENT_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    });
    const responseText = await response.text();
    const data = JSON.parse(responseText);
    if (data.errors) {
      throw new Error(`GraphQL error: ${JSON.stringify(data.errors)}`);
    }
    if (!((_data$data3 = data.data) !== null && _data$data3 !== void 0 && (_data$data3 = _data$data3.radar_positionsSearch) !== null && _data$data3 !== void 0 && _data$data3.edges) || data.data.radar_positionsSearch.edges.length === 0) {
      return {
        type: 'error',
        message: `User with email ${userEmail} not found in the system.`
      };
    }

    // Extract position information
    const position = data.data.radar_positionsSearch.edges[0].node;
    const userPositionId = position.id;
    const userPositionUUID = userPositionId.split('/').pop();
    let userName = userEmail;
    let reportingLineString = null;
    let managerHierarchy = [];
    let positionDetails = {};

    // Define field display names
    const fieldDisplayNames = {
      'positionWorker': 'Worker',
      'positionJobFamily': 'Job Family',
      'positionLevel': 'Level',
      'positionJobTitle': 'Job Title',
      'positionRole': 'Role',
      'positionPositionTitle': 'Position Title',
      'positionKey': 'Key'
    };

    // Extract field values
    if (position.fieldValues) {
      position.fieldValues.forEach(field => {
        var _field$fieldValue5, _field$fieldValue6, _field$fieldValue7;
        const displayName = fieldDisplayNames[field.fieldId];
        if (field.fieldId === 'positionWorker' && (_field$fieldValue5 = field.fieldValue) !== null && _field$fieldValue5 !== void 0 && (_field$fieldValue5 = _field$fieldValue5.value) !== null && _field$fieldValue5 !== void 0 && _field$fieldValue5.preferredName) {
          userName = field.fieldValue.value.preferredName;
          positionDetails[displayName] = field.fieldValue.value.preferredName;
        } else if (field.fieldId === 'positionReportingLine' && (_field$fieldValue6 = field.fieldValue) !== null && _field$fieldValue6 !== void 0 && _field$fieldValue6.stringValue) {
          reportingLineString = field.fieldValue.stringValue;
        } else if (field.fieldId !== 'positionWorker' && (_field$fieldValue7 = field.fieldValue) !== null && _field$fieldValue7 !== void 0 && _field$fieldValue7.stringValue) {
          positionDetails[displayName] = field.fieldValue.stringValue;
        }
      });
    }

    // Parse the reporting line to get manager position UUIDs
    if (reportingLineString) {
      const positionUUIDs = reportingLineString.split('.');
      managerHierarchy = positionUUIDs.filter(uuid => uuid && uuid.trim()).map(uuid => ({
        uuid: uuid.trim(),
        preferredName: null
      }));
    }

    // Fetch manager names
    let populatedManagerHierarchy = [];
    if (managerHierarchy.length > 0) {
      try {
        const managerUUIDs = managerHierarchy.map(m => m.uuid);
        populatedManagerHierarchy = await fetchManagerDetails(managerUUIDs, cloudId, authEmail, apiToken);
      } catch (error) {
        console.error('ERROR: Error fetching manager details:', error.message);
      }
    }

    // Query for direct reports
    let directReports = [];
    const directReportsQuery = `
      query positionsSearchQuery($cloudId: ID!, $fieldIdIsIn: [ID!], $first: Int = 100, $rql: String) {
        radar_positionsSearch(
          first: $first
          cloudId: $cloudId
          rql: $rql
        ) @optIn(to: ["RadarPositionsSearch"]) {
          edges {
            node {
              fieldValues(fieldIdIsIn: $fieldIdIsIn) {
                fieldId
                fieldValue {
                  ... on RadarAriFieldValue {
                    value {
                      ... on RadarWorker {
                        id
                        preferredName
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
    const directReportsVariables = {
      cloudId: cloudId,
      fieldIdIsIn: ["workerEmail", "positionWorker"],
      first: 100,
      rql: `manager = '${userPositionUUID}'`
    };
    try {
      var _directReportsData$da2;
      const authHeaderDR = createBasicAuthHeader(authEmail, apiToken);
      const directReportsResponse = await fetch(TALENT_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeaderDR
        },
        body: JSON.stringify({
          query: directReportsQuery,
          variables: directReportsVariables
        })
      });
      const directReportsText = await directReportsResponse.text();
      const directReportsData = JSON.parse(directReportsText);
      if (!directReportsData.errors && (_directReportsData$da2 = directReportsData.data) !== null && _directReportsData$da2 !== void 0 && (_directReportsData$da2 = _directReportsData$da2.radar_positionsSearch) !== null && _directReportsData$da2 !== void 0 && _directReportsData$da2.edges) {
        directReports = directReportsData.data.radar_positionsSearch.edges.map(edge => {
          let reportName = 'Unknown';
          let reportEmail = null;
          if (edge.node.fieldValues) {
            var _workerField$fieldVal4, _emailField$fieldValu2;
            const workerField = edge.node.fieldValues.find(f => f.fieldId === 'positionWorker');
            if (workerField !== null && workerField !== void 0 && (_workerField$fieldVal4 = workerField.fieldValue) !== null && _workerField$fieldVal4 !== void 0 && (_workerField$fieldVal4 = _workerField$fieldVal4.value) !== null && _workerField$fieldVal4 !== void 0 && _workerField$fieldVal4.preferredName) {
              reportName = workerField.fieldValue.value.preferredName;
            }
            const emailField = edge.node.fieldValues.find(f => f.fieldId === 'workerEmail');
            if (emailField !== null && emailField !== void 0 && (_emailField$fieldValu2 = emailField.fieldValue) !== null && _emailField$fieldValu2 !== void 0 && _emailField$fieldValu2.stringValue) {
              reportEmail = emailField.fieldValue.stringValue;
            }
          }
          return {
            preferredName: reportName,
            email: reportEmail
          };
        });
      }
    } catch (error) {
      console.error('ERROR: Error fetching direct reports:', error.message);
    }

    // Query for peers
    let peers = [];
    if (reportingLineString) {
      const positionUUIDs = reportingLineString.split('.');
      const directManagerPositionUUID = positionUUIDs[positionUUIDs.length - 1];
      const peersQuery = `
        query positionsSearchQuery($cloudId: ID!, $fieldIdIsIn: [ID!], $first: Int = 100, $rql: String) {
          radar_positionsSearch(
            first: $first
            cloudId: $cloudId
            rql: $rql
          ) @optIn(to: ["RadarPositionsSearch"]) {
            edges {
              node {
                fieldValues(fieldIdIsIn: $fieldIdIsIn) {
                  fieldId
                  fieldValue {
                    ... on RadarStringFieldValue {
                      stringValue: value
                    }
                    ... on RadarAriFieldValue {
                      value {
                        ... on RadarWorker {
                          id
                          preferredName
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;

      // directManagerPositionUUID was already calculated from the first positionUUIDs split

      const peersVariables = {
        cloudId: cloudId,
        fieldIdIsIn: ["workerEmail", "positionWorker"],
        first: 100,
        rql: `manager = '${directManagerPositionUUID}'`
      };
      try {
        var _peersData$data2;
        const authHeaderPeers = createBasicAuthHeader(authEmail, apiToken);
        const peersResponse = await fetch(TALENT_GRAPHQL_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeaderPeers
          },
          body: JSON.stringify({
            query: peersQuery,
            variables: peersVariables
          })
        });
        const peersText = await peersResponse.text();
        const peersData = JSON.parse(peersText);
        if (!peersData.errors && (_peersData$data2 = peersData.data) !== null && _peersData$data2 !== void 0 && (_peersData$data2 = _peersData$data2.radar_positionsSearch) !== null && _peersData$data2 !== void 0 && _peersData$data2.edges) {
          peers = peersData.data.radar_positionsSearch.edges.map(edge => {
            let peerName = 'Unknown';
            let peerEmail = null;
            if (edge.node.fieldValues) {
              var _workerField$fieldVal5, _emailField$fieldValu3;
              const workerField = edge.node.fieldValues.find(f => f.fieldId === 'positionWorker');
              if (workerField !== null && workerField !== void 0 && (_workerField$fieldVal5 = workerField.fieldValue) !== null && _workerField$fieldVal5 !== void 0 && (_workerField$fieldVal5 = _workerField$fieldVal5.value) !== null && _workerField$fieldVal5 !== void 0 && _workerField$fieldVal5.preferredName) {
                peerName = workerField.fieldValue.value.preferredName;
              }
              const emailField = edge.node.fieldValues.find(f => f.fieldId === 'workerEmail');
              if (emailField !== null && emailField !== void 0 && (_emailField$fieldValu3 = emailField.fieldValue) !== null && _emailField$fieldValu3 !== void 0 && _emailField$fieldValu3.stringValue) {
                peerEmail = emailField.fieldValue.stringValue;
              }
            }
            return {
              preferredName: peerName,
              email: peerEmail
            };
          }).filter(peer => peer.email !== userEmail && peer.preferredName !== userName);
        }
      } catch (error) {
        console.error('ERROR: Error fetching peers:', error.message);
      }
    }

    // Build comprehensive output
    let message = `╔════════════════════════════════════════════╗\n`;
    message += `║ COMPLETE USER DETAILS\n`;
    message += `╚════════════════════════════════════════════╝\n\n`;

    // User and Position Information
    message += `👤 USER INFORMATION\n`;
    message += `─────────────────────────────────────────\n`;
    message += `Name: ${userName}\n`;
    message += `Email: ${userEmail}\n`;
    message += `\n`;

    // Position Details
    message += `💼 POSITION DETAILS\n`;
    message += `─────────────────────────────────────────\n`;
    Object.entries(positionDetails).forEach(([displayName, value]) => {
      if (value && displayName !== 'Worker') {
        message += `${displayName}: ${value}\n`;
      }
    });
    message += `\n`;

    // Reporting Line
    message += `🔗 REPORTING LINE\n`;
    message += `─────────────────────────────────────────\n`;
    if (populatedManagerHierarchy && populatedManagerHierarchy.length > 0) {
      // Reverse the hierarchy so direct manager appears first
      const reversedHierarchy = [...populatedManagerHierarchy].reverse();
      reversedHierarchy.forEach((manager, index) => {
        const levelLabel = index === 0 ? 'Direct Manager' : `Level ${index + 1}`;
        message += `${index + 1}. ${manager.preferredName} (${levelLabel})\n`;
      });
    } else {
      message += `No managers found\n`;
    }
    message += `\n`;

    // Direct Reports
    message += `📊 DIRECT REPORTS (${directReports.length})\n`;
    message += `─────────────────────────────────────────\n`;
    if (directReports.length > 0) {
      directReports.forEach((report, index) => {
        const displayText = report.email ? `${report.preferredName} (${report.email})` : report.preferredName;
        message += `${index + 1}. ${displayText}\n`;
      });
    } else {
      message += `None\n`;
    }
    message += `\n`;

    // Peers
    message += `👥 PEERS (${peers.length})\n`;
    message += `─────────────────────────────────────────\n`;
    if (peers.length > 0) {
      peers.forEach((peer, index) => {
        const displayText = peer.email ? `${peer.preferredName} (${peer.email})` : peer.preferredName;
        message += `${index + 1}. ${displayText}\n`;
      });
    } else {
      message += `None\n`;
    }
    console.log('DEBUG: All user details retrieved successfully');
    return {
      type: 'success',
      output: message
    };
  } catch (error) {
    console.error('ERROR: Caught error in getAllUserDetails function:', error.message);
    console.error('ERROR: Full error stack:', error.stack);
    return {
      type: 'error',
      message: error.message || 'An unexpected error occurred while fetching user details.'
    };
  }
}

/**
 * Retrieves collaborators for a user filtered by relationship type.
 * This function calls getOrgTree internally and filters results by the specified relationship.
 * 
 * @param {Object} request - The request object containing userEmail, relationship, and limit
 * @returns {Promise<Object>} Response with filtered collaborators
 */
async function getCollaborators(request) {
  console.log('DEBUG: getCollaborators function called');
  console.log('📥 Received payload:', JSON.stringify(request, null, 2));
  try {
    var _request$relationship;
    // Extract parameters from the request
    const userEmail = request === null || request === void 0 ? void 0 : request.userEmail;
    const relationship = request === null || request === void 0 || (_request$relationship = request.relationship) === null || _request$relationship === void 0 ? void 0 : _request$relationship.toLowerCase();
    const limit = request === null || request === void 0 ? void 0 : request.limit;

    // Validate required parameters
    if (!userEmail) {
      return {
        type: 'error',
        message: 'User email is required.'
      };
    }
    if (!relationship) {
      return {
        type: 'error',
        message: 'Relationship type is required. Valid values: manager, direct_reports, peers'
      };
    }
    if (limit === undefined || limit === null || limit < 1) {
      return {
        type: 'error',
        message: 'Result limit must be a positive number.'
      };
    }

    // Validate relationship type
    const validRelationships = ['manager', 'direct_reports', 'peers'];
    if (!validRelationships.includes(relationship)) {
      return {
        type: 'error',
        message: `Invalid relationship type: ${relationship}. Valid values: ${validRelationships.join(', ')}`
      };
    }
    console.log(`DEBUG: Getting collaborators for ${userEmail} with relationship: ${relationship}, limit: ${limit}`);

    // Call getOrgTree to get the organizational structure
    const orgTreeResult = await getOrgTree(request);
    if (orgTreeResult.type === 'error') {
      return orgTreeResult;
    }

    // Extract collaborators based on relationship type
    let collaborators = [];
    if (relationship === 'manager') {
      var _request$context4, _data$data4;
      // For manager relationship, retrieve the reporting line hierarchy
      const apiToken = process.env.TALENT_API_TOKEN;
      const authEmail = process.env.TALENT_AUTH_EMAIL;
      const cloudId = request === null || request === void 0 || (_request$context4 = request.context) === null || _request$context4 === void 0 ? void 0 : _request$context4.cloudId;
      if (!apiToken || !authEmail || !cloudId) {
        return {
          type: 'error',
          message: 'Required credentials or context not available.'
        };
      }

      // Query for user position and reporting line
      const query = `
        query positionsSearchQuery($cloudId: ID!, $fieldIdIsIn: [ID!], $first: Int = 100, $rql: String) {
          radar_positionsSearch(
            first: $first
            cloudId: $cloudId
            rql: $rql
          ) @optIn(to: ["RadarPositionsSearch"]) {
            edges {
              node {
                id
                fieldValues(fieldIdIsIn: $fieldIdIsIn) {
                  fieldId
                  fieldValue {
                    ... on RadarStringFieldValue {
                      stringValue: value
                    }
                  }
                }
              }
            }
          }
        }
      `;
      const variables = {
        cloudId: cloudId,
        fieldIdIsIn: ["positionReportingLine"],
        first: 100,
        rql: `workerEmail = '${userEmail}'`
      };
      const authHeader = createBasicAuthHeader(authEmail, apiToken);
      const response = await fetch(TALENT_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader
        },
        body: JSON.stringify({
          query: query,
          variables: variables
        })
      });
      const responseText = await response.text();
      const data = JSON.parse(responseText);
      if (data.errors || !((_data$data4 = data.data) !== null && _data$data4 !== void 0 && (_data$data4 = _data$data4.radar_positionsSearch) !== null && _data$data4 !== void 0 && _data$data4.edges) || data.data.radar_positionsSearch.edges.length === 0) {
        return {
          type: 'error',
          message: `User with email ${userEmail} not found in the system.`
        };
      }

      // Extract reporting line
      const position = data.data.radar_positionsSearch.edges[0].node;
      let reportingLineString = null;
      if (position.fieldValues) {
        position.fieldValues.forEach(field => {
          var _field$fieldValue8;
          if (field.fieldId === 'positionReportingLine' && (_field$fieldValue8 = field.fieldValue) !== null && _field$fieldValue8 !== void 0 && _field$fieldValue8.stringValue) {
            reportingLineString = field.fieldValue.stringValue;
          }
        });
      }

      // Parse reporting line and fetch manager details
      if (reportingLineString) {
        const positionUUIDs = reportingLineString.split('.');

        // Reverse the array so we start from the direct manager (first element after reverse)
        // and go up the chain to top-level manager
        const reversedUUIDs = positionUUIDs.reverse();

        // Take only the first 'limit' managers from the reversed list
        const managerUUIDs = reversedUUIDs.filter(uuid => uuid && uuid.trim()).slice(0, limit).map(uuid => ({
          uuid: uuid.trim()
        }));

        // Fetch manager details with position titles
        try {
          collaborators = await fetchManagerDetailsWithPositionTitle(managerUUIDs, cloudId, authEmail, apiToken);
        } catch (error) {
          console.error('ERROR: Error fetching manager details:', error.message);
          return {
            type: 'error',
            message: 'Failed to retrieve manager information.'
          };
        }
      }
    } else {
      var _request$context5;
      // For direct_reports and peers, we need to query the API directly
      const apiToken = process.env.TALENT_API_TOKEN;
      const authEmail = process.env.TALENT_AUTH_EMAIL;
      const cloudId = request === null || request === void 0 || (_request$context5 = request.context) === null || _request$context5 === void 0 ? void 0 : _request$context5.cloudId;
      if (!apiToken || !authEmail || !cloudId) {
        return {
          type: 'error',
          message: 'Required credentials or context not available.'
        };
      }
      if (relationship === 'direct_reports') {
        collaborators = await getCollaboratorsList(userEmail, 'direct_reports', cloudId, authEmail, apiToken);
      } else if (relationship === 'peers') {
        collaborators = await getCollaboratorsList(userEmail, 'peers', cloudId, authEmail, apiToken);
      }
    }

    // Limit the results
    const limitedCollaborators = collaborators.slice(0, limit);

    // Format the output
    if (limitedCollaborators.length === 0) {
      const relationshipLabel = formatRelationshipLabel(relationship);
      return {
        type: 'success',
        output: `No ${relationshipLabel.toLowerCase()} found.`
      };
    }
    let message = '';
    limitedCollaborators.forEach((collaborator, index) => {
      const relationshipLabel = formatRelationshipLabel(relationship, index);
      const line = `${collaborator.name}, ${collaborator.positionTitle || 'N/A'}, ${relationshipLabel}`;
      message += line;
      if (index < limitedCollaborators.length - 1) {
        message += '\n';
      }
    });
    console.log('DEBUG: Collaborators retrieved successfully');
    return {
      type: 'success',
      output: message
    };
  } catch (error) {
    console.error('ERROR: Caught error in getCollaborators function:', error.message);
    console.error('ERROR: Full error stack:', error.stack);
    return {
      type: 'error',
      message: error.message || 'An unexpected error occurred while fetching collaborators.'
    };
  }
}

/**
 * Helper function to fetch manager details including position title.
 */
async function fetchManagerDetailsWithPositionTitle(managerUUIDs, cloudId, authEmail, apiToken) {
  const managers = [];
  for (const managerData of managerUUIDs) {
    try {
      var _data$data5;
      const uuid = managerData.uuid;
      const query = `
        query positionsSearchQuery($cloudId: ID!, $fieldIdIsIn: [ID!], $first: Int = 100, $rql: String) {
          radar_positionsSearch(
            first: $first
            cloudId: $cloudId
            rql: $rql
          ) @optIn(to: ["RadarPositionsSearch"]) {
            edges {
              node {
                fieldValues(fieldIdIsIn: $fieldIdIsIn) {
                  fieldId
                  fieldValue {
                    ... on RadarStringFieldValue {
                      stringValue: value
                    }
                    ... on RadarAriFieldValue {
                      value {
                        ... on RadarWorker {
                          preferredName
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;
      const variables = {
        cloudId: cloudId,
        fieldIdIsIn: ["positionWorker", "positionPositionTitle"],
        first: 100,
        rql: `id = '${uuid}'`
      };
      const authHeader = createBasicAuthHeader(authEmail, apiToken);
      const response = await fetch(TALENT_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader
        },
        body: JSON.stringify({
          query: query,
          variables: variables
        })
      });
      const responseText = await response.text();
      const data = JSON.parse(responseText);
      if ((_data$data5 = data.data) !== null && _data$data5 !== void 0 && (_data$data5 = _data$data5.radar_positionsSearch) !== null && _data$data5 !== void 0 && _data$data5.edges && data.data.radar_positionsSearch.edges.length > 0) {
        const edge = data.data.radar_positionsSearch.edges[0];
        let managerName = 'Unknown';
        let positionTitle = null;
        if (edge.node.fieldValues) {
          var _workerField$fieldVal6, _titleField$fieldValu;
          const workerField = edge.node.fieldValues.find(f => f.fieldId === 'positionWorker');
          if (workerField !== null && workerField !== void 0 && (_workerField$fieldVal6 = workerField.fieldValue) !== null && _workerField$fieldVal6 !== void 0 && (_workerField$fieldVal6 = _workerField$fieldVal6.value) !== null && _workerField$fieldVal6 !== void 0 && _workerField$fieldVal6.preferredName) {
            managerName = workerField.fieldValue.value.preferredName;
          }
          const titleField = edge.node.fieldValues.find(f => f.fieldId === 'positionPositionTitle');
          if (titleField !== null && titleField !== void 0 && (_titleField$fieldValu = titleField.fieldValue) !== null && _titleField$fieldValu !== void 0 && _titleField$fieldValu.stringValue) {
            positionTitle = titleField.fieldValue.stringValue;
          }
        }
        managers.push({
          name: managerName,
          positionTitle: positionTitle,
          relationship: 'Manager'
        });
      }
    } catch (error) {
      console.error('ERROR: Error fetching manager details for UUID', managerData.uuid, ':', error.message);
    }
  }
  return managers;
}

/**
 * Helper function to retrieve collaborators list (direct reports or peers) with position titles.
 */
async function getCollaboratorsList(userEmail, relationshipType, cloudId, authEmail, apiToken) {
  const collaborators = [];
  try {
    var _userData$data, _collaboratorsData$da;
    // First, get the user's position information
    const userQuery = `
      query positionsSearchQuery($cloudId: ID!, $fieldIdIsIn: [ID!], $first: Int = 100, $rql: String) {
        radar_positionsSearch(
          first: $first
          cloudId: $cloudId
          rql: $rql
        ) @optIn(to: ["RadarPositionsSearch"]) {
          edges {
            node {
              id
              fieldValues(fieldIdIsIn: $fieldIdIsIn) {
                fieldId
                fieldValue {
                  ... on RadarStringFieldValue {
                    stringValue: value
                  }
                }
              }
            }
          }
        }
      }
    `;
    const userVariables = {
      cloudId: cloudId,
      fieldIdIsIn: ["positionReportingLine"],
      first: 100,
      rql: `workerEmail = '${userEmail}'`
    };
    const authHeader = createBasicAuthHeader(authEmail, apiToken);
    const userResponse = await fetch(TALENT_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify({
        query: userQuery,
        variables: userVariables
      })
    });
    const userResponseText = await userResponse.text();
    const userData = JSON.parse(userResponseText);
    if (!((_userData$data = userData.data) !== null && _userData$data !== void 0 && (_userData$data = _userData$data.radar_positionsSearch) !== null && _userData$data !== void 0 && _userData$data.edges) || userData.data.radar_positionsSearch.edges.length === 0) {
      return collaborators;
    }
    const userPosition = userData.data.radar_positionsSearch.edges[0].node;
    const userPositionId = userPosition.id;
    const userPositionUUID = userPositionId.split('/').pop();
    let reportingLineString = null;
    if (userPosition.fieldValues) {
      userPosition.fieldValues.forEach(field => {
        var _field$fieldValue9;
        if (field.fieldId === 'positionReportingLine' && (_field$fieldValue9 = field.fieldValue) !== null && _field$fieldValue9 !== void 0 && _field$fieldValue9.stringValue) {
          reportingLineString = field.fieldValue.stringValue;
        }
      });
    }
    let searchRQL = '';
    if (relationshipType === 'direct_reports') {
      // Search for people whose manager is the current user
      searchRQL = `manager = '${userPositionUUID}'`;
    } else if (relationshipType === 'peers') {
      // Search for people whose manager is the current user's manager
      if (reportingLineString) {
        const positionUUIDs = reportingLineString.split('.');
        const directManagerUUID = positionUUIDs[positionUUIDs.length - 1];
        searchRQL = `manager = '${directManagerUUID}'`;
      } else {
        return collaborators;
      }
    }

    // Query for collaborators
    const collaboratorsQuery = `
      query positionsSearchQuery($cloudId: ID!, $fieldIdIsIn: [ID!], $first: Int = 100, $rql: String) {
        radar_positionsSearch(
          first: $first
          cloudId: $cloudId
          rql: $rql
        ) @optIn(to: ["RadarPositionsSearch"]) {
          edges {
            node {
              fieldValues(fieldIdIsIn: $fieldIdIsIn) {
                fieldId
                fieldValue {
                  ... on RadarStringFieldValue {
                    stringValue: value
                  }
                  ... on RadarAriFieldValue {
                    value {
                      ... on RadarWorker {
                        id
                        preferredName
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
    const collaboratorsVariables = {
      cloudId: cloudId,
      fieldIdIsIn: ["workerEmail", "positionWorker", "positionPositionTitle"],
      first: 100,
      rql: searchRQL
    };
    const collaboratorsResponse = await fetch(TALENT_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify({
        query: collaboratorsQuery,
        variables: collaboratorsVariables
      })
    });
    const collaboratorsResponseText = await collaboratorsResponse.text();
    const collaboratorsData = JSON.parse(collaboratorsResponseText);
    if ((_collaboratorsData$da = collaboratorsData.data) !== null && _collaboratorsData$da !== void 0 && (_collaboratorsData$da = _collaboratorsData$da.radar_positionsSearch) !== null && _collaboratorsData$da !== void 0 && _collaboratorsData$da.edges) {
      collaboratorsData.data.radar_positionsSearch.edges.forEach(edge => {
        let name = 'Unknown';
        let positionTitle = null;
        let email = null;
        if (edge.node.fieldValues) {
          var _workerField$fieldVal7, _titleField$fieldValu2, _emailField$fieldValu4;
          const workerField = edge.node.fieldValues.find(f => f.fieldId === 'positionWorker');
          if (workerField !== null && workerField !== void 0 && (_workerField$fieldVal7 = workerField.fieldValue) !== null && _workerField$fieldVal7 !== void 0 && (_workerField$fieldVal7 = _workerField$fieldVal7.value) !== null && _workerField$fieldVal7 !== void 0 && _workerField$fieldVal7.preferredName) {
            name = workerField.fieldValue.value.preferredName;
          }
          const titleField = edge.node.fieldValues.find(f => f.fieldId === 'positionPositionTitle');
          if (titleField !== null && titleField !== void 0 && (_titleField$fieldValu2 = titleField.fieldValue) !== null && _titleField$fieldValu2 !== void 0 && _titleField$fieldValu2.stringValue) {
            positionTitle = titleField.fieldValue.stringValue;
          }
          const emailField = edge.node.fieldValues.find(f => f.fieldId === 'workerEmail');
          if (emailField !== null && emailField !== void 0 && (_emailField$fieldValu4 = emailField.fieldValue) !== null && _emailField$fieldValu4 !== void 0 && _emailField$fieldValu4.stringValue) {
            email = emailField.fieldValue.stringValue;
          }
        }

        // For peers, filter out the user themselves
        if (relationshipType === 'peers' && email === userEmail) {
          return;
        }
        collaborators.push({
          name: name,
          positionTitle: positionTitle,
          email: email
        });
      });
    }
  } catch (error) {
    console.error(`ERROR: Error fetching ${relationshipType}:`, error.message);
  }
  return collaborators;
}

/**
 * Helper function to format relationship label.
 * For managers, appends +N to indicate the level (Manager, Manager+1, Manager+2, etc.)
 */
function formatRelationshipLabel(relationship, index = 0) {
  if (relationship === 'manager') {
    if (index === 0) {
      return 'Manager';
    } else {
      return `Manager+${index}`;
    }
  }
  const labels = {
    'direct_reports': 'Direct Report',
    'peers': 'Peer'
  };
  return labels[relationship] || relationship;
}
})();

var __webpack_export_target__ = exports;
for(var __webpack_i__ in __webpack_exports__) __webpack_export_target__[__webpack_i__] = __webpack_exports__[__webpack_i__];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguY2pzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFCQUFxQixtQkFBTyxDQUFDLElBQW1CO0FBQ2hELHNCQUFzQixtQkFBTyxDQUFDLEVBQW9CO0FBQ2xELG1CQUFtQixtQkFBTyxDQUFDLElBQWlCO0FBQzVDLG1CQUFtQixtQkFBTyxDQUFDLElBQWlCO0FBQzVDLG1CQUFtQixtQkFBTyxDQUFDLElBQWlCOztBQUU1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDL0JBLG1CQUFtQixtQkFBTyxDQUFDLElBQWlCOztBQUU1QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUNsQ0EsZUFBZSxtQkFBTyxDQUFDLElBQWE7O0FBRXBDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsVUFBVTtBQUNyQixXQUFXLFVBQVU7QUFDckIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7OztBQ3hFYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGdCQUFnQixVQUFVO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7Ozs7Ozs7O0FDM0MzQixpQkFBaUIsbUJBQU8sQ0FBQyxJQUFlOztBQUV4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxHQUFHO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7QUNmQSx3Qzs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZCxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsYUFBYSxHQUFHO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztBQ1pBLGFBQWEsbUJBQU8sQ0FBQyxJQUFXOztBQUVoQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZCxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7QUM3Q2E7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QscUJBQXFCLEdBQUcsb0JBQW9CO0FBQzVDLGlCQUFpQixtQkFBTyxDQUFDLElBQVU7QUFDbkMsZ0JBQWdCLG1CQUFPLENBQUMsSUFBUztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsZ0NBQWdDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxZQUFZLHdCQUF3QjtBQUNwQztBQUNBLG1DQUFtQyxvQkFBb0Isd0JBQXdCLEtBQUs7QUFDcEY7QUFDQTtBQUNBLG1FQUFtRSxLQUFLO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEZBQTBGLElBQUk7QUFDOUY7QUFDQTtBQUNBLCtFQUErRSxJQUFJO0FBQ25GO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDckRhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELDJCQUEyQixHQUFHLGdDQUFnQztBQUM5RDtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxnQkFBZ0IsVUFBVTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyRUFBMkUsK0JBQStCO0FBQzFHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyRUFBMkUsK0JBQStCO0FBQzFHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsbUNBQW1DLElBQUk7QUFDeEY7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSwyQkFBMkI7Ozs7Ozs7O0FDekozQixnQkFBZ0IsbUJBQU8sQ0FBQyxJQUFjOztBQUV0QztBQUNBOztBQUVBOzs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxrQkFBa0I7QUFDbEIsaUNBQWlDLG1CQUFPLENBQUMsSUFBMEI7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGVBQWU7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCOzs7Ozs7OztBQ25DbEIsbUJBQW1CLG1CQUFPLENBQUMsSUFBaUI7O0FBRTVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLEdBQUc7QUFDZCxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7QUN6QmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsMEJBQTBCLEdBQUcsc0JBQXNCLEdBQUcsYUFBYSxHQUFHLHlCQUF5QixHQUFHLGVBQWU7QUFDakg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQSxpQ0FBaUMscUJBQXFCLEVBQUUsbUJBQW1CO0FBQzNFO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHFCQUFxQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCOzs7Ozs7Ozs7QUNuRmI7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsZ0NBQWdDLEdBQUcsYUFBYSxHQUFHLFdBQVc7QUFDOUQsV0FBVztBQUNYLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixvQ0FBb0M7QUFDM0QsbUNBQW1DLDRDQUE0QztBQUMvRSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDOzs7Ozs7OztBQzFCaEMsZ0JBQWdCLG1CQUFPLENBQUMsSUFBYztBQUN0QyxpQkFBaUIsbUJBQU8sQ0FBQyxJQUFlO0FBQ3hDLGNBQWMsbUJBQU8sQ0FBQyxJQUFZO0FBQ2xDLGNBQWMsbUJBQU8sQ0FBQyxJQUFZO0FBQ2xDLGNBQWMsbUJBQU8sQ0FBQyxJQUFZOztBQUVsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9CQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTLGdCQUFnQixzQ0FBc0Msa0JBQWtCO0FBQ2pGLHdCQUF3QjtBQUN4QjtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7O0FBRU87QUFDUDtBQUNBLCtDQUErQyxPQUFPO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsY0FBYztBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBLDJDQUEyQyxRQUFRO0FBQ25EO0FBQ0E7O0FBRU87QUFDUCxrQ0FBa0M7QUFDbEM7O0FBRU87QUFDUCx1QkFBdUIsdUZBQXVGO0FBQzlHO0FBQ0E7QUFDQSx5R0FBeUc7QUFDekc7QUFDQSxzQ0FBc0MsUUFBUTtBQUM5QztBQUNBLGdFQUFnRTtBQUNoRTtBQUNBLDhDQUE4Qyx5RkFBeUY7QUFDdkksOERBQThELDJDQUEyQztBQUN6RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBLGtCQUFrQix5QkFBeUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQSw0Q0FBNEMseUVBQXlFO0FBQ3JIOztBQUVPO0FBQ1A7QUFDQTs7QUFFTztBQUNQLDBCQUEwQiwrREFBK0QsaUJBQWlCO0FBQzFHO0FBQ0Esa0NBQWtDLE1BQU0sK0JBQStCLFlBQVk7QUFDbkYsaUNBQWlDLE1BQU0sbUNBQW1DLFlBQVk7QUFDdEYsOEJBQThCO0FBQzlCO0FBQ0EsR0FBRztBQUNIOztBQUVPO0FBQ1AsWUFBWSw2QkFBNkIsMEJBQTBCLGNBQWMscUJBQXFCO0FBQ3RHLDJJQUEySSxjQUFjO0FBQ3pKLHFCQUFxQixzQkFBc0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDLGlDQUFpQyxTQUFTO0FBQzFDLGlDQUFpQyxXQUFXLFVBQVU7QUFDdEQsd0NBQXdDLGNBQWM7QUFDdEQ7QUFDQSw0R0FBNEcsT0FBTztBQUNuSCwrRUFBK0UsaUJBQWlCO0FBQ2hHLHVEQUF1RCxnQkFBZ0IsUUFBUTtBQUMvRSw2Q0FBNkMsZ0JBQWdCLGdCQUFnQjtBQUM3RTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0EsUUFBUSxZQUFZLGFBQWEsU0FBUyxVQUFVO0FBQ3BELGtDQUFrQyxTQUFTO0FBQzNDO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxlQUFlLG9DQUFvQztBQUNuRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDOztBQUVNO0FBQ1A7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsTUFBTTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDTztBQUNQLDJCQUEyQixzQkFBc0I7QUFDakQ7QUFDQTtBQUNBOztBQUVBO0FBQ087QUFDUCxnREFBZ0QsUUFBUTtBQUN4RCx1Q0FBdUMsUUFBUTtBQUMvQyx1REFBdUQsUUFBUTtBQUMvRDtBQUNBO0FBQ0E7O0FBRU87QUFDUCwyRUFBMkUsT0FBTztBQUNsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0Esd01BQXdNLGNBQWM7QUFDdE4sNEJBQTRCLHNCQUFzQjtBQUNsRCx3QkFBd0IsWUFBWSxzQkFBc0IscUNBQXFDLDJDQUEyQyxNQUFNO0FBQ2hKLDBCQUEwQixNQUFNLGlCQUFpQixZQUFZO0FBQzdELHFCQUFxQjtBQUNyQiw0QkFBNEI7QUFDNUIsMkJBQTJCO0FBQzNCLDBCQUEwQjtBQUMxQjs7QUFFTztBQUNQO0FBQ0EsZUFBZSw2Q0FBNkMsVUFBVSxzREFBc0QsY0FBYztBQUMxSSx3QkFBd0IsNkJBQTZCLG9CQUFvQix1Q0FBdUMsa0JBQWtCO0FBQ2xJOztBQUVPO0FBQ1A7QUFDQTtBQUNBLHlHQUF5Ryx1RkFBdUYsY0FBYztBQUM5TSxxQkFBcUIsOEJBQThCLGdEQUFnRCx3REFBd0Q7QUFDM0osMkNBQTJDLHNDQUFzQyxVQUFVLG1CQUFtQixJQUFJO0FBQ2xIOztBQUVPO0FBQ1AsK0JBQStCLHVDQUF1QyxZQUFZLEtBQUssT0FBTztBQUM5RjtBQUNBOztBQUVBO0FBQ0Esd0NBQXdDLDRCQUE0QjtBQUNwRSxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBLHFEQUFxRCxjQUFjO0FBQ25FO0FBQ0E7QUFDQTs7QUFFTztBQUNQLDJDQUEyQztBQUMzQzs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLE1BQU0sb0JBQW9CLFlBQVk7QUFDNUUscUJBQXFCLDhDQUE4QztBQUNuRTtBQUNBO0FBQ0EscUJBQXFCLGFBQWE7QUFDbEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVGQUF1RixTQUFTLGdCQUFnQjtBQUNoSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBLGlFQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRUFBQzs7Ozs7Ozs7QUNoWkYsY0FBYyxtQkFBTyxDQUFDLElBQVc7QUFDakMsWUFBWSxtQkFBTyxDQUFDLElBQVU7QUFDOUIsbUJBQW1CLG1CQUFPLENBQUMsSUFBaUI7QUFDNUMsZUFBZSxtQkFBTyxDQUFDLElBQVk7O0FBRW5DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2QsV0FBVyxRQUFRO0FBQ25CLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUNwQkEsb0JBQW9CLG1CQUFPLENBQUMsSUFBa0I7O0FBRTlDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7Ozs7Ozs7OztBQzFCYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxzQ0FBc0MsR0FBRywyQkFBMkI7QUFDcEUsZ0JBQWdCLG1CQUFPLENBQUMsSUFBTztBQUMvQixzQ0FBc0MsbUJBQU8sQ0FBQyxJQUFZO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDOzs7Ozs7Ozs7QUN2QnpCO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGdCQUFnQixtQkFBTyxDQUFDLElBQU87QUFDL0IscUJBQXFCLG1CQUFPLENBQUMsSUFBNEI7QUFDekQscUJBQXFCLG1CQUFPLENBQUMsSUFBYztBQUMzQyxxQkFBcUIsbUJBQU8sQ0FBQyxJQUFTOzs7Ozs7OztBQ0x0QyxXQUFXLG1CQUFPLENBQUMsSUFBUzs7QUFFNUI7QUFDQTs7QUFFQTs7Ozs7Ozs7QUNMQSxpQkFBaUIsbUJBQU8sQ0FBQyxJQUFlO0FBQ3hDLGVBQWUsbUJBQU8sQ0FBQyxJQUFZOztBQUVuQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2QsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDcENBLG1CQUFtQixtQkFBTyxDQUFDLElBQWlCOztBQUU1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7QUNkYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCwwQkFBMEIsR0FBRyx5QkFBeUIsR0FBRyxpQkFBaUI7QUFDMUU7QUFDQTtBQUNBLGdEQUFnRCxNQUFNO0FBQ3RELDhDQUE4QyxNQUFNO0FBQ3BELENBQUM7QUFDRCxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLHdEQUF3RCxNQUFNLEdBQUcsY0FBYztBQUMvRSxzREFBc0QsTUFBTSxHQUFHLGNBQWM7QUFDN0UsQ0FBQztBQUNELHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0EseURBQXlELGVBQWU7QUFDeEUsdURBQXVELGVBQWU7QUFDdEUsQ0FBQztBQUNELDBCQUEwQjs7Ozs7Ozs7QUNwQjFCLGNBQWMsbUJBQU8sQ0FBQyxHQUFXOztBQUVqQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7OztBQ3pCYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCw0QkFBNEI7QUFDNUIsd0JBQXdCLG1CQUFPLENBQUMsSUFBbUI7QUFDbkQsd0RBQXVELEVBQUUscUNBQXFDLGtEQUFrRCxFQUFDOzs7Ozs7OztBQ0pqSixhQUFhLG1CQUFPLENBQUMsSUFBVztBQUNoQyxnQkFBZ0IsbUJBQU8sQ0FBQyxHQUFjO0FBQ3RDLHFCQUFxQixtQkFBTyxDQUFDLElBQW1COztBQUVoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDM0JBLGdCQUFnQixtQkFBTyxDQUFDLElBQWM7O0FBRXRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixhQUFhLEdBQUc7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDakJBLG1CQUFtQixtQkFBTyxDQUFDLElBQWlCOztBQUU1QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztBQ3RCQSxpQkFBaUIsbUJBQU8sQ0FBQyxJQUFlOztBQUV4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxHQUFHO0FBQ2QsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztBQ3JCQSxXQUFXLG1CQUFPLENBQUMsSUFBUztBQUM1QixnQkFBZ0IsbUJBQU8sQ0FBQyxFQUFjO0FBQ3RDLFVBQVUsbUJBQU8sQ0FBQyxJQUFROztBQUUxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7OztBQ3BCYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCwyQkFBMkIsR0FBRyxzQkFBc0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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RTtJQUM5QixJQUFJdEYsS0FBSyxLQUFLLENBQUMsRUFBRTtNQUNmLE9BQU8sU0FBUztJQUNsQixDQUFDLE1BQU07TUFDTCxPQUFPLFdBQVdBLEtBQUssRUFBRTtJQUMzQjtFQUNGO0VBRUEsTUFBTXNJLE1BQU0sR0FBRztJQUNiLGdCQUFnQixFQUFFLGVBQWU7SUFDakMsT0FBTyxFQUFFO0VBQ1gsQ0FBQztFQUNELE9BQU9BLE1BQU0sQ0FBQ2hELFlBQVksQ0FBQyxJQUFJQSxZQUFZO0FBQzdDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX0xpc3RDYWNoZS5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2xpc3RDYWNoZURlbGV0ZS5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvbWVtb2l6ZS5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9AZm9yZ2Uvc3RvcmFnZS9vdXQvcXVlcnktYXBpLmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwQ2FjaGVHZXQuanMiLCJ3ZWJwYWNrOi8vYWN0aW9uLXJvdm8vZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImFzeW5jX2hvb2tzXCIiLCJ3ZWJwYWNrOi8vYWN0aW9uLXJvdm8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0TGlrZS5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFZhbHVlLmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0UmF3VGFnLmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL0Bmb3JnZS9hcGkvb3V0L2FwaS9lbmRwb2ludC5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9AZm9yZ2Uvc3RvcmFnZS9vdXQvZW50aXR5LXN0b3JhZ2UvcXVlcnktYXBpLmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbmF0aXZlQ3JlYXRlLmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL0Bmb3JnZS9pMThuL291dC90cmFuc2xhdG9yLmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbGlzdENhY2hlU2V0LmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL0Bmb3JnZS9hcGkvb3V0L3NhZmVVcmwuanMiLCJ3ZWJwYWNrOi8vYWN0aW9uLXJvdm8vLi9ub2RlX21vZHVsZXMvQGZvcmdlL2FwaS9vdXQvcHJpdmFjeS9pbmRleC5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX0hhc2guanMiLCJ3ZWJwYWNrOi8vYWN0aW9uLXJvdm8vLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2Lm1qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Nhc3RQYXRoLmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fc3RyaW5nVG9QYXRoLmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL0Bmb3JnZS9pMThuL291dC90cmFuc2xhdGlvblZhbHVlR2V0dGVyLmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL0Bmb3JnZS9lZ3Jlc3Mvb3V0L2VncmVzcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1N5bWJvbC5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNGdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2hhc2hDbGVhci5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9AZm9yZ2UvYXBpL291dC9hcGkvYXJpLmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWVtb2l6ZUNhcHBlZC5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9AZm9yZ2Uvc3RvcmFnZS9vdXQvZW50aXR5LXN0b3JhZ2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYWN0aW9uLXJvdm8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0TWFwRGF0YS5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2hhc2hIYXMuanMiLCJ3ZWJwYWNrOi8vYWN0aW9uLXJvdm8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19tYXBDYWNoZVNldC5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX21hcENhY2hlQ2xlYXIuanMiLCJ3ZWJwYWNrOi8vYWN0aW9uLXJvdm8vLi9ub2RlX21vZHVsZXMvQGZvcmdlL3N0b3JhZ2Uvb3V0L2dxbC1xdWVyaWVzLmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC90b1N0cmluZy5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9AZm9yZ2UvYXV0aC9vdXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYWN0aW9uLXJvdm8vLi9ub2RlX21vZHVsZXMvQGZvcmdlL2F1dGgvb3V0L2NvbmZsdWVuY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYWN0aW9uLXJvdm8vLi9ub2RlX21vZHVsZXMvQGZvcmdlL2F1dGgvb3V0L2FwaS5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX01hcENhY2hlLmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbGlzdENhY2hlQ2xlYXIuanMiLCJ3ZWJwYWNrOi8vYWN0aW9uLXJvdm8vLi9ub2RlX21vZHVsZXMvQGZvcmdlL2F1dGgvb3V0L2ppcmEvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYWN0aW9uLXJvdm8vLi9ub2RlX21vZHVsZXMvQGZvcmdlL2FwaS9vdXQvYXBpL3Blcm1pc3Npb25zLmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdC5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2hhc2hEZWxldGUuanMiLCJ3ZWJwYWNrOi8vYWN0aW9uLXJvdm8vLi9ub2RlX21vZHVsZXMvQGZvcmdlL3N0b3JhZ2Uvb3V0L2dsb2JhbC1zdG9yYWdlLmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNLZXlhYmxlLmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL0Bmb3JnZS9pMThuL291dC9pbmRleC5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNTeW1ib2wuanMiLCJ3ZWJwYWNrOi8vYWN0aW9uLXJvdm8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19tYXBDYWNoZUhhcy5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9AZm9yZ2Uvc3RvcmFnZS9vdXQvZXJyb3JzLmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbGlzdENhY2hlR2V0LmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZnJlZUdsb2JhbC5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2FycmF5TWFwLmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUlzTmF0aXZlLmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL0Bmb3JnZS9pMThuL291dC90eXBlcy5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvZXEuanMiLCJ3ZWJwYWNrOi8vYWN0aW9uLXJvdm8vLi9ub2RlX21vZHVsZXMvQGZvcmdlL2FwaS9vdXQvYXBpL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vYWN0aW9uLXJvdm8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19jb3JlSnNEYXRhLmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9faGFzaFNldC5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9AZm9yZ2UvYXBpL291dC93ZWJUcmlnZ2VyLmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL0Bmb3JnZS9zdG9yYWdlL291dC9pbmRleC5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Fzc29jSW5kZXhPZi5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9AZm9yZ2UvZWdyZXNzL291dC9pbmRleC5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldE5hdGl2ZS5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9AZm9yZ2Uvc3RvcmFnZS9vdXQvY29uZGl0aW9ucy5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNBcnJheS5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9AZm9yZ2UvYXBpL291dC9hcGkvaTE4bi5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2hhc2hHZXQuanMiLCJ3ZWJwYWNrOi8vYWN0aW9uLXJvdm8vLi9ub2RlX21vZHVsZXMvQGZvcmdlL2kxOG4vb3V0L3RyYW5zbGF0aW9uc0dldHRlci5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9AZm9yZ2UvZWdyZXNzL291dC9lZ3Jlc3MvdXJsLXBhcnNlci5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9AZm9yZ2UvaTE4bi9vdXQvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vYWN0aW9uLXJvdm8vLi9ub2RlX21vZHVsZXMvQGZvcmdlL2VncmVzcy9vdXQvZWdyZXNzL3V0aWxzLmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL0Bmb3JnZS9hcGkvb3V0L2luZGV4LmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNNYXNrZWQuanMiLCJ3ZWJwYWNrOi8vYWN0aW9uLXJvdm8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0LmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fdG9Tb3VyY2UuanMiLCJ3ZWJwYWNrOi8vYWN0aW9uLXJvdm8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlVG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vYWN0aW9uLXJvdm8vLi9ub2RlX21vZHVsZXMvQGZvcmdlL3N0b3JhZ2Uvb3V0L2VudGl0eS1zdG9yYWdlL3N0b3JhZ2UtYnVpbGRlci5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX21hcENhY2hlRGVsZXRlLmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fdG9LZXkuanMiLCJ3ZWJwYWNrOi8vYWN0aW9uLXJvdm8vLi9ub2RlX21vZHVsZXMvQGZvcmdlL2kxOG4vb3V0L2Vuc3VyZUxvY2FsZS5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9AZm9yZ2UvZWdyZXNzL291dC9lZ3Jlc3MvZWdyZXNzLWZpbHRlcmluZy1zZXJ2aWNlLmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL0Bmb3JnZS9zdG9yYWdlL291dC9lYXAvY29uZGl0aW9ucy5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvZ2V0LmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL0Bmb3JnZS9hdXRoL291dC9qaXJhL3Blcm1pc3Npb25zLmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fTWFwLmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL0Bmb3JnZS9hcGkvb3V0L2FwaS9mZXRjaC5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9AZm9yZ2UvYXV0aC9vdXQvY29uZmx1ZW5jZS9wZXJtaXNzaW9ucy5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2lzS2V5LmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fbGlzdENhY2hlSGFzLmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL0Bmb3JnZS9hcGkvb3V0L2F1dGhvcml6YXRpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vYWN0aW9uLXJvdm8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19yb290LmpzIiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fb2JqZWN0VG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vYWN0aW9uLXJvdm8vLi9ub2RlX21vZHVsZXMvQGZvcmdlL2FwaS9vdXQvYXBpL2Vycm9ycy5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9AZm9yZ2Uvc3RvcmFnZS9vdXQvcXVlcnktaW50ZXJmYWNlcy5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZnNcIiIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by8uL25vZGVfbW9kdWxlcy9AZm9yZ2UvaTE4bi9vdXQvbW9kdWxlSTE4bkhlbHBlci5qcyIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYWN0aW9uLXJvdm8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9hY3Rpb24tcm92by93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2FjdGlvbi1yb3ZvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBsaXN0Q2FjaGVDbGVhciA9IHJlcXVpcmUoJy4vX2xpc3RDYWNoZUNsZWFyJyksXG4gICAgbGlzdENhY2hlRGVsZXRlID0gcmVxdWlyZSgnLi9fbGlzdENhY2hlRGVsZXRlJyksXG4gICAgbGlzdENhY2hlR2V0ID0gcmVxdWlyZSgnLi9fbGlzdENhY2hlR2V0JyksXG4gICAgbGlzdENhY2hlSGFzID0gcmVxdWlyZSgnLi9fbGlzdENhY2hlSGFzJyksXG4gICAgbGlzdENhY2hlU2V0ID0gcmVxdWlyZSgnLi9fbGlzdENhY2hlU2V0Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBsaXN0IGNhY2hlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTGlzdENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID09IG51bGwgPyAwIDogZW50cmllcy5sZW5ndGg7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYExpc3RDYWNoZWAuXG5MaXN0Q2FjaGUucHJvdG90eXBlLmNsZWFyID0gbGlzdENhY2hlQ2xlYXI7XG5MaXN0Q2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IGxpc3RDYWNoZURlbGV0ZTtcbkxpc3RDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbGlzdENhY2hlR2V0O1xuTGlzdENhY2hlLnByb3RvdHlwZS5oYXMgPSBsaXN0Q2FjaGVIYXM7XG5MaXN0Q2FjaGUucHJvdG90eXBlLnNldCA9IGxpc3RDYWNoZVNldDtcblxubW9kdWxlLmV4cG9ydHMgPSBMaXN0Q2FjaGU7XG4iLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzcGxpY2UgPSBhcnJheVByb3RvLnNwbGljZTtcblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgIGRhdGEucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgc3BsaWNlLmNhbGwoZGF0YSwgaW5kZXgsIDEpO1xuICB9XG4gIC0tdGhpcy5zaXplO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVEZWxldGU7XG4iLCJ2YXIgTWFwQ2FjaGUgPSByZXF1aXJlKCcuL19NYXBDYWNoZScpO1xuXG4vKiogRXJyb3IgbWVzc2FnZSBjb25zdGFudHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IG1lbW9pemVzIHRoZSByZXN1bHQgb2YgYGZ1bmNgLiBJZiBgcmVzb2x2ZXJgIGlzXG4gKiBwcm92aWRlZCwgaXQgZGV0ZXJtaW5lcyB0aGUgY2FjaGUga2V5IGZvciBzdG9yaW5nIHRoZSByZXN1bHQgYmFzZWQgb24gdGhlXG4gKiBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIG1lbW9pemVkIGZ1bmN0aW9uLiBCeSBkZWZhdWx0LCB0aGUgZmlyc3QgYXJndW1lbnRcbiAqIHByb3ZpZGVkIHRvIHRoZSBtZW1vaXplZCBmdW5jdGlvbiBpcyB1c2VkIGFzIHRoZSBtYXAgY2FjaGUga2V5LiBUaGUgYGZ1bmNgXG4gKiBpcyBpbnZva2VkIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZSBtZW1vaXplZCBmdW5jdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogVGhlIGNhY2hlIGlzIGV4cG9zZWQgYXMgdGhlIGBjYWNoZWAgcHJvcGVydHkgb24gdGhlIG1lbW9pemVkXG4gKiBmdW5jdGlvbi4gSXRzIGNyZWF0aW9uIG1heSBiZSBjdXN0b21pemVkIGJ5IHJlcGxhY2luZyB0aGUgYF8ubWVtb2l6ZS5DYWNoZWBcbiAqIGNvbnN0cnVjdG9yIHdpdGggb25lIHdob3NlIGluc3RhbmNlcyBpbXBsZW1lbnQgdGhlXG4gKiBbYE1hcGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXByb3BlcnRpZXMtb2YtdGhlLW1hcC1wcm90b3R5cGUtb2JqZWN0KVxuICogbWV0aG9kIGludGVyZmFjZSBvZiBgY2xlYXJgLCBgZGVsZXRlYCwgYGdldGAsIGBoYXNgLCBhbmQgYHNldGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBoYXZlIGl0cyBvdXRwdXQgbWVtb2l6ZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcmVzb2x2ZXJdIFRoZSBmdW5jdGlvbiB0byByZXNvbHZlIHRoZSBjYWNoZSBrZXkuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBtZW1vaXplZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxLCAnYic6IDIgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2MnOiAzLCAnZCc6IDQgfTtcbiAqXG4gKiB2YXIgdmFsdWVzID0gXy5tZW1vaXplKF8udmFsdWVzKTtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWzEsIDJdXG4gKlxuICogdmFsdWVzKG90aGVyKTtcbiAqIC8vID0+IFszLCA0XVxuICpcbiAqIG9iamVjdC5hID0gMjtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWzEsIDJdXG4gKlxuICogLy8gTW9kaWZ5IHRoZSByZXN1bHQgY2FjaGUuXG4gKiB2YWx1ZXMuY2FjaGUuc2V0KG9iamVjdCwgWydhJywgJ2InXSk7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsnYScsICdiJ11cbiAqXG4gKiAvLyBSZXBsYWNlIGBfLm1lbW9pemUuQ2FjaGVgLlxuICogXy5tZW1vaXplLkNhY2hlID0gV2Vha01hcDtcbiAqL1xuZnVuY3Rpb24gbWVtb2l6ZShmdW5jLCByZXNvbHZlcikge1xuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJyB8fCAocmVzb2x2ZXIgIT0gbnVsbCAmJiB0eXBlb2YgcmVzb2x2ZXIgIT0gJ2Z1bmN0aW9uJykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgdmFyIG1lbW9pemVkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGtleSA9IHJlc29sdmVyID8gcmVzb2x2ZXIuYXBwbHkodGhpcywgYXJncykgOiBhcmdzWzBdLFxuICAgICAgICBjYWNoZSA9IG1lbW9pemVkLmNhY2hlO1xuXG4gICAgaWYgKGNhY2hlLmhhcyhrZXkpKSB7XG4gICAgICByZXR1cm4gY2FjaGUuZ2V0KGtleSk7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIG1lbW9pemVkLmNhY2hlID0gY2FjaGUuc2V0KGtleSwgcmVzdWx0KSB8fCBjYWNoZTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBtZW1vaXplZC5jYWNoZSA9IG5ldyAobWVtb2l6ZS5DYWNoZSB8fCBNYXBDYWNoZSk7XG4gIHJldHVybiBtZW1vaXplZDtcbn1cblxuLy8gRXhwb3NlIGBNYXBDYWNoZWAuXG5tZW1vaXplLkNhY2hlID0gTWFwQ2FjaGU7XG5cbm1vZHVsZS5leHBvcnRzID0gbWVtb2l6ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5EZWZhdWx0UXVlcnlCdWlsZGVyID0gdm9pZCAwO1xuY2xhc3MgRGVmYXVsdFF1ZXJ5QnVpbGRlciB7XG4gICAgZ2xvYmFsU3RvcmFnZTtcbiAgICBxdWVyeU9wdGlvbnM7XG4gICAgY29uc3RydWN0b3IoZ2xvYmFsU3RvcmFnZSwgcXVlcnlPcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5nbG9iYWxTdG9yYWdlID0gZ2xvYmFsU3RvcmFnZTtcbiAgICAgICAgdGhpcy5xdWVyeU9wdGlvbnMgPSBxdWVyeU9wdGlvbnM7XG4gICAgfVxuICAgIHdoZXJlKGZpZWxkLCB3aGVyZSkge1xuICAgICAgICByZXR1cm4gbmV3IERlZmF1bHRRdWVyeUJ1aWxkZXIodGhpcy5nbG9iYWxTdG9yYWdlLCB7XG4gICAgICAgICAgICAuLi50aGlzLnF1ZXJ5T3B0aW9ucyxcbiAgICAgICAgICAgIHdoZXJlOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICAgICAgICAgLi4ud2hlcmVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjdXJzb3IoY3Vyc29yKSB7XG4gICAgICAgIHJldHVybiBuZXcgRGVmYXVsdFF1ZXJ5QnVpbGRlcih0aGlzLmdsb2JhbFN0b3JhZ2UsIHtcbiAgICAgICAgICAgIC4uLnRoaXMucXVlcnlPcHRpb25zLFxuICAgICAgICAgICAgY3Vyc29yXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBsaW1pdChsaW1pdCkge1xuICAgICAgICByZXR1cm4gbmV3IERlZmF1bHRRdWVyeUJ1aWxkZXIodGhpcy5nbG9iYWxTdG9yYWdlLCB7XG4gICAgICAgICAgICAuLi50aGlzLnF1ZXJ5T3B0aW9ucyxcbiAgICAgICAgICAgIGxpbWl0XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyBnZXRPbmUoKSB7XG4gICAgICAgIGNvbnN0IHsgcmVzdWx0cyB9ID0gYXdhaXQgdGhpcy5saW1pdCgxKS5nZXRNYW55KCk7XG4gICAgICAgIGlmIChyZXN1bHRzICYmIHJlc3VsdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHNbMF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgZ2V0TWFueSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsU3RvcmFnZS5saXN0KHRoaXMucXVlcnlPcHRpb25zKTtcbiAgICB9XG59XG5leHBvcnRzLkRlZmF1bHRRdWVyeUJ1aWxkZXIgPSBEZWZhdWx0UXVlcnlCdWlsZGVyO1xuIiwidmFyIGdldE1hcERhdGEgPSByZXF1aXJlKCcuL19nZXRNYXBEYXRhJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgbWFwIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUdldChrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5nZXQoa2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBDYWNoZUdldDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFzeW5jX2hvb2tzXCIpOyIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0TGlrZTtcbiIsIi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGdldFZhbHVlKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFZhbHVlO1xuIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UmF3VGFnO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmludm9rZVNlcnZpY2UgPSBleHBvcnRzLmludm9rZVJlbW90ZSA9IHZvaWQgMDtcbmNvbnN0IGVycm9yc18xID0gcmVxdWlyZShcIi4vZXJyb3JzXCIpO1xuY29uc3QgZmV0Y2hfMSA9IHJlcXVpcmUoXCIuL2ZldGNoXCIpO1xudmFyIEludm9rZVR5cGU7XG4oZnVuY3Rpb24gKEludm9rZVR5cGUpIHtcbiAgICBJbnZva2VUeXBlW1wiUkVNT1RFXCJdID0gXCJSZW1vdGVcIjtcbiAgICBJbnZva2VUeXBlW1wiQ09OVEFJTkVSXCJdID0gXCJTZXJ2aWNlXCI7XG59KShJbnZva2VUeXBlIHx8IChJbnZva2VUeXBlID0ge30pKTtcbmFzeW5jIGZ1bmN0aW9uIGludm9rZVJlbW90ZShyZW1vdGVLZXksIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gaW52b2tlRW5kcG9pbnQocmVtb3RlS2V5LCBvcHRpb25zLCBJbnZva2VUeXBlLlJFTU9URSk7XG59XG5leHBvcnRzLmludm9rZVJlbW90ZSA9IGludm9rZVJlbW90ZTtcbmFzeW5jIGZ1bmN0aW9uIGludm9rZVNlcnZpY2Uoc2VydmljZUtleSwgb3B0aW9ucykge1xuICAgIHJldHVybiBpbnZva2VFbmRwb2ludChzZXJ2aWNlS2V5LCBvcHRpb25zLCBJbnZva2VUeXBlLkNPTlRBSU5FUik7XG59XG5leHBvcnRzLmludm9rZVNlcnZpY2UgPSBpbnZva2VTZXJ2aWNlO1xuYXN5bmMgZnVuY3Rpb24gaW52b2tlRW5kcG9pbnQoa2V5LCBvcHRpb25zLCB0eXBlKSB7XG4gICAgY29uc3QgeyBwYXRoLCAuLi5mZXRjaE9wdGlvbnMgfSA9IG9wdGlvbnM7XG4gICAgaWYgKCFrZXkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNaXNzaW5nICR7dHlwZS50b0xvd2VyQ2FzZSgpfSBrZXkgcHJvdmlkZWQgdG8gaW52b2tlJHt0eXBlfWApO1xuICAgIH1cbiAgICBpZiAoIXBhdGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNaXNzaW5nIG9yIGVtcHR5IHBhdGggcHJvdmlkZWQgdG8gaW52b2tlJHt0eXBlfWApO1xuICAgIH1cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdsb2JhbC5fX2ZvcmdlX2ZldGNoX18oY29uc3RydWN0SW52b2tlUGF5bG9hZChrZXksIHR5cGUpLCBwYXRoLCBmZXRjaE9wdGlvbnMpO1xuICAgIGhhbmRsZVJlc3BvbnNlRXJyb3JzKHJlc3BvbnNlLCBrZXkpO1xuICAgIHJldHVybiByZXNwb25zZTtcbn1cbmZ1bmN0aW9uIGNvbnN0cnVjdEludm9rZVBheWxvYWQoa2V5LCB0eXBlKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgSW52b2tlVHlwZS5SRU1PVEU6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdmcmMnLFxuICAgICAgICAgICAgICAgIHJlbW90ZToga2V5XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIEludm9rZVR5cGUuQ09OVEFJTkVSOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnZmNjJyxcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiBrZXlcbiAgICAgICAgICAgIH07XG4gICAgfVxufVxuZnVuY3Rpb24gaGFuZGxlUmVzcG9uc2VFcnJvcnMocmVzcG9uc2UsIGtleSkge1xuICAgIGNvbnN0IGZvcmdlUHJveHlFcnJvciA9ICgwLCBmZXRjaF8xLmdldEZvcmdlUHJveHlFcnJvcikocmVzcG9uc2UpO1xuICAgIGlmIChmb3JnZVByb3h5RXJyb3IgPT09ICdJTlZBTElEX1NFUlZJQ0VfS0VZJykge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuSW52YWxpZENvbnRhaW5lclNlcnZpY2VFcnJvcihgSW52YWxpZCBzZXJ2aWNlIGtleSBwcm92aWRlZDogXCIke2tleX1cImAsIGtleSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGZvcmdlUHJveHlFcnJvciA9PT0gJ0lOVkFMSURfUkVNT1RFJykge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuSW52YWxpZFJlbW90ZUVycm9yKGBJbnZhbGlkIHJlbW90ZSBrZXkgcHJvdmlkZWQ6IFwiJHtrZXl9XCJgLCBrZXkpO1xuICAgIH1cbiAgICAoMCwgZmV0Y2hfMS5oYW5kbGVQcm94eVJlc3BvbnNlRXJyb3JzKShyZXNwb25zZSk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ3VzdG9tRW50aXR5QnVpbGRlciA9IGV4cG9ydHMuQ3VzdG9tRW50aXR5SW5kZXhCdWlsZGVyID0gdm9pZCAwO1xuY2xhc3MgQ3VzdG9tRW50aXR5UXVlcnlCdWlsZGVyIHtcbiAgICBnbG9iYWxTdG9yYWdlO1xuICAgIHF1ZXJ5T3B0aW9ucztcbiAgICBjb25zdHJ1Y3RvcihnbG9iYWxTdG9yYWdlLCBxdWVyeU9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLmdsb2JhbFN0b3JhZ2UgPSBnbG9iYWxTdG9yYWdlO1xuICAgICAgICB0aGlzLnF1ZXJ5T3B0aW9ucyA9IHF1ZXJ5T3B0aW9ucztcbiAgICAgICAgdGhpcy5xdWVyeU9wdGlvbnMgPSB7XG4gICAgICAgICAgICAuLi5xdWVyeU9wdGlvbnNcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY2xvbmUob3ZlcnJpZGVzKSB7XG4gICAgICAgIHJldHVybiBuZXcgKE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5jb25zdHJ1Y3RvcikodGhpcy5nbG9iYWxTdG9yYWdlLCB7XG4gICAgICAgICAgICAuLi50aGlzLnF1ZXJ5T3B0aW9ucyxcbiAgICAgICAgICAgIC4uLm92ZXJyaWRlc1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgd2hlcmUoY29uZGl0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKHtcbiAgICAgICAgICAgIHJhbmdlOiB7XG4gICAgICAgICAgICAgICAgLi4uY29uZGl0aW9uXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzb3J0KHNvcnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoe1xuICAgICAgICAgICAgc29ydFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY3Vyc29yKGN1cnNvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSh7XG4gICAgICAgICAgICBjdXJzb3JcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGxpbWl0KGxpbWl0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKHtcbiAgICAgICAgICAgIGxpbWl0XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyBnZXRPbmUoKSB7XG4gICAgICAgIGNvbnN0IHsgcmVzdWx0cyB9ID0gYXdhaXQgdGhpcy5saW1pdCgxKS5nZXRNYW55KCk7XG4gICAgICAgIHJldHVybiByZXN1bHRzPy5bMF07XG4gICAgfVxuICAgIGFzeW5jIGdldE1hbnkoKSB7XG4gICAgICAgIGlmICghdGhpcy5xdWVyeU9wdGlvbnMuZW50aXR5TmFtZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdlbnRpdHlOYW1lIGlzIG1hbmRhdG9yeScpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5xdWVyeU9wdGlvbnMuaW5kZXhOYW1lKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2luZGV4TmFtZSBpcyBtYW5kYXRvcnknKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBxdWVyeU9wdGlvbnMgPSB7IC4uLnRoaXMucXVlcnlPcHRpb25zIH07XG4gICAgICAgIGlmICghcXVlcnlPcHRpb25zLmZpbHRlck9wZXJhdG9yICYmIHF1ZXJ5T3B0aW9ucy5maWx0ZXJzKSB7XG4gICAgICAgICAgICBxdWVyeU9wdGlvbnMuZmlsdGVyT3BlcmF0b3IgPSAnYW5kJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5nbG9iYWxTdG9yYWdlLmxpc3RDdXN0b21FbnRpdGllcyh0aGlzLnF1ZXJ5T3B0aW9ucyk7XG4gICAgfVxufVxuY2xhc3MgQ3VzdG9tRW50aXR5QW5kRmlsdGVyUXVlcnlCdWlsZGVyIGV4dGVuZHMgQ3VzdG9tRW50aXR5UXVlcnlCdWlsZGVyIHtcbiAgICBnbG9iYWxTdG9yYWdlO1xuICAgIHF1ZXJ5T3B0aW9ucztcbiAgICBjb25zdHJ1Y3RvcihnbG9iYWxTdG9yYWdlLCBxdWVyeU9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcihnbG9iYWxTdG9yYWdlLCBxdWVyeU9wdGlvbnMpO1xuICAgICAgICB0aGlzLmdsb2JhbFN0b3JhZ2UgPSBnbG9iYWxTdG9yYWdlO1xuICAgICAgICB0aGlzLnF1ZXJ5T3B0aW9ucyA9IHF1ZXJ5T3B0aW9ucztcbiAgICAgICAgdGhpcy5xdWVyeU9wdGlvbnMgPSB7XG4gICAgICAgICAgICAuLi5xdWVyeU9wdGlvbnNcbiAgICAgICAgfTtcbiAgICB9XG4gICAgYW5kRmlsdGVyKGZpZWxkLCBjb25kaXRpb24pIHtcbiAgICAgICAgY29uc3QgbmV3UXVlcnlPcHRpb25zID0ge1xuICAgICAgICAgICAgLi4udGhpcy5xdWVyeU9wdGlvbnNcbiAgICAgICAgfTtcbiAgICAgICAgbmV3UXVlcnlPcHRpb25zLmZpbHRlcnMgPSBbLi4uKHRoaXMucXVlcnlPcHRpb25zLmZpbHRlcnMgPz8gW10pLCB7IHByb3BlcnR5OiBmaWVsZCwgLi4uY29uZGl0aW9uIH1dO1xuICAgICAgICBuZXdRdWVyeU9wdGlvbnMuZmlsdGVyT3BlcmF0b3IgPSAnYW5kJztcbiAgICAgICAgcmV0dXJuIG5ldyBDdXN0b21FbnRpdHlBbmRGaWx0ZXJRdWVyeUJ1aWxkZXIodGhpcy5nbG9iYWxTdG9yYWdlLCBuZXdRdWVyeU9wdGlvbnMpO1xuICAgIH1cbn1cbmNsYXNzIEN1c3RvbUVudGl0eU9yRmlsdGVyUXVlcnlCdWlsZGVyIGV4dGVuZHMgQ3VzdG9tRW50aXR5UXVlcnlCdWlsZGVyIHtcbiAgICBnbG9iYWxTdG9yYWdlO1xuICAgIHF1ZXJ5T3B0aW9ucztcbiAgICBjb25zdHJ1Y3RvcihnbG9iYWxTdG9yYWdlLCBxdWVyeU9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcihnbG9iYWxTdG9yYWdlLCBxdWVyeU9wdGlvbnMpO1xuICAgICAgICB0aGlzLmdsb2JhbFN0b3JhZ2UgPSBnbG9iYWxTdG9yYWdlO1xuICAgICAgICB0aGlzLnF1ZXJ5T3B0aW9ucyA9IHF1ZXJ5T3B0aW9ucztcbiAgICAgICAgdGhpcy5xdWVyeU9wdGlvbnMgPSB7XG4gICAgICAgICAgICAuLi5xdWVyeU9wdGlvbnNcbiAgICAgICAgfTtcbiAgICB9XG4gICAgb3JGaWx0ZXIoZmllbGQsIGNvbmRpdGlvbikge1xuICAgICAgICBjb25zdCBuZXdRdWVyeU9wdGlvbnMgPSB7XG4gICAgICAgICAgICAuLi50aGlzLnF1ZXJ5T3B0aW9uc1xuICAgICAgICB9O1xuICAgICAgICBuZXdRdWVyeU9wdGlvbnMuZmlsdGVycyA9IFsuLi4odGhpcy5xdWVyeU9wdGlvbnMuZmlsdGVycyA/PyBbXSksIHsgcHJvcGVydHk6IGZpZWxkLCAuLi5jb25kaXRpb24gfV07XG4gICAgICAgIG5ld1F1ZXJ5T3B0aW9ucy5maWx0ZXJPcGVyYXRvciA9ICdvcic7XG4gICAgICAgIHJldHVybiBuZXcgQ3VzdG9tRW50aXR5T3JGaWx0ZXJRdWVyeUJ1aWxkZXIodGhpcy5nbG9iYWxTdG9yYWdlLCBuZXdRdWVyeU9wdGlvbnMpO1xuICAgIH1cbn1cbmNsYXNzIEN1c3RvbUVudGl0eUZpbHRlclF1ZXJ5QnVpbGRlciBleHRlbmRzIEN1c3RvbUVudGl0eVF1ZXJ5QnVpbGRlciB7XG4gICAgZ2xvYmFsU3RvcmFnZTtcbiAgICBxdWVyeU9wdGlvbnM7XG4gICAgY29uc3RydWN0b3IoZ2xvYmFsU3RvcmFnZSwgcXVlcnlPcHRpb25zID0ge30pIHtcbiAgICAgICAgc3VwZXIoZ2xvYmFsU3RvcmFnZSwgcXVlcnlPcHRpb25zKTtcbiAgICAgICAgdGhpcy5nbG9iYWxTdG9yYWdlID0gZ2xvYmFsU3RvcmFnZTtcbiAgICAgICAgdGhpcy5xdWVyeU9wdGlvbnMgPSBxdWVyeU9wdGlvbnM7XG4gICAgICAgIHRoaXMucXVlcnlPcHRpb25zID0ge1xuICAgICAgICAgICAgLi4ucXVlcnlPcHRpb25zXG4gICAgICAgIH07XG4gICAgfVxuICAgIGFuZEZpbHRlcihmaWVsZCwgY29uZGl0aW9uKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ3VzdG9tRW50aXR5QW5kRmlsdGVyUXVlcnlCdWlsZGVyKHRoaXMuZ2xvYmFsU3RvcmFnZSwgdGhpcy5xdWVyeU9wdGlvbnMpLmFuZEZpbHRlcihmaWVsZCwgY29uZGl0aW9uKTtcbiAgICB9XG4gICAgb3JGaWx0ZXIoZmllbGQsIGNvbmRpdGlvbikge1xuICAgICAgICByZXR1cm4gbmV3IEN1c3RvbUVudGl0eU9yRmlsdGVyUXVlcnlCdWlsZGVyKHRoaXMuZ2xvYmFsU3RvcmFnZSwgdGhpcy5xdWVyeU9wdGlvbnMpLm9yRmlsdGVyKGZpZWxkLCBjb25kaXRpb24pO1xuICAgIH1cbn1cbmNsYXNzIEN1c3RvbUVudGl0eUluZGV4QnVpbGRlciB7XG4gICAgZ2xvYmFsU3RvcmFnZTtcbiAgICBxdWVyeU9wdGlvbnM7XG4gICAgY29uc3RydWN0b3IoZ2xvYmFsU3RvcmFnZSwgcXVlcnlPcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5nbG9iYWxTdG9yYWdlID0gZ2xvYmFsU3RvcmFnZTtcbiAgICAgICAgdGhpcy5xdWVyeU9wdGlvbnMgPSBxdWVyeU9wdGlvbnM7XG4gICAgICAgIHRoaXMucXVlcnlPcHRpb25zID0ge1xuICAgICAgICAgICAgLi4ucXVlcnlPcHRpb25zXG4gICAgICAgIH07XG4gICAgfVxuICAgIGluZGV4KG5hbWUsIGluZGV4T3B0aW9ucykge1xuICAgICAgICBjb25zdCBpbmRleFByb3BlcnRpZXMgPSBpbmRleE9wdGlvbnMgPyB7IGluZGV4TmFtZTogbmFtZSwgLi4uaW5kZXhPcHRpb25zIH0gOiB7IGluZGV4TmFtZTogbmFtZSB9O1xuICAgICAgICByZXR1cm4gbmV3IEN1c3RvbUVudGl0eUZpbHRlclF1ZXJ5QnVpbGRlcih0aGlzLmdsb2JhbFN0b3JhZ2UsIHtcbiAgICAgICAgICAgIC4uLnRoaXMucXVlcnlPcHRpb25zLFxuICAgICAgICAgICAgLi4uaW5kZXhQcm9wZXJ0aWVzXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuQ3VzdG9tRW50aXR5SW5kZXhCdWlsZGVyID0gQ3VzdG9tRW50aXR5SW5kZXhCdWlsZGVyO1xuY2xhc3MgQ3VzdG9tRW50aXR5QnVpbGRlciB7XG4gICAgZ2xvYmFsU3RvcmFnZTtcbiAgICBxdWVyeU9wdGlvbnM7XG4gICAgY29uc3RydWN0b3IoZ2xvYmFsU3RvcmFnZSwgcXVlcnlPcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5nbG9iYWxTdG9yYWdlID0gZ2xvYmFsU3RvcmFnZTtcbiAgICAgICAgdGhpcy5xdWVyeU9wdGlvbnMgPSBxdWVyeU9wdGlvbnM7XG4gICAgICAgIHRoaXMucXVlcnlPcHRpb25zID0ge1xuICAgICAgICAgICAgLi4ucXVlcnlPcHRpb25zXG4gICAgICAgIH07XG4gICAgfVxuICAgIGVudGl0eShuYW1lKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ3VzdG9tRW50aXR5SW5kZXhCdWlsZGVyKHRoaXMuZ2xvYmFsU3RvcmFnZSwge1xuICAgICAgICAgICAgLi4udGhpcy5xdWVyeU9wdGlvbnMsXG4gICAgICAgICAgICBlbnRpdHlOYW1lOiBuYW1lXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuQ3VzdG9tRW50aXR5QnVpbGRlciA9IEN1c3RvbUVudGl0eUJ1aWxkZXI7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBuYXRpdmVDcmVhdGUgPSBnZXROYXRpdmUoT2JqZWN0LCAnY3JlYXRlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmF0aXZlQ3JlYXRlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlRyYW5zbGF0b3IgPSB2b2lkIDA7XG5jb25zdCB0cmFuc2xhdGlvblZhbHVlR2V0dGVyXzEgPSByZXF1aXJlKFwiLi90cmFuc2xhdGlvblZhbHVlR2V0dGVyXCIpO1xuY2xhc3MgVHJhbnNsYXRvciB7XG4gICAgbG9jYWxlO1xuICAgIHRyYW5zbGF0aW9uc0dldHRlcjtcbiAgICBsb2NhbGVMb29rdXBPcmRlcmVkVHJhbnNsYXRpb25zID0gbnVsbDtcbiAgICBjYWNoZSA9IG5ldyBNYXAoKTtcbiAgICBjb25zdHJ1Y3Rvcihsb2NhbGUsIHRyYW5zbGF0aW9uc0dldHRlcikge1xuICAgICAgICB0aGlzLmxvY2FsZSA9IGxvY2FsZTtcbiAgICAgICAgdGhpcy50cmFuc2xhdGlvbnNHZXR0ZXIgPSB0cmFuc2xhdGlvbnNHZXR0ZXI7XG4gICAgfVxuICAgIGFzeW5jIGluaXQoKSB7XG4gICAgICAgIHRoaXMubG9jYWxlTG9va3VwT3JkZXJlZFRyYW5zbGF0aW9ucyA9IGF3YWl0IHRoaXMudHJhbnNsYXRpb25zR2V0dGVyLmdldFRyYW5zbGF0aW9uc0J5TG9jYWxlTG9va3VwT3JkZXIodGhpcy5sb2NhbGUpO1xuICAgIH1cbiAgICB0cmFuc2xhdGUoaTE4bktleSkge1xuICAgICAgICBpZiAoIXRoaXMubG9jYWxlTG9va3VwT3JkZXJlZFRyYW5zbGF0aW9ucykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmFuc2xhdGlvbkxvb2t1cCBub3QgaW5pdGlhbGl6ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jYWNoZS5nZXQoaTE4bktleSk7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCB7IHRyYW5zbGF0aW9ucyB9IG9mIHRoaXMubG9jYWxlTG9va3VwT3JkZXJlZFRyYW5zbGF0aW9ucykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRyYW5zbGF0aW9uVmFsdWUgPSAoMCwgdHJhbnNsYXRpb25WYWx1ZUdldHRlcl8xLmdldFRyYW5zbGF0aW9uVmFsdWVGcm9tQ29udGVudCkodHJhbnNsYXRpb25zLCBpMThuS2V5KTtcbiAgICAgICAgICAgICAgICBpZiAodHJhbnNsYXRpb25WYWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0cmFuc2xhdGlvblZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgPz8gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuY2FjaGUuc2V0KGkxOG5LZXksIHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5leHBvcnRzLlRyYW5zbGF0b3IgPSBUcmFuc2xhdG9yO1xuIiwidmFyIGFzc29jSW5kZXhPZiA9IHJlcXVpcmUoJy4vX2Fzc29jSW5kZXhPZicpO1xuXG4vKipcbiAqIFNldHMgdGhlIGxpc3QgY2FjaGUgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGxpc3QgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgICsrdGhpcy5zaXplO1xuICAgIGRhdGEucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9IGVsc2Uge1xuICAgIGRhdGFbaW5kZXhdWzFdID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlzdENhY2hlU2V0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmFzc3VtZVRydXN0ZWRSb3V0ZSA9IGV4cG9ydHMucmVxdWlyZVNhZmVVcmwgPSBleHBvcnRzLnJvdXRlID0gZXhwb3J0cy5yb3V0ZUZyb21BYnNvbHV0ZSA9IGV4cG9ydHMuaXNSb3V0ZSA9IHZvaWQgMDtcbmNsYXNzIFJlYWRvbmx5Um91dGUge1xuICAgIHZhbHVlXztcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZV8pIHtcbiAgICAgICAgdGhpcy52YWx1ZV8gPSB2YWx1ZV87XG4gICAgfVxuICAgIHNldCB2YWx1ZShfKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbW9kaWZpY2F0aW9uIG9mIGEgUm91dGUgaXMgbm90IGFsbG93ZWQnKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZV87XG4gICAgfVxufVxuZnVuY3Rpb24gaXNSb3V0ZSh4KSB7XG4gICAgcmV0dXJuIHggaW5zdGFuY2VvZiBSZWFkb25seVJvdXRlO1xufVxuZXhwb3J0cy5pc1JvdXRlID0gaXNSb3V0ZTtcbmZ1bmN0aW9uIHJvdXRlRnJvbUFic29sdXRlKGFic29sdXRlUGF0aCkge1xuICAgIGNvbnN0IGFic29sdXRlVVJMID0gbmV3IFVSTChhYnNvbHV0ZVBhdGgpO1xuICAgIHJldHVybiBhc3N1bWVUcnVzdGVkUm91dGUoYCR7YWJzb2x1dGVVUkwucGF0aG5hbWV9JHthYnNvbHV0ZVVSTC5zZWFyY2h9YCk7XG59XG5leHBvcnRzLnJvdXRlRnJvbUFic29sdXRlID0gcm91dGVGcm9tQWJzb2x1dGU7XG5jb25zdCBET1VCTEVfRE9UID0gWycuLicsICcuJTJlJywgJyUyZS4nLCAnJTJlJTJlJywgJy4lMkUnLCAnJTJFLicsICclMkUlMmUnXTtcbmNvbnN0IERJUkVDVE9SWV9QQVRIID0gWycvJywgJ1xcXFwnXTtcbmNvbnN0IEVORFNfUEFUSCA9IFsnPycsICcjJ107XG5mdW5jdGlvbiBjb250YWluc09uZU9mKG5lZWRsZXMsIGhheXN0YWNrKSB7XG4gICAgcmV0dXJuIG5lZWRsZXMuc29tZSgobmVlZGxlKSA9PiBoYXlzdGFjay5pbmNsdWRlcyhuZWVkbGUpKTtcbn1cbmZ1bmN0aW9uIGVzY2FwZVBhcmFtZXRlcihwYXJhbWV0ZXIsIG1vZGUpIHtcbiAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgICAgY2FzZSAncGF0aCc6XG4gICAgICAgICAgICBpZiAoaXNSb3V0ZShwYXJhbWV0ZXIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtZXRlci52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcmFtZXRlciA9IFN0cmluZyhwYXJhbWV0ZXIpO1xuICAgICAgICAgICAgaWYgKGNvbnRhaW5zT25lT2YoRE9VQkxFX0RPVCwgcGFyYW1ldGVyKSB8fFxuICAgICAgICAgICAgICAgIGNvbnRhaW5zT25lT2YoRU5EU19QQVRILCBwYXJhbWV0ZXIpIHx8XG4gICAgICAgICAgICAgICAgY29udGFpbnNPbmVPZihESVJFQ1RPUllfUEFUSCwgcGFyYW1ldGVyKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRGlzYWxsb3dpbmcgcGF0aCBtYW5pcHVsYXRpb24gYXR0ZW1wdC4gRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlOiBodHRwczovL2dvLmF0bGFzc2lhbi5jb20vcHJvZHVjdC1mZXRjaC1hcGktcm91dGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwYXJhbWV0ZXI7XG4gICAgICAgIGNhc2UgJ3F1ZXJ5JzpcbiAgICAgICAgICAgIGlmIChpc1JvdXRlKHBhcmFtZXRlcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtZXRlci52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYXJhbWV0ZXIgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW1ldGVyLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtZXRlcik7XG4gICAgICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gcm91dGUodGVtcGxhdGUsIC4uLnBhcmFtZXRlcnMpIHtcbiAgICBsZXQgbW9kZSA9ICdwYXRoJztcbiAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZW1wbGF0ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZUZyYWdtZW50ID0gdGVtcGxhdGVbaV07XG4gICAgICAgIGlmIChjb250YWluc09uZU9mKEVORFNfUEFUSCwgdGVtcGxhdGVGcmFnbWVudCkpIHtcbiAgICAgICAgICAgIG1vZGUgPSAncXVlcnknO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCArPSB0ZW1wbGF0ZUZyYWdtZW50O1xuICAgICAgICBpZiAoaSA+PSBwYXJhbWV0ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0ICs9IGVzY2FwZVBhcmFtZXRlcihwYXJhbWV0ZXJzW2ldLCBtb2RlKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBSZWFkb25seVJvdXRlKHJlc3VsdCk7XG59XG5leHBvcnRzLnJvdXRlID0gcm91dGU7XG5mdW5jdGlvbiByZXF1aXJlU2FmZVVybCh1cmwpIHtcbiAgICBpZiAodXJsIGluc3RhbmNlb2YgUmVhZG9ubHlSb3V0ZSkge1xuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoYFlvdSBtdXN0IGNyZWF0ZSB5b3VyIHJvdXRlIHVzaW5nIHRoZSAncm91dGUnIGV4cG9ydCBmcm9tICdAZm9yZ2UvYXBpJy5cblNlZSBodHRwczovL2dvLmF0bGFzc2lhbi5jb20vZm9yZ2UtZmV0Y2gtcm91dGUgZm9yIG1vcmUgaW5mb3JtYXRpb24uYCk7XG59XG5leHBvcnRzLnJlcXVpcmVTYWZlVXJsID0gcmVxdWlyZVNhZmVVcmw7XG5mdW5jdGlvbiBhc3N1bWVUcnVzdGVkUm91dGUocm91dGUpIHtcbiAgICByZXR1cm4gbmV3IFJlYWRvbmx5Um91dGUocm91dGUpO1xufVxuZXhwb3J0cy5hc3N1bWVUcnVzdGVkUm91dGUgPSBhc3N1bWVUcnVzdGVkUm91dGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3JlYXRlUmVwb3J0UGVyc29uYWxEYXRhID0gZXhwb3J0cy5MSU1JVCA9IGV4cG9ydHMuVVJMID0gdm9pZCAwO1xuZXhwb3J0cy5VUkwgPSAnL2FwcC9yZXBvcnQtYWNjb3VudHMnO1xuZXhwb3J0cy5MSU1JVCA9IDkwO1xuY29uc3QgY3JlYXRlUmVwb3J0UGVyc29uYWxEYXRhID0gKHJlcXVlc3RBdGxhc3NpYW4pID0+IHtcbiAgICByZXR1cm4gZnVuY3Rpb24gZmV0Y2hVcGRhdGVzKGFjY291bnRzKSB7XG4gICAgICAgIGlmIChhY2NvdW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoW10pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSByZXF1ZXN0QXRsYXNzaWFuKGV4cG9ydHMuVVJMLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBhY2NvdW50czogYWNjb3VudHMuc2xpY2UoMCwgZXhwb3J0cy5MSU1JVCkgfSlcbiAgICAgICAgfSkudGhlbihhc3luYyAocmVzcCkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3Auc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGF3YWl0IHJlc3AuanNvbigpKS5hY2NvdW50cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXNwLnN0YXR1cyA9PT0gMjA0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3ApO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtyZXF1ZXN0LCBmZXRjaFVwZGF0ZXMoYWNjb3VudHMuc2xpY2UoZXhwb3J0cy5MSU1JVCkpXSkudGhlbigoW2ZpcnN0LCBzZWNvbmRdKSA9PiBmaXJzdC5jb25jYXQoc2Vjb25kKSk7XG4gICAgfTtcbn07XG5leHBvcnRzLmNyZWF0ZVJlcG9ydFBlcnNvbmFsRGF0YSA9IGNyZWF0ZVJlcG9ydFBlcnNvbmFsRGF0YTtcbiIsInZhciBoYXNoQ2xlYXIgPSByZXF1aXJlKCcuL19oYXNoQ2xlYXInKSxcbiAgICBoYXNoRGVsZXRlID0gcmVxdWlyZSgnLi9faGFzaERlbGV0ZScpLFxuICAgIGhhc2hHZXQgPSByZXF1aXJlKCcuL19oYXNoR2V0JyksXG4gICAgaGFzaEhhcyA9IHJlcXVpcmUoJy4vX2hhc2hIYXMnKSxcbiAgICBoYXNoU2V0ID0gcmVxdWlyZSgnLi9faGFzaFNldCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBoYXNoIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gSGFzaChlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA9PSBudWxsID8gMCA6IGVudHJpZXMubGVuZ3RoO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBIYXNoYC5cbkhhc2gucHJvdG90eXBlLmNsZWFyID0gaGFzaENsZWFyO1xuSGFzaC5wcm90b3R5cGVbJ2RlbGV0ZSddID0gaGFzaERlbGV0ZTtcbkhhc2gucHJvdG90eXBlLmdldCA9IGhhc2hHZXQ7XG5IYXNoLnByb3RvdHlwZS5oYXMgPSBoYXNoSGFzO1xuSGFzaC5wcm90b3R5cGUuc2V0ID0gaGFzaFNldDtcblxubW9kdWxlLmV4cG9ydHMgPSBIYXNoO1xuIiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXG5cblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1Jcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UsIFN1cHByZXNzZWRFcnJvciwgU3ltYm9sLCBJdGVyYXRvciAqL1xuXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcbiAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcbiAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn1cblxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xuICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xuICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHQ7XG4gIH1cbiAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xuICB2YXIgdCA9IHt9O1xuICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgIHRbcF0gPSBzW3BdO1xuICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgIH1cbiAgcmV0dXJuIHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xuICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXNEZWNvcmF0ZShjdG9yLCBkZXNjcmlwdG9ySW4sIGRlY29yYXRvcnMsIGNvbnRleHRJbiwgaW5pdGlhbGl6ZXJzLCBleHRyYUluaXRpYWxpemVycykge1xuICBmdW5jdGlvbiBhY2NlcHQoZikgeyBpZiAoZiAhPT0gdm9pZCAwICYmIHR5cGVvZiBmICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbiBleHBlY3RlZFwiKTsgcmV0dXJuIGY7IH1cbiAgdmFyIGtpbmQgPSBjb250ZXh0SW4ua2luZCwga2V5ID0ga2luZCA9PT0gXCJnZXR0ZXJcIiA/IFwiZ2V0XCIgOiBraW5kID09PSBcInNldHRlclwiID8gXCJzZXRcIiA6IFwidmFsdWVcIjtcbiAgdmFyIHRhcmdldCA9ICFkZXNjcmlwdG9ySW4gJiYgY3RvciA/IGNvbnRleHRJbltcInN0YXRpY1wiXSA/IGN0b3IgOiBjdG9yLnByb3RvdHlwZSA6IG51bGw7XG4gIHZhciBkZXNjcmlwdG9yID0gZGVzY3JpcHRvckluIHx8ICh0YXJnZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgY29udGV4dEluLm5hbWUpIDoge30pO1xuICB2YXIgXywgZG9uZSA9IGZhbHNlO1xuICBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGNvbnRleHQgPSB7fTtcbiAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluKSBjb250ZXh0W3BdID0gcCA9PT0gXCJhY2Nlc3NcIiA/IHt9IDogY29udGV4dEluW3BdO1xuICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4uYWNjZXNzKSBjb250ZXh0LmFjY2Vzc1twXSA9IGNvbnRleHRJbi5hY2Nlc3NbcF07XG4gICAgICBjb250ZXh0LmFkZEluaXRpYWxpemVyID0gZnVuY3Rpb24gKGYpIHsgaWYgKGRvbmUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgYWRkIGluaXRpYWxpemVycyBhZnRlciBkZWNvcmF0aW9uIGhhcyBjb21wbGV0ZWRcIik7IGV4dHJhSW5pdGlhbGl6ZXJzLnB1c2goYWNjZXB0KGYgfHwgbnVsbCkpOyB9O1xuICAgICAgdmFyIHJlc3VsdCA9ICgwLCBkZWNvcmF0b3JzW2ldKShraW5kID09PSBcImFjY2Vzc29yXCIgPyB7IGdldDogZGVzY3JpcHRvci5nZXQsIHNldDogZGVzY3JpcHRvci5zZXQgfSA6IGRlc2NyaXB0b3Jba2V5XSwgY29udGV4dCk7XG4gICAgICBpZiAoa2luZCA9PT0gXCJhY2Nlc3NvclwiKSB7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdm9pZCAwKSBjb250aW51ZTtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmdldCkpIGRlc2NyaXB0b3IuZ2V0ID0gXztcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuc2V0KSkgZGVzY3JpcHRvci5zZXQgPSBfO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5pbml0KSkgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChfID0gYWNjZXB0KHJlc3VsdCkpIHtcbiAgICAgICAgICBpZiAoa2luZCA9PT0gXCJmaWVsZFwiKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcbiAgICAgICAgICBlbHNlIGRlc2NyaXB0b3Jba2V5XSA9IF87XG4gICAgICB9XG4gIH1cbiAgaWYgKHRhcmdldCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29udGV4dEluLm5hbWUsIGRlc2NyaXB0b3IpO1xuICBkb25lID0gdHJ1ZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3J1bkluaXRpYWxpemVycyh0aGlzQXJnLCBpbml0aWFsaXplcnMsIHZhbHVlKSB7XG4gIHZhciB1c2VWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGluaXRpYWxpemVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsdWUgPSB1c2VWYWx1ZSA/IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcsIHZhbHVlKSA6IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcpO1xuICB9XG4gIHJldHVybiB1c2VWYWx1ZSA/IHZhbHVlIDogdm9pZCAwO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fcHJvcEtleSh4KSB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIiA/IHggOiBcIlwiLmNvbmNhdCh4KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3NldEZ1bmN0aW9uTmFtZShmLCBuYW1lLCBwcmVmaXgpIHtcbiAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSBuYW1lID0gbmFtZS5kZXNjcmlwdGlvbiA/IFwiW1wiLmNvbmNhdChuYW1lLmRlc2NyaXB0aW9uLCBcIl1cIikgOiBcIlwiO1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGYsIFwibmFtZVwiLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHByZWZpeCA/IFwiXCIuY29uY2F0KHByZWZpeCwgXCIgXCIsIG5hbWUpIDogbmFtZSB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XG4gIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGcgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEl0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpO1xuICByZXR1cm4gZy5uZXh0ID0gdmVyYigwKSwgZ1tcInRocm93XCJdID0gdmVyYigxKSwgZ1tcInJldHVyblwiXSA9IHZlcmIoMiksIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgfVxufVxuXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgfVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgb1trMl0gPSBtW2tdO1xufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xuICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XG4gIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XG4gIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XG4gICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XG4gICAgICB9XG4gIH07XG4gIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XG4gIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgaWYgKCFtKSByZXR1cm4gbztcbiAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gIHRyeSB7XG4gICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgfVxuICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgfVxuICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gIH1cbiAgcmV0dXJuIGFyO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcbiAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXG4gICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XG4gIHJldHVybiBhcjtcbn1cblxuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XG4gIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xuICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXG4gICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcbiAgICAgICAgICByW2tdID0gYVtqXTtcbiAgcmV0dXJuIHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XG4gIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XG4gICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcbiAgICAgICAgICBhcltpXSA9IGZyb21baV07XG4gICAgICB9XG4gIH1cbiAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcbiAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xuICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xuICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xuICByZXR1cm4gaSA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBBc3luY0l0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBBc3luY0l0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpLCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIsIGF3YWl0UmV0dXJuKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xuICBmdW5jdGlvbiBhd2FpdFJldHVybihmKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZiwgcmVqZWN0KTsgfTsgfVxuICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaWYgKGdbbl0pIHsgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgaWYgKGYpIGlbbl0gPSBmKGlbbl0pOyB9IH1cbiAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxuICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cbiAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxuICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XG4gIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xuICB2YXIgaSwgcDtcbiAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcbiAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogZmFsc2UgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xuICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xuICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xuICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XG4gIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cbiAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcbiAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cbiAgcmV0dXJuIGNvb2tlZDtcbn07XG5cbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gIG9bXCJkZWZhdWx0XCJdID0gdjtcbn07XG5cbnZhciBvd25LZXlzID0gZnVuY3Rpb24obykge1xuICBvd25LZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gKG8pIHtcbiAgICB2YXIgYXIgPSBbXTtcbiAgICBmb3IgKHZhciBrIGluIG8pIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgaykpIGFyW2FyLmxlbmd0aF0gPSBrO1xuICAgIHJldHVybiBhcjtcbiAgfTtcbiAgcmV0dXJuIG93bktleXMobyk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xuICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayA9IG93bktleXMobW9kKSwgaSA9IDA7IGkgPCBrLmxlbmd0aDsgaSsrKSBpZiAoa1tpXSAhPT0gXCJkZWZhdWx0XCIpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwga1tpXSk7XG4gIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XG4gIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xuICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XG4gIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XG4gIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcbiAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xuICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcbiAgaWYgKHJlY2VpdmVyID09PSBudWxsIHx8ICh0eXBlb2YgcmVjZWl2ZXIgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHJlY2VpdmVyICE9PSBcImZ1bmN0aW9uXCIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSAnaW4nIG9wZXJhdG9yIG9uIG5vbi1vYmplY3RcIik7XG4gIHJldHVybiB0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyID09PSBzdGF0ZSA6IHN0YXRlLmhhcyhyZWNlaXZlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZShlbnYsIHZhbHVlLCBhc3luYykge1xuICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHZvaWQgMCkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWQuXCIpO1xuICAgIHZhciBkaXNwb3NlLCBpbm5lcjtcbiAgICBpZiAoYXN5bmMpIHtcbiAgICAgIGlmICghU3ltYm9sLmFzeW5jRGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0Rpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5hc3luY0Rpc3Bvc2VdO1xuICAgIH1cbiAgICBpZiAoZGlzcG9zZSA9PT0gdm9pZCAwKSB7XG4gICAgICBpZiAoIVN5bWJvbC5kaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmRpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5kaXNwb3NlXTtcbiAgICAgIGlmIChhc3luYykgaW5uZXIgPSBkaXNwb3NlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGRpc3Bvc2UgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBub3QgZGlzcG9zYWJsZS5cIik7XG4gICAgaWYgKGlubmVyKSBkaXNwb3NlID0gZnVuY3Rpb24oKSB7IHRyeSB7IGlubmVyLmNhbGwodGhpcyk7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpOyB9IH07XG4gICAgZW52LnN0YWNrLnB1c2goeyB2YWx1ZTogdmFsdWUsIGRpc3Bvc2U6IGRpc3Bvc2UsIGFzeW5jOiBhc3luYyB9KTtcbiAgfVxuICBlbHNlIGlmIChhc3luYykge1xuICAgIGVudi5zdGFjay5wdXNoKHsgYXN5bmM6IHRydWUgfSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG52YXIgX1N1cHByZXNzZWRFcnJvciA9IHR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xuICB2YXIgZSA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGUubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIGUuZXJyb3IgPSBlcnJvciwgZS5zdXBwcmVzc2VkID0gc3VwcHJlc3NlZCwgZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2Rpc3Bvc2VSZXNvdXJjZXMoZW52KSB7XG4gIGZ1bmN0aW9uIGZhaWwoZSkge1xuICAgIGVudi5lcnJvciA9IGVudi5oYXNFcnJvciA/IG5ldyBfU3VwcHJlc3NlZEVycm9yKGUsIGVudi5lcnJvciwgXCJBbiBlcnJvciB3YXMgc3VwcHJlc3NlZCBkdXJpbmcgZGlzcG9zYWwuXCIpIDogZTtcbiAgICBlbnYuaGFzRXJyb3IgPSB0cnVlO1xuICB9XG4gIHZhciByLCBzID0gMDtcbiAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICB3aGlsZSAociA9IGVudi5zdGFjay5wb3AoKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFyLmFzeW5jICYmIHMgPT09IDEpIHJldHVybiBzID0gMCwgZW52LnN0YWNrLnB1c2gociksIFByb21pc2UucmVzb2x2ZSgpLnRoZW4obmV4dCk7XG4gICAgICAgIGlmIChyLmRpc3Bvc2UpIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gci5kaXNwb3NlLmNhbGwoci52YWx1ZSk7XG4gICAgICAgICAgaWYgKHIuYXN5bmMpIHJldHVybiBzIHw9IDIsIFByb21pc2UucmVzb2x2ZShyZXN1bHQpLnRoZW4obmV4dCwgZnVuY3Rpb24oZSkgeyBmYWlsKGUpOyByZXR1cm4gbmV4dCgpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHMgfD0gMTtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGZhaWwoZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzID09PSAxKSByZXR1cm4gZW52Lmhhc0Vycm9yID8gUHJvbWlzZS5yZWplY3QoZW52LmVycm9yKSA6IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIGlmIChlbnYuaGFzRXJyb3IpIHRocm93IGVudi5lcnJvcjtcbiAgfVxuICByZXR1cm4gbmV4dCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb24ocGF0aCwgcHJlc2VydmVKc3gpIHtcbiAgaWYgKHR5cGVvZiBwYXRoID09PSBcInN0cmluZ1wiICYmIC9eXFwuXFwuP1xcLy8udGVzdChwYXRoKSkge1xuICAgICAgcmV0dXJuIHBhdGgucmVwbGFjZSgvXFwuKHRzeCkkfCgoPzpcXC5kKT8pKCg/OlxcLlteLi9dKz8pPylcXC4oW2NtXT8pdHMkL2ksIGZ1bmN0aW9uIChtLCB0c3gsIGQsIGV4dCwgY20pIHtcbiAgICAgICAgICByZXR1cm4gdHN4ID8gcHJlc2VydmVKc3ggPyBcIi5qc3hcIiA6IFwiLmpzXCIgOiBkICYmICghZXh0IHx8ICFjbSkgPyBtIDogKGQgKyBleHQgKyBcIi5cIiArIGNtLnRvTG93ZXJDYXNlKCkgKyBcImpzXCIpO1xuICAgICAgfSk7XG4gIH1cbiAgcmV0dXJuIHBhdGg7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgX19leHRlbmRzLFxuICBfX2Fzc2lnbixcbiAgX19yZXN0LFxuICBfX2RlY29yYXRlLFxuICBfX3BhcmFtLFxuICBfX2VzRGVjb3JhdGUsXG4gIF9fcnVuSW5pdGlhbGl6ZXJzLFxuICBfX3Byb3BLZXksXG4gIF9fc2V0RnVuY3Rpb25OYW1lLFxuICBfX21ldGFkYXRhLFxuICBfX2F3YWl0ZXIsXG4gIF9fZ2VuZXJhdG9yLFxuICBfX2NyZWF0ZUJpbmRpbmcsXG4gIF9fZXhwb3J0U3RhcixcbiAgX192YWx1ZXMsXG4gIF9fcmVhZCxcbiAgX19zcHJlYWQsXG4gIF9fc3ByZWFkQXJyYXlzLFxuICBfX3NwcmVhZEFycmF5LFxuICBfX2F3YWl0LFxuICBfX2FzeW5jR2VuZXJhdG9yLFxuICBfX2FzeW5jRGVsZWdhdG9yLFxuICBfX2FzeW5jVmFsdWVzLFxuICBfX21ha2VUZW1wbGF0ZU9iamVjdCxcbiAgX19pbXBvcnRTdGFyLFxuICBfX2ltcG9ydERlZmF1bHQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRHZXQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRTZXQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRJbixcbiAgX19hZGREaXNwb3NhYmxlUmVzb3VyY2UsXG4gIF9fZGlzcG9zZVJlc291cmNlcyxcbiAgX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb24sXG59O1xuIiwidmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc0tleSA9IHJlcXVpcmUoJy4vX2lzS2V5JyksXG4gICAgc3RyaW5nVG9QYXRoID0gcmVxdWlyZSgnLi9fc3RyaW5nVG9QYXRoJyksXG4gICAgdG9TdHJpbmcgPSByZXF1aXJlKCcuL3RvU3RyaW5nJyk7XG5cbi8qKlxuICogQ2FzdHMgYHZhbHVlYCB0byBhIHBhdGggYXJyYXkgaWYgaXQncyBub3Qgb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkga2V5cyBvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY2FzdCBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICovXG5mdW5jdGlvbiBjYXN0UGF0aCh2YWx1ZSwgb2JqZWN0KSB7XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByZXR1cm4gaXNLZXkodmFsdWUsIG9iamVjdCkgPyBbdmFsdWVdIDogc3RyaW5nVG9QYXRoKHRvU3RyaW5nKHZhbHVlKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2FzdFBhdGg7XG4iLCJ2YXIgbWVtb2l6ZUNhcHBlZCA9IHJlcXVpcmUoJy4vX21lbW9pemVDYXBwZWQnKTtcblxuLyoqIFVzZWQgdG8gbWF0Y2ggcHJvcGVydHkgbmFtZXMgd2l0aGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlUHJvcE5hbWUgPSAvW14uW1xcXV0rfFxcWyg/OigtP1xcZCsoPzpcXC5cXGQrKT8pfChbXCInXSkoKD86KD8hXFwyKVteXFxcXF18XFxcXC4pKj8pXFwyKVxcXXwoPz0oPzpcXC58XFxbXFxdKSg/OlxcLnxcXFtcXF18JCkpL2c7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGJhY2tzbGFzaGVzIGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlRXNjYXBlQ2hhciA9IC9cXFxcKFxcXFwpPy9nO1xuXG4vKipcbiAqIENvbnZlcnRzIGBzdHJpbmdgIHRvIGEgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKi9cbnZhciBzdHJpbmdUb1BhdGggPSBtZW1vaXplQ2FwcGVkKGZ1bmN0aW9uKHN0cmluZykge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGlmIChzdHJpbmcuY2hhckNvZGVBdCgwKSA9PT0gNDYgLyogLiAqLykge1xuICAgIHJlc3VsdC5wdXNoKCcnKTtcbiAgfVxuICBzdHJpbmcucmVwbGFjZShyZVByb3BOYW1lLCBmdW5jdGlvbihtYXRjaCwgbnVtYmVyLCBxdW90ZSwgc3ViU3RyaW5nKSB7XG4gICAgcmVzdWx0LnB1c2gocXVvdGUgPyBzdWJTdHJpbmcucmVwbGFjZShyZUVzY2FwZUNoYXIsICckMScpIDogKG51bWJlciB8fCBtYXRjaCkpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN0cmluZ1RvUGF0aDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRUcmFuc2xhdGlvblZhbHVlRnJvbUNvbnRlbnQgPSBleHBvcnRzLmdldFRyYW5zbGF0aW9uVmFsdWUgPSB2b2lkIDA7XG5jb25zdCB0c2xpYl8xID0gcmVxdWlyZShcInRzbGliXCIpO1xuY29uc3QgZ2V0XzEgPSB0c2xpYl8xLl9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwibG9kYXNoL2dldFwiKSk7XG5jb25zdCBnZXRUcmFuc2xhdGlvblZhbHVlID0gKHRyYW5zbGF0aW9uTG9va3VwLCBpMThuS2V5LCBsb2NhbGUpID0+IHtcbiAgICBjb25zdCB0cmFuc2xhdGlvbiA9IHRyYW5zbGF0aW9uTG9va3VwW2xvY2FsZV07XG4gICAgaWYgKCF0cmFuc2xhdGlvbikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuICgwLCBleHBvcnRzLmdldFRyYW5zbGF0aW9uVmFsdWVGcm9tQ29udGVudCkodHJhbnNsYXRpb24sIGkxOG5LZXkpO1xufTtcbmV4cG9ydHMuZ2V0VHJhbnNsYXRpb25WYWx1ZSA9IGdldFRyYW5zbGF0aW9uVmFsdWU7XG5jb25zdCBnZXRUcmFuc2xhdGlvblZhbHVlRnJvbUNvbnRlbnQgPSAodHJhbnNsYXRpb25Db250ZW50LCBpMThuS2V5KSA9PiB7XG4gICAgbGV0IHRyYW5zbGF0aW9uVmFsdWUgPSB0cmFuc2xhdGlvbkNvbnRlbnRbaTE4bktleV07XG4gICAgaWYgKCF0cmFuc2xhdGlvblZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGtleVRva2VucyA9IGkxOG5LZXkuc3BsaXQoJy4nKTtcbiAgICAgICAgaWYgKGtleVRva2Vucy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0cmFuc2xhdGlvblZhbHVlID0gKDAsIGdldF8xLmRlZmF1bHQpKHRyYW5zbGF0aW9uQ29udGVudCwga2V5VG9rZW5zLCBudWxsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHlwZW9mIHRyYW5zbGF0aW9uVmFsdWUgPT09ICdzdHJpbmcnID8gdHJhbnNsYXRpb25WYWx1ZSA6IG51bGw7XG59O1xuZXhwb3J0cy5nZXRUcmFuc2xhdGlvblZhbHVlRnJvbUNvbnRlbnQgPSBnZXRUcmFuc2xhdGlvblZhbHVlRnJvbUNvbnRlbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XG50c2xpYl8xLl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9lZ3Jlc3MtZmlsdGVyaW5nLXNlcnZpY2VcIiksIGV4cG9ydHMpO1xudHNsaWJfMS5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vdXJsLXBhcnNlclwiKSwgZXhwb3J0cyk7XG50c2xpYl8xLl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi91dGlsc1wiKSwgZXhwb3J0cyk7XG4iLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbm1vZHVsZS5leHBvcnRzID0gU3ltYm9sO1xuIiwidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0Jyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhc3luY1RhZyA9ICdbb2JqZWN0IEFzeW5jRnVuY3Rpb25dJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIHByb3h5VGFnID0gJ1tvYmplY3QgUHJveHldJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA5IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5cyBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gYmFzZUdldFRhZyh2YWx1ZSk7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnIHx8IHRhZyA9PSBhc3luY1RhZyB8fCB0YWcgPT0gcHJveHlUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvbjtcbiIsInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIEhhc2hcbiAqL1xuZnVuY3Rpb24gaGFzaENsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmF0aXZlQ3JlYXRlID8gbmF0aXZlQ3JlYXRlKG51bGwpIDoge307XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaENsZWFyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldEluc3RhbGxhdGlvbkFyaSA9IGV4cG9ydHMuZ2V0RW52aXJvbm1lbnRBcmkgPSBleHBvcnRzLmdldEFwcEFyaSA9IHZvaWQgMDtcbmNvbnN0IGdldEFwcEFyaSA9IChhcHBJZCkgPT4gKHtcbiAgICBhcHBJZCxcbiAgICB0b1N0cmluZzogKCkgPT4gYGFyaTpjbG91ZDplY29zeXN0ZW06OmFwcC8ke2FwcElkfWAsXG4gICAgdG9KU09OOiAoKSA9PiBgYXJpOmNsb3VkOmVjb3N5c3RlbTo6YXBwLyR7YXBwSWR9YFxufSk7XG5leHBvcnRzLmdldEFwcEFyaSA9IGdldEFwcEFyaTtcbmNvbnN0IGdldEVudmlyb25tZW50QXJpID0gKGFwcElkLCBlbnZpcm9ubWVudElkKSA9PiAoe1xuICAgIGVudmlyb25tZW50SWQsXG4gICAgdG9TdHJpbmc6ICgpID0+IGBhcmk6Y2xvdWQ6ZWNvc3lzdGVtOjplbnZpcm9ubWVudC8ke2FwcElkfS8ke2Vudmlyb25tZW50SWR9YCxcbiAgICB0b0pTT046ICgpID0+IGBhcmk6Y2xvdWQ6ZWNvc3lzdGVtOjplbnZpcm9ubWVudC8ke2FwcElkfS8ke2Vudmlyb25tZW50SWR9YFxufSk7XG5leHBvcnRzLmdldEVudmlyb25tZW50QXJpID0gZ2V0RW52aXJvbm1lbnRBcmk7XG5jb25zdCBnZXRJbnN0YWxsYXRpb25BcmkgPSAoaW5zdGFsbGF0aW9uSWQpID0+ICh7XG4gICAgaW5zdGFsbGF0aW9uSWQsXG4gICAgdG9TdHJpbmc6ICgpID0+IGBhcmk6Y2xvdWQ6ZWNvc3lzdGVtOjppbnN0YWxsYXRpb24vJHtpbnN0YWxsYXRpb25JZH1gLFxuICAgIHRvSlNPTjogKCkgPT4gYGFyaTpjbG91ZDplY29zeXN0ZW06Omluc3RhbGxhdGlvbi8ke2luc3RhbGxhdGlvbklkfWBcbn0pO1xuZXhwb3J0cy5nZXRJbnN0YWxsYXRpb25BcmkgPSBnZXRJbnN0YWxsYXRpb25Bcmk7XG4iLCJ2YXIgbWVtb2l6ZSA9IHJlcXVpcmUoJy4vbWVtb2l6ZScpO1xuXG4vKiogVXNlZCBhcyB0aGUgbWF4aW11bSBtZW1vaXplIGNhY2hlIHNpemUuICovXG52YXIgTUFYX01FTU9JWkVfU0laRSA9IDUwMDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ubWVtb2l6ZWAgd2hpY2ggY2xlYXJzIHRoZSBtZW1vaXplZCBmdW5jdGlvbidzXG4gKiBjYWNoZSB3aGVuIGl0IGV4Y2VlZHMgYE1BWF9NRU1PSVpFX1NJWkVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBoYXZlIGl0cyBvdXRwdXQgbWVtb2l6ZWQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBtZW1vaXplZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gbWVtb2l6ZUNhcHBlZChmdW5jKSB7XG4gIHZhciByZXN1bHQgPSBtZW1vaXplKGZ1bmMsIGZ1bmN0aW9uKGtleSkge1xuICAgIGlmIChjYWNoZS5zaXplID09PSBNQVhfTUVNT0laRV9TSVpFKSB7XG4gICAgICBjYWNoZS5jbGVhcigpO1xuICAgIH1cbiAgICByZXR1cm4ga2V5O1xuICB9KTtcblxuICB2YXIgY2FjaGUgPSByZXN1bHQuY2FjaGU7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWVtb2l6ZUNhcHBlZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5FbnRpdHlTdG9yYWdlQnVpbGRlciA9IHZvaWQgMDtcbnZhciBzdG9yYWdlX2J1aWxkZXJfMSA9IHJlcXVpcmUoXCIuL3N0b3JhZ2UtYnVpbGRlclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkVudGl0eVN0b3JhZ2VCdWlsZGVyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzdG9yYWdlX2J1aWxkZXJfMS5FbnRpdHlTdG9yYWdlQnVpbGRlcjsgfSB9KTtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBnZXRSYXdUYWcgPSByZXF1aXJlKCcuL19nZXRSYXdUYWcnKSxcbiAgICBvYmplY3RUb1N0cmluZyA9IHJlcXVpcmUoJy4vX29iamVjdFRvU3RyaW5nJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHZXRUYWc7XG4iLCJ2YXIgaXNLZXlhYmxlID0gcmVxdWlyZSgnLi9faXNLZXlhYmxlJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgZGF0YSBmb3IgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIHJlZmVyZW5jZSBrZXkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWFwIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGdldE1hcERhdGEobWFwLCBrZXkpIHtcbiAgdmFyIGRhdGEgPSBtYXAuX19kYXRhX187XG4gIHJldHVybiBpc0tleWFibGUoa2V5KVxuICAgID8gZGF0YVt0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8gJ3N0cmluZycgOiAnaGFzaCddXG4gICAgOiBkYXRhLm1hcDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRNYXBEYXRhO1xuIiwidmFyIG5hdGl2ZUNyZWF0ZSA9IHJlcXVpcmUoJy4vX25hdGl2ZUNyZWF0ZScpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIGhhc2ggdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hIYXMoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgcmV0dXJuIG5hdGl2ZUNyZWF0ZSA/IChkYXRhW2tleV0gIT09IHVuZGVmaW5lZCkgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaEhhcztcbiIsInZhciBnZXRNYXBEYXRhID0gcmVxdWlyZSgnLi9fZ2V0TWFwRGF0YScpO1xuXG4vKipcbiAqIFNldHMgdGhlIG1hcCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBtYXAgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSBnZXRNYXBEYXRhKHRoaXMsIGtleSksXG4gICAgICBzaXplID0gZGF0YS5zaXplO1xuXG4gIGRhdGEuc2V0KGtleSwgdmFsdWUpO1xuICB0aGlzLnNpemUgKz0gZGF0YS5zaXplID09IHNpemUgPyAwIDogMTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwQ2FjaGVTZXQ7XG4iLCJ2YXIgSGFzaCA9IHJlcXVpcmUoJy4vX0hhc2gnKSxcbiAgICBMaXN0Q2FjaGUgPSByZXF1aXJlKCcuL19MaXN0Q2FjaGUnKSxcbiAgICBNYXAgPSByZXF1aXJlKCcuL19NYXAnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVDbGVhcigpIHtcbiAgdGhpcy5zaXplID0gMDtcbiAgdGhpcy5fX2RhdGFfXyA9IHtcbiAgICAnaGFzaCc6IG5ldyBIYXNoLFxuICAgICdtYXAnOiBuZXcgKE1hcCB8fCBMaXN0Q2FjaGUpLFxuICAgICdzdHJpbmcnOiBuZXcgSGFzaFxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENhY2hlQ2xlYXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ3VzdG9tRW50aXR5UXVlcmllcyA9IGV4cG9ydHMuVW50eXBlZFF1ZXJpZXMgPSB2b2lkIDA7XG5jbGFzcyBVbnR5cGVkUXVlcmllcyB7XG4gICAgc3RhdGljIGdldCA9IChrZXksIGVuY3J5cHRlZCkgPT4gKHtcbiAgICAgICAgcXVlcnk6IGBcbiAgICAgIHF1ZXJ5IGZvcmdlX2FwcF9nZXRBcHBsaWNhdGlvblN0b3JhZ2VFbnRpdHkoJGtleTogSUQhLCAkZW5jcnlwdGVkOiBCb29sZWFuISkge1xuICAgICAgICBhcHBTdG9yZWRFbnRpdHkoa2V5OiAka2V5LCBlbmNyeXB0ZWQ6ICRlbmNyeXB0ZWQpIHtcbiAgICAgICAgICBrZXlcbiAgICAgICAgICB2YWx1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgYCxcbiAgICAgICAgdmFyaWFibGVzOiB7XG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBlbmNyeXB0ZWRcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHN0YXRpYyBzZXQgPSAoa2V5LCB2YWx1ZSwgZW5jcnlwdGVkKSA9PiAoe1xuICAgICAgICBxdWVyeTogYFxuICAgICAgbXV0YXRpb24gZm9yZ2VfYXBwX3NldEFwcGxpY2F0aW9uU3RvcmFnZUVudGl0eSgkaW5wdXQ6IFNldEFwcFN0b3JlZEVudGl0eU11dGF0aW9uSW5wdXQhKSB7XG4gICAgICAgIGFwcFN0b3JhZ2V7XG4gICAgICAgICAgc2V0QXBwU3RvcmVkRW50aXR5KGlucHV0OiAkaW5wdXQpIHtcbiAgICAgICAgICAgIHN1Y2Nlc3NcblxuICAgICAgICAgICAgZXJyb3JzIHtcbiAgICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICAgICAgICBleHRlbnNpb25zIHtcbiAgICAgICAgICAgICAgICBlcnJvclR5cGVcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgLFxuICAgICAgICB2YXJpYWJsZXM6IHtcbiAgICAgICAgICAgIGlucHV0OiB7XG4gICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgIGVuY3J5cHRlZFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgc3RhdGljIGRlbGV0ZSA9IChrZXksIGVuY3J5cHRlZCkgPT4gKHtcbiAgICAgICAgcXVlcnk6IGBcbiAgICAgIG11dGF0aW9uIGZvcmdlX2FwcF9kZWxldGVBcHBsaWNhdGlvblN0b3JhZ2VFbnRpdHkoJGlucHV0OiBEZWxldGVBcHBTdG9yZWRFbnRpdHlNdXRhdGlvbklucHV0ISkge1xuICAgICAgICBhcHBTdG9yYWdlIHtcbiAgICAgICAgICBkZWxldGVBcHBTdG9yZWRFbnRpdHkoaW5wdXQ6ICRpbnB1dCkge1xuICAgICAgICAgICAgc3VjY2Vzc1xuICBcbiAgICAgICAgICAgIGVycm9ycyB7XG4gICAgICAgICAgICAgIG1lc3NhZ2VcbiAgICAgICAgICAgICAgZXh0ZW5zaW9ucyB7XG4gICAgICAgICAgICAgICAgZXJyb3JUeXBlXG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgYCxcbiAgICAgICAgdmFyaWFibGVzOiB7XG4gICAgICAgICAgICBpbnB1dDoge1xuICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICBlbmNyeXB0ZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHN0YXRpYyBsaXN0UXVlcnkgPSAob3B0aW9ucykgPT4gKHtcbiAgICAgICAgcXVlcnk6IGBcbiAgICAgIHF1ZXJ5IGZvcmdlX2FwcF9nZXRBcHBsaWNhdGlvblN0b3JhZ2VFbnRpdGllcygkd2hlcmU6IFtBcHBTdG9yZWRFbnRpdHlGaWx0ZXIhXSwgJGN1cnNvcjogU3RyaW5nLCAkbGltaXQ6IEludCkge1xuICAgICAgICBhcHBTdG9yZWRFbnRpdGllcyh3aGVyZTogJHdoZXJlLCBhZnRlcjogJGN1cnNvciwgZmlyc3Q6ICRsaW1pdCkge1xuICAgICAgICAgIGVkZ2VzIHtcbiAgICAgICAgICAgIG5vZGUge1xuICAgICAgICAgICAgICB2YWx1ZVxuICAgICAgICAgICAgICBrZXlcbiAgICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgICBjdXJzb3JcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgLFxuICAgICAgICB2YXJpYWJsZXM6IHtcbiAgICAgICAgICAgIHdoZXJlOiBvcHRpb25zLndoZXJlID8/IG51bGwsXG4gICAgICAgICAgICBjdXJzb3I6IG9wdGlvbnMuY3Vyc29yID8/IG51bGwsXG4gICAgICAgICAgICBsaW1pdDogb3B0aW9ucy5saW1pdCA/PyBudWxsXG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydHMuVW50eXBlZFF1ZXJpZXMgPSBVbnR5cGVkUXVlcmllcztcbmNsYXNzIEN1c3RvbUVudGl0eVF1ZXJpZXMge1xuICAgIHN0YXRpYyBnZXQgPSAoZW50aXR5TmFtZSwga2V5KSA9PiAoe1xuICAgICAgICBxdWVyeTogYFxuICAgIHF1ZXJ5IGZvcmdlX2FwcF9nZXRBcHBsaWNhdGlvblN0b3JhZ2VDdXN0b21FbnRpdHkgKCRrZXk6IElEISwgJGVudGl0eU5hbWU6IFN0cmluZyEpIHtcbiAgICAgIGFwcFN0b3JlZEN1c3RvbUVudGl0eShrZXk6ICRrZXksIGVudGl0eU5hbWU6ICRlbnRpdHlOYW1lKSB7XG4gICAgICAgICAgdmFsdWVcbiAgICAgICAgICBlbnRpdHlOYW1lXG4gICAgICAgICAga2V5XG4gICAgICB9XG4gIH1cbiAgICBgLFxuICAgICAgICB2YXJpYWJsZXM6IHtcbiAgICAgICAgICAgIGVudGl0eU5hbWUsXG4gICAgICAgICAgICBrZXlcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHN0YXRpYyBzZXQgPSAoZW50aXR5TmFtZSwga2V5LCB2YWx1ZSkgPT4gKHtcbiAgICAgICAgcXVlcnk6IGBcbiAgICAgIG11dGF0aW9uIGZvcmdlX2FwcF9zZXRBcHBsaWNhdGlvblN0b3JhZ2VDdXN0b21FbnRpdHkoJGlucHV0OiBTZXRBcHBTdG9yZWRDdXN0b21FbnRpdHlNdXRhdGlvbklucHV0ISkge1xuICAgICAgICBhcHBTdG9yYWdlQ3VzdG9tRW50aXR5e1xuICAgICAgICAgIHNldEFwcFN0b3JlZEN1c3RvbUVudGl0eShpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICBzdWNjZXNzXG4gIFxuICAgICAgICAgICAgZXJyb3JzIHtcbiAgICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICAgICAgICBleHRlbnNpb25zIHtcbiAgICAgICAgICAgICAgICBlcnJvclR5cGVcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgLFxuICAgICAgICB2YXJpYWJsZXM6IHtcbiAgICAgICAgICAgIGlucHV0OiB7XG4gICAgICAgICAgICAgICAgZW50aXR5TmFtZSxcbiAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHN0YXRpYyBkZWxldGUgPSAoZW50aXR5TmFtZSwga2V5KSA9PiAoe1xuICAgICAgICBxdWVyeTogYFxuICAgICAgbXV0YXRpb24gZm9yZ2VfYXBwX2RlbGV0ZUFwcGxpY2F0aW9uU3RvcmFnZUN1c3RvbUVudGl0eSgkaW5wdXQ6IERlbGV0ZUFwcFN0b3JlZEN1c3RvbUVudGl0eU11dGF0aW9uSW5wdXQhKSB7XG4gICAgICAgIGFwcFN0b3JhZ2VDdXN0b21FbnRpdHkge1xuICAgICAgICAgIGRlbGV0ZUFwcFN0b3JlZEN1c3RvbUVudGl0eShpbnB1dDogJGlucHV0KSB7XG4gICAgICAgICAgICBzdWNjZXNzXG4gIFxuICAgICAgICAgICAgZXJyb3JzIHtcbiAgICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICAgICAgICBleHRlbnNpb25zIHtcbiAgICAgICAgICAgICAgICBlcnJvclR5cGVcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgLFxuICAgICAgICB2YXJpYWJsZXM6IHtcbiAgICAgICAgICAgIGlucHV0OiB7XG4gICAgICAgICAgICAgICAgZW50aXR5TmFtZSxcbiAgICAgICAgICAgICAgICBrZXlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHN0YXRpYyBsaXN0UXVlcnkgPSAob3B0aW9ucykgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcXVlcnk6IGBcbiAgICAgIHF1ZXJ5IEFwcFN0b3JhZ2VDdXN0b21FbnRpdHlRdWVyaWVzICgkZW50aXR5TmFtZTogU3RyaW5nISwgJGluZGV4TmFtZTogU3RyaW5nISwgJHJhbmdlOiBBcHBTdG9yZWRDdXN0b21FbnRpdHlSYW5nZSwgJGZpbHRlcnM6IEFwcFN0b3JlZEN1c3RvbUVudGl0eUZpbHRlcnMsICRzb3J0OlNvcnRPcmRlciwgJGxpbWl0OiBJbnQsICRjdXJzb3I6IFN0cmluZywgJHBhcnRpdGlvbjogW0FwcFN0b3JlZEN1c3RvbUVudGl0eUZpZWxkVmFsdWUhXSkge1xuICAgICAgICBhcHBTdG9yZWRDdXN0b21FbnRpdGllcyhlbnRpdHlOYW1lOiAkZW50aXR5TmFtZSwgaW5kZXhOYW1lOiAkaW5kZXhOYW1lLCByYW5nZTogJHJhbmdlLCBmaWx0ZXJzOiAkZmlsdGVycywgc29ydDokc29ydCwgbGltaXQ6ICRsaW1pdCwgY3Vyc29yOiAkY3Vyc29yLCBwYXJ0aXRpb246ICRwYXJ0aXRpb24pIHtcbiAgICAgICAgICAgIGVkZ2VzIHtcbiAgICAgICAgICAgICAgICBub2RlIHtcbiAgICAgICAgICAgICAgICAgICAga2V5XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGN1cnNvclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFnZUluZm8ge1xuICAgICAgICAgICAgICAgIGhhc05leHRQYWdlXG4gICAgICAgICAgICAgICAgaGFzUHJldmlvdXNQYWdlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b3RhbENvdW50XG4gICAgICAgICAgICBjdXJzb3JcbiAgICAgICAgfVxuICB9IFxuICAgICAgYCxcbiAgICAgICAgICAgIHZhcmlhYmxlczoge1xuICAgICAgICAgICAgICAgIGVudGl0eU5hbWU6IG9wdGlvbnMuZW50aXR5TmFtZSxcbiAgICAgICAgICAgICAgICBpbmRleE5hbWU6IG9wdGlvbnMuaW5kZXhOYW1lLFxuICAgICAgICAgICAgICAgIHJhbmdlOiBvcHRpb25zLnJhbmdlLFxuICAgICAgICAgICAgICAgIC4uLihvcHRpb25zLmZpbHRlcnMgJiYgb3B0aW9ucy5maWx0ZXJzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbb3B0aW9ucy5maWx0ZXJPcGVyYXRvciB8fCAnYW5kJ106IG9wdGlvbnMuZmlsdGVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDoge30pLFxuICAgICAgICAgICAgICAgIC4uLihvcHRpb25zLnBhcnRpdGlvbiA/IHsgcGFydGl0aW9uOiBvcHRpb25zLnBhcnRpdGlvbiB9IDoge30pLFxuICAgICAgICAgICAgICAgIC4uLihvcHRpb25zLnNvcnQgPyB7IHNvcnQ6IG9wdGlvbnMuc29ydCB9IDoge30pLFxuICAgICAgICAgICAgICAgIC4uLihvcHRpb25zLmN1cnNvciA/IHsgY3Vyc29yOiBvcHRpb25zLmN1cnNvciB9IDoge30pLFxuICAgICAgICAgICAgICAgIC4uLihvcHRpb25zLmxpbWl0ID8geyBsaW1pdDogb3B0aW9ucy5saW1pdCB9IDoge30pXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcbn1cbmV4cG9ydHMuQ3VzdG9tRW50aXR5UXVlcmllcyA9IEN1c3RvbUVudGl0eVF1ZXJpZXM7XG4iLCJ2YXIgYmFzZVRvU3RyaW5nID0gcmVxdWlyZSgnLi9fYmFzZVRvU3RyaW5nJyk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZy4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkIGZvciBgbnVsbGBcbiAqIGFuZCBgdW5kZWZpbmVkYCB2YWx1ZXMuIFRoZSBzaWduIG9mIGAtMGAgaXMgcHJlc2VydmVkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b1N0cmluZyhudWxsKTtcbiAqIC8vID0+ICcnXG4gKlxuICogXy50b1N0cmluZygtMCk7XG4gKiAvLyA9PiAnLTAnXG4gKlxuICogXy50b1N0cmluZyhbMSwgMiwgM10pO1xuICogLy8gPT4gJzEsMiwzJ1xuICovXG5mdW5jdGlvbiB0b1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogYmFzZVRvU3RyaW5nKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b1N0cmluZztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5hdXRob3JpemVKaXJhV2l0aEZldGNoID0gZXhwb3J0cy5hdXRob3JpemVDb25mbHVlbmNlV2l0aEZldGNoID0gdm9pZCAwO1xudmFyIGNvbmZsdWVuY2VfMSA9IHJlcXVpcmUoXCIuL2NvbmZsdWVuY2VcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJhdXRob3JpemVDb25mbHVlbmNlV2l0aEZldGNoXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25mbHVlbmNlXzEuYXV0aG9yaXplQ29uZmx1ZW5jZVdpdGhGZXRjaDsgfSB9KTtcbnZhciBqaXJhXzEgPSByZXF1aXJlKFwiLi9qaXJhXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiYXV0aG9yaXplSmlyYVdpdGhGZXRjaFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gamlyYV8xLmF1dGhvcml6ZUppcmFXaXRoRmV0Y2g7IH0gfSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYXV0aG9yaXplQ29uZmx1ZW5jZVdpdGhGZXRjaCA9IHZvaWQgMDtcbmNvbnN0IHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuLi9hcGlcIik7XG5jb25zdCBwZXJtaXNzaW9uc18xID0gdHNsaWJfMS5fX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vcGVybWlzc2lvbnNcIikpO1xuY29uc3QgY2hlY2tDb25mbHVlbmNlUGVybWlzc2lvbnMgPSBhc3luYyAocmVxdWVzdENvbmZsdWVuY2UsIGFjY291bnRJZCwgY29udGVudElkLCBwZXJtaXNzaW9uKSA9PiB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgcmVxdWVzdENvbmZsdWVuY2UoYC9yZXN0L2FwaS9jb250ZW50LyR7Y29udGVudElkfS9wZXJtaXNzaW9uL2NoZWNrYCwge1xuICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgaGVhZGVyczogeyAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIHN1YmplY3Q6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAndXNlcicsXG4gICAgICAgICAgICAgICAgaWRlbnRpZmllcjogYWNjb3VudElkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3BlcmF0aW9uOiBwZXJtaXNzaW9uXG4gICAgICAgIH0pXG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcztcbn07XG5jb25zdCBnZXRQZXJtaXNzaW9uc0NoZWNrRmFjdG9yeSA9IChyZXF1ZXN0Q29uZmx1ZW5jZSwgYWNjb3VudElkLCBjb250ZW50SWQpID0+IChwZXJtaXNzaW9uKSA9PiB7XG4gICAgcmV0dXJuIGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgY2hlY2tDb25mbHVlbmNlUGVybWlzc2lvbnMocmVxdWVzdENvbmZsdWVuY2UsIGFjY291bnRJZCwgY29udGVudElkLCBwZXJtaXNzaW9uKTtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4ocmVzPy5oYXNQZXJtaXNzaW9uKTtcbiAgICB9O1xufTtcbmNvbnN0IGF1dGhvcml6ZUNvbmZsdWVuY2VXaXRoRmV0Y2ggPSAocmVxdWVzdENvbmZsdWVuY2UsIGFjY291bnRJZCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIG9uQ29uZmx1ZW5jZUNvbnRlbnQ6IChjb250ZW50SWQpID0+ICgwLCBhcGlfMS5jcmVhdGVBcGlNZXRob2RzKShwZXJtaXNzaW9uc18xLmRlZmF1bHQsIGdldFBlcm1pc3Npb25zQ2hlY2tGYWN0b3J5KHJlcXVlc3RDb25mbHVlbmNlLCBhY2NvdW50SWQsIGNvbnRlbnRJZCkpXG4gICAgfTtcbn07XG5leHBvcnRzLmF1dGhvcml6ZUNvbmZsdWVuY2VXaXRoRmV0Y2ggPSBhdXRob3JpemVDb25mbHVlbmNlV2l0aEZldGNoO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNyZWF0ZUFwaU1ldGhvZHMgPSB2b2lkIDA7XG5jb25zdCBmcm9tRW50cmllcyA9IChhcnJheSkgPT4ge1xuICAgIHJldHVybiBhcnJheS5yZWR1Y2UoKGFjYywgW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgIGFjY1trZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xufTtcbmNvbnN0IGNyZWF0ZUFwaU1ldGhvZHMgPSAobWV0aG9kVG9QZXJtaXNzaW9uTWFwLCBwZXJtaXNzaW9uQ2hlY2tGYWN0b3J5KSA9PiB7XG4gICAgY29uc3QgYXBpTWV0aG9kRW50cmllcyA9IE9iamVjdC5lbnRyaWVzKG1ldGhvZFRvUGVybWlzc2lvbk1hcCkubWFwKChbbWV0aG9kTmFtZSwgcGVybWlzc2lvbl0pID0+IFttZXRob2ROYW1lLCBwZXJtaXNzaW9uQ2hlY2tGYWN0b3J5KHBlcm1pc3Npb24pXSk7XG4gICAgcmV0dXJuIGZyb21FbnRyaWVzKGFwaU1ldGhvZEVudHJpZXMpO1xufTtcbmV4cG9ydHMuY3JlYXRlQXBpTWV0aG9kcyA9IGNyZWF0ZUFwaU1ldGhvZHM7XG4iLCJ2YXIgbWFwQ2FjaGVDbGVhciA9IHJlcXVpcmUoJy4vX21hcENhY2hlQ2xlYXInKSxcbiAgICBtYXBDYWNoZURlbGV0ZSA9IHJlcXVpcmUoJy4vX21hcENhY2hlRGVsZXRlJyksXG4gICAgbWFwQ2FjaGVHZXQgPSByZXF1aXJlKCcuL19tYXBDYWNoZUdldCcpLFxuICAgIG1hcENhY2hlSGFzID0gcmVxdWlyZSgnLi9fbWFwQ2FjaGVIYXMnKSxcbiAgICBtYXBDYWNoZVNldCA9IHJlcXVpcmUoJy4vX21hcENhY2hlU2V0Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcCBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBNYXBDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA9PSBudWxsID8gMCA6IGVudHJpZXMubGVuZ3RoO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBNYXBDYWNoZWAuXG5NYXBDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBtYXBDYWNoZUNsZWFyO1xuTWFwQ2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IG1hcENhY2hlRGVsZXRlO1xuTWFwQ2FjaGUucHJvdG90eXBlLmdldCA9IG1hcENhY2hlR2V0O1xuTWFwQ2FjaGUucHJvdG90eXBlLmhhcyA9IG1hcENhY2hlSGFzO1xuTWFwQ2FjaGUucHJvdG90eXBlLnNldCA9IG1hcENhY2hlU2V0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcENhY2hlO1xuIiwiLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IFtdO1xuICB0aGlzLnNpemUgPSAwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3RDYWNoZUNsZWFyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmF1dGhvcml6ZUppcmFXaXRoRmV0Y2ggPSB2b2lkIDA7XG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuLi9hcGlcIik7XG5jb25zdCBwZXJtaXNzaW9uc18xID0gcmVxdWlyZShcIi4vcGVybWlzc2lvbnNcIik7XG5jb25zdCBhcnJheUVxdWFscyA9IChhLCBiKSA9PiB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KEFycmF5LmZyb20oYS5tYXAoU3RyaW5nKSkuc29ydCgpKSA9PT0gSlNPTi5zdHJpbmdpZnkoQXJyYXkuZnJvbShiLm1hcChTdHJpbmcpKS5zb3J0KCkpO1xufTtcbmNvbnN0IGNoZWNrSmlyYVBlcm1pc3Npb25zID0gYXN5bmMgKHJlcXVlc3RKaXJhLCBhY2NvdW50SWQsIHByb2plY3RQZXJtaXNzaW9ucykgPT4ge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHJlcXVlc3RKaXJhKCcvcmVzdC9hcGkvMy9wZXJtaXNzaW9ucy9jaGVjaycsIHtcbiAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgIGhlYWRlcnM6IHsgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBhY2NvdW50SWQsXG4gICAgICAgICAgICBwcm9qZWN0UGVybWlzc2lvbnNcbiAgICAgICAgfSlcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzO1xufTtcbmNvbnN0IGhhc1Blcm1pc3Npb25zRm9yRW50aXRpZXMgPSAocHJvamVjdFBlcm1pc3Npb25zLCBwZXJtaXNzaW9uLCB0eXBlLCBlbnRpdGllcykgPT4ge1xuICAgIGlmICghZW50aXRpZXMgfHwgZW50aXRpZXMubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICBjb25zdCBhbGxvd2VkRW50aXRpZXMgPSBwcm9qZWN0UGVybWlzc2lvbnMuZmluZCgocGVybWlzc2lvblJlc3BvbnNlKSA9PiBwZXJtaXNzaW9uUmVzcG9uc2UucGVybWlzc2lvbiA9PT0gcGVybWlzc2lvbik/Llt0eXBlXTtcbiAgICByZXR1cm4gISFhbGxvd2VkRW50aXRpZXMgJiYgYXJyYXlFcXVhbHMoYWxsb3dlZEVudGl0aWVzLCBlbnRpdGllcyk7XG59O1xuY29uc3QgZ2V0UGVybWlzc2lvbkNoZWNrRmFjdG9yeSA9IChyZXF1ZXN0SmlyYSwgYWNjb3VudElkLCB0eXBlLCBlbnRpdGllcykgPT4gKHBlcm1pc3Npb24pID0+IHtcbiAgICByZXR1cm4gYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCB7IHByb2plY3RQZXJtaXNzaW9ucyB9ID0gYXdhaXQgY2hlY2tKaXJhUGVybWlzc2lvbnMocmVxdWVzdEppcmEsIGFjY291bnRJZCwgW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBlcm1pc3Npb25zOiBbcGVybWlzc2lvbl0sXG4gICAgICAgICAgICAgICAgW3R5cGVdOiBlbnRpdGllc1xuICAgICAgICAgICAgfVxuICAgICAgICBdKTtcbiAgICAgICAgcmV0dXJuIGhhc1Blcm1pc3Npb25zRm9yRW50aXRpZXMocHJvamVjdFBlcm1pc3Npb25zLCBwZXJtaXNzaW9uLCB0eXBlLCBlbnRpdGllcyk7XG4gICAgfTtcbn07XG5jb25zdCB0b0FycmF5ID0gKGlkKSA9PiAoQXJyYXkuaXNBcnJheShpZCkgPyBpZCA6IFtpZF0pO1xuY29uc3QgYXV0aG9yaXplSmlyYVdpdGhGZXRjaCA9IChyZXF1ZXN0SmlyYSwgYWNjb3VudElkKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb25KaXJhOiBhc3luYyAocHJvamVjdFBlcm1pc3Npb25zSW5wdXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNoZWNrSmlyYVBlcm1pc3Npb25zKHJlcXVlc3RKaXJhLCBhY2NvdW50SWQsIHByb2plY3RQZXJtaXNzaW9uc0lucHV0KTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQucHJvamVjdFBlcm1pc3Npb25zIHx8IFtdO1xuICAgICAgICB9LFxuICAgICAgICBvbkppcmFQcm9qZWN0OiAocHJvamVjdHMpID0+ICgwLCBhcGlfMS5jcmVhdGVBcGlNZXRob2RzKShwZXJtaXNzaW9uc18xLkFQSV9QUk9KRUNUU19QRVJNSVNTSU9OU19NQVAsIGdldFBlcm1pc3Npb25DaGVja0ZhY3RvcnkocmVxdWVzdEppcmEsIGFjY291bnRJZCwgJ3Byb2plY3RzJywgdG9BcnJheShwcm9qZWN0cykpKSxcbiAgICAgICAgb25KaXJhSXNzdWU6IChpc3N1ZXMpID0+ICgwLCBhcGlfMS5jcmVhdGVBcGlNZXRob2RzKShwZXJtaXNzaW9uc18xLkFQSV9JU1NVRVNfUEVSTUlTU0lPTlNfTUFQLCBnZXRQZXJtaXNzaW9uQ2hlY2tGYWN0b3J5KHJlcXVlc3RKaXJhLCBhY2NvdW50SWQsICdpc3N1ZXMnLCB0b0FycmF5KGlzc3VlcykpKVxuICAgIH07XG59O1xuZXhwb3J0cy5hdXRob3JpemVKaXJhV2l0aEZldGNoID0gYXV0aG9yaXplSmlyYVdpdGhGZXRjaDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5wZXJtaXNzaW9ucyA9IGV4cG9ydHMuY2FuTG9hZFJlc291cmNlID0gZXhwb3J0cy5jYW5GZXRjaEZyb20gPSBleHBvcnRzLmhhc1Njb3BlID0gZXhwb3J0cy5oYXNQZXJtaXNzaW9uID0gZXhwb3J0cy5leHRyYWN0VXJsU3RyaW5nID0gdm9pZCAwO1xuY29uc3QgcnVudGltZV8xID0gcmVxdWlyZShcIi4vcnVudGltZVwiKTtcbmNvbnN0IGVycm9yc18xID0gcmVxdWlyZShcIi4vZXJyb3JzXCIpO1xuY29uc3QgZWdyZXNzXzEgPSByZXF1aXJlKFwiQGZvcmdlL2VncmVzc1wiKTtcbmZ1bmN0aW9uIGV4dHJhY3RVcmxTdHJpbmcodXJsKSB7XG4gICAgaWYgKHR5cGVvZiB1cmwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuICAgIGlmICgnYWRkcmVzcycgaW4gdXJsKSB7XG4gICAgICAgIHJldHVybiB1cmwuYWRkcmVzcztcbiAgICB9XG4gICAgcmV0dXJuIHVybC5yZW1vdGU7XG59XG5leHBvcnRzLmV4dHJhY3RVcmxTdHJpbmcgPSBleHRyYWN0VXJsU3RyaW5nO1xuZnVuY3Rpb24gd3JhcEluU3luY01ldHJpY3Mob3B0aW9ucywgY2IpIHtcbiAgICBjb25zdCBtZXRyaWNzID0gKDAsIHJ1bnRpbWVfMS5fX2dldFJ1bnRpbWUpKCkubWV0cmljcztcbiAgICBtZXRyaWNzLmNvdW50ZXIob3B0aW9ucy5uYW1lLCBvcHRpb25zLnRhZ3MpLmluY3IoKTtcbiAgICByZXR1cm4gY2IoKTtcbn1cbmNvbnN0IGdldE1pc3NpbmdTY29wZXMgPSAocmVxdWlyZWRTY29wZXMsIGN1cnJlbnRseUdyYW50ZWRTY29wZXMpID0+IHtcbiAgICBpZiAoIXJlcXVpcmVkU2NvcGVzKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KHJlcXVpcmVkU2NvcGVzKSAmJiByZXF1aXJlZFNjb3Blcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRHcmFudGVkU2NvcGVzID0gQXJyYXkuaXNBcnJheShjdXJyZW50bHlHcmFudGVkU2NvcGVzKSA/IGN1cnJlbnRseUdyYW50ZWRTY29wZXMgOiBbXTtcbiAgICAgICAgY29uc3QgbWlzc2luZ1Njb3BlcyA9IHJlcXVpcmVkU2NvcGVzLmZpbHRlcigoc2NvcGUpID0+ICFjdXJyZW50R3JhbnRlZFNjb3Blcy5pbmNsdWRlcyhzY29wZSkpO1xuICAgICAgICBpZiAobWlzc2luZ1Njb3Blcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbWlzc2luZ1Njb3BlcztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufTtcbmNvbnN0IGdldE1pc3NpbmdVcmxzID0gKHJlcXVpcmVkVXJscywgY3VycmVudGx5R3JhbnRlZFVybHMsIHVzZUNTUCkgPT4ge1xuICAgIGNvbnN0IGFsbG93TGlzdCA9IGN1cnJlbnRseUdyYW50ZWRVcmxzLm1hcCgodXJsKSA9PiBleHRyYWN0VXJsU3RyaW5nKHVybCkpO1xuICAgIGNvbnN0IGVncmVzc0ZpbHRlciA9IG5ldyBlZ3Jlc3NfMS5FZ3Jlc3NGaWx0ZXJpbmdTZXJ2aWNlKGFsbG93TGlzdCk7XG4gICAgY29uc3QgbWlzc2luZ1VybHMgPSByZXF1aXJlZFVybHMuZmlsdGVyKChyZXF1aXJlZFVybCkgPT4ge1xuICAgICAgICBjb25zdCB1cmxTdHJpbmcgPSBleHRyYWN0VXJsU3RyaW5nKHJlcXVpcmVkVXJsKTtcbiAgICAgICAgaWYgKHVzZUNTUCkge1xuICAgICAgICAgICAgcmV0dXJuICFlZ3Jlc3NGaWx0ZXIuaXNWYWxpZFVybENTUCh1cmxTdHJpbmcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAhZWdyZXNzRmlsdGVyLmlzVmFsaWRVcmwodXJsU3RyaW5nKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbWlzc2luZ1VybHM7XG59O1xuY29uc3QgVkFMSURfUkVRVUlSRU1FTlRfS0VZUyA9IFsnc2NvcGVzJywgJ2V4dGVybmFsJ107XG5jb25zdCBWQUxJRF9FWFRFUk5BTF9UWVBFUyA9IFtcbiAgICAnZmV0Y2gnLFxuICAgICdmb250cycsXG4gICAgJ2ZyYW1lcycsXG4gICAgJ2ltYWdlcycsXG4gICAgJ21lZGlhJyxcbiAgICAnc2NyaXB0cycsXG4gICAgJ3N0eWxlcydcbl07XG5jb25zdCBWQUxJRF9GRVRDSF9UWVBFUyA9IFsnYmFja2VuZCcsICdjbGllbnQnXTtcbmNvbnN0IHZhbGlkYXRlS2V5cyA9IChvYmosIHZhbGlkS2V5cykgPT4ge1xuICAgIGNvbnN0IHZhbGlkS2V5c1NldCA9IG5ldyBTZXQodmFsaWRLZXlzKTtcbiAgICBjb25zdCBwcm92aWRlZEtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgIGNvbnN0IGludmFsaWRLZXlzID0gcHJvdmlkZWRLZXlzLmZpbHRlcigoa2V5KSA9PiAhdmFsaWRLZXlzU2V0LmhhcyhrZXkpKTtcbiAgICBpZiAoaW52YWxpZEtleXMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcGVybWlzc2lvbiBrZXkocyk6ICR7aW52YWxpZEtleXMuam9pbignLCAnKX0uIGAgK1xuICAgICAgICAgICAgYFZpc2l0IGh0dHBzOi8vZ28uYXRsYXNzaWFuLmNvbS9mb3JnZS1wZXJtaXNzaW9ucyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5gKTtcbiAgICB9XG59O1xuY29uc3QgdmFsaWRhdGVQZXJtaXNzaW9uUmVxdWlyZW1lbnRzID0gKHJlcXVpcmVtZW50cykgPT4ge1xuICAgIHZhbGlkYXRlS2V5cyhyZXF1aXJlbWVudHMsIFZBTElEX1JFUVVJUkVNRU5UX0tFWVMpO1xuICAgIGlmIChyZXF1aXJlbWVudHMuZXh0ZXJuYWwpIHtcbiAgICAgICAgdmFsaWRhdGVLZXlzKHJlcXVpcmVtZW50cy5leHRlcm5hbCwgVkFMSURfRVhURVJOQUxfVFlQRVMpO1xuICAgICAgICBpZiAocmVxdWlyZW1lbnRzLmV4dGVybmFsLmZldGNoKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZUtleXMocmVxdWlyZW1lbnRzLmV4dGVybmFsLmZldGNoLCBWQUxJRF9GRVRDSF9UWVBFUyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuY29uc3QgZ2V0TWlzc2luZ0ZldGNoUGVybWlzc2lvbnMgPSAocmVxdWlyZWRGZXRjaCwgY3VycmVudGx5R3JhbnRlZEZldGNoKSA9PiB7XG4gICAgaWYgKCFyZXF1aXJlZEZldGNoKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGNvbnN0IG1pc3NpbmdGZXRjaCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKHJlcXVpcmVkRmV0Y2gpLmZvckVhY2goKGZldGNoVHlwZSkgPT4ge1xuICAgICAgICBjb25zdCByZXF1aXJlZFVybHMgPSByZXF1aXJlZEZldGNoW2ZldGNoVHlwZV07XG4gICAgICAgIGlmICghcmVxdWlyZWRVcmxzIHx8ICFBcnJheS5pc0FycmF5KHJlcXVpcmVkVXJscykgfHwgcmVxdWlyZWRVcmxzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgbWlzc2luZ1VybHMgPSBnZXRNaXNzaW5nVXJscyhyZXF1aXJlZFVybHMsIGN1cnJlbnRseUdyYW50ZWRGZXRjaD8uW2ZldGNoVHlwZV0gPz8gW10sIGZldGNoVHlwZSA9PT0gJ2NsaWVudCcpO1xuICAgICAgICBpZiAobWlzc2luZ1VybHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBtaXNzaW5nRmV0Y2hbZmV0Y2hUeXBlXSA9IG1pc3NpbmdVcmxzLm1hcChleHRyYWN0VXJsU3RyaW5nKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhtaXNzaW5nRmV0Y2gpLmxlbmd0aCA/IG1pc3NpbmdGZXRjaCA6IHVuZGVmaW5lZDtcbn07XG5jb25zdCBnZXRNaXNzaW5nRXh0ZXJuYWxQZXJtaXNzaW9ucyA9IChyZXF1aXJlZEV4dGVybmFsLCBjdXJyZW50R3JhbnRlZEV4dGVybmFsKSA9PiB7XG4gICAgbGV0IG1pc3NpbmdFeHRlcm5hbCA9IHVuZGVmaW5lZDtcbiAgICBPYmplY3Qua2V5cyhyZXF1aXJlZEV4dGVybmFsKS5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgIGlmICh0eXBlID09PSAnZmV0Y2gnKSB7XG4gICAgICAgICAgICBjb25zdCBtaXNzaW5nRmV0Y2hQZXJtcyA9IGdldE1pc3NpbmdGZXRjaFBlcm1pc3Npb25zKHJlcXVpcmVkRXh0ZXJuYWwuZmV0Y2gsIGN1cnJlbnRHcmFudGVkRXh0ZXJuYWwuZmV0Y2gpO1xuICAgICAgICAgICAgaWYgKG1pc3NpbmdGZXRjaFBlcm1zKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFtaXNzaW5nRXh0ZXJuYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgbWlzc2luZ0V4dGVybmFsID0ge307XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1pc3NpbmdFeHRlcm5hbC5mZXRjaCA9IG1pc3NpbmdGZXRjaFBlcm1zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGV4dGVybmFsVXJscyA9IHJlcXVpcmVkRXh0ZXJuYWxbdHlwZV07XG4gICAgICAgIGlmICghZXh0ZXJuYWxVcmxzIHx8ICFBcnJheS5pc0FycmF5KGV4dGVybmFsVXJscykgfHwgZXh0ZXJuYWxVcmxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1pc3NpbmdVcmxzID0gZ2V0TWlzc2luZ1VybHMoZXh0ZXJuYWxVcmxzLCBjdXJyZW50R3JhbnRlZEV4dGVybmFsW3R5cGVdIHx8IFtdLCB0cnVlKTtcbiAgICAgICAgaWYgKG1pc3NpbmdVcmxzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmICghbWlzc2luZ0V4dGVybmFsKSB7XG4gICAgICAgICAgICAgICAgbWlzc2luZ0V4dGVybmFsID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtaXNzaW5nRXh0ZXJuYWxbdHlwZV0gPSBtaXNzaW5nVXJscy5tYXAoZXh0cmFjdFVybFN0cmluZyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbWlzc2luZ0V4dGVybmFsO1xufTtcbmNvbnN0IGhhc1Blcm1pc3Npb24gPSAocmVxdWlyZW1lbnRzKSA9PiB7XG4gICAgcmV0dXJuIHdyYXBJblN5bmNNZXRyaWNzKHsgbmFtZTogJ2FwaS5wZXJtaXNzaW9ucy5oYXNQZXJtaXNzaW9uJyB9LCAoKSA9PiBoYXNQZXJtaXNzaW9uV2l0aG91dE1ldHJpY3MocmVxdWlyZW1lbnRzKSk7XG59O1xuZXhwb3J0cy5oYXNQZXJtaXNzaW9uID0gaGFzUGVybWlzc2lvbjtcbmNvbnN0IGhhc1Blcm1pc3Npb25XaXRob3V0TWV0cmljcyA9IChyZXF1aXJlbWVudHMpID0+IHtcbiAgICBjb25zdCBhcHBDb250ZXh0ID0gKDAsIHJ1bnRpbWVfMS5nZXRBcHBDb250ZXh0KSgpO1xuICAgIGNvbnN0IGN1cnJlbnRseUdyYW50ZWRQZXJtaXNzaW9ucyA9IGFwcENvbnRleHQucGVybWlzc2lvbnM7XG4gICAgY29uc3QgYXJlUGVybWlzc2lvbnNBdmFpbGFibGUgPSAhIShjdXJyZW50bHlHcmFudGVkUGVybWlzc2lvbnMgJiYgdHlwZW9mIGN1cnJlbnRseUdyYW50ZWRQZXJtaXNzaW9ucyA9PT0gJ29iamVjdCcpO1xuICAgIGlmICghYXJlUGVybWlzc2lvbnNBdmFpbGFibGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLkFwaU5vdFJlYWR5RXJyb3IoJ1RoaXMgZmVhdHVyZSBpcyBub3QgYXZhaWxhYmxlIHlldCcpO1xuICAgIH1cbiAgICB2YWxpZGF0ZVBlcm1pc3Npb25SZXF1aXJlbWVudHMocmVxdWlyZW1lbnRzKTtcbiAgICBjb25zdCBtaXNzaW5nUGVybWlzc2lvbnMgPSB7fTtcbiAgICBsZXQgaGFzTWlzc2luZ1Blcm1pc3Npb25zID0gZmFsc2U7XG4gICAgY29uc3QgbWlzc2luZ1Njb3BlcyA9IGdldE1pc3NpbmdTY29wZXMocmVxdWlyZW1lbnRzLnNjb3BlcywgY3VycmVudGx5R3JhbnRlZFBlcm1pc3Npb25zLnNjb3Blcyk7XG4gICAgaWYgKG1pc3NpbmdTY29wZXMpIHtcbiAgICAgICAgbWlzc2luZ1Blcm1pc3Npb25zLnNjb3BlcyA9IG1pc3NpbmdTY29wZXM7XG4gICAgICAgIGhhc01pc3NpbmdQZXJtaXNzaW9ucyA9IHRydWU7XG4gICAgfVxuICAgIGlmIChyZXF1aXJlbWVudHMuZXh0ZXJuYWwpIHtcbiAgICAgICAgY29uc3QgeyBleHRlcm5hbDogcmVxdWlyZWRFeHRlcm5hbCB9ID0gcmVxdWlyZW1lbnRzO1xuICAgICAgICBjb25zdCBjdXJyZW50bHlHcmFudGVkRXh0ZXJuYWwgPSBjdXJyZW50bHlHcmFudGVkUGVybWlzc2lvbnMuZXh0ZXJuYWwgfHwge307XG4gICAgICAgIGNvbnN0IG1pc3NpbmdFeHRlcm5hbFBlcm1zID0gZ2V0TWlzc2luZ0V4dGVybmFsUGVybWlzc2lvbnMocmVxdWlyZWRFeHRlcm5hbCwgY3VycmVudGx5R3JhbnRlZEV4dGVybmFsKTtcbiAgICAgICAgaWYgKG1pc3NpbmdFeHRlcm5hbFBlcm1zKSB7XG4gICAgICAgICAgICBtaXNzaW5nUGVybWlzc2lvbnMuZXh0ZXJuYWwgPSB7XG4gICAgICAgICAgICAgICAgLi4ubWlzc2luZ1Blcm1pc3Npb25zLmV4dGVybmFsLFxuICAgICAgICAgICAgICAgIC4uLm1pc3NpbmdFeHRlcm5hbFBlcm1zXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaGFzTWlzc2luZ1Blcm1pc3Npb25zID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBncmFudGVkOiAhaGFzTWlzc2luZ1Blcm1pc3Npb25zLFxuICAgICAgICAuLi4oaGFzTWlzc2luZ1Blcm1pc3Npb25zICYmIHtcbiAgICAgICAgICAgIG1pc3Npbmc6IG5ldyBydW50aW1lXzEuTWlzc2luZ1Blcm1pc3Npb25zKG1pc3NpbmdQZXJtaXNzaW9ucy5zY29wZXMsIG1pc3NpbmdQZXJtaXNzaW9ucy5leHRlcm5hbClcbiAgICAgICAgfSlcbiAgICB9O1xufTtcbmNvbnN0IGhhc1Njb3BlID0gKHNjb3BlKSA9PiB7XG4gICAgcmV0dXJuIHdyYXBJblN5bmNNZXRyaWNzKHsgbmFtZTogJ2FwaS5wZXJtaXNzaW9ucy5oYXNTY29wZScgfSwgKCkgPT4gaGFzUGVybWlzc2lvbldpdGhvdXRNZXRyaWNzKHsgc2NvcGVzOiBbc2NvcGVdIH0pLmdyYW50ZWQpO1xufTtcbmV4cG9ydHMuaGFzU2NvcGUgPSBoYXNTY29wZTtcbmNvbnN0IGNhbkZldGNoRnJvbSA9ICh0eXBlLCB1cmwpID0+IHtcbiAgICByZXR1cm4gd3JhcEluU3luY01ldHJpY3MoeyBuYW1lOiAnYXBpLnBlcm1pc3Npb25zLmNhbkZldGNoRnJvbScgfSwgKCkgPT4gaGFzUGVybWlzc2lvbldpdGhvdXRNZXRyaWNzKHsgZXh0ZXJuYWw6IHsgZmV0Y2g6IHsgW3R5cGVdOiBbdXJsXSB9IH0gfSkuZ3JhbnRlZCk7XG59O1xuZXhwb3J0cy5jYW5GZXRjaEZyb20gPSBjYW5GZXRjaEZyb207XG5jb25zdCBjYW5Mb2FkUmVzb3VyY2UgPSAodHlwZSwgdXJsKSA9PiB7XG4gICAgcmV0dXJuIHdyYXBJblN5bmNNZXRyaWNzKHsgbmFtZTogJ2FwaS5wZXJtaXNzaW9ucy5jYW5Mb2FkUmVzb3VyY2UnIH0sICgpID0+IGhhc1Blcm1pc3Npb25XaXRob3V0TWV0cmljcyh7IGV4dGVybmFsOiB7IFt0eXBlXTogW3VybF0gfSB9KS5ncmFudGVkKTtcbn07XG5leHBvcnRzLmNhbkxvYWRSZXNvdXJjZSA9IGNhbkxvYWRSZXNvdXJjZTtcbmV4cG9ydHMucGVybWlzc2lvbnMgPSB7XG4gICAgaGFzUGVybWlzc2lvbjogZXhwb3J0cy5oYXNQZXJtaXNzaW9uLFxuICAgIGhhc1Njb3BlOiBleHBvcnRzLmhhc1Njb3BlLFxuICAgIGNhbkZldGNoRnJvbTogZXhwb3J0cy5jYW5GZXRjaEZyb20sXG4gICAgY2FuTG9hZFJlc291cmNlOiBleHBvcnRzLmNhbkxvYWRSZXNvdXJjZVxufTtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuIiwiLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtPYmplY3R9IGhhc2ggVGhlIGhhc2ggdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hEZWxldGUoa2V5KSB7XG4gIHZhciByZXN1bHQgPSB0aGlzLmhhcyhrZXkpICYmIGRlbGV0ZSB0aGlzLl9fZGF0YV9fW2tleV07XG4gIHRoaXMuc2l6ZSAtPSByZXN1bHQgPyAxIDogMDtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoRGVsZXRlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkdsb2JhbFN0b3JhZ2UgPSB2b2lkIDA7XG5jb25zdCBlcnJvcnNfMSA9IHJlcXVpcmUoXCIuL2Vycm9yc1wiKTtcbmNvbnN0IGdxbF9xdWVyaWVzXzEgPSByZXF1aXJlKFwiLi9ncWwtcXVlcmllc1wiKTtcbmZ1bmN0aW9uIGFzc2VydE5vRXJyb3JzKGVycm9ycykge1xuICAgIGlmIChlcnJvcnMgJiYgZXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgeyBtZXNzYWdlLCBleHRlbnNpb25zOiB7IGVycm9yVHlwZSB9IH0gPSBlcnJvcnNbMF07XG4gICAgICAgIHRocm93IGVycm9yc18xLkFQSUVycm9yLmZvckVycm9yQ29kZShlcnJvclR5cGUsIG1lc3NhZ2UpO1xuICAgIH1cbn1cbmFzeW5jIGZ1bmN0aW9uIGdldFJlc3BvbnNlQm9keShyZXNwb25zZSkge1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICB0aHJvdyBlcnJvcnNfMS5BUElFcnJvci5mb3JTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKTtcbiAgICB9XG4gICAgY29uc3QgcmVzcG9uc2VUZXh0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgIGxldCByZXNwb25zZUJvZHk7XG4gICAgdHJ5IHtcbiAgICAgICAgcmVzcG9uc2VCb2R5ID0gSlNPTi5wYXJzZShyZXNwb25zZVRleHQpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXJyb3JzXzEuQVBJRXJyb3IuZm9yVW5leHBlY3RlZChgUmVzcG9uc2UgdGV4dCB3YXMgbm90IGEgdmFsaWQgSlNPTjogJHtyZXNwb25zZVRleHR9YCk7XG4gICAgfVxuICAgIGFzc2VydE5vRXJyb3JzKHJlc3BvbnNlQm9keS5lcnJvcnMpO1xuICAgIHJldHVybiByZXNwb25zZUJvZHkuZGF0YTtcbn1cbmNsYXNzIEdsb2JhbFN0b3JhZ2Uge1xuICAgIGFwaUNsaWVudDtcbiAgICBnZXRNZXRyaWNzO1xuICAgIGVuZHBvaW50ID0gJy9mb3JnZS9lbnRpdGllcy9ncmFwaHFsJztcbiAgICBjb25zdHJ1Y3RvcihhcGlDbGllbnQsIGdldE1ldHJpY3MpIHtcbiAgICAgICAgdGhpcy5hcGlDbGllbnQgPSBhcGlDbGllbnQ7XG4gICAgICAgIHRoaXMuZ2V0TWV0cmljcyA9IGdldE1ldHJpY3M7XG4gICAgfVxuICAgIGFzeW5jIGdldChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SW50ZXJuYWwoa2V5LCBmYWxzZSk7XG4gICAgfVxuICAgIGFzeW5jIGdldFNlY3JldChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SW50ZXJuYWwoa2V5LCB0cnVlKTtcbiAgICB9XG4gICAgYXN5bmMgbGlzdChvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RCb2R5ID0gZ3FsX3F1ZXJpZXNfMS5VbnR5cGVkUXVlcmllcy5saXN0UXVlcnkob3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy53cmFwSW5NZXRyaWMoJ3VudHlwZWQnLCAncXVlcnknLCBmYWxzZSwgYXN5bmMgKCkgPT4gYXdhaXQgdGhpcy5xdWVyeShyZXF1ZXN0Qm9keSkpO1xuICAgICAgICBjb25zdCBlZGdlcyA9IHJlc3BvbnNlLmFwcFN0b3JlZEVudGl0aWVzLmVkZ2VzO1xuICAgICAgICBjb25zdCBuZXh0Q3Vyc29yID0gZWRnZXMubGVuZ3RoID4gMCA/IGVkZ2VzW2VkZ2VzLmxlbmd0aCAtIDFdLmN1cnNvciA6IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IGVkZ2VzLm1hcCgoeyBub2RlIH0pID0+IG5vZGUpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdWx0cyxcbiAgICAgICAgICAgIG5leHRDdXJzb3JcbiAgICAgICAgfTtcbiAgICB9XG4gICAgYXN5bmMgbGlzdEN1c3RvbUVudGl0aWVzKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgcmVxdWVzdEJvZHkgPSBncWxfcXVlcmllc18xLkN1c3RvbUVudGl0eVF1ZXJpZXMubGlzdFF1ZXJ5KG9wdGlvbnMpO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMud3JhcEluTWV0cmljKCd0eXBlZCcsICdxdWVyeScsIGZhbHNlLCBhc3luYyAoKSA9PiBhd2FpdCB0aGlzLnF1ZXJ5KHJlcXVlc3RCb2R5KSk7XG4gICAgICAgIGNvbnN0IGVkZ2VzID0gcmVzcG9uc2UuYXBwU3RvcmVkQ3VzdG9tRW50aXRpZXMuZWRnZXM7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBlZGdlcy5tYXAoKHsgbm9kZSB9KSA9PiBub2RlKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3VsdHMsXG4gICAgICAgICAgICBuZXh0Q3Vyc29yOiByZXNwb25zZS5hcHBTdG9yZWRDdXN0b21FbnRpdGllcy5jdXJzb3IgfHwgbnVsbFxuICAgICAgICB9O1xuICAgIH1cbiAgICBhc3luYyBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICBjb25zdCByZXF1ZXN0Qm9keSA9IGdxbF9xdWVyaWVzXzEuVW50eXBlZFF1ZXJpZXMuc2V0KGtleSwgdmFsdWUsIGZhbHNlKTtcbiAgICAgICAgYXdhaXQgdGhpcy53cmFwSW5NZXRyaWMoJ3VudHlwZWQnLCAnc2V0JywgZmFsc2UsIGFzeW5jICgpID0+IGF3YWl0IHRoaXMubXV0YXRpb24ocmVxdWVzdEJvZHksICdhcHBTdG9yYWdlJywgJ3NldEFwcFN0b3JlZEVudGl0eScpKTtcbiAgICB9XG4gICAgYXN5bmMgc2V0U2VjcmV0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgY29uc3QgcmVxdWVzdEJvZHkgPSBncWxfcXVlcmllc18xLlVudHlwZWRRdWVyaWVzLnNldChrZXksIHZhbHVlLCB0cnVlKTtcbiAgICAgICAgYXdhaXQgdGhpcy53cmFwSW5NZXRyaWMoJ3VudHlwZWQnLCAnc2V0JywgdHJ1ZSwgYXN5bmMgKCkgPT4gYXdhaXQgdGhpcy5tdXRhdGlvbihyZXF1ZXN0Qm9keSwgJ2FwcFN0b3JhZ2UnLCAnc2V0QXBwU3RvcmVkRW50aXR5JykpO1xuICAgIH1cbiAgICBhc3luYyBkZWxldGUoa2V5KSB7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RCb2R5ID0gZ3FsX3F1ZXJpZXNfMS5VbnR5cGVkUXVlcmllcy5kZWxldGUoa2V5LCBmYWxzZSk7XG4gICAgICAgIGF3YWl0IHRoaXMud3JhcEluTWV0cmljKCd1bnR5cGVkJywgJ2RlbGV0ZScsIGZhbHNlLCBhc3luYyAoKSA9PiB0aGlzLm11dGF0aW9uKHJlcXVlc3RCb2R5LCAnYXBwU3RvcmFnZScsICdkZWxldGVBcHBTdG9yZWRFbnRpdHknKSk7XG4gICAgfVxuICAgIGFzeW5jIGRlbGV0ZVNlY3JldChrZXkpIHtcbiAgICAgICAgY29uc3QgcmVxdWVzdEJvZHkgPSBncWxfcXVlcmllc18xLlVudHlwZWRRdWVyaWVzLmRlbGV0ZShrZXksIHRydWUpO1xuICAgICAgICBhd2FpdCB0aGlzLndyYXBJbk1ldHJpYygndW50eXBlZCcsICdkZWxldGUnLCB0cnVlLCBhc3luYyAoKSA9PiB0aGlzLm11dGF0aW9uKHJlcXVlc3RCb2R5LCAnYXBwU3RvcmFnZScsICdkZWxldGVBcHBTdG9yZWRFbnRpdHknKSk7XG4gICAgfVxuICAgIGFzeW5jIGdldEVudGl0eShlbnRpdHlOYW1lLCBlbnRpdHlLZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RW50aXR5SW50ZXJuYWwoZW50aXR5TmFtZSwgZW50aXR5S2V5KTtcbiAgICB9XG4gICAgYXN5bmMgc2V0RW50aXR5KGVudGl0eU5hbWUsIGVudGl0eUtleSwgdmFsdWUpIHtcbiAgICAgICAgY29uc3QgcmVxdWVzdEJvZHkgPSBncWxfcXVlcmllc18xLkN1c3RvbUVudGl0eVF1ZXJpZXMuc2V0KGVudGl0eU5hbWUsIGVudGl0eUtleSwgdmFsdWUpO1xuICAgICAgICBhd2FpdCB0aGlzLndyYXBJbk1ldHJpYygndHlwZWQnLCAnc2V0JywgZmFsc2UsIGFzeW5jICgpID0+IHRoaXMubXV0YXRpb24ocmVxdWVzdEJvZHksICdhcHBTdG9yYWdlQ3VzdG9tRW50aXR5JywgJ3NldEFwcFN0b3JlZEN1c3RvbUVudGl0eScpKTtcbiAgICB9XG4gICAgYXN5bmMgZGVsZXRlRW50aXR5KGVudGl0eU5hbWUsIGVudGl0eUtleSkge1xuICAgICAgICBjb25zdCByZXF1ZXN0Qm9keSA9IGdxbF9xdWVyaWVzXzEuQ3VzdG9tRW50aXR5UXVlcmllcy5kZWxldGUoZW50aXR5TmFtZSwgZW50aXR5S2V5KTtcbiAgICAgICAgYXdhaXQgdGhpcy53cmFwSW5NZXRyaWMoJ3R5cGVkJywgJ2RlbGV0ZScsIGZhbHNlLCBhc3luYyAoKSA9PiBhd2FpdCB0aGlzLm11dGF0aW9uKHJlcXVlc3RCb2R5LCAnYXBwU3RvcmFnZUN1c3RvbUVudGl0eScsICdkZWxldGVBcHBTdG9yZWRDdXN0b21FbnRpdHknKSk7XG4gICAgfVxuICAgIGFzeW5jIGdldEludGVybmFsKGtleSwgZW5jcnlwdGVkKSB7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RCb2R5ID0gZ3FsX3F1ZXJpZXNfMS5VbnR5cGVkUXVlcmllcy5nZXQoa2V5LCBlbmNyeXB0ZWQpO1xuICAgICAgICBjb25zdCB7IGFwcFN0b3JlZEVudGl0eTogeyB2YWx1ZSB9IH0gPSBhd2FpdCB0aGlzLndyYXBJbk1ldHJpYygndW50eXBlZCcsICdnZXQnLCBlbmNyeXB0ZWQsIGFzeW5jICgpID0+IGF3YWl0IHRoaXMucXVlcnkocmVxdWVzdEJvZHkpKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlID8/IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgYXN5bmMgZ2V0RW50aXR5SW50ZXJuYWwoZW50aXR5TmFtZSwgZW50aXR5S2V5KSB7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RCb2R5ID0gZ3FsX3F1ZXJpZXNfMS5DdXN0b21FbnRpdHlRdWVyaWVzLmdldChlbnRpdHlOYW1lLCBlbnRpdHlLZXkpO1xuICAgICAgICBjb25zdCB7IGFwcFN0b3JlZEN1c3RvbUVudGl0eTogeyB2YWx1ZSB9IH0gPSBhd2FpdCB0aGlzLndyYXBJbk1ldHJpYygndHlwZWQnLCAnZ2V0JywgZmFsc2UsIGFzeW5jICgpID0+IGF3YWl0IHRoaXMucXVlcnkocmVxdWVzdEJvZHkpKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlID8/IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgYnVpbGRSZXF1ZXN0KHJlcXVlc3RCb2R5KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlcXVlc3RCb2R5KSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIGFzeW5jIHF1ZXJ5KGJvZHkpIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmFwaUNsaWVudCh0aGlzLmVuZHBvaW50LCB0aGlzLmJ1aWxkUmVxdWVzdChib2R5KSk7XG4gICAgICAgIHJldHVybiBhd2FpdCBnZXRSZXNwb25zZUJvZHkocmVzcG9uc2UpO1xuICAgIH1cbiAgICBhc3luYyBtdXRhdGlvbihib2R5LCBuYW1lc3BhY2UsIG11dGF0aW9uTWV0aG9kKSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5hcGlDbGllbnQodGhpcy5lbmRwb2ludCwgdGhpcy5idWlsZFJlcXVlc3QoYm9keSkpO1xuICAgICAgICBjb25zdCB7IFtuYW1lc3BhY2VdOiB7IFttdXRhdGlvbk1ldGhvZF06IHsgc3VjY2VzcywgZXJyb3JzIH0gfSB9ID0gYXdhaXQgZ2V0UmVzcG9uc2VCb2R5KHJlc3BvbnNlKTtcbiAgICAgICAgYXNzZXJ0Tm9FcnJvcnMoZXJyb3JzKTtcbiAgICAgICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcnNfMS5BUElFcnJvci5mb3JTdGF0dXMoNTAwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuICAgIGFzeW5jIHdyYXBJbk1ldHJpYyhzdG9yZSwgb3BlcmF0aW9uLCBlbmNyeXB0ZWQsIGZuKSB7XG4gICAgICAgIGNvbnN0IG1ldHJpY3MgPSB0aGlzLmdldE1ldHJpY3MoKTtcbiAgICAgICAgaWYgKCFtZXRyaWNzKSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgZm4oKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0aW1lciA9IG1ldHJpY3NcbiAgICAgICAgICAgIC50aW1pbmcoJ2ZvcmdlLnJ1bnRpbWUuc3RvcmFnZS5vcGVyYXRpb24ubGF0ZW5jeScsIHsgc3RvcmUsIG9wZXJhdGlvbiwgZW5jcnlwdGVkOiBTdHJpbmcoZW5jcnlwdGVkKSB9KVxuICAgICAgICAgICAgLm1lYXN1cmUoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZuKCk7XG4gICAgICAgICAgICB0aW1lci5zdG9wKHsgc3VjY2VzczogJ3RydWUnIH0pO1xuICAgICAgICAgICAgbWV0cmljc1xuICAgICAgICAgICAgICAgIC5jb3VudGVyKCdmb3JnZS5ydW50aW1lLnN0b3JhZ2Uub3BlcmF0aW9uJywge1xuICAgICAgICAgICAgICAgIHN0b3JlLFxuICAgICAgICAgICAgICAgIG9wZXJhdGlvbixcbiAgICAgICAgICAgICAgICBlbmNyeXB0ZWQ6IFN0cmluZyhlbmNyeXB0ZWQpLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICd0cnVlJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuaW5jcigpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRpbWVyLnN0b3AoeyBzdWNjZXNzOiAnZmFsc2UnIH0pO1xuICAgICAgICAgICAgbWV0cmljc1xuICAgICAgICAgICAgICAgIC5jb3VudGVyKCdmb3JnZS5ydW50aW1lLnN0b3JhZ2Uub3BlcmF0aW9uJywge1xuICAgICAgICAgICAgICAgIHN0b3JlLFxuICAgICAgICAgICAgICAgIG9wZXJhdGlvbixcbiAgICAgICAgICAgICAgICBlbmNyeXB0ZWQ6IFN0cmluZyhlbmNyeXB0ZWQpLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICdmYWxzZSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmluY3IoKTtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5HbG9iYWxTdG9yYWdlID0gR2xvYmFsU3RvcmFnZTtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHVzZSBhcyB1bmlxdWUgb2JqZWN0IGtleS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleWFibGUodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAodHlwZSA9PSAnc3RyaW5nJyB8fCB0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ3N5bWJvbCcgfHwgdHlwZSA9PSAnYm9vbGVhbicpXG4gICAgPyAodmFsdWUgIT09ICdfX3Byb3RvX18nKVxuICAgIDogKHZhbHVlID09PSBudWxsKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0tleWFibGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0STE4blN1cHBvcnRlZE1vZHVsZUVudHJpZXMgPSBleHBvcnRzLmV4dHJhY3RJMThuUHJvcGVydGllc0Zyb21Nb2R1bGVzID0gZXhwb3J0cy5leHRyYWN0STE4bktleXNGcm9tTW9kdWxlcyA9IGV4cG9ydHMuZ2V0VHJhbnNsYXRpb25WYWx1ZSA9IHZvaWQgMDtcbmNvbnN0IHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XG50c2xpYl8xLl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9jb25zdGFudHNcIiksIGV4cG9ydHMpO1xudHNsaWJfMS5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vdHJhbnNsYXRpb25zR2V0dGVyXCIpLCBleHBvcnRzKTtcbnRzbGliXzEuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3RyYW5zbGF0b3JcIiksIGV4cG9ydHMpO1xudHNsaWJfMS5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vZW5zdXJlTG9jYWxlXCIpLCBleHBvcnRzKTtcbnZhciB0cmFuc2xhdGlvblZhbHVlR2V0dGVyXzEgPSByZXF1aXJlKFwiLi90cmFuc2xhdGlvblZhbHVlR2V0dGVyXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZ2V0VHJhbnNsYXRpb25WYWx1ZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJhbnNsYXRpb25WYWx1ZUdldHRlcl8xLmdldFRyYW5zbGF0aW9uVmFsdWU7IH0gfSk7XG52YXIgbW9kdWxlSTE4bkhlbHBlcl8xID0gcmVxdWlyZShcIi4vbW9kdWxlSTE4bkhlbHBlclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImV4dHJhY3RJMThuS2V5c0Zyb21Nb2R1bGVzXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtb2R1bGVJMThuSGVscGVyXzEuZXh0cmFjdEkxOG5LZXlzRnJvbU1vZHVsZXM7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJleHRyYWN0STE4blByb3BlcnRpZXNGcm9tTW9kdWxlc1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbW9kdWxlSTE4bkhlbHBlcl8xLmV4dHJhY3RJMThuUHJvcGVydGllc0Zyb21Nb2R1bGVzOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZ2V0STE4blN1cHBvcnRlZE1vZHVsZUVudHJpZXNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1vZHVsZUkxOG5IZWxwZXJfMS5nZXRJMThuU3VwcG9ydGVkTW9kdWxlRW50cmllczsgfSB9KTtcbnRzbGliXzEuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3R5cGVzXCIpLCBleHBvcnRzKTtcbiIsInZhciBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgYmFzZUdldFRhZyh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1N5bWJvbDtcbiIsInZhciBnZXRNYXBEYXRhID0gcmVxdWlyZSgnLi9fZ2V0TWFwRGF0YScpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIG1hcCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmhhcyhrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENhY2hlSGFzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkFQSUVycm9yID0gZXhwb3J0cy5nZXRFcnJvck1lc3NhZ2UgPSBleHBvcnRzLmdldEVycm9yTWVzc2FnZUZyb21Db2RlID0gdm9pZCAwO1xuY29uc3QgZ2V0RXJyb3JNZXNzYWdlRnJvbUNvZGUgPSAoY29kZSwgbWVzc2FnZSkgPT4ge1xuICAgIHJldHVybiBtZXNzYWdlID8/IGNvZGU7XG59O1xuZXhwb3J0cy5nZXRFcnJvck1lc3NhZ2VGcm9tQ29kZSA9IGdldEVycm9yTWVzc2FnZUZyb21Db2RlO1xuY29uc3QgZ2V0RXJyb3JNZXNzYWdlID0gKHN0YXR1c0NvZGUpID0+IHtcbiAgICBzd2l0Y2ggKHN0YXR1c0NvZGUpIHtcbiAgICAgICAgY2FzZSA0MDA6XG4gICAgICAgIGNhc2UgNDEzOlxuICAgICAgICAgICAgcmV0dXJuICdCYWQgcmVxdWVzdCc7XG4gICAgICAgIGNhc2UgNDAxOlxuICAgICAgICAgICAgcmV0dXJuICdBdXRoZW50aWNhdGlvbiBlcnJvcic7XG4gICAgICAgIGNhc2UgNDAzOlxuICAgICAgICBjYXNlIDQwNDpcbiAgICAgICAgICAgIHJldHVybiAnUGVybWlzc2lvbnMgZXJyb3Igb3Iga2V5IGRvZXMgbm90IGV4aXN0JztcbiAgICAgICAgY2FzZSA0MDk6XG4gICAgICAgICAgICByZXR1cm4gJ0NvbmZsaWN0aW5nIHVwZGF0ZSBvY2N1cnJlZCc7XG4gICAgICAgIGNhc2UgNTAwOlxuICAgICAgICAgICAgcmV0dXJuICdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIGBVbmtub3duIGVycm9yLiBSZWNlaXZlZCBzdGF0dXMgY29kZSAnJHtzdGF0dXNDb2RlfSdgO1xuICAgIH1cbn07XG5leHBvcnRzLmdldEVycm9yTWVzc2FnZSA9IGdldEVycm9yTWVzc2FnZTtcbmNsYXNzIEFQSUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgfVxuICAgIHN0YXRpYyBmb3JTdGF0dXMoc3RhdHVzKSB7XG4gICAgICAgIHJldHVybiBuZXcgQVBJRXJyb3IoKDAsIGV4cG9ydHMuZ2V0RXJyb3JNZXNzYWdlKShzdGF0dXMpKTtcbiAgICB9XG4gICAgc3RhdGljIGZvckVycm9yQ29kZShjb2RlLCBtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiBuZXcgQVBJRXJyb3IoKDAsIGV4cG9ydHMuZ2V0RXJyb3JNZXNzYWdlRnJvbUNvZGUpKGNvZGUsIG1lc3NhZ2UpKTtcbiAgICB9XG4gICAgc3RhdGljIGZvclVuZXhwZWN0ZWQobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gbmV3IEFQSUVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbn1cbmV4cG9ydHMuQVBJRXJyb3IgPSBBUElFcnJvcjtcbiIsInZhciBhc3NvY0luZGV4T2YgPSByZXF1aXJlKCcuL19hc3NvY0luZGV4T2YnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIHJldHVybiBpbmRleCA8IDAgPyB1bmRlZmluZWQgOiBkYXRhW2luZGV4XVsxXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVHZXQ7XG4iLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZyZWVHbG9iYWw7XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5tYXBgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZVxuICogc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IG1hcHBlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlNYXAoYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5TWFwO1xuIiwidmFyIGlzRnVuY3Rpb24gPSByZXF1aXJlKCcuL2lzRnVuY3Rpb24nKSxcbiAgICBpc01hc2tlZCA9IHJlcXVpcmUoJy4vX2lzTWFza2VkJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgdG9Tb3VyY2UgPSByZXF1aXJlKCcuL190b1NvdXJjZScpO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBmdW5jVG9TdHJpbmcuY2FsbChoYXNPd25Qcm9wZXJ0eSkucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYXRpdmVgIHdpdGhvdXQgYmFkIHNoaW0gY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcGF0dGVybiA9IGlzRnVuY3Rpb24odmFsdWUpID8gcmVJc05hdGl2ZSA6IHJlSXNIb3N0Q3RvcjtcbiAgcmV0dXJuIHBhdHRlcm4udGVzdCh0b1NvdXJjZSh2YWx1ZSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc05hdGl2ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuIiwiLyoqXG4gKiBQZXJmb3JtcyBhXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogMSB9O1xuICpcbiAqIF8uZXEob2JqZWN0LCBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoJ2EnLCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEoJ2EnLCBPYmplY3QoJ2EnKSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoTmFOLCBOYU4pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBlcSh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBvdGhlciB8fCAodmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXE7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYmluZEludm9jYXRpb25Db250ZXh0ID0gZXhwb3J0cy53cmFwSW5NZXRyaWNzID0gZXhwb3J0cy5nZXRBcHBDb250ZXh0ID0gZXhwb3J0cy5fX2dldFJ1bnRpbWUgPSBleHBvcnRzLk1pc3NpbmdQZXJtaXNzaW9ucyA9IGV4cG9ydHMuUGVybWlzc2lvblJlcXVpcmVtZW50cyA9IGV4cG9ydHMuUnVudGltZVBlcm1pc3Npb25zID0gZXhwb3J0cy5QZXJtaXNzaW9ucyA9IHZvaWQgMDtcbmNvbnN0IGVycm9yc18xID0gcmVxdWlyZShcIi4vZXJyb3JzXCIpO1xuY29uc3QgYXJpXzEgPSByZXF1aXJlKFwiLi9hcmlcIik7XG5jb25zdCBleHRyYWN0VXJsU3RyaW5nID0gKGl0ZW0pID0+IHtcbiAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cbiAgICBlbHNlIGlmICgnYWRkcmVzcycgaW4gaXRlbSkge1xuICAgICAgICByZXR1cm4gaXRlbS5hZGRyZXNzO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0ucmVtb3RlO1xuICAgIH1cbn07XG5jb25zdCBmb3JtYXRTY29wZXNTZWN0aW9uID0gKHNjb3BlcykgPT4ge1xuICAgIGlmIChzY29wZXMgJiYgQXJyYXkuaXNBcnJheShzY29wZXMpICYmIHNjb3Blcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBgU2NvcGVzOiAke3Njb3Blcy5qb2luKCcsICcpfWA7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcbmNvbnN0IGZvcm1hdEV4dGVybmFsU2VjdGlvbiA9IChleHRlcm5hbCkgPT4ge1xuICAgIGlmICghZXh0ZXJuYWwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IGV4dGVybmFsUGFydHMgPSBbXTtcbiAgICBPYmplY3Qua2V5cyhleHRlcm5hbCkuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgICBpZiAodHlwZSA9PT0gJ2ZldGNoJykge1xuICAgICAgICAgICAgY29uc3QgZmV0Y2hQYXJ0cyA9IGdldEZldGNoUGVybWlzc2lvbnMoZXh0ZXJuYWwuZmV0Y2gpO1xuICAgICAgICAgICAgZXh0ZXJuYWxQYXJ0cy5wdXNoKC4uLmZldGNoUGFydHMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZXh0ZXJuYWxVcmxzID0gZXh0ZXJuYWxbdHlwZV07XG4gICAgICAgICAgICBpZiAoZXh0ZXJuYWxVcmxzICYmIEFycmF5LmlzQXJyYXkoZXh0ZXJuYWxVcmxzKSAmJiBleHRlcm5hbFVybHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhcGl0YWxpemVkVHlwZSA9IHR5cGUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0eXBlLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHVybExpc3QgPSBleHRlcm5hbFVybHMubWFwKGV4dHJhY3RVcmxTdHJpbmcpLmpvaW4oJywgJyk7XG4gICAgICAgICAgICAgICAgZXh0ZXJuYWxQYXJ0cy5wdXNoKGAke2NhcGl0YWxpemVkVHlwZX06ICR7dXJsTGlzdH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBleHRlcm5hbFBhcnRzLmxlbmd0aCA+IDAgPyBgRXh0ZXJuYWw6ICR7ZXh0ZXJuYWxQYXJ0cy5qb2luKCc7ICcpfWAgOiBudWxsO1xufTtcbmNvbnN0IGdldEZldGNoUGVybWlzc2lvbnMgPSAoZmV0Y2gpID0+IHtcbiAgICBpZiAoIWZldGNoKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgY29uc3QgZmV0Y2hQYXJ0cyA9IFtdO1xuICAgIE9iamVjdC5rZXlzKGZldGNoKS5mb3JFYWNoKChmZXRjaFR5cGUpID0+IHtcbiAgICAgICAgY29uc3QgdXJscyA9IGZldGNoW2ZldGNoVHlwZV07XG4gICAgICAgIGlmICh1cmxzICYmIHVybHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgdXJsTGlzdCA9IHVybHMubWFwKGV4dHJhY3RVcmxTdHJpbmcpLmpvaW4oJywgJyk7XG4gICAgICAgICAgICBjb25zdCBjYXBpdGFsaXplZFR5cGUgPSBmZXRjaFR5cGUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBmZXRjaFR5cGUuc2xpY2UoMSk7XG4gICAgICAgICAgICBmZXRjaFBhcnRzLnB1c2goYEZldGNoICR7Y2FwaXRhbGl6ZWRUeXBlfTogJHt1cmxMaXN0fWApO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZldGNoUGFydHM7XG59O1xuY2xhc3MgUGVybWlzc2lvbnMge1xuICAgIGZvcm1hdCgpIHtcbiAgICAgICAgY29uc3QgcGFydHMgPSBbXTtcbiAgICAgICAgY29uc3Qgc2NvcGVzU2VjdGlvbiA9IGZvcm1hdFNjb3Blc1NlY3Rpb24odGhpcy5zY29wZXMpO1xuICAgICAgICBpZiAoc2NvcGVzU2VjdGlvbikge1xuICAgICAgICAgICAgcGFydHMucHVzaChzY29wZXNTZWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBleHRlcm5hbFNlY3Rpb24gPSBmb3JtYXRFeHRlcm5hbFNlY3Rpb24odGhpcy5leHRlcm5hbCk7XG4gICAgICAgIGlmIChleHRlcm5hbFNlY3Rpb24pIHtcbiAgICAgICAgICAgIHBhcnRzLnB1c2goZXh0ZXJuYWxTZWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFydHMubGVuZ3RoID4gMCA/IHBhcnRzLmpvaW4oJzsgJykgOiAnTm8gcGVybWlzc2lvbnMgc3BlY2lmaWVkJztcbiAgICB9XG59XG5leHBvcnRzLlBlcm1pc3Npb25zID0gUGVybWlzc2lvbnM7XG5jbGFzcyBSdW50aW1lUGVybWlzc2lvbnMgZXh0ZW5kcyBQZXJtaXNzaW9ucyB7XG4gICAgc2NvcGVzO1xuICAgIGV4dGVybmFsO1xuICAgIGNvbnN0cnVjdG9yKHNjb3BlcywgZXh0ZXJuYWwpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zY29wZXMgPSBzY29wZXM7XG4gICAgICAgIHRoaXMuZXh0ZXJuYWwgPSBleHRlcm5hbDtcbiAgICB9XG59XG5leHBvcnRzLlJ1bnRpbWVQZXJtaXNzaW9ucyA9IFJ1bnRpbWVQZXJtaXNzaW9ucztcbmNsYXNzIFBlcm1pc3Npb25SZXF1aXJlbWVudHMgZXh0ZW5kcyBQZXJtaXNzaW9ucyB7XG4gICAgc2NvcGVzO1xuICAgIGV4dGVybmFsO1xuICAgIGNvbnN0cnVjdG9yKHNjb3BlcywgZXh0ZXJuYWwpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zY29wZXMgPSBzY29wZXM7XG4gICAgICAgIHRoaXMuZXh0ZXJuYWwgPSBleHRlcm5hbDtcbiAgICB9XG59XG5leHBvcnRzLlBlcm1pc3Npb25SZXF1aXJlbWVudHMgPSBQZXJtaXNzaW9uUmVxdWlyZW1lbnRzO1xuY2xhc3MgTWlzc2luZ1Blcm1pc3Npb25zIGV4dGVuZHMgUGVybWlzc2lvbnMge1xuICAgIHNjb3BlcztcbiAgICBleHRlcm5hbDtcbiAgICBjb25zdHJ1Y3RvcihzY29wZXMsIGV4dGVybmFsKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc2NvcGVzID0gc2NvcGVzO1xuICAgICAgICB0aGlzLmV4dGVybmFsID0gZXh0ZXJuYWw7XG4gICAgfVxufVxuZXhwb3J0cy5NaXNzaW5nUGVybWlzc2lvbnMgPSBNaXNzaW5nUGVybWlzc2lvbnM7XG5mdW5jdGlvbiBfX2dldFJ1bnRpbWUoKSB7XG4gICAgY29uc3QgcnVudGltZSA9IGdsb2JhbC5fX2ZvcmdlX3J1bnRpbWVfXztcbiAgICBpZiAoIXJ1bnRpbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3JnZSBydW50aW1lIG5vdCBmb3VuZC4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHJ1bnRpbWU7XG59XG5leHBvcnRzLl9fZ2V0UnVudGltZSA9IF9fZ2V0UnVudGltZTtcbmZ1bmN0aW9uIGdldEFwcENvbnRleHQoKSB7XG4gICAgY29uc3QgcnVudGltZSA9IF9fZ2V0UnVudGltZSgpO1xuICAgIGNvbnN0IHsgYXBwSWQsIGFwcFZlcnNpb24sIGVudmlyb25tZW50SWQsIGVudmlyb25tZW50VHlwZSwgaW52b2NhdGlvbklkLCBpbnN0YWxsYXRpb25JZCwgbW9kdWxlS2V5LCBsaWNlbnNlLCBpbnN0YWxsYXRpb24sIHBlcm1pc3Npb25zIH0gPSBydW50aW1lLmFwcENvbnRleHQ7XG4gICAgY29uc3QgaW52b2NhdGlvblJlbWFpbmluZ1RpbWVJbk1pbGxpcyA9IHJ1bnRpbWUubGFtYmRhQ29udGV4dC5nZXRSZW1haW5pbmdUaW1lSW5NaWxsaXMgPz9cbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTGFtYmRhIHJlbWFpbmluZyB0aW1lIGlzIG5vdCBhdmFpbGFibGUuIElmIHR1bm5lbGxpbmcsIHVwZGF0ZSBGb3JnZSBDTEkgdG8gdGhlIGxhdGVzdCB2ZXJzaW9uLicpO1xuICAgICAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgICBhcHBBcmk6ICgwLCBhcmlfMS5nZXRBcHBBcmkpKGFwcElkKSxcbiAgICAgICAgYXBwVmVyc2lvbixcbiAgICAgICAgZW52aXJvbm1lbnRBcmk6ICgwLCBhcmlfMS5nZXRFbnZpcm9ubWVudEFyaSkoYXBwSWQsIGVudmlyb25tZW50SWQpLFxuICAgICAgICBlbnZpcm9ubWVudFR5cGUsXG4gICAgICAgIGluc3RhbGxhdGlvbkFyaTogKDAsIGFyaV8xLmdldEluc3RhbGxhdGlvbkFyaSkoaW5zdGFsbGF0aW9uSWQpLFxuICAgICAgICBpbnZvY2F0aW9uSWQsXG4gICAgICAgIGludm9jYXRpb25SZW1haW5pbmdUaW1lSW5NaWxsaXMsXG4gICAgICAgIG1vZHVsZUtleSxcbiAgICAgICAgbGljZW5zZSxcbiAgICAgICAgaW5zdGFsbGF0aW9uLFxuICAgICAgICBwZXJtaXNzaW9uczogbmV3IFJ1bnRpbWVQZXJtaXNzaW9ucyhwZXJtaXNzaW9ucz8uc2NvcGVzIHx8IFtdLCBwZXJtaXNzaW9ucz8uZXh0ZXJuYWwgfHwge30pXG4gICAgfTtcbn1cbmV4cG9ydHMuZ2V0QXBwQ29udGV4dCA9IGdldEFwcENvbnRleHQ7XG5mdW5jdGlvbiB3cmFwSW5NZXRyaWNzKG5hbWUsIGZuKSB7XG4gICAgcmV0dXJuIGFzeW5jICguLi5hcmdzKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgbWV0cmljcyB9ID0gX19nZXRSdW50aW1lKCk7XG4gICAgICAgIG1ldHJpY3MuY291bnRlcihuYW1lKS5pbmNyKCk7XG4gICAgICAgIGNvbnN0IHRpbWVyID0gbWV0cmljcy50aW1pbmcobmFtZSkubWVhc3VyZSgpO1xuICAgICAgICBsZXQgc3VjY2VzcyA9IHRydWU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgZm4oLi4uYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHVuZGljaUVycm9yID0gZ2xvYmFsLl9fZm9yZ2VfdW5kaWNpX2Vycm9yX187XG4gICAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIGVycm9yc18xLlByb3h5UmVxdWVzdEVycm9yIHx8XG4gICAgICAgICAgICAgICAgKHVuZGljaUVycm9yICYmIHR5cGVvZiB1bmRpY2lFcnJvciA9PT0gJ2Z1bmN0aW9uJyAmJiBlIGluc3RhbmNlb2YgdW5kaWNpRXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRpbWVyLnN0b3AoeyBzdWNjZXNzOiBzdWNjZXNzLnRvU3RyaW5nKCkgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZXhwb3J0cy53cmFwSW5NZXRyaWNzID0gd3JhcEluTWV0cmljcztcbmZ1bmN0aW9uIGJpbmRJbnZvY2F0aW9uQ29udGV4dChmbikge1xuICAgIGNvbnN0IEFzeW5jTG9jYWxTdG9yYWdlID0gcmVxdWlyZSgnYXN5bmNfaG9va3MnKS5Bc3luY0xvY2FsU3RvcmFnZTtcbiAgICByZXR1cm4gQXN5bmNMb2NhbFN0b3JhZ2UuYmluZChmbik7XG59XG5leHBvcnRzLmJpbmRJbnZvY2F0aW9uQ29udGV4dCA9IGJpbmRJbnZvY2F0aW9uQ29udGV4dDtcbiIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb3ZlcnJlYWNoaW5nIGNvcmUtanMgc2hpbXMuICovXG52YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcmVKc0RhdGE7XG4iLCJ2YXIgbmF0aXZlQ3JlYXRlID0gcmVxdWlyZSgnLi9fbmF0aXZlQ3JlYXRlJyk7XG5cbi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqXG4gKiBTZXRzIHRoZSBoYXNoIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaGFzaCBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gaGFzaFNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgdGhpcy5zaXplICs9IHRoaXMuaGFzKGtleSkgPyAwIDogMTtcbiAgZGF0YVtrZXldID0gKG5hdGl2ZUNyZWF0ZSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IEhBU0hfVU5ERUZJTkVEIDogdmFsdWU7XG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hTZXQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMud2ViVHJpZ2dlciA9IHZvaWQgMDtcbmNvbnN0IHJ1bnRpbWVfMSA9IHJlcXVpcmUoXCIuL2FwaS9ydW50aW1lXCIpO1xuY29uc3QgZmV0Y2hfMSA9IHJlcXVpcmUoXCIuL2FwaS9mZXRjaFwiKTtcbmNvbnN0IHByb3h5R2V0V2ViVHJpZ2dlclVSTCA9ICgwLCBydW50aW1lXzEud3JhcEluTWV0cmljcykoJ2FwaS5nZXRXZWJUcmlnZ2VyVXJsJywgYXN5bmMgKHdlYlRyaWdnZXJNb2R1bGVLZXksIGZvcmNlQ3JlYXRlKSA9PiB7XG4gICAgY29uc3QgcnVudGltZSA9ICgwLCBydW50aW1lXzEuX19nZXRSdW50aW1lKSgpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgKDAsIGZldGNoXzEuX19yZXF1ZXN0QXRsYXNzaWFuQXNBcHApKCcvZ3JhcGhxbCcsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBxdWVyeTogYFxuICAgICAgICAgICAgbXV0YXRpb24gZm9yZ2VfYXBwX2NyZWF0ZVdlYlRyaWdnZXJVcmwoJGlucHV0OiBXZWJUcmlnZ2VyVXJsSW5wdXQhLCAkZm9yY2VDcmVhdGU6IEJvb2xlYW4pIHtcbiAgICAgICAgICAgICAgY3JlYXRlV2ViVHJpZ2dlclVybChpbnB1dDogJGlucHV0LCBmb3JjZUNyZWF0ZTogJGZvcmNlQ3JlYXRlKSB7XG4gICAgICAgICAgICAgICAgdXJsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBgLFxuICAgICAgICAgICAgdmFyaWFibGVzOiB7XG4gICAgICAgICAgICAgICAgaW5wdXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgYXBwSWQ6IHJ1bnRpbWUuYXBwQ29udGV4dC5hcHBJZCxcbiAgICAgICAgICAgICAgICAgICAgZW52SWQ6IHJ1bnRpbWUuYXBwQ29udGV4dC5lbnZpcm9ubWVudElkLFxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyS2V5OiB3ZWJUcmlnZ2VyTW9kdWxlS2V5LFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0SWQ6IHJ1bnRpbWUuY29udGV4dEFyaVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZm9yY2VDcmVhdGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KTtcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW50ZXJuYWwgZXJyb3Igb2NjdXJyZWQ6IEZhaWxlZCB0byBnZXQgd2ViIHRyaWdnZXIgVVJMOiAke3Jlc3BvbnNlLnN0YXR1c1RleHR9LmApO1xuICAgIH1cbiAgICBjb25zdCByZXNwb25zZUJvZHkgPSAoYXdhaXQgcmVzcG9uc2UuanNvbigpKTtcbiAgICBpZiAoIXJlc3BvbnNlQm9keT8uZGF0YT8uY3JlYXRlV2ViVHJpZ2dlclVybD8udXJsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW50ZXJuYWwgZXJyb3Igb2NjdXJyZWQ6IEZhaWxlZCB0byBnZXQgd2ViIHRyaWdnZXIgVVJMLmApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzcG9uc2VCb2R5LmRhdGEuY3JlYXRlV2ViVHJpZ2dlclVybC51cmw7XG59KTtcbmNvbnN0IHByb3h5RGVsZXRlV2ViVHJpZ2dlclVSTCA9ICgwLCBydW50aW1lXzEud3JhcEluTWV0cmljcykoJ2FwaS5kZWxldGVXZWJUcmlnZ2VyVXJsJywgYXN5bmMgKHdlYlRyaWdnZXJVcmwpID0+IHtcbiAgICBjb25zdCBjYWxsRGVsZXRlID0gYXN5bmMgKHdlYlRyaWdnZXJVcmxJZCkgPT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0ICgwLCBmZXRjaF8xLl9fcmVxdWVzdEF0bGFzc2lhbkFzQXBwKSgnL2dyYXBocWwnLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiBgXG4gICAgICAgICAgICBtdXRhdGlvbiBmb3JnZV9hcHBfZGVsZXRlV2ViVHJpZ2dlclVybCgkaWQ6IElEISkge1xuICAgICAgICAgICAgICBkZWxldGVXZWJUcmlnZ2VyVXJsKGlkOiAkaWQpIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzXG4gICAgICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgYCxcbiAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHdlYlRyaWdnZXJVcmxJZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludGVybmFsIGVycm9yIG9jY3VycmVkOiBGYWlsZWQgdG8gZGVsZXRlIHdlYiB0cmlnZ2VyIFVSTDogJHtyZXNwb25zZS5zdGF0dXNUZXh0fS5gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXNwb25zZUJvZHkgPSAoYXdhaXQgcmVzcG9uc2UuanNvbigpKTtcbiAgICAgICAgaWYgKCFyZXNwb25zZUJvZHk/LmRhdGE/LmRlbGV0ZVdlYlRyaWdnZXJVcmw/LnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yVGV4dCA9IHJlc3BvbnNlQm9keT8uZGF0YT8uZGVsZXRlV2ViVHJpZ2dlclVybD8ubWVzc2FnZSB8fCAndW5rbm93biBlcnJvcic7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludGVybmFsIGVycm9yIG9jY3VycmVkOiBGYWlsZWQgdG8gZGVsZXRlIHdlYiB0cmlnZ2VyIFVSTDogJHtlcnJvclRleHR9YCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IHVybElkcyA9IGF3YWl0IGV4cG9ydHMud2ViVHJpZ2dlci5nZXRVcmxJZHMod2ViVHJpZ2dlclVybCk7XG4gICAgZm9yIChjb25zdCB1cmxJZCBvZiB1cmxJZHMpIHtcbiAgICAgICAgYXdhaXQgY2FsbERlbGV0ZSh1cmxJZCk7XG4gICAgfVxufSk7XG5jb25zdCBwcm94eUdldFdlYlRyaWdnZXJVcmxJZHMgPSAoMCwgcnVudGltZV8xLndyYXBJbk1ldHJpY3MpKCdhcGkuZ2V0V2ViVHJpZ2dlclVybElkcycsIGFzeW5jICh3ZWJUcmlnZ2VyVXJsKSA9PiB7XG4gICAgY29uc3QgcnVudGltZSA9ICgwLCBydW50aW1lXzEuX19nZXRSdW50aW1lKSgpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgKDAsIGZldGNoXzEuX19yZXF1ZXN0QXRsYXNzaWFuQXNBcHApKCcvZ3JhcGhxbCcsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBxdWVyeTogYFxuICAgICAgICAgICAgcXVlcnkgZm9yZ2VfYXBwX3dlYlRyaWdnZXJVcmxzQnlBcHBDb250ZXh0KCRhcHBJZDogSUQhLCAkZW52SWQ6IElEISwgJGNvbnRleHRJZDogSUQhKSB7XG4gICAgICAgICAgICAgIHdlYlRyaWdnZXJVcmxzQnlBcHBDb250ZXh0KGFwcElkOiAkYXBwSWQsIGVudklkOiAkZW52SWQsIGNvbnRleHRJZDogJGNvbnRleHRJZCkge1xuICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgdXJsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBgLFxuICAgICAgICAgICAgdmFyaWFibGVzOiB7XG4gICAgICAgICAgICAgICAgYXBwSWQ6IHJ1bnRpbWUuYXBwQ29udGV4dC5hcHBJZCxcbiAgICAgICAgICAgICAgICBlbnZJZDogcnVudGltZS5hcHBDb250ZXh0LmVudmlyb25tZW50SWQsXG4gICAgICAgICAgICAgICAgY29udGV4dElkOiBydW50aW1lLmNvbnRleHRBcmlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KTtcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW50ZXJuYWwgZXJyb3Igb2NjdXJyZWQ6IEZhaWxlZCB0byBnZXQgd2ViIHRyaWdnZXIgVVJMczogJHtyZXNwb25zZS5zdGF0dXNUZXh0fS5gKTtcbiAgICB9XG4gICAgY29uc3QgcmVzcG9uc2VCb2R5ID0gKGF3YWl0IHJlc3BvbnNlLmpzb24oKSk7XG4gICAgaWYgKCFyZXNwb25zZUJvZHk/LmRhdGE/LndlYlRyaWdnZXJVcmxzQnlBcHBDb250ZXh0IHx8IHJlc3BvbnNlQm9keS5kYXRhLndlYlRyaWdnZXJVcmxzQnlBcHBDb250ZXh0Lmxlbmd0aCA9PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW50ZXJuYWwgZXJyb3Igb2NjdXJyZWQ6IE5vIHdlYiB0cmlnZ2VyIFVSTHMgZm91bmQnKTtcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0ID0gcmVzcG9uc2VCb2R5LmRhdGEud2ViVHJpZ2dlclVybHNCeUFwcENvbnRleHRcbiAgICAgICAgLmZpbHRlcigod2ViVHJpZ2dlclJlc3VsdCkgPT4gd2ViVHJpZ2dlclJlc3VsdC51cmwgPT0gd2ViVHJpZ2dlclVybClcbiAgICAgICAgLm1hcCgod2ViVHJpZ2dlclJlc3VsdCkgPT4gd2ViVHJpZ2dlclJlc3VsdC5pZCk7XG4gICAgaWYgKCFyZXN1bHQgfHwgcmVzdWx0Lmxlbmd0aCA9PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW50ZXJuYWwgZXJyb3Igb2NjdXJyZWQ6IFdlYiB0cmlnZ2VyIFVSTCBtYXRjaGluZyBVUkwgbm90IGZvdW5kJyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59KTtcbmV4cG9ydHMud2ViVHJpZ2dlciA9IHtcbiAgICBnZXRVcmw6IGFzeW5jICh3ZWJUcmlnZ2VyTW9kdWxlS2V5LCBmb3JjZUNyZWF0ZSA9IGZhbHNlKSA9PiBwcm94eUdldFdlYlRyaWdnZXJVUkwod2ViVHJpZ2dlck1vZHVsZUtleSwgZm9yY2VDcmVhdGUpLFxuICAgIGRlbGV0ZVVybDogYXN5bmMgKHdlYlRyaWdnZXJVcmwpID0+IHByb3h5RGVsZXRlV2ViVHJpZ2dlclVSTCh3ZWJUcmlnZ2VyVXJsKSxcbiAgICBnZXRVcmxJZHM6IGFzeW5jICh3ZWJUcmlnZ2VyVXJsKSA9PiBwcm94eUdldFdlYlRyaWdnZXJVcmxJZHMod2ViVHJpZ2dlclVybClcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ3VzdG9tRW50aXR5SW5kZXhCdWlsZGVyID0gZXhwb3J0cy5BUElFcnJvciA9IGV4cG9ydHMuU29ydE9yZGVyID0gZXhwb3J0cy5FbnRpdHlTdG9yYWdlQnVpbGRlciA9IGV4cG9ydHMuRmlsdGVyQ29uZGl0aW9ucyA9IGV4cG9ydHMuV2hlcmVDb25kaXRpb25zID0gZXhwb3J0cy5zdGFydHNXaXRoID0gZXhwb3J0cy5HbG9iYWxTdG9yYWdlID0gZXhwb3J0cy5nZXRTdG9yYWdlSW5zdGFuY2VXaXRoUXVlcnkgPSB2b2lkIDA7XG5jb25zdCBlbnRpdHlfc3RvcmFnZV8xID0gcmVxdWlyZShcIi4vZW50aXR5LXN0b3JhZ2VcIik7XG5jb25zdCBxdWVyeV9hcGlfMSA9IHJlcXVpcmUoXCIuL3F1ZXJ5LWFwaVwiKTtcbmNvbnN0IGdldFN0b3JhZ2VJbnN0YW5jZVdpdGhRdWVyeSA9IChhZGFwdGVyKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0OiBhZGFwdGVyLmdldC5iaW5kKGFkYXB0ZXIpLFxuICAgICAgICBzZXQ6IGFkYXB0ZXIuc2V0LmJpbmQoYWRhcHRlciksXG4gICAgICAgIGRlbGV0ZTogYWRhcHRlci5kZWxldGUuYmluZChhZGFwdGVyKSxcbiAgICAgICAgZ2V0U2VjcmV0OiBhZGFwdGVyLmdldFNlY3JldC5iaW5kKGFkYXB0ZXIpLFxuICAgICAgICBzZXRTZWNyZXQ6IGFkYXB0ZXIuc2V0U2VjcmV0LmJpbmQoYWRhcHRlciksXG4gICAgICAgIGRlbGV0ZVNlY3JldDogYWRhcHRlci5kZWxldGVTZWNyZXQuYmluZChhZGFwdGVyKSxcbiAgICAgICAgcXVlcnk6ICgpID0+IG5ldyBxdWVyeV9hcGlfMS5EZWZhdWx0UXVlcnlCdWlsZGVyKGFkYXB0ZXIpLFxuICAgICAgICBlbnRpdHk6IChlbnRpdHlOYW1lKSA9PiBuZXcgZW50aXR5X3N0b3JhZ2VfMS5FbnRpdHlTdG9yYWdlQnVpbGRlcihlbnRpdHlOYW1lLCBhZGFwdGVyKVxuICAgIH07XG59O1xuZXhwb3J0cy5nZXRTdG9yYWdlSW5zdGFuY2VXaXRoUXVlcnkgPSBnZXRTdG9yYWdlSW5zdGFuY2VXaXRoUXVlcnk7XG52YXIgZ2xvYmFsX3N0b3JhZ2VfMSA9IHJlcXVpcmUoXCIuL2dsb2JhbC1zdG9yYWdlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiR2xvYmFsU3RvcmFnZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZ2xvYmFsX3N0b3JhZ2VfMS5HbG9iYWxTdG9yYWdlOyB9IH0pO1xudmFyIGNvbmRpdGlvbnNfMSA9IHJlcXVpcmUoXCIuL2NvbmRpdGlvbnNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzdGFydHNXaXRoXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25kaXRpb25zXzEuc3RhcnRzV2l0aDsgfSB9KTtcbnZhciBjb25kaXRpb25zXzIgPSByZXF1aXJlKFwiLi9lYXAvY29uZGl0aW9uc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIldoZXJlQ29uZGl0aW9uc1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29uZGl0aW9uc18yLldoZXJlQ29uZGl0aW9uczsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkZpbHRlckNvbmRpdGlvbnNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbmRpdGlvbnNfMi5GaWx0ZXJDb25kaXRpb25zOyB9IH0pO1xudmFyIGVudGl0eV9zdG9yYWdlXzIgPSByZXF1aXJlKFwiLi9lbnRpdHktc3RvcmFnZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkVudGl0eVN0b3JhZ2VCdWlsZGVyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBlbnRpdHlfc3RvcmFnZV8yLkVudGl0eVN0b3JhZ2VCdWlsZGVyOyB9IH0pO1xudmFyIHF1ZXJ5X2ludGVyZmFjZXNfMSA9IHJlcXVpcmUoXCIuL3F1ZXJ5LWludGVyZmFjZXNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJTb3J0T3JkZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHF1ZXJ5X2ludGVyZmFjZXNfMS5Tb3J0T3JkZXI7IH0gfSk7XG52YXIgZXJyb3JzXzEgPSByZXF1aXJlKFwiLi9lcnJvcnNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJBUElFcnJvclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZXJyb3JzXzEuQVBJRXJyb3I7IH0gfSk7XG52YXIgcXVlcnlfYXBpXzIgPSByZXF1aXJlKFwiLi9lbnRpdHktc3RvcmFnZS9xdWVyeS1hcGlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJDdXN0b21FbnRpdHlJbmRleEJ1aWxkZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHF1ZXJ5X2FwaV8yLkN1c3RvbUVudGl0eUluZGV4QnVpbGRlcjsgfSB9KTtcbiIsInZhciBlcSA9IHJlcXVpcmUoJy4vZXEnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgYGtleWAgaXMgZm91bmQgaW4gYGFycmF5YCBvZiBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSBrZXkgVGhlIGtleSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKGVxKGFycmF5W2xlbmd0aF1bMF0sIGtleSkpIHtcbiAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc3NvY0luZGV4T2Y7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XG50c2xpYl8xLl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9lZ3Jlc3NcIiksIGV4cG9ydHMpO1xuIiwidmFyIGJhc2VJc05hdGl2ZSA9IHJlcXVpcmUoJy4vX2Jhc2VJc05hdGl2ZScpLFxuICAgIGdldFZhbHVlID0gcmVxdWlyZSgnLi9fZ2V0VmFsdWUnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXROYXRpdmU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc3RhcnRzV2l0aCA9IHZvaWQgMDtcbmZ1bmN0aW9uIHN0YXJ0c1dpdGgodmFsdWUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBjb25kaXRpb246ICdTVEFSVFNfV0lUSCcsXG4gICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgIH07XG59XG5leHBvcnRzLnN0YXJ0c1dpdGggPSBzdGFydHNXaXRoO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pMThuID0gZXhwb3J0cy5jcmVhdGVUcmFuc2xhdGlvbkZ1bmN0aW9uID0gZXhwb3J0cy5nZXRUcmFuc2xhdGlvbnMgPSBleHBvcnRzLnJlc2V0VHJhbnNsYXRpb25zQ2FjaGUgPSB2b2lkIDA7XG5jb25zdCBpMThuXzEgPSByZXF1aXJlKFwiQGZvcmdlL2kxOG5cIik7XG5jb25zdCBmc18xID0gcmVxdWlyZShcImZzXCIpO1xuY29uc3QgcGF0aF8xID0gcmVxdWlyZShcInBhdGhcIik7XG5jb25zdCBydW50aW1lXzEgPSByZXF1aXJlKFwiLi9ydW50aW1lXCIpO1xuY29uc3QgZ2V0STE4bkJ1bmRsZUZvbGRlclBhdGggPSAoKSA9PiB7XG4gICAgY29uc3QgeyBhcHBDb2RlRGlyIH0gPSAoMCwgcnVudGltZV8xLl9fZ2V0UnVudGltZSkoKS5jb250YWluZXI7XG4gICAgcmV0dXJuIGFwcENvZGVEaXIgPyBbYXBwQ29kZURpciwgaTE4bl8xLkkxOE5fQlVORExFX0ZPTERFUl9OQU1FXSA6IFtpMThuXzEuSTE4Tl9CVU5ETEVfRk9MREVSX05BTUVdO1xufTtcbmNvbnN0IHJlYWRMb2NhbGVGaWxlQ29udGVudCA9IGFzeW5jIChmaWxlUGF0aCkgPT4ge1xuICAgIGNvbnN0IGZpbGVDb250ZW50ID0gYXdhaXQgZnNfMS5wcm9taXNlcy5yZWFkRmlsZSgoMCwgcGF0aF8xLmpvaW4pKC4uLmdldEkxOG5CdW5kbGVGb2xkZXJQYXRoKCksIGZpbGVQYXRoKSk7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoZmlsZUNvbnRlbnQudG9TdHJpbmcoKSk7XG59O1xuY29uc3QgbWFrZVJlc291cmNlQWNjZXNzb3JFcnJvck1lc3NhZ2UgPSAobWVzc2FnZSkgPT4ge1xuICAgIGlmIChnbG9iYWwuX19mb3JnZV90dW5uZWxfXykge1xuICAgICAgICBjb25zdCBjbGlVcGRhdGVXYXJuaW5nID0gJ1RvIGFjY2VzcyBpMThuIHJlc291cmNlcyB3aGlsZSB1c2luZyBgZm9yZ2UgdHVubmVsYCwgcGxlYXNlIGVuc3VyZSB0aGF0IHlvdXIgRm9yZ2UgQ0xJIGlzIHVwIHRvIGRhdGUuIFJ1biBgbnBtIGluc3RhbGwgLWcgQGZvcmdlL2NsaWAgdG8gdXBkYXRlIHRvIHRoZSBsYXRlc3QgdmVyc2lvbi4nO1xuICAgICAgICByZXR1cm4gYCR7bWVzc2FnZX1cXG4ke2NsaVVwZGF0ZVdhcm5pbmd9YDtcbiAgICB9XG4gICAgcmV0dXJuIG1lc3NhZ2U7XG59O1xuY29uc3QgcmVzb2x2ZXJSZXNvdXJjZXNBY2Nlc3NvciA9IHtcbiAgICBnZXRJMThuSW5mb0NvbmZpZzogYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgaW5mbyA9IChhd2FpdCByZWFkTG9jYWxlRmlsZUNvbnRlbnQoaTE4bl8xLkkxOE5fSU5GT19GSUxFX05BTUUpKTtcbiAgICAgICAgICAgIHJldHVybiBpbmZvLmNvbmZpZztcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBpMThuXzEuVHJhbnNsYXRpb25HZXR0ZXJFcnJvcihtYWtlUmVzb3VyY2VBY2Nlc3NvckVycm9yTWVzc2FnZSgnRmFpbGVkIHRvIGdldCBpMThuIGluZm8gY29uZmlnLicpKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0VHJhbnNsYXRpb25SZXNvdXJjZTogYXN5bmMgKGxvY2FsZSkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHJlYWRMb2NhbGVGaWxlQ29udGVudChgJHtsb2NhbGV9Lmpzb25gKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBpMThuXzEuVHJhbnNsYXRpb25HZXR0ZXJFcnJvcihtYWtlUmVzb3VyY2VBY2Nlc3NvckVycm9yTWVzc2FnZShgRmFpbGVkIHRvIGdldCB0cmFuc2xhdGlvbiByZXNvdXJjZSBmb3IgbG9jYWxlOiAke2xvY2FsZX0uYCkpO1xuICAgICAgICB9XG4gICAgfVxufTtcbmNvbnN0IHRyYW5zbGF0aW9uc0Z1bmN0aW9uQ2FjaGUgPSBuZXcgTWFwKCk7XG5jb25zdCB0cmFuc2xhdGlvbnNHZXR0ZXIgPSBuZXcgaTE4bl8xLlRyYW5zbGF0aW9uc0dldHRlcihyZXNvbHZlclJlc291cmNlc0FjY2Vzc29yKTtcbmNvbnN0IHJlc2V0VHJhbnNsYXRpb25zQ2FjaGUgPSAoKSA9PiB7XG4gICAgdHJhbnNsYXRpb25zR2V0dGVyLnJlc2V0KCk7XG4gICAgdHJhbnNsYXRpb25zRnVuY3Rpb25DYWNoZS5jbGVhcigpO1xufTtcbmV4cG9ydHMucmVzZXRUcmFuc2xhdGlvbnNDYWNoZSA9IHJlc2V0VHJhbnNsYXRpb25zQ2FjaGU7XG5jb25zdCBnZXRUcmFuc2xhdGlvbnMgPSBhc3luYyAocmF3TG9jYWxlLCBvcHRpb25zID0ge1xuICAgIGZhbGxiYWNrOiB0cnVlXG59KSA9PiB7XG4gICAgY29uc3QgbG9jYWxlID0gZG9FbnN1cmVMb2NhbGUocmF3TG9jYWxlKTtcbiAgICByZXR1cm4gYXdhaXQgdHJhbnNsYXRpb25zR2V0dGVyLmdldFRyYW5zbGF0aW9ucyhsb2NhbGUsIG9wdGlvbnMpO1xufTtcbmV4cG9ydHMuZ2V0VHJhbnNsYXRpb25zID0gZ2V0VHJhbnNsYXRpb25zO1xuY29uc3QgY3JlYXRlVHJhbnNsYXRpb25GdW5jdGlvbiA9IGFzeW5jIChyYXdMb2NhbGUpID0+IHtcbiAgICBjb25zdCBsb2NhbGUgPSBkb0Vuc3VyZUxvY2FsZShyYXdMb2NhbGUpO1xuICAgIGxldCB0cmFuc2xhdG9yID0gdHJhbnNsYXRpb25zRnVuY3Rpb25DYWNoZS5nZXQobG9jYWxlKTtcbiAgICBpZiAoIXRyYW5zbGF0b3IpIHtcbiAgICAgICAgdHJhbnNsYXRvciA9IGF3YWl0IGNyZWF0ZVRyYW5zbGF0aW9uRnVuY3Rpb25JbXBsKGxvY2FsZSk7XG4gICAgICAgIHRyYW5zbGF0aW9uc0Z1bmN0aW9uQ2FjaGUuc2V0KGxvY2FsZSwgdHJhbnNsYXRvcik7XG4gICAgfVxuICAgIHJldHVybiB0cmFuc2xhdG9yO1xufTtcbmV4cG9ydHMuY3JlYXRlVHJhbnNsYXRpb25GdW5jdGlvbiA9IGNyZWF0ZVRyYW5zbGF0aW9uRnVuY3Rpb247XG5jb25zdCBkb0Vuc3VyZUxvY2FsZSA9IChyYXdMb2NhbGUpID0+IHtcbiAgICBjb25zdCBlbnN1cmVkTG9jYWxlID0gKDAsIGkxOG5fMS5lbnN1cmVMb2NhbGUpKHJhd0xvY2FsZSk7XG4gICAgaWYgKCFlbnN1cmVkTG9jYWxlKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgVGhlIGxvY2FsZSBcIiR7cmF3TG9jYWxlfVwiIGlzIG5vdCBzdXBwb3J0ZWQsIGRlZmF1bHRpbmcgdG8gdGhlIGRlZmF1bHQgbG9jYWxlLmApO1xuICAgICAgICByZXR1cm4gcmF3TG9jYWxlO1xuICAgIH1cbiAgICByZXR1cm4gZW5zdXJlZExvY2FsZTtcbn07XG5jb25zdCBjcmVhdGVUcmFuc2xhdGlvbkZ1bmN0aW9uSW1wbCA9IGFzeW5jIChsb2NhbGUpID0+IHtcbiAgICBjb25zdCB0cmFuc2xhdG9yID0gbmV3IGkxOG5fMS5UcmFuc2xhdG9yKGxvY2FsZSwgdHJhbnNsYXRpb25zR2V0dGVyKTtcbiAgICBhd2FpdCB0cmFuc2xhdG9yLmluaXQoKTtcbiAgICByZXR1cm4gKGkxOG5LZXksIGRlZmF1bHRWYWx1ZSkgPT4gdHJhbnNsYXRvci50cmFuc2xhdGUoaTE4bktleSkgPz8gZGVmYXVsdFZhbHVlID8/IGkxOG5LZXk7XG59O1xuZXhwb3J0cy5pMThuID0ge1xuICAgIGNyZWF0ZVRyYW5zbGF0aW9uRnVuY3Rpb246IGV4cG9ydHMuY3JlYXRlVHJhbnNsYXRpb25GdW5jdGlvbixcbiAgICBnZXRUcmFuc2xhdGlvbnM6IGV4cG9ydHMuZ2V0VHJhbnNsYXRpb25zXG59O1xuIiwidmFyIG5hdGl2ZUNyZWF0ZSA9IHJlcXVpcmUoJy4vX25hdGl2ZUNyZWF0ZScpO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogR2V0cyB0aGUgaGFzaCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBoYXNoR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChuYXRpdmVDcmVhdGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gZGF0YVtrZXldO1xuICAgIHJldHVybiByZXN1bHQgPT09IEhBU0hfVU5ERUZJTkVEID8gdW5kZWZpbmVkIDogcmVzdWx0O1xuICB9XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkgPyBkYXRhW2tleV0gOiB1bmRlZmluZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaEdldDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5UcmFuc2xhdGlvbnNHZXR0ZXIgPSBleHBvcnRzLlRyYW5zbGF0aW9uR2V0dGVyRXJyb3IgPSB2b2lkIDA7XG5jb25zdCBwdXNoSWZOb3RFeGlzdHMgPSAoYXJyYXksIGl0ZW0pID0+IHtcbiAgICBpZiAoIWFycmF5LmluY2x1ZGVzKGl0ZW0pKSB7XG4gICAgICAgIGFycmF5LnB1c2goaXRlbSk7XG4gICAgfVxufTtcbmNsYXNzIFRyYW5zbGF0aW9uR2V0dGVyRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5uYW1lID0gJ1RyYW5zbGF0aW9uR2V0dGVyRXJyb3InO1xuICAgIH1cbn1cbmV4cG9ydHMuVHJhbnNsYXRpb25HZXR0ZXJFcnJvciA9IFRyYW5zbGF0aW9uR2V0dGVyRXJyb3I7XG5jbGFzcyBUcmFuc2xhdGlvbnNHZXR0ZXIge1xuICAgIHJlc291cmNlc0FjY2Vzc29yO1xuICAgIGkxOG5JbmZvQ29uZmlnID0gbnVsbDtcbiAgICB0cmFuc2xhdGlvblJlc291cmNlcyA9IG5ldyBNYXAoKTtcbiAgICBjb25zdHJ1Y3RvcihyZXNvdXJjZXNBY2Nlc3Nvcikge1xuICAgICAgICB0aGlzLnJlc291cmNlc0FjY2Vzc29yID0gcmVzb3VyY2VzQWNjZXNzb3I7XG4gICAgfVxuICAgIGFzeW5jIGdldFRyYW5zbGF0aW9ucyhsb2NhbGUsIG9wdGlvbnMgPSB7IGZhbGxiYWNrOiB0cnVlIH0pIHtcbiAgICAgICAgY29uc3QgaTE4bkluZm9Db25maWcgPSBhd2FpdCB0aGlzLmdldEkxOG5JbmZvQ29uZmlnKCk7XG4gICAgICAgIGNvbnN0IHsgZmFsbGJhY2sgfSA9IG9wdGlvbnM7XG4gICAgICAgIGlmICghZmFsbGJhY2spIHtcbiAgICAgICAgICAgIGxldCB0cmFuc2xhdGlvblJlc291cmNlO1xuICAgICAgICAgICAgaWYgKGkxOG5JbmZvQ29uZmlnLmxvY2FsZXMuaW5jbHVkZXMobG9jYWxlKSkge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uUmVzb3VyY2UgPSBhd2FpdCB0aGlzLmdldFRyYW5zbGF0aW9uUmVzb3VyY2UobG9jYWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb25zOiB0cmFuc2xhdGlvblJlc291cmNlID8/IG51bGwsXG4gICAgICAgICAgICAgICAgbG9jYWxlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgdGFyZ2V0TG9jYWxlIG9mIHRoaXMuZ2V0TG9jYWxlTG9va3VwT3JkZXIobG9jYWxlLCBpMThuSW5mb0NvbmZpZykpIHtcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zbGF0aW9uUmVzb3VyY2UgPSBhd2FpdCB0aGlzLmdldFRyYW5zbGF0aW9uUmVzb3VyY2UodGFyZ2V0TG9jYWxlKTtcbiAgICAgICAgICAgIGlmICh0cmFuc2xhdGlvblJlc291cmNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRpb25zOiB0cmFuc2xhdGlvblJlc291cmNlLFxuICAgICAgICAgICAgICAgICAgICBsb2NhbGU6IHRhcmdldExvY2FsZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uczogbnVsbCxcbiAgICAgICAgICAgIGxvY2FsZVxuICAgICAgICB9O1xuICAgIH1cbiAgICBhc3luYyBnZXRUcmFuc2xhdGlvbnNCeUxvY2FsZUxvb2t1cE9yZGVyKGxvY2FsZSkge1xuICAgICAgICBjb25zdCBpMThuSW5mb0NvbmZpZyA9IGF3YWl0IHRoaXMuZ2V0STE4bkluZm9Db25maWcoKTtcbiAgICAgICAgY29uc3QgbG9va3VwT3JkZXIgPSB0aGlzLmdldExvY2FsZUxvb2t1cE9yZGVyKGxvY2FsZSwgaTE4bkluZm9Db25maWcpO1xuICAgICAgICByZXR1cm4gYXdhaXQgUHJvbWlzZS5hbGwobG9va3VwT3JkZXIubWFwKGFzeW5jICh0YXJnZXRMb2NhbGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zbGF0aW9uUmVzb3VyY2UgPSBhd2FpdCB0aGlzLmdldFRyYW5zbGF0aW9uUmVzb3VyY2UodGFyZ2V0TG9jYWxlKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbG9jYWxlOiB0YXJnZXRMb2NhbGUsXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb25zOiB0cmFuc2xhdGlvblJlc291cmNlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KSk7XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLmkxOG5JbmZvQ29uZmlnID0gbnVsbDtcbiAgICAgICAgdGhpcy50cmFuc2xhdGlvblJlc291cmNlcy5jbGVhcigpO1xuICAgIH1cbiAgICBhc3luYyBnZXRUcmFuc2xhdGlvblJlc291cmNlKGxvY2FsZSkge1xuICAgICAgICBsZXQgcmVzb3VyY2UgPSB0aGlzLnRyYW5zbGF0aW9uUmVzb3VyY2VzLmdldChsb2NhbGUpO1xuICAgICAgICBpZiAoIXJlc291cmNlKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJlc291cmNlID0gYXdhaXQgdGhpcy5yZXNvdXJjZXNBY2Nlc3Nvci5nZXRUcmFuc2xhdGlvblJlc291cmNlKGxvY2FsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2xhdGlvblJlc291cmNlcy5zZXQobG9jYWxlLCByZXNvdXJjZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBUcmFuc2xhdGlvbkdldHRlckVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHJhbnNsYXRpb25HZXR0ZXJFcnJvcihgRmFpbGVkIHRvIGdldCB0cmFuc2xhdGlvbiByZXNvdXJjZSBmb3IgbG9jYWxlOiAke2xvY2FsZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzb3VyY2U7XG4gICAgfVxuICAgIGFzeW5jIGdldEkxOG5JbmZvQ29uZmlnKCkge1xuICAgICAgICBpZiAoIXRoaXMuaTE4bkluZm9Db25maWcpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pMThuSW5mb0NvbmZpZyA9IGF3YWl0IHRoaXMucmVzb3VyY2VzQWNjZXNzb3IuZ2V0STE4bkluZm9Db25maWcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIFRyYW5zbGF0aW9uR2V0dGVyRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUcmFuc2xhdGlvbkdldHRlckVycm9yKCdGYWlsZWQgdG8gZ2V0IGkxOG4gaW5mbyBjb25maWcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5pMThuSW5mb0NvbmZpZztcbiAgICB9XG4gICAgZ2V0TG9jYWxlTG9va3VwT3JkZXIobG9jYWxlLCBjb25maWcpIHtcbiAgICAgICAgY29uc3QgeyBsb2NhbGVzLCBmYWxsYmFjayB9ID0gY29uZmlnO1xuICAgICAgICBjb25zdCBsb29rdXBPcmRlciA9IFtsb2NhbGVdO1xuICAgICAgICBjb25zdCBmYWxsYmFja0xvY2FsZXMgPSBmYWxsYmFja1tsb2NhbGVdO1xuICAgICAgICBpZiAoZmFsbGJhY2tMb2NhbGVzICYmIEFycmF5LmlzQXJyYXkoZmFsbGJhY2tMb2NhbGVzKSAmJiBmYWxsYmFja0xvY2FsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbG9va3VwT3JkZXIucHVzaCguLi5mYWxsYmFja0xvY2FsZXMpO1xuICAgICAgICB9XG4gICAgICAgIHB1c2hJZk5vdEV4aXN0cyhsb29rdXBPcmRlciwgY29uZmlnLmZhbGxiYWNrLmRlZmF1bHQpO1xuICAgICAgICByZXR1cm4gbG9va3VwT3JkZXIuZmlsdGVyKChsb2NhbGUpID0+IGxvY2FsZXMuaW5jbHVkZXMobG9jYWxlKSk7XG4gICAgfVxufVxuZXhwb3J0cy5UcmFuc2xhdGlvbnNHZXR0ZXIgPSBUcmFuc2xhdGlvbnNHZXR0ZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucGFyc2VVcmwgPSB2b2lkIDA7XG5mdW5jdGlvbiBwYXJzZVVybCh1cmwpIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGNvbnN0IHByb3RvY29sID0gKF9iID0gKF9hID0gdXJsLm1hdGNoKC9eKC4qPzopLykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogJ2h0dHBzOic7XG4gICAgY29uc3QgaG9zdEFuZFBhdGggPSB1cmwucmVwbGFjZShwcm90b2NvbCwgJycpLnJlcGxhY2UoL15cXC8qLywgJycpLnJlcGxhY2UoL15cXFxcKi8sICcnKS5zcGxpdCgnPycpWzBdLnNwbGl0KCcjJylbMF07XG4gICAgY29uc3QgaG9zdG5hbWUgPSBob3N0QW5kUGF0aC5zcGxpdCgnLycpWzBdO1xuICAgIGNvbnN0IHBhdGhuYW1lID0gaG9zdEFuZFBhdGguc2xpY2UoaG9zdG5hbWUubGVuZ3RoKSB8fCAnLyc7XG4gICAgcmV0dXJuIHsgcHJvdG9jb2wsIGhvc3RuYW1lLCBwYXRobmFtZSB9O1xufVxuZXhwb3J0cy5wYXJzZVVybCA9IHBhcnNlVXJsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkZPUkdFX1NVUFBPUlRFRF9MT0NBTEVfQ09ERVMgPSBleHBvcnRzLkkxOE5fQlVORExFX0ZPTERFUl9OQU1FID0gZXhwb3J0cy5JMThOX0lORk9fRklMRV9OQU1FID0gdm9pZCAwO1xuZXhwb3J0cy5JMThOX0lORk9fRklMRV9OQU1FID0gJ2kxOG4taW5mby5qc29uJztcbmV4cG9ydHMuSTE4Tl9CVU5ETEVfRk9MREVSX05BTUUgPSAnX19MT0NBTEVTX18nO1xuZXhwb3J0cy5GT1JHRV9TVVBQT1JURURfTE9DQUxFX0NPREVTID0gW1xuICAgICd6aC1DTicsXG4gICAgJ3poLVRXJyxcbiAgICAnY3MtQ1onLFxuICAgICdkYS1ESycsXG4gICAgJ25sLU5MJyxcbiAgICAnZW4tVVMnLFxuICAgICdlbi1HQicsXG4gICAgJ2V0LUVFJyxcbiAgICAnZmktRkknLFxuICAgICdmci1GUicsXG4gICAgJ2RlLURFJyxcbiAgICAnaHUtSFUnLFxuICAgICdpcy1JUycsXG4gICAgJ2l0LUlUJyxcbiAgICAnamEtSlAnLFxuICAgICdrby1LUicsXG4gICAgJ25vLU5PJyxcbiAgICAncGwtUEwnLFxuICAgICdwdC1CUicsXG4gICAgJ3B0LVBUJyxcbiAgICAncm8tUk8nLFxuICAgICdydS1SVScsXG4gICAgJ3NrLVNLJyxcbiAgICAndHItVFInLFxuICAgICdlcy1FUycsXG4gICAgJ3N2LVNFJ1xuXTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldEVncmVzc2VzQmFzZWRPblRvZ2dsZXMgPSBleHBvcnRzLnNvcnRBbmRHcm91cEVncmVzc1Blcm1pc3Npb25zQnlEb21haW4gPSBleHBvcnRzLkVncmVzc0NhdGVnb3J5ID0gZXhwb3J0cy5FZ3Jlc3NUeXBlID0gZXhwb3J0cy5nbG9iVG9SZWdleCA9IHZvaWQgMDtcbmNvbnN0IHVybF9wYXJzZXJfMSA9IHJlcXVpcmUoXCIuL3VybC1wYXJzZXJcIik7XG5mdW5jdGlvbiBnbG9iVG9SZWdleChwYXR0ZXJuKSB7XG4gICAgY29uc3QgZXNjYXBlZCA9IHBhdHRlcm4ucmVwbGFjZSgvWy4rP14ke30oKXxbXFxdXFxcXF0vZywgJ1xcXFwkJicpO1xuICAgIGNvbnN0IHJlZ2V4UGF0dGVybiA9IGVzY2FwZWQucmVwbGFjZSgvXFwqL2csICcuKicpO1xuICAgIHJldHVybiBuZXcgUmVnRXhwKGBeJHtyZWdleFBhdHRlcm59JGApO1xufVxuZXhwb3J0cy5nbG9iVG9SZWdleCA9IGdsb2JUb1JlZ2V4O1xuY29uc3Qgc29ydEFuZEdyb3VwRWdyZXNzUGVybWlzc2lvbnNCeURvbWFpbiA9IChlZ3Jlc3NBZGRyZXNzZXMpID0+IHtcbiAgICBpZiAoKGVncmVzc0FkZHJlc3NlcyA9PT0gbnVsbCB8fCBlZ3Jlc3NBZGRyZXNzZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGVncmVzc0FkZHJlc3Nlcy5sZW5ndGgpID09PSAwKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgY29uc3QgcHJvdG9jb2xSZWdleCA9IC9eKC4qPzpcXC9cXC8pLztcbiAgICBjb25zdCBkb21haW5zID0gbmV3IFNldCgpO1xuICAgIGNvbnN0IHdpbGRjYXJkRG9tYWlucyA9IFtdO1xuICAgIGVncmVzc0FkZHJlc3Nlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW1XaXRoUHJvdG9jb2wgPSBwcm90b2NvbFJlZ2V4LnRlc3QoaXRlbSkgPyBpdGVtIDogYGh0dHBzOi8vJHtpdGVtfWA7XG4gICAgICAgIGNvbnN0IHVybCA9ICgwLCB1cmxfcGFyc2VyXzEucGFyc2VVcmwpKGl0ZW1XaXRoUHJvdG9jb2wpO1xuICAgICAgICBpZiAodXJsLmhvc3RuYW1lLnN0YXJ0c1dpdGgoJyonKSkge1xuICAgICAgICAgICAgZG9tYWlucy5hZGQodXJsLmhvc3RuYW1lLnN1YnN0cmluZygyKSk7XG4gICAgICAgICAgICB3aWxkY2FyZERvbWFpbnMucHVzaChnbG9iVG9SZWdleCh1cmwuaG9zdG5hbWUpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRvbWFpbnMuYWRkKHVybC5ob3N0bmFtZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gWy4uLmRvbWFpbnNdLnNvcnQoKS5yZWR1Y2UoKGdyb3VwZWQsIGRvbWFpbikgPT4ge1xuICAgICAgICBpZiAoIXdpbGRjYXJkRG9tYWlucy5zb21lKChwYXR0ZXJuKSA9PiBwYXR0ZXJuLnRlc3QoZG9tYWluKSkpIHtcbiAgICAgICAgICAgIGdyb3VwZWQucHVzaChkb21haW4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBncm91cGVkO1xuICAgIH0sIFtdKTtcbn07XG5leHBvcnRzLnNvcnRBbmRHcm91cEVncmVzc1Blcm1pc3Npb25zQnlEb21haW4gPSBzb3J0QW5kR3JvdXBFZ3Jlc3NQZXJtaXNzaW9uc0J5RG9tYWluO1xudmFyIEVncmVzc1R5cGU7XG4oZnVuY3Rpb24gKEVncmVzc1R5cGUpIHtcbiAgICBFZ3Jlc3NUeXBlW1wiRmV0Y2hCYWNrZW5kU2lkZVwiXSA9IFwiRkVUQ0hfQkFDS0VORF9TSURFXCI7XG4gICAgRWdyZXNzVHlwZVtcIkZldGNoQ2xpZW50U2lkZVwiXSA9IFwiRkVUQ0hfQ0xJRU5UX1NJREVcIjtcbiAgICBFZ3Jlc3NUeXBlW1wiRm9udHNcIl0gPSBcIkZPTlRTXCI7XG4gICAgRWdyZXNzVHlwZVtcIkZyYW1lc1wiXSA9IFwiRlJBTUVTXCI7XG4gICAgRWdyZXNzVHlwZVtcIkltYWdlc1wiXSA9IFwiSU1BR0VTXCI7XG4gICAgRWdyZXNzVHlwZVtcIk1lZGlhXCJdID0gXCJNRURJQVwiO1xuICAgIEVncmVzc1R5cGVbXCJOYXZpZ2F0aW9uXCJdID0gXCJOQVZJR0FUSU9OXCI7XG4gICAgRWdyZXNzVHlwZVtcIlNjcmlwdHNcIl0gPSBcIlNDUklQVFNcIjtcbiAgICBFZ3Jlc3NUeXBlW1wiU3R5bGVzXCJdID0gXCJTVFlMRVNcIjtcbn0pKEVncmVzc1R5cGUgPSBleHBvcnRzLkVncmVzc1R5cGUgfHwgKGV4cG9ydHMuRWdyZXNzVHlwZSA9IHt9KSk7XG52YXIgRWdyZXNzQ2F0ZWdvcnk7XG4oZnVuY3Rpb24gKEVncmVzc0NhdGVnb3J5KSB7XG4gICAgRWdyZXNzQ2F0ZWdvcnlbXCJBTkFMWVRJQ1NcIl0gPSBcIkFOQUxZVElDU1wiO1xufSkoRWdyZXNzQ2F0ZWdvcnkgPSBleHBvcnRzLkVncmVzc0NhdGVnb3J5IHx8IChleHBvcnRzLkVncmVzc0NhdGVnb3J5ID0ge30pKTtcbmNvbnN0IGdldEVncmVzc2VzQmFzZWRPblRvZ2dsZXMgPSAoaW5wdXQpID0+IHtcbiAgICBjb25zdCBmaWx0ZXJlZEVncmVzc2VzID0gaW5wdXQuZWdyZXNzLmZpbHRlcigoZWdyZXNzKSA9PiB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKCgoX2EgPSBlZ3Jlc3MuY2F0ZWdvcnkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b1VwcGVyQ2FzZSgpKSA9PT0gRWdyZXNzQ2F0ZWdvcnkuQU5BTFlUSUNTKSB7XG4gICAgICAgICAgICBpZiAoaW5wdXQuaW5zdGFsbGF0aW9uQ29uZmlnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYW5hbHl0aWNzQ29uZmlnID0gaW5wdXQuaW5zdGFsbGF0aW9uQ29uZmlnLmZpbmQoKGNvbmZpZykgPT4gY29uZmlnLmtleS50b1VwcGVyQ2FzZSgpID09PSAnQUxMT1dfRUdSRVNTX0FOQUxZVElDUycpO1xuICAgICAgICAgICAgICAgIHJldHVybiAoYW5hbHl0aWNzQ29uZmlnID09PSBudWxsIHx8IGFuYWx5dGljc0NvbmZpZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogYW5hbHl0aWNzQ29uZmlnLnZhbHVlKSAhPT0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5wdXQub3ZlcnJpZGVzLkFMTE9XX0VHUkVTU19BTkFMWVRJQ1MgIT09IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICAgIGNvbnN0IGVncmVzc0J5VHlwZSA9IG5ldyBNYXAoKTtcbiAgICBmb3IgKGNvbnN0IGVncmVzcyBvZiBmaWx0ZXJlZEVncmVzc2VzKSB7XG4gICAgICAgIGlmICghZWdyZXNzQnlUeXBlLmhhcyhlZ3Jlc3MudHlwZSkpIHtcbiAgICAgICAgICAgIGVncmVzc0J5VHlwZS5zZXQoZWdyZXNzLnR5cGUsIGVncmVzcy5hZGRyZXNzZXMpO1xuICAgICAgICB9XG4gICAgICAgIGVncmVzc0J5VHlwZS5zZXQoZWdyZXNzLnR5cGUsIFsuLi5lZ3Jlc3NCeVR5cGUuZ2V0KGVncmVzcy50eXBlKSwgLi4uZWdyZXNzLmFkZHJlc3Nlc10pO1xuICAgIH1cbiAgICByZXR1cm4gWy4uLmVncmVzc0J5VHlwZS5lbnRyaWVzKCldLm1hcCgoW3R5cGUsIGVncmVzc2VzXSkgPT4gKHtcbiAgICAgICAgdHlwZSxcbiAgICAgICAgYWRkcmVzc2VzOiBbLi4ubmV3IFNldChlZ3Jlc3NlcyldXG4gICAgfSkpO1xufTtcbmV4cG9ydHMuZ2V0RWdyZXNzZXNCYXNlZE9uVG9nZ2xlcyA9IGdldEVncmVzc2VzQmFzZWRPblRvZ2dsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucGVybWlzc2lvbnMgPSBleHBvcnRzLmkxOG4gPSBleHBvcnRzLnJvdXRlRnJvbUFic29sdXRlID0gZXhwb3J0cy5yb3V0ZSA9IGV4cG9ydHMuYXNzdW1lVHJ1c3RlZFJvdXRlID0gZXhwb3J0cy5nZXRBcHBDb250ZXh0ID0gZXhwb3J0cy5iaW5kSW52b2NhdGlvbkNvbnRleHQgPSBleHBvcnRzLl9fZ2V0UnVudGltZSA9IGV4cG9ydHMuUmVxdWVzdFByb2R1Y3ROb3RBbGxvd2VkRXJyb3IgPSBleHBvcnRzLlByb3h5UmVxdWVzdEVycm9yID0gZXhwb3J0cy5Qcm9kdWN0RW5kcG9pbnROb3RBbGxvd2VkRXJyb3IgPSBleHBvcnRzLk5vdEFsbG93ZWRFcnJvciA9IGV4cG9ydHMuTmVlZHNBdXRoZW50aWNhdGlvbkVycm9yID0gZXhwb3J0cy5pc0hvc3RlZENvZGVFcnJvciA9IGV4cG9ydHMuaXNGb3JnZVBsYXRmb3JtRXJyb3IgPSBleHBvcnRzLmlzRXhwZWN0ZWRFcnJvciA9IGV4cG9ydHMuSW52YWxpZFdvcmtzcGFjZVJlcXVlc3RlZEVycm9yID0gZXhwb3J0cy5IdHRwRXJyb3IgPSBleHBvcnRzLkZVTkNUSU9OX0VSUiA9IGV4cG9ydHMuRmV0Y2hFcnJvciA9IGV4cG9ydHMuRXh0ZXJuYWxFbmRwb2ludE5vdEFsbG93ZWRFcnJvciA9IGV4cG9ydHMuV2hlcmVDb25kaXRpb25zID0gZXhwb3J0cy5zdGFydHNXaXRoID0gZXhwb3J0cy5Tb3J0T3JkZXIgPSBleHBvcnRzLkZpbHRlckNvbmRpdGlvbnMgPSBleHBvcnRzLmNyZWF0ZVJlcXVlc3RTdGFyZ2F0ZUFzQXBwID0gZXhwb3J0cy53ZWJUcmlnZ2VyID0gZXhwb3J0cy5zdG9yYWdlID0gZXhwb3J0cy5yZXF1ZXN0SmlyYSA9IGV4cG9ydHMucmVxdWVzdENvbmZsdWVuY2UgPSBleHBvcnRzLnJlcXVlc3RCaXRidWNrZXQgPSBleHBvcnRzLmludm9rZVNlcnZpY2UgPSBleHBvcnRzLmludm9rZVJlbW90ZSA9IGV4cG9ydHMuZmV0Y2ggPSBleHBvcnRzLmF1dGhvcml6ZSA9IGV4cG9ydHMuYXNVc2VyID0gZXhwb3J0cy5hc0FwcCA9IGV4cG9ydHMuX19yZXF1ZXN0QXRsYXNzaWFuQXNVc2VyID0gZXhwb3J0cy5fX3JlcXVlc3RBdGxhc3NpYW5Bc0FwcCA9IGV4cG9ydHMuX19mZXRjaFByb2R1Y3QgPSBleHBvcnRzLnByaXZhY3kgPSB2b2lkIDA7XG5jb25zdCBzdG9yYWdlXzEgPSByZXF1aXJlKFwiQGZvcmdlL3N0b3JhZ2VcIik7XG5jb25zdCBlbmRwb2ludF8xID0gcmVxdWlyZShcIi4vYXBpL2VuZHBvaW50XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiaW52b2tlUmVtb3RlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBlbmRwb2ludF8xLmludm9rZVJlbW90ZTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImludm9rZVNlcnZpY2VcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVuZHBvaW50XzEuaW52b2tlU2VydmljZTsgfSB9KTtcbmNvbnN0IGZldGNoXzEgPSByZXF1aXJlKFwiLi9hcGkvZmV0Y2hcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2ZldGNoUHJvZHVjdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZmV0Y2hfMS5fX2ZldGNoUHJvZHVjdDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fcmVxdWVzdEF0bGFzc2lhbkFzQXBwXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBmZXRjaF8xLl9fcmVxdWVzdEF0bGFzc2lhbkFzQXBwOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19yZXF1ZXN0QXRsYXNzaWFuQXNVc2VyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBmZXRjaF8xLl9fcmVxdWVzdEF0bGFzc2lhbkFzVXNlcjsgfSB9KTtcbmNvbnN0IHJ1bnRpbWVfMSA9IHJlcXVpcmUoXCIuL2FwaS9ydW50aW1lXCIpO1xuY29uc3QgYXV0aG9yaXphdGlvbl8xID0gcmVxdWlyZShcIi4vYXV0aG9yaXphdGlvblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImF1dGhvcml6ZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYXV0aG9yaXphdGlvbl8xLmF1dGhvcml6ZTsgfSB9KTtcbmNvbnN0IHByaXZhY3lfMSA9IHJlcXVpcmUoXCIuL3ByaXZhY3lcIik7XG5jb25zdCB3ZWJUcmlnZ2VyXzEgPSByZXF1aXJlKFwiLi93ZWJUcmlnZ2VyXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwid2ViVHJpZ2dlclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gd2ViVHJpZ2dlcl8xLndlYlRyaWdnZXI7IH0gfSk7XG5jb25zdCBmZXRjaEFQSSA9ICgwLCBmZXRjaF8xLmdldEZldGNoQVBJKSgpO1xuY29uc3QgYXNVc2VyID0gZmV0Y2hBUEkuYXNVc2VyO1xuZXhwb3J0cy5hc1VzZXIgPSBhc1VzZXI7XG5jb25zdCBhc0FwcCA9IGZldGNoQVBJLmFzQXBwO1xuZXhwb3J0cy5hc0FwcCA9IGFzQXBwO1xuY29uc3QgZmV0Y2ggPSBmZXRjaEFQSS5mZXRjaDtcbmV4cG9ydHMuZmV0Y2ggPSBmZXRjaDtcbmNvbnN0IHJlcXVlc3RKaXJhID0gZmV0Y2hBUEkucmVxdWVzdEppcmE7XG5leHBvcnRzLnJlcXVlc3RKaXJhID0gcmVxdWVzdEppcmE7XG5jb25zdCByZXF1ZXN0Q29uZmx1ZW5jZSA9IGZldGNoQVBJLnJlcXVlc3RDb25mbHVlbmNlO1xuZXhwb3J0cy5yZXF1ZXN0Q29uZmx1ZW5jZSA9IHJlcXVlc3RDb25mbHVlbmNlO1xuY29uc3QgcmVxdWVzdEJpdGJ1Y2tldCA9IGZldGNoQVBJLnJlcXVlc3RCaXRidWNrZXQ7XG5leHBvcnRzLnJlcXVlc3RCaXRidWNrZXQgPSByZXF1ZXN0Qml0YnVja2V0O1xuY29uc3Qgc3RvcmFnZSA9ICgwLCBzdG9yYWdlXzEuZ2V0U3RvcmFnZUluc3RhbmNlV2l0aFF1ZXJ5KShuZXcgc3RvcmFnZV8xLkdsb2JhbFN0b3JhZ2UoZmV0Y2hfMS5fX3JlcXVlc3RBdGxhc3NpYW5Bc0FwcCwgKCkgPT4gKDAsIHJ1bnRpbWVfMS5fX2dldFJ1bnRpbWUpKCkubWV0cmljcykpO1xuZXhwb3J0cy5zdG9yYWdlID0gc3RvcmFnZTtcbmNvbnN0IEFQSSA9IHtcbiAgICAuLi5mZXRjaEFQSSxcbiAgICBpbnZva2VSZW1vdGU6IGVuZHBvaW50XzEuaW52b2tlUmVtb3RlLFxuICAgIGludm9rZVNlcnZpY2U6IGVuZHBvaW50XzEuaW52b2tlU2VydmljZVxufTtcbmV4cG9ydHMucHJpdmFjeSA9IHtcbiAgICByZXBvcnRQZXJzb25hbERhdGE6ICgwLCBwcml2YWN5XzEuY3JlYXRlUmVwb3J0UGVyc29uYWxEYXRhKShmZXRjaF8xLl9fcmVxdWVzdEF0bGFzc2lhbkFzQXBwKVxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IEFQSTtcbmNvbnN0IGNyZWF0ZVJlcXVlc3RTdGFyZ2F0ZUFzQXBwID0gKCkgPT4gZmV0Y2hfMS5fX3JlcXVlc3RBdGxhc3NpYW5Bc0FwcDtcbmV4cG9ydHMuY3JlYXRlUmVxdWVzdFN0YXJnYXRlQXNBcHAgPSBjcmVhdGVSZXF1ZXN0U3RhcmdhdGVBc0FwcDtcbnZhciBzdG9yYWdlXzIgPSByZXF1aXJlKFwiQGZvcmdlL3N0b3JhZ2VcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJGaWx0ZXJDb25kaXRpb25zXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzdG9yYWdlXzIuRmlsdGVyQ29uZGl0aW9uczsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlNvcnRPcmRlclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc3RvcmFnZV8yLlNvcnRPcmRlcjsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInN0YXJ0c1dpdGhcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN0b3JhZ2VfMi5zdGFydHNXaXRoOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiV2hlcmVDb25kaXRpb25zXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzdG9yYWdlXzIuV2hlcmVDb25kaXRpb25zOyB9IH0pO1xudmFyIGVycm9yc18xID0gcmVxdWlyZShcIi4vYXBpL2Vycm9yc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkV4dGVybmFsRW5kcG9pbnROb3RBbGxvd2VkRXJyb3JcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVycm9yc18xLkV4dGVybmFsRW5kcG9pbnROb3RBbGxvd2VkRXJyb3I7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJGZXRjaEVycm9yXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBlcnJvcnNfMS5GZXRjaEVycm9yOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiRlVOQ1RJT05fRVJSXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBlcnJvcnNfMS5GVU5DVElPTl9FUlI7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJIdHRwRXJyb3JcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVycm9yc18xLkh0dHBFcnJvcjsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkludmFsaWRXb3Jrc3BhY2VSZXF1ZXN0ZWRFcnJvclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZXJyb3JzXzEuSW52YWxpZFdvcmtzcGFjZVJlcXVlc3RlZEVycm9yOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiaXNFeHBlY3RlZEVycm9yXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBlcnJvcnNfMS5pc0V4cGVjdGVkRXJyb3I7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJpc0ZvcmdlUGxhdGZvcm1FcnJvclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZXJyb3JzXzEuaXNGb3JnZVBsYXRmb3JtRXJyb3I7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJpc0hvc3RlZENvZGVFcnJvclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZXJyb3JzXzEuaXNIb3N0ZWRDb2RlRXJyb3I7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJOZWVkc0F1dGhlbnRpY2F0aW9uRXJyb3JcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVycm9yc18xLk5lZWRzQXV0aGVudGljYXRpb25FcnJvcjsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk5vdEFsbG93ZWRFcnJvclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZXJyb3JzXzEuTm90QWxsb3dlZEVycm9yOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiUHJvZHVjdEVuZHBvaW50Tm90QWxsb3dlZEVycm9yXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBlcnJvcnNfMS5Qcm9kdWN0RW5kcG9pbnROb3RBbGxvd2VkRXJyb3I7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJQcm94eVJlcXVlc3RFcnJvclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZXJyb3JzXzEuUHJveHlSZXF1ZXN0RXJyb3I7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJSZXF1ZXN0UHJvZHVjdE5vdEFsbG93ZWRFcnJvclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZXJyb3JzXzEuUmVxdWVzdFByb2R1Y3ROb3RBbGxvd2VkRXJyb3I7IH0gfSk7XG52YXIgcnVudGltZV8yID0gcmVxdWlyZShcIi4vYXBpL3J1bnRpbWVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2dldFJ1bnRpbWVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJ1bnRpbWVfMi5fX2dldFJ1bnRpbWU7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJiaW5kSW52b2NhdGlvbkNvbnRleHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJ1bnRpbWVfMi5iaW5kSW52b2NhdGlvbkNvbnRleHQ7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJnZXRBcHBDb250ZXh0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBydW50aW1lXzIuZ2V0QXBwQ29udGV4dDsgfSB9KTtcbnZhciBzYWZlVXJsXzEgPSByZXF1aXJlKFwiLi9zYWZlVXJsXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiYXNzdW1lVHJ1c3RlZFJvdXRlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzYWZlVXJsXzEuYXNzdW1lVHJ1c3RlZFJvdXRlOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwicm91dGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNhZmVVcmxfMS5yb3V0ZTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInJvdXRlRnJvbUFic29sdXRlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzYWZlVXJsXzEucm91dGVGcm9tQWJzb2x1dGU7IH0gfSk7XG52YXIgaTE4bl8xID0gcmVxdWlyZShcIi4vYXBpL2kxOG5cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJpMThuXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBpMThuXzEuaTE4bjsgfSB9KTtcbnZhciBwZXJtaXNzaW9uc18xID0gcmVxdWlyZShcIi4vYXBpL3Blcm1pc3Npb25zXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwicGVybWlzc2lvbnNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHBlcm1pc3Npb25zXzEucGVybWlzc2lvbnM7IH0gfSk7XG4iLCJ2YXIgY29yZUpzRGF0YSA9IHJlcXVpcmUoJy4vX2NvcmVKc0RhdGEnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1ldGhvZHMgbWFzcXVlcmFkaW5nIGFzIG5hdGl2ZS4gKi9cbnZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdWlkID0gL1teLl0rJC8uZXhlYyhjb3JlSnNEYXRhICYmIGNvcmVKc0RhdGEua2V5cyAmJiBjb3JlSnNEYXRhLmtleXMuSUVfUFJPVE8gfHwgJycpO1xuICByZXR1cm4gdWlkID8gKCdTeW1ib2woc3JjKV8xLicgKyB1aWQpIDogJyc7XG59KCkpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgZnVuY2AgaGFzIGl0cyBzb3VyY2UgbWFza2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgZnVuY2AgaXMgbWFza2VkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTWFza2VkKGZ1bmMpIHtcbiAgcmV0dXJuICEhbWFza1NyY0tleSAmJiAobWFza1NyY0tleSBpbiBmdW5jKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc01hc2tlZDtcbiIsInZhciBjYXN0UGF0aCA9IHJlcXVpcmUoJy4vX2Nhc3RQYXRoJyksXG4gICAgdG9LZXkgPSByZXF1aXJlKCcuL190b0tleScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmdldGAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWZhdWx0IHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldChvYmplY3QsIHBhdGgpIHtcbiAgcGF0aCA9IGNhc3RQYXRoKHBhdGgsIG9iamVjdCk7XG5cbiAgdmFyIGluZGV4ID0gMCxcbiAgICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoO1xuXG4gIHdoaWxlIChvYmplY3QgIT0gbnVsbCAmJiBpbmRleCA8IGxlbmd0aCkge1xuICAgIG9iamVjdCA9IG9iamVjdFt0b0tleShwYXRoW2luZGV4KytdKV07XG4gIH1cbiAgcmV0dXJuIChpbmRleCAmJiBpbmRleCA9PSBsZW5ndGgpID8gb2JqZWN0IDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHZXQ7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9Tb3VyY2U7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyksXG4gICAgYXJyYXlNYXAgPSByZXF1aXJlKCcuL19hcnJheU1hcCcpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc1N5bWJvbCA9IHJlcXVpcmUoJy4vaXNTeW1ib2wnKTtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFRvU3RyaW5nID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by50b1N0cmluZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50b1N0cmluZ2Agd2hpY2ggZG9lc24ndCBjb252ZXJ0IG51bGxpc2hcbiAqIHZhbHVlcyB0byBlbXB0eSBzdHJpbmdzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgLy8gRXhpdCBlYXJseSBmb3Igc3RyaW5ncyB0byBhdm9pZCBhIHBlcmZvcm1hbmNlIGhpdCBpbiBzb21lIGVudmlyb25tZW50cy5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAvLyBSZWN1cnNpdmVseSBjb252ZXJ0IHZhbHVlcyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIHJldHVybiBhcnJheU1hcCh2YWx1ZSwgYmFzZVRvU3RyaW5nKSArICcnO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gc3ltYm9sVG9TdHJpbmcgPyBzeW1ib2xUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVG9TdHJpbmc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRW50aXR5U3RvcmFnZUJ1aWxkZXIgPSB2b2lkIDA7XG5jb25zdCBxdWVyeV9hcGlfMSA9IHJlcXVpcmUoXCIuL3F1ZXJ5LWFwaVwiKTtcbmNsYXNzIEVudGl0eVN0b3JhZ2VCdWlsZGVyIHtcbiAgICBlbnRpdHlOYW1lO1xuICAgIGdsb2JhbFN0b3JhZ2U7XG4gICAgY29uc3RydWN0b3IoZW50aXR5TmFtZSwgZ2xvYmFsU3RvcmFnZSkge1xuICAgICAgICB0aGlzLmVudGl0eU5hbWUgPSBlbnRpdHlOYW1lO1xuICAgICAgICB0aGlzLmdsb2JhbFN0b3JhZ2UgPSBnbG9iYWxTdG9yYWdlO1xuICAgIH1cbiAgICBxdWVyeSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBxdWVyeV9hcGlfMS5DdXN0b21FbnRpdHlCdWlsZGVyKHRoaXMuZ2xvYmFsU3RvcmFnZSkuZW50aXR5KHRoaXMuZW50aXR5TmFtZSk7XG4gICAgfVxuICAgIGdldChlbnRpdHlLZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsU3RvcmFnZS5nZXRFbnRpdHkodGhpcy5lbnRpdHlOYW1lLCBlbnRpdHlLZXkpO1xuICAgIH1cbiAgICBzZXQoZW50aXR5S2V5LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nbG9iYWxTdG9yYWdlLnNldEVudGl0eSh0aGlzLmVudGl0eU5hbWUsIGVudGl0eUtleSwgdmFsdWUpO1xuICAgIH1cbiAgICBkZWxldGUoZW50aXR5S2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdsb2JhbFN0b3JhZ2UuZGVsZXRlRW50aXR5KHRoaXMuZW50aXR5TmFtZSwgZW50aXR5S2V5KTtcbiAgICB9XG59XG5leHBvcnRzLkVudGl0eVN0b3JhZ2VCdWlsZGVyID0gRW50aXR5U3RvcmFnZUJ1aWxkZXI7XG4iLCJ2YXIgZ2V0TWFwRGF0YSA9IHJlcXVpcmUoJy4vX2dldE1hcERhdGEnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgcmVzdWx0ID0gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpWydkZWxldGUnXShrZXkpO1xuICB0aGlzLnNpemUgLT0gcmVzdWx0ID8gMSA6IDA7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwQ2FjaGVEZWxldGU7XG4iLCJ2YXIgaXNTeW1ib2wgPSByZXF1aXJlKCcuL2lzU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyBrZXkgaWYgaXQncyBub3QgYSBzdHJpbmcgb3Igc3ltYm9sLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHJldHVybnMge3N0cmluZ3xzeW1ib2x9IFJldHVybnMgdGhlIGtleS5cbiAqL1xuZnVuY3Rpb24gdG9LZXkodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fCBpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvS2V5O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmVuc3VyZUxvY2FsZSA9IHZvaWQgMDtcbmNvbnN0IGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4vY29uc3RhbnRzXCIpO1xuY29uc3QgZm9yZ2VTdXBwb3J0ZWRMb2NhbGVDb2Rlc1NldCA9IG5ldyBTZXQoY29uc3RhbnRzXzEuRk9SR0VfU1VQUE9SVEVEX0xPQ0FMRV9DT0RFUyk7XG5jb25zdCBsb2NhbGVGYWxsYmFja3MgPSB7XG4gICAgJ2VuLVVLJzogJ2VuLUdCJyxcbiAgICAnbmItTk8nOiAnbm8tTk8nXG59O1xuY29uc3QgbGFuZ3VhZ2VUb0xvY2FsZUNvZGVNYXAgPSBjb25zdGFudHNfMS5GT1JHRV9TVVBQT1JURURfTE9DQUxFX0NPREVTLnJlZHVjZSgoYWdnLCBjb2RlKSA9PiB7XG4gICAgY29uc3QgW2xuZ10gPSBjb2RlLnNwbGl0KCctJyk7XG4gICAgaWYgKCFhZ2dbbG5nXSkge1xuICAgICAgICBhZ2dbbG5nXSA9IGNvZGU7XG4gICAgfVxuICAgIHJldHVybiBhZ2c7XG59LCB7XG4gICAgbmI6ICduby1OTycsXG4gICAgcHQ6ICdwdC1QVCdcbn0pO1xuY29uc3QgZW5zdXJlTG9jYWxlID0gKHJhd0xvY2FsZSkgPT4ge1xuICAgIGNvbnN0IGxvY2FsZSA9IHJhd0xvY2FsZS5yZXBsYWNlKCdfJywgJy0nKTtcbiAgICBpZiAoZm9yZ2VTdXBwb3J0ZWRMb2NhbGVDb2Rlc1NldC5oYXMobG9jYWxlKSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlO1xuICAgIH1cbiAgICByZXR1cm4gbGFuZ3VhZ2VUb0xvY2FsZUNvZGVNYXBbbG9jYWxlXSA/PyBsb2NhbGVGYWxsYmFja3NbbG9jYWxlXSA/PyBudWxsO1xufTtcbmV4cG9ydHMuZW5zdXJlTG9jYWxlID0gZW5zdXJlTG9jYWxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkVncmVzc0ZpbHRlcmluZ1NlcnZpY2UgPSB2b2lkIDA7XG5jb25zdCB1cmxfcGFyc2VyXzEgPSByZXF1aXJlKFwiLi91cmwtcGFyc2VyXCIpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuY2xhc3MgRWdyZXNzRmlsdGVyaW5nU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoYWxsb3dMaXN0KSB7XG4gICAgICAgIHRoaXMuVVJMcyA9IGFsbG93TGlzdC5maWx0ZXIoKGRvbWFpbk9yVVJMKSA9PiAhZG9tYWluT3JVUkwuc3RhcnRzV2l0aCgnKicpKS5tYXAoKHVybCkgPT4gdGhpcy5wYXJzZVVybCh1cmwpKTtcbiAgICAgICAgdGhpcy53aWxkY2FyZERvbWFpbnMgPSBhbGxvd0xpc3RcbiAgICAgICAgICAgIC5maWx0ZXIoKGRvbWFpbk9yVVJMKSA9PiBkb21haW5PclVSTCAhPT0gJyonKVxuICAgICAgICAgICAgLm1hcCgodXJsKSA9PiB0aGlzLnBhcnNlVXJsKHVybCkpXG4gICAgICAgICAgICAuZmlsdGVyKCh1cmwpID0+IGRlY29kZVVSSUNvbXBvbmVudCh1cmwuaG9zdG5hbWUpLnN0YXJ0c1dpdGgoJyonKSlcbiAgICAgICAgICAgIC5tYXAoKHVybCkgPT4gKHtcbiAgICAgICAgICAgIC4uLnVybCxcbiAgICAgICAgICAgIHJlZ2V4OiAoMCwgdXRpbHNfMS5nbG9iVG9SZWdleCkoZGVjb2RlVVJJQ29tcG9uZW50KHVybC5ob3N0bmFtZSkpXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5hbGxvd3NFdmVyeXRoaW5nID0gYWxsb3dMaXN0LmluY2x1ZGVzKCcqJyk7XG4gICAgfVxuICAgIHBhcnNlVXJsKHVybCkge1xuICAgICAgICByZXR1cm4gKDAsIHVybF9wYXJzZXJfMS5wYXJzZVVybCkodXJsKTtcbiAgICB9XG4gICAgY29udGFpbnNXaWxkQ2FyZEVncmVzcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxsb3dzRXZlcnl0aGluZztcbiAgICB9XG4gICAgaXNWYWxpZFVybCh1cmwpIHtcbiAgICAgICAgaWYgKHRoaXMuYWxsb3dzRXZlcnl0aGluZykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGFyc2VkVXJsID0gdGhpcy5wYXJzZVVybCh1cmwpO1xuICAgICAgICByZXR1cm4gdGhpcy5hbGxvd2VkRG9tYWluRXhhY3QocGFyc2VkVXJsLCB0aGlzLlVSTHMpIHx8IHRoaXMuYWxsb3dlZERvbWFpblBhdHRlcm4ocGFyc2VkVXJsLCB0aGlzLndpbGRjYXJkRG9tYWlucyk7XG4gICAgfVxuICAgIGlzVmFsaWRVcmxDU1AodXJsKSB7XG4gICAgICAgIGlmICh0aGlzLmFsbG93c0V2ZXJ5dGhpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhcnNlZFVybCA9IHRoaXMucGFyc2VVcmwodXJsKTtcbiAgICAgICAgcmV0dXJuICh0aGlzLmFsbG93ZWREb21haW5FeGFjdEFuZFBhdGgocGFyc2VkVXJsLCB0aGlzLlVSTHMpIHx8XG4gICAgICAgICAgICB0aGlzLmFsbG93ZWREb21haW5QYXR0ZXJuQW5kUGF0aChwYXJzZWRVcmwsIHRoaXMud2lsZGNhcmREb21haW5zKSk7XG4gICAgfVxuICAgIGFsbG93ZWREb21haW5FeGFjdChkb21haW4sIGFsbG93TGlzdCkge1xuICAgICAgICByZXR1cm4gYWxsb3dMaXN0XG4gICAgICAgICAgICAuZmlsdGVyKChhbGxvd2VkKSA9PiBhbGxvd2VkLnByb3RvY29sID09PSBkb21haW4ucHJvdG9jb2wpXG4gICAgICAgICAgICAuc29tZSgodXJsKSA9PiB1cmwuaG9zdG5hbWUgPT09IGRvbWFpbi5ob3N0bmFtZSk7XG4gICAgfVxuICAgIGFsbG93ZWREb21haW5FeGFjdEFuZFBhdGgoZG9tYWluLCBhbGxvd0xpc3QpIHtcbiAgICAgICAgcmV0dXJuIGFsbG93TGlzdFxuICAgICAgICAgICAgLmZpbHRlcigoYWxsb3dlZCkgPT4gdGhpcy5wcm90b2NvbE1hdGNoZXNDU1AoYWxsb3dlZC5wcm90b2NvbCwgZG9tYWluLnByb3RvY29sKSlcbiAgICAgICAgICAgIC5maWx0ZXIoKGFsbG93ZWQpID0+IGFsbG93ZWQuaG9zdG5hbWUgPT09IGRvbWFpbi5ob3N0bmFtZSlcbiAgICAgICAgICAgIC5zb21lKChhbGxvd2VkKSA9PiB0aGlzLnBhdGhNYXRjaGVzKGFsbG93ZWQucGF0aG5hbWUsIGRvbWFpbi5wYXRobmFtZSkpO1xuICAgIH1cbiAgICBhbGxvd2VkRG9tYWluUGF0dGVybihkb21haW4sIGFsbG93TGlzdCkge1xuICAgICAgICByZXR1cm4gYWxsb3dMaXN0XG4gICAgICAgICAgICAuZmlsdGVyKChhbGxvd2VkKSA9PiBhbGxvd2VkLnByb3RvY29sID09PSBkb21haW4ucHJvdG9jb2wpXG4gICAgICAgICAgICAuc29tZSgocGF0dGVybikgPT4gcGF0dGVybi5yZWdleC50ZXN0KGRvbWFpbi5ob3N0bmFtZSkpO1xuICAgIH1cbiAgICBhbGxvd2VkRG9tYWluUGF0dGVybkFuZFBhdGgoZG9tYWluLCBhbGxvd0xpc3QpIHtcbiAgICAgICAgcmV0dXJuIGFsbG93TGlzdFxuICAgICAgICAgICAgLmZpbHRlcigocGF0dGVybikgPT4gdGhpcy5wcm90b2NvbE1hdGNoZXNDU1AocGF0dGVybi5wcm90b2NvbCwgZG9tYWluLnByb3RvY29sKSlcbiAgICAgICAgICAgIC5maWx0ZXIoKHBhdHRlcm4pID0+IHBhdHRlcm4ucmVnZXgudGVzdChkb21haW4uaG9zdG5hbWUpKVxuICAgICAgICAgICAgLnNvbWUoKGFsbG93ZWQpID0+IHRoaXMucGF0aE1hdGNoZXMoYWxsb3dlZC5wYXRobmFtZSwgZG9tYWluLnBhdGhuYW1lKSk7XG4gICAgfVxuICAgIHByb3RvY29sTWF0Y2hlc0NTUChhbGxvd2VkUHJvdG9jb2wsIHJlcXVlc3RQcm90b2NvbCkge1xuICAgICAgICBpZiAoYWxsb3dlZFByb3RvY29sID09PSByZXF1ZXN0UHJvdG9jb2wpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhbGxvd2VkUHJvdG9jb2wgPT09ICdodHRwOicgJiYgcmVxdWVzdFByb3RvY29sID09PSAnaHR0cHM6Jykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFsbG93ZWRQcm90b2NvbCA9PT0gJ3dzOicgJiYgcmVxdWVzdFByb3RvY29sID09PSAnd3NzOicpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcGF0aE1hdGNoZXMoYWxsb3dlZFBhdGgsIHJlcXVlc3RQYXRoKSB7XG4gICAgICAgIGlmIChhbGxvd2VkUGF0aCA9PT0gJy8nKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWxsb3dlZFBhdGguZW5kc1dpdGgoJy8nKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3RQYXRoLnN0YXJ0c1dpdGgoYWxsb3dlZFBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXF1ZXN0UGF0aCA9PT0gYWxsb3dlZFBhdGg7XG4gICAgfVxufVxuZXhwb3J0cy5FZ3Jlc3NGaWx0ZXJpbmdTZXJ2aWNlID0gRWdyZXNzRmlsdGVyaW5nU2VydmljZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5GaWx0ZXJDb25kaXRpb25zID0gZXhwb3J0cy5XaGVyZUNvbmRpdGlvbnMgPSBleHBvcnRzLmlzSW4gPSBleHBvcnRzLmlzTm90RXF1YWxUbyA9IHZvaWQgMDtcbmZ1bmN0aW9uIGlzTm90RXF1YWxUbyh2YWx1ZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGNvbmRpdGlvbjogJ05PVF9FUVVBTF9UTycsXG4gICAgICAgIHZhbHVlXG4gICAgfTtcbn1cbmV4cG9ydHMuaXNOb3RFcXVhbFRvID0gaXNOb3RFcXVhbFRvO1xuZnVuY3Rpb24gaXNJbih2YWx1ZXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBjb25kaXRpb246ICdJTicsXG4gICAgICAgIHZhbHVlOiB2YWx1ZXNcbiAgICB9O1xufVxuZXhwb3J0cy5pc0luID0gaXNJbjtcbmZ1bmN0aW9uIGJlZ2luc1dpdGgodmFsdWUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBjb25kaXRpb246ICdCRUdJTlNfV0lUSCcsXG4gICAgICAgIHZhbHVlczogW3ZhbHVlXVxuICAgIH07XG59XG5mdW5jdGlvbiBiZXR3ZWVuKHZhbHVlcykge1xuICAgIHJldHVybiB7XG4gICAgICAgIGNvbmRpdGlvbjogJ0JFVFdFRU4nLFxuICAgICAgICB2YWx1ZXNcbiAgICB9O1xufVxuZnVuY3Rpb24gZXhpc3RzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGNvbmRpdGlvbjogJ0VYSVNUUycsXG4gICAgICAgIHZhbHVlczogW3RydWVdXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGRvZXNOb3RFeGlzdCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBjb25kaXRpb246ICdOT1RfRVhJU1RTJyxcbiAgICAgICAgdmFsdWVzOiBbdHJ1ZV1cbiAgICB9O1xufVxuZnVuY3Rpb24gaXNHcmVhdGVyVGhhbih2YWx1ZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGNvbmRpdGlvbjogJ0dSRUFURVJfVEhBTicsXG4gICAgICAgIHZhbHVlczogW3ZhbHVlXVxuICAgIH07XG59XG5mdW5jdGlvbiBpc0dyZWF0ZXJUaGFuRXF1YWxUbyh2YWx1ZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGNvbmRpdGlvbjogJ0dSRUFURVJfVEhBTl9FUVVBTF9UTycsXG4gICAgICAgIHZhbHVlczogW3ZhbHVlXVxuICAgIH07XG59XG5mdW5jdGlvbiBpc0xlc3NUaGFuKHZhbHVlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29uZGl0aW9uOiAnTEVTU19USEFOJyxcbiAgICAgICAgdmFsdWVzOiBbdmFsdWVdXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGlzTGVzc1RoYW5FcXVhbFRvKHZhbHVlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29uZGl0aW9uOiAnTEVTU19USEFOX0VRVUFMX1RPJyxcbiAgICAgICAgdmFsdWVzOiBbdmFsdWVdXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGNvbnRhaW5zKHZhbHVlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29uZGl0aW9uOiAnQ09OVEFJTlMnLFxuICAgICAgICB2YWx1ZXM6IFt2YWx1ZV1cbiAgICB9O1xufVxuZnVuY3Rpb24gZG9lc05vdENvbnRhaW4odmFsdWUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBjb25kaXRpb246ICdOT1RfQ09OVEFJTlMnLFxuICAgICAgICB2YWx1ZXM6IFt2YWx1ZV1cbiAgICB9O1xufVxuZnVuY3Rpb24gZXF1YWxzVG8odmFsdWUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBjb25kaXRpb246ICdFUVVBTF9UTycsXG4gICAgICAgIHZhbHVlczogW3ZhbHVlXVxuICAgIH07XG59XG5mdW5jdGlvbiBub3RFcXVhbHNUbyh2YWx1ZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGNvbmRpdGlvbjogJ05PVF9FUVVBTF9UTycsXG4gICAgICAgIHZhbHVlczogW3ZhbHVlXVxuICAgIH07XG59XG5leHBvcnRzLldoZXJlQ29uZGl0aW9ucyA9IHtcbiAgICBiZWdpbnNXaXRoLFxuICAgIGJldHdlZW4sXG4gICAgZXF1YWxzVG8sXG4gICAgaXNHcmVhdGVyVGhhbixcbiAgICBpc0dyZWF0ZXJUaGFuRXF1YWxUbyxcbiAgICBpc0xlc3NUaGFuLFxuICAgIGlzTGVzc1RoYW5FcXVhbFRvXG59O1xuZXhwb3J0cy5GaWx0ZXJDb25kaXRpb25zID0ge1xuICAgIGJlZ2luc1dpdGgsXG4gICAgYmV0d2VlbixcbiAgICBjb250YWlucyxcbiAgICBkb2VzTm90Q29udGFpbixcbiAgICBlcXVhbHNUbyxcbiAgICBub3RFcXVhbHNUbyxcbiAgICBleGlzdHMsXG4gICAgZG9lc05vdEV4aXN0LFxuICAgIGlzR3JlYXRlclRoYW4sXG4gICAgaXNHcmVhdGVyVGhhbkVxdWFsVG8sXG4gICAgaXNMZXNzVGhhbixcbiAgICBpc0xlc3NUaGFuRXF1YWxUb1xufTtcbiIsInZhciBiYXNlR2V0ID0gcmVxdWlyZSgnLi9fYmFzZUdldCcpO1xuXG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBwYXRoYCBvZiBgb2JqZWN0YC4gSWYgdGhlIHJlc29sdmVkIHZhbHVlIGlzXG4gKiBgdW5kZWZpbmVkYCwgdGhlIGBkZWZhdWx0VmFsdWVgIGlzIHJldHVybmVkIGluIGl0cyBwbGFjZS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuNy4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHBhcmFtIHsqfSBbZGVmYXVsdFZhbHVlXSBUaGUgdmFsdWUgcmV0dXJuZWQgZm9yIGB1bmRlZmluZWRgIHJlc29sdmVkIHZhbHVlcy5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiBbeyAnYic6IHsgJ2MnOiAzIH0gfV0gfTtcbiAqXG4gKiBfLmdldChvYmplY3QsICdhWzBdLmIuYycpO1xuICogLy8gPT4gM1xuICpcbiAqIF8uZ2V0KG9iamVjdCwgWydhJywgJzAnLCAnYicsICdjJ10pO1xuICogLy8gPT4gM1xuICpcbiAqIF8uZ2V0KG9iamVjdCwgJ2EuYi5jJywgJ2RlZmF1bHQnKTtcbiAqIC8vID0+ICdkZWZhdWx0J1xuICovXG5mdW5jdGlvbiBnZXQob2JqZWN0LCBwYXRoLCBkZWZhdWx0VmFsdWUpIHtcbiAgdmFyIHJlc3VsdCA9IG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogYmFzZUdldChvYmplY3QsIHBhdGgpO1xuICByZXR1cm4gcmVzdWx0ID09PSB1bmRlZmluZWQgPyBkZWZhdWx0VmFsdWUgOiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkFQSV9QUk9KRUNUU19QRVJNSVNTSU9OU19NQVAgPSBleHBvcnRzLkFQSV9JU1NVRVNfUEVSTUlTU0lPTlNfTUFQID0gdm9pZCAwO1xuY29uc3QgQVBJX0lTU1VFU19QRVJNSVNTSU9OU19NQVAgPSB7XG4gICAgY2FuQXNzaWduOiAnQVNTSUdOX0lTU1VFUycsXG4gICAgY2FuQ3JlYXRlOiAnQ1JFQVRFX0lTU1VFUycsXG4gICAgY2FuRWRpdDogJ0VESVRfSVNTVUVTJyxcbiAgICBjYW5Nb3ZlOiAnTU9WRV9JU1NVRVMnLFxuICAgIGNhbkRlbGV0ZTogJ0RFTEVURV9JU1NVRVMnLFxuICAgIGNhbkFkZENvbW1lbnRzOiAnQUREX0NPTU1FTlRTJyxcbiAgICBjYW5FZGl0QWxsQ29tbWVudHM6ICdFRElUX0FMTF9DT01NRU5UUycsXG4gICAgY2FuRGVsZXRlQWxsQ29tbWVudHM6ICdERUxFVEVfQUxMX0NPTU1FTlRTJyxcbiAgICBjYW5DcmVhdGVBdHRhY2htZW50czogJ0NSRUFURV9BVFRBQ0hNRU5UUycsXG4gICAgY2FuRGVsZXRlQWxsQXR0YWNobWVudHM6ICdERUxFVEVfQUxMX0FUVEFDSE1FTlRTJ1xufTtcbmV4cG9ydHMuQVBJX0lTU1VFU19QRVJNSVNTSU9OU19NQVAgPSBBUElfSVNTVUVTX1BFUk1JU1NJT05TX01BUDtcbmNvbnN0IEFQSV9QUk9KRUNUU19QRVJNSVNTSU9OU19NQVAgPSB7XG4gICAgY2FuQXNzaWduSXNzdWVzOiAnQVNTSUdOX0lTU1VFUycsXG4gICAgY2FuQ3JlYXRlSXNzdWVzOiAnQ1JFQVRFX0lTU1VFUycsXG4gICAgY2FuRWRpdElzc3VlczogJ0VESVRfSVNTVUVTJyxcbiAgICBjYW5Nb3ZlSXNzdWVzOiAnTU9WRV9JU1NVRVMnLFxuICAgIGNhbkRlbGV0ZUlzc3VlczogJ0RFTEVURV9JU1NVRVMnLFxuICAgIGNhbkFkZENvbW1lbnRzOiAnQUREX0NPTU1FTlRTJyxcbiAgICBjYW5FZGl0QWxsQ29tbWVudHM6ICdFRElUX0FMTF9DT01NRU5UUycsXG4gICAgY2FuRGVsZXRlQWxsQ29tbWVudHM6ICdERUxFVEVfQUxMX0NPTU1FTlRTJyxcbiAgICBjYW5DcmVhdGVBdHRhY2htZW50czogJ0NSRUFURV9BVFRBQ0hNRU5UUycsXG4gICAgY2FuRGVsZXRlQWxsQXR0YWNobWVudHM6ICdERUxFVEVfQUxMX0FUVEFDSE1FTlRTJ1xufTtcbmV4cG9ydHMuQVBJX1BST0pFQ1RTX1BFUk1JU1NJT05TX01BUCA9IEFQSV9QUk9KRUNUU19QRVJNSVNTSU9OU19NQVA7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFwO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLl9fcmVxdWVzdEF0bGFzc2lhbkFzVXNlciA9IGV4cG9ydHMuX19yZXF1ZXN0QXRsYXNzaWFuQXNBcHAgPSBleHBvcnRzLmdldEZldGNoQVBJID0gZXhwb3J0cy53cmFwUmVxdWVzdENvbm5lY3RlZERhdGEgPSBleHBvcnRzLndyYXBSZXF1ZXN0VGVhbXdvcmtHcmFwaCA9IGV4cG9ydHMud3JhcFJlcXVlc3RHcmFwaCA9IGV4cG9ydHMuaGFuZGxlUHJveHlSZXNwb25zZUVycm9ycyA9IGV4cG9ydHMuZ2V0Rm9yZ2VQcm94eUVycm9yID0gZXhwb3J0cy5mZXRjaFJlbW90ZSA9IGV4cG9ydHMuX19mZXRjaFByb2R1Y3QgPSB2b2lkIDA7XG5jb25zdCBzYWZlVXJsXzEgPSByZXF1aXJlKFwiLi4vc2FmZVVybFwiKTtcbmNvbnN0IGVycm9yc18xID0gcmVxdWlyZShcIi4vZXJyb3JzXCIpO1xuY29uc3QgcnVudGltZV8xID0gcmVxdWlyZShcIi4vcnVudGltZVwiKTtcbmFzeW5jIGZ1bmN0aW9uIHdyYXBJbk1ldHJpY3Mob3B0aW9ucywgY2IpIHtcbiAgICBjb25zdCBtZXRyaWNzID0gKDAsIHJ1bnRpbWVfMS5fX2dldFJ1bnRpbWUpKCkubWV0cmljcztcbiAgICBtZXRyaWNzLmNvdW50ZXIob3B0aW9ucy5uYW1lLCBvcHRpb25zLnRhZ3MpLmluY3IoKTtcbiAgICBjb25zdCB0aW1lciA9IG1ldHJpY3MudGltaW5nKG9wdGlvbnMubmFtZSwgb3B0aW9ucy50YWdzKS5tZWFzdXJlKCk7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IGNiKCk7XG4gICAgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0aW1lci5zdG9wKCk7XG4gICAgfVxufVxuZnVuY3Rpb24gX19mZXRjaFByb2R1Y3QoYXJncykge1xuICAgIHJldHVybiBhc3luYyAocGF0aCwgaW5pdCkgPT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdsb2JhbC5fX2ZvcmdlX2ZldGNoX18oe1xuICAgICAgICAgICAgdHlwZTogYXJncy50eXBlLFxuICAgICAgICAgICAgcHJvdmlkZXI6IGFyZ3MucHJvdmlkZXIsXG4gICAgICAgICAgICByZW1vdGU6IGFyZ3MucmVtb3RlLFxuICAgICAgICAgICAgYWNjb3VudElkOiBhcmdzLmFjY291bnRJZFxuICAgICAgICB9LCBwYXRoLCBpbml0KTtcbiAgICAgICAgKDAsIGV4cG9ydHMuaGFuZGxlUHJveHlSZXNwb25zZUVycm9ycykocmVzcG9uc2UpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfTtcbn1cbmV4cG9ydHMuX19mZXRjaFByb2R1Y3QgPSBfX2ZldGNoUHJvZHVjdDtcbmZ1bmN0aW9uIGZldGNoUmVtb3RlKGFyZ3MpIHtcbiAgICByZXR1cm4gYXN5bmMgKHBhdGgsIGluaXQpID0+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnbG9iYWwuX19mb3JnZV9mZXRjaF9fKHtcbiAgICAgICAgICAgIHR5cGU6ICd0cHAnLFxuICAgICAgICAgICAgcHJvdmlkZXI6IGFyZ3MucHJvdmlkZXIsXG4gICAgICAgICAgICByZW1vdGU6IGFyZ3MucmVtb3RlLFxuICAgICAgICAgICAgYWNjb3VudElkOiBhcmdzLmFjY291bnRcbiAgICAgICAgfSwgcGF0aCwgaW5pdCk7XG4gICAgICAgICgwLCBleHBvcnRzLmhhbmRsZVByb3h5UmVzcG9uc2VFcnJvcnMpKHJlc3BvbnNlKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH07XG59XG5leHBvcnRzLmZldGNoUmVtb3RlID0gZmV0Y2hSZW1vdGU7XG5mdW5jdGlvbiBnZXREZWZhdWx0UmVtb3RlKHByb3ZpZGVyKSB7XG4gICAgY29uc3QgZXh0ZXJuYWxBdXRoUHJvdmlkZXIgPSBmaW5kRXh0ZXJuYWxBdXRoUHJvdmlkZXJDb25maWdPclRocm93KHByb3ZpZGVyKTtcbiAgICBpZiAoIWV4dGVybmFsQXV0aFByb3ZpZGVyLnJlbW90ZXMubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTWlzc2luZyByZW1vdGUgY29uZmlnIGZvciBwcm92aWRlciAke3Byb3ZpZGVyfWApO1xuICAgIH1cbiAgICByZXR1cm4gZXh0ZXJuYWxBdXRoUHJvdmlkZXIucmVtb3Rlc1swXS5rZXk7XG59XG5mdW5jdGlvbiBmaW5kRXh0ZXJuYWxBdXRoUHJvdmlkZXJDb25maWdPclRocm93KHByb3ZpZGVyKSB7XG4gICAgY29uc3QgeyBleHRlcm5hbEF1dGggfSA9ICgwLCBydW50aW1lXzEuX19nZXRSdW50aW1lKSgpO1xuICAgIGNvbnN0IGV4dGVybmFsQXV0aFByb3ZpZGVyID0gZXh0ZXJuYWxBdXRoPy5maW5kKChleHRlcm5hbEF1dGhNZXRhRGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4gZXh0ZXJuYWxBdXRoTWV0YURhdGEuc2VydmljZSA9PT0gcHJvdmlkZXI7XG4gICAgfSk7XG4gICAgaWYgKCFleHRlcm5hbEF1dGhQcm92aWRlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEJhZCBwcm92aWRlciBvciBtaXNzaW5nIGNvbmZpZyBmb3IgcHJvdmlkZXIgJHtwcm92aWRlcn1gKTtcbiAgICB9XG4gICAgcmV0dXJuIGV4dGVybmFsQXV0aFByb3ZpZGVyO1xufVxuY29uc3QgQVRMQVNTSUFOX1RPS0VOX1NFUlZJQ0VfS0VZID0gJ2F0bGFzc2lhbi10b2tlbi1zZXJ2aWNlLWtleSc7XG5jb25zdCBnZXRGb3JnZVByb3h5RXJyb3IgPSAocmVzcG9uc2UpID0+IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdmb3JnZS1wcm94eS1lcnJvcicpO1xuZXhwb3J0cy5nZXRGb3JnZVByb3h5RXJyb3IgPSBnZXRGb3JnZVByb3h5RXJyb3I7XG5jb25zdCBoYW5kbGVQcm94eVJlc3BvbnNlRXJyb3JzID0gKHJlc3BvbnNlKSA9PiB7XG4gICAgY29uc3QgZXJyb3JSZWFzb24gPSAoMCwgZXhwb3J0cy5nZXRGb3JnZVByb3h5RXJyb3IpKHJlc3BvbnNlKTtcbiAgICBpZiAoZXJyb3JSZWFzb24pIHtcbiAgICAgICAgaWYgKGVycm9yUmVhc29uID09PSAnTkVFRFNfQVVUSEVOVElDQVRJT05fRVJSJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLk5lZWRzQXV0aGVudGljYXRpb25FcnJvcignQXV0aGVudGljYXRpb24gUmVxdWlyZWQnLCBBVExBU1NJQU5fVE9LRU5fU0VSVklDRV9LRVkpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5Qcm94eVJlcXVlc3RFcnJvcihyZXNwb25zZS5zdGF0dXMsIGVycm9yUmVhc29uKTtcbiAgICB9XG59O1xuZXhwb3J0cy5oYW5kbGVQcm94eVJlc3BvbnNlRXJyb3JzID0gaGFuZGxlUHJveHlSZXNwb25zZUVycm9ycztcbmZ1bmN0aW9uIGxhenlUaHJvd05lZWRzQXV0aGVudGljYXRpb25FcnJvcihzZXJ2aWNlS2V5KSB7XG4gICAgcmV0dXJuIGFzeW5jIChzY29wZXMpID0+IHdyYXBJbk1ldHJpY3MoeyBuYW1lOiAnYXBpLmFzVXNlci53aXRoUHJvdmlkZXIucmVxdWVzdENyZWRlbnRpYWxzJywgdGFnczogeyBwYXNzaW5nU2NvcGVzOiBTdHJpbmcoISFzY29wZXMpIH0gfSwgYXN5bmMgKCkgPT4ge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuTmVlZHNBdXRoZW50aWNhdGlvbkVycm9yKCdBdXRoZW50aWNhdGlvbiBSZXF1aXJlZCcsIHNlcnZpY2VLZXksIHsgc2NvcGVzLCBpc0V4cGVjdGVkRXJyb3I6IHRydWUgfSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBidWlsZEV4dGVybmFsQXV0aEFjY291bnRzSW5mbyhwcm92aWRlciwgcmVtb3RlKSB7XG4gICAgY29uc3QgeyBhY2NvdW50cyB9ID0gZmluZEV4dGVybmFsQXV0aFByb3ZpZGVyQ29uZmlnT3JUaHJvdyhwcm92aWRlcik7XG4gICAgY29uc3QgYnVpbGRBY2NvdW50TW9kZWwgPSAoYWNjb3VudCkgPT4ge1xuICAgICAgICBjb25zdCB7IGV4dGVybmFsQWNjb3VudElkOiBpZCwgLi4ucmVzdCB9ID0gYWNjb3VudDtcbiAgICAgICAgcmV0dXJuIHsgLi4ucmVzdCwgaWQgfTtcbiAgICB9O1xuICAgIGNvbnN0IGJ1aWxkRXh0ZXJuYWxBdXRoQWNjb3VudE1ldGhvZHMgPSAoYWNjb3VudCwgb3V0Ym91bmRBdXRoQWNjb3VudElkKSA9PiAoe1xuICAgICAgICBoYXNDcmVkZW50aWFsczogYXN5bmMgKHNjb3BlcykgPT4gd3JhcEluTWV0cmljcyh7IG5hbWU6ICdhcGkuYXNVc2VyLndpdGhQcm92aWRlci5oYXNDcmVkZW50aWFscycsIHRhZ3M6IHsgcGFzc2luZ1Njb3BlczogU3RyaW5nKCEhc2NvcGVzKSB9IH0sIGFzeW5jICgpID0+ICFzY29wZXMgfHwgc2NvcGVzLmV2ZXJ5KChzY29wZSkgPT4gYWNjb3VudC5zY29wZXMuaW5jbHVkZXMoc2NvcGUpKSksXG4gICAgICAgIHJlcXVlc3RDcmVkZW50aWFsczogbGF6eVRocm93TmVlZHNBdXRoZW50aWNhdGlvbkVycm9yKHByb3ZpZGVyKSxcbiAgICAgICAgZ2V0QWNjb3VudDogYXN5bmMgKCkgPT4gd3JhcEluTWV0cmljcyh7IG5hbWU6ICdhcGkuYXNVc2VyLndpdGhQcm92aWRlci5nZXRBY2NvdW50JyB9LCBhc3luYyAoKSA9PiBhY2NvdW50KSxcbiAgICAgICAgZmV0Y2g6IHdyYXBXaXRoUm91dGVVbndyYXBwZXIoZmV0Y2hSZW1vdGUoeyBwcm92aWRlciwgcmVtb3RlOiByZW1vdGUgPz8gZ2V0RGVmYXVsdFJlbW90ZShwcm92aWRlciksIGFjY291bnQ6IG91dGJvdW5kQXV0aEFjY291bnRJZCB9KSlcbiAgICB9KTtcbiAgICByZXR1cm4gYWNjb3VudHMubWFwKChhY2NvdW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGF1dGhBY2NvdW50ID0gYnVpbGRBY2NvdW50TW9kZWwoYWNjb3VudCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhY2NvdW50OiBhdXRoQWNjb3VudCxcbiAgICAgICAgICAgIG1ldGhvZHM6IGJ1aWxkRXh0ZXJuYWxBdXRoQWNjb3VudE1ldGhvZHMoYXV0aEFjY291bnQsIGFjY291bnQuaWQpXG4gICAgICAgIH07XG4gICAgfSk7XG59XG5jb25zdCB0aHJvd05vdEltcGxlbWVudGVkRXJyb3IgPSAoKSA9PiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdub3QgaW1wbGVtZW50ZWQnKTtcbn07XG5jb25zdCB3aXRoUHJvdmlkZXIgPSAocHJvdmlkZXIsIHJlbW90ZSkgPT4ge1xuICAgIGNvbnN0IGFjY291bnRzSW5mbyA9IGJ1aWxkRXh0ZXJuYWxBdXRoQWNjb3VudHNJbmZvKHByb3ZpZGVyLCByZW1vdGUpO1xuICAgIGNvbnN0IGRlZmF1bHRBY2NvdW50SW5mbyA9IGFjY291bnRzSW5mby5sZW5ndGggPyBhY2NvdW50c0luZm9bMF0gOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgbGF6eVRocm93Tm9WYWxpZENyZWRlbnRpYWxzRXJyb3IgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiAodXJsKSA9PiB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZldGNoIGZhaWxlZCBmb3IgJHtyZW1vdGUgPyBgcmVtb3RlICcke3JlbW90ZX0nLCBgIDogJyd9cHJvdmlkZXIgJyR7cHJvdmlkZXJ9JywgcGF0aCAnJHt1cmx9JyBubyBjcmVkZW50aWFscyBwcmV2aW91c2x5IHJlcXVlc3RlZGApO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGFzQ3JlZGVudGlhbHM6IGFzeW5jIChzY29wZXMpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0QWNjb3VudEluZm9cbiAgICAgICAgICAgICAgICA/IGF3YWl0IGRlZmF1bHRBY2NvdW50SW5mby5tZXRob2RzLmhhc0NyZWRlbnRpYWxzKHNjb3BlcylcbiAgICAgICAgICAgICAgICA6IGF3YWl0IHdyYXBJbk1ldHJpY3MoeyBuYW1lOiAnYXBpLmFzVXNlci53aXRoUHJvdmlkZXIuaGFzQ3JlZGVudGlhbHMnLCB0YWdzOiB7IHBhc3NpbmdTY29wZXM6IFN0cmluZyghIXNjb3BlcykgfSB9LCBhc3luYyAoKSA9PiBmYWxzZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldEFjY291bnQ6IGFzeW5jICgpID0+IHdyYXBJbk1ldHJpY3MoeyBuYW1lOiAnYXBpLmFzVXNlci53aXRoUHJvdmlkZXIuZ2V0QWNjb3VudCcgfSwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRBY2NvdW50SW5mbyA/IGRlZmF1bHRBY2NvdW50SW5mby5hY2NvdW50IDogdW5kZWZpbmVkO1xuICAgICAgICB9KSxcbiAgICAgICAgcmVxdWVzdENyZWRlbnRpYWxzOiBsYXp5VGhyb3dOZWVkc0F1dGhlbnRpY2F0aW9uRXJyb3IocHJvdmlkZXIpLFxuICAgICAgICBsaXN0Q3JlZGVudGlhbHM6IHRocm93Tm90SW1wbGVtZW50ZWRFcnJvcixcbiAgICAgICAgbGlzdEFjY291bnRzOiBhc3luYyAoKSA9PiB3cmFwSW5NZXRyaWNzKHsgbmFtZTogJ2FwaS5hc1VzZXIud2l0aFByb3ZpZGVyLmxpc3RBY2NvdW50cycgfSwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGFjY291bnRzSW5mby5tYXAoKHsgYWNjb3VudCB9KSA9PiBhY2NvdW50KTtcbiAgICAgICAgfSksXG4gICAgICAgIGFzQWNjb3VudDogKGV4dGVybmFsQWNjb3VudElkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhY2NvdW50SW5mbyA9IGFjY291bnRzSW5mby5maW5kKCh7IGFjY291bnQgfSkgPT4gYWNjb3VudC5pZCA9PT0gZXh0ZXJuYWxBY2NvdW50SWQpO1xuICAgICAgICAgICAgaWYgKCFhY2NvdW50SW5mbykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gYWNjb3VudCB3aXRoIElEICR7ZXh0ZXJuYWxBY2NvdW50SWR9IGZvdW5kIGZvciBwcm92aWRlciAke3Byb3ZpZGVyfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjY291bnRJbmZvLm1ldGhvZHM7XG4gICAgICAgIH0sXG4gICAgICAgIGZldGNoOiBkZWZhdWx0QWNjb3VudEluZm8gPyBkZWZhdWx0QWNjb3VudEluZm8ubWV0aG9kcy5mZXRjaCA6IGxhenlUaHJvd05vVmFsaWRDcmVkZW50aWFsc0Vycm9yKClcbiAgICB9O1xufTtcbmNvbnN0IHdyYXBXaXRoUm91dGVVbndyYXBwZXIgPSAoZmV0Y2gpID0+IChwYXRoLCBpbml0KSA9PiB7XG4gICAgY29uc3Qgc3RyaW5nUGF0aCA9ICgwLCBzYWZlVXJsXzEuaXNSb3V0ZSkocGF0aCkgPyBwYXRoLnZhbHVlIDogcGF0aDtcbiAgICByZXR1cm4gZmV0Y2goc3RyaW5nUGF0aCwgaW5pdCk7XG59O1xuY29uc3Qgd3JhcFJlcXVlc3RQcm9kdWN0ID0gKHJlcXVlc3RQcm9kdWN0KSA9PiAocGF0aCwgaW5pdCkgPT4ge1xuICAgIGNvbnN0IHNhZmVVcmwgPSAoMCwgc2FmZVVybF8xLnJlcXVpcmVTYWZlVXJsKShwYXRoKTtcbiAgICByZXR1cm4gcmVxdWVzdFByb2R1Y3Qoc2FmZVVybC52YWx1ZSwgaW5pdCk7XG59O1xuY29uc3Qgd3JhcFJlcXVlc3RHcmFwaCA9IChyZXF1ZXN0R3JhcGhBcGkpID0+IChxdWVyeSwgdmFyaWFibGVzLCBoZWFkZXJzID0ge30pID0+IHJlcXVlc3RHcmFwaEFwaSgnL2dyYXBocWwnLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgaGVhZGVyczogeyAuLi5oZWFkZXJzLCAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBxdWVyeSxcbiAgICAgICAgLi4uKHZhcmlhYmxlcyA/IHsgdmFyaWFibGVzIH0gOiB7fSlcbiAgICB9KVxufSk7XG5leHBvcnRzLndyYXBSZXF1ZXN0R3JhcGggPSB3cmFwUmVxdWVzdEdyYXBoO1xuY29uc3Qgd3JhcFJlcXVlc3RUZWFtd29ya0dyYXBoID0gKHJlcXVlc3RHcmFwaEFwaSkgPT4gKHF1ZXJ5LCB2YXJpYWJsZXMsIG9wZXJhdGlvbk5hbWUsIGV4dGVuc2lvbnMsIGhlYWRlcnMgPSB7fSkgPT4gcmVxdWVzdEdyYXBoQXBpKCcvZ3JhcGhxbC90d2cnLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgaGVhZGVyczogeyAuLi5oZWFkZXJzLCAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBxdWVyeSxcbiAgICAgICAgLi4uKHZhcmlhYmxlcyA/IHsgdmFyaWFibGVzIH0gOiB7fSksXG4gICAgICAgIC4uLihvcGVyYXRpb25OYW1lID8geyBvcGVyYXRpb25OYW1lIH0gOiB7fSksXG4gICAgICAgIC4uLihleHRlbnNpb25zID8geyBleHRlbnNpb25zIH0gOiB7fSlcbiAgICB9KVxufSk7XG5leHBvcnRzLndyYXBSZXF1ZXN0VGVhbXdvcmtHcmFwaCA9IHdyYXBSZXF1ZXN0VGVhbXdvcmtHcmFwaDtcbmNvbnN0IHdyYXBSZXF1ZXN0Q29ubmVjdGVkRGF0YSA9IChmZXRjaCkgPT4gKHBhdGgsIGluaXQpID0+IHtcbiAgICBjb25zdCBzYWZlVXJsID0gKDAsIHNhZmVVcmxfMS5yZXF1aXJlU2FmZVVybCkocGF0aCk7XG4gICAgcmV0dXJuIGZldGNoKGAvY29ubmVjdGVkLWRhdGEvJHtzYWZlVXJsLnZhbHVlLnJlcGxhY2UoL15cXC8rLywgJycpfWAsIGluaXQpO1xufTtcbmV4cG9ydHMud3JhcFJlcXVlc3RDb25uZWN0ZWREYXRhID0gd3JhcFJlcXVlc3RDb25uZWN0ZWREYXRhO1xuZnVuY3Rpb24gZ2V0RmV0Y2hBUEkoKSB7XG4gICAgaWYgKGdsb2JhbC5mZXRjaCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGdsb2JhbC5mZXRjaCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGZldGNoIGZ1bmN0aW9uIGlzIG5vdCBhdmFpbGFibGUnKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmV0Y2g6IHdyYXBXaXRoUm91dGVVbndyYXBwZXIoZmV0Y2gpLFxuICAgICAgICByZXF1ZXN0SmlyYTogd3JhcFJlcXVlc3RQcm9kdWN0KF9fZmV0Y2hQcm9kdWN0KHsgcHJvdmlkZXI6ICdub25lJywgcmVtb3RlOiAnamlyYScsIHR5cGU6ICdmcHAnIH0pKSxcbiAgICAgICAgcmVxdWVzdENvbmZsdWVuY2U6IHdyYXBSZXF1ZXN0UHJvZHVjdChfX2ZldGNoUHJvZHVjdCh7IHByb3ZpZGVyOiAnbm9uZScsIHJlbW90ZTogJ2NvbmZsdWVuY2UnLCB0eXBlOiAnZnBwJyB9KSksXG4gICAgICAgIHJlcXVlc3RCaXRidWNrZXQ6IHdyYXBSZXF1ZXN0UHJvZHVjdChfX2ZldGNoUHJvZHVjdCh7IHByb3ZpZGVyOiAnbm9uZScsIHJlbW90ZTogJ2JpdGJ1Y2tldCcsIHR5cGU6ICdmcHAnIH0pKSxcbiAgICAgICAgYXNVc2VyOiAodXNlcklkKSA9PiAoe1xuICAgICAgICAgICAgcmVxdWVzdEppcmE6IHdyYXBSZXF1ZXN0UHJvZHVjdChfX2ZldGNoUHJvZHVjdCh7IHByb3ZpZGVyOiAndXNlcicsIHJlbW90ZTogJ2ppcmEnLCB0eXBlOiAnZnBwJywgYWNjb3VudElkOiB1c2VySWQgfSkpLFxuICAgICAgICAgICAgcmVxdWVzdENvbmZsdWVuY2U6IHdyYXBSZXF1ZXN0UHJvZHVjdChfX2ZldGNoUHJvZHVjdCh7IHByb3ZpZGVyOiAndXNlcicsIHJlbW90ZTogJ2NvbmZsdWVuY2UnLCB0eXBlOiAnZnBwJywgYWNjb3VudElkOiB1c2VySWQgfSkpLFxuICAgICAgICAgICAgcmVxdWVzdEJpdGJ1Y2tldDogd3JhcFJlcXVlc3RQcm9kdWN0KF9fZmV0Y2hQcm9kdWN0KHsgcHJvdmlkZXI6ICd1c2VyJywgcmVtb3RlOiAnYml0YnVja2V0JywgdHlwZTogJ2ZwcCcsIGFjY291bnRJZDogdXNlcklkIH0pKSxcbiAgICAgICAgICAgIHJlcXVlc3RHcmFwaDogKDAsIGV4cG9ydHMud3JhcFJlcXVlc3RHcmFwaCkoX19mZXRjaFByb2R1Y3QoeyBwcm92aWRlcjogJ3VzZXInLCByZW1vdGU6ICdzdGFyZ2F0ZScsIHR5cGU6ICdmcHAnLCBhY2NvdW50SWQ6IHVzZXJJZCB9KSksXG4gICAgICAgICAgICByZXF1ZXN0VGVhbXdvcmtHcmFwaDogKDAsIGV4cG9ydHMud3JhcFJlcXVlc3RUZWFtd29ya0dyYXBoKShfX2ZldGNoUHJvZHVjdCh7IHByb3ZpZGVyOiAndXNlcicsIHJlbW90ZTogJ3N0YXJnYXRlJywgdHlwZTogJ2ZwcCcsIGFjY291bnRJZDogdXNlcklkIH0pKSxcbiAgICAgICAgICAgIHJlcXVlc3RDb25uZWN0ZWREYXRhOiAoMCwgZXhwb3J0cy53cmFwUmVxdWVzdENvbm5lY3RlZERhdGEpKF9fZmV0Y2hQcm9kdWN0KHsgcHJvdmlkZXI6ICd1c2VyJywgcmVtb3RlOiAnc3RhcmdhdGUnLCB0eXBlOiAnZnBwJyB9KSksXG4gICAgICAgICAgICByZXF1ZXN0QXRsYXNzaWFuOiB3cmFwUmVxdWVzdFByb2R1Y3QoX19mZXRjaFByb2R1Y3QoeyBwcm92aWRlcjogJ3VzZXInLCByZW1vdGU6ICdzdGFyZ2F0ZScsIHR5cGU6ICdmcHAnLCBhY2NvdW50SWQ6IHVzZXJJZCB9KSksXG4gICAgICAgICAgICB3aXRoUHJvdmlkZXJcbiAgICAgICAgfSksXG4gICAgICAgIGFzQXBwOiAoKSA9PiAoe1xuICAgICAgICAgICAgcmVxdWVzdEppcmE6IHdyYXBSZXF1ZXN0UHJvZHVjdChfX2ZldGNoUHJvZHVjdCh7IHByb3ZpZGVyOiAnYXBwJywgcmVtb3RlOiAnamlyYScsIHR5cGU6ICdmcHAnIH0pKSxcbiAgICAgICAgICAgIHJlcXVlc3RDb25mbHVlbmNlOiB3cmFwUmVxdWVzdFByb2R1Y3QoX19mZXRjaFByb2R1Y3QoeyBwcm92aWRlcjogJ2FwcCcsIHJlbW90ZTogJ2NvbmZsdWVuY2UnLCB0eXBlOiAnZnBwJyB9KSksXG4gICAgICAgICAgICByZXF1ZXN0Qml0YnVja2V0OiB3cmFwUmVxdWVzdFByb2R1Y3QoX19mZXRjaFByb2R1Y3QoeyBwcm92aWRlcjogJ2FwcCcsIHJlbW90ZTogJ2JpdGJ1Y2tldCcsIHR5cGU6ICdmcHAnIH0pKSxcbiAgICAgICAgICAgIHJlcXVlc3RHcmFwaDogKDAsIGV4cG9ydHMud3JhcFJlcXVlc3RHcmFwaCkoX19mZXRjaFByb2R1Y3QoeyBwcm92aWRlcjogJ2FwcCcsIHJlbW90ZTogJ3N0YXJnYXRlJywgdHlwZTogJ2ZwcCcgfSkpLFxuICAgICAgICAgICAgcmVxdWVzdENvbm5lY3RlZERhdGE6ICgwLCBleHBvcnRzLndyYXBSZXF1ZXN0Q29ubmVjdGVkRGF0YSkoX19mZXRjaFByb2R1Y3QoeyBwcm92aWRlcjogJ2FwcCcsIHJlbW90ZTogJ3N0YXJnYXRlJywgdHlwZTogJ2ZwcCcgfSkpLFxuICAgICAgICAgICAgcmVxdWVzdEF0bGFzc2lhbjogd3JhcFJlcXVlc3RQcm9kdWN0KF9fZmV0Y2hQcm9kdWN0KHsgcHJvdmlkZXI6ICdhcHAnLCByZW1vdGU6ICdzdGFyZ2F0ZScsIHR5cGU6ICdmcHAnIH0pKVxuICAgICAgICB9KVxuICAgIH07XG59XG5leHBvcnRzLmdldEZldGNoQVBJID0gZ2V0RmV0Y2hBUEk7XG5mdW5jdGlvbiBnZXRSZXF1ZXN0U3RhcmdhdGUocHJvdmlkZXIpIHtcbiAgICBpZiAocHJvdmlkZXIgIT09ICdhcHAnICYmIHByb3ZpZGVyICE9PSAndXNlcicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBwcm92aWRlcjogJHtwcm92aWRlcn1gKTtcbiAgICB9XG4gICAgcmV0dXJuIF9fZmV0Y2hQcm9kdWN0KHsgcHJvdmlkZXIsIHJlbW90ZTogJ3N0YXJnYXRlJywgdHlwZTogJ2ZwcCcgfSk7XG59XG5leHBvcnRzLl9fcmVxdWVzdEF0bGFzc2lhbkFzQXBwID0gZ2V0UmVxdWVzdFN0YXJnYXRlKCdhcHAnKTtcbmV4cG9ydHMuX19yZXF1ZXN0QXRsYXNzaWFuQXNVc2VyID0gZ2V0UmVxdWVzdFN0YXJnYXRlKCd1c2VyJyk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEFQSV9QRVJNSVNTSU9OU19NQVAgPSB7XG4gICAgY2FuUmVhZDogJ3JlYWQnLFxuICAgIGNhblVwZGF0ZTogJ3VwZGF0ZScsXG4gICAgY2FuRGVsZXRlOiAnZGVsZXRlJ1xufTtcbmV4cG9ydHMuZGVmYXVsdCA9IEFQSV9QRVJNSVNTSU9OU19NQVA7XG4iLCJ2YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzU3ltYm9sID0gcmVxdWlyZSgnLi9pc1N5bWJvbCcpO1xuXG4vKiogVXNlZCB0byBtYXRjaCBwcm9wZXJ0eSBuYW1lcyB3aXRoaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVJc0RlZXBQcm9wID0gL1xcLnxcXFsoPzpbXltcXF1dKnwoW1wiJ10pKD86KD8hXFwxKVteXFxcXF18XFxcXC4pKj9cXDEpXFxdLyxcbiAgICByZUlzUGxhaW5Qcm9wID0gL15cXHcqJC87XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwcm9wZXJ0eSBuYW1lIGFuZCBub3QgYSBwcm9wZXJ0eSBwYXRoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5IGtleXMgb24uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3BlcnR5IG5hbWUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXkodmFsdWUsIG9iamVjdCkge1xuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIGlmICh0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ3N5bWJvbCcgfHwgdHlwZSA9PSAnYm9vbGVhbicgfHxcbiAgICAgIHZhbHVlID09IG51bGwgfHwgaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIHJlSXNQbGFpblByb3AudGVzdCh2YWx1ZSkgfHwgIXJlSXNEZWVwUHJvcC50ZXN0KHZhbHVlKSB8fFxuICAgIChvYmplY3QgIT0gbnVsbCAmJiB2YWx1ZSBpbiBPYmplY3Qob2JqZWN0KSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNLZXk7XG4iLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBhc3NvY0luZGV4T2YodGhpcy5fX2RhdGFfXywga2V5KSA+IC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3RDYWNoZUhhcztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5hdXRob3JpemUgPSB2b2lkIDA7XG5jb25zdCBhdXRoXzEgPSByZXF1aXJlKFwiQGZvcmdlL2F1dGhcIik7XG5jb25zdCBfXzEgPSByZXF1aXJlKFwiLi5cIik7XG5jb25zdCBhdXRob3JpemUgPSAoKSA9PiB7XG4gICAgY29uc3QgYWNjb3VudElkID0gKDAsIF9fMS5fX2dldFJ1bnRpbWUpKCkuYWFpZDtcbiAgICBpZiAoIWFjY291bnRJZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkbuKAmXQgZmluZCB0aGUgYWNjb3VudElkIG9mIHRoZSBpbnZva2luZyB1c2VyLiBUaGlzIEFQSSBjYW4gb25seSBiZSB1c2VkIGluc2lkZSB1c2VyLWludm9rZWQgbW9kdWxlcy5gKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgLi4uKDAsIGF1dGhfMS5hdXRob3JpemVDb25mbHVlbmNlV2l0aEZldGNoKShhc3luYyAocGF0aCwgb3B0cykgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgKDAsIF9fMS5hc1VzZXIpKCkucmVxdWVzdENvbmZsdWVuY2UoKDAsIF9fMS5hc3N1bWVUcnVzdGVkUm91dGUpKHBhdGgpLCBvcHRzKTtcbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgICB9LCBhY2NvdW50SWQpLFxuICAgICAgICAuLi4oMCwgYXV0aF8xLmF1dGhvcml6ZUppcmFXaXRoRmV0Y2gpKGFzeW5jIChwYXRoLCBvcHRzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCAoMCwgX18xLmFzVXNlcikoKS5yZXF1ZXN0SmlyYSgoMCwgX18xLmFzc3VtZVRydXN0ZWRSb3V0ZSkocGF0aCksIG9wdHMpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICAgIH0sIGFjY291bnRJZClcbiAgICB9O1xufTtcbmV4cG9ydHMuYXV0aG9yaXplID0gYXV0aG9yaXplO1xuIiwidmFyIGZyZWVHbG9iYWwgPSByZXF1aXJlKCcuL19mcmVlR2xvYmFsJyk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxubW9kdWxlLmV4cG9ydHMgPSByb290O1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyB1c2luZyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb2JqZWN0VG9TdHJpbmc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQXBpTm90UmVhZHlFcnJvciA9IGV4cG9ydHMuUHJveHlSZXF1ZXN0RXJyb3IgPSBleHBvcnRzLkludmFsaWRDb250YWluZXJTZXJ2aWNlRXJyb3IgPSBleHBvcnRzLkludmFsaWRSZW1vdGVFcnJvciA9IGV4cG9ydHMuTmVlZHNBdXRoZW50aWNhdGlvbkVycm9yID0gZXhwb3J0cy5JbnZhbGlkV29ya3NwYWNlUmVxdWVzdGVkRXJyb3IgPSBleHBvcnRzLlJlcXVlc3RQcm9kdWN0Tm90QWxsb3dlZEVycm9yID0gZXhwb3J0cy5Qcm9kdWN0RW5kcG9pbnROb3RBbGxvd2VkRXJyb3IgPSBleHBvcnRzLkV4dGVybmFsRW5kcG9pbnROb3RBbGxvd2VkRXJyb3IgPSBleHBvcnRzLk5vdEFsbG93ZWRFcnJvciA9IGV4cG9ydHMuRmV0Y2hFcnJvciA9IGV4cG9ydHMuSHR0cEVycm9yID0gZXhwb3J0cy5pc0V4cGVjdGVkRXJyb3IgPSBleHBvcnRzLmlzSG9zdGVkQ29kZUVycm9yID0gZXhwb3J0cy5pc0ZvcmdlUGxhdGZvcm1FcnJvciA9IGV4cG9ydHMuQVBJX05PVF9SRUFEWV9FUlIgPSBleHBvcnRzLlBST1hZX0VSUiA9IGV4cG9ydHMuSU5WQUxJRF9DT05UQUlORVJfU0VSVklDRV9FUlIgPSBleHBvcnRzLklOVkFMSURfUkVNT1RFX0VSUiA9IGV4cG9ydHMuTkVFRFNfQVVUSEVOVElDQVRJT05fRVJSID0gZXhwb3J0cy5GVU5DVElPTl9GRVRDSF9FUlIgPSBleHBvcnRzLlJFUVVFU1RfRUdSRVNTX0FMTE9XTElTVF9FUlIgPSBleHBvcnRzLkZVTkNUSU9OX0VSUiA9IHZvaWQgMDtcbmV4cG9ydHMuRlVOQ1RJT05fRVJSID0gJ0ZVTkNUSU9OX0VSUic7XG5leHBvcnRzLlJFUVVFU1RfRUdSRVNTX0FMTE9XTElTVF9FUlIgPSAnUkVRVUVTVF9FR1JFU1NfQUxMT1dMSVNUX0VSUic7XG5leHBvcnRzLkZVTkNUSU9OX0ZFVENIX0VSUiA9ICdGVU5DVElPTl9GRVRDSF9FUlInO1xuZXhwb3J0cy5ORUVEU19BVVRIRU5USUNBVElPTl9FUlIgPSAnTkVFRFNfQVVUSEVOVElDQVRJT05fRVJSJztcbmV4cG9ydHMuSU5WQUxJRF9SRU1PVEVfRVJSID0gJ0lOVkFMSURfUkVNT1RFX0VSUic7XG5leHBvcnRzLklOVkFMSURfQ09OVEFJTkVSX1NFUlZJQ0VfRVJSID0gJ0lOVkFMSURfQ09OVEFJTkVSX1NFUlZJQ0VfRVJSJztcbmV4cG9ydHMuUFJPWFlfRVJSID0gJ1BST1hZX0VSUic7XG5leHBvcnRzLkFQSV9OT1RfUkVBRFlfRVJSID0gJ0FQSV9OT1RfUkVBRFlfRVJSJztcbmZ1bmN0aW9uIGlzRm9yZ2VQbGF0Zm9ybUVycm9yKGVycikge1xuICAgIHJldHVybiBbXG4gICAgICAgIGV4cG9ydHMuUkVRVUVTVF9FR1JFU1NfQUxMT1dMSVNUX0VSUixcbiAgICAgICAgZXhwb3J0cy5GVU5DVElPTl9GRVRDSF9FUlIsXG4gICAgICAgIGV4cG9ydHMuTkVFRFNfQVVUSEVOVElDQVRJT05fRVJSLFxuICAgICAgICBleHBvcnRzLlBST1hZX0VSUixcbiAgICAgICAgZXhwb3J0cy5BUElfTk9UX1JFQURZX0VSUlxuICAgIF0uaW5jbHVkZXMoZXJyLm5hbWUpO1xufVxuZXhwb3J0cy5pc0ZvcmdlUGxhdGZvcm1FcnJvciA9IGlzRm9yZ2VQbGF0Zm9ybUVycm9yO1xuZnVuY3Rpb24gaXNIb3N0ZWRDb2RlRXJyb3IoZXJyKSB7XG4gICAgcmV0dXJuIFtleHBvcnRzLkZVTkNUSU9OX0VSUiwgZXhwb3J0cy5SRVFVRVNUX0VHUkVTU19BTExPV0xJU1RfRVJSLCBleHBvcnRzLkZVTkNUSU9OX0ZFVENIX0VSUiwgZXhwb3J0cy5ORUVEU19BVVRIRU5USUNBVElPTl9FUlJdLmluY2x1ZGVzKHR5cGVvZiBlcnIgPT09ICdzdHJpbmcnID8gZXJyIDogZXJyLm5hbWUpO1xufVxuZXhwb3J0cy5pc0hvc3RlZENvZGVFcnJvciA9IGlzSG9zdGVkQ29kZUVycm9yO1xuZnVuY3Rpb24gaXNFeHBlY3RlZEVycm9yKGVycikge1xuICAgIHJldHVybiBlcnIubmFtZSA9PT0gZXhwb3J0cy5ORUVEU19BVVRIRU5USUNBVElPTl9FUlIgJiYgISFlcnIub3B0aW9ucz8uaXNFeHBlY3RlZEVycm9yO1xufVxuZXhwb3J0cy5pc0V4cGVjdGVkRXJyb3IgPSBpc0V4cGVjdGVkRXJyb3I7XG5jbGFzcyBIdHRwRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgc3RhdHVzO1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgfVxufVxuZXhwb3J0cy5IdHRwRXJyb3IgPSBIdHRwRXJyb3I7XG5jbGFzcyBGZXRjaEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKGNhdXNlKSB7XG4gICAgICAgIHN1cGVyKGNhdXNlKTtcbiAgICAgICAgdGhpcy5zdGFjayA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5uYW1lID0gZXhwb3J0cy5GVU5DVElPTl9GRVRDSF9FUlI7XG4gICAgfVxufVxuZXhwb3J0cy5GZXRjaEVycm9yID0gRmV0Y2hFcnJvcjtcbmNsYXNzIE5vdEFsbG93ZWRFcnJvciBleHRlbmRzIEh0dHBFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5zdGFjayA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5uYW1lID0gZXhwb3J0cy5SRVFVRVNUX0VHUkVTU19BTExPV0xJU1RfRVJSO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IDQwMztcbiAgICB9XG59XG5leHBvcnRzLk5vdEFsbG93ZWRFcnJvciA9IE5vdEFsbG93ZWRFcnJvcjtcbmNsYXNzIEV4dGVybmFsRW5kcG9pbnROb3RBbGxvd2VkRXJyb3IgZXh0ZW5kcyBOb3RBbGxvd2VkRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKGZhaWxlZFVSTCkge1xuICAgICAgICBzdXBlcihgVVJMIG5vdCBpbmNsdWRlZCBpbiB0aGUgZXh0ZXJuYWwgZmV0Y2ggYmFja2VuZCBwZXJtaXNzaW9uczogJHtmYWlsZWRVUkx9LiBWaXNpdCBnby5hdGxhc3NpYW4uY29tL2ZvcmdlLWVncmVzcyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5gKTtcbiAgICB9XG59XG5leHBvcnRzLkV4dGVybmFsRW5kcG9pbnROb3RBbGxvd2VkRXJyb3IgPSBFeHRlcm5hbEVuZHBvaW50Tm90QWxsb3dlZEVycm9yO1xuY2xhc3MgUHJvZHVjdEVuZHBvaW50Tm90QWxsb3dlZEVycm9yIGV4dGVuZHMgTm90QWxsb3dlZEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihmYWlsZWRVUkwpIHtcbiAgICAgICAgc3VwZXIoYFVSTCBub3QgYWxsb3dlZDogJHtmYWlsZWRVUkx9LmApO1xuICAgIH1cbn1cbmV4cG9ydHMuUHJvZHVjdEVuZHBvaW50Tm90QWxsb3dlZEVycm9yID0gUHJvZHVjdEVuZHBvaW50Tm90QWxsb3dlZEVycm9yO1xuY2xhc3MgUmVxdWVzdFByb2R1Y3ROb3RBbGxvd2VkRXJyb3IgZXh0ZW5kcyBOb3RBbGxvd2VkRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHJlcXVlc3RlZFByb2R1Y3QsIGludm9jYXRpb25Qcm9kdWN0KSB7XG4gICAgICAgIHN1cGVyKGBSZXF1ZXN0ICR7cmVxdWVzdGVkUHJvZHVjdH0gaXMgbm90IGFsbG93ZWQgZnJvbSAke2ludm9jYXRpb25Qcm9kdWN0fSBjb250ZXh0LmApO1xuICAgIH1cbn1cbmV4cG9ydHMuUmVxdWVzdFByb2R1Y3ROb3RBbGxvd2VkRXJyb3IgPSBSZXF1ZXN0UHJvZHVjdE5vdEFsbG93ZWRFcnJvcjtcbmNsYXNzIEludmFsaWRXb3Jrc3BhY2VSZXF1ZXN0ZWRFcnJvciBleHRlbmRzIE5vdEFsbG93ZWRFcnJvciB7XG4gICAgY29uc3RydWN0b3IoZmFpbGVkVVJMKSB7XG4gICAgICAgIHN1cGVyKGBJbnZhbGlkIHdvcmtzcGFjZSByZXF1ZXN0ZWQgaW4gVVJMOiAke2ZhaWxlZFVSTH0uYCk7XG4gICAgfVxufVxuZXhwb3J0cy5JbnZhbGlkV29ya3NwYWNlUmVxdWVzdGVkRXJyb3IgPSBJbnZhbGlkV29ya3NwYWNlUmVxdWVzdGVkRXJyb3I7XG5jbGFzcyBOZWVkc0F1dGhlbnRpY2F0aW9uRXJyb3IgZXh0ZW5kcyBIdHRwRXJyb3Ige1xuICAgIHNlcnZpY2VLZXk7XG4gICAgb3B0aW9ucztcbiAgICBjb25zdHJ1Y3RvcihlcnJvciwgc2VydmljZUtleSwgb3B0aW9ucykge1xuICAgICAgICBzdXBlcihlcnJvcik7XG4gICAgICAgIHRoaXMuc2VydmljZUtleSA9IHNlcnZpY2VLZXk7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMuc3RhY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubmFtZSA9IGV4cG9ydHMuTkVFRFNfQVVUSEVOVElDQVRJT05fRVJSO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IDQwMTtcbiAgICB9XG59XG5leHBvcnRzLk5lZWRzQXV0aGVudGljYXRpb25FcnJvciA9IE5lZWRzQXV0aGVudGljYXRpb25FcnJvcjtcbmNsYXNzIEludmFsaWRSZW1vdGVFcnJvciBleHRlbmRzIEh0dHBFcnJvciB7XG4gICAgcmVtb3RlS2V5O1xuICAgIGNvbnN0cnVjdG9yKGVycm9yLCByZW1vdGVLZXkpIHtcbiAgICAgICAgc3VwZXIoZXJyb3IpO1xuICAgICAgICB0aGlzLnJlbW90ZUtleSA9IHJlbW90ZUtleTtcbiAgICAgICAgdGhpcy5uYW1lID0gZXhwb3J0cy5JTlZBTElEX1JFTU9URV9FUlI7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gNDAwO1xuICAgIH1cbn1cbmV4cG9ydHMuSW52YWxpZFJlbW90ZUVycm9yID0gSW52YWxpZFJlbW90ZUVycm9yO1xuY2xhc3MgSW52YWxpZENvbnRhaW5lclNlcnZpY2VFcnJvciBleHRlbmRzIEh0dHBFcnJvciB7XG4gICAgc2VydmljZUtleTtcbiAgICBjb25zdHJ1Y3RvcihlcnJvciwgc2VydmljZUtleSkge1xuICAgICAgICBzdXBlcihlcnJvcik7XG4gICAgICAgIHRoaXMuc2VydmljZUtleSA9IHNlcnZpY2VLZXk7XG4gICAgICAgIHRoaXMubmFtZSA9IGV4cG9ydHMuSU5WQUxJRF9DT05UQUlORVJfU0VSVklDRV9FUlI7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gNDAwO1xuICAgIH1cbn1cbmV4cG9ydHMuSW52YWxpZENvbnRhaW5lclNlcnZpY2VFcnJvciA9IEludmFsaWRDb250YWluZXJTZXJ2aWNlRXJyb3I7XG5jbGFzcyBQcm94eVJlcXVlc3RFcnJvciBleHRlbmRzIEh0dHBFcnJvciB7XG4gICAgc3RhdHVzO1xuICAgIGVycm9yQ29kZTtcbiAgICBjb25zdHJ1Y3RvcihzdGF0dXMsIGVycm9yQ29kZSkge1xuICAgICAgICBzdXBlcihgRm9yZ2UgcGxhdGZvcm0gZmFpbGVkIHRvIHByb2Nlc3MgcnVudGltZSBIVFRQIHJlcXVlc3QgLSAke3N0YXR1c30gLSAke2Vycm9yQ29kZX1gKTtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICAgIHRoaXMuZXJyb3JDb2RlID0gZXJyb3JDb2RlO1xuICAgICAgICB0aGlzLm5hbWUgPSBleHBvcnRzLlBST1hZX0VSUjtcbiAgICB9XG59XG5leHBvcnRzLlByb3h5UmVxdWVzdEVycm9yID0gUHJveHlSZXF1ZXN0RXJyb3I7XG5jbGFzcyBBcGlOb3RSZWFkeUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSAnRm9yZ2UgQVBJIGN1cnJlbnRseSBub3QgYXZhaWxhYmxlJykge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5uYW1lID0gZXhwb3J0cy5BUElfTk9UX1JFQURZX0VSUjtcbiAgICB9XG59XG5leHBvcnRzLkFwaU5vdFJlYWR5RXJyb3IgPSBBcGlOb3RSZWFkeUVycm9yO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNvcnRPcmRlciA9IHZvaWQgMDtcbnZhciBTb3J0T3JkZXI7XG4oZnVuY3Rpb24gKFNvcnRPcmRlcikge1xuICAgIFNvcnRPcmRlcltcIkFTQ1wiXSA9IFwiQVNDXCI7XG4gICAgU29ydE9yZGVyW1wiREVTQ1wiXSA9IFwiREVTQ1wiO1xufSkoU29ydE9yZGVyID0gZXhwb3J0cy5Tb3J0T3JkZXIgfHwgKGV4cG9ydHMuU29ydE9yZGVyID0ge30pKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5leHRyYWN0STE4blByb3BlcnRpZXNGcm9tTW9kdWxlcyA9IGV4cG9ydHMuZXh0cmFjdEkxOG5LZXlzRnJvbU1vZHVsZXMgPSBleHBvcnRzLmdldEkxOG5TdXBwb3J0ZWRNb2R1bGVFbnRyaWVzID0gdm9pZCAwO1xuY29uc3QgaXNPYmplY3QgPSAodmFsdWUpID0+IHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbCAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG59O1xuY29uc3QgaXNJMThuVmFsdWUgPSAodmFsdWUpID0+IHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlPy5pMThuID09PSAnc3RyaW5nJztcbn07XG5jb25zdCBpc0Nvbm5lY3RNb2R1bGVLZXkgPSAobW9kdWxlS2V5KSA9PiBtb2R1bGVLZXkuc3RhcnRzV2l0aCgnY29ubmVjdC0nKTtcbmNvbnN0IGlzQ29yZU1vZHVsZUtleSA9IChtb2R1bGVLZXkpID0+IG1vZHVsZUtleS5zdGFydHNXaXRoKCdjb3JlOicpO1xuY29uc3QgZ2V0STE4bktleXNGcm9tT2JqZWN0ID0gKG9iaikgPT4ge1xuICAgIGNvbnN0IHZpc2l0ZWQgPSBuZXcgU2V0KCk7XG4gICAgY29uc3QgdmlzaXQgPSAodmFsdWUsIGkxOG5QYXRoKSA9PiB7XG4gICAgICAgIGlmICghaXNPYmplY3QodmFsdWUpIHx8IHZpc2l0ZWQuaGFzKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIHZpc2l0ZWQuYWRkKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHZhbHVlKS5mbGF0TWFwKChbcHJvcEtleSwgcHJvcFZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFBhdGggPSBbLi4uaTE4blBhdGgsIHByb3BLZXldO1xuICAgICAgICAgICAgaWYgKGlzSTE4blZhbHVlKHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW3sgcHJvcGVydHlQYXRoOiBjdXJyZW50UGF0aCwga2V5OiBwcm9wVmFsdWUuaTE4biB9XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wVmFsdWUuZmxhdE1hcCgoaXRlbSkgPT4gdmlzaXQoaXRlbSwgY3VycmVudFBhdGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2aXNpdChwcm9wVmFsdWUsIGN1cnJlbnRQYXRoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gdmlzaXQob2JqLCBbXSk7XG59O1xuY29uc3QgZ2V0STE4blN1cHBvcnRlZE1vZHVsZUVudHJpZXMgPSAobW9kdWxlcykgPT4ge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhtb2R1bGVzKS5mbGF0TWFwKChbbW9kdWxlS2V5LCBtb2R1bGVFbnRyaWVzXSkgPT4ge1xuICAgICAgICBpZiAoIWlzQ29ubmVjdE1vZHVsZUtleShtb2R1bGVLZXkpICYmXG4gICAgICAgICAgICAhaXNDb3JlTW9kdWxlS2V5KG1vZHVsZUtleSkgJiZcbiAgICAgICAgICAgIG1vZHVsZUVudHJpZXMgJiZcbiAgICAgICAgICAgIEFycmF5LmlzQXJyYXkobW9kdWxlRW50cmllcykgJiZcbiAgICAgICAgICAgIG1vZHVsZUVudHJpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG1vZHVsZUVudHJpZXMubWFwKChtb2R1bGVFbnRyeSkgPT4gW21vZHVsZUVudHJ5LCBtb2R1bGVLZXldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW107XG4gICAgfSk7XG59O1xuZXhwb3J0cy5nZXRJMThuU3VwcG9ydGVkTW9kdWxlRW50cmllcyA9IGdldEkxOG5TdXBwb3J0ZWRNb2R1bGVFbnRyaWVzO1xuY29uc3QgZXh0cmFjdEkxOG5LZXlzRnJvbU1vZHVsZXMgPSAobW9kdWxlcykgPT4ge1xuICAgIGNvbnN0IGkxOG5LZXlzID0gbmV3IFNldCgpO1xuICAgIGZvciAoY29uc3QgbW9kdWxlRW50cnkgb2YgKDAsIGV4cG9ydHMuZ2V0STE4blN1cHBvcnRlZE1vZHVsZUVudHJpZXMpKG1vZHVsZXMpKSB7XG4gICAgICAgIGNvbnN0IGkxOG5LZXlzRm9yRW50cnlWYWx1ZSA9IGdldEkxOG5LZXlzRnJvbU9iamVjdChtb2R1bGVFbnRyeVswXSk7XG4gICAgICAgIGZvciAoY29uc3QgeyBrZXkgfSBvZiBpMThuS2V5c0ZvckVudHJ5VmFsdWUpIHtcbiAgICAgICAgICAgIGkxOG5LZXlzLmFkZChrZXkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpMThuS2V5cy5zaXplID4gMCA/IEFycmF5LmZyb20oaTE4bktleXMpIDogW107XG59O1xuZXhwb3J0cy5leHRyYWN0STE4bktleXNGcm9tTW9kdWxlcyA9IGV4dHJhY3RJMThuS2V5c0Zyb21Nb2R1bGVzO1xuY29uc3QgZXh0cmFjdEkxOG5Qcm9wZXJ0aWVzRnJvbU1vZHVsZXMgPSAobW9kdWxlcykgPT4ge1xuICAgIGNvbnN0IG1vZHVsZUkxOG5Qcm9wZXJ0aWVzID0gW107XG4gICAgZm9yIChjb25zdCBtb2R1bGVFbnRyeSBvZiAoMCwgZXhwb3J0cy5nZXRJMThuU3VwcG9ydGVkTW9kdWxlRW50cmllcykobW9kdWxlcykpIHtcbiAgICAgICAgY29uc3QgaTE4bktleXNGb3JFbnRyeVZhbHVlID0gZ2V0STE4bktleXNGcm9tT2JqZWN0KG1vZHVsZUVudHJ5WzBdKTtcbiAgICAgICAgZm9yIChjb25zdCBpMThuT2JqIG9mIGkxOG5LZXlzRm9yRW50cnlWYWx1ZSkge1xuICAgICAgICAgICAgbW9kdWxlSTE4blByb3BlcnRpZXMucHVzaCh7IG1vZHVsZU5hbWU6IG1vZHVsZUVudHJ5WzFdLCAuLi5pMThuT2JqIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtb2R1bGVJMThuUHJvcGVydGllcztcbn07XG5leHBvcnRzLmV4dHJhY3RJMThuUHJvcGVydGllc0Zyb21Nb2R1bGVzID0gZXh0cmFjdEkxOG5Qcm9wZXJ0aWVzRnJvbU1vZHVsZXM7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBhcGksIHsgcm91dGUgfSBmcm9tICdAZm9yZ2UvYXBpJztcblxuLy8gSGFyZC1jb2RlZCBHcmFwaFFMIGVuZHBvaW50IGZvciBUYWxlbnQgQVBJXG4vL2NvbnN0IFRBTEVOVF9HUkFQSFFMX0VORFBPSU5UID0gJ2h0dHBzOi8vb25lLWF0bGFzLWpldnMuYXRsYXNzaWFuLm5ldC9nYXRld2F5L2FwaS9ncmFwaHFsJztcbmNvbnN0IFRBTEVOVF9HUkFQSFFMX0VORFBPSU5UID0gJ2h0dHBzOi8vc2stZGVtby1zaXRlLmF0bGFzc2lhbi5uZXQvZ2F0ZXdheS9hcGkvZ3JhcGhxbCc7XG5cbi8qKlxuICogQ3JlYXRlIGEgQmFzaWMgQXV0aGVudGljYXRpb24gaGVhZGVyIGZvciB0aGUgVGFsZW50IEdyYXBoUUwgQVBJLlxuICogVGhlIEFQSSByZXF1aXJlcyBCYXNpYyBBdXRoIHdpdGggZW1haWw6YXBpX3Rva2VuIGluIEJhc2U2NCBmb3JtYXQuXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbWFpbCAtIFRoZSBBdGxhc3NpYW4gYWNjb3VudCBlbWFpbFxuICogQHBhcmFtIHtzdHJpbmd9IGFwaVRva2VuIC0gVGhlIEF0bGFzc2lhbiBBUEkgdG9rZW5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBBdXRob3JpemF0aW9uIGhlYWRlciB2YWx1ZSBmb3IgQmFzaWMgYXV0aFxuICovXG5mdW5jdGlvbiBjcmVhdGVCYXNpY0F1dGhIZWFkZXIoZW1haWwsIGFwaVRva2VuKSB7XG4gIC8vIENvbWJpbmUgZW1haWwgYW5kIEFQSSB0b2tlbiBhcyBcImVtYWlsOmFwaV90b2tlblwiXG4gIGNvbnN0IGNyZWRlbnRpYWxzID0gYCR7ZW1haWx9OiR7YXBpVG9rZW59YDtcbiAgXG4gIC8vIEJhc2U2NCBlbmNvZGUgdGhlIGNyZWRlbnRpYWxzXG4gIGNvbnN0IGVuY29kZWRDcmVkZW50aWFscyA9IEJ1ZmZlci5mcm9tKGNyZWRlbnRpYWxzKS50b1N0cmluZygnYmFzZTY0Jyk7XG4gIFxuICAvLyBSZXR1cm4gdGhlIEF1dGhvcml6YXRpb24gaGVhZGVyIHZhbHVlXG4gIHJldHVybiBgQmFzaWMgJHtlbmNvZGVkQ3JlZGVudGlhbHN9YDtcbn1cblxuLyoqXG4gKiBRdWVyeSB0aGUgVGFsZW50IEdyYXBoUUwgQVBJIHRvIHJldHJpZXZlIG9yZ2FuaXphdGlvbmFsIGRhdGEgZm9yIGEgdXNlci5cbiAqIFRoaXMgZnVuY3Rpb24gZmV0Y2hlcyB0aGUgdXNlcidzIHBvc2l0aW9uLCBtYW5hZ2VyLCBkaXJlY3QgcmVwb3J0cywgYW5kIHBlZXJzLlxuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gdXNlckVtYWlsIC0gVGhlIGVtYWlsIGFkZHJlc3Mgb2YgdGhlIHVzZXIgdG8gcXVlcnlcbiAqIEBwYXJhbSB7c3RyaW5nfSBjbG91ZElkIC0gVGhlIEF0bGFzc2lhbiBjbG91ZCBJRFxuICogQHBhcmFtIHtzdHJpbmc+IGF1dGhFbWFpbCAtIFRoZSBlbWFpbCBhZGRyZXNzIGZvciBCYXNpYyBBdXRoXG4gKiBAcGFyYW0ge3N0cmluZ30gYXBpVG9rZW4gLSBUaGUgQVBJIHRva2VuIGZvciBCYXNpYyBBdXRoXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3Q+fSBUaGUgdXNlcidzIHBvc2l0aW9uIGRhdGEgYW5kIG9yZ2FuaXphdGlvbmFsIHJlbGF0aW9uc2hpcHNcbiAqL1xuYXN5bmMgZnVuY3Rpb24gcXVlcnlUYWxlbnRHcmFwaFFMKHVzZXJFbWFpbCwgY2xvdWRJZCwgYXV0aEVtYWlsLCBhcGlUb2tlbikge1xuICBjb25zdCBxdWVyeSA9IGBcbiAgICBxdWVyeSBwb3NpdGlvbnNTZWFyY2hRdWVyeSgkY2xvdWRJZDogSUQhLCAkZmllbGRJZElzSW46IFtJRCFdLCAkZmlyc3Q6IEludCA9IDEwMCwgJHJxbDogU3RyaW5nKSB7XG4gICAgICByYWRhcl9wb3NpdGlvbnNTZWFyY2goXG4gICAgICAgIGZpcnN0OiAkZmlyc3RcbiAgICAgICAgY2xvdWRJZDogJGNsb3VkSWRcbiAgICAgICAgcnFsOiAkcnFsXG4gICAgICApIEBvcHRJbih0bzogW1wiUmFkYXJQb3NpdGlvbnNTZWFyY2hcIl0pIHtcbiAgICAgICAgdG90YWxDb3VudFxuICAgICAgICBlZGdlcyB7XG4gICAgICAgICAgbm9kZSB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgZmllbGRWYWx1ZXMoZmllbGRJZElzSW46ICRmaWVsZElkSXNJbikge1xuICAgICAgICAgICAgICBmaWVsZElkXG4gICAgICAgICAgICAgIGZpZWxkVmFsdWUge1xuICAgICAgICAgICAgICAgIC4uLiBvbiBSYWRhclN0cmluZ0ZpZWxkVmFsdWUge1xuICAgICAgICAgICAgICAgICAgc3RyaW5nVmFsdWU6IHZhbHVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC4uLiBvbiBSYWRhckFyaUZpZWxkVmFsdWUge1xuICAgICAgICAgICAgICAgICAgdmFsdWUge1xuICAgICAgICAgICAgICAgICAgICAuLi4gb24gUmFkYXJXb3JrZXIge1xuICAgICAgICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgICAgICAgcHJlZmVycmVkTmFtZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC4uLiBvbiBUZWFtVjIge1xuICAgICAgICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgYDtcbiAgXG4gIGNvbnN0IHZhcmlhYmxlcyA9IHtcbiAgICBjbG91ZElkOiBjbG91ZElkLFxuICAgIGZpZWxkSWRJc0luOiBbXCJ3b3JrZXJFbWFpbFwiLCBcInBvc2l0aW9uV29ya2VyXCIsIFwicG9zaXRpb25SZXBvcnRpbmdMaW5lXCJdLFxuICAgIGZpcnN0OiAxMDAsXG4gICAgcnFsOiBgd29ya2VyRW1haWwgPSAnJHt1c2VyRW1haWx9J2BcbiAgfTtcbiAgXG4gIHRyeSB7XG4gICAgY29uc29sZS5sb2coJ0RFQlVHOiBNYWtpbmcgR3JhcGhRTCByZXF1ZXN0IHRvOicsIFRBTEVOVF9HUkFQSFFMX0VORFBPSU5UKTtcbiAgICBjb25zb2xlLmxvZygnREVCVUc6IEdyYXBoUUwgdmFyaWFibGVzOicsIEpTT04uc3RyaW5naWZ5KHZhcmlhYmxlcywgbnVsbCwgMikpO1xuICAgIFxuICAgIC8vIENyZWF0ZSBCYXNpYyBBdXRoIGhlYWRlciB3aXRoIGVtYWlsIGFuZCBBUEkgdG9rZW5cbiAgICBjb25zdCBhdXRoSGVhZGVyID0gY3JlYXRlQmFzaWNBdXRoSGVhZGVyKGF1dGhFbWFpbCwgYXBpVG9rZW4pO1xuICAgIFxuICAgIC8vIFVzZSBmZXRjaCBBUEkgd2hpY2ggaXMgYXZhaWxhYmxlIGluIEZvcmdlIE5vZGUuanMgcmVzb2x2ZXJzXG4gICAgLy8gdG8gbWFrZSBIVFRQIHJlcXVlc3RzIHRvIGV4dGVybmFsIEFQSXNcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFRBTEVOVF9HUkFQSFFMX0VORFBPSU5ULCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBhdXRoSGVhZGVyXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzXG4gICAgICB9KVxuICAgIH0pO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKCdERUJVRzogR3JhcGhRTCByZXNwb25zZSBzdGF0dXM6JywgcmVzcG9uc2Uuc3RhdHVzKTtcbiAgICBjb25zdCByZXNwb25zZVRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgY29uc29sZS5sb2coJ0RFQlVHOiBHcmFwaFFMIHJlc3BvbnNlIHJhdyB0ZXh0IChmaXJzdCA1MDAgY2hhcnMpOicsIHJlc3BvbnNlVGV4dC5zdWJzdHJpbmcoMCwgNTAwKSk7XG4gICAgXG4gICAgbGV0IGRhdGE7XG4gICAgdHJ5IHtcbiAgICAgIGRhdGEgPSBKU09OLnBhcnNlKHJlc3BvbnNlVGV4dCk7XG4gICAgfSBjYXRjaCAocGFyc2VFcnJvcikge1xuICAgICAgY29uc3QgZXJyb3JNc2cgPSBgR3JhcGhRTCBBUEkgcmV0dXJuZWQgbm9uLUpTT04gcmVzcG9uc2UgKHN0YXR1cyAke3Jlc3BvbnNlLnN0YXR1c30pOiAke3Jlc3BvbnNlVGV4dC5zdWJzdHJpbmcoMCwgMjAwKX1gO1xuICAgICAgY29uc29sZS5lcnJvcignRVJST1I6JywgZXJyb3JNc2cpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTXNnKTtcbiAgICB9XG4gICAgXG4gICAgY29uc29sZS5sb2coJ0RFQlVHOiBHcmFwaFFMIHJlc3BvbnNlIGRhdGE6JywgSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMikpO1xuICAgIFxuICAgIGlmIChkYXRhLmVycm9ycykge1xuICAgICAgY29uc3QgZXJyb3JNc2cgPSBgR3JhcGhRTCBlcnJvcjogJHtKU09OLnN0cmluZ2lmeShkYXRhLmVycm9ycyl9YDtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0VSUk9SOicsIGVycm9yTXNnKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1zZyk7XG4gICAgfVxuICAgIFxuICAgIC8vIFZhbGlkYXRlIHRoYXQgZGF0YS5kYXRhIGV4aXN0cyBiZWZvcmUgcmV0dXJuaW5nXG4gICAgaWYgKCFkYXRhLmRhdGEpIHtcbiAgICAgIGNvbnN0IGVycm9yTXNnID0gJ0dyYXBoUUwgcmVzcG9uc2UgZG9lcyBub3QgY29udGFpbiBhIGRhdGEgcHJvcGVydHknO1xuICAgICAgY29uc29sZS5lcnJvcignRVJST1I6JywgZXJyb3JNc2cpO1xuICAgICAgY29uc29sZS5lcnJvcignRVJST1I6IFJlc3BvbnNlIHN0cnVjdHVyZTonLCBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKSk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNc2cpO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZGF0YS5kYXRhO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnN0IGVycm9yTXNnID0gYEZhaWxlZCB0byBxdWVyeSBUYWxlbnQgR3JhcGhRTCBBUEk6ICR7ZXJyb3IubWVzc2FnZX1gO1xuICAgIGNvbnNvbGUuZXJyb3IoJ0VSUk9SOicsIGVycm9yTXNnKTtcbiAgICBjb25zb2xlLmVycm9yKCdFUlJPUjogRnVsbCBzdGFjayB0cmFjZTonLCBlcnJvci5zdGFjayk7XG4gICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTXNnKTtcbiAgfVxufVxuXG4vKipcbiAqIEZldGNoIG1hbmFnZXIgZGV0YWlscyBmb3IgYSBsaXN0IG9mIHBvc2l0aW9uIFVVSURzLlxuICogVGhpcyBmdW5jdGlvbiBxdWVyaWVzIHRoZSBUYWxlbnQgR3JhcGhRTCBBUEkgdG8gZ2V0IHRoZSBuYW1lcyBvZiBtYW5hZ2VycyBpbiB0aGUgaGllcmFyY2h5LlxuICogXG4gKiBAcGFyYW0ge0FycmF5fSBtYW5hZ2VyVVVJRHMgLSBBcnJheSBvZiBtYW5hZ2VyIHBvc2l0aW9uIFVVSURzXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xvdWRJZCAtIFRoZSBBdGxhc3NpYW4gY2xvdWQgSURcbiAqIEBwYXJhbSB7c3RyaW5nfSBhdXRoRW1haWwgLSBUaGUgZW1haWwgYWRkcmVzcyBmb3IgQmFzaWMgQXV0aFxuICogQHBhcmFtIHtzdHJpbmd9IGFwaVRva2VuIC0gVGhlIEFQSSB0b2tlbiBmb3IgQmFzaWMgQXV0aFxuICogQHJldHVybnMge1Byb21pc2U8QXJyYXk+fSBBcnJheSBvZiBtYW5hZ2VyIG9iamVjdHMgd2l0aCB1dWlkIGFuZCBwcmVmZXJyZWROYW1lXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGZldGNoTWFuYWdlckRldGFpbHMobWFuYWdlclVVSURzLCBjbG91ZElkLCBhdXRoRW1haWwsIGFwaVRva2VuKSB7XG4gIGlmICghbWFuYWdlclVVSURzIHx8IG1hbmFnZXJVVUlEcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgXG4gIGNvbnN0IG1hbmFnZXJzID0gW107XG4gIFxuICAvLyBGZXRjaCBkZXRhaWxzIGZvciBlYWNoIG1hbmFnZXIgVVVJRFxuICBmb3IgKGNvbnN0IHV1aWQgb2YgbWFuYWdlclVVSURzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnNvbGUubG9nKCdERUJVRzogRmV0Y2hpbmcgbWFuYWdlciBkZXRhaWxzIGZvciBVVUlEOicsIHV1aWQpO1xuICAgICAgXG4gICAgICBjb25zdCBtYW5hZ2VyUXVlcnkgPSBgXG4gICAgICAgIHF1ZXJ5IHBvc2l0aW9uc1NlYXJjaFF1ZXJ5KCRjbG91ZElkOiBJRCEsICRmaWVsZElkSXNJbjogW0lEIV0sICRmaXJzdDogSW50ID0gMTAwLCAkcnFsOiBTdHJpbmcpIHtcbiAgICAgICAgICByYWRhcl9wb3NpdGlvbnNTZWFyY2goXG4gICAgICAgICAgICBmaXJzdDogJGZpcnN0XG4gICAgICAgICAgICBjbG91ZElkOiAkY2xvdWRJZFxuICAgICAgICAgICAgcnFsOiAkcnFsXG4gICAgICAgICAgKSBAb3B0SW4odG86IFtcIlJhZGFyUG9zaXRpb25zU2VhcmNoXCJdKSB7XG4gICAgICAgICAgICBlZGdlcyB7XG4gICAgICAgICAgICAgIG5vZGUge1xuICAgICAgICAgICAgICAgIGZpZWxkVmFsdWVzKGZpZWxkSWRJc0luOiAkZmllbGRJZElzSW4pIHtcbiAgICAgICAgICAgICAgICAgIGZpZWxkSWRcbiAgICAgICAgICAgICAgICAgIGZpZWxkVmFsdWUge1xuICAgICAgICAgICAgICAgICAgICAuLi4gb24gUmFkYXJBcmlGaWVsZFZhbHVlIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4gb24gUmFkYXJXb3JrZXIge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVmZXJyZWROYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBgO1xuICAgICAgXG4gICAgICBjb25zdCB2YXJpYWJsZXMgPSB7XG4gICAgICAgIGNsb3VkSWQ6IGNsb3VkSWQsXG4gICAgICAgIGZpZWxkSWRJc0luOiBbXCJwb3NpdGlvbldvcmtlclwiXSxcbiAgICAgICAgZmlyc3Q6IDEwMCxcbiAgICAgICAgcnFsOiBgaWQgPSAnJHt1dWlkfSdgXG4gICAgICB9O1xuICAgICAgXG4gICAgICBjb25zdCBhdXRoSGVhZGVyID0gY3JlYXRlQmFzaWNBdXRoSGVhZGVyKGF1dGhFbWFpbCwgYXBpVG9rZW4pO1xuICAgICAgXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFRBTEVOVF9HUkFQSFFMX0VORFBPSU5ULCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGF1dGhIZWFkZXJcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIHF1ZXJ5OiBtYW5hZ2VyUXVlcnksXG4gICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXNcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgICAgXG4gICAgICBjb25zdCByZXNwb25zZVRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShyZXNwb25zZVRleHQpO1xuICAgICAgXG4gICAgICBpZiAoZGF0YS5lcnJvcnMpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdXQVJOSU5HOiBFcnJvciBmZXRjaGluZyBtYW5hZ2VyJywgdXVpZCwgJzonLCBKU09OLnN0cmluZ2lmeShkYXRhLmVycm9ycykpO1xuICAgICAgICBtYW5hZ2Vycy5wdXNoKHsgdXVpZCwgcHJlZmVycmVkTmFtZTogJ1Vua25vd24gTWFuYWdlcicgfSk7XG4gICAgICB9IGVsc2UgaWYgKGRhdGEuZGF0YT8ucmFkYXJfcG9zaXRpb25zU2VhcmNoPy5lZGdlcyAmJiBkYXRhLmRhdGEucmFkYXJfcG9zaXRpb25zU2VhcmNoLmVkZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgZWRnZSA9IGRhdGEuZGF0YS5yYWRhcl9wb3NpdGlvbnNTZWFyY2guZWRnZXNbMF07XG4gICAgICAgIGxldCBtYW5hZ2VyTmFtZSA9ICdVbmtub3duIE1hbmFnZXInO1xuICAgICAgICBcbiAgICAgICAgaWYgKGVkZ2Uubm9kZS5maWVsZFZhbHVlcykge1xuICAgICAgICAgIGNvbnN0IHdvcmtlckZpZWxkID0gZWRnZS5ub2RlLmZpZWxkVmFsdWVzLmZpbmQoZiA9PiBmLmZpZWxkSWQgPT09ICdwb3NpdGlvbldvcmtlcicpO1xuICAgICAgICAgIGlmICh3b3JrZXJGaWVsZD8uZmllbGRWYWx1ZT8udmFsdWU/LnByZWZlcnJlZE5hbWUpIHtcbiAgICAgICAgICAgIG1hbmFnZXJOYW1lID0gd29ya2VyRmllbGQuZmllbGRWYWx1ZS52YWx1ZS5wcmVmZXJyZWROYW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coJ0RFQlVHOiBGb3VuZCBtYW5hZ2VyIG5hbWU6JywgbWFuYWdlck5hbWUsICdmb3IgVVVJRDonLCB1dWlkKTtcbiAgICAgICAgbWFuYWdlcnMucHVzaCh7IHV1aWQsIHByZWZlcnJlZE5hbWU6IG1hbmFnZXJOYW1lIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFuYWdlcnMucHVzaCh7IHV1aWQsIHByZWZlcnJlZE5hbWU6ICdVbmtub3duIE1hbmFnZXInIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFUlJPUjogRXJyb3IgZmV0Y2hpbmcgbWFuYWdlciBkZXRhaWxzIGZvcicsIHV1aWQsICc6JywgZXJyb3IubWVzc2FnZSk7XG4gICAgICBtYW5hZ2Vycy5wdXNoKHsgdXVpZCwgcHJlZmVycmVkTmFtZTogJ1Vua25vd24gTWFuYWdlcicgfSk7XG4gICAgfVxuICB9XG4gIFxuICByZXR1cm4gbWFuYWdlcnM7XG59XG5cbi8qKlxuICogQnVpbGQgYW4gQVNDSUkgdGV4dCB2aXN1YWxpemF0aW9uIG9mIHRoZSBvcmdhbml6YXRpb25hbCB0cmVlLlxuICogU2hvd3MgdGhlIHVzZXIncyByZXBvcnRpbmcgbGluZSAobWFuYWdlcnMpLCBkaXJlY3QgcmVwb3J0cywgYW5kIHBlZXJzIGluIGEgdHJlZSBmb3JtYXQuXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSB1c2VyXG4gKiBAcGFyYW0ge0FycmF5fSBtYW5hZ2VySGllcmFyY2h5IC0gQXJyYXkgb2YgbWFuYWdlciBvYmplY3RzIHdpdGggcHJlZmVycmVkTmFtZSwgZnJvbSBkaXJlY3QgbWFuYWdlciB0byB0b3AtbGV2ZWxcbiAqIEBwYXJhbSB7QXJyYXl9IGRpcmVjdFJlcG9ydHMgLSBBcnJheSBvZiBkaXJlY3QgcmVwb3J0IG9iamVjdHMgd2l0aCBwcmVmZXJyZWROYW1lXG4gKiBAcGFyYW0ge0FycmF5fSBwZWVycyAtIEFycmF5IG9mIHBlZXIgb2JqZWN0cyB3aXRoIHByZWZlcnJlZE5hbWVcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEZvcm1hdHRlZCBBU0NJSSB0cmVlIHZpc3VhbGl6YXRpb25cbiAqL1xuZnVuY3Rpb24gYnVpbGRPcmdUcmVlVmlzdWFsaXphdGlvbih1c2VyTmFtZSwgbWFuYWdlckhpZXJhcmNoeSwgZGlyZWN0UmVwb3J0cywgcGVlcnMpIHtcbiAgbGV0IHRyZWUgPSAnJztcbiAgXG4gIC8vIERpc3BsYXkgdGhlIHVzZXJcbiAgdHJlZSArPSBgJHt1c2VyTmFtZX1cXG5gO1xuICBcbiAgLy8gRGlzcGxheSByZXBvcnRpbmcgbGluZSAobWFuYWdlcnMpIGlmIGV4aXN0c1xuICBpZiAobWFuYWdlckhpZXJhcmNoeSAmJiBtYW5hZ2VySGllcmFyY2h5Lmxlbmd0aCA+IDApIHtcbiAgICAvLyBSZXZlcnNlIHRoZSBoaWVyYXJjaHkgc28gZGlyZWN0IG1hbmFnZXIgYXBwZWFycyBmaXJzdFxuICAgIGNvbnN0IHJldmVyc2VkSGllcmFyY2h5ID0gWy4uLm1hbmFnZXJIaWVyYXJjaHldLnJldmVyc2UoKTtcbiAgICB0cmVlICs9IGDilJzilIDilIAgUmVwb3J0aW5nIExpbmUgKE1hbmFnZXJzLCB1cCB0byAke3JldmVyc2VkSGllcmFyY2h5Lmxlbmd0aH0gbGV2ZWxzKTpcXG5gO1xuICAgIHJldmVyc2VkSGllcmFyY2h5LmZvckVhY2goKG1hbmFnZXIsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBpc0xhc3QgPSBpbmRleCA9PT0gcmV2ZXJzZWRIaWVyYXJjaHkubGVuZ3RoIC0gMTtcbiAgICAgIGNvbnN0IGxldmVsSW5kaWNhdG9yID0gaW5kZXggPT09IDAgPyAnRGlyZWN0IE1hbmFnZXInIDogYExldmVsICR7aW5kZXggKyAxfWA7XG4gICAgICBjb25zdCBwcmVmaXggPSBpc0xhc3QgPyAn4pSCICAg4pSU4pSA4pSAJyA6ICfilIIgICDilJzilIDilIAnO1xuICAgICAgdHJlZSArPSBgJHtwcmVmaXh9ICR7bWFuYWdlci5wcmVmZXJyZWROYW1lfSAoJHtsZXZlbEluZGljYXRvcn0pXFxuYDtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0cmVlICs9IGDilJzilIDilIAgUmVwb3J0aW5nIExpbmU6IE5vbmVcXG5gO1xuICB9XG4gIFxuICAvLyBEaXNwbGF5IGRpcmVjdCByZXBvcnRzXG4gIGlmIChkaXJlY3RSZXBvcnRzICYmIGRpcmVjdFJlcG9ydHMubGVuZ3RoID4gMCkge1xuICAgIHRyZWUgKz0gYOKUnOKUgOKUgCBEaXJlY3QgUmVwb3J0cyAoJHtkaXJlY3RSZXBvcnRzLmxlbmd0aH0pOlxcbmA7XG4gICAgZGlyZWN0UmVwb3J0cy5mb3JFYWNoKChyZXBvcnQsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBpc0xhc3QgPSBpbmRleCA9PT0gZGlyZWN0UmVwb3J0cy5sZW5ndGggLSAxO1xuICAgICAgY29uc3QgcHJlZml4ID0gaXNMYXN0ID8gJ+KUgiAgIOKUlOKUgOKUgCcgOiAn4pSCICAg4pSc4pSA4pSAJztcbiAgICAgIGNvbnN0IGRpc3BsYXlUZXh0ID0gcmVwb3J0LmVtYWlsID8gYCR7cmVwb3J0LnByZWZlcnJlZE5hbWV9ICgke3JlcG9ydC5lbWFpbH0pYCA6IHJlcG9ydC5wcmVmZXJyZWROYW1lO1xuICAgICAgdHJlZSArPSBgJHtwcmVmaXh9ICR7ZGlzcGxheVRleHR9XFxuYDtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0cmVlICs9IGDilJzilIDilIAgRGlyZWN0IFJlcG9ydHM6IE5vbmVcXG5gO1xuICB9XG4gIFxuICAvLyBEaXNwbGF5IHBlZXJzXG4gIGlmIChwZWVycyAmJiBwZWVycy5sZW5ndGggPiAwKSB7XG4gICAgdHJlZSArPSBg4pSU4pSA4pSAIFBlZXJzICgke3BlZXJzLmxlbmd0aH0pOlxcbmA7XG4gICAgcGVlcnMuZm9yRWFjaCgocGVlciwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGlzTGFzdCA9IGluZGV4ID09PSBwZWVycy5sZW5ndGggLSAxO1xuICAgICAgY29uc3QgcHJlZml4ID0gaXNMYXN0ID8gJyAgICDilJTilIDilIAnIDogJyAgICDilJzilIDilIAnO1xuICAgICAgY29uc3QgZGlzcGxheVRleHQgPSBwZWVyLmVtYWlsID8gYCR7cGVlci5wcmVmZXJyZWROYW1lfSAoJHtwZWVyLmVtYWlsfSlgIDogcGVlci5wcmVmZXJyZWROYW1lO1xuICAgICAgdHJlZSArPSBgJHtwcmVmaXh9ICR7ZGlzcGxheVRleHR9XFxuYDtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0cmVlICs9IGDilJTilIDilIAgUGVlcnM6IE5vbmVcXG5gO1xuICB9XG4gIFxuICByZXR1cm4gdHJlZTtcbn1cblxuLyoqXG4gKiBNYWluIGZ1bmN0aW9uIHRvIHJldHJpZXZlIHRoZSBvcmdhbml6YXRpb25hbCB0cmVlIGZvciBhIHVzZXIgZnJvbSBUYWxlbnQuXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBieSB0aGUgUm92byBhZ2VudCB3aGVuIHRoZSB1c2VyIHJlcXVlc3RzIG9yZ2FuaXphdGlvbmFsIGRhdGEuXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0IC0gVGhlIHJlcXVlc3Qgb2JqZWN0IGNvbnRhaW5pbmcgdXNlciBlbWFpbFxuICogQHJldHVybnMge1Byb21pc2U8T2JqZWN0Pn0gUmVzcG9uc2Ugd2l0aCB0aGUgb3JnYW5pemF0aW9uYWwgdHJlZSB2aXN1YWxpemF0aW9uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRPcmdUcmVlKHJlcXVlc3QpIHtcbiAgLy8gTG9nIGltbWVkaWF0ZWx5LCBldmVuIGlmIGFuIGVycm9yIG9jY3VycyBkdXJpbmcgcGFyc2luZ1xuICBjb25zb2xlLmVycm9yKCc9PT0gREVCVUc6IGdldE9yZ1RyZWUgQ0FMTEVEID09PScpO1xuICBjb25zb2xlLmxvZygn8J+TpSBSZWNlaXZlZCBwYXlsb2FkOicsIEpTT04uc3RyaW5naWZ5KHJlcXVlc3QsIG51bGwsIDIpKTtcbiAgXG4gIHRyeSB7XG4gICAgY29uc29sZS5sb2coJ0RFQlVHOiBnZXRPcmdUcmVlIGZ1bmN0aW9uIGNhbGxlZCcpO1xuICAgIGNvbnNvbGUubG9nKCdERUJVRzogUmVxdWVzdCBvYmplY3Q6JywgSlNPTi5zdHJpbmdpZnkocmVxdWVzdCwgbnVsbCwgMikpO1xuICAgIFxuICAgIC8vIFJldHJpZXZlIHRoZSBBUEkgdG9rZW4gYW5kIGVtYWlsIGZyb20gZW52aXJvbm1lbnQgdmFyaWFibGVzXG4gICAgLy8gVGhlc2Ugc2hvdWxkIGJlIHNldCBhcyBGb3JnZSB2YXJpYWJsZXMgZHVyaW5nIGRlcGxveW1lbnRcbiAgICBjb25zdCBhcGlUb2tlbiA9IHByb2Nlc3MuZW52LlRBTEVOVF9BUElfVE9LRU47XG4gICAgY29uc3QgYXV0aEVtYWlsID0gcHJvY2Vzcy5lbnYuVEFMRU5UX0FVVEhfRU1BSUw7XG4gICAgXG4gICAgY29uc29sZS5sb2coJ0RFQlVHOiBBUEkgdG9rZW4gcHJlc2VudDonLCAhIWFwaVRva2VuKTtcbiAgICBjb25zb2xlLmxvZygnREVCVUc6IEF1dGggZW1haWwgcHJlc2VudDonLCAhIWF1dGhFbWFpbCk7XG4gICAgXG4gICAgaWYgKGFwaVRva2VuKSB7XG4gICAgICBjb25zb2xlLmxvZygnREVCVUc6IEFQSSB0b2tlbiBmaXJzdCAyMCBjaGFyczonLCBhcGlUb2tlbi5zdWJzdHJpbmcoMCwgMjApKTtcbiAgICB9XG4gICAgaWYgKGF1dGhFbWFpbCkge1xuICAgICAgY29uc29sZS5sb2coJ0RFQlVHOiBBdXRoIGVtYWlsOicsIGF1dGhFbWFpbCk7XG4gICAgfVxuICAgIFxuICAgIGlmICghYXBpVG9rZW4pIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiBUQUxFTlRfQVBJX1RPS0VOIGVudmlyb25tZW50IHZhcmlhYmxlIG5vdCBzZXQnKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgIG1lc3NhZ2U6ICdUQUxFTlRfQVBJX1RPS0VOIGVudmlyb25tZW50IHZhcmlhYmxlIGlzIG5vdCBjb25maWd1cmVkLiBQbGVhc2Ugc2V0IHRoaXMgdmFyaWFibGUgaW4geW91ciBkZXBsb3ltZW50IGNvbmZpZ3VyYXRpb24uJ1xuICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgaWYgKCFhdXRoRW1haWwpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiBUQUxFTlRfQVVUSF9FTUFJTCBlbnZpcm9ubWVudCB2YXJpYWJsZSBub3Qgc2V0Jyk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICBtZXNzYWdlOiAnVEFMRU5UX0FVVEhfRU1BSUwgZW52aXJvbm1lbnQgdmFyaWFibGUgaXMgbm90IGNvbmZpZ3VyZWQuIFBsZWFzZSBzZXQgdGhpcyB2YXJpYWJsZSBpbiB5b3VyIGRlcGxveW1lbnQgY29uZmlndXJhdGlvbi4nXG4gICAgICB9O1xuICAgIH1cbiAgICBcbiAgICAvLyBFeHRyYWN0IHVzZXIgZW1haWwgZnJvbSB0aGUgcmVxdWVzdFxuICAgIC8vIFRoZSBzdHJ1Y3R1cmUgZnJvbSBSb3ZvIGFjdGlvbnMgaGFzIHVzZXJFbWFpbCBkaXJlY3RseSBvbiB0aGUgcmVxdWVzdCBvYmplY3RcbiAgICBjb25zdCB1c2VyRW1haWwgPSByZXF1ZXN0Py51c2VyRW1haWw7XG4gICAgY29uc29sZS5sb2coJ0RFQlVHOiBVc2VyIGVtYWlsIHByb3ZpZGVkOicsIHVzZXJFbWFpbCk7XG4gICAgXG4gICAgaWYgKCF1c2VyRW1haWwpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiBObyB1c2VyIGVtYWlsIHByb3ZpZGVkIGluIHJlcXVlc3QnKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgIG1lc3NhZ2U6ICdVc2VyIGVtYWlsIGlzIHJlcXVpcmVkLidcbiAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIC8vIEdldCB0aGUgY3VycmVudCBjbG91ZCBJRCBmcm9tIHRoZSBjb250ZXh0XG4gICAgY29uc3QgY2xvdWRJZCA9IHJlcXVlc3Q/LmNvbnRleHQ/LmNsb3VkSWQ7XG4gICAgY29uc29sZS5sb2coJ0RFQlVHOiBDbG91ZCBJRDonLCBjbG91ZElkKTtcbiAgICBcbiAgICBpZiAoIWNsb3VkSWQpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiBDbG91ZCBJRCBub3QgZm91bmQgaW4gcmVxdWVzdCcpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgbWVzc2FnZTogJ0Nsb3VkIElEIGlzIHJlcXVpcmVkLidcbiAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIC8vIFF1ZXJ5IGZvciB0aGUgdXNlcidzIHBvc2l0aW9uIGFuZCBtYW5hZ2VyIGluZm9ybWF0aW9uXG4gICAgY29uc29sZS5sb2coJ0RFQlVHOiBRdWVyeWluZyBUYWxlbnQgR3JhcGhRTCBBUEkgZm9yIHVzZXIgcG9zaXRpb24gZGF0YScpO1xuICAgIGNvbnN0IHVzZXJQb3NpdGlvbkRhdGEgPSBhd2FpdCBxdWVyeVRhbGVudEdyYXBoUUwodXNlckVtYWlsLCBjbG91ZElkLCBhdXRoRW1haWwsIGFwaVRva2VuKTtcbiAgICBjb25zb2xlLmxvZygnREVCVUc6IFVzZXIgcG9zaXRpb24gZGF0YSByZWNlaXZlZDonLCBKU09OLnN0cmluZ2lmeSh1c2VyUG9zaXRpb25EYXRhLCBudWxsLCAyKSk7XG4gICAgXG4gICAgLy8gVmFsaWRhdGUgdGhhdCB1c2VyUG9zaXRpb25EYXRhIGFuZCByYWRhcl9wb3NpdGlvbnNTZWFyY2ggZXhpc3RcbiAgICBpZiAoIXVzZXJQb3NpdGlvbkRhdGEgfHwgIXVzZXJQb3NpdGlvbkRhdGEucmFkYXJfcG9zaXRpb25zU2VhcmNoKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFUlJPUjogSW52YWxpZCByZXNwb25zZSBzdHJ1Y3R1cmUgZnJvbSBUYWxlbnQgR3JhcGhRTCBBUEknKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiB1c2VyUG9zaXRpb25EYXRhOicsIHVzZXJQb3NpdGlvbkRhdGEpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgbWVzc2FnZTogJ0ludmFsaWQgcmVzcG9uc2UgcmVjZWl2ZWQgZnJvbSBUYWxlbnQgR3JhcGhRTCBBUEkuIFRoZSBBUEkgbWF5IGJlIHRlbXBvcmFyaWx5IHVuYXZhaWxhYmxlLidcbiAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIGlmICghdXNlclBvc2l0aW9uRGF0YS5yYWRhcl9wb3NpdGlvbnNTZWFyY2guZWRnZXMgfHwgdXNlclBvc2l0aW9uRGF0YS5yYWRhcl9wb3NpdGlvbnNTZWFyY2guZWRnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFUlJPUjogVXNlciBub3QgZm91bmQgaW4gVGFsZW50IHN5c3RlbTonLCB1c2VyRW1haWwpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgbWVzc2FnZTogYFVzZXIgd2l0aCBlbWFpbCAke3VzZXJFbWFpbH0gbm90IGZvdW5kIGluIFRhbGVudCBzeXN0ZW0uYFxuICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgLy8gRXh0cmFjdCB1c2VyIGluZm9ybWF0aW9uIGZyb20gdGhlIHBvc2l0aW9uIGRhdGFcbiAgICBjb25zdCB1c2VyUG9zaXRpb24gPSB1c2VyUG9zaXRpb25EYXRhLnJhZGFyX3Bvc2l0aW9uc1NlYXJjaC5lZGdlc1swXS5ub2RlO1xuICAgIGNvbnN0IHVzZXJQb3NpdGlvbklkID0gdXNlclBvc2l0aW9uLmlkO1xuICAgIFxuICAgIC8vIEV4dHJhY3QganVzdCB0aGUgVVVJRCBmcm9tIHRoZSBwb3NpdGlvbiBBUk4gKGxhc3QgcGFydCBhZnRlciB0aGUgZmluYWwgc2xhc2gpXG4gICAgLy8gQVJOIGZvcm1hdDogYXJpOmNsb3VkOnJhZGFyOi4uLjpwb3NpdGlvbi8uLi4vLi4uL3V1aWRcbiAgICBjb25zdCB1c2VyUG9zaXRpb25VVUlEID0gdXNlclBvc2l0aW9uSWQuc3BsaXQoJy8nKS5wb3AoKTtcbiAgICBjb25zb2xlLmxvZygnREVCVUc6IFVzZXIgcG9zaXRpb24gVVVJRDonLCB1c2VyUG9zaXRpb25VVUlEKTtcbiAgICBcbiAgICAvLyBFeHRyYWN0IGZpZWxkIHZhbHVlc1xuICAgIGxldCB1c2VyTmFtZSA9IHVzZXJFbWFpbDtcbiAgICBsZXQgcmVwb3J0aW5nTGluZVN0cmluZyA9IG51bGw7XG4gICAgbGV0IG1hbmFnZXJIaWVyYXJjaHkgPSBbXTtcbiAgICBcbiAgICBpZiAodXNlclBvc2l0aW9uLmZpZWxkVmFsdWVzKSB7XG4gICAgICB1c2VyUG9zaXRpb24uZmllbGRWYWx1ZXMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICAgIGlmIChmaWVsZC5maWVsZElkID09PSAncG9zaXRpb25Xb3JrZXInICYmIGZpZWxkLmZpZWxkVmFsdWU/LnZhbHVlPy5wcmVmZXJyZWROYW1lKSB7XG4gICAgICAgICAgdXNlck5hbWUgPSBmaWVsZC5maWVsZFZhbHVlLnZhbHVlLnByZWZlcnJlZE5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpZWxkLmZpZWxkSWQgPT09ICdwb3NpdGlvblJlcG9ydGluZ0xpbmUnICYmIGZpZWxkLmZpZWxkVmFsdWU/LnN0cmluZ1ZhbHVlKSB7XG4gICAgICAgICAgcmVwb3J0aW5nTGluZVN0cmluZyA9IGZpZWxkLmZpZWxkVmFsdWUuc3RyaW5nVmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBjb25zb2xlLmxvZygnREVCVUc6IFJlcG9ydGluZyBsaW5lIHN0cmluZzonLCByZXBvcnRpbmdMaW5lU3RyaW5nKTtcbiAgICBcbiAgICAvLyBQYXJzZSB0aGUgcmVwb3J0aW5nIGxpbmUgdG8gZ2V0IG1hbmFnZXIgcG9zaXRpb24gVVVJRHNcbiAgICAvLyBGb3JtYXQgaXM6IHV1aWQxLnV1aWQyLnV1aWQzLi4uIChkb3Qtc2VwYXJhdGVkLCBmcm9tIGRpcmVjdCBtYW5hZ2VyIHRvIHRvcC1sZXZlbCBtYW5hZ2VyKVxuICAgIGlmIChyZXBvcnRpbmdMaW5lU3RyaW5nKSB7XG4gICAgICBjb25zdCBtYW5hZ2VyVVVJRHMgPSByZXBvcnRpbmdMaW5lU3RyaW5nLnNwbGl0KCcuJyk7XG4gICAgICBjb25zb2xlLmxvZygnREVCVUc6IE1hbmFnZXIgVVVJRHMgaW4gaGllcmFyY2h5OicsIG1hbmFnZXJVVUlEcyk7XG4gICAgICBcbiAgICAgIC8vIENyZWF0ZSBhIGxpc3QgdG8gZmV0Y2ggbWFuYWdlciBkZXRhaWxzIGZvciBlYWNoIFVVSURcbiAgICAgIG1hbmFnZXJIaWVyYXJjaHkgPSBtYW5hZ2VyVVVJRHNcbiAgICAgICAgLmZpbHRlcih1dWlkID0+IHV1aWQgJiYgdXVpZC50cmltKCkpXG4gICAgICAgIC5tYXAodXVpZCA9PiAoeyB1dWlkOiB1dWlkLnRyaW0oKSwgcHJlZmVycmVkTmFtZTogbnVsbCB9KSk7XG4gICAgICBcbiAgICAgIGNvbnNvbGUubG9nKCdERUJVRzogTWFuYWdlciBoaWVyYXJjaHkgdG8gZmV0Y2g6JywgbWFuYWdlckhpZXJhcmNoeS5sZW5ndGgsICdtYW5hZ2VycycpO1xuICAgIH1cbiAgICBcbiAgICAvLyBRdWVyeSBmb3IgZGlyZWN0IHJlcG9ydHNcbiAgICBsZXQgZGlyZWN0UmVwb3J0cyA9IFtdO1xuICAgIGNvbnN0IGRpcmVjdFJlcG9ydHNRdWVyeSA9IGBcbiAgICAgIHF1ZXJ5IHBvc2l0aW9uc1NlYXJjaFF1ZXJ5KCRjbG91ZElkOiBJRCEsICRmaWVsZElkSXNJbjogW0lEIV0sICRmaXJzdDogSW50ID0gMTAwLCAkcnFsOiBTdHJpbmcpIHtcbiAgICAgICAgcmFkYXJfcG9zaXRpb25zU2VhcmNoKFxuICAgICAgICAgIGZpcnN0OiAkZmlyc3RcbiAgICAgICAgICBjbG91ZElkOiAkY2xvdWRJZFxuICAgICAgICAgIHJxbDogJHJxbFxuICAgICAgICApIEBvcHRJbih0bzogW1wiUmFkYXJQb3NpdGlvbnNTZWFyY2hcIl0pIHtcbiAgICAgICAgICBlZGdlcyB7XG4gICAgICAgICAgICBub2RlIHtcbiAgICAgICAgICAgICAgZmllbGRWYWx1ZXMoZmllbGRJZElzSW46ICRmaWVsZElkSXNJbikge1xuICAgICAgICAgICAgICAgIGZpZWxkSWRcbiAgICAgICAgICAgICAgICBmaWVsZFZhbHVlIHtcbiAgICAgICAgICAgICAgICAgIC4uLiBvbiBSYWRhclN0cmluZ0ZpZWxkVmFsdWUge1xuICAgICAgICAgICAgICAgICAgICBzdHJpbmdWYWx1ZTogdmFsdWVcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIC4uLiBvbiBSYWRhckFyaUZpZWxkVmFsdWUge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSB7XG4gICAgICAgICAgICAgICAgICAgICAgLi4uIG9uIFJhZGFyV29ya2VyIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVmZXJyZWROYW1lXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgICBcbiAgICBjb25zdCBkaXJlY3RSZXBvcnRzVmFyaWFibGVzID0ge1xuICAgICAgY2xvdWRJZDogY2xvdWRJZCxcbiAgICAgIGZpZWxkSWRJc0luOiBbXCJ3b3JrZXJFbWFpbFwiLCBcInBvc2l0aW9uV29ya2VyXCJdLFxuICAgICAgZmlyc3Q6IDEwMCxcbiAgICAgIHJxbDogYG1hbmFnZXIgPSAnJHt1c2VyUG9zaXRpb25VVUlEfSdgXG4gICAgfTtcbiAgICBcbiAgICB0cnkge1xuICAgICAgY29uc29sZS5sb2coJ0RFQlVHOiBRdWVyeWluZyBkaXJlY3QgcmVwb3J0cyBmb3IgcG9zaXRpb24gVVVJRDonLCB1c2VyUG9zaXRpb25VVUlEKTtcbiAgICAgIFxuICAgICAgLy8gQ3JlYXRlIEJhc2ljIEF1dGggaGVhZGVyIGZvciB0aGUgcmVxdWVzdFxuICAgICAgY29uc3QgYXV0aEhlYWRlciA9IGNyZWF0ZUJhc2ljQXV0aEhlYWRlcihhdXRoRW1haWwsIGFwaVRva2VuKTtcbiAgICAgIFxuICAgICAgLy8gVXNlIGZldGNoIEFQSSB0byBtYWtlIEhUVFAgcmVxdWVzdHMgdG8gdGhlIFRhbGVudCBHcmFwaFFMIEFQSVxuICAgICAgY29uc3QgZGlyZWN0UmVwb3J0c1Jlc3BvbnNlID0gYXdhaXQgZmV0Y2goVEFMRU5UX0dSQVBIUUxfRU5EUE9JTlQsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYXV0aEhlYWRlclxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgcXVlcnk6IGRpcmVjdFJlcG9ydHNRdWVyeSxcbiAgICAgICAgICB2YXJpYWJsZXM6IGRpcmVjdFJlcG9ydHNWYXJpYWJsZXNcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgICAgXG4gICAgICBjb25zb2xlLmxvZygnREVCVUc6IERpcmVjdCByZXBvcnRzIHJlc3BvbnNlIHN0YXR1czonLCBkaXJlY3RSZXBvcnRzUmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgIGNvbnN0IGRpcmVjdFJlcG9ydHNUZXh0ID0gYXdhaXQgZGlyZWN0UmVwb3J0c1Jlc3BvbnNlLnRleHQoKTtcbiAgICAgIGNvbnNvbGUubG9nKCdERUJVRzogRGlyZWN0IHJlcG9ydHMgcmVzcG9uc2UgcmF3IHRleHQgKGZpcnN0IDUwMCBjaGFycyk6JywgZGlyZWN0UmVwb3J0c1RleHQuc3Vic3RyaW5nKDAsIDUwMCkpO1xuICAgICAgXG4gICAgICBsZXQgZGlyZWN0UmVwb3J0c0RhdGE7XG4gICAgICB0cnkge1xuICAgICAgICBkaXJlY3RSZXBvcnRzRGF0YSA9IEpTT04ucGFyc2UoZGlyZWN0UmVwb3J0c1RleHQpO1xuICAgICAgfSBjYXRjaCAocGFyc2VFcnJvcikge1xuICAgICAgICBjb25zdCBlcnJvck1zZyA9IGBEaXJlY3QgcmVwb3J0cyBBUEkgcmV0dXJuZWQgbm9uLUpTT04gcmVzcG9uc2UgKHN0YXR1cyAke2RpcmVjdFJlcG9ydHNSZXNwb25zZS5zdGF0dXN9KTogJHtkaXJlY3RSZXBvcnRzVGV4dC5zdWJzdHJpbmcoMCwgMjAwKX1gO1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFUlJPUjonLCBlcnJvck1zZyk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1zZyk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNvbnNvbGUubG9nKCdERUJVRzogRGlyZWN0IHJlcG9ydHMgZGF0YSByZWNlaXZlZDonLCBKU09OLnN0cmluZ2lmeShkaXJlY3RSZXBvcnRzRGF0YSwgbnVsbCwgMikpO1xuICAgICAgXG4gICAgICAvLyBDaGVjayBmb3IgR3JhcGhRTCBlcnJvcnMgaW4gdGhlIHJlc3BvbnNlXG4gICAgICBpZiAoZGlyZWN0UmVwb3J0c0RhdGEuZXJyb3JzKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignV0FSTklORzogR3JhcGhRTCBlcnJvcnMgaW4gZGlyZWN0IHJlcG9ydHMgcXVlcnk6JywgSlNPTi5zdHJpbmdpZnkoZGlyZWN0UmVwb3J0c0RhdGEuZXJyb3JzKSk7XG4gICAgICAgIGNvbnNvbGUud2FybignV0FSTklORzogQ29udGludWluZyB3aXRob3V0IGRpcmVjdCByZXBvcnRzIGR1ZSB0byBBUEkgZXJyb3InKTtcbiAgICAgICAgLy8gQ29udGludWUgd2l0aG91dCBkaXJlY3QgcmVwb3J0cyBpbnN0ZWFkIG9mIHRocm93aW5nXG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdFJlcG9ydHNEYXRhLmRhdGE/LnJhZGFyX3Bvc2l0aW9uc1NlYXJjaD8uZWRnZXMpIHtcbiAgICAgICAgZGlyZWN0UmVwb3J0cyA9IGRpcmVjdFJlcG9ydHNEYXRhLmRhdGEucmFkYXJfcG9zaXRpb25zU2VhcmNoLmVkZ2VzXG4gICAgICAgICAgLm1hcChlZGdlID0+IHtcbiAgICAgICAgICAgIGxldCByZXBvcnROYW1lID0gJ1Vua25vd24nO1xuICAgICAgICAgICAgaWYgKGVkZ2Uubm9kZS5maWVsZFZhbHVlcykge1xuICAgICAgICAgICAgICBjb25zdCB3b3JrZXJGaWVsZCA9IGVkZ2Uubm9kZS5maWVsZFZhbHVlcy5maW5kKGYgPT4gZi5maWVsZElkID09PSAncG9zaXRpb25Xb3JrZXInKTtcbiAgICAgICAgICAgICAgaWYgKHdvcmtlckZpZWxkPy5maWVsZFZhbHVlPy52YWx1ZT8ucHJlZmVycmVkTmFtZSkge1xuICAgICAgICAgICAgICAgIHJlcG9ydE5hbWUgPSB3b3JrZXJGaWVsZC5maWVsZFZhbHVlLnZhbHVlLnByZWZlcnJlZE5hbWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHByZWZlcnJlZE5hbWU6IHJlcG9ydE5hbWUgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coJ0RFQlVHOiBGb3VuZCcsIGRpcmVjdFJlcG9ydHMubGVuZ3RoLCAnZGlyZWN0IHJlcG9ydHMnKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRVJST1I6IEVycm9yIGZldGNoaW5nIGRpcmVjdCByZXBvcnRzOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgY29uc29sZS5lcnJvcignRVJST1I6IEZ1bGwgc3RhY2sgdHJhY2U6JywgZXJyb3Iuc3RhY2spO1xuICAgICAgLy8gQ29udGludWUgd2l0aG91dCBkaXJlY3QgcmVwb3J0c1xuICAgIH1cbiAgICBcbiAgICAvLyBGZXRjaCBtYW5hZ2VyIG5hbWVzIGZvciB0aGUgcmVwb3J0aW5nIGxpbmUgaGllcmFyY2h5XG4gICAgbGV0IHBvcHVsYXRlZE1hbmFnZXJIaWVyYXJjaHkgPSBbXTtcbiAgICBpZiAobWFuYWdlckhpZXJhcmNoeS5sZW5ndGggPiAwKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBtYW5hZ2VyVVVJRHMgPSBtYW5hZ2VySGllcmFyY2h5Lm1hcChtID0+IG0udXVpZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdERUJVRzogRmV0Y2hpbmcgZGV0YWlscyBmb3IgbWFuYWdlcnM6JywgbWFuYWdlclVVSURzKTtcbiAgICAgICAgcG9wdWxhdGVkTWFuYWdlckhpZXJhcmNoeSA9IGF3YWl0IGZldGNoTWFuYWdlckRldGFpbHMobWFuYWdlclVVSURzLCBjbG91ZElkLCBhdXRoRW1haWwsIGFwaVRva2VuKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0RFQlVHOiBQb3B1bGF0ZWQgbWFuYWdlciBoaWVyYXJjaHk6JywgSlNPTi5zdHJpbmdpZnkocG9wdWxhdGVkTWFuYWdlckhpZXJhcmNoeSwgbnVsbCwgMikpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRVJST1I6IEVycm9yIGZldGNoaW5nIG1hbmFnZXIgZGV0YWlsczonLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgLy8gQ29udGludWUgd2l0aCBlbXB0eSBtYW5hZ2VyIGhpZXJhcmNoeVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBRdWVyeSBmb3IgcGVlcnMgKHBlb3BsZSB3aG8gcmVwb3J0IHRvIHRoZSBzYW1lIGRpcmVjdCBtYW5hZ2VyIGFzIHRoZSB1c2VyKVxuICAgIGxldCBwZWVycyA9IFtdO1xuICAgIGlmIChyZXBvcnRpbmdMaW5lU3RyaW5nKSB7XG4gICAgICAvLyBFeHRyYWN0IHRoZSBkaXJlY3QgbWFuYWdlcidzIFVVSUQgZnJvbSB0aGUgcmVwb3J0aW5nIGxpbmVcbiAgICAgIC8vIFRoZSByZXBvcnRpbmcgbGluZSBjb250YWlucyBwb3NpdGlvbiBVVUlEcyBpbiBvcmRlciBmcm9tIGRpcmVjdCBtYW5hZ2VyIHRvIHRvcC1sZXZlbCBtYW5hZ2VyXG4gICAgICAvLyBUaGUgTEFTVCBVVUlEIGluIHRoZSBkb3Qtc2VwYXJhdGVkIHN0cmluZyBpcyB0aGUgRElSRUNUIE1BTkFHRVIncyBwb3NpdGlvbiBVVUlEXG4gICAgICBjb25zdCBwb3NpdGlvblVVSURzID0gcmVwb3J0aW5nTGluZVN0cmluZy5zcGxpdCgnLicpO1xuICAgICAgY29uc29sZS5sb2coJ0RFQlVHOiBQb3NpdGlvbiBVVUlEcyBpbiByZXBvcnRpbmcgbGluZTonLCBwb3NpdGlvblVVSURzKTtcbiAgICAgIGNvbnN0IGRpcmVjdE1hbmFnZXJQb3NpdGlvblVVSUQgPSBwb3NpdGlvblVVSURzW3Bvc2l0aW9uVVVJRHMubGVuZ3RoIC0gMV07XG4gICAgICBjb25zb2xlLmxvZygnREVCVUc6IERpcmVjdCBtYW5hZ2VyIHBvc2l0aW9uIFVVSUQ6JywgZGlyZWN0TWFuYWdlclBvc2l0aW9uVVVJRCk7XG4gICAgICBcbiAgICAgIGNvbnN0IHBlZXJzUXVlcnkgPSBgXG4gICAgICAgIHF1ZXJ5IHBvc2l0aW9uc1NlYXJjaFF1ZXJ5KCRjbG91ZElkOiBJRCEsICRmaWVsZElkSXNJbjogW0lEIV0sICRmaXJzdDogSW50ID0gMTAwLCAkcnFsOiBTdHJpbmcpIHtcbiAgICAgICAgICByYWRhcl9wb3NpdGlvbnNTZWFyY2goXG4gICAgICAgICAgICBmaXJzdDogJGZpcnN0XG4gICAgICAgICAgICBjbG91ZElkOiAkY2xvdWRJZFxuICAgICAgICAgICAgcnFsOiAkcnFsXG4gICAgICAgICAgKSBAb3B0SW4odG86IFtcIlJhZGFyUG9zaXRpb25zU2VhcmNoXCJdKSB7XG4gICAgICAgICAgICBlZGdlcyB7XG4gICAgICAgICAgICAgIG5vZGUge1xuICAgICAgICAgICAgICAgIGZpZWxkVmFsdWVzKGZpZWxkSWRJc0luOiAkZmllbGRJZElzSW4pIHtcbiAgICAgICAgICAgICAgICAgIGZpZWxkSWRcbiAgICAgICAgICAgICAgICAgIGZpZWxkVmFsdWUge1xuICAgICAgICAgICAgICAgICAgICAuLi4gb24gUmFkYXJTdHJpbmdGaWVsZFZhbHVlIHtcbiAgICAgICAgICAgICAgICAgICAgICBzdHJpbmdWYWx1ZTogdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAuLi4gb24gUmFkYXJBcmlGaWVsZFZhbHVlIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4gb24gUmFkYXJXb3JrZXIge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVmZXJyZWROYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBgO1xuICAgICAgXG4gICAgICAvLyBkaXJlY3RNYW5hZ2VyUG9zaXRpb25VVUlEIHdhcyBhbHJlYWR5IGNhbGN1bGF0ZWQgZWFybGllciBmcm9tIHBvc2l0aW9uVVVJRHNcbiAgICAgIFxuICAgICAgY29uc3QgcGVlcnNWYXJpYWJsZXMgPSB7XG4gICAgICAgIGNsb3VkSWQ6IGNsb3VkSWQsXG4gICAgICAgIGZpZWxkSWRJc0luOiBbXCJ3b3JrZXJFbWFpbFwiLCBcInBvc2l0aW9uV29ya2VyXCJdLFxuICAgICAgICBmaXJzdDogMTAwLFxuICAgICAgICBycWw6IGBtYW5hZ2VyID0gJyR7ZGlyZWN0TWFuYWdlclBvc2l0aW9uVVVJRH0nYFxuICAgICAgfTtcbiAgICAgIFxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc29sZS5sb2coJ0RFQlVHOiBRdWVyeWluZyBwZWVycyBmb3IgZGlyZWN0IG1hbmFnZXIgVVVJRDonLCBkaXJlY3RNYW5hZ2VyUG9zaXRpb25VVUlEKTtcbiAgICAgICAgXG4gICAgICAgIC8vIENyZWF0ZSBCYXNpYyBBdXRoIGhlYWRlciBmb3IgdGhlIHJlcXVlc3RcbiAgICAgICAgY29uc3QgYXV0aEhlYWRlciA9IGNyZWF0ZUJhc2ljQXV0aEhlYWRlcihhdXRoRW1haWwsIGFwaVRva2VuKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFVzZSBmZXRjaCBBUEkgdG8gbWFrZSBIVFRQIHJlcXVlc3RzIHRvIHRoZSBUYWxlbnQgR3JhcGhRTCBBUElcbiAgICAgICAgY29uc3QgcGVlcnNSZXNwb25zZSA9IGF3YWl0IGZldGNoKFRBTEVOVF9HUkFQSFFMX0VORFBPSU5ULCB7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYXV0aEhlYWRlclxuICAgICAgICAgIH0sXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgcXVlcnk6IHBlZXJzUXVlcnksXG4gICAgICAgICAgICB2YXJpYWJsZXM6IHBlZXJzVmFyaWFibGVzXG4gICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZygnREVCVUc6IFBlZXJzIHJlc3BvbnNlIHN0YXR1czonLCBwZWVyc1Jlc3BvbnNlLnN0YXR1cyk7XG4gICAgICAgIGNvbnN0IHBlZXJzVGV4dCA9IGF3YWl0IHBlZXJzUmVzcG9uc2UudGV4dCgpO1xuICAgICAgICBjb25zb2xlLmxvZygnREVCVUc6IFBlZXJzIHJlc3BvbnNlIHJhdyB0ZXh0IChmaXJzdCA1MDAgY2hhcnMpOicsIHBlZXJzVGV4dC5zdWJzdHJpbmcoMCwgNTAwKSk7XG4gICAgICAgIFxuICAgICAgICBsZXQgcGVlcnNEYXRhO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHBlZXJzRGF0YSA9IEpTT04ucGFyc2UocGVlcnNUZXh0KTtcbiAgICAgICAgfSBjYXRjaCAocGFyc2VFcnJvcikge1xuICAgICAgICAgIGNvbnN0IGVycm9yTXNnID0gYFBlZXJzIEFQSSByZXR1cm5lZCBub24tSlNPTiByZXNwb25zZSAoc3RhdHVzICR7cGVlcnNSZXNwb25zZS5zdGF0dXN9KTogJHtwZWVyc1RleHQuc3Vic3RyaW5nKDAsIDIwMCl9YDtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdFUlJPUjonLCBlcnJvck1zZyk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTXNnKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coJ0RFQlVHOiBQZWVycyBkYXRhIHJlY2VpdmVkOicsIEpTT04uc3RyaW5naWZ5KHBlZXJzRGF0YSwgbnVsbCwgMikpO1xuICAgICAgICBcbiAgICAgICAgLy8gQ2hlY2sgZm9yIEdyYXBoUUwgZXJyb3JzIGluIHRoZSByZXNwb25zZVxuICAgICAgICBpZiAocGVlcnNEYXRhLmVycm9ycykge1xuICAgICAgICAgIGNvbnNvbGUud2FybignV0FSTklORzogR3JhcGhRTCBlcnJvcnMgaW4gcGVlcnMgcXVlcnk6JywgSlNPTi5zdHJpbmdpZnkocGVlcnNEYXRhLmVycm9ycykpO1xuICAgICAgICAgIGNvbnNvbGUud2FybignV0FSTklORzogQ29udGludWluZyB3aXRob3V0IHBlZXJzIGR1ZSB0byBBUEkgZXJyb3InKTtcbiAgICAgICAgICAvLyBDb250aW51ZSB3aXRob3V0IHBlZXJzIGluc3RlYWQgb2YgdGhyb3dpbmdcbiAgICAgICAgfSBlbHNlIGlmIChwZWVyc0RhdGEuZGF0YT8ucmFkYXJfcG9zaXRpb25zU2VhcmNoPy5lZGdlcykge1xuICAgICAgICAgIHBlZXJzID0gcGVlcnNEYXRhLmRhdGEucmFkYXJfcG9zaXRpb25zU2VhcmNoLmVkZ2VzXG4gICAgICAgICAgICAubWFwKGVkZ2UgPT4ge1xuICAgICAgICAgICAgICBsZXQgcGVlck5hbWUgPSAnVW5rbm93bic7XG4gICAgICAgICAgICAgIGxldCBwZWVyRW1haWwgPSBudWxsO1xuICAgICAgICAgICAgICBpZiAoZWRnZS5ub2RlLmZpZWxkVmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd29ya2VyRmllbGQgPSBlZGdlLm5vZGUuZmllbGRWYWx1ZXMuZmluZChmID0+IGYuZmllbGRJZCA9PT0gJ3Bvc2l0aW9uV29ya2VyJyk7XG4gICAgICAgICAgICAgICAgaWYgKHdvcmtlckZpZWxkPy5maWVsZFZhbHVlPy52YWx1ZT8ucHJlZmVycmVkTmFtZSkge1xuICAgICAgICAgICAgICAgICAgcGVlck5hbWUgPSB3b3JrZXJGaWVsZC5maWVsZFZhbHVlLnZhbHVlLnByZWZlcnJlZE5hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGVtYWlsRmllbGQgPSBlZGdlLm5vZGUuZmllbGRWYWx1ZXMuZmluZChmID0+IGYuZmllbGRJZCA9PT0gJ3dvcmtlckVtYWlsJyk7XG4gICAgICAgICAgICAgICAgaWYgKGVtYWlsRmllbGQ/LmZpZWxkVmFsdWU/LnN0cmluZ1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICBwZWVyRW1haWwgPSBlbWFpbEZpZWxkLmZpZWxkVmFsdWUuc3RyaW5nVmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB7IHByZWZlcnJlZE5hbWU6IHBlZXJOYW1lLCBlbWFpbDogcGVlckVtYWlsIH07XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLy8gRmlsdGVyIG91dCB0aGUgdXNlciB0aGVtc2VsdmVzIGZyb20gcGVlcnMgKGNvbXBhcmUgYnkgZW1haWwgZm9yIGFjY3VyYWN5KVxuICAgICAgICAgICAgLmZpbHRlcihwZWVyID0+IHBlZXIuZW1haWwgIT09IHVzZXJFbWFpbCAmJiBwZWVyLnByZWZlcnJlZE5hbWUgIT09IHVzZXJOYW1lKTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnREVCVUc6IEZvdW5kJywgcGVlcnMubGVuZ3RoLCAncGVlcnMnKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRVJST1I6IEVycm9yIGZldGNoaW5nIHBlZXJzOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFUlJPUjogRnVsbCBzdGFjayB0cmFjZTonLCBlcnJvci5zdGFjayk7XG4gICAgICAgIC8vIENvbnRpbnVlIHdpdGhvdXQgcGVlcnNcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gQnVpbGQgdGhlIG9yZ2FuaXphdGlvbmFsIHRyZWUgdmlzdWFsaXphdGlvblxuICAgIGNvbnNvbGUubG9nKCdERUJVRzogQnVpbGRpbmcgb3JnYW5pemF0aW9uYWwgdHJlZSB2aXN1YWxpemF0aW9uJyk7XG4gICAgY29uc3Qgb3JnVHJlZSA9IGJ1aWxkT3JnVHJlZVZpc3VhbGl6YXRpb24odXNlck5hbWUsIHBvcHVsYXRlZE1hbmFnZXJIaWVyYXJjaHksIGRpcmVjdFJlcG9ydHMsIHBlZXJzKTtcbiAgICBjb25zb2xlLmxvZygnREVCVUc6IE9yZ2FuaXphdGlvbmFsIHRyZWUgYnVpbHQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgY29uc29sZS5sb2coJ0RFQlVHOiBSZXR1cm5pbmcgc3VjY2VzcyByZXNwb25zZSB3aXRoIHRyZWUgdmlzdWFsaXphdGlvbicpO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICBvdXRwdXQ6IG9yZ1RyZWVcbiAgICB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiBDYXVnaHQgZXJyb3IgaW4gZ2V0T3JnVHJlZSBmdW5jdGlvbjonLCBlcnJvci5tZXNzYWdlKTtcbiAgICBjb25zb2xlLmVycm9yKCdFUlJPUjogRnVsbCBlcnJvciBzdGFjazonLCBlcnJvci5zdGFjayk7XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZXJyb3IubWVzc2FnZSB8fCAnQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnJlZCB3aGlsZSBmZXRjaGluZyBvcmdhbml6YXRpb25hbCBkYXRhLic7XG4gICAgY29uc29sZS5lcnJvcignRVJST1I6IFJldHVybmluZyBlcnJvciByZXNwb25zZSB0byB1c2VyOicsIGVycm9yTWVzc2FnZSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICBtZXNzYWdlOiBlcnJvck1lc3NhZ2VcbiAgICB9O1xuICB9XG59XG5cbi8qKlxuICogTWFpbiBmdW5jdGlvbiB0byByZXRyaWV2ZSBkZXRhaWxlZCBwb3NpdGlvbiBpbmZvcm1hdGlvbiBmb3IgYSB1c2VyIGZyb20gVGFsZW50LlxuICogVGhpcyBmdW5jdGlvbiByZXRyaWV2ZXMgcG9zaXRpb24gZGV0YWlscyBzdWNoIGFzIGpvYiBmYW1pbHksIGxldmVsLCBqb2IgdGl0bGUsIHJvbGUsIHBvc2l0aW9uIHRpdGxlLCBhbmQga2V5LlxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gcmVxdWVzdCAtIFRoZSByZXF1ZXN0IG9iamVjdCBjb250YWluaW5nIHVzZXIgZW1haWxcbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdD59IFJlc3BvbnNlIHdpdGggdGhlIHBvc2l0aW9uIGRldGFpbHNcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFBvc2l0aW9uRGV0YWlscyhyZXF1ZXN0KSB7XG4gIGNvbnNvbGUubG9nKCdERUJVRzogZ2V0UG9zaXRpb25EZXRhaWxzIGZ1bmN0aW9uIGNhbGxlZCcpO1xuICBjb25zb2xlLmxvZygn8J+TpSBSZWNlaXZlZCBwYXlsb2FkOicsIEpTT04uc3RyaW5naWZ5KHJlcXVlc3QsIG51bGwsIDIpKTtcbiAgXG4gIHRyeSB7XG4gICAgLy8gUmV0cmlldmUgdGhlIEFQSSB0b2tlbiBhbmQgZW1haWwgZnJvbSBlbnZpcm9ubWVudCB2YXJpYWJsZXNcbiAgICBjb25zdCBhcGlUb2tlbiA9IHByb2Nlc3MuZW52LlRBTEVOVF9BUElfVE9LRU47XG4gICAgY29uc3QgYXV0aEVtYWlsID0gcHJvY2Vzcy5lbnYuVEFMRU5UX0FVVEhfRU1BSUw7XG4gICAgXG4gICAgaWYgKCFhcGlUb2tlbiB8fCAhYXV0aEVtYWlsKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICBtZXNzYWdlOiAnQVBJIGNyZWRlbnRpYWxzIGFyZSBub3QgY29uZmlndXJlZC4gUGxlYXNlIGNvbnRhY3QgeW91ciBhZG1pbmlzdHJhdG9yLidcbiAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIC8vIEV4dHJhY3QgdXNlciBlbWFpbCBmcm9tIHRoZSByZXF1ZXN0XG4gICAgY29uc3QgdXNlckVtYWlsID0gcmVxdWVzdD8udXNlckVtYWlsO1xuICAgIFxuICAgIGlmICghdXNlckVtYWlsKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICBtZXNzYWdlOiAnVXNlciBlbWFpbCBpcyByZXF1aXJlZC4nXG4gICAgICB9O1xuICAgIH1cbiAgICBcbiAgICAvLyBHZXQgdGhlIGN1cnJlbnQgY2xvdWQgSUQgZnJvbSB0aGUgY29udGV4dFxuICAgIGNvbnN0IGNsb3VkSWQgPSByZXF1ZXN0Py5jb250ZXh0Py5jbG91ZElkO1xuICAgIFxuICAgIGlmICghY2xvdWRJZCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgbWVzc2FnZTogJ0Nsb3VkIElEIGlzIHJlcXVpcmVkLidcbiAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIGNvbnNvbGUubG9nKCdERUJVRzogUXVlcnlpbmcgcG9zaXRpb24gZGV0YWlscyBmb3IgdXNlcjonLCB1c2VyRW1haWwpO1xuICAgIFxuICAgIC8vIFF1ZXJ5IGZvciB0aGUgcG9zaXRpb24gZGV0YWlsc1xuICAgIGNvbnN0IHF1ZXJ5ID0gYFxuICAgICAgcXVlcnkgcG9zaXRpb25zU2VhcmNoUXVlcnkoJGNsb3VkSWQ6IElEISwgJGZpZWxkSWRJc0luOiBbSUQhXSwgJGZpcnN0OiBJbnQgPSAxMDAsICRycWw6IFN0cmluZykge1xuICAgICAgICByYWRhcl9wb3NpdGlvbnNTZWFyY2goXG4gICAgICAgICAgZmlyc3Q6ICRmaXJzdFxuICAgICAgICAgIGNsb3VkSWQ6ICRjbG91ZElkXG4gICAgICAgICAgcnFsOiAkcnFsXG4gICAgICAgICkgQG9wdEluKHRvOiBbXCJSYWRhclBvc2l0aW9uc1NlYXJjaFwiXSkge1xuICAgICAgICAgIHRvdGFsQ291bnRcbiAgICAgICAgICBlZGdlcyB7XG4gICAgICAgICAgICBub2RlIHtcbiAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgZmllbGRWYWx1ZXMoZmllbGRJZElzSW46ICRmaWVsZElkSXNJbikge1xuICAgICAgICAgICAgICAgIGZpZWxkSWRcbiAgICAgICAgICAgICAgICBmaWVsZFZhbHVlIHtcbiAgICAgICAgICAgICAgICAgIC4uLiBvbiBSYWRhclN0cmluZ0ZpZWxkVmFsdWUge1xuICAgICAgICAgICAgICAgICAgICBzdHJpbmdWYWx1ZTogdmFsdWVcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIC4uLiBvbiBSYWRhckFyaUZpZWxkVmFsdWUge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSB7XG4gICAgICAgICAgICAgICAgICAgICAgLi4uIG9uIFJhZGFyV29ya2VyIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVmZXJyZWROYW1lXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgICBcbiAgICBjb25zdCB2YXJpYWJsZXMgPSB7XG4gICAgICBjbG91ZElkOiBjbG91ZElkLFxuICAgICAgZmllbGRJZElzSW46IFtcIndvcmtlckVtYWlsXCIsIFwicG9zaXRpb25Xb3JrZXJcIiwgXCJwb3NpdGlvbkpvYkZhbWlseVwiLCBcInBvc2l0aW9uTGV2ZWxcIiwgXCJwb3NpdGlvbkpvYlRpdGxlXCIsIFwicG9zaXRpb25Sb2xlXCIsIFwicG9zaXRpb25Qb3NpdGlvblRpdGxlXCIsIFwicG9zaXRpb25LZXlcIl0sXG4gICAgICBmaXJzdDogMTAwLFxuICAgICAgcnFsOiBgd29ya2VyRW1haWwgPSAnJHt1c2VyRW1haWx9J2BcbiAgICB9O1xuICAgIFxuICAgIGNvbnN0IGF1dGhIZWFkZXIgPSBjcmVhdGVCYXNpY0F1dGhIZWFkZXIoYXV0aEVtYWlsLCBhcGlUb2tlbik7XG4gICAgXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChUQUxFTlRfR1JBUEhRTF9FTkRQT0lOVCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICdBdXRob3JpemF0aW9uJzogYXV0aEhlYWRlclxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlc1xuICAgICAgfSlcbiAgICB9KTtcbiAgICBcbiAgICBjb25zdCByZXNwb25zZVRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UocmVzcG9uc2VUZXh0KTtcbiAgICBcbiAgICBpZiAoZGF0YS5lcnJvcnMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgR3JhcGhRTCBlcnJvcjogJHtKU09OLnN0cmluZ2lmeShkYXRhLmVycm9ycyl9YCk7XG4gICAgfVxuICAgIFxuICAgIGlmICghZGF0YS5kYXRhPy5yYWRhcl9wb3NpdGlvbnNTZWFyY2g/LmVkZ2VzIHx8IGRhdGEuZGF0YS5yYWRhcl9wb3NpdGlvbnNTZWFyY2guZWRnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICBtZXNzYWdlOiBgVXNlciB3aXRoIGVtYWlsICR7dXNlckVtYWlsfSBub3QgZm91bmQgaW4gdGhlIHN5c3RlbS5gXG4gICAgICB9O1xuICAgIH1cbiAgICBcbiAgICAvLyBFeHRyYWN0IHBvc2l0aW9uIGluZm9ybWF0aW9uXG4gICAgY29uc3QgcG9zaXRpb24gPSBkYXRhLmRhdGEucmFkYXJfcG9zaXRpb25zU2VhcmNoLmVkZ2VzWzBdLm5vZGU7XG4gICAgbGV0IHBvc2l0aW9uRGV0YWlscyA9IHt9O1xuICAgIGxldCB1c2VyTmFtZSA9IHVzZXJFbWFpbDtcbiAgICBcbiAgICAvLyBEZWZpbmUgZmllbGQgZGlzcGxheSBuYW1lc1xuICAgIGNvbnN0IGZpZWxkRGlzcGxheU5hbWVzID0ge1xuICAgICAgJ3Bvc2l0aW9uV29ya2VyJzogJ1dvcmtlcicsXG4gICAgICAncG9zaXRpb25Kb2JGYW1pbHknOiAnSm9iIEZhbWlseScsXG4gICAgICAncG9zaXRpb25MZXZlbCc6ICdMZXZlbCcsXG4gICAgICAncG9zaXRpb25Kb2JUaXRsZSc6ICdKb2IgVGl0bGUnLFxuICAgICAgJ3Bvc2l0aW9uUm9sZSc6ICdSb2xlJyxcbiAgICAgICdwb3NpdGlvblBvc2l0aW9uVGl0bGUnOiAnUG9zaXRpb24gVGl0bGUnLFxuICAgICAgJ3Bvc2l0aW9uS2V5JzogJ0tleSdcbiAgICB9O1xuICAgIFxuICAgIC8vIEV4dHJhY3QgZmllbGQgdmFsdWVzXG4gICAgaWYgKHBvc2l0aW9uLmZpZWxkVmFsdWVzKSB7XG4gICAgICBwb3NpdGlvbi5maWVsZFZhbHVlcy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgICAgY29uc3QgZGlzcGxheU5hbWUgPSBmaWVsZERpc3BsYXlOYW1lc1tmaWVsZC5maWVsZElkXTtcbiAgICAgICAgXG4gICAgICAgIGlmIChmaWVsZC5maWVsZElkID09PSAncG9zaXRpb25Xb3JrZXInICYmIGZpZWxkLmZpZWxkVmFsdWU/LnZhbHVlPy5wcmVmZXJyZWROYW1lKSB7XG4gICAgICAgICAgdXNlck5hbWUgPSBmaWVsZC5maWVsZFZhbHVlLnZhbHVlLnByZWZlcnJlZE5hbWU7XG4gICAgICAgICAgcG9zaXRpb25EZXRhaWxzW2Rpc3BsYXlOYW1lXSA9IGZpZWxkLmZpZWxkVmFsdWUudmFsdWUucHJlZmVycmVkTmFtZTtcbiAgICAgICAgfSBlbHNlIGlmIChmaWVsZC5maWVsZElkICE9PSAncG9zaXRpb25Xb3JrZXInICYmIGZpZWxkLmZpZWxkVmFsdWU/LnN0cmluZ1ZhbHVlKSB7XG4gICAgICAgICAgLy8gRm9yIHN0cmluZyB2YWx1ZXNcbiAgICAgICAgICBwb3NpdGlvbkRldGFpbHNbZGlzcGxheU5hbWVdID0gZmllbGQuZmllbGRWYWx1ZS5zdHJpbmdWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIC8vIEJ1aWxkIHRoZSByZXNwb25zZSBtZXNzYWdlXG4gICAgbGV0IG1lc3NhZ2UgPSBgUG9zaXRpb24gRGV0YWlscyBmb3IgJHt1c2VyTmFtZX0gKCR7dXNlckVtYWlsfSk6XFxuXFxuYDtcbiAgICBcbiAgICBPYmplY3QuZW50cmllcyhwb3NpdGlvbkRldGFpbHMpLmZvckVhY2goKFtkaXNwbGF5TmFtZSwgdmFsdWVdKSA9PiB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgbWVzc2FnZSArPSBgJHtkaXNwbGF5TmFtZX06ICR7dmFsdWV9XFxuYDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICBjb25zb2xlLmxvZygnREVCVUc6IFBvc2l0aW9uIGRldGFpbHMgcmV0cmlldmVkIHN1Y2Nlc3NmdWxseScpO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICBvdXRwdXQ6IG1lc3NhZ2VcbiAgICB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiBDYXVnaHQgZXJyb3IgaW4gZ2V0UG9zaXRpb25EZXRhaWxzIGZ1bmN0aW9uOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgIGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiBGdWxsIGVycm9yIHN0YWNrOicsIGVycm9yLnN0YWNrKTtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfHwgJ0FuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJyZWQgd2hpbGUgZmV0Y2hpbmcgcG9zaXRpb24gZGV0YWlscy4nXG4gICAgfTtcbiAgfVxufVxuXG4vKipcbiAqIE1haW4gZnVuY3Rpb24gdG8gcmV0cmlldmUgYWxsIGRldGFpbHMgKG9yZyB0cmVlICsgcG9zaXRpb24gaW5mb3JtYXRpb24pIGZvciBhIHVzZXIuXG4gKiBUaGlzIGZ1bmN0aW9uIGNvbWJpbmVzIG9yZ2FuaXphdGlvbmFsIHN0cnVjdHVyZSBhbmQgcG9zaXRpb24gZGV0YWlscyBpbiBhIGNvbXByZWhlbnNpdmUsIHdlbGwtZm9ybWF0dGVkIG91dHB1dC5cbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IHJlcXVlc3QgLSBUaGUgcmVxdWVzdCBvYmplY3QgY29udGFpbmluZyB1c2VyIGVtYWlsXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3Q+fSBSZXNwb25zZSB3aXRoIGFsbCB1c2VyIGRldGFpbHNcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFsbFVzZXJEZXRhaWxzKHJlcXVlc3QpIHtcbiAgY29uc29sZS5sb2coJ0RFQlVHOiBnZXRBbGxVc2VyRGV0YWlscyBmdW5jdGlvbiBjYWxsZWQnKTtcbiAgY29uc29sZS5sb2coJ/Cfk6UgUmVjZWl2ZWQgcGF5bG9hZDonLCBKU09OLnN0cmluZ2lmeShyZXF1ZXN0LCBudWxsLCAyKSk7XG4gIFxuICB0cnkge1xuICAgIC8vIFJldHJpZXZlIHRoZSBBUEkgdG9rZW4gYW5kIGVtYWlsIGZyb20gZW52aXJvbm1lbnQgdmFyaWFibGVzXG4gICAgY29uc3QgYXBpVG9rZW4gPSBwcm9jZXNzLmVudi5UQUxFTlRfQVBJX1RPS0VOO1xuICAgIGNvbnN0IGF1dGhFbWFpbCA9IHByb2Nlc3MuZW52LlRBTEVOVF9BVVRIX0VNQUlMO1xuICAgIFxuICAgIGlmICghYXBpVG9rZW4gfHwgIWF1dGhFbWFpbCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgbWVzc2FnZTogJ0FQSSBjcmVkZW50aWFscyBhcmUgbm90IGNvbmZpZ3VyZWQuIFBsZWFzZSBjb250YWN0IHlvdXIgYWRtaW5pc3RyYXRvci4nXG4gICAgICB9O1xuICAgIH1cbiAgICBcbiAgICAvLyBFeHRyYWN0IHVzZXIgZW1haWwgZnJvbSB0aGUgcmVxdWVzdFxuICAgIGNvbnN0IHVzZXJFbWFpbCA9IHJlcXVlc3Q/LnVzZXJFbWFpbDtcbiAgICBcbiAgICBpZiAoIXVzZXJFbWFpbCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgbWVzc2FnZTogJ1VzZXIgZW1haWwgaXMgcmVxdWlyZWQuJ1xuICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgLy8gR2V0IHRoZSBjdXJyZW50IGNsb3VkIElEIGZyb20gdGhlIGNvbnRleHRcbiAgICBjb25zdCBjbG91ZElkID0gcmVxdWVzdD8uY29udGV4dD8uY2xvdWRJZDtcbiAgICBcbiAgICBpZiAoIWNsb3VkSWQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgIG1lc3NhZ2U6ICdDbG91ZCBJRCBpcyByZXF1aXJlZC4nXG4gICAgICB9O1xuICAgIH1cbiAgICBcbiAgICBjb25zb2xlLmxvZygnREVCVUc6IFF1ZXJ5aW5nIGFsbCBkZXRhaWxzIGZvciB1c2VyOicsIHVzZXJFbWFpbCk7XG4gICAgXG4gICAgLy8gUXVlcnkgZm9yIGFsbCBwb3NpdGlvbiBkZXRhaWxzIGluY2x1ZGluZyByZXBvcnRpbmcgbGluZVxuICAgIGNvbnN0IHF1ZXJ5ID0gYFxuICAgICAgcXVlcnkgcG9zaXRpb25zU2VhcmNoUXVlcnkoJGNsb3VkSWQ6IElEISwgJGZpZWxkSWRJc0luOiBbSUQhXSwgJGZpcnN0OiBJbnQgPSAxMDAsICRycWw6IFN0cmluZykge1xuICAgICAgICByYWRhcl9wb3NpdGlvbnNTZWFyY2goXG4gICAgICAgICAgZmlyc3Q6ICRmaXJzdFxuICAgICAgICAgIGNsb3VkSWQ6ICRjbG91ZElkXG4gICAgICAgICAgcnFsOiAkcnFsXG4gICAgICAgICkgQG9wdEluKHRvOiBbXCJSYWRhclBvc2l0aW9uc1NlYXJjaFwiXSkge1xuICAgICAgICAgIHRvdGFsQ291bnRcbiAgICAgICAgICBlZGdlcyB7XG4gICAgICAgICAgICBub2RlIHtcbiAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgZmllbGRWYWx1ZXMoZmllbGRJZElzSW46ICRmaWVsZElkSXNJbikge1xuICAgICAgICAgICAgICAgIGZpZWxkSWRcbiAgICAgICAgICAgICAgICBmaWVsZFZhbHVlIHtcbiAgICAgICAgICAgICAgICAgIC4uLiBvbiBSYWRhclN0cmluZ0ZpZWxkVmFsdWUge1xuICAgICAgICAgICAgICAgICAgICBzdHJpbmdWYWx1ZTogdmFsdWVcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIC4uLiBvbiBSYWRhckFyaUZpZWxkVmFsdWUge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSB7XG4gICAgICAgICAgICAgICAgICAgICAgLi4uIG9uIFJhZGFyV29ya2VyIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVmZXJyZWROYW1lXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgICBcbiAgICBjb25zdCB2YXJpYWJsZXMgPSB7XG4gICAgICBjbG91ZElkOiBjbG91ZElkLFxuICAgICAgZmllbGRJZElzSW46IFtcIndvcmtlckVtYWlsXCIsIFwicG9zaXRpb25Xb3JrZXJcIiwgXCJwb3NpdGlvblJlcG9ydGluZ0xpbmVcIiwgXCJwb3NpdGlvbkpvYkZhbWlseVwiLCBcInBvc2l0aW9uTGV2ZWxcIiwgXCJwb3NpdGlvbkpvYlRpdGxlXCIsIFwicG9zaXRpb25Sb2xlXCIsIFwicG9zaXRpb25Qb3NpdGlvblRpdGxlXCIsIFwicG9zaXRpb25LZXlcIl0sXG4gICAgICBmaXJzdDogMTAwLFxuICAgICAgcnFsOiBgd29ya2VyRW1haWwgPSAnJHt1c2VyRW1haWx9J2BcbiAgICB9O1xuICAgIFxuICAgIGNvbnN0IGF1dGhIZWFkZXIgPSBjcmVhdGVCYXNpY0F1dGhIZWFkZXIoYXV0aEVtYWlsLCBhcGlUb2tlbik7XG4gICAgXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChUQUxFTlRfR1JBUEhRTF9FTkRQT0lOVCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICdBdXRob3JpemF0aW9uJzogYXV0aEhlYWRlclxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlc1xuICAgICAgfSlcbiAgICB9KTtcbiAgICBcbiAgICBjb25zdCByZXNwb25zZVRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UocmVzcG9uc2VUZXh0KTtcbiAgICBcbiAgICBpZiAoZGF0YS5lcnJvcnMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgR3JhcGhRTCBlcnJvcjogJHtKU09OLnN0cmluZ2lmeShkYXRhLmVycm9ycyl9YCk7XG4gICAgfVxuICAgIFxuICAgIGlmICghZGF0YS5kYXRhPy5yYWRhcl9wb3NpdGlvbnNTZWFyY2g/LmVkZ2VzIHx8IGRhdGEuZGF0YS5yYWRhcl9wb3NpdGlvbnNTZWFyY2guZWRnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICBtZXNzYWdlOiBgVXNlciB3aXRoIGVtYWlsICR7dXNlckVtYWlsfSBub3QgZm91bmQgaW4gdGhlIHN5c3RlbS5gXG4gICAgICB9O1xuICAgIH1cbiAgICBcbiAgICAvLyBFeHRyYWN0IHBvc2l0aW9uIGluZm9ybWF0aW9uXG4gICAgY29uc3QgcG9zaXRpb24gPSBkYXRhLmRhdGEucmFkYXJfcG9zaXRpb25zU2VhcmNoLmVkZ2VzWzBdLm5vZGU7XG4gICAgY29uc3QgdXNlclBvc2l0aW9uSWQgPSBwb3NpdGlvbi5pZDtcbiAgICBjb25zdCB1c2VyUG9zaXRpb25VVUlEID0gdXNlclBvc2l0aW9uSWQuc3BsaXQoJy8nKS5wb3AoKTtcbiAgICBcbiAgICBsZXQgdXNlck5hbWUgPSB1c2VyRW1haWw7XG4gICAgbGV0IHJlcG9ydGluZ0xpbmVTdHJpbmcgPSBudWxsO1xuICAgIGxldCBtYW5hZ2VySGllcmFyY2h5ID0gW107XG4gICAgbGV0IHBvc2l0aW9uRGV0YWlscyA9IHt9O1xuICAgIFxuICAgIC8vIERlZmluZSBmaWVsZCBkaXNwbGF5IG5hbWVzXG4gICAgY29uc3QgZmllbGREaXNwbGF5TmFtZXMgPSB7XG4gICAgICAncG9zaXRpb25Xb3JrZXInOiAnV29ya2VyJyxcbiAgICAgICdwb3NpdGlvbkpvYkZhbWlseSc6ICdKb2IgRmFtaWx5JyxcbiAgICAgICdwb3NpdGlvbkxldmVsJzogJ0xldmVsJyxcbiAgICAgICdwb3NpdGlvbkpvYlRpdGxlJzogJ0pvYiBUaXRsZScsXG4gICAgICAncG9zaXRpb25Sb2xlJzogJ1JvbGUnLFxuICAgICAgJ3Bvc2l0aW9uUG9zaXRpb25UaXRsZSc6ICdQb3NpdGlvbiBUaXRsZScsXG4gICAgICAncG9zaXRpb25LZXknOiAnS2V5J1xuICAgIH07XG4gICAgXG4gICAgLy8gRXh0cmFjdCBmaWVsZCB2YWx1ZXNcbiAgICBpZiAocG9zaXRpb24uZmllbGRWYWx1ZXMpIHtcbiAgICAgIHBvc2l0aW9uLmZpZWxkVmFsdWVzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgICBjb25zdCBkaXNwbGF5TmFtZSA9IGZpZWxkRGlzcGxheU5hbWVzW2ZpZWxkLmZpZWxkSWRdO1xuICAgICAgICBcbiAgICAgICAgaWYgKGZpZWxkLmZpZWxkSWQgPT09ICdwb3NpdGlvbldvcmtlcicgJiYgZmllbGQuZmllbGRWYWx1ZT8udmFsdWU/LnByZWZlcnJlZE5hbWUpIHtcbiAgICAgICAgICB1c2VyTmFtZSA9IGZpZWxkLmZpZWxkVmFsdWUudmFsdWUucHJlZmVycmVkTmFtZTtcbiAgICAgICAgICBwb3NpdGlvbkRldGFpbHNbZGlzcGxheU5hbWVdID0gZmllbGQuZmllbGRWYWx1ZS52YWx1ZS5wcmVmZXJyZWROYW1lO1xuICAgICAgICB9IGVsc2UgaWYgKGZpZWxkLmZpZWxkSWQgPT09ICdwb3NpdGlvblJlcG9ydGluZ0xpbmUnICYmIGZpZWxkLmZpZWxkVmFsdWU/LnN0cmluZ1ZhbHVlKSB7XG4gICAgICAgICAgcmVwb3J0aW5nTGluZVN0cmluZyA9IGZpZWxkLmZpZWxkVmFsdWUuc3RyaW5nVmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZmllbGQuZmllbGRJZCAhPT0gJ3Bvc2l0aW9uV29ya2VyJyAmJiBmaWVsZC5maWVsZFZhbHVlPy5zdHJpbmdWYWx1ZSkge1xuICAgICAgICAgIHBvc2l0aW9uRGV0YWlsc1tkaXNwbGF5TmFtZV0gPSBmaWVsZC5maWVsZFZhbHVlLnN0cmluZ1ZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLy8gUGFyc2UgdGhlIHJlcG9ydGluZyBsaW5lIHRvIGdldCBtYW5hZ2VyIHBvc2l0aW9uIFVVSURzXG4gICAgaWYgKHJlcG9ydGluZ0xpbmVTdHJpbmcpIHtcbiAgICAgIGNvbnN0IHBvc2l0aW9uVVVJRHMgPSByZXBvcnRpbmdMaW5lU3RyaW5nLnNwbGl0KCcuJyk7XG4gICAgICBtYW5hZ2VySGllcmFyY2h5ID0gcG9zaXRpb25VVUlEc1xuICAgICAgICAuZmlsdGVyKHV1aWQgPT4gdXVpZCAmJiB1dWlkLnRyaW0oKSlcbiAgICAgICAgLm1hcCh1dWlkID0+ICh7IHV1aWQ6IHV1aWQudHJpbSgpLCBwcmVmZXJyZWROYW1lOiBudWxsIH0pKTtcbiAgICB9XG4gICAgXG4gICAgLy8gRmV0Y2ggbWFuYWdlciBuYW1lc1xuICAgIGxldCBwb3B1bGF0ZWRNYW5hZ2VySGllcmFyY2h5ID0gW107XG4gICAgaWYgKG1hbmFnZXJIaWVyYXJjaHkubGVuZ3RoID4gMCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgbWFuYWdlclVVSURzID0gbWFuYWdlckhpZXJhcmNoeS5tYXAobSA9PiBtLnV1aWQpO1xuICAgICAgICBwb3B1bGF0ZWRNYW5hZ2VySGllcmFyY2h5ID0gYXdhaXQgZmV0Y2hNYW5hZ2VyRGV0YWlscyhtYW5hZ2VyVVVJRHMsIGNsb3VkSWQsIGF1dGhFbWFpbCwgYXBpVG9rZW4pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRVJST1I6IEVycm9yIGZldGNoaW5nIG1hbmFnZXIgZGV0YWlsczonLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gUXVlcnkgZm9yIGRpcmVjdCByZXBvcnRzXG4gICAgbGV0IGRpcmVjdFJlcG9ydHMgPSBbXTtcbiAgICBjb25zdCBkaXJlY3RSZXBvcnRzUXVlcnkgPSBgXG4gICAgICBxdWVyeSBwb3NpdGlvbnNTZWFyY2hRdWVyeSgkY2xvdWRJZDogSUQhLCAkZmllbGRJZElzSW46IFtJRCFdLCAkZmlyc3Q6IEludCA9IDEwMCwgJHJxbDogU3RyaW5nKSB7XG4gICAgICAgIHJhZGFyX3Bvc2l0aW9uc1NlYXJjaChcbiAgICAgICAgICBmaXJzdDogJGZpcnN0XG4gICAgICAgICAgY2xvdWRJZDogJGNsb3VkSWRcbiAgICAgICAgICBycWw6ICRycWxcbiAgICAgICAgKSBAb3B0SW4odG86IFtcIlJhZGFyUG9zaXRpb25zU2VhcmNoXCJdKSB7XG4gICAgICAgICAgZWRnZXMge1xuICAgICAgICAgICAgbm9kZSB7XG4gICAgICAgICAgICAgIGZpZWxkVmFsdWVzKGZpZWxkSWRJc0luOiAkZmllbGRJZElzSW4pIHtcbiAgICAgICAgICAgICAgICBmaWVsZElkXG4gICAgICAgICAgICAgICAgZmllbGRWYWx1ZSB7XG4gICAgICAgICAgICAgICAgICAuLi4gb24gUmFkYXJBcmlGaWVsZFZhbHVlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUge1xuICAgICAgICAgICAgICAgICAgICAgIC4uLiBvbiBSYWRhcldvcmtlciB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlZmVycmVkTmFtZVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gICAgXG4gICAgY29uc3QgZGlyZWN0UmVwb3J0c1ZhcmlhYmxlcyA9IHtcbiAgICAgIGNsb3VkSWQ6IGNsb3VkSWQsXG4gICAgICBmaWVsZElkSXNJbjogW1wid29ya2VyRW1haWxcIiwgXCJwb3NpdGlvbldvcmtlclwiXSxcbiAgICAgIGZpcnN0OiAxMDAsXG4gICAgICBycWw6IGBtYW5hZ2VyID0gJyR7dXNlclBvc2l0aW9uVVVJRH0nYFxuICAgIH07XG4gICAgXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGF1dGhIZWFkZXJEUiA9IGNyZWF0ZUJhc2ljQXV0aEhlYWRlcihhdXRoRW1haWwsIGFwaVRva2VuKTtcbiAgICAgIGNvbnN0IGRpcmVjdFJlcG9ydHNSZXNwb25zZSA9IGF3YWl0IGZldGNoKFRBTEVOVF9HUkFQSFFMX0VORFBPSU5ULCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGF1dGhIZWFkZXJEUlxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgcXVlcnk6IGRpcmVjdFJlcG9ydHNRdWVyeSxcbiAgICAgICAgICB2YXJpYWJsZXM6IGRpcmVjdFJlcG9ydHNWYXJpYWJsZXNcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgICAgXG4gICAgICBjb25zdCBkaXJlY3RSZXBvcnRzVGV4dCA9IGF3YWl0IGRpcmVjdFJlcG9ydHNSZXNwb25zZS50ZXh0KCk7XG4gICAgICBjb25zdCBkaXJlY3RSZXBvcnRzRGF0YSA9IEpTT04ucGFyc2UoZGlyZWN0UmVwb3J0c1RleHQpO1xuICAgICAgXG4gICAgICBpZiAoIWRpcmVjdFJlcG9ydHNEYXRhLmVycm9ycyAmJiBkaXJlY3RSZXBvcnRzRGF0YS5kYXRhPy5yYWRhcl9wb3NpdGlvbnNTZWFyY2g/LmVkZ2VzKSB7XG4gICAgICAgIGRpcmVjdFJlcG9ydHMgPSBkaXJlY3RSZXBvcnRzRGF0YS5kYXRhLnJhZGFyX3Bvc2l0aW9uc1NlYXJjaC5lZGdlc1xuICAgICAgICAgIC5tYXAoZWRnZSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVwb3J0TmFtZSA9ICdVbmtub3duJztcbiAgICAgICAgICAgIGxldCByZXBvcnRFbWFpbCA9IG51bGw7XG4gICAgICAgICAgICBpZiAoZWRnZS5ub2RlLmZpZWxkVmFsdWVzKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHdvcmtlckZpZWxkID0gZWRnZS5ub2RlLmZpZWxkVmFsdWVzLmZpbmQoZiA9PiBmLmZpZWxkSWQgPT09ICdwb3NpdGlvbldvcmtlcicpO1xuICAgICAgICAgICAgICBpZiAod29ya2VyRmllbGQ/LmZpZWxkVmFsdWU/LnZhbHVlPy5wcmVmZXJyZWROYW1lKSB7XG4gICAgICAgICAgICAgICAgcmVwb3J0TmFtZSA9IHdvcmtlckZpZWxkLmZpZWxkVmFsdWUudmFsdWUucHJlZmVycmVkTmFtZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBlbWFpbEZpZWxkID0gZWRnZS5ub2RlLmZpZWxkVmFsdWVzLmZpbmQoZiA9PiBmLmZpZWxkSWQgPT09ICd3b3JrZXJFbWFpbCcpO1xuICAgICAgICAgICAgICBpZiAoZW1haWxGaWVsZD8uZmllbGRWYWx1ZT8uc3RyaW5nVmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXBvcnRFbWFpbCA9IGVtYWlsRmllbGQuZmllbGRWYWx1ZS5zdHJpbmdWYWx1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgcHJlZmVycmVkTmFtZTogcmVwb3J0TmFtZSwgZW1haWw6IHJlcG9ydEVtYWlsIH07XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiBFcnJvciBmZXRjaGluZyBkaXJlY3QgcmVwb3J0czonLCBlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gICAgXG4gICAgLy8gUXVlcnkgZm9yIHBlZXJzXG4gICAgbGV0IHBlZXJzID0gW107XG4gICAgaWYgKHJlcG9ydGluZ0xpbmVTdHJpbmcpIHtcbiAgICAgIGNvbnN0IHBvc2l0aW9uVVVJRHMgPSByZXBvcnRpbmdMaW5lU3RyaW5nLnNwbGl0KCcuJyk7XG4gICAgICBjb25zdCBkaXJlY3RNYW5hZ2VyUG9zaXRpb25VVUlEID0gcG9zaXRpb25VVUlEc1twb3NpdGlvblVVSURzLmxlbmd0aCAtIDFdO1xuICAgICAgXG4gICAgICBjb25zdCBwZWVyc1F1ZXJ5ID0gYFxuICAgICAgICBxdWVyeSBwb3NpdGlvbnNTZWFyY2hRdWVyeSgkY2xvdWRJZDogSUQhLCAkZmllbGRJZElzSW46IFtJRCFdLCAkZmlyc3Q6IEludCA9IDEwMCwgJHJxbDogU3RyaW5nKSB7XG4gICAgICAgICAgcmFkYXJfcG9zaXRpb25zU2VhcmNoKFxuICAgICAgICAgICAgZmlyc3Q6ICRmaXJzdFxuICAgICAgICAgICAgY2xvdWRJZDogJGNsb3VkSWRcbiAgICAgICAgICAgIHJxbDogJHJxbFxuICAgICAgICAgICkgQG9wdEluKHRvOiBbXCJSYWRhclBvc2l0aW9uc1NlYXJjaFwiXSkge1xuICAgICAgICAgICAgZWRnZXMge1xuICAgICAgICAgICAgICBub2RlIHtcbiAgICAgICAgICAgICAgICBmaWVsZFZhbHVlcyhmaWVsZElkSXNJbjogJGZpZWxkSWRJc0luKSB7XG4gICAgICAgICAgICAgICAgICBmaWVsZElkXG4gICAgICAgICAgICAgICAgICBmaWVsZFZhbHVlIHtcbiAgICAgICAgICAgICAgICAgICAgLi4uIG9uIFJhZGFyU3RyaW5nRmllbGRWYWx1ZSB7XG4gICAgICAgICAgICAgICAgICAgICAgc3RyaW5nVmFsdWU6IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLi4uIG9uIFJhZGFyQXJpRmllbGRWYWx1ZSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWUge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uIG9uIFJhZGFyV29ya2VyIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlZmVycmVkTmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgYDtcbiAgICAgIFxuICAgICAgLy8gZGlyZWN0TWFuYWdlclBvc2l0aW9uVVVJRCB3YXMgYWxyZWFkeSBjYWxjdWxhdGVkIGZyb20gdGhlIGZpcnN0IHBvc2l0aW9uVVVJRHMgc3BsaXRcbiAgICAgIFxuICAgICAgY29uc3QgcGVlcnNWYXJpYWJsZXMgPSB7XG4gICAgICAgIGNsb3VkSWQ6IGNsb3VkSWQsXG4gICAgICAgIGZpZWxkSWRJc0luOiBbXCJ3b3JrZXJFbWFpbFwiLCBcInBvc2l0aW9uV29ya2VyXCJdLFxuICAgICAgICBmaXJzdDogMTAwLFxuICAgICAgICBycWw6IGBtYW5hZ2VyID0gJyR7ZGlyZWN0TWFuYWdlclBvc2l0aW9uVVVJRH0nYFxuICAgICAgfTtcbiAgICAgIFxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYXV0aEhlYWRlclBlZXJzID0gY3JlYXRlQmFzaWNBdXRoSGVhZGVyKGF1dGhFbWFpbCwgYXBpVG9rZW4pO1xuICAgICAgICBjb25zdCBwZWVyc1Jlc3BvbnNlID0gYXdhaXQgZmV0Y2goVEFMRU5UX0dSQVBIUUxfRU5EUE9JTlQsIHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBhdXRoSGVhZGVyUGVlcnNcbiAgICAgICAgICB9LFxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIHF1ZXJ5OiBwZWVyc1F1ZXJ5LFxuICAgICAgICAgICAgdmFyaWFibGVzOiBwZWVyc1ZhcmlhYmxlc1xuICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgcGVlcnNUZXh0ID0gYXdhaXQgcGVlcnNSZXNwb25zZS50ZXh0KCk7XG4gICAgICAgIGNvbnN0IHBlZXJzRGF0YSA9IEpTT04ucGFyc2UocGVlcnNUZXh0KTtcbiAgICAgICAgXG4gICAgICAgIGlmICghcGVlcnNEYXRhLmVycm9ycyAmJiBwZWVyc0RhdGEuZGF0YT8ucmFkYXJfcG9zaXRpb25zU2VhcmNoPy5lZGdlcykge1xuICAgICAgICAgIHBlZXJzID0gcGVlcnNEYXRhLmRhdGEucmFkYXJfcG9zaXRpb25zU2VhcmNoLmVkZ2VzXG4gICAgICAgICAgICAubWFwKGVkZ2UgPT4ge1xuICAgICAgICAgICAgICBsZXQgcGVlck5hbWUgPSAnVW5rbm93bic7XG4gICAgICAgICAgICAgIGxldCBwZWVyRW1haWwgPSBudWxsO1xuICAgICAgICAgICAgICBpZiAoZWRnZS5ub2RlLmZpZWxkVmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd29ya2VyRmllbGQgPSBlZGdlLm5vZGUuZmllbGRWYWx1ZXMuZmluZChmID0+IGYuZmllbGRJZCA9PT0gJ3Bvc2l0aW9uV29ya2VyJyk7XG4gICAgICAgICAgICAgICAgaWYgKHdvcmtlckZpZWxkPy5maWVsZFZhbHVlPy52YWx1ZT8ucHJlZmVycmVkTmFtZSkge1xuICAgICAgICAgICAgICAgICAgcGVlck5hbWUgPSB3b3JrZXJGaWVsZC5maWVsZFZhbHVlLnZhbHVlLnByZWZlcnJlZE5hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGVtYWlsRmllbGQgPSBlZGdlLm5vZGUuZmllbGRWYWx1ZXMuZmluZChmID0+IGYuZmllbGRJZCA9PT0gJ3dvcmtlckVtYWlsJyk7XG4gICAgICAgICAgICAgICAgaWYgKGVtYWlsRmllbGQ/LmZpZWxkVmFsdWU/LnN0cmluZ1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICBwZWVyRW1haWwgPSBlbWFpbEZpZWxkLmZpZWxkVmFsdWUuc3RyaW5nVmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB7IHByZWZlcnJlZE5hbWU6IHBlZXJOYW1lLCBlbWFpbDogcGVlckVtYWlsIH07XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbHRlcihwZWVyID0+IHBlZXIuZW1haWwgIT09IHVzZXJFbWFpbCAmJiBwZWVyLnByZWZlcnJlZE5hbWUgIT09IHVzZXJOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRVJST1I6IEVycm9yIGZldGNoaW5nIHBlZXJzOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBCdWlsZCBjb21wcmVoZW5zaXZlIG91dHB1dFxuICAgIGxldCBtZXNzYWdlID0gYOKVlOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVl1xcbmA7XG4gICAgbWVzc2FnZSArPSBg4pWRIENPTVBMRVRFIFVTRVIgREVUQUlMU1xcbmA7XG4gICAgbWVzc2FnZSArPSBg4pWa4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWdXFxuXFxuYDtcbiAgICBcbiAgICAvLyBVc2VyIGFuZCBQb3NpdGlvbiBJbmZvcm1hdGlvblxuICAgIG1lc3NhZ2UgKz0gYPCfkaQgVVNFUiBJTkZPUk1BVElPTlxcbmA7XG4gICAgbWVzc2FnZSArPSBg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXFxuYDtcbiAgICBtZXNzYWdlICs9IGBOYW1lOiAke3VzZXJOYW1lfVxcbmA7XG4gICAgbWVzc2FnZSArPSBgRW1haWw6ICR7dXNlckVtYWlsfVxcbmA7XG4gICAgbWVzc2FnZSArPSBgXFxuYDtcbiAgICBcbiAgICAvLyBQb3NpdGlvbiBEZXRhaWxzXG4gICAgbWVzc2FnZSArPSBg8J+SvCBQT1NJVElPTiBERVRBSUxTXFxuYDtcbiAgICBtZXNzYWdlICs9IGDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcXG5gO1xuICAgIE9iamVjdC5lbnRyaWVzKHBvc2l0aW9uRGV0YWlscykuZm9yRWFjaCgoW2Rpc3BsYXlOYW1lLCB2YWx1ZV0pID0+IHtcbiAgICAgIGlmICh2YWx1ZSAmJiBkaXNwbGF5TmFtZSAhPT0gJ1dvcmtlcicpIHtcbiAgICAgICAgbWVzc2FnZSArPSBgJHtkaXNwbGF5TmFtZX06ICR7dmFsdWV9XFxuYDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBtZXNzYWdlICs9IGBcXG5gO1xuICAgIFxuICAgIC8vIFJlcG9ydGluZyBMaW5lXG4gICAgbWVzc2FnZSArPSBg8J+UlyBSRVBPUlRJTkcgTElORVxcbmA7XG4gICAgbWVzc2FnZSArPSBg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXFxuYDtcbiAgICBpZiAocG9wdWxhdGVkTWFuYWdlckhpZXJhcmNoeSAmJiBwb3B1bGF0ZWRNYW5hZ2VySGllcmFyY2h5Lmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIFJldmVyc2UgdGhlIGhpZXJhcmNoeSBzbyBkaXJlY3QgbWFuYWdlciBhcHBlYXJzIGZpcnN0XG4gICAgICBjb25zdCByZXZlcnNlZEhpZXJhcmNoeSA9IFsuLi5wb3B1bGF0ZWRNYW5hZ2VySGllcmFyY2h5XS5yZXZlcnNlKCk7XG4gICAgICByZXZlcnNlZEhpZXJhcmNoeS5mb3JFYWNoKChtYW5hZ2VyLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBsZXZlbExhYmVsID0gaW5kZXggPT09IDAgPyAnRGlyZWN0IE1hbmFnZXInIDogYExldmVsICR7aW5kZXggKyAxfWA7XG4gICAgICAgIG1lc3NhZ2UgKz0gYCR7aW5kZXggKyAxfS4gJHttYW5hZ2VyLnByZWZlcnJlZE5hbWV9ICgke2xldmVsTGFiZWx9KVxcbmA7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZSArPSBgTm8gbWFuYWdlcnMgZm91bmRcXG5gO1xuICAgIH1cbiAgICBtZXNzYWdlICs9IGBcXG5gO1xuICAgIFxuICAgIC8vIERpcmVjdCBSZXBvcnRzXG4gICAgbWVzc2FnZSArPSBg8J+TiiBESVJFQ1QgUkVQT1JUUyAoJHtkaXJlY3RSZXBvcnRzLmxlbmd0aH0pXFxuYDtcbiAgICBtZXNzYWdlICs9IGDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcXG5gO1xuICAgIGlmIChkaXJlY3RSZXBvcnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGRpcmVjdFJlcG9ydHMuZm9yRWFjaCgocmVwb3J0LCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBkaXNwbGF5VGV4dCA9IHJlcG9ydC5lbWFpbCA/IGAke3JlcG9ydC5wcmVmZXJyZWROYW1lfSAoJHtyZXBvcnQuZW1haWx9KWAgOiByZXBvcnQucHJlZmVycmVkTmFtZTtcbiAgICAgICAgbWVzc2FnZSArPSBgJHtpbmRleCArIDF9LiAke2Rpc3BsYXlUZXh0fVxcbmA7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZSArPSBgTm9uZVxcbmA7XG4gICAgfVxuICAgIG1lc3NhZ2UgKz0gYFxcbmA7XG4gICAgXG4gICAgLy8gUGVlcnNcbiAgICBtZXNzYWdlICs9IGDwn5GlIFBFRVJTICgke3BlZXJzLmxlbmd0aH0pXFxuYDtcbiAgICBtZXNzYWdlICs9IGDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcXG5gO1xuICAgIGlmIChwZWVycy5sZW5ndGggPiAwKSB7XG4gICAgICBwZWVycy5mb3JFYWNoKChwZWVyLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBkaXNwbGF5VGV4dCA9IHBlZXIuZW1haWwgPyBgJHtwZWVyLnByZWZlcnJlZE5hbWV9ICgke3BlZXIuZW1haWx9KWAgOiBwZWVyLnByZWZlcnJlZE5hbWU7XG4gICAgICAgIG1lc3NhZ2UgKz0gYCR7aW5kZXggKyAxfS4gJHtkaXNwbGF5VGV4dH1cXG5gO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lc3NhZ2UgKz0gYE5vbmVcXG5gO1xuICAgIH1cbiAgICBcbiAgICBjb25zb2xlLmxvZygnREVCVUc6IEFsbCB1c2VyIGRldGFpbHMgcmV0cmlldmVkIHN1Y2Nlc3NmdWxseScpO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICBvdXRwdXQ6IG1lc3NhZ2VcbiAgICB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiBDYXVnaHQgZXJyb3IgaW4gZ2V0QWxsVXNlckRldGFpbHMgZnVuY3Rpb246JywgZXJyb3IubWVzc2FnZSk7XG4gICAgY29uc29sZS5lcnJvcignRVJST1I6IEZ1bGwgZXJyb3Igc3RhY2s6JywgZXJyb3Iuc3RhY2spO1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB8fCAnQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnJlZCB3aGlsZSBmZXRjaGluZyB1c2VyIGRldGFpbHMuJ1xuICAgIH07XG4gIH1cbn1cblxuLyoqXG4gKiBSZXRyaWV2ZXMgY29sbGFib3JhdG9ycyBmb3IgYSB1c2VyIGZpbHRlcmVkIGJ5IHJlbGF0aW9uc2hpcCB0eXBlLlxuICogVGhpcyBmdW5jdGlvbiBjYWxscyBnZXRPcmdUcmVlIGludGVybmFsbHkgYW5kIGZpbHRlcnMgcmVzdWx0cyBieSB0aGUgc3BlY2lmaWVkIHJlbGF0aW9uc2hpcC5cbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IHJlcXVlc3QgLSBUaGUgcmVxdWVzdCBvYmplY3QgY29udGFpbmluZyB1c2VyRW1haWwsIHJlbGF0aW9uc2hpcCwgYW5kIGxpbWl0XG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3Q+fSBSZXNwb25zZSB3aXRoIGZpbHRlcmVkIGNvbGxhYm9yYXRvcnNcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENvbGxhYm9yYXRvcnMocmVxdWVzdCkge1xuICBjb25zb2xlLmxvZygnREVCVUc6IGdldENvbGxhYm9yYXRvcnMgZnVuY3Rpb24gY2FsbGVkJyk7XG4gIGNvbnNvbGUubG9nKCfwn5OlIFJlY2VpdmVkIHBheWxvYWQ6JywgSlNPTi5zdHJpbmdpZnkocmVxdWVzdCwgbnVsbCwgMikpO1xuICBcbiAgdHJ5IHtcbiAgICAvLyBFeHRyYWN0IHBhcmFtZXRlcnMgZnJvbSB0aGUgcmVxdWVzdFxuICAgIGNvbnN0IHVzZXJFbWFpbCA9IHJlcXVlc3Q/LnVzZXJFbWFpbDtcbiAgICBjb25zdCByZWxhdGlvbnNoaXAgPSByZXF1ZXN0Py5yZWxhdGlvbnNoaXA/LnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgbGltaXQgPSByZXF1ZXN0Py5saW1pdDtcbiAgICBcbiAgICAvLyBWYWxpZGF0ZSByZXF1aXJlZCBwYXJhbWV0ZXJzXG4gICAgaWYgKCF1c2VyRW1haWwpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgIG1lc3NhZ2U6ICdVc2VyIGVtYWlsIGlzIHJlcXVpcmVkLidcbiAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIGlmICghcmVsYXRpb25zaGlwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICBtZXNzYWdlOiAnUmVsYXRpb25zaGlwIHR5cGUgaXMgcmVxdWlyZWQuIFZhbGlkIHZhbHVlczogbWFuYWdlciwgZGlyZWN0X3JlcG9ydHMsIHBlZXJzJ1xuICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgaWYgKGxpbWl0ID09PSB1bmRlZmluZWQgfHwgbGltaXQgPT09IG51bGwgfHwgbGltaXQgPCAxKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICBtZXNzYWdlOiAnUmVzdWx0IGxpbWl0IG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXIuJ1xuICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgLy8gVmFsaWRhdGUgcmVsYXRpb25zaGlwIHR5cGVcbiAgICBjb25zdCB2YWxpZFJlbGF0aW9uc2hpcHMgPSBbJ21hbmFnZXInLCAnZGlyZWN0X3JlcG9ydHMnLCAncGVlcnMnXTtcbiAgICBpZiAoIXZhbGlkUmVsYXRpb25zaGlwcy5pbmNsdWRlcyhyZWxhdGlvbnNoaXApKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICBtZXNzYWdlOiBgSW52YWxpZCByZWxhdGlvbnNoaXAgdHlwZTogJHtyZWxhdGlvbnNoaXB9LiBWYWxpZCB2YWx1ZXM6ICR7dmFsaWRSZWxhdGlvbnNoaXBzLmpvaW4oJywgJyl9YFxuICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgY29uc29sZS5sb2coYERFQlVHOiBHZXR0aW5nIGNvbGxhYm9yYXRvcnMgZm9yICR7dXNlckVtYWlsfSB3aXRoIHJlbGF0aW9uc2hpcDogJHtyZWxhdGlvbnNoaXB9LCBsaW1pdDogJHtsaW1pdH1gKTtcbiAgICBcbiAgICAvLyBDYWxsIGdldE9yZ1RyZWUgdG8gZ2V0IHRoZSBvcmdhbml6YXRpb25hbCBzdHJ1Y3R1cmVcbiAgICBjb25zdCBvcmdUcmVlUmVzdWx0ID0gYXdhaXQgZ2V0T3JnVHJlZShyZXF1ZXN0KTtcbiAgICBcbiAgICBpZiAob3JnVHJlZVJlc3VsdC50eXBlID09PSAnZXJyb3InKSB7XG4gICAgICByZXR1cm4gb3JnVHJlZVJlc3VsdDtcbiAgICB9XG4gICAgXG4gICAgLy8gRXh0cmFjdCBjb2xsYWJvcmF0b3JzIGJhc2VkIG9uIHJlbGF0aW9uc2hpcCB0eXBlXG4gICAgbGV0IGNvbGxhYm9yYXRvcnMgPSBbXTtcbiAgICBcbiAgICBpZiAocmVsYXRpb25zaGlwID09PSAnbWFuYWdlcicpIHtcbiAgICAgIC8vIEZvciBtYW5hZ2VyIHJlbGF0aW9uc2hpcCwgcmV0cmlldmUgdGhlIHJlcG9ydGluZyBsaW5lIGhpZXJhcmNoeVxuICAgICAgY29uc3QgYXBpVG9rZW4gPSBwcm9jZXNzLmVudi5UQUxFTlRfQVBJX1RPS0VOO1xuICAgICAgY29uc3QgYXV0aEVtYWlsID0gcHJvY2Vzcy5lbnYuVEFMRU5UX0FVVEhfRU1BSUw7XG4gICAgICBjb25zdCBjbG91ZElkID0gcmVxdWVzdD8uY29udGV4dD8uY2xvdWRJZDtcbiAgICAgIFxuICAgICAgaWYgKCFhcGlUb2tlbiB8fCAhYXV0aEVtYWlsIHx8ICFjbG91ZElkKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICBtZXNzYWdlOiAnUmVxdWlyZWQgY3JlZGVudGlhbHMgb3IgY29udGV4dCBub3QgYXZhaWxhYmxlLidcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gUXVlcnkgZm9yIHVzZXIgcG9zaXRpb24gYW5kIHJlcG9ydGluZyBsaW5lXG4gICAgICBjb25zdCBxdWVyeSA9IGBcbiAgICAgICAgcXVlcnkgcG9zaXRpb25zU2VhcmNoUXVlcnkoJGNsb3VkSWQ6IElEISwgJGZpZWxkSWRJc0luOiBbSUQhXSwgJGZpcnN0OiBJbnQgPSAxMDAsICRycWw6IFN0cmluZykge1xuICAgICAgICAgIHJhZGFyX3Bvc2l0aW9uc1NlYXJjaChcbiAgICAgICAgICAgIGZpcnN0OiAkZmlyc3RcbiAgICAgICAgICAgIGNsb3VkSWQ6ICRjbG91ZElkXG4gICAgICAgICAgICBycWw6ICRycWxcbiAgICAgICAgICApIEBvcHRJbih0bzogW1wiUmFkYXJQb3NpdGlvbnNTZWFyY2hcIl0pIHtcbiAgICAgICAgICAgIGVkZ2VzIHtcbiAgICAgICAgICAgICAgbm9kZSB7XG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgICBmaWVsZFZhbHVlcyhmaWVsZElkSXNJbjogJGZpZWxkSWRJc0luKSB7XG4gICAgICAgICAgICAgICAgICBmaWVsZElkXG4gICAgICAgICAgICAgICAgICBmaWVsZFZhbHVlIHtcbiAgICAgICAgICAgICAgICAgICAgLi4uIG9uIFJhZGFyU3RyaW5nRmllbGRWYWx1ZSB7XG4gICAgICAgICAgICAgICAgICAgICAgc3RyaW5nVmFsdWU6IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIGA7XG4gICAgICBcbiAgICAgIGNvbnN0IHZhcmlhYmxlcyA9IHtcbiAgICAgICAgY2xvdWRJZDogY2xvdWRJZCxcbiAgICAgICAgZmllbGRJZElzSW46IFtcInBvc2l0aW9uUmVwb3J0aW5nTGluZVwiXSxcbiAgICAgICAgZmlyc3Q6IDEwMCxcbiAgICAgICAgcnFsOiBgd29ya2VyRW1haWwgPSAnJHt1c2VyRW1haWx9J2BcbiAgICAgIH07XG4gICAgICBcbiAgICAgIGNvbnN0IGF1dGhIZWFkZXIgPSBjcmVhdGVCYXNpY0F1dGhIZWFkZXIoYXV0aEVtYWlsLCBhcGlUb2tlbik7XG4gICAgICBcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goVEFMRU5UX0dSQVBIUUxfRU5EUE9JTlQsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYXV0aEhlYWRlclxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzXG4gICAgICAgIH0pXG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgY29uc3QgcmVzcG9uc2VUZXh0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UocmVzcG9uc2VUZXh0KTtcbiAgICAgIFxuICAgICAgaWYgKGRhdGEuZXJyb3JzIHx8ICFkYXRhLmRhdGE/LnJhZGFyX3Bvc2l0aW9uc1NlYXJjaD8uZWRnZXMgfHwgZGF0YS5kYXRhLnJhZGFyX3Bvc2l0aW9uc1NlYXJjaC5lZGdlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgIG1lc3NhZ2U6IGBVc2VyIHdpdGggZW1haWwgJHt1c2VyRW1haWx9IG5vdCBmb3VuZCBpbiB0aGUgc3lzdGVtLmBcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gRXh0cmFjdCByZXBvcnRpbmcgbGluZVxuICAgICAgY29uc3QgcG9zaXRpb24gPSBkYXRhLmRhdGEucmFkYXJfcG9zaXRpb25zU2VhcmNoLmVkZ2VzWzBdLm5vZGU7XG4gICAgICBsZXQgcmVwb3J0aW5nTGluZVN0cmluZyA9IG51bGw7XG4gICAgICBcbiAgICAgIGlmIChwb3NpdGlvbi5maWVsZFZhbHVlcykge1xuICAgICAgICBwb3NpdGlvbi5maWVsZFZhbHVlcy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgICAgICBpZiAoZmllbGQuZmllbGRJZCA9PT0gJ3Bvc2l0aW9uUmVwb3J0aW5nTGluZScgJiYgZmllbGQuZmllbGRWYWx1ZT8uc3RyaW5nVmFsdWUpIHtcbiAgICAgICAgICAgIHJlcG9ydGluZ0xpbmVTdHJpbmcgPSBmaWVsZC5maWVsZFZhbHVlLnN0cmluZ1ZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIFBhcnNlIHJlcG9ydGluZyBsaW5lIGFuZCBmZXRjaCBtYW5hZ2VyIGRldGFpbHNcbiAgICAgIGlmIChyZXBvcnRpbmdMaW5lU3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uVVVJRHMgPSByZXBvcnRpbmdMaW5lU3RyaW5nLnNwbGl0KCcuJyk7XG4gICAgICAgIFxuICAgICAgICAvLyBSZXZlcnNlIHRoZSBhcnJheSBzbyB3ZSBzdGFydCBmcm9tIHRoZSBkaXJlY3QgbWFuYWdlciAoZmlyc3QgZWxlbWVudCBhZnRlciByZXZlcnNlKVxuICAgICAgICAvLyBhbmQgZ28gdXAgdGhlIGNoYWluIHRvIHRvcC1sZXZlbCBtYW5hZ2VyXG4gICAgICAgIGNvbnN0IHJldmVyc2VkVVVJRHMgPSBwb3NpdGlvblVVSURzLnJldmVyc2UoKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFRha2Ugb25seSB0aGUgZmlyc3QgJ2xpbWl0JyBtYW5hZ2VycyBmcm9tIHRoZSByZXZlcnNlZCBsaXN0XG4gICAgICAgIGNvbnN0IG1hbmFnZXJVVUlEcyA9IHJldmVyc2VkVVVJRHNcbiAgICAgICAgICAuZmlsdGVyKHV1aWQgPT4gdXVpZCAmJiB1dWlkLnRyaW0oKSlcbiAgICAgICAgICAuc2xpY2UoMCwgbGltaXQpXG4gICAgICAgICAgLm1hcCh1dWlkID0+ICh7IHV1aWQ6IHV1aWQudHJpbSgpIH0pKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEZldGNoIG1hbmFnZXIgZGV0YWlscyB3aXRoIHBvc2l0aW9uIHRpdGxlc1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbGxhYm9yYXRvcnMgPSBhd2FpdCBmZXRjaE1hbmFnZXJEZXRhaWxzV2l0aFBvc2l0aW9uVGl0bGUobWFuYWdlclVVSURzLCBjbG91ZElkLCBhdXRoRW1haWwsIGFwaVRva2VuKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdFUlJPUjogRXJyb3IgZmV0Y2hpbmcgbWFuYWdlciBkZXRhaWxzOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgbWVzc2FnZTogJ0ZhaWxlZCB0byByZXRyaWV2ZSBtYW5hZ2VyIGluZm9ybWF0aW9uLidcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEZvciBkaXJlY3RfcmVwb3J0cyBhbmQgcGVlcnMsIHdlIG5lZWQgdG8gcXVlcnkgdGhlIEFQSSBkaXJlY3RseVxuICAgICAgY29uc3QgYXBpVG9rZW4gPSBwcm9jZXNzLmVudi5UQUxFTlRfQVBJX1RPS0VOO1xuICAgICAgY29uc3QgYXV0aEVtYWlsID0gcHJvY2Vzcy5lbnYuVEFMRU5UX0FVVEhfRU1BSUw7XG4gICAgICBjb25zdCBjbG91ZElkID0gcmVxdWVzdD8uY29udGV4dD8uY2xvdWRJZDtcbiAgICAgIFxuICAgICAgaWYgKCFhcGlUb2tlbiB8fCAhYXV0aEVtYWlsIHx8ICFjbG91ZElkKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICBtZXNzYWdlOiAnUmVxdWlyZWQgY3JlZGVudGlhbHMgb3IgY29udGV4dCBub3QgYXZhaWxhYmxlLidcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKHJlbGF0aW9uc2hpcCA9PT0gJ2RpcmVjdF9yZXBvcnRzJykge1xuICAgICAgICBjb2xsYWJvcmF0b3JzID0gYXdhaXQgZ2V0Q29sbGFib3JhdG9yc0xpc3QodXNlckVtYWlsLCAnZGlyZWN0X3JlcG9ydHMnLCBjbG91ZElkLCBhdXRoRW1haWwsIGFwaVRva2VuKTtcbiAgICAgIH0gZWxzZSBpZiAocmVsYXRpb25zaGlwID09PSAncGVlcnMnKSB7XG4gICAgICAgIGNvbGxhYm9yYXRvcnMgPSBhd2FpdCBnZXRDb2xsYWJvcmF0b3JzTGlzdCh1c2VyRW1haWwsICdwZWVycycsIGNsb3VkSWQsIGF1dGhFbWFpbCwgYXBpVG9rZW4pO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBMaW1pdCB0aGUgcmVzdWx0c1xuICAgIGNvbnN0IGxpbWl0ZWRDb2xsYWJvcmF0b3JzID0gY29sbGFib3JhdG9ycy5zbGljZSgwLCBsaW1pdCk7XG4gICAgXG4gICAgLy8gRm9ybWF0IHRoZSBvdXRwdXRcbiAgICBpZiAobGltaXRlZENvbGxhYm9yYXRvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICBjb25zdCByZWxhdGlvbnNoaXBMYWJlbCA9IGZvcm1hdFJlbGF0aW9uc2hpcExhYmVsKHJlbGF0aW9uc2hpcCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgIG91dHB1dDogYE5vICR7cmVsYXRpb25zaGlwTGFiZWwudG9Mb3dlckNhc2UoKX0gZm91bmQuYFxuICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgbGV0IG1lc3NhZ2UgPSAnJztcbiAgICBsaW1pdGVkQ29sbGFib3JhdG9ycy5mb3JFYWNoKChjb2xsYWJvcmF0b3IsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCByZWxhdGlvbnNoaXBMYWJlbCA9IGZvcm1hdFJlbGF0aW9uc2hpcExhYmVsKHJlbGF0aW9uc2hpcCwgaW5kZXgpO1xuICAgICAgY29uc3QgbGluZSA9IGAke2NvbGxhYm9yYXRvci5uYW1lfSwgJHtjb2xsYWJvcmF0b3IucG9zaXRpb25UaXRsZSB8fCAnTi9BJ30sICR7cmVsYXRpb25zaGlwTGFiZWx9YDtcbiAgICAgIG1lc3NhZ2UgKz0gbGluZTtcbiAgICAgIGlmIChpbmRleCA8IGxpbWl0ZWRDb2xsYWJvcmF0b3JzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgbWVzc2FnZSArPSAnXFxuJztcbiAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICBjb25zb2xlLmxvZygnREVCVUc6IENvbGxhYm9yYXRvcnMgcmV0cmlldmVkIHN1Y2Nlc3NmdWxseScpO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICBvdXRwdXQ6IG1lc3NhZ2VcbiAgICB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiBDYXVnaHQgZXJyb3IgaW4gZ2V0Q29sbGFib3JhdG9ycyBmdW5jdGlvbjonLCBlcnJvci5tZXNzYWdlKTtcbiAgICBjb25zb2xlLmVycm9yKCdFUlJPUjogRnVsbCBlcnJvciBzdGFjazonLCBlcnJvci5zdGFjayk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIHx8ICdBbiB1bmV4cGVjdGVkIGVycm9yIG9jY3VycmVkIHdoaWxlIGZldGNoaW5nIGNvbGxhYm9yYXRvcnMuJ1xuICAgIH07XG4gIH1cbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gZmV0Y2ggbWFuYWdlciBkZXRhaWxzIGluY2x1ZGluZyBwb3NpdGlvbiB0aXRsZS5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gZmV0Y2hNYW5hZ2VyRGV0YWlsc1dpdGhQb3NpdGlvblRpdGxlKG1hbmFnZXJVVUlEcywgY2xvdWRJZCwgYXV0aEVtYWlsLCBhcGlUb2tlbikge1xuICBjb25zdCBtYW5hZ2VycyA9IFtdO1xuICBcbiAgZm9yIChjb25zdCBtYW5hZ2VyRGF0YSBvZiBtYW5hZ2VyVVVJRHMpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdXVpZCA9IG1hbmFnZXJEYXRhLnV1aWQ7XG4gICAgICBjb25zdCBxdWVyeSA9IGBcbiAgICAgICAgcXVlcnkgcG9zaXRpb25zU2VhcmNoUXVlcnkoJGNsb3VkSWQ6IElEISwgJGZpZWxkSWRJc0luOiBbSUQhXSwgJGZpcnN0OiBJbnQgPSAxMDAsICRycWw6IFN0cmluZykge1xuICAgICAgICAgIHJhZGFyX3Bvc2l0aW9uc1NlYXJjaChcbiAgICAgICAgICAgIGZpcnN0OiAkZmlyc3RcbiAgICAgICAgICAgIGNsb3VkSWQ6ICRjbG91ZElkXG4gICAgICAgICAgICBycWw6ICRycWxcbiAgICAgICAgICApIEBvcHRJbih0bzogW1wiUmFkYXJQb3NpdGlvbnNTZWFyY2hcIl0pIHtcbiAgICAgICAgICAgIGVkZ2VzIHtcbiAgICAgICAgICAgICAgbm9kZSB7XG4gICAgICAgICAgICAgICAgZmllbGRWYWx1ZXMoZmllbGRJZElzSW46ICRmaWVsZElkSXNJbikge1xuICAgICAgICAgICAgICAgICAgZmllbGRJZFxuICAgICAgICAgICAgICAgICAgZmllbGRWYWx1ZSB7XG4gICAgICAgICAgICAgICAgICAgIC4uLiBvbiBSYWRhclN0cmluZ0ZpZWxkVmFsdWUge1xuICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ1ZhbHVlOiB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC4uLiBvbiBSYWRhckFyaUZpZWxkVmFsdWUge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLiBvbiBSYWRhcldvcmtlciB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHByZWZlcnJlZE5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIGA7XG4gICAgICBcbiAgICAgIGNvbnN0IHZhcmlhYmxlcyA9IHtcbiAgICAgICAgY2xvdWRJZDogY2xvdWRJZCxcbiAgICAgICAgZmllbGRJZElzSW46IFtcInBvc2l0aW9uV29ya2VyXCIsIFwicG9zaXRpb25Qb3NpdGlvblRpdGxlXCJdLFxuICAgICAgICBmaXJzdDogMTAwLFxuICAgICAgICBycWw6IGBpZCA9ICcke3V1aWR9J2BcbiAgICAgIH07XG4gICAgICBcbiAgICAgIGNvbnN0IGF1dGhIZWFkZXIgPSBjcmVhdGVCYXNpY0F1dGhIZWFkZXIoYXV0aEVtYWlsLCBhcGlUb2tlbik7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFRBTEVOVF9HUkFQSFFMX0VORFBPSU5ULCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGF1dGhIZWFkZXJcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlc1xuICAgICAgICB9KVxuICAgICAgfSk7XG4gICAgICBcbiAgICAgIGNvbnN0IHJlc3BvbnNlVGV4dCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlc3BvbnNlVGV4dCk7XG4gICAgICBcbiAgICAgIGlmIChkYXRhLmRhdGE/LnJhZGFyX3Bvc2l0aW9uc1NlYXJjaD8uZWRnZXMgJiYgZGF0YS5kYXRhLnJhZGFyX3Bvc2l0aW9uc1NlYXJjaC5lZGdlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGVkZ2UgPSBkYXRhLmRhdGEucmFkYXJfcG9zaXRpb25zU2VhcmNoLmVkZ2VzWzBdO1xuICAgICAgICBsZXQgbWFuYWdlck5hbWUgPSAnVW5rbm93bic7XG4gICAgICAgIGxldCBwb3NpdGlvblRpdGxlID0gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIGlmIChlZGdlLm5vZGUuZmllbGRWYWx1ZXMpIHtcbiAgICAgICAgICBjb25zdCB3b3JrZXJGaWVsZCA9IGVkZ2Uubm9kZS5maWVsZFZhbHVlcy5maW5kKGYgPT4gZi5maWVsZElkID09PSAncG9zaXRpb25Xb3JrZXInKTtcbiAgICAgICAgICBpZiAod29ya2VyRmllbGQ/LmZpZWxkVmFsdWU/LnZhbHVlPy5wcmVmZXJyZWROYW1lKSB7XG4gICAgICAgICAgICBtYW5hZ2VyTmFtZSA9IHdvcmtlckZpZWxkLmZpZWxkVmFsdWUudmFsdWUucHJlZmVycmVkTmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgdGl0bGVGaWVsZCA9IGVkZ2Uubm9kZS5maWVsZFZhbHVlcy5maW5kKGYgPT4gZi5maWVsZElkID09PSAncG9zaXRpb25Qb3NpdGlvblRpdGxlJyk7XG4gICAgICAgICAgaWYgKHRpdGxlRmllbGQ/LmZpZWxkVmFsdWU/LnN0cmluZ1ZhbHVlKSB7XG4gICAgICAgICAgICBwb3NpdGlvblRpdGxlID0gdGl0bGVGaWVsZC5maWVsZFZhbHVlLnN0cmluZ1ZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbWFuYWdlcnMucHVzaCh7IFxuICAgICAgICAgIG5hbWU6IG1hbmFnZXJOYW1lLCBcbiAgICAgICAgICBwb3NpdGlvblRpdGxlOiBwb3NpdGlvblRpdGxlLFxuICAgICAgICAgIHJlbGF0aW9uc2hpcDogJ01hbmFnZXInXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFUlJPUjogRXJyb3IgZmV0Y2hpbmcgbWFuYWdlciBkZXRhaWxzIGZvciBVVUlEJywgbWFuYWdlckRhdGEudXVpZCwgJzonLCBlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cbiAgXG4gIHJldHVybiBtYW5hZ2Vycztcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gcmV0cmlldmUgY29sbGFib3JhdG9ycyBsaXN0IChkaXJlY3QgcmVwb3J0cyBvciBwZWVycykgd2l0aCBwb3NpdGlvbiB0aXRsZXMuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGdldENvbGxhYm9yYXRvcnNMaXN0KHVzZXJFbWFpbCwgcmVsYXRpb25zaGlwVHlwZSwgY2xvdWRJZCwgYXV0aEVtYWlsLCBhcGlUb2tlbikge1xuICBjb25zdCBjb2xsYWJvcmF0b3JzID0gW107XG4gIFxuICB0cnkge1xuICAgIC8vIEZpcnN0LCBnZXQgdGhlIHVzZXIncyBwb3NpdGlvbiBpbmZvcm1hdGlvblxuICAgIGNvbnN0IHVzZXJRdWVyeSA9IGBcbiAgICAgIHF1ZXJ5IHBvc2l0aW9uc1NlYXJjaFF1ZXJ5KCRjbG91ZElkOiBJRCEsICRmaWVsZElkSXNJbjogW0lEIV0sICRmaXJzdDogSW50ID0gMTAwLCAkcnFsOiBTdHJpbmcpIHtcbiAgICAgICAgcmFkYXJfcG9zaXRpb25zU2VhcmNoKFxuICAgICAgICAgIGZpcnN0OiAkZmlyc3RcbiAgICAgICAgICBjbG91ZElkOiAkY2xvdWRJZFxuICAgICAgICAgIHJxbDogJHJxbFxuICAgICAgICApIEBvcHRJbih0bzogW1wiUmFkYXJQb3NpdGlvbnNTZWFyY2hcIl0pIHtcbiAgICAgICAgICBlZGdlcyB7XG4gICAgICAgICAgICBub2RlIHtcbiAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgICAgZmllbGRWYWx1ZXMoZmllbGRJZElzSW46ICRmaWVsZElkSXNJbikge1xuICAgICAgICAgICAgICAgIGZpZWxkSWRcbiAgICAgICAgICAgICAgICBmaWVsZFZhbHVlIHtcbiAgICAgICAgICAgICAgICAgIC4uLiBvbiBSYWRhclN0cmluZ0ZpZWxkVmFsdWUge1xuICAgICAgICAgICAgICAgICAgICBzdHJpbmdWYWx1ZTogdmFsdWVcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgO1xuICAgIFxuICAgIGNvbnN0IHVzZXJWYXJpYWJsZXMgPSB7XG4gICAgICBjbG91ZElkOiBjbG91ZElkLFxuICAgICAgZmllbGRJZElzSW46IFtcInBvc2l0aW9uUmVwb3J0aW5nTGluZVwiXSxcbiAgICAgIGZpcnN0OiAxMDAsXG4gICAgICBycWw6IGB3b3JrZXJFbWFpbCA9ICcke3VzZXJFbWFpbH0nYFxuICAgIH07XG4gICAgXG4gICAgY29uc3QgYXV0aEhlYWRlciA9IGNyZWF0ZUJhc2ljQXV0aEhlYWRlcihhdXRoRW1haWwsIGFwaVRva2VuKTtcbiAgICBjb25zdCB1c2VyUmVzcG9uc2UgPSBhd2FpdCBmZXRjaChUQUxFTlRfR1JBUEhRTF9FTkRQT0lOVCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICdBdXRob3JpemF0aW9uJzogYXV0aEhlYWRlclxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgcXVlcnk6IHVzZXJRdWVyeSxcbiAgICAgICAgdmFyaWFibGVzOiB1c2VyVmFyaWFibGVzXG4gICAgICB9KVxuICAgIH0pO1xuICAgIFxuICAgIGNvbnN0IHVzZXJSZXNwb25zZVRleHQgPSBhd2FpdCB1c2VyUmVzcG9uc2UudGV4dCgpO1xuICAgIGNvbnN0IHVzZXJEYXRhID0gSlNPTi5wYXJzZSh1c2VyUmVzcG9uc2VUZXh0KTtcbiAgICBcbiAgICBpZiAoIXVzZXJEYXRhLmRhdGE/LnJhZGFyX3Bvc2l0aW9uc1NlYXJjaD8uZWRnZXMgfHwgdXNlckRhdGEuZGF0YS5yYWRhcl9wb3NpdGlvbnNTZWFyY2guZWRnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gY29sbGFib3JhdG9ycztcbiAgICB9XG4gICAgXG4gICAgY29uc3QgdXNlclBvc2l0aW9uID0gdXNlckRhdGEuZGF0YS5yYWRhcl9wb3NpdGlvbnNTZWFyY2guZWRnZXNbMF0ubm9kZTtcbiAgICBjb25zdCB1c2VyUG9zaXRpb25JZCA9IHVzZXJQb3NpdGlvbi5pZDtcbiAgICBjb25zdCB1c2VyUG9zaXRpb25VVUlEID0gdXNlclBvc2l0aW9uSWQuc3BsaXQoJy8nKS5wb3AoKTtcbiAgICBsZXQgcmVwb3J0aW5nTGluZVN0cmluZyA9IG51bGw7XG4gICAgXG4gICAgaWYgKHVzZXJQb3NpdGlvbi5maWVsZFZhbHVlcykge1xuICAgICAgdXNlclBvc2l0aW9uLmZpZWxkVmFsdWVzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgICBpZiAoZmllbGQuZmllbGRJZCA9PT0gJ3Bvc2l0aW9uUmVwb3J0aW5nTGluZScgJiYgZmllbGQuZmllbGRWYWx1ZT8uc3RyaW5nVmFsdWUpIHtcbiAgICAgICAgICByZXBvcnRpbmdMaW5lU3RyaW5nID0gZmllbGQuZmllbGRWYWx1ZS5zdHJpbmdWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIGxldCBzZWFyY2hSUUwgPSAnJztcbiAgICBcbiAgICBpZiAocmVsYXRpb25zaGlwVHlwZSA9PT0gJ2RpcmVjdF9yZXBvcnRzJykge1xuICAgICAgLy8gU2VhcmNoIGZvciBwZW9wbGUgd2hvc2UgbWFuYWdlciBpcyB0aGUgY3VycmVudCB1c2VyXG4gICAgICBzZWFyY2hSUUwgPSBgbWFuYWdlciA9ICcke3VzZXJQb3NpdGlvblVVSUR9J2A7XG4gICAgfSBlbHNlIGlmIChyZWxhdGlvbnNoaXBUeXBlID09PSAncGVlcnMnKSB7XG4gICAgICAvLyBTZWFyY2ggZm9yIHBlb3BsZSB3aG9zZSBtYW5hZ2VyIGlzIHRoZSBjdXJyZW50IHVzZXIncyBtYW5hZ2VyXG4gICAgICBpZiAocmVwb3J0aW5nTGluZVN0cmluZykge1xuICAgICAgICBjb25zdCBwb3NpdGlvblVVSURzID0gcmVwb3J0aW5nTGluZVN0cmluZy5zcGxpdCgnLicpO1xuICAgICAgICBjb25zdCBkaXJlY3RNYW5hZ2VyVVVJRCA9IHBvc2l0aW9uVVVJRHNbcG9zaXRpb25VVUlEcy5sZW5ndGggLSAxXTtcbiAgICAgICAgc2VhcmNoUlFMID0gYG1hbmFnZXIgPSAnJHtkaXJlY3RNYW5hZ2VyVVVJRH0nYDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjb2xsYWJvcmF0b3JzO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBRdWVyeSBmb3IgY29sbGFib3JhdG9yc1xuICAgIGNvbnN0IGNvbGxhYm9yYXRvcnNRdWVyeSA9IGBcbiAgICAgIHF1ZXJ5IHBvc2l0aW9uc1NlYXJjaFF1ZXJ5KCRjbG91ZElkOiBJRCEsICRmaWVsZElkSXNJbjogW0lEIV0sICRmaXJzdDogSW50ID0gMTAwLCAkcnFsOiBTdHJpbmcpIHtcbiAgICAgICAgcmFkYXJfcG9zaXRpb25zU2VhcmNoKFxuICAgICAgICAgIGZpcnN0OiAkZmlyc3RcbiAgICAgICAgICBjbG91ZElkOiAkY2xvdWRJZFxuICAgICAgICAgIHJxbDogJHJxbFxuICAgICAgICApIEBvcHRJbih0bzogW1wiUmFkYXJQb3NpdGlvbnNTZWFyY2hcIl0pIHtcbiAgICAgICAgICBlZGdlcyB7XG4gICAgICAgICAgICBub2RlIHtcbiAgICAgICAgICAgICAgZmllbGRWYWx1ZXMoZmllbGRJZElzSW46ICRmaWVsZElkSXNJbikge1xuICAgICAgICAgICAgICAgIGZpZWxkSWRcbiAgICAgICAgICAgICAgICBmaWVsZFZhbHVlIHtcbiAgICAgICAgICAgICAgICAgIC4uLiBvbiBSYWRhclN0cmluZ0ZpZWxkVmFsdWUge1xuICAgICAgICAgICAgICAgICAgICBzdHJpbmdWYWx1ZTogdmFsdWVcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIC4uLiBvbiBSYWRhckFyaUZpZWxkVmFsdWUge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSB7XG4gICAgICAgICAgICAgICAgICAgICAgLi4uIG9uIFJhZGFyV29ya2VyIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVmZXJyZWROYW1lXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgICBcbiAgICBjb25zdCBjb2xsYWJvcmF0b3JzVmFyaWFibGVzID0ge1xuICAgICAgY2xvdWRJZDogY2xvdWRJZCxcbiAgICAgIGZpZWxkSWRJc0luOiBbXCJ3b3JrZXJFbWFpbFwiLCBcInBvc2l0aW9uV29ya2VyXCIsIFwicG9zaXRpb25Qb3NpdGlvblRpdGxlXCJdLFxuICAgICAgZmlyc3Q6IDEwMCxcbiAgICAgIHJxbDogc2VhcmNoUlFMXG4gICAgfTtcbiAgICBcbiAgICBjb25zdCBjb2xsYWJvcmF0b3JzUmVzcG9uc2UgPSBhd2FpdCBmZXRjaChUQUxFTlRfR1JBUEhRTF9FTkRQT0lOVCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICdBdXRob3JpemF0aW9uJzogYXV0aEhlYWRlclxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgcXVlcnk6IGNvbGxhYm9yYXRvcnNRdWVyeSxcbiAgICAgICAgdmFyaWFibGVzOiBjb2xsYWJvcmF0b3JzVmFyaWFibGVzXG4gICAgICB9KVxuICAgIH0pO1xuICAgIFxuICAgIGNvbnN0IGNvbGxhYm9yYXRvcnNSZXNwb25zZVRleHQgPSBhd2FpdCBjb2xsYWJvcmF0b3JzUmVzcG9uc2UudGV4dCgpO1xuICAgIGNvbnN0IGNvbGxhYm9yYXRvcnNEYXRhID0gSlNPTi5wYXJzZShjb2xsYWJvcmF0b3JzUmVzcG9uc2VUZXh0KTtcbiAgICBcbiAgICBpZiAoY29sbGFib3JhdG9yc0RhdGEuZGF0YT8ucmFkYXJfcG9zaXRpb25zU2VhcmNoPy5lZGdlcykge1xuICAgICAgY29sbGFib3JhdG9yc0RhdGEuZGF0YS5yYWRhcl9wb3NpdGlvbnNTZWFyY2guZWRnZXMuZm9yRWFjaChlZGdlID0+IHtcbiAgICAgICAgbGV0IG5hbWUgPSAnVW5rbm93bic7XG4gICAgICAgIGxldCBwb3NpdGlvblRpdGxlID0gbnVsbDtcbiAgICAgICAgbGV0IGVtYWlsID0gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIGlmIChlZGdlLm5vZGUuZmllbGRWYWx1ZXMpIHtcbiAgICAgICAgICBjb25zdCB3b3JrZXJGaWVsZCA9IGVkZ2Uubm9kZS5maWVsZFZhbHVlcy5maW5kKGYgPT4gZi5maWVsZElkID09PSAncG9zaXRpb25Xb3JrZXInKTtcbiAgICAgICAgICBpZiAod29ya2VyRmllbGQ/LmZpZWxkVmFsdWU/LnZhbHVlPy5wcmVmZXJyZWROYW1lKSB7XG4gICAgICAgICAgICBuYW1lID0gd29ya2VyRmllbGQuZmllbGRWYWx1ZS52YWx1ZS5wcmVmZXJyZWROYW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICBjb25zdCB0aXRsZUZpZWxkID0gZWRnZS5ub2RlLmZpZWxkVmFsdWVzLmZpbmQoZiA9PiBmLmZpZWxkSWQgPT09ICdwb3NpdGlvblBvc2l0aW9uVGl0bGUnKTtcbiAgICAgICAgICBpZiAodGl0bGVGaWVsZD8uZmllbGRWYWx1ZT8uc3RyaW5nVmFsdWUpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uVGl0bGUgPSB0aXRsZUZpZWxkLmZpZWxkVmFsdWUuc3RyaW5nVmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIGNvbnN0IGVtYWlsRmllbGQgPSBlZGdlLm5vZGUuZmllbGRWYWx1ZXMuZmluZChmID0+IGYuZmllbGRJZCA9PT0gJ3dvcmtlckVtYWlsJyk7XG4gICAgICAgICAgaWYgKGVtYWlsRmllbGQ/LmZpZWxkVmFsdWU/LnN0cmluZ1ZhbHVlKSB7XG4gICAgICAgICAgICBlbWFpbCA9IGVtYWlsRmllbGQuZmllbGRWYWx1ZS5zdHJpbmdWYWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIEZvciBwZWVycywgZmlsdGVyIG91dCB0aGUgdXNlciB0aGVtc2VsdmVzXG4gICAgICAgIGlmIChyZWxhdGlvbnNoaXBUeXBlID09PSAncGVlcnMnICYmIGVtYWlsID09PSB1c2VyRW1haWwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbGxhYm9yYXRvcnMucHVzaCh7XG4gICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICBwb3NpdGlvblRpdGxlOiBwb3NpdGlvblRpdGxlLFxuICAgICAgICAgIGVtYWlsOiBlbWFpbFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGBFUlJPUjogRXJyb3IgZmV0Y2hpbmcgJHtyZWxhdGlvbnNoaXBUeXBlfTpgLCBlcnJvci5tZXNzYWdlKTtcbiAgfVxuICBcbiAgcmV0dXJuIGNvbGxhYm9yYXRvcnM7XG59XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGZvcm1hdCByZWxhdGlvbnNoaXAgbGFiZWwuXG4gKiBGb3IgbWFuYWdlcnMsIGFwcGVuZHMgK04gdG8gaW5kaWNhdGUgdGhlIGxldmVsIChNYW5hZ2VyLCBNYW5hZ2VyKzEsIE1hbmFnZXIrMiwgZXRjLilcbiAqL1xuZnVuY3Rpb24gZm9ybWF0UmVsYXRpb25zaGlwTGFiZWwocmVsYXRpb25zaGlwLCBpbmRleCA9IDApIHtcbiAgaWYgKHJlbGF0aW9uc2hpcCA9PT0gJ21hbmFnZXInKSB7XG4gICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICByZXR1cm4gJ01hbmFnZXInO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYE1hbmFnZXIrJHtpbmRleH1gO1xuICAgIH1cbiAgfVxuICBcbiAgY29uc3QgbGFiZWxzID0ge1xuICAgICdkaXJlY3RfcmVwb3J0cyc6ICdEaXJlY3QgUmVwb3J0JyxcbiAgICAncGVlcnMnOiAnUGVlcidcbiAgfTtcbiAgcmV0dXJuIGxhYmVsc1tyZWxhdGlvbnNoaXBdIHx8IHJlbGF0aW9uc2hpcDtcbn1cbiJdLCJuYW1lcyI6WyJhcGkiLCJyb3V0ZSIsIlRBTEVOVF9HUkFQSFFMX0VORFBPSU5UIiwiY3JlYXRlQmFzaWNBdXRoSGVhZGVyIiwiZW1haWwiLCJhcGlUb2tlbiIsImNyZWRlbnRpYWxzIiwiZW5jb2RlZENyZWRlbnRpYWxzIiwiQnVmZmVyIiwiZnJvbSIsInRvU3RyaW5nIiwicXVlcnlUYWxlbnRHcmFwaFFMIiwidXNlckVtYWlsIiwiY2xvdWRJZCIsImF1dGhFbWFpbCIsInF1ZXJ5IiwidmFyaWFibGVzIiwiZmllbGRJZElzSW4iLCJmaXJzdCIsInJxbCIsImNvbnNvbGUiLCJsb2ciLCJKU09OIiwic3RyaW5naWZ5IiwiYXV0aEhlYWRlciIsInJlc3BvbnNlIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsInN0YXR1cyIsInJlc3BvbnNlVGV4dCIsInRleHQiLCJzdWJzdHJpbmciLCJkYXRhIiwicGFyc2UiLCJwYXJzZUVycm9yIiwiZXJyb3JNc2ciLCJlcnJvciIsIkVycm9yIiwiZXJyb3JzIiwibWVzc2FnZSIsInN0YWNrIiwiZmV0Y2hNYW5hZ2VyRGV0YWlscyIsIm1hbmFnZXJVVUlEcyIsImxlbmd0aCIsIm1hbmFnZXJzIiwidXVpZCIsIl9kYXRhJGRhdGEiLCJtYW5hZ2VyUXVlcnkiLCJ3YXJuIiwicHVzaCIsInByZWZlcnJlZE5hbWUiLCJyYWRhcl9wb3NpdGlvbnNTZWFyY2giLCJlZGdlcyIsImVkZ2UiLCJtYW5hZ2VyTmFtZSIsIm5vZGUiLCJmaWVsZFZhbHVlcyIsIl93b3JrZXJGaWVsZCRmaWVsZFZhbCIsIndvcmtlckZpZWxkIiwiZmluZCIsImYiLCJmaWVsZElkIiwiZmllbGRWYWx1ZSIsInZhbHVlIiwiYnVpbGRPcmdUcmVlVmlzdWFsaXphdGlvbiIsInVzZXJOYW1lIiwibWFuYWdlckhpZXJhcmNoeSIsImRpcmVjdFJlcG9ydHMiLCJwZWVycyIsInRyZWUiLCJyZXZlcnNlZEhpZXJhcmNoeSIsInJldmVyc2UiLCJmb3JFYWNoIiwibWFuYWdlciIsImluZGV4IiwiaXNMYXN0IiwibGV2ZWxJbmRpY2F0b3IiLCJwcmVmaXgiLCJyZXBvcnQiLCJkaXNwbGF5VGV4dCIsInBlZXIiLCJnZXRPcmdUcmVlIiwicmVxdWVzdCIsIl9yZXF1ZXN0JGNvbnRleHQiLCJwcm9jZXNzIiwiZW52IiwiVEFMRU5UX0FQSV9UT0tFTiIsIlRBTEVOVF9BVVRIX0VNQUlMIiwidHlwZSIsImNvbnRleHQiLCJ1c2VyUG9zaXRpb25EYXRhIiwidXNlclBvc2l0aW9uIiwidXNlclBvc2l0aW9uSWQiLCJpZCIsInVzZXJQb3NpdGlvblVVSUQiLCJzcGxpdCIsInBvcCIsInJlcG9ydGluZ0xpbmVTdHJpbmciLCJmaWVsZCIsIl9maWVsZCRmaWVsZFZhbHVlIiwiX2ZpZWxkJGZpZWxkVmFsdWUyIiwic3RyaW5nVmFsdWUiLCJmaWx0ZXIiLCJ0cmltIiwibWFwIiwiZGlyZWN0UmVwb3J0c1F1ZXJ5IiwiZGlyZWN0UmVwb3J0c1ZhcmlhYmxlcyIsIl9kaXJlY3RSZXBvcnRzRGF0YSRkYSIsImRpcmVjdFJlcG9ydHNSZXNwb25zZSIsImRpcmVjdFJlcG9ydHNUZXh0IiwiZGlyZWN0UmVwb3J0c0RhdGEiLCJyZXBvcnROYW1lIiwiX3dvcmtlckZpZWxkJGZpZWxkVmFsMiIsInBvcHVsYXRlZE1hbmFnZXJIaWVyYXJjaHkiLCJtIiwicG9zaXRpb25VVUlEcyIsImRpcmVjdE1hbmFnZXJQb3NpdGlvblVVSUQiLCJwZWVyc1F1ZXJ5IiwicGVlcnNWYXJpYWJsZXMiLCJfcGVlcnNEYXRhJGRhdGEiLCJwZWVyc1Jlc3BvbnNlIiwicGVlcnNUZXh0IiwicGVlcnNEYXRhIiwicGVlck5hbWUiLCJwZWVyRW1haWwiLCJfd29ya2VyRmllbGQkZmllbGRWYWwzIiwiX2VtYWlsRmllbGQkZmllbGRWYWx1IiwiZW1haWxGaWVsZCIsIm9yZ1RyZWUiLCJvdXRwdXQiLCJlcnJvck1lc3NhZ2UiLCJnZXRQb3NpdGlvbkRldGFpbHMiLCJfcmVxdWVzdCRjb250ZXh0MiIsIl9kYXRhJGRhdGEyIiwicG9zaXRpb24iLCJwb3NpdGlvbkRldGFpbHMiLCJmaWVsZERpc3BsYXlOYW1lcyIsIl9maWVsZCRmaWVsZFZhbHVlMyIsIl9maWVsZCRmaWVsZFZhbHVlNCIsImRpc3BsYXlOYW1lIiwiT2JqZWN0IiwiZW50cmllcyIsImdldEFsbFVzZXJEZXRhaWxzIiwiX3JlcXVlc3QkY29udGV4dDMiLCJfZGF0YSRkYXRhMyIsIl9maWVsZCRmaWVsZFZhbHVlNSIsIl9maWVsZCRmaWVsZFZhbHVlNiIsIl9maWVsZCRmaWVsZFZhbHVlNyIsIl9kaXJlY3RSZXBvcnRzRGF0YSRkYTIiLCJhdXRoSGVhZGVyRFIiLCJyZXBvcnRFbWFpbCIsIl93b3JrZXJGaWVsZCRmaWVsZFZhbDQiLCJfZW1haWxGaWVsZCRmaWVsZFZhbHUyIiwiX3BlZXJzRGF0YSRkYXRhMiIsImF1dGhIZWFkZXJQZWVycyIsIl93b3JrZXJGaWVsZCRmaWVsZFZhbDUiLCJfZW1haWxGaWVsZCRmaWVsZFZhbHUzIiwibGV2ZWxMYWJlbCIsImdldENvbGxhYm9yYXRvcnMiLCJfcmVxdWVzdCRyZWxhdGlvbnNoaXAiLCJyZWxhdGlvbnNoaXAiLCJ0b0xvd2VyQ2FzZSIsImxpbWl0IiwidW5kZWZpbmVkIiwidmFsaWRSZWxhdGlvbnNoaXBzIiwiaW5jbHVkZXMiLCJqb2luIiwib3JnVHJlZVJlc3VsdCIsImNvbGxhYm9yYXRvcnMiLCJfcmVxdWVzdCRjb250ZXh0NCIsIl9kYXRhJGRhdGE0IiwiX2ZpZWxkJGZpZWxkVmFsdWU4IiwicmV2ZXJzZWRVVUlEcyIsInNsaWNlIiwiZmV0Y2hNYW5hZ2VyRGV0YWlsc1dpdGhQb3NpdGlvblRpdGxlIiwiX3JlcXVlc3QkY29udGV4dDUiLCJnZXRDb2xsYWJvcmF0b3JzTGlzdCIsImxpbWl0ZWRDb2xsYWJvcmF0b3JzIiwicmVsYXRpb25zaGlwTGFiZWwiLCJmb3JtYXRSZWxhdGlvbnNoaXBMYWJlbCIsImNvbGxhYm9yYXRvciIsImxpbmUiLCJuYW1lIiwicG9zaXRpb25UaXRsZSIsIm1hbmFnZXJEYXRhIiwiX2RhdGEkZGF0YTUiLCJfd29ya2VyRmllbGQkZmllbGRWYWw2IiwiX3RpdGxlRmllbGQkZmllbGRWYWx1IiwidGl0bGVGaWVsZCIsInJlbGF0aW9uc2hpcFR5cGUiLCJfdXNlckRhdGEkZGF0YSIsIl9jb2xsYWJvcmF0b3JzRGF0YSRkYSIsInVzZXJRdWVyeSIsInVzZXJWYXJpYWJsZXMiLCJ1c2VyUmVzcG9uc2UiLCJ1c2VyUmVzcG9uc2VUZXh0IiwidXNlckRhdGEiLCJfZmllbGQkZmllbGRWYWx1ZTkiLCJzZWFyY2hSUUwiLCJkaXJlY3RNYW5hZ2VyVVVJRCIsImNvbGxhYm9yYXRvcnNRdWVyeSIsImNvbGxhYm9yYXRvcnNWYXJpYWJsZXMiLCJjb2xsYWJvcmF0b3JzUmVzcG9uc2UiLCJjb2xsYWJvcmF0b3JzUmVzcG9uc2VUZXh0IiwiY29sbGFib3JhdG9yc0RhdGEiLCJfd29ya2VyRmllbGQkZmllbGRWYWw3IiwiX3RpdGxlRmllbGQkZmllbGRWYWx1MiIsIl9lbWFpbEZpZWxkJGZpZWxkVmFsdTQiLCJsYWJlbHMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==