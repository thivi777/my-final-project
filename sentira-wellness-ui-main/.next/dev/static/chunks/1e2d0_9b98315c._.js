(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    assign: null,
    searchParamsToUrlQuery: null,
    urlQueryToSearchParams: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    assign: function() {
        return assign;
    },
    searchParamsToUrlQuery: function() {
        return searchParamsToUrlQuery;
    },
    urlQueryToSearchParams: function() {
        return urlQueryToSearchParams;
    }
});
function searchParamsToUrlQuery(searchParams) {
    const query = {};
    for (const [key, value] of searchParams.entries()){
        const existing = query[key];
        if (typeof existing === 'undefined') {
            query[key] = value;
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            query[key] = [
                existing,
                value
            ];
        }
    }
    return query;
}
function stringifyUrlQueryParam(param) {
    if (typeof param === 'string') {
        return param;
    }
    if (typeof param === 'number' && !isNaN(param) || typeof param === 'boolean') {
        return String(param);
    } else {
        return '';
    }
}
function urlQueryToSearchParams(query) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query)){
        if (Array.isArray(value)) {
            for (const item of value){
                searchParams.append(key, stringifyUrlQueryParam(item));
            }
        } else {
            searchParams.set(key, stringifyUrlQueryParam(value));
        }
    }
    return searchParams;
}
function assign(target, ...searchParamsList) {
    for (const searchParams of searchParamsList){
        for (const key of searchParams.keys()){
            target.delete(key);
        }
        for (const [key, value] of searchParams.entries()){
            target.append(key, value);
        }
    }
    return target;
} //# sourceMappingURL=querystring.js.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// Format function modified from nodejs
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    formatUrl: null,
    formatWithValidation: null,
    urlObjectKeys: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    formatUrl: function() {
        return formatUrl;
    },
    formatWithValidation: function() {
        return formatWithValidation;
    },
    urlObjectKeys: function() {
        return urlObjectKeys;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _querystring = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)"));
const slashedProtocols = /https?|ftp|gopher|file/;
function formatUrl(urlObj) {
    let { auth, hostname } = urlObj;
    let protocol = urlObj.protocol || '';
    let pathname = urlObj.pathname || '';
    let hash = urlObj.hash || '';
    let query = urlObj.query || '';
    let host = false;
    auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ':') + '@' : '';
    if (urlObj.host) {
        host = auth + urlObj.host;
    } else if (hostname) {
        host = auth + (~hostname.indexOf(':') ? `[${hostname}]` : hostname);
        if (urlObj.port) {
            host += ':' + urlObj.port;
        }
    }
    if (query && typeof query === 'object') {
        query = String(_querystring.urlQueryToSearchParams(query));
    }
    let search = urlObj.search || query && `?${query}` || '';
    if (protocol && !protocol.endsWith(':')) protocol += ':';
    if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
        host = '//' + (host || '');
        if (pathname && pathname[0] !== '/') pathname = '/' + pathname;
    } else if (!host) {
        host = '';
    }
    if (hash && hash[0] !== '#') hash = '#' + hash;
    if (search && search[0] !== '?') search = '?' + search;
    pathname = pathname.replace(/[?#]/g, encodeURIComponent);
    search = search.replace('#', '%23');
    return `${protocol}${host}${pathname}${search}${hash}`;
}
const urlObjectKeys = [
    'auth',
    'hash',
    'host',
    'hostname',
    'href',
    'path',
    'pathname',
    'port',
    'protocol',
    'query',
    'search',
    'slashes'
];
function formatWithValidation(url) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (url !== null && typeof url === 'object') {
            Object.keys(url).forEach((key)=>{
                if (!urlObjectKeys.includes(key)) {
                    console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
                }
            });
        }
    }
    return formatUrl(url);
} //# sourceMappingURL=format-url.js.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useMergedRef", {
    enumerable: true,
    get: function() {
        return useMergedRef;
    }
});
const _react = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
function useMergedRef(refA, refB) {
    const cleanupA = (0, _react.useRef)(null);
    const cleanupB = (0, _react.useRef)(null);
    // NOTE: In theory, we could skip the wrapping if only one of the refs is non-null.
    // (this happens often if the user doesn't pass a ref to Link/Form/Image)
    // But this can cause us to leak a cleanup-ref into user code (previously via `<Link legacyBehavior>`),
    // and the user might pass that ref into ref-merging library that doesn't support cleanup refs
    // (because it hasn't been updated for React 19)
    // which can then cause things to blow up, because a cleanup-returning ref gets called with `null`.
    // So in practice, it's safer to be defensive and always wrap the ref, even on React 19.
    return (0, _react.useCallback)((current)=>{
        if (current === null) {
            const cleanupFnA = cleanupA.current;
            if (cleanupFnA) {
                cleanupA.current = null;
                cleanupFnA();
            }
            const cleanupFnB = cleanupB.current;
            if (cleanupFnB) {
                cleanupB.current = null;
                cleanupFnB();
            }
        } else {
            if (refA) {
                cleanupA.current = applyRef(refA, current);
            }
            if (refB) {
                cleanupB.current = applyRef(refB, current);
            }
        }
    }, [
        refA,
        refB
    ]);
}
function applyRef(refA, current) {
    if (typeof refA === 'function') {
        const cleanup = refA(current);
        if (typeof cleanup === 'function') {
            return cleanup;
        } else {
            return ()=>refA(null);
        }
    } else {
        refA.current = current;
        return ()=>{
            refA.current = null;
        };
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-merged-ref.js.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    DecodeError: null,
    MiddlewareNotFoundError: null,
    MissingStaticPage: null,
    NormalizeError: null,
    PageNotFoundError: null,
    SP: null,
    ST: null,
    WEB_VITALS: null,
    execOnce: null,
    getDisplayName: null,
    getLocationOrigin: null,
    getURL: null,
    isAbsoluteUrl: null,
    isResSent: null,
    loadGetInitialProps: null,
    normalizeRepeatedSlashes: null,
    stringifyError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DecodeError: function() {
        return DecodeError;
    },
    MiddlewareNotFoundError: function() {
        return MiddlewareNotFoundError;
    },
    MissingStaticPage: function() {
        return MissingStaticPage;
    },
    NormalizeError: function() {
        return NormalizeError;
    },
    PageNotFoundError: function() {
        return PageNotFoundError;
    },
    SP: function() {
        return SP;
    },
    ST: function() {
        return ST;
    },
    WEB_VITALS: function() {
        return WEB_VITALS;
    },
    execOnce: function() {
        return execOnce;
    },
    getDisplayName: function() {
        return getDisplayName;
    },
    getLocationOrigin: function() {
        return getLocationOrigin;
    },
    getURL: function() {
        return getURL;
    },
    isAbsoluteUrl: function() {
        return isAbsoluteUrl;
    },
    isResSent: function() {
        return isResSent;
    },
    loadGetInitialProps: function() {
        return loadGetInitialProps;
    },
    normalizeRepeatedSlashes: function() {
        return normalizeRepeatedSlashes;
    },
    stringifyError: function() {
        return stringifyError;
    }
});
const WEB_VITALS = [
    'CLS',
    'FCP',
    'FID',
    'INP',
    'LCP',
    'TTFB'
];
function execOnce(fn) {
    let used = false;
    let result;
    return (...args)=>{
        if (!used) {
            used = true;
            result = fn(...args);
        }
        return result;
    };
}
// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
const isAbsoluteUrl = (url)=>ABSOLUTE_URL_REGEX.test(url);
function getLocationOrigin() {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}
function getURL() {
    const { href } = window.location;
    const origin = getLocationOrigin();
    return href.substring(origin.length);
}
function getDisplayName(Component) {
    return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}
function isResSent(res) {
    return res.finished || res.headersSent;
}
function normalizeRepeatedSlashes(url) {
    const urlParts = url.split('?');
    const urlNoQuery = urlParts[0];
    return urlNoQuery // first we replace any non-encoded backslashes with forward
    // then normalize repeated forward slashes
    .replace(/\\/g, '/').replace(/\/\/+/g, '/') + (urlParts[1] ? `?${urlParts.slice(1).join('?')}` : '');
}
async function loadGetInitialProps(App, ctx) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (App.prototype?.getInitialProps) {
            const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.`;
            throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        }
    }
    // when called from _app `ctx` is nested in `ctx`
    const res = ctx.res || ctx.ctx && ctx.ctx.res;
    if (!App.getInitialProps) {
        if (ctx.ctx && ctx.Component) {
            // @ts-ignore pageProps default
            return {
                pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
            };
        }
        return {};
    }
    const props = await App.getInitialProps(ctx);
    if (res && isResSent(res)) {
        return props;
    }
    if (!props) {
        const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
        throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (Object.keys(props).length === 0 && !ctx.ctx) {
            console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps`);
        }
    }
    return props;
}
const SP = typeof performance !== 'undefined';
const ST = SP && [
    'mark',
    'measure',
    'getEntriesByName'
].every((method)=>typeof performance[method] === 'function');
class DecodeError extends Error {
}
class NormalizeError extends Error {
}
class PageNotFoundError extends Error {
    constructor(page){
        super();
        this.code = 'ENOENT';
        this.name = 'PageNotFoundError';
        this.message = `Cannot find module for page: ${page}`;
    }
}
class MissingStaticPage extends Error {
    constructor(page, message){
        super();
        this.message = `Failed to load static file for page: ${page} ${message}`;
    }
}
class MiddlewareNotFoundError extends Error {
    constructor(){
        super();
        this.code = 'ENOENT';
        this.message = `Cannot find the middleware module`;
    }
}
function stringifyError(error) {
    return JSON.stringify({
        message: error.message,
        stack: error.stack
    });
} //# sourceMappingURL=utils.js.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isLocalURL", {
    enumerable: true,
    get: function() {
        return isLocalURL;
    }
});
const _utils = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _hasbasepath = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/client/has-base-path.js [app-client] (ecmascript)");
function isLocalURL(url) {
    // prevent a hydration mismatch on href for url with anchor refs
    if (!(0, _utils.isAbsoluteUrl)(url)) return true;
    try {
        // absolute urls can be local if they are on the same origin
        const locationOrigin = (0, _utils.getLocationOrigin)();
        const resolved = new URL(url, locationOrigin);
        return resolved.origin === locationOrigin && (0, _hasbasepath.hasBasePath)(resolved.pathname);
    } catch (_) {
        return false;
    }
} //# sourceMappingURL=is-local-url.js.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "errorOnce", {
    enumerable: true,
    get: function() {
        return errorOnce;
    }
});
let errorOnce = (_)=>{};
if ("TURBOPACK compile-time truthy", 1) {
    const errors = new Set();
    errorOnce = (msg)=>{
        if (!errors.has(msg)) {
            console.error(msg);
        }
        errors.add(msg);
    };
} //# sourceMappingURL=error-once.js.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    useLinkStatus: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    /**
 * A React component that extends the HTML `<a>` element to provide
 * [prefetching](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching)
 * and client-side navigation. This is the primary way to navigate between routes in Next.js.
 *
 * @remarks
 * - Prefetching is only enabled in production.
 *
 * @see https://nextjs.org/docs/app/api-reference/components/link
 */ default: function() {
        return LinkComponent;
    },
    useLinkStatus: function() {
        return useLinkStatus;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _formaturl = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)");
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
const _usemergedref = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _addbasepath = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/client/add-base-path.js [app-client] (ecmascript)");
const _warnonce = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
const _links = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/client/components/links.js [app-client] (ecmascript)");
const _islocalurl = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)");
const _types = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/client/components/segment-cache/types.js [app-client] (ecmascript)");
const _erroronce = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)");
function isModifiedEvent(event) {
    const eventTarget = event.currentTarget;
    const target = eventTarget.getAttribute('target');
    return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
    event.nativeEvent && event.nativeEvent.which === 2;
}
function linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate) {
    if (typeof window !== 'undefined') {
        const { nodeName } = e.currentTarget;
        // anchors inside an svg have a lowercase nodeName
        const isAnchorNodeName = nodeName.toUpperCase() === 'A';
        if (isAnchorNodeName && isModifiedEvent(e) || e.currentTarget.hasAttribute('download')) {
            // ignore click for browser’s default behavior
            return;
        }
        if (!(0, _islocalurl.isLocalURL)(href)) {
            if (replace) {
                // browser default behavior does not replace the history state
                // so we need to do it manually
                e.preventDefault();
                location.replace(href);
            }
            // ignore click for browser’s default behavior
            return;
        }
        e.preventDefault();
        if (onNavigate) {
            let isDefaultPrevented = false;
            onNavigate({
                preventDefault: ()=>{
                    isDefaultPrevented = true;
                }
            });
            if (isDefaultPrevented) {
                return;
            }
        }
        const { dispatchNavigateAction } = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/client/components/app-router-instance.js [app-client] (ecmascript)");
        _react.default.startTransition(()=>{
            dispatchNavigateAction(as || href, replace ? 'replace' : 'push', scroll ?? true, linkInstanceRef.current);
        });
    }
}
function formatStringOrUrl(urlObjOrString) {
    if (typeof urlObjOrString === 'string') {
        return urlObjOrString;
    }
    return (0, _formaturl.formatUrl)(urlObjOrString);
}
function LinkComponent(props) {
    const [linkStatus, setOptimisticLinkStatus] = (0, _react.useOptimistic)(_links.IDLE_LINK_STATUS);
    let children;
    const linkInstanceRef = (0, _react.useRef)(null);
    const { href: hrefProp, as: asProp, children: childrenProp, prefetch: prefetchProp = null, passHref, replace, shallow, scroll, onClick, onMouseEnter: onMouseEnterProp, onTouchStart: onTouchStartProp, legacyBehavior = false, onNavigate, ref: forwardedRef, unstable_dynamicOnHover, ...restProps } = props;
    children = childrenProp;
    if (legacyBehavior && (typeof children === 'string' || typeof children === 'number')) {
        children = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            children: children
        });
    }
    const router = _react.default.useContext(_approutercontextsharedruntime.AppRouterContext);
    const prefetchEnabled = prefetchProp !== false;
    const fetchStrategy = prefetchProp !== false ? getFetchStrategyFromPrefetchProp(prefetchProp) : _types.FetchStrategy.PPR;
    if ("TURBOPACK compile-time truthy", 1) {
        function createPropError(args) {
            return Object.defineProperty(new Error(`Failed prop type: The prop \`${args.key}\` expects a ${args.expected} in \`<Link>\`, but got \`${args.actual}\` instead.` + (typeof window !== 'undefined' ? "\nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                value: "E319",
                enumerable: false,
                configurable: true
            });
        }
        // TypeScript trick for type-guarding:
        const requiredPropsGuard = {
            href: true
        };
        const requiredProps = Object.keys(requiredPropsGuard);
        requiredProps.forEach((key)=>{
            if (key === 'href') {
                if (props[key] == null || typeof props[key] !== 'string' && typeof props[key] !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: props[key] === null ? 'null' : typeof props[key]
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                const _ = key;
            }
        });
        // TypeScript trick for type-guarding:
        const optionalPropsGuard = {
            as: true,
            replace: true,
            scroll: true,
            shallow: true,
            passHref: true,
            prefetch: true,
            unstable_dynamicOnHover: true,
            onClick: true,
            onMouseEnter: true,
            onTouchStart: true,
            legacyBehavior: true,
            onNavigate: true
        };
        const optionalProps = Object.keys(optionalPropsGuard);
        optionalProps.forEach((key)=>{
            const valType = typeof props[key];
            if (key === 'as') {
                if (props[key] && valType !== 'string' && valType !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: valType
                    });
                }
            } else if (key === 'onClick' || key === 'onMouseEnter' || key === 'onTouchStart' || key === 'onNavigate') {
                if (props[key] && valType !== 'function') {
                    throw createPropError({
                        key,
                        expected: '`function`',
                        actual: valType
                    });
                }
            } else if (key === 'replace' || key === 'scroll' || key === 'shallow' || key === 'passHref' || key === 'legacyBehavior' || key === 'unstable_dynamicOnHover') {
                if (props[key] != null && valType !== 'boolean') {
                    throw createPropError({
                        key,
                        expected: '`boolean`',
                        actual: valType
                    });
                }
            } else if (key === 'prefetch') {
                if (props[key] != null && valType !== 'boolean' && props[key] !== 'auto') {
                    throw createPropError({
                        key,
                        expected: '`boolean | "auto"`',
                        actual: valType
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                const _ = key;
            }
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (props.locale) {
            (0, _warnonce.warnOnce)('The `locale` prop is not supported in `next/link` while using the `app` router. Read more about app router internalization: https://nextjs.org/docs/app/building-your-application/routing/internationalization');
        }
        if (!asProp) {
            let href;
            if (typeof hrefProp === 'string') {
                href = hrefProp;
            } else if (typeof hrefProp === 'object' && typeof hrefProp.pathname === 'string') {
                href = hrefProp.pathname;
            }
            if (href) {
                const hasDynamicSegment = href.split('/').some((segment)=>segment.startsWith('[') && segment.endsWith(']'));
                if (hasDynamicSegment) {
                    throw Object.defineProperty(new Error(`Dynamic href \`${href}\` found in <Link> while using the \`/app\` router, this is not supported. Read more: https://nextjs.org/docs/messages/app-dir-dynamic-href`), "__NEXT_ERROR_CODE", {
                        value: "E267",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
    }
    const { href, as } = _react.default.useMemo({
        "LinkComponent.useMemo": ()=>{
            const resolvedHref = formatStringOrUrl(hrefProp);
            return {
                href: resolvedHref,
                as: asProp ? formatStringOrUrl(asProp) : resolvedHref
            };
        }
    }["LinkComponent.useMemo"], [
        hrefProp,
        asProp
    ]);
    // This will return the first child, if multiple are provided it will throw an error
    let child;
    if (legacyBehavior) {
        if (children?.$$typeof === Symbol.for('react.lazy')) {
            throw Object.defineProperty(new Error(`\`<Link legacyBehavior>\` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's \`<a>\` tag.`), "__NEXT_ERROR_CODE", {
                value: "E863",
                enumerable: false,
                configurable: true
            });
        }
        if ("TURBOPACK compile-time truthy", 1) {
            if (onClick) {
                console.warn(`"onClick" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link`);
            }
            if (onMouseEnterProp) {
                console.warn(`"onMouseEnter" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link`);
            }
            try {
                child = _react.default.Children.only(children);
            } catch (err) {
                if (!children) {
                    throw Object.defineProperty(new Error(`No children were passed to <Link> with \`href\` of \`${hrefProp}\` but one child is required https://nextjs.org/docs/messages/link-no-children`), "__NEXT_ERROR_CODE", {
                        value: "E320",
                        enumerable: false,
                        configurable: true
                    });
                }
                throw Object.defineProperty(new Error(`Multiple children were passed to <Link> with \`href\` of \`${hrefProp}\` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children` + (typeof window !== 'undefined' ? " \nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                    value: "E266",
                    enumerable: false,
                    configurable: true
                });
            }
        } else //TURBOPACK unreachable
        ;
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            if (children?.type === 'a') {
                throw Object.defineProperty(new Error('Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.\nLearn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor'), "__NEXT_ERROR_CODE", {
                    value: "E209",
                    enumerable: false,
                    configurable: true
                });
            }
        }
    }
    const childRef = legacyBehavior ? child && typeof child === 'object' && child.ref : forwardedRef;
    // Use a callback ref to attach an IntersectionObserver to the anchor tag on
    // mount. In the future we will also use this to keep track of all the
    // currently mounted <Link> instances, e.g. so we can re-prefetch them after
    // a revalidation or refresh.
    const observeLinkVisibilityOnMount = _react.default.useCallback({
        "LinkComponent.useCallback[observeLinkVisibilityOnMount]": (element)=>{
            if (router !== null) {
                linkInstanceRef.current = (0, _links.mountLinkInstance)(element, href, router, fetchStrategy, prefetchEnabled, setOptimisticLinkStatus);
            }
            return ({
                "LinkComponent.useCallback[observeLinkVisibilityOnMount]": ()=>{
                    if (linkInstanceRef.current) {
                        (0, _links.unmountLinkForCurrentNavigation)(linkInstanceRef.current);
                        linkInstanceRef.current = null;
                    }
                    (0, _links.unmountPrefetchableInstance)(element);
                }
            })["LinkComponent.useCallback[observeLinkVisibilityOnMount]"];
        }
    }["LinkComponent.useCallback[observeLinkVisibilityOnMount]"], [
        prefetchEnabled,
        href,
        router,
        fetchStrategy,
        setOptimisticLinkStatus
    ]);
    const mergedRef = (0, _usemergedref.useMergedRef)(observeLinkVisibilityOnMount, childRef);
    const childProps = {
        ref: mergedRef,
        onClick (e) {
            if ("TURBOPACK compile-time truthy", 1) {
                if (!e) {
                    throw Object.defineProperty(new Error(`Component rendered inside next/link has to pass click event to "onClick" prop.`), "__NEXT_ERROR_CODE", {
                        value: "E312",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
            if (!legacyBehavior && typeof onClick === 'function') {
                onClick(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onClick === 'function') {
                child.props.onClick(e);
            }
            if (!router) {
                return;
            }
            if (e.defaultPrevented) {
                return;
            }
            linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate);
        },
        onMouseEnter (e) {
            if (!legacyBehavior && typeof onMouseEnterProp === 'function') {
                onMouseEnterProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onMouseEnter === 'function') {
                child.props.onMouseEnter(e);
            }
            if (!router) {
                return;
            }
            if ("TURBOPACK compile-time truthy", 1) {
                return;
            }
            //TURBOPACK unreachable
            ;
            const upgradeToDynamicPrefetch = undefined;
        },
        onTouchStart: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : function onTouchStart(e) {
            if (!legacyBehavior && typeof onTouchStartProp === 'function') {
                onTouchStartProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onTouchStart === 'function') {
                child.props.onTouchStart(e);
            }
            if (!router) {
                return;
            }
            if (!prefetchEnabled) {
                return;
            }
            const upgradeToDynamicPrefetch = unstable_dynamicOnHover === true;
            (0, _links.onNavigationIntent)(e.currentTarget, upgradeToDynamicPrefetch);
        }
    };
    // If the url is absolute, we can bypass the logic to prepend the basePath.
    if ((0, _utils.isAbsoluteUrl)(as)) {
        childProps.href = as;
    } else if (!legacyBehavior || passHref || child.type === 'a' && !('href' in child.props)) {
        childProps.href = (0, _addbasepath.addBasePath)(as);
    }
    let link;
    if (legacyBehavior) {
        if ("TURBOPACK compile-time truthy", 1) {
            (0, _erroronce.errorOnce)('`legacyBehavior` is deprecated and will be removed in a future ' + 'release. A codemod is available to upgrade your components:\n\n' + 'npx @next/codemod@latest new-link .\n\n' + 'Learn more: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#remove-a-tags-from-link-components');
        }
        link = /*#__PURE__*/ _react.default.cloneElement(child, childProps);
    } else {
        link = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            ...restProps,
            ...childProps,
            children: children
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(LinkStatusContext.Provider, {
        value: linkStatus,
        children: link
    });
}
const LinkStatusContext = /*#__PURE__*/ (0, _react.createContext)(_links.IDLE_LINK_STATUS);
const useLinkStatus = ()=>{
    return (0, _react.useContext)(LinkStatusContext);
};
function getFetchStrategyFromPrefetchProp(prefetchProp) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        return prefetchProp === null || prefetchProp === 'auto' ? _types.FetchStrategy.PPR : // (although invalid values should've been filtered out by prop validation in dev)
        _types.FetchStrategy.Full;
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=link.js.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Root",
    ()=>Slot,
    "Slot",
    ()=>Slot,
    "Slottable",
    ()=>Slottable,
    "createSlot",
    ()=>createSlot,
    "createSlottable",
    ()=>createSlottable
]);
// src/slot.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/@radix-ui/react-compose-refs/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
var REACT_LAZY_TYPE = Symbol.for("react.lazy");
var use = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[" use ".trim().toString()];
function isPromiseLike(value) {
    return typeof value === "object" && value !== null && "then" in value;
}
function isLazyComponent(element) {
    return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
}
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
    const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
    const Slot2 = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef((props, forwardedRef)=>{
        let { children, ...slotProps } = props;
        if (isLazyComponent(children) && typeof use === "function") {
            children = use(children._payload);
        }
        const childrenArray = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Children.toArray(children);
        const slottable = childrenArray.find(isSlottable);
        if (slottable) {
            const newElement = slottable.props.children;
            const newChildren = childrenArray.map((child)=>{
                if (child === slottable) {
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Children.count(newElement) > 1) return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Children.only(null);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.isValidElement(newElement) ? newElement.props.children : null;
                } else {
                    return child;
                }
            });
            return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SlotClone, {
                ...slotProps,
                ref: forwardedRef,
                children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.isValidElement(newElement) ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.cloneElement(newElement, void 0, newChildren) : null
            });
        }
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SlotClone, {
            ...slotProps,
            ref: forwardedRef,
            children
        });
    });
    Slot2.displayName = `${ownerName}.Slot`;
    return Slot2;
}
var Slot = /* @__PURE__ */ createSlot("Slot");
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
    const SlotClone = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef((props, forwardedRef)=>{
        let { children, ...slotProps } = props;
        if (isLazyComponent(children) && typeof use === "function") {
            children = use(children._payload);
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.isValidElement(children)) {
            const childrenRef = getElementRef(children);
            const props2 = mergeProps(slotProps, children.props);
            if (children.type !== __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Fragment) {
                props2.ref = forwardedRef ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["composeRefs"])(forwardedRef, childrenRef) : childrenRef;
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.cloneElement(children, props2);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Children.count(children) > 1 ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Children.only(null) : null;
    });
    SlotClone.displayName = `${ownerName}.SlotClone`;
    return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function createSlottable(ownerName) {
    const Slottable2 = ({ children })=>{
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children
        });
    };
    Slottable2.displayName = `${ownerName}.Slottable`;
    Slottable2.__radixId = SLOTTABLE_IDENTIFIER;
    return Slottable2;
}
var Slottable = /* @__PURE__ */ createSlottable("Slottable");
function isSlottable(child) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
    const overrideProps = {
        ...childProps
    };
    for(const propName in childProps){
        const slotPropValue = slotProps[propName];
        const childPropValue = childProps[propName];
        const isHandler = /^on[A-Z]/.test(propName);
        if (isHandler) {
            if (slotPropValue && childPropValue) {
                overrideProps[propName] = (...args)=>{
                    const result = childPropValue(...args);
                    slotPropValue(...args);
                    return result;
                };
            } else if (slotPropValue) {
                overrideProps[propName] = slotPropValue;
            }
        } else if (propName === "style") {
            overrideProps[propName] = {
                ...slotPropValue,
                ...childPropValue
            };
        } else if (propName === "className") {
            overrideProps[propName] = [
                slotPropValue,
                childPropValue
            ].filter(Boolean).join(" ");
        }
    }
    return {
        ...slotProps,
        ...overrideProps
    };
}
function getElementRef(element) {
    let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
    let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
        return element.ref;
    }
    getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
    mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
        return element.props.ref;
    }
    return element.props.ref || element.ref;
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/@radix-ui/react-label/node_modules/@radix-ui/react-primitive/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Primitive",
    ()=>Primitive,
    "Root",
    ()=>Root,
    "dispatchDiscreteCustomEvent",
    ()=>dispatchDiscreteCustomEvent
]);
// src/primitive.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
;
var NODES = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul"
];
var Primitive = NODES.reduce((primitive, node)=>{
    const Slot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSlot"])(`Primitive.${node}`);
    const Node = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"]((props, forwardedRef)=>{
        const { asChild, ...primitiveProps } = props;
        const Comp = asChild ? Slot : node;
        if (typeof window !== "undefined") {
            window[Symbol.for("radix-ui")] = true;
        }
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(Comp, {
            ...primitiveProps,
            ref: forwardedRef
        });
    });
    Node.displayName = `Primitive.${node}`;
    return {
        ...primitive,
        [node]: Node
    };
}, {});
function dispatchDiscreteCustomEvent(target, event) {
    if (target) __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flushSync"](()=>target.dispatchEvent(event));
}
var Root = Primitive;
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/@radix-ui/react-label/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label,
    "Root",
    ()=>Root
]);
// src/label.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/@radix-ui/react-label/node_modules/@radix-ui/react-primitive/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
"use client";
;
;
;
var NAME = "Label";
var Label = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"]((props, forwardedRef)=>{
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Primitive"].label, {
        ...props,
        ref: forwardedRef,
        onMouseDown: (event)=>{
            const target = event.target;
            if (target.closest("button, input, select, textarea")) return;
            props.onMouseDown?.(event);
            if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
        }
    });
});
Label.displayName = NAME;
var Root = Label;
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/@radix-ui/react-use-previous/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePrevious",
    ()=>usePrevious
]);
// packages/react/use-previous/src/use-previous.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
function usePrevious(value) {
    const ref = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"]({
        value,
        previous: value
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "usePrevious.useMemo": ()=>{
            if (ref.current.value !== value) {
                ref.current.previous = ref.current.value;
                ref.current.value = value;
            }
            return ref.current.previous;
        }
    }["usePrevious.useMemo"], [
        value
    ]);
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/@radix-ui/react-checkbox/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Checkbox",
    ()=>Checkbox,
    "CheckboxIndicator",
    ()=>CheckboxIndicator,
    "Indicator",
    ()=>CheckboxIndicator,
    "Root",
    ()=>Checkbox,
    "createCheckboxScope",
    ()=>createCheckboxScope,
    "unstable_BubbleInput",
    ()=>CheckboxBubbleInput,
    "unstable_CheckboxBubbleInput",
    ()=>CheckboxBubbleInput,
    "unstable_CheckboxProvider",
    ()=>CheckboxProvider,
    "unstable_CheckboxTrigger",
    ()=>CheckboxTrigger,
    "unstable_Provider",
    ()=>CheckboxProvider,
    "unstable_Trigger",
    ()=>CheckboxTrigger
]);
// src/checkbox.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/@radix-ui/react-compose-refs/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$context$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/@radix-ui/react-context/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/@radix-ui/primitive/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$controllable$2d$state$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$previous$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/@radix-ui/react-use-previous/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$size$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/@radix-ui/react-use-size/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$presence$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/@radix-ui/react-presence/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/@radix-ui/react-primitive/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext, createCheckboxScope] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$context$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContextScope"])(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
    const { __scopeCheckbox, checked: checkedProp, children, defaultChecked, disabled, form, name, onCheckedChange, required, value = "on", // @ts-expect-error
    internal_do_not_use_render } = props;
    const [checked, setChecked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$controllable$2d$state$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useControllableState"])({
        prop: checkedProp,
        defaultProp: defaultChecked ?? false,
        onChange: onCheckedChange,
        caller: CHECKBOX_NAME
    });
    const [control, setControl] = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [bubbleInput, setBubbleInput] = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const hasConsumerStoppedPropagationRef = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const isFormControl = control ? !!form || !!control.closest("form") : // We set this to true by default so that events bubble to forms without JS (SSR)
    true;
    const context = {
        checked,
        disabled,
        setChecked,
        control,
        setControl,
        name,
        form,
        value,
        hasConsumerStoppedPropagationRef,
        required,
        defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
        isFormControl,
        bubbleInput,
        setBubbleInput
    };
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(CheckboxProviderImpl, {
        scope: __scopeCheckbox,
        ...context,
        children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    });
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef)=>{
    const { control, value, disabled, checked, required, setControl, setChecked, hasConsumerStoppedPropagationRef, isFormControl, bubbleInput } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useComposedRefs"])(forwardedRef, setControl);
    const initialCheckedStateRef = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](checked);
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "CheckboxTrigger.useEffect": ()=>{
            const form = control?.form;
            if (form) {
                const reset = {
                    "CheckboxTrigger.useEffect.reset": ()=>setChecked(initialCheckedStateRef.current)
                }["CheckboxTrigger.useEffect.reset"];
                form.addEventListener("reset", reset);
                return ({
                    "CheckboxTrigger.useEffect": ()=>form.removeEventListener("reset", reset)
                })["CheckboxTrigger.useEffect"];
            }
        }
    }["CheckboxTrigger.useEffect"], [
        control,
        setChecked
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Primitive"].button, {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["composeEventHandlers"])(onKeyDown, (event)=>{
            if (event.key === "Enter") event.preventDefault();
        }),
        onClick: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["composeEventHandlers"])(onClick, (event)=>{
            setChecked((prevChecked)=>isIndeterminate(prevChecked) ? true : !prevChecked);
            if (bubbleInput && isFormControl) {
                hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
                if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
        })
    });
});
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"]((props, forwardedRef)=>{
    const { __scopeCheckbox, name, checked, defaultChecked, required, disabled, value, onCheckedChange, form, ...checkboxProps } = props;
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(CheckboxProvider, {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl })=>/* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(CheckboxTrigger, {
                        ...checkboxProps,
                        ref: forwardedRef,
                        __scopeCheckbox
                    }),
                    isFormControl && /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(CheckboxBubbleInput, {
                        __scopeCheckbox
                    })
                ]
            })
    });
});
Checkbox.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"]((props, forwardedRef)=>{
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$presence$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Presence"], {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Primitive"].span, {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: {
                pointerEvents: "none",
                ...props.style
            }
        })
    });
});
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](({ __scopeCheckbox, ...props }, forwardedRef)=>{
    const { control, hasConsumerStoppedPropagationRef, checked, defaultChecked, required, disabled, name, value, form, bubbleInput, setBubbleInput } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useComposedRefs"])(forwardedRef, setBubbleInput);
    const prevChecked = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$previous$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrevious"])(checked);
    const controlSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$use$2d$size$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSize"])(control);
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "CheckboxBubbleInput.useEffect": ()=>{
            const input = bubbleInput;
            if (!input) return;
            const inputProto = window.HTMLInputElement.prototype;
            const descriptor = Object.getOwnPropertyDescriptor(inputProto, "checked");
            const setChecked = descriptor.set;
            const bubbles = !hasConsumerStoppedPropagationRef.current;
            if (prevChecked !== checked && setChecked) {
                const event = new Event("click", {
                    bubbles
                });
                input.indeterminate = isIndeterminate(checked);
                setChecked.call(input, isIndeterminate(checked) ? false : checked);
                input.dispatchEvent(event);
            }
        }
    }["CheckboxBubbleInput.useEffect"], [
        bubbleInput,
        prevChecked,
        checked,
        hasConsumerStoppedPropagationRef
    ]);
    const defaultCheckedRef = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$primitive$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Primitive"].input, {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
            ...props.style,
            ...controlSize,
            position: "absolute",
            pointerEvents: "none",
            opacity: 0,
            margin: 0,
            // We transform because the input is absolutely positioned but we have
            // rendered it **after** the button. This pulls it back to sit on top
            // of the button.
            transform: "translateX(-100%)"
        }
    });
});
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
    return typeof value === "function";
}
function isIndeterminate(checked) {
    return checked === "indeterminate";
}
function getState(checked) {
    return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/format-error-message.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatErrorMessage",
    ()=>formatErrorMessage
]);
function formatErrorMessage(message, errorCode) {
    return errorCode ? `${message}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${errorCode}` : message;
}
;
 //# sourceMappingURL=format-error-message.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/errors.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "invariant",
    ()=>invariant,
    "warning",
    ()=>warning
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$format$2d$error$2d$message$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/format-error-message.mjs [app-client] (ecmascript)");
;
let warning = ()=>{};
let invariant = ()=>{};
if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== "undefined" && ("TURBOPACK compile-time value", "development") !== "production") {
    warning = (check, message, errorCode)=>{
        if (!check && typeof console !== "undefined") {
            console.warn((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$format$2d$error$2d$message$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatErrorMessage"])(message, errorCode));
        }
    };
    invariant = (check, message, errorCode)=>{
        if (!check) {
            throw new Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$format$2d$error$2d$message$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatErrorMessage"])(message, errorCode));
        }
    };
}
;
 //# sourceMappingURL=errors.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LayoutGroupContext",
    ()=>LayoutGroupContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
const LayoutGroupContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({});
;
 //# sourceMappingURL=LayoutGroupContext.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/context/LazyContext.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LazyContext",
    ()=>LazyContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
const LazyContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    strict: false
});
;
 //# sourceMappingURL=LazyContext.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MotionConfigContext",
    ()=>MotionConfigContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
/**
 * @public
 */ const MotionConfigContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    transformPagePoint: (p)=>p,
    isStatic: false,
    reducedMotion: "never"
});
;
 //# sourceMappingURL=MotionConfigContext.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/context/MotionContext/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MotionContext",
    ()=>MotionContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
const MotionContext = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({});
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/is-animation-controls.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isAnimationControls",
    ()=>isAnimationControls
]);
function isAnimationControls(v) {
    return v !== null && typeof v === "object" && typeof v.start === "function";
}
;
 //# sourceMappingURL=is-animation-controls.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/is-variant-label.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isVariantLabel",
    ()=>isVariantLabel
]);
/**
 * Decides if the supplied variable is variant label
 */ function isVariantLabel(v) {
    return typeof v === "string" || Array.isArray(v);
}
;
 //# sourceMappingURL=is-variant-label.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/variant-props.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "variantPriorityOrder",
    ()=>variantPriorityOrder,
    "variantProps",
    ()=>variantProps
]);
const variantPriorityOrder = [
    "animate",
    "whileInView",
    "whileFocus",
    "whileHover",
    "whileTap",
    "whileDrag",
    "exit"
];
const variantProps = [
    "initial",
    ...variantPriorityOrder
];
;
 //# sourceMappingURL=variant-props.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/is-controlling-variants.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isControllingVariants",
    ()=>isControllingVariants,
    "isVariantNode",
    ()=>isVariantNode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$animation$2d$controls$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/is-animation-controls.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$variant$2d$label$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/is-variant-label.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$variant$2d$props$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/variant-props.mjs [app-client] (ecmascript)");
;
;
;
function isControllingVariants(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$animation$2d$controls$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAnimationControls"])(props.animate) || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$variant$2d$props$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["variantProps"].some((name)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$variant$2d$label$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isVariantLabel"])(props[name]));
}
function isVariantNode(props) {
    return Boolean(isControllingVariants(props) || props.variants);
}
;
 //# sourceMappingURL=is-controlling-variants.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCurrentTreeVariants",
    ()=>getCurrentTreeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$controlling$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/is-controlling-variants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$variant$2d$label$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/is-variant-label.mjs [app-client] (ecmascript)");
;
function getCurrentTreeVariants(props, context) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$controlling$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isControllingVariants"])(props)) {
        const { initial, animate } = props;
        return {
            initial: initial === false || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$variant$2d$label$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isVariantLabel"])(initial) ? initial : undefined,
            animate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$variant$2d$label$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isVariantLabel"])(animate) ? animate : undefined
        };
    }
    return props.inherit !== false ? context : {};
}
;
 //# sourceMappingURL=utils.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/context/MotionContext/create.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCreateMotionContext",
    ()=>useCreateMotionContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/context/MotionContext/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs [app-client] (ecmascript)");
"use client";
;
;
;
function useCreateMotionContext(props) {
    const { initial, animate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentTreeVariants"])(props, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionContext"]));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useCreateMotionContext.useMemo": ()=>({
                initial,
                animate
            })
    }["useCreateMotionContext.useMemo"], [
        variantLabelsAsDependency(initial),
        variantLabelsAsDependency(animate)
    ]);
}
function variantLabelsAsDependency(prop) {
    return Array.isArray(prop) ? prop.join(" ") : prop;
}
;
 //# sourceMappingURL=create.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isMotionValue",
    ()=>isMotionValue
]);
const isMotionValue = (value)=>Boolean(value && value.getVelocity);
;
 //# sourceMappingURL=is-motion-value.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformPropOrder",
    ()=>transformPropOrder,
    "transformProps",
    ()=>transformProps
]);
/**
 * Generate a list of every possible transform key.
 */ const transformPropOrder = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY"
];
/**
 * A quick lookup for transform props.
 */ const transformProps = /*@__PURE__*/ (()=>new Set(transformPropOrder))();
;
 //# sourceMappingURL=keys-transform.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "containsCSSVariable",
    ()=>containsCSSVariable,
    "isCSSVariableName",
    ()=>isCSSVariableName,
    "isCSSVariableToken",
    ()=>isCSSVariableToken
]);
const checkStringStartsWith = (token)=>(key)=>typeof key === "string" && key.startsWith(token);
const isCSSVariableName = /*@__PURE__*/ checkStringStartsWith("--");
const startsAsVariableToken = /*@__PURE__*/ checkStringStartsWith("var(--");
const isCSSVariableToken = (value)=>{
    const startsWithToken = startsAsVariableToken(value);
    if (!startsWithToken) return false;
    // Ensure any comments are stripped from the value as this can harm performance of the regex.
    return singleCssVariableRegex.test(value.split("/*")[0].trim());
};
const singleCssVariableRegex = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
/**
 * Check if a value contains a CSS variable anywhere (e.g. inside calc()).
 * Unlike isCSSVariableToken which checks if the value IS a var() token,
 * this checks if the value CONTAINS var() somewhere in the string.
 */ function containsCSSVariable(value) {
    if (typeof value !== "string") return false;
    // Strip comments to avoid false positives
    return value.split("/*")[0].includes("var(--");
}
;
 //# sourceMappingURL=is-css-variable.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/numbers/units.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "degrees",
    ()=>degrees,
    "percent",
    ()=>percent,
    "progressPercentage",
    ()=>progressPercentage,
    "px",
    ()=>px,
    "vh",
    ()=>vh,
    "vw",
    ()=>vw
]);
/*#__NO_SIDE_EFFECTS__*/ const createUnitType = (unit)=>({
        test: (v)=>typeof v === "string" && v.endsWith(unit) && v.split(" ").length === 1,
        parse: parseFloat,
        transform: (v)=>`${v}${unit}`
    });
const degrees = /*@__PURE__*/ createUnitType("deg");
const percent = /*@__PURE__*/ createUnitType("%");
const px = /*@__PURE__*/ createUnitType("px");
const vh = /*@__PURE__*/ createUnitType("vh");
const vw = /*@__PURE__*/ createUnitType("vw");
const progressPercentage = /*@__PURE__*/ (()=>({
        ...percent,
        parse: (v)=>percent.parse(v) / 100,
        transform: (v)=>percent.transform(v * 100)
    }))();
;
 //# sourceMappingURL=units.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/projection/styles/scale-border-radius.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "correctBorderRadius",
    ()=>correctBorderRadius,
    "pixelsToPercent",
    ()=>pixelsToPercent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/numbers/units.mjs [app-client] (ecmascript)");
;
function pixelsToPercent(pixels, axis) {
    if (axis.max === axis.min) return 0;
    return pixels / (axis.max - axis.min) * 100;
}
/**
 * We always correct borderRadius as a percentage rather than pixels to reduce paints.
 * For example, if you are projecting a box that is 100px wide with a 10px borderRadius
 * into a box that is 200px wide with a 20px borderRadius, that is actually a 10%
 * borderRadius in both states. If we animate between the two in pixels that will trigger
 * a paint each time. If we animate between the two in percentage we'll avoid a paint.
 */ const correctBorderRadius = {
    correct: (latest, node)=>{
        if (!node.target) return latest;
        /**
         * If latest is a string, if it's a percentage we can return immediately as it's
         * going to be stretched appropriately. Otherwise, if it's a pixel, convert it to a number.
         */ if (typeof latest === "string") {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"].test(latest)) {
                latest = parseFloat(latest);
            } else {
                return latest;
            }
        }
        /**
         * If latest is a number, it's a pixel value. We use the current viewportBox to calculate that
         * pixel value as a percentage of each axis
         */ const x = pixelsToPercent(latest, node.target.x);
        const y = pixelsToPercent(latest, node.target.y);
        return `${x}% ${y}%`;
    }
};
;
 //# sourceMappingURL=scale-border-radius.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/clamp.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clamp",
    ()=>clamp
]);
const clamp = (min, max, v)=>{
    if (v > max) return max;
    if (v < min) return min;
    return v;
};
;
 //# sourceMappingURL=clamp.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/numbers/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "alpha",
    ()=>alpha,
    "number",
    ()=>number,
    "scale",
    ()=>scale
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$clamp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/clamp.mjs [app-client] (ecmascript)");
;
const number = {
    test: (v)=>typeof v === "number",
    parse: parseFloat,
    transform: (v)=>v
};
const alpha = {
    ...number,
    transform: (v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$clamp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(0, 1, v)
};
const scale = {
    ...number,
    default: 1
};
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/utils/sanitize.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sanitize",
    ()=>sanitize
]);
// If this number is a decimal, make it just five decimal places
// to avoid exponents
const sanitize = (v)=>Math.round(v * 100000) / 100000;
;
 //# sourceMappingURL=sanitize.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/utils/float-regex.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "floatRegex",
    ()=>floatRegex
]);
const floatRegex = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
;
 //# sourceMappingURL=float-regex.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/utils/is-nullish.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isNullish",
    ()=>isNullish
]);
function isNullish(v) {
    return v == null;
}
;
 //# sourceMappingURL=is-nullish.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/utils/single-color-regex.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "singleColorRegex",
    ()=>singleColorRegex
]);
const singleColorRegex = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;
;
 //# sourceMappingURL=single-color-regex.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/color/utils.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isColorString",
    ()=>isColorString,
    "splitColor",
    ()=>splitColor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$float$2d$regex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/utils/float-regex.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$is$2d$nullish$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/utils/is-nullish.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$single$2d$color$2d$regex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/utils/single-color-regex.mjs [app-client] (ecmascript)");
;
;
;
/**
 * Returns true if the provided string is a color, ie rgba(0,0,0,0) or #000,
 * but false if a number or multiple colors
 */ const isColorString = (type, testProp)=>(v)=>{
        return Boolean(typeof v === "string" && __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$single$2d$color$2d$regex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["singleColorRegex"].test(v) && v.startsWith(type) || testProp && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$is$2d$nullish$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNullish"])(v) && Object.prototype.hasOwnProperty.call(v, testProp));
    };
const splitColor = (aName, bName, cName)=>(v)=>{
        if (typeof v !== "string") return v;
        const [a, b, c, alpha] = v.match(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$float$2d$regex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["floatRegex"]);
        return {
            [aName]: parseFloat(a),
            [bName]: parseFloat(b),
            [cName]: parseFloat(c),
            alpha: alpha !== undefined ? parseFloat(alpha) : 1
        };
    };
;
 //# sourceMappingURL=utils.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/color/rgba.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rgbUnit",
    ()=>rgbUnit,
    "rgba",
    ()=>rgba
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$clamp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/clamp.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/numbers/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$sanitize$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/utils/sanitize.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/color/utils.mjs [app-client] (ecmascript)");
;
;
;
;
const clampRgbUnit = (v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$clamp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(0, 255, v);
const rgbUnit = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["number"],
    transform: (v)=>Math.round(clampRgbUnit(v))
};
const rgba = {
    test: /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isColorString"])("rgb", "red"),
    parse: /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splitColor"])("red", "green", "blue"),
    transform: ({ red, green, blue, alpha: alpha$1 = 1 })=>"rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$sanitize$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sanitize"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"].transform(alpha$1)) + ")"
};
;
 //# sourceMappingURL=rgba.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/color/hex.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hex",
    ()=>hex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$rgba$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/color/rgba.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/color/utils.mjs [app-client] (ecmascript)");
;
;
function parseHex(v) {
    let r = "";
    let g = "";
    let b = "";
    let a = "";
    // If we have 6 characters, ie #FF0000
    if (v.length > 5) {
        r = v.substring(1, 3);
        g = v.substring(3, 5);
        b = v.substring(5, 7);
        a = v.substring(7, 9);
    // Or we have 3 characters, ie #F00
    } else {
        r = v.substring(1, 2);
        g = v.substring(2, 3);
        b = v.substring(3, 4);
        a = v.substring(4, 5);
        r += r;
        g += g;
        b += b;
        a += a;
    }
    return {
        red: parseInt(r, 16),
        green: parseInt(g, 16),
        blue: parseInt(b, 16),
        alpha: a ? parseInt(a, 16) / 255 : 1
    };
}
const hex = {
    test: /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isColorString"])("#"),
    parse: parseHex,
    transform: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$rgba$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rgba"].transform
};
;
 //# sourceMappingURL=hex.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/color/hsla.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hsla",
    ()=>hsla
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/numbers/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/numbers/units.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$sanitize$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/utils/sanitize.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/color/utils.mjs [app-client] (ecmascript)");
;
;
;
;
const hsla = {
    test: /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isColorString"])("hsl", "hue"),
    parse: /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splitColor"])("hue", "saturation", "lightness"),
    transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 })=>{
        return "hsla(" + Math.round(hue) + ", " + __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["percent"].transform((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$sanitize$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sanitize"])(saturation)) + ", " + __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["percent"].transform((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$sanitize$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sanitize"])(lightness)) + ", " + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$sanitize$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sanitize"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"].transform(alpha$1)) + ")";
    }
};
;
 //# sourceMappingURL=hsla.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/color/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "color",
    ()=>color
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/color/hex.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hsla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/color/hsla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$rgba$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/color/rgba.mjs [app-client] (ecmascript)");
;
;
;
const color = {
    test: (v)=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$rgba$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rgba"].test(v) || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hex"].test(v) || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hsla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hsla"].test(v),
    parse: (v)=>{
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$rgba$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rgba"].test(v)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$rgba$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rgba"].parse(v);
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hsla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hsla"].test(v)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hsla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hsla"].parse(v);
        } else {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hex"].parse(v);
        }
    },
    transform: (v)=>{
        return typeof v === "string" ? v : v.hasOwnProperty("red") ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$rgba$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rgba"].transform(v) : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hsla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hsla"].transform(v);
    },
    getAnimatableNone: (v)=>{
        const parsed = color.parse(v);
        parsed.alpha = 0;
        return color.transform(parsed);
    }
};
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/utils/color-regex.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "colorRegex",
    ()=>colorRegex
]);
const colorRegex = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
;
 //# sourceMappingURL=color-regex.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/complex/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyseComplexValue",
    ()=>analyseComplexValue,
    "complex",
    ()=>complex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/color/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$color$2d$regex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/utils/color-regex.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$float$2d$regex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/utils/float-regex.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$sanitize$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/utils/sanitize.mjs [app-client] (ecmascript)");
;
;
;
;
function test(v) {
    return isNaN(v) && typeof v === "string" && (v.match(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$float$2d$regex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["floatRegex"])?.length || 0) + (v.match(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$color$2d$regex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorRegex"])?.length || 0) > 0;
}
const NUMBER_TOKEN = "number";
const COLOR_TOKEN = "color";
const VAR_TOKEN = "var";
const VAR_FUNCTION_TOKEN = "var(";
const SPLIT_TOKEN = "${}";
// this regex consists of the `singleCssVariableRegex|rgbHSLValueRegex|digitRegex`
const complexRegex = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function analyseComplexValue(value) {
    const originalValue = value.toString();
    const values = [];
    const indexes = {
        color: [],
        number: [],
        var: []
    };
    const types = [];
    let i = 0;
    const tokenised = originalValue.replace(complexRegex, (parsedValue)=>{
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].test(parsedValue)) {
            indexes.color.push(i);
            types.push(COLOR_TOKEN);
            values.push(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].parse(parsedValue));
        } else if (parsedValue.startsWith(VAR_FUNCTION_TOKEN)) {
            indexes.var.push(i);
            types.push(VAR_TOKEN);
            values.push(parsedValue);
        } else {
            indexes.number.push(i);
            types.push(NUMBER_TOKEN);
            values.push(parseFloat(parsedValue));
        }
        ++i;
        return SPLIT_TOKEN;
    });
    const split = tokenised.split(SPLIT_TOKEN);
    return {
        values,
        split,
        indexes,
        types
    };
}
function parseComplexValue(v) {
    return analyseComplexValue(v).values;
}
function buildTransformer({ split, types }) {
    const numSections = split.length;
    return (v)=>{
        let output = "";
        for(let i = 0; i < numSections; i++){
            output += split[i];
            if (v[i] !== undefined) {
                const type = types[i];
                if (type === NUMBER_TOKEN) {
                    output += (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$sanitize$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sanitize"])(v[i]);
                } else if (type === COLOR_TOKEN) {
                    output += __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].transform(v[i]);
                } else {
                    output += v[i];
                }
            }
        }
        return output;
    };
}
function createTransformer(source) {
    return buildTransformer(analyseComplexValue(source));
}
const convertNumbersToZero = (v)=>typeof v === "number" ? 0 : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].test(v) ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].getAnimatableNone(v) : v;
/**
 * Convert a parsed value to its zero equivalent, but preserve numbers
 * that act as divisors in CSS calc() expressions.
 *
 * analyseComplexValue extracts numbers from CSS strings and puts the
 * surrounding text into a `split` template array. For example:
 *   "calc(var(--gap) / 5)"  →  values: [var(--gap), 5]
 *                               split:  ["calc(", " / ", ")"]
 *
 * When building a zero-equivalent for animation, naively zeroing all
 * numbers turns the divisor into 0 → "calc(var(--gap) / 0)" → NaN.
 * We detect this by checking whether the text preceding a number
 * (split[i]) ends with "/" — the CSS calc division operator.
 */ const convertToZero = (value, splitBefore)=>{
    if (typeof value === "number") {
        return splitBefore?.trim().endsWith("/") ? value : 0;
    }
    return convertNumbersToZero(value);
};
function getAnimatableNone(v) {
    const info = analyseComplexValue(v);
    const transformer = buildTransformer(info);
    return transformer(info.values.map((value, i)=>convertToZero(value, info.split[i])));
}
const complex = {
    test,
    parse: parseComplexValue,
    createTransformer,
    getAnimatableNone
};
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/utils/mix/number.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mixNumber",
    ()=>mixNumber
]);
/*
  Value in range from progress

  Given a lower limit and an upper limit, we return the value within
  that range as expressed by progress (usually a number from 0 to 1)

  So progress = 0.5 would change

  from -------- to

  to

  from ---- to

  E.g. from = 10, to = 20, progress = 0.5 => 15

  @param [number]: Lower limit of range
  @param [number]: Upper limit of range
  @param [number]: The progress between lower and upper limits expressed 0-1
  @return [number]: Value as calculated from progress within range (not limited within range)
*/ const mixNumber = (from, to, progress)=>{
    return from + (to - from) * progress;
};
;
 //# sourceMappingURL=number.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/projection/styles/scale-box-shadow.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "correctBoxShadow",
    ()=>correctBoxShadow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/complex/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/utils/mix/number.mjs [app-client] (ecmascript)");
;
;
const correctBoxShadow = {
    correct: (latest, { treeScale, projectionDelta })=>{
        const original = latest;
        const shadow = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["complex"].parse(latest);
        // TODO: Doesn't support multiple shadows
        if (shadow.length > 5) return original;
        const template = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["complex"].createTransformer(latest);
        const offset = typeof shadow[0] !== "number" ? 1 : 0;
        // Calculate the overall context scale
        const xScale = projectionDelta.x.scale * treeScale.x;
        const yScale = projectionDelta.y.scale * treeScale.y;
        shadow[0 + offset] /= xScale;
        shadow[1 + offset] /= yScale;
        /**
         * Ideally we'd correct x and y scales individually, but because blur and
         * spread apply to both we have to take a scale average and apply that instead.
         * We could potentially improve the outcome of this by incorporating the ratio between
         * the two scales.
         */ const averageScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mixNumber"])(xScale, yScale, 0.5);
        // Blur
        if (typeof shadow[2 + offset] === "number") shadow[2 + offset] /= averageScale;
        // Spread
        if (typeof shadow[3 + offset] === "number") shadow[3 + offset] /= averageScale;
        return template(shadow);
    }
};
;
 //# sourceMappingURL=scale-box-shadow.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/projection/styles/scale-correction.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addScaleCorrector",
    ()=>addScaleCorrector,
    "scaleCorrectors",
    ()=>scaleCorrectors
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$css$2d$variable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$border$2d$radius$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/projection/styles/scale-border-radius.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$box$2d$shadow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/projection/styles/scale-box-shadow.mjs [app-client] (ecmascript)");
;
;
;
const scaleCorrectors = {
    borderRadius: {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$border$2d$radius$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["correctBorderRadius"],
        applyTo: [
            "borderTopLeftRadius",
            "borderTopRightRadius",
            "borderBottomLeftRadius",
            "borderBottomRightRadius"
        ]
    },
    borderTopLeftRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$border$2d$radius$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["correctBorderRadius"],
    borderTopRightRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$border$2d$radius$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["correctBorderRadius"],
    borderBottomLeftRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$border$2d$radius$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["correctBorderRadius"],
    borderBottomRightRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$border$2d$radius$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["correctBorderRadius"],
    boxShadow: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$box$2d$shadow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["correctBoxShadow"]
};
function addScaleCorrector(correctors) {
    for(const key in correctors){
        scaleCorrectors[key] = correctors[key];
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$css$2d$variable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCSSVariableName"])(key)) {
            scaleCorrectors[key].isCSSVariable = true;
        }
    }
}
;
 //# sourceMappingURL=scale-correction.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/is-forced-motion-value.mjs [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isForcedMotionValue",
    ()=>isForcedMotionValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$correction$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/projection/styles/scale-correction.mjs [app-client] (ecmascript)");
;
;
;
function isForcedMotionValue(key, { layout, layoutId }) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProps"].has(key) || key.startsWith("origin") || (layout || layoutId !== undefined) && (!!__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$correction$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scaleCorrectors"][key] || key === "opacity");
}
;
 //# sourceMappingURL=is-forced-motion-value.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getValueAsType",
    ()=>getValueAsType
]);
/**
 * Provided a value and a ValueType, returns the value as that value type.
 */ const getValueAsType = (value, type)=>{
    return type && typeof value === "number" ? type.transform(value) : value;
};
;
 //# sourceMappingURL=get-as-type.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/int.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "int",
    ()=>int
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/numbers/index.mjs [app-client] (ecmascript)");
;
const int = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["number"],
    transform: Math.round
};
;
 //# sourceMappingURL=int.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/maps/transform.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformValueTypes",
    ()=>transformValueTypes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/numbers/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/numbers/units.mjs [app-client] (ecmascript)");
;
;
const transformValueTypes = {
    rotate: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["degrees"],
    rotateX: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["degrees"],
    rotateY: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["degrees"],
    rotateZ: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["degrees"],
    scale: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scale"],
    scaleX: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scale"],
    scaleY: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scale"],
    scaleZ: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scale"],
    skew: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["degrees"],
    skewX: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["degrees"],
    skewY: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["degrees"],
    distance: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    translateX: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    translateY: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    translateZ: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    x: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    y: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    z: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    perspective: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    transformPerspective: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    opacity: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"],
    originX: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["progressPercentage"],
    originY: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["progressPercentage"],
    originZ: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"]
};
;
 //# sourceMappingURL=transform.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/maps/number.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "numberValueTypes",
    ()=>numberValueTypes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$int$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/int.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/numbers/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/numbers/units.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/maps/transform.mjs [app-client] (ecmascript)");
;
;
;
;
const numberValueTypes = {
    // Border props
    borderWidth: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    borderTopWidth: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    borderRightWidth: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    borderBottomWidth: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    borderLeftWidth: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    borderTopLeftRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    borderTopRightRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    borderBottomRightRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    borderBottomLeftRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    // Positioning props
    width: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    maxWidth: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    height: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    maxHeight: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    top: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    right: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    bottom: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    left: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    inset: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    insetBlock: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    insetBlockStart: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    insetBlockEnd: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    insetInline: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    insetInlineStart: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    insetInlineEnd: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    // Spacing props
    padding: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    paddingTop: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    paddingRight: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    paddingBottom: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    paddingLeft: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    paddingBlock: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    paddingBlockStart: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    paddingBlockEnd: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    paddingInline: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    paddingInlineStart: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    paddingInlineEnd: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    margin: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    marginTop: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    marginRight: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    marginBottom: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    marginLeft: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    marginBlock: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    marginBlockStart: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    marginBlockEnd: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    marginInline: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    marginInlineStart: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    marginInlineEnd: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    // Typography
    fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    // Misc
    backgroundPositionX: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    backgroundPositionY: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformValueTypes"],
    zIndex: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$int$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["int"],
    // SVG
    fillOpacity: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"],
    strokeOpacity: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"],
    numOctaves: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$int$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["int"]
};
;
 //# sourceMappingURL=number.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/html/utils/build-transform.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildTransform",
    ()=>buildTransform
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$get$2d$as$2d$type$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/maps/number.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs [app-client] (ecmascript)");
;
;
;
const translateAlias = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective"
};
const numTransforms = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformPropOrder"].length;
/**
 * Build a CSS transform style from individual x/y/scale etc properties.
 *
 * This outputs with a default order of transforms/scales/rotations, this can be customised by
 * providing a transformTemplate function.
 */ function buildTransform(latestValues, transform, transformTemplate) {
    // The transform string we're going to build into.
    let transformString = "";
    let transformIsDefault = true;
    /**
     * Loop over all possible transforms in order, adding the ones that
     * are present to the transform string.
     */ for(let i = 0; i < numTransforms; i++){
        const key = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformPropOrder"][i];
        const value = latestValues[key];
        if (value === undefined) continue;
        let valueIsDefault = true;
        if (typeof value === "number") {
            valueIsDefault = value === (key.startsWith("scale") ? 1 : 0);
        } else {
            const parsed = parseFloat(value);
            valueIsDefault = key.startsWith("scale") ? parsed === 1 : parsed === 0;
        }
        if (!valueIsDefault || transformTemplate) {
            const valueAsType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$get$2d$as$2d$type$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getValueAsType"])(value, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["numberValueTypes"][key]);
            if (!valueIsDefault) {
                transformIsDefault = false;
                const transformName = translateAlias[key] || key;
                transformString += `${transformName}(${valueAsType}) `;
            }
            if (transformTemplate) {
                transform[key] = valueAsType;
            }
        }
    }
    transformString = transformString.trim();
    // If we have a custom `transform` template, pass our transform values and
    // generated transformString to that before returning
    if (transformTemplate) {
        transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
    } else if (transformIsDefault) {
        transformString = "none";
    }
    return transformString;
}
;
 //# sourceMappingURL=build-transform.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/html/utils/build-styles.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildHTMLStyles",
    ()=>buildHTMLStyles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$get$2d$as$2d$type$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/maps/number.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$css$2d$variable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$build$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/html/utils/build-transform.mjs [app-client] (ecmascript)");
;
;
;
;
;
function buildHTMLStyles(state, latestValues, transformTemplate) {
    const { style, vars, transformOrigin } = state;
    // Track whether we encounter any transform or transformOrigin values.
    let hasTransform = false;
    let hasTransformOrigin = false;
    /**
     * Loop over all our latest animated values and decide whether to handle them
     * as a style or CSS variable.
     *
     * Transforms and transform origins are kept separately for further processing.
     */ for(const key in latestValues){
        const value = latestValues[key];
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProps"].has(key)) {
            // If this is a transform, flag to enable further transform processing
            hasTransform = true;
            continue;
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$css$2d$variable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCSSVariableName"])(key)) {
            vars[key] = value;
            continue;
        } else {
            // Convert the value to its default value type, ie 0 -> "0px"
            const valueAsType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$get$2d$as$2d$type$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getValueAsType"])(value, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["numberValueTypes"][key]);
            if (key.startsWith("origin")) {
                // If this is a transform origin, flag and enable further transform-origin processing
                hasTransformOrigin = true;
                transformOrigin[key] = valueAsType;
            } else {
                style[key] = valueAsType;
            }
        }
    }
    if (!latestValues.transform) {
        if (hasTransform || transformTemplate) {
            style.transform = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$build$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildTransform"])(latestValues, state.transform, transformTemplate);
        } else if (style.transform) {
            /**
             * If we have previously created a transform but currently don't have any,
             * reset transform style to none.
             */ style.transform = "none";
        }
    }
    /**
     * Build a transformOrigin style. Uses the same defaults as the browser for
     * undefined origins.
     */ if (hasTransformOrigin) {
        const { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin;
        style.transformOrigin = `${originX} ${originY} ${originZ}`;
    }
}
;
 //# sourceMappingURL=build-styles.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createHtmlRenderState",
    ()=>createHtmlRenderState
]);
const createHtmlRenderState = ()=>({
        style: {},
        transform: {},
        transformOrigin: {},
        vars: {}
    });
;
 //# sourceMappingURL=create-render-state.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/render/html/use-props.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "copyRawValuesOnly",
    ()=>copyRawValuesOnly,
    "useHTMLProps",
    ()=>useHTMLProps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$forced$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/is-forced-motion-value.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$build$2d$styles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/html/utils/build-styles.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs [app-client] (ecmascript)");
"use client";
;
;
;
function copyRawValuesOnly(target, source, props) {
    for(const key in source){
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(source[key]) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$forced$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isForcedMotionValue"])(key, props)) {
            target[key] = source[key];
        }
    }
}
function useInitialMotionValues({ transformTemplate }, visualState) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useInitialMotionValues.useMemo": ()=>{
            const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createHtmlRenderState"])();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$build$2d$styles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildHTMLStyles"])(state, visualState, transformTemplate);
            return Object.assign({}, state.vars, state.style);
        }
    }["useInitialMotionValues.useMemo"], [
        visualState
    ]);
}
function useStyle(props, visualState) {
    const styleProp = props.style || {};
    const style = {};
    /**
     * Copy non-Motion Values straight into style
     */ copyRawValuesOnly(style, styleProp, props);
    Object.assign(style, useInitialMotionValues(props, visualState));
    return style;
}
function useHTMLProps(props, visualState) {
    // The `any` isn't ideal but it is the type of createElement props argument
    const htmlProps = {};
    const style = useStyle(props, visualState);
    if (props.drag && props.dragListener !== false) {
        // Disable the ghost element when a user drags
        htmlProps.draggable = false;
        // Disable text selection
        style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
        // Disable scrolling on the draggable direction
        style.touchAction = props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`;
    }
    if (props.tabIndex === undefined && (props.onTap || props.onTapStart || props.whileTap)) {
        htmlProps.tabIndex = 0;
    }
    htmlProps.style = style;
    return htmlProps;
}
;
 //# sourceMappingURL=use-props.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/svg/utils/path.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildSVGPath",
    ()=>buildSVGPath
]);
const dashKeys = {
    offset: "stroke-dashoffset",
    array: "stroke-dasharray"
};
const camelKeys = {
    offset: "strokeDashoffset",
    array: "strokeDasharray"
};
/**
 * Build SVG path properties. Uses the path's measured length to convert
 * our custom pathLength, pathSpacing and pathOffset into stroke-dashoffset
 * and stroke-dasharray attributes.
 *
 * This function is mutative to reduce per-frame GC.
 *
 * Note: We use unitless values for stroke-dasharray and stroke-dashoffset
 * because Safari incorrectly scales px values when the page is zoomed.
 */ function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
    // Normalise path length by setting SVG attribute pathLength to 1
    attrs.pathLength = 1;
    // We use dash case when setting attributes directly to the DOM node and camel case
    // when defining props on a React component.
    const keys = useDashCase ? dashKeys : camelKeys;
    // Build the dash offset (unitless to avoid Safari zoom bug)
    attrs[keys.offset] = `${-offset}`;
    // Build the dash array (unitless to avoid Safari zoom bug)
    attrs[keys.array] = `${length} ${spacing}`;
}
;
 //# sourceMappingURL=path.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/svg/utils/build-attrs.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildSVGAttrs",
    ()=>buildSVGAttrs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$build$2d$styles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/html/utils/build-styles.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$path$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/svg/utils/path.mjs [app-client] (ecmascript)");
;
;
/**
 * CSS Motion Path properties that should remain as CSS styles on SVG elements.
 */ const cssMotionPathProperties = [
    "offsetDistance",
    "offsetPath",
    "offsetRotate",
    "offsetAnchor"
];
/**
 * Build SVG visual attributes, like cx and style.transform
 */ function buildSVGAttrs(state, { attrX, attrY, attrScale, pathLength, pathSpacing = 1, pathOffset = 0, // This is object creation, which we try to avoid per-frame.
...latest }, isSVGTag, transformTemplate, styleProp) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$build$2d$styles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildHTMLStyles"])(state, latest, transformTemplate);
    /**
     * For svg tags we just want to make sure viewBox is animatable and treat all the styles
     * as normal HTML tags.
     */ if (isSVGTag) {
        if (state.style.viewBox) {
            state.attrs.viewBox = state.style.viewBox;
        }
        return;
    }
    state.attrs = state.style;
    state.style = {};
    const { attrs, style } = state;
    /**
     * However, we apply transforms as CSS transforms.
     * So if we detect a transform, transformOrigin we take it from attrs and copy it into style.
     */ if (attrs.transform) {
        style.transform = attrs.transform;
        delete attrs.transform;
    }
    if (style.transform || attrs.transformOrigin) {
        style.transformOrigin = attrs.transformOrigin ?? "50% 50%";
        delete attrs.transformOrigin;
    }
    if (style.transform) {
        /**
         * SVG's element transform-origin uses its own median as a reference.
         * Therefore, transformBox becomes a fill-box
         */ style.transformBox = styleProp?.transformBox ?? "fill-box";
        delete attrs.transformBox;
    }
    for (const key of cssMotionPathProperties){
        if (attrs[key] !== undefined) {
            style[key] = attrs[key];
            delete attrs[key];
        }
    }
    // Render attrX/attrY/attrScale as attributes
    if (attrX !== undefined) attrs.x = attrX;
    if (attrY !== undefined) attrs.y = attrY;
    if (attrScale !== undefined) attrs.scale = attrScale;
    // Build SVG path if one has been defined
    if (pathLength !== undefined) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$path$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildSVGPath"])(attrs, pathLength, pathSpacing, pathOffset, false);
    }
}
;
 //# sourceMappingURL=build-attrs.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/svg/utils/is-svg-tag.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isSVGTag",
    ()=>isSVGTag
]);
const isSVGTag = (tag)=>typeof tag === "string" && tag.toLowerCase() === "svg";
;
 //# sourceMappingURL=is-svg-tag.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSvgRenderState",
    ()=>createSvgRenderState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs [app-client] (ecmascript)");
;
const createSvgRenderState = ()=>({
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createHtmlRenderState"])(),
        attrs: {}
    });
;
 //# sourceMappingURL=create-render-state.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/render/svg/use-props.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSVGProps",
    ()=>useSVGProps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$build$2d$attrs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/svg/utils/build-attrs.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$is$2d$svg$2d$tag$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/svg/utils/is-svg-tag.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$use$2d$props$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/render/html/use-props.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs [app-client] (ecmascript)");
"use client";
;
;
;
;
function useSVGProps(props, visualState, _isStatic, Component) {
    const visualProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useSVGProps.useMemo[visualProps]": ()=>{
            const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSvgRenderState"])();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$build$2d$attrs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildSVGAttrs"])(state, visualState, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$is$2d$svg$2d$tag$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSVGTag"])(Component), props.transformTemplate, props.style);
            return {
                ...state.attrs,
                style: {
                    ...state.style
                }
            };
        }
    }["useSVGProps.useMemo[visualProps]"], [
        visualState
    ]);
    if (props.style) {
        const rawStyles = {};
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$use$2d$props$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["copyRawValuesOnly"])(rawStyles, props.style, props);
        visualProps.style = {
            ...rawStyles,
            ...visualProps.style
        };
    }
    return visualProps;
}
;
 //# sourceMappingURL=use-props.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/motion/utils/valid-prop.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isValidMotionProp",
    ()=>isValidMotionProp
]);
/**
 * A list of all valid MotionProps.
 *
 * @privateRemarks
 * This doesn't throw if a `MotionProp` name is missing - it should.
 */ const validMotionProps = new Set([
    "animate",
    "exit",
    "variants",
    "initial",
    "style",
    "values",
    "variants",
    "transition",
    "transformTemplate",
    "custom",
    "inherit",
    "onBeforeLayoutMeasure",
    "onAnimationStart",
    "onAnimationComplete",
    "onUpdate",
    "onDragStart",
    "onDrag",
    "onDragEnd",
    "onMeasureDragConstraints",
    "onDirectionLock",
    "onDragTransitionEnd",
    "_dragX",
    "_dragY",
    "onHoverStart",
    "onHoverEnd",
    "onViewportEnter",
    "onViewportLeave",
    "globalTapTarget",
    "propagate",
    "ignoreStrict",
    "viewport"
]);
/**
 * Check whether a prop name is a valid `MotionProp` key.
 *
 * @param key - Name of the property to check
 * @returns `true` is key is a valid `MotionProp`.
 *
 * @public
 */ function isValidMotionProp(key) {
    return key.startsWith("while") || key.startsWith("drag") && key !== "draggable" || key.startsWith("layout") || key.startsWith("onTap") || key.startsWith("onPan") || key.startsWith("onLayout") || validMotionProps.has(key);
}
;
 //# sourceMappingURL=valid-prop.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "filterProps",
    ()=>filterProps,
    "loadExternalIsValidProp",
    ()=>loadExternalIsValidProp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$valid$2d$prop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/motion/utils/valid-prop.mjs [app-client] (ecmascript)");
;
;
let shouldForward = (key)=>!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$valid$2d$prop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidMotionProp"])(key);
function loadExternalIsValidProp(isValidProp) {
    if (typeof isValidProp !== "function") return;
    // Explicitly filter our events
    shouldForward = (key)=>key.startsWith("on") ? !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$valid$2d$prop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidMotionProp"])(key) : isValidProp(key);
}
/**
 * Emotion and Styled Components both allow users to pass through arbitrary props to their components
 * to dynamically generate CSS. They both use the `@emotion/is-prop-valid` package to determine which
 * of these should be passed to the underlying DOM node.
 *
 * However, when styling a Motion component `styled(motion.div)`, both packages pass through *all* props
 * as it's seen as an arbitrary component rather than a DOM node. Motion only allows arbitrary props
 * passed through the `custom` prop so it doesn't *need* the payload or computational overhead of
 * `@emotion/is-prop-valid`, however to fix this problem we need to use it.
 *
 * By making it an optionalDependency we can offer this functionality only in the situations where it's
 * actually required.
 */ try {
    /**
     * We attempt to import this package but require won't be defined in esm environments, in that case
     * isPropValid will have to be provided via `MotionContext`. In a 6.0.0 this should probably be removed
     * in favour of explicit injection.
     *
     * String concatenation prevents bundlers like webpack (e.g. Storybook)
     * from statically resolving this optional dependency at build time.
     */ const emotionPkg = "@emotion/is-prop-" + "valid";
    loadExternalIsValidProp((()=>{
        const e = new Error("Cannot find module '@emotion/is-prop-valid'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    })().default);
} catch  {
// We don't need to actually do anything here - the fallback is the existing `isPropValid`.
}
function filterProps(props, isDom, forwardMotionProps) {
    const filteredProps = {};
    for(const key in props){
        /**
         * values is considered a valid prop by Emotion, so if it's present
         * this will be rendered out to the DOM unless explicitly filtered.
         *
         * We check the type as it could be used with the `feColorMatrix`
         * element, which we support.
         */ if (key === "values" && typeof props.values === "object") continue;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(props[key])) continue;
        if (shouldForward(key) || forwardMotionProps === true && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$valid$2d$prop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidMotionProp"])(key) || !isDom && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$valid$2d$prop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidMotionProp"])(key) || props["draggable"] && key.startsWith("onDrag")) {
            filteredProps[key] = props[key];
        }
    }
    return filteredProps;
}
;
 //# sourceMappingURL=filter-props.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/render/svg/lowercase-elements.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "lowercaseSVGElements",
    ()=>lowercaseSVGElements
]);
/**
 * We keep these listed separately as we use the lowercase tag names as part
 * of the runtime bundle to detect SVG components
 */ const lowercaseSVGElements = [
    "animate",
    "circle",
    "defs",
    "desc",
    "ellipse",
    "g",
    "image",
    "line",
    "filter",
    "marker",
    "mask",
    "metadata",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "rect",
    "stop",
    "switch",
    "symbol",
    "svg",
    "text",
    "tspan",
    "use",
    "view"
];
;
 //# sourceMappingURL=lowercase-elements.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isSVGComponent",
    ()=>isSVGComponent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$lowercase$2d$elements$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/render/svg/lowercase-elements.mjs [app-client] (ecmascript)");
;
function isSVGComponent(Component) {
    if (/**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */ typeof Component !== "string" || /**
         * If it contains a dash, the element is a custom HTML webcomponent.
         */ Component.includes("-")) {
        return false;
    } else if (/**
     * If it's in our list of lowercase SVG tags, it's an SVG component
     */ __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$lowercase$2d$elements$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lowercaseSVGElements"].indexOf(Component) > -1 || /**
         * If it contains a capital letter, it's an SVG component
         */ /[A-Z]/u.test(Component)) {
        return true;
    }
    return false;
}
;
 //# sourceMappingURL=is-svg-component.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/render/dom/use-render.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRender",
    ()=>useRender
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$use$2d$props$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/render/html/use-props.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$use$2d$props$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/render/svg/use-props.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$filter$2d$props$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$is$2d$svg$2d$component$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
function useRender(Component, props, ref, { latestValues }, isStatic, forwardMotionProps = false, isSVG) {
    const useVisualProps = isSVG ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$is$2d$svg$2d$component$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSVGComponent"])(Component) ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$use$2d$props$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSVGProps"] : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$use$2d$props$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHTMLProps"];
    const visualProps = useVisualProps(props, latestValues, isStatic, Component);
    const filteredProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$filter$2d$props$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["filterProps"])(props, typeof Component === "string", forwardMotionProps);
    const elementProps = Component !== __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"] ? {
        ...filteredProps,
        ...visualProps,
        ref
    } : {};
    /**
     * If component has been handed a motion value as its child,
     * memoise its initial value and render that. Subsequent updates
     * will be handled by the onChange handler
     */ const { children } = props;
    const renderedChildren = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useRender.useMemo[renderedChildren]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(children) ? children.get() : children
    }["useRender.useMemo[renderedChildren]"], [
        children
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(Component, {
        ...elementProps,
        children: renderedChildren
    });
}
;
 //# sourceMappingURL=use-render.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/html/utils/scrape-motion-values.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "scrapeMotionValuesFromProps",
    ()=>scrapeMotionValuesFromProps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$forced$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/is-forced-motion-value.mjs [app-client] (ecmascript) <locals>");
;
;
function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    const style = props.style;
    const prevStyle = prevProps?.style;
    const newValues = {};
    if (!style) return newValues;
    for(const key in style){
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(style[key]) || prevStyle && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(prevStyle[key]) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$forced$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isForcedMotionValue"])(key, props) || visualElement?.getValue(key)?.liveStyle !== undefined) {
            newValues[key] = style[key];
        }
    }
    return newValues;
}
;
 //# sourceMappingURL=scrape-motion-values.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/html/utils/scrape-motion-values.mjs [app-client] (ecmascript) <export scrapeMotionValuesFromProps as scrapeHTMLMotionValuesFromProps>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "scrapeHTMLMotionValuesFromProps",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scrapeMotionValuesFromProps"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/html/utils/scrape-motion-values.mjs [app-client] (ecmascript)");
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/utils/resolve-motion-value.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveMotionValue",
    ()=>resolveMotionValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-client] (ecmascript)");
;
/**
 * If the provided value is a MotionValue, this returns the actual value, otherwise just the value itself
 */ function resolveMotionValue(value) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(value) ? value.get() : value;
}
;
 //# sourceMappingURL=resolve-motion-value.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/resolve-variants.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveVariantFromProps",
    ()=>resolveVariantFromProps
]);
function getValueState(visualElement) {
    const state = [
        {},
        {}
    ];
    visualElement?.values.forEach((value, key)=>{
        state[0][key] = value.get();
        state[1][key] = value.getVelocity();
    });
    return state;
}
function resolveVariantFromProps(props, definition, custom, visualElement) {
    /**
     * If the variant definition is a function, resolve.
     */ if (typeof definition === "function") {
        const [current, velocity] = getValueState(visualElement);
        definition = definition(custom !== undefined ? custom : props.custom, current, velocity);
    }
    /**
     * If the variant definition is a variant label, or
     * the function returned a variant label, resolve.
     */ if (typeof definition === "string") {
        definition = props.variants && props.variants[definition];
    }
    /**
     * At this point we've resolved both functions and variant labels,
     * but the resolved variant label might itself have been a function.
     * If so, resolve. This can only have returned a valid target object.
     */ if (typeof definition === "function") {
        const [current, velocity] = getValueState(visualElement);
        definition = definition(custom !== undefined ? custom : props.custom, current, velocity);
    }
    return definition;
}
;
 //# sourceMappingURL=resolve-variants.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/context/PresenceContext.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PresenceContext",
    ()=>PresenceContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
/**
 * @public
 */ const PresenceContext = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
;
 //# sourceMappingURL=PresenceContext.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/utils/use-constant.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useConstant",
    ()=>useConstant
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
/**
 * Creates a constant value over the lifecycle of a component.
 *
 * Even if `useMemo` is provided an empty array as its final argument, it doesn't offer
 * a guarantee that it won't re-run for performance reasons later on. By using `useConstant`
 * you can ensure that initialisers don't execute twice or more.
 */ function useConstant(init) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    if (ref.current === null) {
        ref.current = init();
    }
    return ref.current;
}
;
 //# sourceMappingURL=use-constant.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "makeUseVisualState",
    ()=>makeUseVisualState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$resolve$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/utils/resolve-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$controlling$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/is-controlling-variants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$animation$2d$controls$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/is-animation-controls.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$resolve$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/resolve-variants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/context/MotionContext/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$PresenceContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/context/PresenceContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$constant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/utils/use-constant.mjs [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function makeState({ scrapeMotionValuesFromProps, createRenderState }, props, context, presenceContext) {
    const state = {
        latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps),
        renderState: createRenderState()
    };
    return state;
}
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
    const values = {};
    const motionValues = scrapeMotionValues(props, {});
    for(const key in motionValues){
        values[key] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$resolve$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveMotionValue"])(motionValues[key]);
    }
    let { initial, animate } = props;
    const isControllingVariants$1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$controlling$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isControllingVariants"])(props);
    const isVariantNode$1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$controlling$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isVariantNode"])(props);
    if (context && isVariantNode$1 && !isControllingVariants$1 && props.inherit !== false) {
        if (initial === undefined) initial = context.initial;
        if (animate === undefined) animate = context.animate;
    }
    let isInitialAnimationBlocked = presenceContext ? presenceContext.initial === false : false;
    isInitialAnimationBlocked = isInitialAnimationBlocked || initial === false;
    const variantToSet = isInitialAnimationBlocked ? animate : initial;
    if (variantToSet && typeof variantToSet !== "boolean" && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$animation$2d$controls$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAnimationControls"])(variantToSet)) {
        const list = Array.isArray(variantToSet) ? variantToSet : [
            variantToSet
        ];
        for(let i = 0; i < list.length; i++){
            const resolved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$resolve$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveVariantFromProps"])(props, list[i]);
            if (resolved) {
                const { transitionEnd, transition, ...target } = resolved;
                for(const key in target){
                    let valueTarget = target[key];
                    if (Array.isArray(valueTarget)) {
                        /**
                         * Take final keyframe if the initial animation is blocked because
                         * we want to initialise at the end of that blocked animation.
                         */ const index = isInitialAnimationBlocked ? valueTarget.length - 1 : 0;
                        valueTarget = valueTarget[index];
                    }
                    if (valueTarget !== null) {
                        values[key] = valueTarget;
                    }
                }
                for(const key in transitionEnd){
                    values[key] = transitionEnd[key];
                }
            }
        }
    }
    return values;
}
const makeUseVisualState = (config)=>(props, isStatic)=>{
        const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionContext"]);
        const presenceContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$PresenceContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresenceContext"]);
        const make = ()=>makeState(config, props, context, presenceContext);
        return isStatic ? make() : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$constant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConstant"])(make);
    };
;
 //# sourceMappingURL=use-visual-state.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/render/html/use-html-visual-state.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useHTMLVisualState",
    ()=>useHTMLVisualState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__scrapeMotionValuesFromProps__as__scrapeHTMLMotionValuesFromProps$3e$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/html/utils/scrape-motion-values.mjs [app-client] (ecmascript) <export scrapeMotionValuesFromProps as scrapeHTMLMotionValuesFromProps>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$use$2d$visual$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs [app-client] (ecmascript)");
"use client";
;
;
;
const useHTMLVisualState = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$use$2d$visual$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeUseVisualState"])({
    scrapeMotionValuesFromProps: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__scrapeMotionValuesFromProps__as__scrapeHTMLMotionValuesFromProps$3e$__["scrapeHTMLMotionValuesFromProps"],
    createRenderState: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createHtmlRenderState"]
});
;
 //# sourceMappingURL=use-html-visual-state.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/svg/utils/scrape-motion-values.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "scrapeMotionValuesFromProps",
    ()=>scrapeMotionValuesFromProps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/html/utils/scrape-motion-values.mjs [app-client] (ecmascript)");
;
;
;
function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    const newValues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scrapeMotionValuesFromProps"])(props, prevProps, visualElement);
    for(const key in props){
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(props[key]) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(prevProps[key])) {
            const targetKey = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformPropOrder"].indexOf(key) !== -1 ? "attr" + key.charAt(0).toUpperCase() + key.substring(1) : key;
            newValues[targetKey] = props[key];
        }
    }
    return newValues;
}
;
 //# sourceMappingURL=scrape-motion-values.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/svg/utils/scrape-motion-values.mjs [app-client] (ecmascript) <export scrapeMotionValuesFromProps as scrapeSVGMotionValuesFromProps>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "scrapeSVGMotionValuesFromProps",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scrapeMotionValuesFromProps"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/svg/utils/scrape-motion-values.mjs [app-client] (ecmascript)");
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/render/svg/use-svg-visual-state.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSVGVisualState",
    ()=>useSVGVisualState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__scrapeMotionValuesFromProps__as__scrapeSVGMotionValuesFromProps$3e$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/svg/utils/scrape-motion-values.mjs [app-client] (ecmascript) <export scrapeMotionValuesFromProps as scrapeSVGMotionValuesFromProps>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$use$2d$visual$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs [app-client] (ecmascript)");
"use client";
;
;
;
const useSVGVisualState = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$use$2d$visual$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeUseVisualState"])({
    scrapeMotionValuesFromProps: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__scrapeMotionValuesFromProps__as__scrapeSVGMotionValuesFromProps$3e$__["scrapeSVGMotionValuesFromProps"],
    createRenderState: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSvgRenderState"]
});
;
 //# sourceMappingURL=use-svg-visual-state.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/warn-once.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hasWarned",
    ()=>hasWarned,
    "warnOnce",
    ()=>warnOnce
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$format$2d$error$2d$message$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/format-error-message.mjs [app-client] (ecmascript)");
;
const warned = new Set();
function hasWarned(message) {
    return warned.has(message);
}
function warnOnce(condition, message, errorCode) {
    if (condition || warned.has(message)) return;
    console.warn((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$format$2d$error$2d$message$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatErrorMessage"])(message, errorCode));
    warned.add(message);
}
;
 //# sourceMappingURL=warn-once.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/time-conversion.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "millisecondsToSeconds",
    ()=>millisecondsToSeconds,
    "secondsToMilliseconds",
    ()=>secondsToMilliseconds
]);
/**
 * Converts seconds to milliseconds
 *
 * @param seconds - Time in seconds.
 * @return milliseconds - Converted time in milliseconds.
 */ /*#__NO_SIDE_EFFECTS__*/ const secondsToMilliseconds = (seconds)=>seconds * 1000;
/*#__NO_SIDE_EFFECTS__*/ const millisecondsToSeconds = (milliseconds)=>milliseconds / 1000;
;
 //# sourceMappingURL=time-conversion.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/is-numerical-string.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isNumericalString",
    ()=>isNumericalString
]);
/**
 * Check if value is a numerical string, ie a string that is purely a number eg "100" or "-100.1"
 */ const isNumericalString = (v)=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(v);
;
 //# sourceMappingURL=is-numerical-string.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/is-zero-value-string.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isZeroValueString",
    ()=>isZeroValueString
]);
/**
 * Check if the value is a zero value string like "0px" or "0%"
 */ const isZeroValueString = (v)=>/^0[^.\s]+$/u.test(v);
;
 //# sourceMappingURL=is-zero-value-string.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/array.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addUniqueItem",
    ()=>addUniqueItem,
    "moveItem",
    ()=>moveItem,
    "removeItem",
    ()=>removeItem
]);
function addUniqueItem(arr, item) {
    if (arr.indexOf(item) === -1) arr.push(item);
}
function removeItem(arr, item) {
    const index = arr.indexOf(item);
    if (index > -1) arr.splice(index, 1);
}
// Adapted from array-move
function moveItem([...arr], fromIndex, toIndex) {
    const startIndex = fromIndex < 0 ? arr.length + fromIndex : fromIndex;
    if (startIndex >= 0 && startIndex < arr.length) {
        const endIndex = toIndex < 0 ? arr.length + toIndex : toIndex;
        const [item] = arr.splice(fromIndex, 1);
        arr.splice(endIndex, 0, item);
    }
    return arr;
}
;
 //# sourceMappingURL=array.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/subscription-manager.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SubscriptionManager",
    ()=>SubscriptionManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$array$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/array.mjs [app-client] (ecmascript)");
;
class SubscriptionManager {
    constructor(){
        this.subscriptions = [];
    }
    add(handler) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$array$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addUniqueItem"])(this.subscriptions, handler);
        return ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$array$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeItem"])(this.subscriptions, handler);
    }
    notify(a, b, c) {
        const numSubscriptions = this.subscriptions.length;
        if (!numSubscriptions) return;
        if (numSubscriptions === 1) {
            /**
             * If there's only a single handler we can just call it without invoking a loop.
             */ this.subscriptions[0](a, b, c);
        } else {
            for(let i = 0; i < numSubscriptions; i++){
                /**
                 * Check whether the handler exists before firing as it's possible
                 * the subscriptions were modified during this loop running.
                 */ const handler = this.subscriptions[i];
                handler && handler(a, b, c);
            }
        }
    }
    getSize() {
        return this.subscriptions.length;
    }
    clear() {
        this.subscriptions.length = 0;
    }
}
;
 //# sourceMappingURL=subscription-manager.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fillWildcards",
    ()=>fillWildcards
]);
function fillWildcards(keyframes) {
    for(let i = 1; i < keyframes.length; i++){
        keyframes[i] ?? (keyframes[i] = keyframes[i - 1]);
    }
}
;
 //# sourceMappingURL=fill-wildcards.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultTransformValue",
    ()=>defaultTransformValue,
    "parseValueFromTransform",
    ()=>parseValueFromTransform,
    "readTransformValue",
    ()=>readTransformValue
]);
const radToDeg = (rad)=>rad * 180 / Math.PI;
const rotate = (v)=>{
    const angle = radToDeg(Math.atan2(v[1], v[0]));
    return rebaseAngle(angle);
};
const matrix2dParsers = {
    x: 4,
    y: 5,
    translateX: 4,
    translateY: 5,
    scaleX: 0,
    scaleY: 3,
    scale: (v)=>(Math.abs(v[0]) + Math.abs(v[3])) / 2,
    rotate,
    rotateZ: rotate,
    skewX: (v)=>radToDeg(Math.atan(v[1])),
    skewY: (v)=>radToDeg(Math.atan(v[2])),
    skew: (v)=>(Math.abs(v[1]) + Math.abs(v[2])) / 2
};
const rebaseAngle = (angle)=>{
    angle = angle % 360;
    if (angle < 0) angle += 360;
    return angle;
};
const rotateZ = rotate;
const scaleX = (v)=>Math.sqrt(v[0] * v[0] + v[1] * v[1]);
const scaleY = (v)=>Math.sqrt(v[4] * v[4] + v[5] * v[5]);
const matrix3dParsers = {
    x: 12,
    y: 13,
    z: 14,
    translateX: 12,
    translateY: 13,
    translateZ: 14,
    scaleX,
    scaleY,
    scale: (v)=>(scaleX(v) + scaleY(v)) / 2,
    rotateX: (v)=>rebaseAngle(radToDeg(Math.atan2(v[6], v[5]))),
    rotateY: (v)=>rebaseAngle(radToDeg(Math.atan2(-v[2], v[0]))),
    rotateZ,
    rotate: rotateZ,
    skewX: (v)=>radToDeg(Math.atan(v[4])),
    skewY: (v)=>radToDeg(Math.atan(v[1])),
    skew: (v)=>(Math.abs(v[1]) + Math.abs(v[4])) / 2
};
function defaultTransformValue(name) {
    return name.includes("scale") ? 1 : 0;
}
function parseValueFromTransform(transform, name) {
    if (!transform || transform === "none") {
        return defaultTransformValue(name);
    }
    const matrix3dMatch = transform.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
    let parsers;
    let match;
    if (matrix3dMatch) {
        parsers = matrix3dParsers;
        match = matrix3dMatch;
    } else {
        const matrix2dMatch = transform.match(/^matrix\(([-\d.e\s,]+)\)$/u);
        parsers = matrix2dParsers;
        match = matrix2dMatch;
    }
    if (!match) {
        return defaultTransformValue(name);
    }
    const valueParser = parsers[name];
    const values = match[1].split(",").map(convertTransformToNumber);
    return typeof valueParser === "function" ? valueParser(values) : values[valueParser];
}
const readTransformValue = (instance, name)=>{
    const { transform = "none" } = getComputedStyle(instance);
    return parseValueFromTransform(transform, name);
};
function convertTransformToNumber(value) {
    return parseFloat(value.trim());
}
;
 //# sourceMappingURL=parse-transform.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/keyframes/utils/unit-conversion.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isNumOrPxType",
    ()=>isNumOrPxType,
    "positionalValues",
    ()=>positionalValues,
    "removeNonTranslationalTransform",
    ()=>removeNonTranslationalTransform
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$parse$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/numbers/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/numbers/units.mjs [app-client] (ecmascript)");
;
;
;
;
const isNumOrPxType = (v)=>v === __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["number"] || v === __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"];
const transformKeys = new Set([
    "x",
    "y",
    "z"
]);
const nonTranslationalTransformKeys = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformPropOrder"].filter((key)=>!transformKeys.has(key));
function removeNonTranslationalTransform(visualElement) {
    const removedTransforms = [];
    nonTranslationalTransformKeys.forEach((key)=>{
        const value = visualElement.getValue(key);
        if (value !== undefined) {
            removedTransforms.push([
                key,
                value.get()
            ]);
            value.set(key.startsWith("scale") ? 1 : 0);
        }
    });
    return removedTransforms;
}
const positionalValues = {
    // Dimensions
    width: ({ x }, { paddingLeft = "0", paddingRight = "0", boxSizing })=>{
        const width = x.max - x.min;
        return boxSizing === "border-box" ? width : width - parseFloat(paddingLeft) - parseFloat(paddingRight);
    },
    height: ({ y }, { paddingTop = "0", paddingBottom = "0", boxSizing })=>{
        const height = y.max - y.min;
        return boxSizing === "border-box" ? height : height - parseFloat(paddingTop) - parseFloat(paddingBottom);
    },
    top: (_bbox, { top })=>parseFloat(top),
    left: (_bbox, { left })=>parseFloat(left),
    bottom: ({ y }, { top })=>parseFloat(top) + (y.max - y.min),
    right: ({ x }, { left })=>parseFloat(left) + (x.max - x.min),
    // Transform
    x: (_bbox, { transform })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$parse$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseValueFromTransform"])(transform, "x"),
    y: (_bbox, { transform })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$parse$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseValueFromTransform"])(transform, "y")
};
// Alias translate longform names
positionalValues.translateX = positionalValues.x;
positionalValues.translateY = positionalValues.y;
;
 //# sourceMappingURL=unit-conversion.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/noop.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "noop",
    ()=>noop
]);
/*#__NO_SIDE_EFFECTS__*/ const noop = (any)=>any;
;
 //# sourceMappingURL=noop.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/global-config.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MotionGlobalConfig",
    ()=>MotionGlobalConfig
]);
const MotionGlobalConfig = {};
;
 //# sourceMappingURL=global-config.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/frameloop/order.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "stepsOrder",
    ()=>stepsOrder
]);
const stepsOrder = [
    "setup",
    "read",
    "resolveKeyframes",
    "preUpdate",
    "update",
    "preRender",
    "render",
    "postRender"
];
;
 //# sourceMappingURL=order.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/stats/buffer.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "statsBuffer",
    ()=>statsBuffer
]);
const statsBuffer = {
    value: null,
    addProjectionMetrics: null
};
;
 //# sourceMappingURL=buffer.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/frameloop/render-step.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createRenderStep",
    ()=>createRenderStep
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$stats$2f$buffer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/stats/buffer.mjs [app-client] (ecmascript)");
;
function createRenderStep(runNextFrame, stepName) {
    /**
     * We create and reuse two queues, one to queue jobs for the current frame
     * and one for the next. We reuse to avoid triggering GC after x frames.
     */ let thisFrame = new Set();
    let nextFrame = new Set();
    /**
     * Track whether we're currently processing jobs in this step. This way
     * we can decide whether to schedule new jobs for this frame or next.
     */ let isProcessing = false;
    let flushNextFrame = false;
    /**
     * A set of processes which were marked keepAlive when scheduled.
     */ const toKeepAlive = new WeakSet();
    let latestFrameData = {
        delta: 0.0,
        timestamp: 0.0,
        isProcessing: false
    };
    let numCalls = 0;
    function triggerCallback(callback) {
        if (toKeepAlive.has(callback)) {
            step.schedule(callback);
            runNextFrame();
        }
        numCalls++;
        callback(latestFrameData);
    }
    const step = {
        /**
         * Schedule a process to run on the next frame.
         */ schedule: (callback, keepAlive = false, immediate = false)=>{
            const addToCurrentFrame = immediate && isProcessing;
            const queue = addToCurrentFrame ? thisFrame : nextFrame;
            if (keepAlive) toKeepAlive.add(callback);
            queue.add(callback);
            return callback;
        },
        /**
         * Cancel the provided callback from running on the next frame.
         */ cancel: (callback)=>{
            nextFrame.delete(callback);
            toKeepAlive.delete(callback);
        },
        /**
         * Execute all schedule callbacks.
         */ process: (frameData)=>{
            latestFrameData = frameData;
            /**
             * If we're already processing we've probably been triggered by a flushSync
             * inside an existing process. Instead of executing, mark flushNextFrame
             * as true and ensure we flush the following frame at the end of this one.
             */ if (isProcessing) {
                flushNextFrame = true;
                return;
            }
            isProcessing = true;
            // Swap this frame and the next to avoid GC
            const prevFrame = thisFrame;
            thisFrame = nextFrame;
            nextFrame = prevFrame;
            // Execute this frame
            thisFrame.forEach(triggerCallback);
            /**
             * If we're recording stats then
             */ if (stepName && __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$stats$2f$buffer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["statsBuffer"].value) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$stats$2f$buffer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["statsBuffer"].value.frameloop[stepName].push(numCalls);
            }
            numCalls = 0;
            // Clear the frame so no callbacks remain. This is to avoid
            // memory leaks should this render step not run for a while.
            thisFrame.clear();
            isProcessing = false;
            if (flushNextFrame) {
                flushNextFrame = false;
                step.process(frameData);
            }
        }
    };
    return step;
}
;
 //# sourceMappingURL=render-step.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/frameloop/batcher.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createRenderBatcher",
    ()=>createRenderBatcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$global$2d$config$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/global-config.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$order$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/frameloop/order.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$render$2d$step$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/frameloop/render-step.mjs [app-client] (ecmascript)");
;
;
;
const maxElapsed = 40;
function createRenderBatcher(scheduleNextBatch, allowKeepAlive) {
    let runNextFrame = false;
    let useDefaultElapsed = true;
    const state = {
        delta: 0.0,
        timestamp: 0.0,
        isProcessing: false
    };
    const flagRunNextFrame = ()=>runNextFrame = true;
    const steps = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$order$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepsOrder"].reduce((acc, key)=>{
        acc[key] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$render$2d$step$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRenderStep"])(flagRunNextFrame, allowKeepAlive ? key : undefined);
        return acc;
    }, {});
    const { setup, read, resolveKeyframes, preUpdate, update, preRender, render, postRender } = steps;
    const processBatch = ()=>{
        const useManualTiming = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$global$2d$config$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionGlobalConfig"].useManualTiming;
        const timestamp = useManualTiming ? state.timestamp : performance.now();
        runNextFrame = false;
        if (!useManualTiming) {
            state.delta = useDefaultElapsed ? 1000 / 60 : Math.max(Math.min(timestamp - state.timestamp, maxElapsed), 1);
        }
        state.timestamp = timestamp;
        state.isProcessing = true;
        // Unrolled render loop for better per-frame performance
        setup.process(state);
        read.process(state);
        resolveKeyframes.process(state);
        preUpdate.process(state);
        update.process(state);
        preRender.process(state);
        render.process(state);
        postRender.process(state);
        state.isProcessing = false;
        if (runNextFrame && allowKeepAlive) {
            useDefaultElapsed = false;
            scheduleNextBatch(processBatch);
        }
    };
    const wake = ()=>{
        runNextFrame = true;
        useDefaultElapsed = true;
        if (!state.isProcessing) {
            scheduleNextBatch(processBatch);
        }
    };
    const schedule = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$order$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepsOrder"].reduce((acc, key)=>{
        const step = steps[key];
        acc[key] = (process, keepAlive = false, immediate = false)=>{
            if (!runNextFrame) wake();
            return step.schedule(process, keepAlive, immediate);
        };
        return acc;
    }, {});
    const cancel = (process)=>{
        for(let i = 0; i < __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$order$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepsOrder"].length; i++){
            steps[__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$order$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepsOrder"][i]].cancel(process);
        }
    };
    return {
        schedule,
        cancel,
        state,
        steps
    };
}
;
 //# sourceMappingURL=batcher.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/frameloop/frame.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cancelFrame",
    ()=>cancelFrame,
    "frame",
    ()=>frame,
    "frameData",
    ()=>frameData,
    "frameSteps",
    ()=>frameSteps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/noop.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$batcher$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/frameloop/batcher.mjs [app-client] (ecmascript)");
;
;
const { schedule: frame, cancel: cancelFrame, state: frameData, steps: frameSteps } = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$batcher$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRenderBatcher"])(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"], true);
;
 //# sourceMappingURL=frame.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KeyframeResolver",
    ()=>KeyframeResolver,
    "flushKeyframeResolvers",
    ()=>flushKeyframeResolvers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$fill$2d$wildcards$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$unit$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/keyframes/utils/unit-conversion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/frameloop/frame.mjs [app-client] (ecmascript)");
;
;
;
const toResolve = new Set();
let isScheduled = false;
let anyNeedsMeasurement = false;
let isForced = false;
function measureAllKeyframes() {
    if (anyNeedsMeasurement) {
        const resolversToMeasure = Array.from(toResolve).filter((resolver)=>resolver.needsMeasurement);
        const elementsToMeasure = new Set(resolversToMeasure.map((resolver)=>resolver.element));
        const transformsToRestore = new Map();
        /**
         * Write pass
         * If we're measuring elements we want to remove bounding box-changing transforms.
         */ elementsToMeasure.forEach((element)=>{
            const removedTransforms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$unit$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeNonTranslationalTransform"])(element);
            if (!removedTransforms.length) return;
            transformsToRestore.set(element, removedTransforms);
            element.render();
        });
        // Read
        resolversToMeasure.forEach((resolver)=>resolver.measureInitialState());
        // Write
        elementsToMeasure.forEach((element)=>{
            element.render();
            const restore = transformsToRestore.get(element);
            if (restore) {
                restore.forEach(([key, value])=>{
                    element.getValue(key)?.set(value);
                });
            }
        });
        // Read
        resolversToMeasure.forEach((resolver)=>resolver.measureEndState());
        // Write
        resolversToMeasure.forEach((resolver)=>{
            if (resolver.suspendedScrollY !== undefined) {
                window.scrollTo(0, resolver.suspendedScrollY);
            }
        });
    }
    anyNeedsMeasurement = false;
    isScheduled = false;
    toResolve.forEach((resolver)=>resolver.complete(isForced));
    toResolve.clear();
}
function readAllKeyframes() {
    toResolve.forEach((resolver)=>{
        resolver.readKeyframes();
        if (resolver.needsMeasurement) {
            anyNeedsMeasurement = true;
        }
    });
}
function flushKeyframeResolvers() {
    isForced = true;
    readAllKeyframes();
    measureAllKeyframes();
    isForced = false;
}
class KeyframeResolver {
    constructor(unresolvedKeyframes, onComplete, name, motionValue, element, isAsync = false){
        this.state = "pending";
        /**
         * Track whether this resolver is async. If it is, it'll be added to the
         * resolver queue and flushed in the next frame. Resolvers that aren't going
         * to trigger read/write thrashing don't need to be async.
         */ this.isAsync = false;
        /**
         * Track whether this resolver needs to perform a measurement
         * to resolve its keyframes.
         */ this.needsMeasurement = false;
        this.unresolvedKeyframes = [
            ...unresolvedKeyframes
        ];
        this.onComplete = onComplete;
        this.name = name;
        this.motionValue = motionValue;
        this.element = element;
        this.isAsync = isAsync;
    }
    scheduleResolve() {
        this.state = "scheduled";
        if (this.isAsync) {
            toResolve.add(this);
            if (!isScheduled) {
                isScheduled = true;
                __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frame"].read(readAllKeyframes);
                __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frame"].resolveKeyframes(measureAllKeyframes);
            }
        } else {
            this.readKeyframes();
            this.complete();
        }
    }
    readKeyframes() {
        const { unresolvedKeyframes, name, element, motionValue } = this;
        // If initial keyframe is null we need to read it from the DOM
        if (unresolvedKeyframes[0] === null) {
            const currentValue = motionValue?.get();
            // TODO: This doesn't work if the final keyframe is a wildcard
            const finalKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
            if (currentValue !== undefined) {
                unresolvedKeyframes[0] = currentValue;
            } else if (element && name) {
                const valueAsRead = element.readValue(name, finalKeyframe);
                if (valueAsRead !== undefined && valueAsRead !== null) {
                    unresolvedKeyframes[0] = valueAsRead;
                }
            }
            if (unresolvedKeyframes[0] === undefined) {
                unresolvedKeyframes[0] = finalKeyframe;
            }
            if (motionValue && currentValue === undefined) {
                motionValue.set(unresolvedKeyframes[0]);
            }
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$fill$2d$wildcards$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fillWildcards"])(unresolvedKeyframes);
    }
    setFinalKeyframe() {}
    measureInitialState() {}
    renderEndStyles() {}
    measureEndState() {}
    complete(isForcedComplete = false) {
        this.state = "complete";
        this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, isForcedComplete);
        toResolve.delete(this);
    }
    cancel() {
        if (this.state === "scheduled") {
            toResolve.delete(this);
            this.state = "pending";
        }
    }
    resume() {
        if (this.state === "pending") this.scheduleResolve();
    }
}
;
 //# sourceMappingURL=KeyframesResolver.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/dom/is-css-var.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isCSSVar",
    ()=>isCSSVar
]);
const isCSSVar = (name)=>name.startsWith("--");
;
 //# sourceMappingURL=is-css-var.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/dom/style-set.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setStyle",
    ()=>setStyle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$is$2d$css$2d$var$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/dom/is-css-var.mjs [app-client] (ecmascript)");
;
function setStyle(element, name, value) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$is$2d$css$2d$var$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCSSVar"])(name) ? element.style.setProperty(name, value) : element.style[name] = value;
}
;
 //# sourceMappingURL=style-set.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/memo.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "memo",
    ()=>memo
]);
/*#__NO_SIDE_EFFECTS__*/ function memo(callback) {
    let result;
    return ()=>{
        if (result === undefined) result = callback();
        return result;
    };
}
;
 //# sourceMappingURL=memo.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/utils/supports/flags.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supportsFlags",
    ()=>supportsFlags
]);
/**
 * Add the ability for test suites to manually set support flags
 * to better test more environments.
 */ const supportsFlags = {};
;
 //# sourceMappingURL=flags.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/utils/supports/memo.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "memoSupports",
    ()=>memoSupports
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$memo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/memo.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$flags$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/utils/supports/flags.mjs [app-client] (ecmascript)");
;
;
function memoSupports(callback, supportsFlag) {
    const memoized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$memo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(callback);
    return ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$flags$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supportsFlags"][supportsFlag] ?? memoized();
}
;
 //# sourceMappingURL=memo.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supportsScrollTimeline",
    ()=>supportsScrollTimeline,
    "supportsViewTimeline",
    ()=>supportsViewTimeline
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$memo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/utils/supports/memo.mjs [app-client] (ecmascript)");
;
const supportsScrollTimeline = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$memo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memoSupports"])(()=>window.ScrollTimeline !== undefined, "scrollTimeline");
const supportsViewTimeline = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$memo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memoSupports"])(()=>window.ViewTimeline !== undefined, "viewTimeline");
;
 //# sourceMappingURL=scroll-timeline.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getFinalKeyframe",
    ()=>getFinalKeyframe
]);
const isNotNull = (value)=>value !== null;
function getFinalKeyframe(keyframes, { repeat, repeatType = "loop" }, finalKeyframe, speed = 1) {
    const resolvedKeyframes = keyframes.filter(isNotNull);
    const useFirstKeyframe = speed < 0 || repeat && repeatType !== "loop" && repeat % 2 === 1;
    const index = useFirstKeyframe ? 0 : resolvedKeyframes.length - 1;
    return !index || finalKeyframe === undefined ? resolvedKeyframes[index] : finalKeyframe;
}
;
 //# sourceMappingURL=get-final.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WithPromise",
    ()=>WithPromise
]);
class WithPromise {
    constructor(){
        this.updateFinished();
    }
    get finished() {
        return this._finished;
    }
    updateFinished() {
        this._finished = new Promise((resolve)=>{
            this.resolve = resolve;
        });
    }
    notifyFinished() {
        this.resolve();
    }
    /**
     * Allows the animation to be awaited.
     *
     * @deprecated Use `finished` instead.
     */ then(onResolve, onReject) {
        return this.finished.then(onResolve, onReject);
    }
}
;
 //# sourceMappingURL=WithPromise.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/stats/animation-count.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "activeAnimations",
    ()=>activeAnimations
]);
const activeAnimations = {
    layout: 0,
    mainThread: 0,
    waapi: 0
};
;
 //# sourceMappingURL=animation-count.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/easing/utils/is-bezier-definition.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isBezierDefinition",
    ()=>isBezierDefinition
]);
const isBezierDefinition = (easing)=>Array.isArray(easing) && typeof easing[0] === "number";
;
 //# sourceMappingURL=is-bezier-definition.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supportsLinearEasing",
    ()=>supportsLinearEasing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$memo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/utils/supports/memo.mjs [app-client] (ecmascript)");
;
const supportsLinearEasing = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$memo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memoSupports"])(()=>{
    try {
        document.createElement("div").animate({
            opacity: 0
        }, {
            easing: "linear(0, 1)"
        });
    } catch (e) {
        return false;
    }
    return true;
}, "linearEasing");
;
 //# sourceMappingURL=linear-easing.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/waapi/utils/linear.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateLinearEasing",
    ()=>generateLinearEasing
]);
const generateLinearEasing = (easing, duration, resolution = 10 // as milliseconds
)=>{
    let points = "";
    const numPoints = Math.max(Math.round(duration / resolution), 2);
    for(let i = 0; i < numPoints; i++){
        points += Math.round(easing(i / (numPoints - 1)) * 10000) / 10000 + ", ";
    }
    return `linear(${points.substring(0, points.length - 2)})`;
};
;
 //# sourceMappingURL=linear.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/waapi/easing/cubic-bezier.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cubicBezierAsString",
    ()=>cubicBezierAsString
]);
const cubicBezierAsString = ([a, b, c, d])=>`cubic-bezier(${a}, ${b}, ${c}, ${d})`;
;
 //# sourceMappingURL=cubic-bezier.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/waapi/easing/supported.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supportedWaapiEasing",
    ()=>supportedWaapiEasing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/waapi/easing/cubic-bezier.mjs [app-client] (ecmascript)");
;
const supportedWaapiEasing = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cubicBezierAsString"])([
        0,
        0.65,
        0.55,
        1
    ]),
    circOut: /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cubicBezierAsString"])([
        0.55,
        0,
        1,
        0.45
    ]),
    backIn: /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cubicBezierAsString"])([
        0.31,
        0.01,
        0.66,
        -0.59
    ]),
    backOut: /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cubicBezierAsString"])([
        0.33,
        1.53,
        0.69,
        0.99
    ])
};
;
 //# sourceMappingURL=supported.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mapEasingToNativeEasing",
    ()=>mapEasingToNativeEasing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$utils$2f$is$2d$bezier$2d$definition$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/easing/utils/is-bezier-definition.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$linear$2d$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$linear$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/waapi/utils/linear.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/waapi/easing/cubic-bezier.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$supported$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/waapi/easing/supported.mjs [app-client] (ecmascript)");
;
;
;
;
;
function mapEasingToNativeEasing(easing, duration) {
    if (!easing) {
        return undefined;
    } else if (typeof easing === "function") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$linear$2d$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supportsLinearEasing"])() ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$linear$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateLinearEasing"])(easing, duration) : "ease-out";
    } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$utils$2f$is$2d$bezier$2d$definition$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBezierDefinition"])(easing)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cubicBezierAsString"])(easing);
    } else if (Array.isArray(easing)) {
        return easing.map((segmentEasing)=>mapEasingToNativeEasing(segmentEasing, duration) || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$supported$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supportedWaapiEasing"].easeOut);
    } else {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$supported$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supportedWaapiEasing"][easing];
    }
}
;
 //# sourceMappingURL=map-easing.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "startWaapiAnimation",
    ()=>startWaapiAnimation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$stats$2f$animation$2d$count$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/stats/animation-count.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$stats$2f$buffer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/stats/buffer.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$map$2d$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs [app-client] (ecmascript)");
;
;
;
function startWaapiAnimation(element, valueName, keyframes, { delay = 0, duration = 300, repeat = 0, repeatType = "loop", ease = "easeOut", times } = {}, pseudoElement = undefined) {
    const keyframeOptions = {
        [valueName]: keyframes
    };
    if (times) keyframeOptions.offset = times;
    const easing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$map$2d$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapEasingToNativeEasing"])(ease, duration);
    /**
     * If this is an easing array, apply to keyframes, not animation as a whole
     */ if (Array.isArray(easing)) keyframeOptions.easing = easing;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$stats$2f$buffer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["statsBuffer"].value) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$stats$2f$animation$2d$count$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeAnimations"].waapi++;
    }
    const options = {
        delay,
        duration,
        easing: !Array.isArray(easing) ? easing : "linear",
        fill: "both",
        iterations: repeat + 1,
        direction: repeatType === "reverse" ? "alternate" : "normal"
    };
    if (pseudoElement) options.pseudoElement = pseudoElement;
    const animation = element.animate(keyframeOptions, options);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$stats$2f$buffer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["statsBuffer"].value) {
        animation.finished.finally(()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$stats$2f$animation$2d$count$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeAnimations"].waapi--;
        });
    }
    return animation;
}
;
 //# sourceMappingURL=start-waapi-animation.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isGenerator",
    ()=>isGenerator
]);
function isGenerator(type) {
    return typeof type === "function" && "applyToOptions" in type;
}
;
 //# sourceMappingURL=is-generator.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyGeneratorOptions",
    ()=>applyGeneratorOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$linear$2d$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$is$2d$generator$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs [app-client] (ecmascript)");
;
;
function applyGeneratorOptions({ type, ...options }) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$is$2d$generator$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isGenerator"])(type) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$linear$2d$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supportsLinearEasing"])()) {
        return type.applyToOptions(options);
    } else {
        options.duration ?? (options.duration = 300);
        options.ease ?? (options.ease = "easeOut");
    }
    return options;
}
;
 //# sourceMappingURL=apply-generator.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NativeAnimation",
    ()=>NativeAnimation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/errors.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/time-conversion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/noop.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$style$2d$set$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/dom/style-set.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$scroll$2d$timeline$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$get$2d$final$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$WithPromise$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$start$2d$waapi$2d$animation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$apply$2d$generator$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
/**
 * NativeAnimation implements AnimationPlaybackControls for the browser's Web Animations API.
 */ class NativeAnimation extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$WithPromise$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WithPromise"] {
    constructor(options){
        super();
        this.finishedTime = null;
        this.isStopped = false;
        /**
         * Tracks a manually-set start time that takes precedence over WAAPI's
         * dynamic startTime. This is cleared when play() or time setter is called,
         * allowing WAAPI to take over timing.
         */ this.manualStartTime = null;
        if (!options) return;
        const { element, name, keyframes, pseudoElement, allowFlatten = false, finalKeyframe, onComplete } = options;
        this.isPseudoElement = Boolean(pseudoElement);
        this.allowFlatten = allowFlatten;
        this.options = options;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["invariant"])(typeof options.type !== "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
        const transition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$apply$2d$generator$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyGeneratorOptions"])(options);
        this.animation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$start$2d$waapi$2d$animation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startWaapiAnimation"])(element, name, keyframes, transition, pseudoElement);
        if (transition.autoplay === false) {
            this.animation.pause();
        }
        this.animation.onfinish = ()=>{
            this.finishedTime = this.time;
            if (!pseudoElement) {
                const keyframe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$get$2d$final$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFinalKeyframe"])(keyframes, this.options, finalKeyframe, this.speed);
                if (this.updateMotionValue) {
                    this.updateMotionValue(keyframe);
                }
                /**
                 * If we can, we want to commit the final style as set by the user,
                 * rather than the computed keyframe value supplied by the animation.
                 * We always do this, even when a motion value is present, to prevent
                 * a visual flash in Firefox where the WAAPI animation's fill is removed
                 * during cancel() before the scheduled render can apply the correct value.
                 */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$style$2d$set$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setStyle"])(element, name, keyframe);
                this.animation.cancel();
            }
            onComplete?.();
            this.notifyFinished();
        };
    }
    play() {
        if (this.isStopped) return;
        this.manualStartTime = null;
        this.animation.play();
        if (this.state === "finished") {
            this.updateFinished();
        }
    }
    pause() {
        this.animation.pause();
    }
    complete() {
        this.animation.finish?.();
    }
    cancel() {
        try {
            this.animation.cancel();
        } catch (e) {}
    }
    stop() {
        if (this.isStopped) return;
        this.isStopped = true;
        const { state } = this;
        if (state === "idle" || state === "finished") {
            return;
        }
        if (this.updateMotionValue) {
            this.updateMotionValue();
        } else {
            this.commitStyles();
        }
        if (!this.isPseudoElement) this.cancel();
    }
    /**
     * WAAPI doesn't natively have any interruption capabilities.
     *
     * In this method, we commit styles back to the DOM before cancelling
     * the animation.
     *
     * This is designed to be overridden by NativeAnimationExtended, which
     * will create a renderless JS animation and sample it twice to calculate
     * its current value, "previous" value, and therefore allow
     * Motion to also correctly calculate velocity for any subsequent animation
     * while deferring the commit until the next animation frame.
     */ commitStyles() {
        const element = this.options?.element;
        if (!this.isPseudoElement && element?.isConnected) {
            this.animation.commitStyles?.();
        }
    }
    get duration() {
        const duration = this.animation.effect?.getComputedTiming?.().duration || 0;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["millisecondsToSeconds"])(Number(duration));
    }
    get iterationDuration() {
        const { delay = 0 } = this.options || {};
        return this.duration + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["millisecondsToSeconds"])(delay);
    }
    get time() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["millisecondsToSeconds"])(Number(this.animation.currentTime) || 0);
    }
    set time(newTime) {
        const wasFinished = this.finishedTime !== null;
        this.manualStartTime = null;
        this.finishedTime = null;
        this.animation.currentTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["secondsToMilliseconds"])(newTime);
        if (wasFinished) {
            this.animation.pause();
        }
    }
    /**
     * The playback speed of the animation.
     * 1 = normal speed, 2 = double speed, 0.5 = half speed.
     */ get speed() {
        return this.animation.playbackRate;
    }
    set speed(newSpeed) {
        // Allow backwards playback after finishing
        if (newSpeed < 0) this.finishedTime = null;
        this.animation.playbackRate = newSpeed;
    }
    get state() {
        return this.finishedTime !== null ? "finished" : this.animation.playState;
    }
    get startTime() {
        return this.manualStartTime ?? Number(this.animation.startTime);
    }
    set startTime(newStartTime) {
        this.manualStartTime = this.animation.startTime = newStartTime;
    }
    /**
     * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
     */ attachTimeline({ timeline, rangeStart, rangeEnd, observe }) {
        if (this.allowFlatten) {
            this.animation.effect?.updateTiming({
                easing: "linear"
            });
        }
        this.animation.onfinish = null;
        if (timeline && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$scroll$2d$timeline$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supportsScrollTimeline"])()) {
            this.animation.timeline = timeline;
            if (rangeStart) this.animation.rangeStart = rangeStart;
            if (rangeEnd) this.animation.rangeEnd = rangeEnd;
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"];
        } else {
            return observe(this);
        }
    }
}
;
 //# sourceMappingURL=NativeAnimation.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/waapi/utils/accelerated-values.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "acceleratedValues",
    ()=>acceleratedValues
]);
/**
 * A list of values that can be hardware-accelerated.
 */ const acceleratedValues = new Set([
    "opacity",
    "clipPath",
    "filter",
    "transform"
]);
;
 //# sourceMappingURL=accelerated-values.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/frameloop/microtask.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cancelMicrotask",
    ()=>cancelMicrotask,
    "microtask",
    ()=>microtask
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$batcher$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/frameloop/batcher.mjs [app-client] (ecmascript)");
;
const { schedule: microtask, cancel: cancelMicrotask } = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$batcher$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRenderBatcher"])(queueMicrotask, false);
;
 //# sourceMappingURL=microtask.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/frameloop/sync-time.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "time",
    ()=>time
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$global$2d$config$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/global-config.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/frameloop/frame.mjs [app-client] (ecmascript)");
;
;
let now;
function clearTime() {
    now = undefined;
}
/**
 * An eventloop-synchronous alternative to performance.now().
 *
 * Ensures that time measurements remain consistent within a synchronous context.
 * Usually calling performance.now() twice within the same synchronous context
 * will return different values which isn't useful for animations when we're usually
 * trying to sync animations to the same frame.
 */ const time = {
    now: ()=>{
        if (now === undefined) {
            time.set(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frameData"].isProcessing || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$global$2d$config$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionGlobalConfig"].useManualTiming ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frameData"].timestamp : performance.now());
        }
        return now;
    },
    set: (newTime)=>{
        now = newTime;
        queueMicrotask(clearTime);
    }
};
;
 //# sourceMappingURL=sync-time.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/projection/geometry/models.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAxis",
    ()=>createAxis,
    "createAxisDelta",
    ()=>createAxisDelta,
    "createBox",
    ()=>createBox,
    "createDelta",
    ()=>createDelta
]);
const createAxisDelta = ()=>({
        translate: 0,
        scale: 1,
        origin: 0,
        originPoint: 0
    });
const createDelta = ()=>({
        x: createAxisDelta(),
        y: createAxisDelta()
    });
const createAxis = ()=>({
        min: 0,
        max: 0
    });
const createBox = ()=>({
        x: createAxis(),
        y: createAxis()
    });
;
 //# sourceMappingURL=models.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/velocity-per-second.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "velocityPerSecond",
    ()=>velocityPerSecond
]);
/*
  Convert velocity into velocity per second

  @param [number]: Unit per frame
  @param [number]: Frame duration in ms
*/ function velocityPerSecond(velocity, frameDuration) {
    return frameDuration ? velocity * (1000 / frameDuration) : 0;
}
;
 //# sourceMappingURL=velocity-per-second.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MotionValue",
    ()=>MotionValue,
    "collectMotionValues",
    ()=>collectMotionValues,
    "motionValue",
    ()=>motionValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$warn$2d$once$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/warn-once.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$subscription$2d$manager$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/subscription-manager.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$velocity$2d$per$2d$second$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/velocity-per-second.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/frameloop/sync-time.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/frameloop/frame.mjs [app-client] (ecmascript)");
;
;
;
/**
 * Maximum time between the value of two frames, beyond which we
 * assume the velocity has since been 0.
 */ const MAX_VELOCITY_DELTA = 30;
const isFloat = (value)=>{
    return !isNaN(parseFloat(value));
};
const collectMotionValues = {
    current: undefined
};
/**
 * `MotionValue` is used to track the state and velocity of motion values.
 *
 * @public
 */ class MotionValue {
    /**
     * @param init - The initiating value
     * @param config - Optional configuration options
     *
     * -  `transformer`: A function to transform incoming values with.
     */ constructor(init, options = {}){
        /**
         * Tracks whether this value can output a velocity. Currently this is only true
         * if the value is numerical, but we might be able to widen the scope here and support
         * other value types.
         *
         * @internal
         */ this.canTrackVelocity = null;
        /**
         * An object containing a SubscriptionManager for each active event.
         */ this.events = {};
        this.updateAndNotify = (v)=>{
            const currentTime = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["time"].now();
            /**
             * If we're updating the value during another frame or eventloop
             * than the previous frame, then the we set the previous frame value
             * to current.
             */ if (this.updatedAt !== currentTime) {
                this.setPrevFrameValue();
            }
            this.prev = this.current;
            this.setCurrent(v);
            // Update update subscribers
            if (this.current !== this.prev) {
                this.events.change?.notify(this.current);
                if (this.dependents) {
                    for (const dependent of this.dependents){
                        dependent.dirty();
                    }
                }
            }
        };
        this.hasAnimated = false;
        this.setCurrent(init);
        this.owner = options.owner;
    }
    setCurrent(current) {
        this.current = current;
        this.updatedAt = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["time"].now();
        if (this.canTrackVelocity === null && current !== undefined) {
            this.canTrackVelocity = isFloat(this.current);
        }
    }
    setPrevFrameValue(prevFrameValue = this.current) {
        this.prevFrameValue = prevFrameValue;
        this.prevUpdatedAt = this.updatedAt;
    }
    /**
     * Adds a function that will be notified when the `MotionValue` is updated.
     *
     * It returns a function that, when called, will cancel the subscription.
     *
     * When calling `onChange` inside a React component, it should be wrapped with the
     * `useEffect` hook. As it returns an unsubscribe function, this should be returned
     * from the `useEffect` function to ensure you don't add duplicate subscribers..
     *
     * ```jsx
     * export const MyComponent = () => {
     *   const x = useMotionValue(0)
     *   const y = useMotionValue(0)
     *   const opacity = useMotionValue(1)
     *
     *   useEffect(() => {
     *     function updateOpacity() {
     *       const maxXY = Math.max(x.get(), y.get())
     *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
     *       opacity.set(newOpacity)
     *     }
     *
     *     const unsubscribeX = x.on("change", updateOpacity)
     *     const unsubscribeY = y.on("change", updateOpacity)
     *
     *     return () => {
     *       unsubscribeX()
     *       unsubscribeY()
     *     }
     *   }, [])
     *
     *   return <motion.div style={{ x }} />
     * }
     * ```
     *
     * @param subscriber - A function that receives the latest value.
     * @returns A function that, when called, will cancel this subscription.
     *
     * @deprecated
     */ onChange(subscription) {
        if ("TURBOPACK compile-time truthy", 1) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$warn$2d$once$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["warnOnce"])(false, `value.onChange(callback) is deprecated. Switch to value.on("change", callback).`);
        }
        return this.on("change", subscription);
    }
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$subscription$2d$manager$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubscriptionManager"]();
        }
        const unsubscribe = this.events[eventName].add(callback);
        if (eventName === "change") {
            return ()=>{
                unsubscribe();
                /**
                 * If we have no more change listeners by the start
                 * of the next frame, stop active animations.
                 */ __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frame"].read(()=>{
                    if (!this.events.change.getSize()) {
                        this.stop();
                    }
                });
            };
        }
        return unsubscribe;
    }
    clearListeners() {
        for(const eventManagers in this.events){
            this.events[eventManagers].clear();
        }
    }
    /**
     * Attaches a passive effect to the `MotionValue`.
     */ attach(passiveEffect, stopPassiveEffect) {
        this.passiveEffect = passiveEffect;
        this.stopPassiveEffect = stopPassiveEffect;
    }
    /**
     * Sets the state of the `MotionValue`.
     *
     * @remarks
     *
     * ```jsx
     * const x = useMotionValue(0)
     * x.set(10)
     * ```
     *
     * @param latest - Latest value to set.
     * @param render - Whether to notify render subscribers. Defaults to `true`
     *
     * @public
     */ set(v) {
        if (!this.passiveEffect) {
            this.updateAndNotify(v);
        } else {
            this.passiveEffect(v, this.updateAndNotify);
        }
    }
    setWithVelocity(prev, current, delta) {
        this.set(current);
        this.prev = undefined;
        this.prevFrameValue = prev;
        this.prevUpdatedAt = this.updatedAt - delta;
    }
    /**
     * Set the state of the `MotionValue`, stopping any active animations,
     * effects, and resets velocity to `0`.
     */ jump(v, endAnimation = true) {
        this.updateAndNotify(v);
        this.prev = v;
        this.prevUpdatedAt = this.prevFrameValue = undefined;
        endAnimation && this.stop();
        if (this.stopPassiveEffect) this.stopPassiveEffect();
    }
    dirty() {
        this.events.change?.notify(this.current);
    }
    addDependent(dependent) {
        if (!this.dependents) {
            this.dependents = new Set();
        }
        this.dependents.add(dependent);
    }
    removeDependent(dependent) {
        if (this.dependents) {
            this.dependents.delete(dependent);
        }
    }
    /**
     * Returns the latest state of `MotionValue`
     *
     * @returns - The latest state of `MotionValue`
     *
     * @public
     */ get() {
        if (collectMotionValues.current) {
            collectMotionValues.current.push(this);
        }
        return this.current;
    }
    /**
     * @public
     */ getPrevious() {
        return this.prev;
    }
    /**
     * Returns the latest velocity of `MotionValue`
     *
     * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
     *
     * @public
     */ getVelocity() {
        const currentTime = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["time"].now();
        if (!this.canTrackVelocity || this.prevFrameValue === undefined || currentTime - this.updatedAt > MAX_VELOCITY_DELTA) {
            return 0;
        }
        const delta = Math.min(this.updatedAt - this.prevUpdatedAt, MAX_VELOCITY_DELTA);
        // Casts because of parseFloat's poor typing
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$velocity$2d$per$2d$second$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["velocityPerSecond"])(parseFloat(this.current) - parseFloat(this.prevFrameValue), delta);
    }
    /**
     * Registers a new animation to control this `MotionValue`. Only one
     * animation can drive a `MotionValue` at one time.
     *
     * ```jsx
     * value.start()
     * ```
     *
     * @param animation - A function that starts the provided animation
     */ start(startAnimation) {
        this.stop();
        return new Promise((resolve)=>{
            this.hasAnimated = true;
            this.animation = startAnimation(resolve);
            if (this.events.animationStart) {
                this.events.animationStart.notify();
            }
        }).then(()=>{
            if (this.events.animationComplete) {
                this.events.animationComplete.notify();
            }
            this.clearAnimation();
        });
    }
    /**
     * Stop the currently active animation.
     *
     * @public
     */ stop() {
        if (this.animation) {
            this.animation.stop();
            if (this.events.animationCancel) {
                this.events.animationCancel.notify();
            }
        }
        this.clearAnimation();
    }
    /**
     * Returns `true` if this value is currently animating.
     *
     * @public
     */ isAnimating() {
        return !!this.animation;
    }
    clearAnimation() {
        delete this.animation;
    }
    /**
     * Destroy and clean up subscribers to this `MotionValue`.
     *
     * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
     * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
     * created a `MotionValue` via the `motionValue` function.
     *
     * @public
     */ destroy() {
        this.dependents?.clear();
        this.events.destroy?.notify();
        this.clearListeners();
        this.stop();
        if (this.stopPassiveEffect) {
            this.stopPassiveEffect();
        }
    }
}
function motionValue(init, options) {
    return new MotionValue(init, options);
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/complex/filter.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "filter",
    ()=>filter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/complex/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$float$2d$regex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/utils/float-regex.mjs [app-client] (ecmascript)");
;
;
/**
 * Properties that should default to 1 or 100%
 */ const maxDefaults = new Set([
    "brightness",
    "contrast",
    "saturate",
    "opacity"
]);
function applyDefaultFilter(v) {
    const [name, value] = v.slice(0, -1).split("(");
    if (name === "drop-shadow") return v;
    const [number] = value.match(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$float$2d$regex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["floatRegex"]) || [];
    if (!number) return v;
    const unit = value.replace(number, "");
    let defaultValue = maxDefaults.has(name) ? 1 : 0;
    if (number !== value) defaultValue *= 100;
    return name + "(" + defaultValue + unit + ")";
}
const functionRegex = /\b([a-z-]*)\(.*?\)/gu;
const filter = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["complex"],
    getAnimatableNone: (v)=>{
        const functions = v.match(functionRegex);
        return functions ? functions.map(applyDefaultFilter).join(" ") : v;
    }
};
;
 //# sourceMappingURL=filter.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/complex/mask.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mask",
    ()=>mask
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/complex/index.mjs [app-client] (ecmascript)");
;
const mask = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["complex"],
    getAnimatableNone: (v)=>{
        const parsed = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["complex"].parse(v);
        const transformer = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["complex"].createTransformer(v);
        return transformer(parsed.map((v)=>typeof v === "number" ? 0 : typeof v === "object" ? {
                ...v,
                alpha: 1
            } : v));
    }
};
;
 //# sourceMappingURL=mask.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/maps/defaults.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultValueTypes",
    ()=>defaultValueTypes,
    "getDefaultValueType",
    ()=>getDefaultValueType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/color/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$filter$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/complex/filter.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$mask$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/complex/mask.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/maps/number.mjs [app-client] (ecmascript)");
;
;
;
;
/**
 * A map of default value types for common values
 */ const defaultValueTypes = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["numberValueTypes"],
    // Color props
    color: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"],
    backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"],
    outlineColor: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"],
    fill: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"],
    stroke: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"],
    // Border props
    borderColor: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"],
    borderTopColor: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"],
    borderRightColor: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"],
    borderBottomColor: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"],
    borderLeftColor: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"],
    filter: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$filter$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["filter"],
    WebkitFilter: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$filter$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["filter"],
    mask: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$mask$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mask"],
    WebkitMask: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$mask$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mask"]
};
/**
 * Gets the default ValueType for the provided value key
 */ const getDefaultValueType = (key)=>defaultValueTypes[key];
;
 //# sourceMappingURL=defaults.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/utils/animatable-none.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAnimatableNone",
    ()=>getAnimatableNone
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/complex/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$filter$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/complex/filter.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$mask$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/complex/mask.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/maps/defaults.mjs [app-client] (ecmascript)");
;
;
;
;
const customTypes = /*@__PURE__*/ new Set([
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$filter$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["filter"],
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$mask$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mask"]
]);
function getAnimatableNone(key, value) {
    let defaultValueType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultValueType"])(key);
    if (!customTypes.has(defaultValueType)) defaultValueType = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["complex"];
    // If value is not recognised as animatable, ie "none", create an animatable version origin based on the target
    return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : undefined;
}
;
 //# sourceMappingURL=animatable-none.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/auto.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auto",
    ()=>auto
]);
/**
 * ValueType for "auto"
 */ const auto = {
    test: (v)=>v === "auto",
    parse: (v)=>v
};
;
 //# sourceMappingURL=auto.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/test.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "testValueType",
    ()=>testValueType
]);
/**
 * Tests a provided value against a ValueType
 */ const testValueType = (v)=>(type)=>type.test(v);
;
 //# sourceMappingURL=test.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/dimensions.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dimensionValueTypes",
    ()=>dimensionValueTypes,
    "findDimensionValueType",
    ()=>findDimensionValueType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$auto$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/auto.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/numbers/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/numbers/units.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$test$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/test.mjs [app-client] (ecmascript)");
;
;
;
;
/**
 * A list of value types commonly used for dimensions
 */ const dimensionValueTypes = [
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["number"],
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["percent"],
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["degrees"],
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vw"],
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vh"],
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$auto$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auto"]
];
/**
 * Tests a dimensional value against the list of dimension ValueTypes
 */ const findDimensionValueType = (v)=>dimensionValueTypes.find((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$test$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["testValueType"])(v));
;
 //# sourceMappingURL=dimensions.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/utils/find.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "findValueType",
    ()=>findValueType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/color/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/complex/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/dimensions.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$test$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/test.mjs [app-client] (ecmascript)");
;
;
;
;
/**
 * A list of all ValueTypes
 */ const valueTypes = [
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dimensionValueTypes"],
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"],
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["complex"]
];
/**
 * Tests a value against the list of ValueTypes
 */ const findValueType = (v)=>valueTypes.find((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$test$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["testValueType"])(v));
;
 //# sourceMappingURL=find.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/store.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "visualElementStore",
    ()=>visualElementStore
]);
const visualElementStore = new WeakMap();
;
 //# sourceMappingURL=store.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/motion-values.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "updateMotionValuesFromProps",
    ()=>updateMotionValuesFromProps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-client] (ecmascript)");
;
;
/**
 * Updates motion values from props changes.
 * Uses `any` type for element to avoid circular dependencies with VisualElement.
 */ function updateMotionValuesFromProps(element, next, prev) {
    for(const key in next){
        const nextValue = next[key];
        const prevValue = prev[key];
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(nextValue)) {
            /**
             * If this is a motion value found in props or style, we want to add it
             * to our visual element's motion value map.
             */ element.addValue(key, nextValue);
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(prevValue)) {
            /**
             * If we're swapping from a motion value to a static value,
             * create a new motion value from that
             */ element.addValue(key, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motionValue"])(nextValue, {
                owner: element
            }));
        } else if (prevValue !== nextValue) {
            /**
             * If this is a flat value that has changed, update the motion value
             * or create one if it doesn't exist. We only want to do this if we're
             * not handling the value with our animation state.
             */ if (element.hasValue(key)) {
                const existingValue = element.getValue(key);
                if (existingValue.liveStyle === true) {
                    existingValue.jump(nextValue);
                } else if (!existingValue.hasAnimated) {
                    existingValue.set(nextValue);
                }
            } else {
                const latestValue = element.getStaticValue(key);
                element.addValue(key, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motionValue"])(latestValue !== undefined ? latestValue : nextValue, {
                    owner: element
                }));
            }
        }
    }
    // Handle removed values
    for(const key in prev){
        if (next[key] === undefined) element.removeValue(key);
    }
    return next;
}
;
 //# sourceMappingURL=motion-values.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/reduced-motion/state.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hasReducedMotionListener",
    ()=>hasReducedMotionListener,
    "prefersReducedMotion",
    ()=>prefersReducedMotion
]);
// Does this device prefer reduced motion? Returns `null` server-side.
const prefersReducedMotion = {
    current: null
};
const hasReducedMotionListener = {
    current: false
};
;
 //# sourceMappingURL=state.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/reduced-motion/index.mjs [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initPrefersReducedMotion",
    ()=>initPrefersReducedMotion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$reduced$2d$motion$2f$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/reduced-motion/state.mjs [app-client] (ecmascript)");
;
const isBrowser = typeof window !== "undefined";
function initPrefersReducedMotion() {
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$reduced$2d$motion$2f$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasReducedMotionListener"].current = true;
    if (!isBrowser) return;
    if (window.matchMedia) {
        const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
        const setReducedMotionPreferences = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$reduced$2d$motion$2f$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prefersReducedMotion"].current = motionMediaQuery.matches;
        motionMediaQuery.addEventListener("change", setReducedMotionPreferences);
        setReducedMotionPreferences();
    } else {
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$reduced$2d$motion$2f$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prefersReducedMotion"].current = false;
    }
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/VisualElement.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VisualElement",
    ()=>VisualElement,
    "getFeatureDefinitions",
    ()=>getFeatureDefinitions,
    "setFeatureDefinitions",
    ()=>setFeatureDefinitions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$warn$2d$once$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/warn-once.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/time-conversion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$is$2d$numerical$2d$string$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/is-numerical-string.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$is$2d$zero$2d$value$2d$string$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/is-zero-value-string.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$subscription$2d$manager$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/subscription-manager.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$KeyframesResolver$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$NativeAnimation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$accelerated$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/waapi/utils/accelerated-values.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$microtask$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/frameloop/microtask.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/frameloop/sync-time.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$geometry$2f$models$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/projection/geometry/models.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/complex/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$animatable$2d$none$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/utils/animatable-none.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$find$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/types/utils/find.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$store$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/store.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$controlling$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/is-controlling-variants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$motion$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/motion-values.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$reduced$2d$motion$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/reduced-motion/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$resolve$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/resolve-variants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$reduced$2d$motion$2f$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/utils/reduced-motion/state.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/frameloop/frame.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const propEventHandlers = [
    "AnimationStart",
    "AnimationComplete",
    "Update",
    "BeforeLayoutMeasure",
    "LayoutMeasure",
    "LayoutAnimationStart",
    "LayoutAnimationComplete"
];
/**
 * Static feature definitions - can be injected by framework layer
 */ let featureDefinitions = {};
/**
 * Set feature definitions for all VisualElements.
 * This should be called by the framework layer (e.g., framer-motion) during initialization.
 */ function setFeatureDefinitions(definitions) {
    featureDefinitions = definitions;
}
/**
 * Get the current feature definitions
 */ function getFeatureDefinitions() {
    return featureDefinitions;
}
/**
 * A VisualElement is an imperative abstraction around UI elements such as
 * HTMLElement, SVGElement, Three.Object3D etc.
 */ class VisualElement {
    /**
     * This method takes React props and returns found MotionValues. For example, HTML
     * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
     *
     * This isn't an abstract method as it needs calling in the constructor, but it is
     * intended to be one.
     */ scrapeMotionValuesFromProps(_props, _prevProps, _visualElement) {
        return {};
    }
    constructor({ parent, props, presenceContext, reducedMotionConfig, skipAnimations, blockInitialAnimation, visualState }, options = {}){
        /**
         * A reference to the current underlying Instance, e.g. a HTMLElement
         * or Three.Mesh etc.
         */ this.current = null;
        /**
         * A set containing references to this VisualElement's children.
         */ this.children = new Set();
        /**
         * Determine what role this visual element should take in the variant tree.
         */ this.isVariantNode = false;
        this.isControllingVariants = false;
        /**
         * Decides whether this VisualElement should animate in reduced motion
         * mode.
         *
         * TODO: This is currently set on every individual VisualElement but feels
         * like it could be set globally.
         */ this.shouldReduceMotion = null;
        /**
         * Decides whether animations should be skipped for this VisualElement.
         * Useful for E2E tests and visual regression testing.
         */ this.shouldSkipAnimations = false;
        /**
         * A map of all motion values attached to this visual element. Motion
         * values are source of truth for any given animated value. A motion
         * value might be provided externally by the component via props.
         */ this.values = new Map();
        this.KeyframeResolver = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$KeyframesResolver$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeyframeResolver"];
        /**
         * Cleanup functions for active features (hover/tap/exit etc)
         */ this.features = {};
        /**
         * A map of every subscription that binds the provided or generated
         * motion values onChange listeners to this visual element.
         */ this.valueSubscriptions = new Map();
        /**
         * A reference to the previously-provided motion values as returned
         * from scrapeMotionValuesFromProps. We use the keys in here to determine
         * if any motion values need to be removed after props are updated.
         */ this.prevMotionValues = {};
        /**
         * Track whether this element has been mounted before, to detect
         * remounts after Suspense unmount/remount cycles.
         */ this.hasBeenMounted = false;
        /**
         * An object containing a SubscriptionManager for each active event.
         */ this.events = {};
        /**
         * An object containing an unsubscribe function for each prop event subscription.
         * For example, every "Update" event can have multiple subscribers via
         * VisualElement.on(), but only one of those can be defined via the onUpdate prop.
         */ this.propEventSubscriptions = {};
        this.notifyUpdate = ()=>this.notify("Update", this.latestValues);
        this.render = ()=>{
            if (!this.current) return;
            this.triggerBuild();
            this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
        };
        this.renderScheduledAt = 0.0;
        this.scheduleRender = ()=>{
            const now = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["time"].now();
            if (this.renderScheduledAt < now) {
                this.renderScheduledAt = now;
                __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frame"].render(this.render, false, true);
            }
        };
        const { latestValues, renderState } = visualState;
        this.latestValues = latestValues;
        this.baseTarget = {
            ...latestValues
        };
        this.initialValues = props.initial ? {
            ...latestValues
        } : {};
        this.renderState = renderState;
        this.parent = parent;
        this.props = props;
        this.presenceContext = presenceContext;
        this.depth = parent ? parent.depth + 1 : 0;
        this.reducedMotionConfig = reducedMotionConfig;
        this.skipAnimationsConfig = skipAnimations;
        this.options = options;
        this.blockInitialAnimation = Boolean(blockInitialAnimation);
        this.isControllingVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$controlling$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isControllingVariants"])(props);
        this.isVariantNode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$controlling$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isVariantNode"])(props);
        if (this.isVariantNode) {
            this.variantChildren = new Set();
        }
        this.manuallyAnimateOnMount = Boolean(parent && parent.current);
        /**
         * Any motion values that are provided to the element when created
         * aren't yet bound to the element, as this would technically be impure.
         * However, we iterate through the motion values and set them to the
         * initial values for this component.
         *
         * TODO: This is impure and we should look at changing this to run on mount.
         * Doing so will break some tests but this isn't necessarily a breaking change,
         * more a reflection of the test.
         */ const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props, {}, this);
        for(const key in initialMotionValues){
            const value = initialMotionValues[key];
            if (latestValues[key] !== undefined && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(value)) {
                value.set(latestValues[key]);
            }
        }
    }
    mount(instance) {
        /**
         * If this element has been mounted before (e.g. after a Suspense
         * unmount/remount), reset motion values to their initial state
         * so animations replay correctly from initial → animate.
         */ if (this.hasBeenMounted) {
            for(const key in this.initialValues){
                this.values.get(key)?.jump(this.initialValues[key]);
                this.latestValues[key] = this.initialValues[key];
            }
        }
        this.current = instance;
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$store$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["visualElementStore"].set(instance, this);
        if (this.projection && !this.projection.instance) {
            this.projection.mount(instance);
        }
        if (this.parent && this.isVariantNode && !this.isControllingVariants) {
            this.removeFromVariantTree = this.parent.addVariantChild(this);
        }
        this.values.forEach((value, key)=>this.bindToMotionValue(key, value));
        /**
         * Determine reduced motion preference. Only initialize the matchMedia
         * listener if we actually need the dynamic value (i.e., when config
         * is neither "never" nor "always").
         */ if (this.reducedMotionConfig === "never") {
            this.shouldReduceMotion = false;
        } else if (this.reducedMotionConfig === "always") {
            this.shouldReduceMotion = true;
        } else {
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$reduced$2d$motion$2f$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasReducedMotionListener"].current) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$reduced$2d$motion$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["initPrefersReducedMotion"])();
            }
            this.shouldReduceMotion = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$reduced$2d$motion$2f$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prefersReducedMotion"].current;
        }
        if ("TURBOPACK compile-time truthy", 1) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$warn$2d$once$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["warnOnce"])(this.shouldReduceMotion !== true, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled");
        }
        /**
         * Set whether animations should be skipped based on the config.
         */ this.shouldSkipAnimations = this.skipAnimationsConfig ?? false;
        this.parent?.addChild(this);
        this.update(this.props, this.presenceContext);
        this.hasBeenMounted = true;
    }
    unmount() {
        this.projection && this.projection.unmount();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cancelFrame"])(this.notifyUpdate);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cancelFrame"])(this.render);
        this.valueSubscriptions.forEach((remove)=>remove());
        this.valueSubscriptions.clear();
        this.removeFromVariantTree && this.removeFromVariantTree();
        this.parent?.removeChild(this);
        for(const key in this.events){
            this.events[key].clear();
        }
        for(const key in this.features){
            const feature = this.features[key];
            if (feature) {
                feature.unmount();
                feature.isMounted = false;
            }
        }
        this.current = null;
    }
    addChild(child) {
        this.children.add(child);
        this.enteringChildren ?? (this.enteringChildren = new Set());
        this.enteringChildren.add(child);
    }
    removeChild(child) {
        this.children.delete(child);
        this.enteringChildren && this.enteringChildren.delete(child);
    }
    bindToMotionValue(key, value) {
        if (this.valueSubscriptions.has(key)) {
            this.valueSubscriptions.get(key)();
        }
        if (value.accelerate && __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$accelerated$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["acceleratedValues"].has(key) && this.current instanceof HTMLElement) {
            const { factory, keyframes, times, ease, duration } = value.accelerate;
            const animation = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$NativeAnimation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NativeAnimation"]({
                element: this.current,
                name: key,
                keyframes,
                times,
                ease,
                duration: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["secondsToMilliseconds"])(duration)
            });
            const cleanup = factory(animation);
            this.valueSubscriptions.set(key, ()=>{
                cleanup();
                animation.cancel();
            });
            return;
        }
        const valueIsTransform = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProps"].has(key);
        if (valueIsTransform && this.onBindTransform) {
            this.onBindTransform();
        }
        const removeOnChange = value.on("change", (latestValue)=>{
            this.latestValues[key] = latestValue;
            this.props.onUpdate && __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frame"].preRender(this.notifyUpdate);
            if (valueIsTransform && this.projection) {
                this.projection.isTransformDirty = true;
            }
            this.scheduleRender();
        });
        let removeSyncCheck;
        if (typeof window !== "undefined" && window.MotionCheckAppearSync) {
            removeSyncCheck = window.MotionCheckAppearSync(this, key, value);
        }
        this.valueSubscriptions.set(key, ()=>{
            removeOnChange();
            if (removeSyncCheck) removeSyncCheck();
            if (value.owner) value.stop();
        });
    }
    sortNodePosition(other) {
        /**
         * If these nodes aren't even of the same type we can't compare their depth.
         */ if (!this.current || !this.sortInstanceNodePosition || this.type !== other.type) {
            return 0;
        }
        return this.sortInstanceNodePosition(this.current, other.current);
    }
    updateFeatures() {
        let key = "animation";
        for(key in featureDefinitions){
            const featureDefinition = featureDefinitions[key];
            if (!featureDefinition) continue;
            const { isEnabled, Feature: FeatureConstructor } = featureDefinition;
            /**
             * If this feature is enabled but not active, make a new instance.
             */ if (!this.features[key] && FeatureConstructor && isEnabled(this.props)) {
                this.features[key] = new FeatureConstructor(this);
            }
            /**
             * If we have a feature, mount or update it.
             */ if (this.features[key]) {
                const feature = this.features[key];
                if (feature.isMounted) {
                    feature.update();
                } else {
                    feature.mount();
                    feature.isMounted = true;
                }
            }
        }
    }
    triggerBuild() {
        this.build(this.renderState, this.latestValues, this.props);
    }
    /**
     * Measure the current viewport box with or without transforms.
     * Only measures axis-aligned boxes, rotate and skew must be manually
     * removed with a re-render to work.
     */ measureViewportBox() {
        return this.current ? this.measureInstanceViewportBox(this.current, this.props) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$geometry$2f$models$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBox"])();
    }
    getStaticValue(key) {
        return this.latestValues[key];
    }
    setStaticValue(key, value) {
        this.latestValues[key] = value;
    }
    /**
     * Update the provided props. Ensure any newly-added motion values are
     * added to our map, old ones removed, and listeners updated.
     */ update(props, presenceContext) {
        if (props.transformTemplate || this.props.transformTemplate) {
            this.scheduleRender();
        }
        this.prevProps = this.props;
        this.props = props;
        this.prevPresenceContext = this.presenceContext;
        this.presenceContext = presenceContext;
        /**
         * Update prop event handlers ie onAnimationStart, onAnimationComplete
         */ for(let i = 0; i < propEventHandlers.length; i++){
            const key = propEventHandlers[i];
            if (this.propEventSubscriptions[key]) {
                this.propEventSubscriptions[key]();
                delete this.propEventSubscriptions[key];
            }
            const listenerName = "on" + key;
            const listener = props[listenerName];
            if (listener) {
                this.propEventSubscriptions[key] = this.on(key, listener);
            }
        }
        this.prevMotionValues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$motion$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateMotionValuesFromProps"])(this, this.scrapeMotionValuesFromProps(props, this.prevProps || {}, this), this.prevMotionValues);
        if (this.handleChildMotionValue) {
            this.handleChildMotionValue();
        }
    }
    getProps() {
        return this.props;
    }
    /**
     * Returns the variant definition with a given name.
     */ getVariant(name) {
        return this.props.variants ? this.props.variants[name] : undefined;
    }
    /**
     * Returns the defined default transition on this component.
     */ getDefaultTransition() {
        return this.props.transition;
    }
    getTransformPagePoint() {
        return this.props.transformPagePoint;
    }
    getClosestVariantNode() {
        return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : undefined;
    }
    /**
     * Add a child visual element to our set of children.
     */ addVariantChild(child) {
        const closestVariantNode = this.getClosestVariantNode();
        if (closestVariantNode) {
            closestVariantNode.variantChildren && closestVariantNode.variantChildren.add(child);
            return ()=>closestVariantNode.variantChildren.delete(child);
        }
    }
    /**
     * Add a motion value and bind it to this visual element.
     */ addValue(key, value) {
        // Remove existing value if it exists
        const existingValue = this.values.get(key);
        if (value !== existingValue) {
            if (existingValue) this.removeValue(key);
            this.bindToMotionValue(key, value);
            this.values.set(key, value);
            this.latestValues[key] = value.get();
        }
    }
    /**
     * Remove a motion value and unbind any active subscriptions.
     */ removeValue(key) {
        this.values.delete(key);
        const unsubscribe = this.valueSubscriptions.get(key);
        if (unsubscribe) {
            unsubscribe();
            this.valueSubscriptions.delete(key);
        }
        delete this.latestValues[key];
        this.removeValueFromRenderState(key, this.renderState);
    }
    /**
     * Check whether we have a motion value for this key
     */ hasValue(key) {
        return this.values.has(key);
    }
    getValue(key, defaultValue) {
        if (this.props.values && this.props.values[key]) {
            return this.props.values[key];
        }
        let value = this.values.get(key);
        if (value === undefined && defaultValue !== undefined) {
            value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motionValue"])(defaultValue === null ? undefined : defaultValue, {
                owner: this
            });
            this.addValue(key, value);
        }
        return value;
    }
    /**
     * If we're trying to animate to a previously unencountered value,
     * we need to check for it in our state and as a last resort read it
     * directly from the instance (which might have performance implications).
     */ readValue(key, target) {
        let value = this.latestValues[key] !== undefined || !this.current ? this.latestValues[key] : this.getBaseTargetFromProps(this.props, key) ?? this.readValueFromInstance(this.current, key, this.options);
        if (value !== undefined && value !== null) {
            if (typeof value === "string" && ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$is$2d$numerical$2d$string$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumericalString"])(value) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$is$2d$zero$2d$value$2d$string$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isZeroValueString"])(value))) {
                // If this is a number read as a string, ie "0" or "200", convert it to a number
                value = parseFloat(value);
            } else if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$find$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findValueType"])(value) && __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["complex"].test(target)) {
                value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$animatable$2d$none$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAnimatableNone"])(key, target);
            }
            this.setBaseTarget(key, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(value) ? value.get() : value);
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(value) ? value.get() : value;
    }
    /**
     * Set the base target to later animate back to. This is currently
     * only hydrated on creation and when we first read a value.
     */ setBaseTarget(key, value) {
        this.baseTarget[key] = value;
    }
    /**
     * Find the base target for a value thats been removed from all animation
     * props.
     */ getBaseTarget(key) {
        const { initial } = this.props;
        let valueFromInitial;
        if (typeof initial === "string" || typeof initial === "object") {
            const variant = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$resolve$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveVariantFromProps"])(this.props, initial, this.presenceContext?.custom);
            if (variant) {
                valueFromInitial = variant[key];
            }
        }
        /**
         * If this value still exists in the current initial variant, read that.
         */ if (initial && valueFromInitial !== undefined) {
            return valueFromInitial;
        }
        /**
         * Alternatively, if this VisualElement config has defined a getBaseTarget
         * so we can read the value from an alternative source, try that.
         */ const target = this.getBaseTargetFromProps(this.props, key);
        if (target !== undefined && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(target)) return target;
        /**
         * If the value was initially defined on initial, but it doesn't any more,
         * return undefined. Otherwise return the value as initially read from the DOM.
         */ return this.initialValues[key] !== undefined && valueFromInitial === undefined ? undefined : this.baseTarget[key];
    }
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$subscription$2d$manager$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubscriptionManager"]();
        }
        return this.events[eventName].add(callback);
    }
    notify(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].notify(...args);
        }
    }
    scheduleRenderMicrotask() {
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$microtask$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["microtask"].render(this.render);
    }
}
;
 //# sourceMappingURL=VisualElement.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/motion/features/definitions.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getInitializedFeatureDefinitions",
    ()=>getInitializedFeatureDefinitions,
    "initFeatureDefinitions",
    ()=>initFeatureDefinitions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$VisualElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/VisualElement.mjs [app-client] (ecmascript)");
;
const featureProps = {
    animation: [
        "animate",
        "variants",
        "whileHover",
        "whileTap",
        "exit",
        "whileInView",
        "whileFocus",
        "whileDrag"
    ],
    exit: [
        "exit"
    ],
    drag: [
        "drag",
        "dragControls"
    ],
    focus: [
        "whileFocus"
    ],
    hover: [
        "whileHover",
        "onHoverStart",
        "onHoverEnd"
    ],
    tap: [
        "whileTap",
        "onTap",
        "onTapStart",
        "onTapCancel"
    ],
    pan: [
        "onPan",
        "onPanStart",
        "onPanSessionStart",
        "onPanEnd"
    ],
    inView: [
        "whileInView",
        "onViewportEnter",
        "onViewportLeave"
    ],
    layout: [
        "layout",
        "layoutId"
    ]
};
let isInitialized = false;
/**
 * Initialize feature definitions with isEnabled checks.
 * This must be called before any motion components are rendered.
 */ function initFeatureDefinitions() {
    if (isInitialized) return;
    const initialFeatureDefinitions = {};
    for(const key in featureProps){
        initialFeatureDefinitions[key] = {
            isEnabled: (props)=>featureProps[key].some((name)=>!!props[name])
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$VisualElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setFeatureDefinitions"])(initialFeatureDefinitions);
    isInitialized = true;
}
/**
 * Get the current feature definitions, initializing if needed.
 */ function getInitializedFeatureDefinitions() {
    initFeatureDefinitions();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$VisualElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFeatureDefinitions"])();
}
;
 //# sourceMappingURL=definitions.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/motion/features/load-features.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadFeatures",
    ()=>loadFeatures
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$VisualElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/VisualElement.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$definitions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/motion/features/definitions.mjs [app-client] (ecmascript)");
;
;
function loadFeatures(features) {
    const featureDefinitions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$definitions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInitializedFeatureDefinitions"])();
    for(const key in features){
        featureDefinitions[key] = {
            ...featureDefinitions[key],
            ...features[key]
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$VisualElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setFeatureDefinitions"])(featureDefinitions);
}
;
 //# sourceMappingURL=load-features.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/motion/utils/symbol.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "motionComponentSymbol",
    ()=>motionComponentSymbol
]);
const motionComponentSymbol = Symbol.for("motionComponentSymbol");
;
 //# sourceMappingURL=symbol.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMotionRef",
    ()=>useMotionRef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
/**
 * Creates a ref function that, when called, hydrates the provided
 * external ref and VisualElement.
 */ function useMotionRef(visualState, visualElement, externalRef) {
    /**
     * Store externalRef in a ref to avoid including it in the useCallback
     * dependency array. Including externalRef in dependencies causes issues
     * with libraries like Radix UI that create new callback refs on each render
     * when using asChild - this would cause the callback to be recreated,
     * triggering element remounts and breaking AnimatePresence exit animations.
     */ const externalRefContainer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(externalRef);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInsertionEffect"])({
        "useMotionRef.useInsertionEffect": ()=>{
            externalRefContainer.current = externalRef;
        }
    }["useMotionRef.useInsertionEffect"]);
    // Store cleanup function returned by callback refs (React 19 feature)
    const refCleanup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMotionRef.useCallback": (instance)=>{
            if (instance) {
                visualState.onMount?.(instance);
            }
            const ref = externalRefContainer.current;
            if (typeof ref === "function") {
                if (instance) {
                    const cleanup = ref(instance);
                    if (typeof cleanup === "function") {
                        refCleanup.current = cleanup;
                    }
                } else if (refCleanup.current) {
                    refCleanup.current();
                    refCleanup.current = null;
                } else {
                    ref(instance);
                }
            } else if (ref) {
                ref.current = instance;
            }
            if (visualElement) {
                instance ? visualElement.mount(instance) : visualElement.unmount();
            }
        }
    }["useMotionRef.useCallback"], [
        visualElement
    ]);
}
;
 //# sourceMappingURL=use-motion-ref.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/dom/utils/camel-to-dash.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "camelToDash",
    ()=>camelToDash
]);
function camelToDash(str) {
    return str.replace(/([A-Z])/g, (match)=>`-${match.toLowerCase()}`);
}
;
 //# sourceMappingURL=camel-to-dash.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/optimized-appear/data-id.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "optimizedAppearDataAttribute",
    ()=>optimizedAppearDataAttribute,
    "optimizedAppearDataId",
    ()=>optimizedAppearDataId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$camel$2d$to$2d$dash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/render/dom/utils/camel-to-dash.mjs [app-client] (ecmascript)");
;
const optimizedAppearDataId = "framerAppearId";
const optimizedAppearDataAttribute = "data-" + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$camel$2d$to$2d$dash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["camelToDash"])(optimizedAppearDataId);
;
 //# sourceMappingURL=data-id.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SwitchLayoutGroupContext",
    ()=>SwitchLayoutGroupContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
/**
 * Internal, exported only for usage in Framer
 */ const SwitchLayoutGroupContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({});
;
 //# sourceMappingURL=SwitchLayoutGroupContext.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/utils/is-ref-object.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isRefObject",
    ()=>isRefObject
]);
function isRefObject(ref) {
    return ref && typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}
;
 //# sourceMappingURL=is-ref-object.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/utils/is-browser.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isBrowser",
    ()=>isBrowser
]);
const isBrowser = typeof window !== "undefined";
;
 //# sourceMappingURL=is-browser.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIsomorphicLayoutEffect",
    ()=>useIsomorphicLayoutEffect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$is$2d$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/utils/is-browser.mjs [app-client] (ecmascript)");
"use client";
;
;
const useIsomorphicLayoutEffect = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$is$2d$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBrowser"] ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"] : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"];
;
 //# sourceMappingURL=use-isomorphic-effect.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useVisualElement",
    ()=>useVisualElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$optimized$2d$appear$2f$data$2d$id$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/animation/optimized-appear/data-id.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$LazyContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/context/LazyContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionConfigContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/context/MotionContext/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$PresenceContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/context/PresenceContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$SwitchLayoutGroupContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$is$2d$ref$2d$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/utils/is-ref-object.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$isomorphic$2d$effect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
function useVisualElement(Component, visualState, props, createVisualElement, ProjectionNodeConstructor, isSVG) {
    const { visualElement: parent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionContext"]);
    const lazyContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$LazyContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LazyContext"]);
    const presenceContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$PresenceContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresenceContext"]);
    const motionConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionConfigContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionConfigContext"]);
    const reducedMotionConfig = motionConfig.reducedMotion;
    const skipAnimations = motionConfig.skipAnimations;
    const visualElementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    /**
     * Track whether the component has been through React's commit phase.
     * Used to detect when LazyMotion features load after the component has mounted.
     */ const hasMountedOnce = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    /**
     * If we haven't preloaded a renderer, check to see if we have one lazy-loaded
     */ createVisualElement = createVisualElement || lazyContext.renderer;
    if (!visualElementRef.current && createVisualElement) {
        visualElementRef.current = createVisualElement(Component, {
            visualState,
            parent,
            props,
            presenceContext,
            blockInitialAnimation: presenceContext ? presenceContext.initial === false : false,
            reducedMotionConfig,
            skipAnimations,
            isSVG
        });
        /**
         * If the component has already mounted before features loaded (e.g. via
         * LazyMotion with async feature loading), we need to force the initial
         * animation to run. Otherwise state changes that occurred before features
         * loaded will be lost and the element will snap to its final state.
         */ if (hasMountedOnce.current && visualElementRef.current) {
            visualElementRef.current.manuallyAnimateOnMount = true;
        }
    }
    const visualElement = visualElementRef.current;
    /**
     * Load Motion gesture and animation features. These are rendered as renderless
     * components so each feature can optionally make use of React lifecycle methods.
     */ const initialLayoutGroupConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$SwitchLayoutGroupContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwitchLayoutGroupContext"]);
    if (visualElement && !visualElement.projection && ProjectionNodeConstructor && (visualElement.type === "html" || visualElement.type === "svg")) {
        createProjectionNode(visualElementRef.current, props, ProjectionNodeConstructor, initialLayoutGroupConfig);
    }
    const isMounted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInsertionEffect"])({
        "useVisualElement.useInsertionEffect": ()=>{
            /**
         * Check the component has already mounted before calling
         * `update` unnecessarily. This ensures we skip the initial update.
         */ if (visualElement && isMounted.current) {
                visualElement.update(props, presenceContext);
            }
        }
    }["useVisualElement.useInsertionEffect"]);
    /**
     * Cache this value as we want to know whether HandoffAppearAnimations
     * was present on initial render - it will be deleted after this.
     */ const optimisedAppearId = props[__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$optimized$2d$appear$2f$data$2d$id$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["optimizedAppearDataAttribute"]];
    const wantsHandoff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(Boolean(optimisedAppearId) && typeof window !== "undefined" && !window.MotionHandoffIsComplete?.(optimisedAppearId) && window.MotionHasOptimisedAnimation?.(optimisedAppearId));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$isomorphic$2d$effect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])({
        "useVisualElement.useIsomorphicLayoutEffect": ()=>{
            /**
         * Track that this component has mounted. This is used to detect when
         * LazyMotion features load after the component has already committed.
         */ hasMountedOnce.current = true;
            if (!visualElement) return;
            isMounted.current = true;
            window.MotionIsMounted = true;
            visualElement.updateFeatures();
            visualElement.scheduleRenderMicrotask();
            /**
         * Ideally this function would always run in a useEffect.
         *
         * However, if we have optimised appear animations to handoff from,
         * it needs to happen synchronously to ensure there's no flash of
         * incorrect styles in the event of a hydration error.
         *
         * So if we detect a situtation where optimised appear animations
         * are running, we use useLayoutEffect to trigger animations.
         */ if (wantsHandoff.current && visualElement.animationState) {
                visualElement.animationState.animateChanges();
            }
        }
    }["useVisualElement.useIsomorphicLayoutEffect"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useVisualElement.useEffect": ()=>{
            if (!visualElement) return;
            if (!wantsHandoff.current && visualElement.animationState) {
                visualElement.animationState.animateChanges();
            }
            if (wantsHandoff.current) {
                // This ensures all future calls to animateChanges() in this component will run in useEffect
                queueMicrotask({
                    "useVisualElement.useEffect": ()=>{
                        window.MotionHandoffMarkAsComplete?.(optimisedAppearId);
                    }
                }["useVisualElement.useEffect"]);
                wantsHandoff.current = false;
            }
            /**
         * Now we've finished triggering animations for this element we
         * can wipe the enteringChildren set for the next render.
         */ visualElement.enteringChildren = undefined;
        }
    }["useVisualElement.useEffect"]);
    return visualElement;
}
function createProjectionNode(visualElement, props, ProjectionNodeConstructor, initialPromotionConfig) {
    const { layoutId, layout, drag, dragConstraints, layoutScroll, layoutRoot, layoutCrossfade } = props;
    visualElement.projection = new ProjectionNodeConstructor(visualElement.latestValues, props["data-framer-portal-id"] ? undefined : getClosestProjectingNode(visualElement.parent));
    visualElement.projection.setOptions({
        layoutId,
        layout,
        alwaysMeasureLayout: Boolean(drag) || dragConstraints && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$is$2d$ref$2d$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRefObject"])(dragConstraints),
        visualElement,
        /**
         * TODO: Update options in an effect. This could be tricky as it'll be too late
         * to update by the time layout animations run.
         * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
         * ensuring it gets called if there's no potential layout animations.
         *
         */ animationType: typeof layout === "string" ? layout : "both",
        initialPromotionConfig,
        crossfade: layoutCrossfade,
        layoutScroll,
        layoutRoot
    });
}
function getClosestProjectingNode(visualElement) {
    if (!visualElement) return undefined;
    return visualElement.options.allowProjection !== false ? visualElement.projection : getClosestProjectingNode(visualElement.parent);
}
;
 //# sourceMappingURL=use-visual-element.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/motion/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createMotionComponent",
    ()=>createMotionComponent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-utils/dist/es/errors.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$LayoutGroupContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$LazyContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/context/LazyContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionConfigContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/context/MotionContext/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$create$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/context/MotionContext/create.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$use$2d$render$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/render/dom/use-render.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$is$2d$svg$2d$component$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$use$2d$html$2d$visual$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/render/html/use-html-visual-state.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$use$2d$svg$2d$visual$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/render/svg/use-svg-visual-state.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$definitions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/motion/features/definitions.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$load$2d$features$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/motion/features/load-features.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$symbol$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/motion/utils/symbol.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$use$2d$motion$2d$ref$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$use$2d$visual$2d$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
/**
 * Create a `motion` component.
 *
 * This function accepts a Component argument, which can be either a string (ie "div"
 * for `motion.div`), or an actual React component.
 *
 * Alongside this is a config option which provides a way of rendering the provided
 * component "offline", or outside the React render cycle.
 */ function createMotionComponent(Component, { forwardMotionProps = false, type } = {}, preloadedFeatures, createVisualElement) {
    preloadedFeatures && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$load$2d$features$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadFeatures"])(preloadedFeatures);
    /**
     * Determine whether to use SVG or HTML rendering based on:
     * 1. Explicit `type` option (highest priority)
     * 2. Auto-detection via `isSVGComponent`
     */ const isSVG = type ? type === "svg" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$is$2d$svg$2d$component$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSVGComponent"])(Component);
    const useVisualState = isSVG ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$use$2d$svg$2d$visual$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSVGVisualState"] : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$use$2d$html$2d$visual$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHTMLVisualState"];
    function MotionDOMComponent(props, externalRef) {
        /**
         * If we need to measure the element we load this functionality in a
         * separate class component in order to gain access to getSnapshotBeforeUpdate.
         */ let MeasureLayout;
        const configAndProps = {
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionConfigContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionConfigContext"]),
            ...props,
            layoutId: useLayoutId(props)
        };
        const { isStatic } = configAndProps;
        const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$create$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateMotionContext"])(props);
        const visualState = useVisualState(props, isStatic);
        if (!isStatic && typeof window !== "undefined") {
            useStrictMode(configAndProps, preloadedFeatures);
            const layoutProjection = getProjectionFunctionality(configAndProps);
            MeasureLayout = layoutProjection.MeasureLayout;
            /**
             * Create a VisualElement for this component. A VisualElement provides a common
             * interface to renderer-specific APIs (ie DOM/Three.js etc) as well as
             * providing a way of rendering to these APIs outside of the React render loop
             * for more performant animations and interactions
             */ context.visualElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$use$2d$visual$2d$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVisualElement"])(Component, visualState, configAndProps, createVisualElement, layoutProjection.ProjectionNode, isSVG);
        }
        /**
         * The mount order and hierarchy is specific to ensure our element ref
         * is hydrated by the time features fire their effects.
         */ return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionContext"].Provider, {
            value: context,
            children: [
                MeasureLayout && context.visualElement ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(MeasureLayout, {
                    visualElement: context.visualElement,
                    ...configAndProps
                }) : null,
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$use$2d$render$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRender"])(Component, props, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$use$2d$motion$2d$ref$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionRef"])(visualState, context.visualElement, externalRef), visualState, isStatic, forwardMotionProps, isSVG)
            ]
        });
    }
    MotionDOMComponent.displayName = `motion.${typeof Component === "string" ? Component : `create(${Component.displayName ?? Component.name ?? ""})`}`;
    const ForwardRefMotionComponent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(MotionDOMComponent);
    ForwardRefMotionComponent[__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$symbol$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motionComponentSymbol"]] = Component;
    return ForwardRefMotionComponent;
}
function useLayoutId({ layoutId }) {
    const layoutGroupId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$LayoutGroupContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LayoutGroupContext"]).id;
    return layoutGroupId && layoutId !== undefined ? layoutGroupId + "-" + layoutId : layoutId;
}
function useStrictMode(configAndProps, preloadedFeatures) {
    const isStrict = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$LazyContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LazyContext"]).strict;
    /**
     * If we're in development mode, check to make sure we're not rendering a motion component
     * as a child of LazyMotion, as this will break the file-size benefits of using it.
     */ if (("TURBOPACK compile-time value", "development") !== "production" && preloadedFeatures && isStrict) {
        const strictMessage = "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
        configAndProps.ignoreStrict ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["warning"])(false, strictMessage, "lazy-strict-mode") : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["invariant"])(false, strictMessage, "lazy-strict-mode");
    }
}
function getProjectionFunctionality(props) {
    const featureDefinitions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$definitions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInitializedFeatureDefinitions"])();
    const { drag, layout } = featureDefinitions;
    if (!drag && !layout) return {};
    const combined = {
        ...drag,
        ...layout
    };
    return {
        MeasureLayout: drag?.isEnabled(props) || layout?.isEnabled(props) ? combined.MeasureLayout : undefined,
        ProjectionNode: combined.ProjectionNode
    };
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/projection/node/state.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "globalProjectionState",
    ()=>globalProjectionState
]);
/**
 * This should only ever be modified on the client otherwise it'll
 * persist through server requests. If we need instanced states we
 * could lazy-init via root.
 */ const globalProjectionState = {
    /**
     * Global flag as to whether the tree has animated since the last time
     * we resized the window
     */ hasAnimatedSinceResize: true,
    /**
     * We set this to true once, on the first update. Any nodes added to the tree beyond that
     * update will be given a `data-projection-id` attribute.
     */ hasEverUpdated: false
};
;
 //# sourceMappingURL=state.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isPresent",
    ()=>isPresent,
    "useIsPresent",
    ()=>useIsPresent,
    "usePresence",
    ()=>usePresence
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$PresenceContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/context/PresenceContext.mjs [app-client] (ecmascript)");
"use client";
;
;
/**
 * When a component is the child of `AnimatePresence`, it can use `usePresence`
 * to access information about whether it's still present in the React tree.
 *
 * ```jsx
 * import { usePresence } from "framer-motion"
 *
 * export const Component = () => {
 *   const [isPresent, safeToRemove] = usePresence()
 *
 *   useEffect(() => {
 *     !isPresent && setTimeout(safeToRemove, 1000)
 *   }, [isPresent])
 *
 *   return <div />
 * }
 * ```
 *
 * If `isPresent` is `false`, it means that a component has been removed from the tree,
 * but `AnimatePresence` won't really remove it until `safeToRemove` has been called.
 *
 * @public
 */ function usePresence(subscribe = true) {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$PresenceContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresenceContext"]);
    if (context === null) return [
        true,
        null
    ];
    const { isPresent, onExitComplete, register } = context;
    // It's safe to call the following hooks conditionally (after an early return) because the context will always
    // either be null or non-null for the lifespan of the component.
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePresence.useEffect": ()=>{
            if (subscribe) {
                return register(id);
            }
        }
    }["usePresence.useEffect"], [
        subscribe
    ]);
    const safeToRemove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePresence.useCallback[safeToRemove]": ()=>subscribe && onExitComplete && onExitComplete(id)
    }["usePresence.useCallback[safeToRemove]"], [
        id,
        onExitComplete,
        subscribe
    ]);
    return !isPresent && onExitComplete ? [
        false,
        safeToRemove
    ] : [
        true
    ];
}
/**
 * Similar to `usePresence`, except `useIsPresent` simply returns whether or not the component is present.
 * There is no `safeToRemove` function.
 *
 * ```jsx
 * import { useIsPresent } from "framer-motion"
 *
 * export const Component = () => {
 *   const isPresent = useIsPresent()
 *
 *   useEffect(() => {
 *     !isPresent && console.log("I've been removed!")
 *   }, [isPresent])
 *
 *   return <div />
 * }
 * ```
 *
 * @public
 */ function useIsPresent() {
    return isPresent((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$PresenceContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresenceContext"]));
}
function isPresent(context) {
    return context === null ? true : context.isPresent;
}
;
 //# sourceMappingURL=use-presence.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MeasureLayout",
    ()=>MeasureLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$node$2f$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/projection/node/state.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/frameloop/frame.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$microtask$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/motion-dom/dist/es/frameloop/microtask.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$use$2d$presence$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$LayoutGroupContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$SwitchLayoutGroupContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
/**
 * Track whether we've taken any snapshots yet. If not,
 * we can safely skip notification of didUpdate.
 *
 * Difficult to capture in a test but to prevent flickering
 * we must set this to true either on update or unmount.
 * Running `next-env/layout-id` in Safari will show this behaviour if broken.
 */ let hasTakenAnySnapshot = false;
class MeasureLayoutWithContext extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Component"] {
    /**
     * This only mounts projection nodes for components that
     * need measuring, we might want to do it for all components
     * in order to incorporate transforms
     */ componentDidMount() {
        const { visualElement, layoutGroup, switchLayoutGroup, layoutId } = this.props;
        const { projection } = visualElement;
        if (projection) {
            if (layoutGroup.group) layoutGroup.group.add(projection);
            if (switchLayoutGroup && switchLayoutGroup.register && layoutId) {
                switchLayoutGroup.register(projection);
            }
            if (hasTakenAnySnapshot) {
                projection.root.didUpdate();
            }
            projection.addEventListener("animationComplete", ()=>{
                this.safeToRemove();
            });
            projection.setOptions({
                ...projection.options,
                layoutDependency: this.props.layoutDependency,
                onExitComplete: ()=>this.safeToRemove()
            });
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$node$2f$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globalProjectionState"].hasEverUpdated = true;
    }
    getSnapshotBeforeUpdate(prevProps) {
        const { layoutDependency, visualElement, drag, isPresent } = this.props;
        const { projection } = visualElement;
        if (!projection) return null;
        /**
         * TODO: We use this data in relegate to determine whether to
         * promote a previous element. There's no guarantee its presence data
         * will have updated by this point - if a bug like this arises it will
         * have to be that we markForRelegation and then find a new lead some other way,
         * perhaps in didUpdate
         */ projection.isPresent = isPresent;
        if (prevProps.layoutDependency !== layoutDependency) {
            projection.setOptions({
                ...projection.options,
                layoutDependency
            });
        }
        hasTakenAnySnapshot = true;
        if (drag || prevProps.layoutDependency !== layoutDependency || layoutDependency === undefined || prevProps.isPresent !== isPresent) {
            projection.willUpdate();
        } else {
            this.safeToRemove();
        }
        if (prevProps.isPresent !== isPresent) {
            if (isPresent) {
                projection.promote();
            } else if (!projection.relegate()) {
                /**
                 * If there's another stack member taking over from this one,
                 * it's in charge of the exit animation and therefore should
                 * be in charge of the safe to remove. Otherwise we call it here.
                 */ __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frame"].postRender(()=>{
                    const stack = projection.getStack();
                    if (!stack || !stack.members.length) {
                        this.safeToRemove();
                    }
                });
            }
        }
        return null;
    }
    componentDidUpdate() {
        const { projection } = this.props.visualElement;
        if (projection) {
            projection.root.didUpdate();
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$microtask$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["microtask"].postRender(()=>{
                if (!projection.currentAnimation && projection.isLead()) {
                    this.safeToRemove();
                }
            });
        }
    }
    componentWillUnmount() {
        const { visualElement, layoutGroup, switchLayoutGroup: promoteContext } = this.props;
        const { projection } = visualElement;
        hasTakenAnySnapshot = true;
        if (projection) {
            projection.scheduleCheckAfterUnmount();
            if (layoutGroup && layoutGroup.group) layoutGroup.group.remove(projection);
            if (promoteContext && promoteContext.deregister) promoteContext.deregister(projection);
        }
    }
    safeToRemove() {
        const { safeToRemove } = this.props;
        safeToRemove && safeToRemove();
    }
    render() {
        return null;
    }
}
function MeasureLayout(props) {
    const [isPresent, safeToRemove] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$use$2d$presence$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePresence"])();
    const layoutGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$LayoutGroupContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LayoutGroupContext"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(MeasureLayoutWithContext, {
        ...props,
        layoutGroup: layoutGroup,
        switchLayoutGroup: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$SwitchLayoutGroupContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwitchLayoutGroupContext"]),
        isPresent: isPresent,
        safeToRemove: safeToRemove
    });
}
;
 //# sourceMappingURL=MeasureLayout.mjs.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/side-effect.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return SideEffect;
    }
});
const _react = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
const isServer = typeof window === 'undefined';
const useClientOnlyLayoutEffect = isServer ? ()=>{} : _react.useLayoutEffect;
const useClientOnlyEffect = isServer ? ()=>{} : _react.useEffect;
function SideEffect(props) {
    const { headManager, reduceComponentsToState } = props;
    function emitChange() {
        if (headManager && headManager.mountedInstances) {
            const headElements = _react.Children.toArray(Array.from(headManager.mountedInstances).filter(Boolean));
            headManager.updateHead(reduceComponentsToState(headElements));
        }
    }
    if (isServer) {
        headManager?.mountedInstances?.add(props.children);
        emitChange();
    }
    useClientOnlyLayoutEffect({
        "SideEffect.useClientOnlyLayoutEffect": ()=>{
            headManager?.mountedInstances?.add(props.children);
            return ({
                "SideEffect.useClientOnlyLayoutEffect": ()=>{
                    headManager?.mountedInstances?.delete(props.children);
                }
            })["SideEffect.useClientOnlyLayoutEffect"];
        }
    }["SideEffect.useClientOnlyLayoutEffect"]);
    // We need to call `updateHead` method whenever the `SideEffect` is trigger in all
    // life-cycles: mount, update, unmount. However, if there are multiple `SideEffect`s
    // being rendered, we only trigger the method from the last one.
    // This is ensured by keeping the last unflushed `updateHead` in the `_pendingUpdate`
    // singleton in the layout effect pass, and actually trigger it in the effect pass.
    useClientOnlyLayoutEffect({
        "SideEffect.useClientOnlyLayoutEffect": ()=>{
            if (headManager) {
                headManager._pendingUpdate = emitChange;
            }
            return ({
                "SideEffect.useClientOnlyLayoutEffect": ()=>{
                    if (headManager) {
                        headManager._pendingUpdate = emitChange;
                    }
                }
            })["SideEffect.useClientOnlyLayoutEffect"];
        }
    }["SideEffect.useClientOnlyLayoutEffect"]);
    useClientOnlyEffect({
        "SideEffect.useClientOnlyEffect": ()=>{
            if (headManager && headManager._pendingUpdate) {
                headManager._pendingUpdate();
                headManager._pendingUpdate = null;
            }
            return ({
                "SideEffect.useClientOnlyEffect": ()=>{
                    if (headManager && headManager._pendingUpdate) {
                        headManager._pendingUpdate();
                        headManager._pendingUpdate = null;
                    }
                }
            })["SideEffect.useClientOnlyEffect"];
        }
    }["SideEffect.useClientOnlyEffect"]);
    return null;
} //# sourceMappingURL=side-effect.js.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/head.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    defaultHead: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return _default;
    },
    defaultHead: function() {
        return defaultHead;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _interop_require_wildcard = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _sideeffect = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/side-effect.js [app-client] (ecmascript)"));
const _headmanagercontextsharedruntime = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/head-manager-context.shared-runtime.js [app-client] (ecmascript)");
const _warnonce = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
function defaultHead() {
    const head = [
        /*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            charSet: "utf-8"
        }, "charset"),
        /*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            name: "viewport",
            content: "width=device-width"
        }, "viewport")
    ];
    return head;
}
function onlyReactElement(list, child) {
    // React children can be "string" or "number" in this case we ignore them for backwards compat
    if (typeof child === 'string' || typeof child === 'number') {
        return list;
    }
    // Adds support for React.Fragment
    if (child.type === _react.default.Fragment) {
        return list.concat(_react.default.Children.toArray(child.props.children).reduce((fragmentList, fragmentChild)=>{
            if (typeof fragmentChild === 'string' || typeof fragmentChild === 'number') {
                return fragmentList;
            }
            return fragmentList.concat(fragmentChild);
        }, []));
    }
    return list.concat(child);
}
const METATYPES = [
    'name',
    'httpEquiv',
    'charSet',
    'itemProp'
];
/*
 returns a function for filtering head child elements
 which shouldn't be duplicated, like <title/>
 Also adds support for deduplicated `key` properties
*/ function unique() {
    const keys = new Set();
    const tags = new Set();
    const metaTypes = new Set();
    const metaCategories = {};
    return (h)=>{
        let isUnique = true;
        let hasKey = false;
        if (h.key && typeof h.key !== 'number' && h.key.indexOf('$') > 0) {
            hasKey = true;
            const key = h.key.slice(h.key.indexOf('$') + 1);
            if (keys.has(key)) {
                isUnique = false;
            } else {
                keys.add(key);
            }
        }
        // eslint-disable-next-line default-case
        switch(h.type){
            case 'title':
            case 'base':
                if (tags.has(h.type)) {
                    isUnique = false;
                } else {
                    tags.add(h.type);
                }
                break;
            case 'meta':
                for(let i = 0, len = METATYPES.length; i < len; i++){
                    const metatype = METATYPES[i];
                    if (!h.props.hasOwnProperty(metatype)) continue;
                    if (metatype === 'charSet') {
                        if (metaTypes.has(metatype)) {
                            isUnique = false;
                        } else {
                            metaTypes.add(metatype);
                        }
                    } else {
                        const category = h.props[metatype];
                        const categories = metaCategories[metatype] || new Set();
                        if ((metatype !== 'name' || !hasKey) && categories.has(category)) {
                            isUnique = false;
                        } else {
                            categories.add(category);
                            metaCategories[metatype] = categories;
                        }
                    }
                }
                break;
        }
        return isUnique;
    };
}
/**
 *
 * @param headChildrenElements List of children of <Head>
 */ function reduceComponents(headChildrenElements) {
    return headChildrenElements.reduce(onlyReactElement, []).reverse().concat(defaultHead().reverse()).filter(unique()).reverse().map((c, i)=>{
        const key = c.key || i;
        if ("TURBOPACK compile-time truthy", 1) {
            // omit JSON-LD structured data snippets from the warning
            if (c.type === 'script' && c.props['type'] !== 'application/ld+json') {
                const srcMessage = c.props['src'] ? `<script> tag with src="${c.props['src']}"` : `inline <script>`;
                (0, _warnonce.warnOnce)(`Do not add <script> tags using next/head (see ${srcMessage}). Use next/script instead. \nSee more info here: https://nextjs.org/docs/messages/no-script-tags-in-head-component`);
            } else if (c.type === 'link' && c.props['rel'] === 'stylesheet') {
                (0, _warnonce.warnOnce)(`Do not add stylesheets using next/head (see <link rel="stylesheet"> tag with href="${c.props['href']}"). Use Document instead. \nSee more info here: https://nextjs.org/docs/messages/no-stylesheets-in-head-component`);
            }
        }
        return /*#__PURE__*/ _react.default.cloneElement(c, {
            key
        });
    });
}
/**
 * This component injects elements to `<head>` of your page.
 * To avoid duplicated `tags` in `<head>` you can use the `key` property, which will make sure every tag is only rendered once.
 */ function Head({ children }) {
    const headManager = (0, _react.useContext)(_headmanagercontextsharedruntime.HeadManagerContext);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_sideeffect.default, {
        reduceComponentsToState: reduceComponents,
        headManager: headManager,
        children: children
    });
}
const _default = Head;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=head.js.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/image-blur-svg.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * A shared function, used on both client and server, to generate a SVG blur placeholder.
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getImageBlurSvg", {
    enumerable: true,
    get: function() {
        return getImageBlurSvg;
    }
});
function getImageBlurSvg({ widthInt, heightInt, blurWidth, blurHeight, blurDataURL, objectFit }) {
    const std = 20;
    const svgWidth = blurWidth ? blurWidth * 40 : widthInt;
    const svgHeight = blurHeight ? blurHeight * 40 : heightInt;
    const viewBox = svgWidth && svgHeight ? `viewBox='0 0 ${svgWidth} ${svgHeight}'` : '';
    const preserveAspectRatio = viewBox ? 'none' : objectFit === 'contain' ? 'xMidYMid' : objectFit === 'cover' ? 'xMidYMid slice' : 'none';
    return `%3Csvg xmlns='http://www.w3.org/2000/svg' ${viewBox}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='${std}'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='${std}'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${preserveAspectRatio}' style='filter: url(%23b);' href='${blurDataURL}'/%3E%3C/svg%3E`;
} //# sourceMappingURL=image-blur-svg.js.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/image-config.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    VALID_LOADERS: null,
    imageConfigDefault: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    VALID_LOADERS: function() {
        return VALID_LOADERS;
    },
    imageConfigDefault: function() {
        return imageConfigDefault;
    }
});
const VALID_LOADERS = [
    'default',
    'imgix',
    'cloudinary',
    'akamai',
    'custom'
];
const imageConfigDefault = {
    deviceSizes: [
        640,
        750,
        828,
        1080,
        1200,
        1920,
        2048,
        3840
    ],
    imageSizes: [
        32,
        48,
        64,
        96,
        128,
        256,
        384
    ],
    path: '/_next/image',
    loader: 'default',
    loaderFile: '',
    /**
   * @deprecated Use `remotePatterns` instead to protect your application from malicious users.
   */ domains: [],
    disableStaticImages: false,
    minimumCacheTTL: 14400,
    formats: [
        'image/webp'
    ],
    maximumRedirects: 3,
    maximumResponseBody: 50000000,
    dangerouslyAllowLocalIP: false,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: `script-src 'none'; frame-src 'none'; sandbox;`,
    contentDispositionType: 'attachment',
    localPatterns: undefined,
    remotePatterns: [],
    qualities: [
        75
    ],
    unoptimized: false
}; //# sourceMappingURL=image-config.js.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/get-img-props.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getImgProps", {
    enumerable: true,
    get: function() {
        return getImgProps;
    }
});
const _warnonce = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
const _deploymentid = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/deployment-id.js [app-client] (ecmascript)");
const _imageblursvg = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/image-blur-svg.js [app-client] (ecmascript)");
const _imageconfig = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/image-config.js [app-client] (ecmascript)");
const VALID_LOADING_VALUES = [
    'lazy',
    'eager',
    undefined
];
// Object-fit values that are not valid background-size values
const INVALID_BACKGROUND_SIZE_VALUES = [
    '-moz-initial',
    'fill',
    'none',
    'scale-down',
    undefined
];
function isStaticRequire(src) {
    return src.default !== undefined;
}
function isStaticImageData(src) {
    return src.src !== undefined;
}
function isStaticImport(src) {
    return !!src && typeof src === 'object' && (isStaticRequire(src) || isStaticImageData(src));
}
const allImgs = new Map();
let perfObserver;
function getInt(x) {
    if (typeof x === 'undefined') {
        return x;
    }
    if (typeof x === 'number') {
        return Number.isFinite(x) ? x : NaN;
    }
    if (typeof x === 'string' && /^[0-9]+$/.test(x)) {
        return parseInt(x, 10);
    }
    return NaN;
}
function getWidths({ deviceSizes, allSizes }, width, sizes) {
    if (sizes) {
        // Find all the "vw" percent sizes used in the sizes prop
        const viewportWidthRe = /(^|\s)(1?\d?\d)vw/g;
        const percentSizes = [];
        for(let match; match = viewportWidthRe.exec(sizes); match){
            percentSizes.push(parseInt(match[2]));
        }
        if (percentSizes.length) {
            const smallestRatio = Math.min(...percentSizes) * 0.01;
            return {
                widths: allSizes.filter((s)=>s >= deviceSizes[0] * smallestRatio),
                kind: 'w'
            };
        }
        return {
            widths: allSizes,
            kind: 'w'
        };
    }
    if (typeof width !== 'number') {
        return {
            widths: deviceSizes,
            kind: 'w'
        };
    }
    const widths = [
        ...new Set(// > are actually 3x in the green color, but only 1.5x in the red and
        // > blue colors. Showing a 3x resolution image in the app vs a 2x
        // > resolution image will be visually the same, though the 3x image
        // > takes significantly more data. Even true 3x resolution screens are
        // > wasteful as the human eye cannot see that level of detail without
        // > something like a magnifying glass.
        // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
        [
            width,
            width * 2 /*, width * 3*/ 
        ].map((w)=>allSizes.find((p)=>p >= w) || allSizes[allSizes.length - 1]))
    ];
    return {
        widths,
        kind: 'x'
    };
}
function generateImgAttrs({ config, src, unoptimized, width, quality, sizes, loader }) {
    if (unoptimized) {
        const deploymentId = (0, _deploymentid.getDeploymentId)();
        if (src.startsWith('/') && !src.startsWith('//') && deploymentId) {
            const sep = src.includes('?') ? '&' : '?';
            src = `${src}${sep}dpl=${deploymentId}`;
        }
        return {
            src,
            srcSet: undefined,
            sizes: undefined
        };
    }
    const { widths, kind } = getWidths(config, width, sizes);
    const last = widths.length - 1;
    return {
        sizes: !sizes && kind === 'w' ? '100vw' : sizes,
        srcSet: widths.map((w, i)=>`${loader({
                config,
                src,
                quality,
                width: w
            })} ${kind === 'w' ? w : i + 1}${kind}`).join(', '),
        // It's intended to keep `src` the last attribute because React updates
        // attributes in order. If we keep `src` the first one, Safari will
        // immediately start to fetch `src`, before `sizes` and `srcSet` are even
        // updated by React. That causes multiple unnecessary requests if `srcSet`
        // and `sizes` are defined.
        // This bug cannot be reproduced in Chrome or Firefox.
        src: loader({
            config,
            src,
            quality,
            width: widths[last]
        })
    };
}
function getImgProps({ src, sizes, unoptimized = false, priority = false, preload = false, loading, className, quality, width, height, fill = false, style, overrideSrc, onLoad, onLoadingComplete, placeholder = 'empty', blurDataURL, fetchPriority, decoding = 'async', layout, objectFit, objectPosition, lazyBoundary, lazyRoot, ...rest }, _state) {
    const { imgConf, showAltText, blurComplete, defaultLoader } = _state;
    let config;
    let c = imgConf || _imageconfig.imageConfigDefault;
    if ('allSizes' in c) {
        config = c;
    } else {
        const allSizes = [
            ...c.deviceSizes,
            ...c.imageSizes
        ].sort((a, b)=>a - b);
        const deviceSizes = c.deviceSizes.sort((a, b)=>a - b);
        const qualities = c.qualities?.sort((a, b)=>a - b);
        config = {
            ...c,
            allSizes,
            deviceSizes,
            qualities
        };
    }
    if (typeof defaultLoader === 'undefined') {
        throw Object.defineProperty(new Error('images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config'), "__NEXT_ERROR_CODE", {
            value: "E163",
            enumerable: false,
            configurable: true
        });
    }
    let loader = rest.loader || defaultLoader;
    // Remove property so it's not spread on <img> element
    delete rest.loader;
    delete rest.srcSet;
    // This special value indicates that the user
    // didn't define a "loader" prop or "loader" config.
    const isDefaultLoader = '__next_img_default' in loader;
    if (isDefaultLoader) {
        if (config.loader === 'custom') {
            throw Object.defineProperty(new Error(`Image with src "${src}" is missing "loader" prop.` + `\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader`), "__NEXT_ERROR_CODE", {
                value: "E252",
                enumerable: false,
                configurable: true
            });
        }
    } else {
        // The user defined a "loader" prop or config.
        // Since the config object is internal only, we
        // must not pass it to the user-defined "loader".
        const customImageLoader = loader;
        loader = (obj)=>{
            const { config: _, ...opts } = obj;
            return customImageLoader(opts);
        };
    }
    if (layout) {
        if (layout === 'fill') {
            fill = true;
        }
        const layoutToStyle = {
            intrinsic: {
                maxWidth: '100%',
                height: 'auto'
            },
            responsive: {
                width: '100%',
                height: 'auto'
            }
        };
        const layoutToSizes = {
            responsive: '100vw',
            fill: '100vw'
        };
        const layoutStyle = layoutToStyle[layout];
        if (layoutStyle) {
            style = {
                ...style,
                ...layoutStyle
            };
        }
        const layoutSizes = layoutToSizes[layout];
        if (layoutSizes && !sizes) {
            sizes = layoutSizes;
        }
    }
    let staticSrc = '';
    let widthInt = getInt(width);
    let heightInt = getInt(height);
    let blurWidth;
    let blurHeight;
    if (isStaticImport(src)) {
        const staticImageData = isStaticRequire(src) ? src.default : src;
        if (!staticImageData.src) {
            throw Object.defineProperty(new Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(staticImageData)}`), "__NEXT_ERROR_CODE", {
                value: "E460",
                enumerable: false,
                configurable: true
            });
        }
        if (!staticImageData.height || !staticImageData.width) {
            throw Object.defineProperty(new Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(staticImageData)}`), "__NEXT_ERROR_CODE", {
                value: "E48",
                enumerable: false,
                configurable: true
            });
        }
        blurWidth = staticImageData.blurWidth;
        blurHeight = staticImageData.blurHeight;
        blurDataURL = blurDataURL || staticImageData.blurDataURL;
        staticSrc = staticImageData.src;
        if (!fill) {
            if (!widthInt && !heightInt) {
                widthInt = staticImageData.width;
                heightInt = staticImageData.height;
            } else if (widthInt && !heightInt) {
                const ratio = widthInt / staticImageData.width;
                heightInt = Math.round(staticImageData.height * ratio);
            } else if (!widthInt && heightInt) {
                const ratio = heightInt / staticImageData.height;
                widthInt = Math.round(staticImageData.width * ratio);
            }
        }
    }
    src = typeof src === 'string' ? src : staticSrc;
    let isLazy = !priority && !preload && (loading === 'lazy' || typeof loading === 'undefined');
    if (!src || src.startsWith('data:') || src.startsWith('blob:')) {
        // https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
        unoptimized = true;
        isLazy = false;
    }
    if (config.unoptimized) {
        unoptimized = true;
    }
    if (isDefaultLoader && !config.dangerouslyAllowSVG && src.split('?', 1)[0].endsWith('.svg')) {
        // Special case to make svg serve as-is to avoid proxying
        // through the built-in Image Optimization API.
        unoptimized = true;
    }
    const qualityInt = getInt(quality);
    if ("TURBOPACK compile-time truthy", 1) {
        if (config.output === 'export' && isDefaultLoader && !unoptimized) {
            throw Object.defineProperty(new Error(`Image Optimization using the default loader is not compatible with \`{ output: 'export' }\`.
  Possible solutions:
    - Remove \`{ output: 'export' }\` and run "next start" to run server mode including the Image Optimization API.
    - Configure \`{ images: { unoptimized: true } }\` in \`next.config.js\` to disable the Image Optimization API.
  Read more: https://nextjs.org/docs/messages/export-image-api`), "__NEXT_ERROR_CODE", {
                value: "E500",
                enumerable: false,
                configurable: true
            });
        }
        if (!src) {
            // React doesn't show the stack trace and there's
            // no `src` to help identify which image, so we
            // instead console.error(ref) during mount.
            unoptimized = true;
        } else {
            if (fill) {
                if (width) {
                    throw Object.defineProperty(new Error(`Image with src "${src}" has both "width" and "fill" properties. Only one should be used.`), "__NEXT_ERROR_CODE", {
                        value: "E96",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (height) {
                    throw Object.defineProperty(new Error(`Image with src "${src}" has both "height" and "fill" properties. Only one should be used.`), "__NEXT_ERROR_CODE", {
                        value: "E115",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (style?.position && style.position !== 'absolute') {
                    throw Object.defineProperty(new Error(`Image with src "${src}" has both "fill" and "style.position" properties. Images with "fill" always use position absolute - it cannot be modified.`), "__NEXT_ERROR_CODE", {
                        value: "E216",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (style?.width && style.width !== '100%') {
                    throw Object.defineProperty(new Error(`Image with src "${src}" has both "fill" and "style.width" properties. Images with "fill" always use width 100% - it cannot be modified.`), "__NEXT_ERROR_CODE", {
                        value: "E73",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (style?.height && style.height !== '100%') {
                    throw Object.defineProperty(new Error(`Image with src "${src}" has both "fill" and "style.height" properties. Images with "fill" always use height 100% - it cannot be modified.`), "__NEXT_ERROR_CODE", {
                        value: "E404",
                        enumerable: false,
                        configurable: true
                    });
                }
            } else {
                if (typeof widthInt === 'undefined') {
                    throw Object.defineProperty(new Error(`Image with src "${src}" is missing required "width" property.`), "__NEXT_ERROR_CODE", {
                        value: "E451",
                        enumerable: false,
                        configurable: true
                    });
                } else if (isNaN(widthInt)) {
                    throw Object.defineProperty(new Error(`Image with src "${src}" has invalid "width" property. Expected a numeric value in pixels but received "${width}".`), "__NEXT_ERROR_CODE", {
                        value: "E66",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (typeof heightInt === 'undefined') {
                    throw Object.defineProperty(new Error(`Image with src "${src}" is missing required "height" property.`), "__NEXT_ERROR_CODE", {
                        value: "E397",
                        enumerable: false,
                        configurable: true
                    });
                } else if (isNaN(heightInt)) {
                    throw Object.defineProperty(new Error(`Image with src "${src}" has invalid "height" property. Expected a numeric value in pixels but received "${height}".`), "__NEXT_ERROR_CODE", {
                        value: "E444",
                        enumerable: false,
                        configurable: true
                    });
                }
                // eslint-disable-next-line no-control-regex
                if (/^[\x00-\x20]/.test(src)) {
                    throw Object.defineProperty(new Error(`Image with src "${src}" cannot start with a space or control character. Use src.trimStart() to remove it or encodeURIComponent(src) to keep it.`), "__NEXT_ERROR_CODE", {
                        value: "E176",
                        enumerable: false,
                        configurable: true
                    });
                }
                // eslint-disable-next-line no-control-regex
                if (/[\x00-\x20]$/.test(src)) {
                    throw Object.defineProperty(new Error(`Image with src "${src}" cannot end with a space or control character. Use src.trimEnd() to remove it or encodeURIComponent(src) to keep it.`), "__NEXT_ERROR_CODE", {
                        value: "E21",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
        if (!VALID_LOADING_VALUES.includes(loading)) {
            throw Object.defineProperty(new Error(`Image with src "${src}" has invalid "loading" property. Provided "${loading}" should be one of ${VALID_LOADING_VALUES.map(String).join(',')}.`), "__NEXT_ERROR_CODE", {
                value: "E357",
                enumerable: false,
                configurable: true
            });
        }
        if (priority && loading === 'lazy') {
            throw Object.defineProperty(new Error(`Image with src "${src}" has both "priority" and "loading='lazy'" properties. Only one should be used.`), "__NEXT_ERROR_CODE", {
                value: "E218",
                enumerable: false,
                configurable: true
            });
        }
        if (preload && loading === 'lazy') {
            throw Object.defineProperty(new Error(`Image with src "${src}" has both "preload" and "loading='lazy'" properties. Only one should be used.`), "__NEXT_ERROR_CODE", {
                value: "E803",
                enumerable: false,
                configurable: true
            });
        }
        if (preload && priority) {
            throw Object.defineProperty(new Error(`Image with src "${src}" has both "preload" and "priority" properties. Only "preload" should be used.`), "__NEXT_ERROR_CODE", {
                value: "E802",
                enumerable: false,
                configurable: true
            });
        }
        if (placeholder !== 'empty' && placeholder !== 'blur' && !placeholder.startsWith('data:image/')) {
            throw Object.defineProperty(new Error(`Image with src "${src}" has invalid "placeholder" property "${placeholder}".`), "__NEXT_ERROR_CODE", {
                value: "E431",
                enumerable: false,
                configurable: true
            });
        }
        if (placeholder !== 'empty') {
            if (widthInt && heightInt && widthInt * heightInt < 1600) {
                (0, _warnonce.warnOnce)(`Image with src "${src}" is smaller than 40x40. Consider removing the "placeholder" property to improve performance.`);
            }
        }
        if (qualityInt && config.qualities && !config.qualities.includes(qualityInt)) {
            (0, _warnonce.warnOnce)(`Image with src "${src}" is using quality "${qualityInt}" which is not configured in images.qualities [${config.qualities.join(', ')}]. Please update your config to [${[
                ...config.qualities,
                qualityInt
            ].sort().join(', ')}].` + `\nRead more: https://nextjs.org/docs/messages/next-image-unconfigured-qualities`);
        }
        if (placeholder === 'blur' && !blurDataURL) {
            const VALID_BLUR_EXT = [
                'jpeg',
                'png',
                'webp',
                'avif'
            ] // should match next-image-loader
            ;
            throw Object.defineProperty(new Error(`Image with src "${src}" has "placeholder='blur'" property but is missing the "blurDataURL" property.
        Possible solutions:
          - Add a "blurDataURL" property, the contents should be a small Data URL to represent the image
          - Change the "src" property to a static import with one of the supported file types: ${VALID_BLUR_EXT.join(',')} (animated images not supported)
          - Remove the "placeholder" property, effectively no blur effect
        Read more: https://nextjs.org/docs/messages/placeholder-blur-data-url`), "__NEXT_ERROR_CODE", {
                value: "E371",
                enumerable: false,
                configurable: true
            });
        }
        if ('ref' in rest) {
            (0, _warnonce.warnOnce)(`Image with src "${src}" is using unsupported "ref" property. Consider using the "onLoad" property instead.`);
        }
        if (!unoptimized && !isDefaultLoader) {
            const urlStr = loader({
                config,
                src,
                width: widthInt || 400,
                quality: qualityInt || 75
            });
            let url;
            try {
                url = new URL(urlStr);
            } catch (err) {}
            if (urlStr === src || url && url.pathname === src && !url.search) {
                (0, _warnonce.warnOnce)(`Image with src "${src}" has a "loader" property that does not implement width. Please implement it or use the "unoptimized" property instead.` + `\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader-width`);
            }
        }
        if (onLoadingComplete) {
            (0, _warnonce.warnOnce)(`Image with src "${src}" is using deprecated "onLoadingComplete" property. Please use the "onLoad" property instead.`);
        }
        for (const [legacyKey, legacyValue] of Object.entries({
            layout,
            objectFit,
            objectPosition,
            lazyBoundary,
            lazyRoot
        })){
            if (legacyValue) {
                (0, _warnonce.warnOnce)(`Image with src "${src}" has legacy prop "${legacyKey}". Did you forget to run the codemod?` + `\nRead more: https://nextjs.org/docs/messages/next-image-upgrade-to-13`);
            }
        }
        if (typeof window !== 'undefined' && !perfObserver && window.PerformanceObserver) {
            perfObserver = new PerformanceObserver((entryList)=>{
                for (const entry of entryList.getEntries()){
                    // @ts-ignore - missing "LargestContentfulPaint" class with "element" prop
                    const imgSrc = entry?.element?.src || '';
                    const lcpImage = allImgs.get(imgSrc);
                    if (lcpImage && lcpImage.loading === 'lazy' && lcpImage.placeholder === 'empty' && !lcpImage.src.startsWith('data:') && !lcpImage.src.startsWith('blob:')) {
                        // https://web.dev/lcp/#measure-lcp-in-javascript
                        (0, _warnonce.warnOnce)(`Image with src "${lcpImage.src}" was detected as the Largest Contentful Paint (LCP). Please add the \`loading="eager"\` property if this image is above the fold.` + `\nRead more: https://nextjs.org/docs/app/api-reference/components/image#loading`);
                    }
                }
            });
            try {
                perfObserver.observe({
                    type: 'largest-contentful-paint',
                    buffered: true
                });
            } catch (err) {
                // Log error but don't crash the app
                console.error(err);
            }
        }
    }
    const imgStyle = Object.assign(fill ? {
        position: 'absolute',
        height: '100%',
        width: '100%',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        objectFit,
        objectPosition
    } : {}, showAltText ? {} : {
        color: 'transparent'
    }, style);
    const backgroundImage = !blurComplete && placeholder !== 'empty' ? placeholder === 'blur' ? `url("data:image/svg+xml;charset=utf-8,${(0, _imageblursvg.getImageBlurSvg)({
        widthInt,
        heightInt,
        blurWidth,
        blurHeight,
        blurDataURL: blurDataURL || '',
        objectFit: imgStyle.objectFit
    })}")` : `url("${placeholder}")` // assume `data:image/`
     : null;
    const backgroundSize = !INVALID_BACKGROUND_SIZE_VALUES.includes(imgStyle.objectFit) ? imgStyle.objectFit : imgStyle.objectFit === 'fill' ? '100% 100%' // the background-size equivalent of `fill`
     : 'cover';
    let placeholderStyle = backgroundImage ? {
        backgroundSize,
        backgroundPosition: imgStyle.objectPosition || '50% 50%',
        backgroundRepeat: 'no-repeat',
        backgroundImage
    } : {};
    if ("TURBOPACK compile-time truthy", 1) {
        if (placeholderStyle.backgroundImage && placeholder === 'blur' && blurDataURL?.startsWith('/')) {
            // During `next dev`, we don't want to generate blur placeholders with webpack
            // because it can delay starting the dev server. Instead, `next-image-loader.js`
            // will inline a special url to lazily generate the blur placeholder at request time.
            placeholderStyle.backgroundImage = `url("${blurDataURL}")`;
        }
    }
    const imgAttributes = generateImgAttrs({
        config,
        src,
        unoptimized,
        width: widthInt,
        quality: qualityInt,
        sizes,
        loader
    });
    const loadingFinal = isLazy ? 'lazy' : loading;
    if ("TURBOPACK compile-time truthy", 1) {
        if (typeof window !== 'undefined') {
            let fullUrl;
            try {
                fullUrl = new URL(imgAttributes.src);
            } catch (e) {
                fullUrl = new URL(imgAttributes.src, window.location.href);
            }
            allImgs.set(fullUrl.href, {
                src,
                loading: loadingFinal,
                placeholder
            });
        }
    }
    const props = {
        ...rest,
        loading: loadingFinal,
        fetchPriority,
        width: widthInt,
        height: heightInt,
        decoding,
        className,
        style: {
            ...imgStyle,
            ...placeholderStyle
        },
        sizes: imgAttributes.sizes,
        srcSet: imgAttributes.srcSet,
        src: overrideSrc || imgAttributes.src
    };
    const meta = {
        unoptimized,
        preload: preload || priority,
        placeholder,
        fill
    };
    return {
        props,
        meta
    };
} //# sourceMappingURL=get-img-props.js.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/image-config-context.shared-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImageConfigContext", {
    enumerable: true,
    get: function() {
        return ImageConfigContext;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _imageconfig = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/image-config.js [app-client] (ecmascript)");
const ImageConfigContext = _react.default.createContext(_imageconfig.imageConfigDefault);
if ("TURBOPACK compile-time truthy", 1) {
    ImageConfigContext.displayName = 'ImageConfigContext';
} //# sourceMappingURL=image-config-context.shared-runtime.js.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/router-context.shared-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RouterContext", {
    enumerable: true,
    get: function() {
        return RouterContext;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const RouterContext = _react.default.createContext(null);
if ("TURBOPACK compile-time truthy", 1) {
    RouterContext.displayName = 'RouterContext';
} //# sourceMappingURL=router-context.shared-runtime.js.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/find-closest-quality.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findClosestQuality", {
    enumerable: true,
    get: function() {
        return findClosestQuality;
    }
});
function findClosestQuality(quality, config) {
    const q = quality || 75;
    if (!config?.qualities?.length) {
        return q;
    }
    return config.qualities.reduce((prev, cur)=>Math.abs(cur - q) < Math.abs(prev - q) ? cur : prev, 0);
} //# sourceMappingURL=find-closest-quality.js.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/picomatch/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
(()=>{
    "use strict";
    var t = {
        170: (t, e, u)=>{
            const n = u(510);
            const isWindows = ()=>{
                if (typeof navigator !== "undefined" && navigator.platform) {
                    const t = navigator.platform.toLowerCase();
                    return t === "win32" || t === "windows";
                }
                if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== "undefined" && __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].platform) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].platform === "win32";
                }
                return false;
            };
            function picomatch(t, e, u = false) {
                if (e && (e.windows === null || e.windows === undefined)) {
                    e = {
                        ...e,
                        windows: isWindows()
                    };
                }
                return n(t, e, u);
            }
            Object.assign(picomatch, n);
            t.exports = picomatch;
        },
        154: (t)=>{
            const e = "\\\\/";
            const u = `[^${e}]`;
            const n = "\\.";
            const o = "\\+";
            const s = "\\?";
            const r = "\\/";
            const a = "(?=.)";
            const i = "[^/]";
            const c = `(?:${r}|$)`;
            const p = `(?:^|${r})`;
            const l = `${n}{1,2}${c}`;
            const f = `(?!${n})`;
            const A = `(?!${p}${l})`;
            const _ = `(?!${n}{0,1}${c})`;
            const R = `(?!${l})`;
            const E = `[^.${r}]`;
            const h = `${i}*?`;
            const g = "/";
            const b = {
                DOT_LITERAL: n,
                PLUS_LITERAL: o,
                QMARK_LITERAL: s,
                SLASH_LITERAL: r,
                ONE_CHAR: a,
                QMARK: i,
                END_ANCHOR: c,
                DOTS_SLASH: l,
                NO_DOT: f,
                NO_DOTS: A,
                NO_DOT_SLASH: _,
                NO_DOTS_SLASH: R,
                QMARK_NO_DOT: E,
                STAR: h,
                START_ANCHOR: p,
                SEP: g
            };
            const C = {
                ...b,
                SLASH_LITERAL: `[${e}]`,
                QMARK: u,
                STAR: `${u}*?`,
                DOTS_SLASH: `${n}{1,2}(?:[${e}]|$)`,
                NO_DOT: `(?!${n})`,
                NO_DOTS: `(?!(?:^|[${e}])${n}{1,2}(?:[${e}]|$))`,
                NO_DOT_SLASH: `(?!${n}{0,1}(?:[${e}]|$))`,
                NO_DOTS_SLASH: `(?!${n}{1,2}(?:[${e}]|$))`,
                QMARK_NO_DOT: `[^.${e}]`,
                START_ANCHOR: `(?:^|[${e}])`,
                END_ANCHOR: `(?:[${e}]|$)`,
                SEP: "\\"
            };
            const y = {
                alnum: "a-zA-Z0-9",
                alpha: "a-zA-Z",
                ascii: "\\x00-\\x7F",
                blank: " \\t",
                cntrl: "\\x00-\\x1F\\x7F",
                digit: "0-9",
                graph: "\\x21-\\x7E",
                lower: "a-z",
                print: "\\x20-\\x7E ",
                punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
                space: " \\t\\r\\n\\v\\f",
                upper: "A-Z",
                word: "A-Za-z0-9_",
                xdigit: "A-Fa-f0-9"
            };
            t.exports = {
                MAX_LENGTH: 1024 * 64,
                POSIX_REGEX_SOURCE: y,
                REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
                REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
                REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
                REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
                REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
                REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
                REPLACEMENTS: {
                    "***": "*",
                    "**/**": "**",
                    "**/**/**": "**"
                },
                CHAR_0: 48,
                CHAR_9: 57,
                CHAR_UPPERCASE_A: 65,
                CHAR_LOWERCASE_A: 97,
                CHAR_UPPERCASE_Z: 90,
                CHAR_LOWERCASE_Z: 122,
                CHAR_LEFT_PARENTHESES: 40,
                CHAR_RIGHT_PARENTHESES: 41,
                CHAR_ASTERISK: 42,
                CHAR_AMPERSAND: 38,
                CHAR_AT: 64,
                CHAR_BACKWARD_SLASH: 92,
                CHAR_CARRIAGE_RETURN: 13,
                CHAR_CIRCUMFLEX_ACCENT: 94,
                CHAR_COLON: 58,
                CHAR_COMMA: 44,
                CHAR_DOT: 46,
                CHAR_DOUBLE_QUOTE: 34,
                CHAR_EQUAL: 61,
                CHAR_EXCLAMATION_MARK: 33,
                CHAR_FORM_FEED: 12,
                CHAR_FORWARD_SLASH: 47,
                CHAR_GRAVE_ACCENT: 96,
                CHAR_HASH: 35,
                CHAR_HYPHEN_MINUS: 45,
                CHAR_LEFT_ANGLE_BRACKET: 60,
                CHAR_LEFT_CURLY_BRACE: 123,
                CHAR_LEFT_SQUARE_BRACKET: 91,
                CHAR_LINE_FEED: 10,
                CHAR_NO_BREAK_SPACE: 160,
                CHAR_PERCENT: 37,
                CHAR_PLUS: 43,
                CHAR_QUESTION_MARK: 63,
                CHAR_RIGHT_ANGLE_BRACKET: 62,
                CHAR_RIGHT_CURLY_BRACE: 125,
                CHAR_RIGHT_SQUARE_BRACKET: 93,
                CHAR_SEMICOLON: 59,
                CHAR_SINGLE_QUOTE: 39,
                CHAR_SPACE: 32,
                CHAR_TAB: 9,
                CHAR_UNDERSCORE: 95,
                CHAR_VERTICAL_LINE: 124,
                CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
                extglobChars (t) {
                    return {
                        "!": {
                            type: "negate",
                            open: "(?:(?!(?:",
                            close: `))${t.STAR})`
                        },
                        "?": {
                            type: "qmark",
                            open: "(?:",
                            close: ")?"
                        },
                        "+": {
                            type: "plus",
                            open: "(?:",
                            close: ")+"
                        },
                        "*": {
                            type: "star",
                            open: "(?:",
                            close: ")*"
                        },
                        "@": {
                            type: "at",
                            open: "(?:",
                            close: ")"
                        }
                    };
                },
                globChars (t) {
                    return t === true ? C : b;
                }
            };
        },
        697: (t, e, u)=>{
            const n = u(154);
            const o = u(96);
            const { MAX_LENGTH: s, POSIX_REGEX_SOURCE: r, REGEX_NON_SPECIAL_CHARS: a, REGEX_SPECIAL_CHARS_BACKREF: i, REPLACEMENTS: c } = n;
            const expandRange = (t, e)=>{
                if (typeof e.expandRange === "function") {
                    return e.expandRange(...t, e);
                }
                t.sort();
                const u = `[${t.join("-")}]`;
                try {
                    new RegExp(u);
                } catch (e) {
                    return t.map((t)=>o.escapeRegex(t)).join("..");
                }
                return u;
            };
            const syntaxError = (t, e)=>`Missing ${t}: "${e}" - use "\\\\${e}" to match literal characters`;
            const parse = (t, e)=>{
                if (typeof t !== "string") {
                    throw new TypeError("Expected a string");
                }
                t = c[t] || t;
                const u = {
                    ...e
                };
                const p = typeof u.maxLength === "number" ? Math.min(s, u.maxLength) : s;
                let l = t.length;
                if (l > p) {
                    throw new SyntaxError(`Input length: ${l}, exceeds maximum allowed length: ${p}`);
                }
                const f = {
                    type: "bos",
                    value: "",
                    output: u.prepend || ""
                };
                const A = [
                    f
                ];
                const _ = u.capture ? "" : "?:";
                const R = n.globChars(u.windows);
                const E = n.extglobChars(R);
                const { DOT_LITERAL: h, PLUS_LITERAL: g, SLASH_LITERAL: b, ONE_CHAR: C, DOTS_SLASH: y, NO_DOT: $, NO_DOT_SLASH: x, NO_DOTS_SLASH: S, QMARK: H, QMARK_NO_DOT: v, STAR: d, START_ANCHOR: L } = R;
                const globstar = (t)=>`(${_}(?:(?!${L}${t.dot ? y : h}).)*?)`;
                const T = u.dot ? "" : $;
                const O = u.dot ? H : v;
                let k = u.bash === true ? globstar(u) : d;
                if (u.capture) {
                    k = `(${k})`;
                }
                if (typeof u.noext === "boolean") {
                    u.noextglob = u.noext;
                }
                const m = {
                    input: t,
                    index: -1,
                    start: 0,
                    dot: u.dot === true,
                    consumed: "",
                    output: "",
                    prefix: "",
                    backtrack: false,
                    negated: false,
                    brackets: 0,
                    braces: 0,
                    parens: 0,
                    quotes: 0,
                    globstar: false,
                    tokens: A
                };
                t = o.removePrefix(t, m);
                l = t.length;
                const w = [];
                const N = [];
                const I = [];
                let B = f;
                let G;
                const eos = ()=>m.index === l - 1;
                const D = m.peek = (e = 1)=>t[m.index + e];
                const M = m.advance = ()=>t[++m.index] || "";
                const remaining = ()=>t.slice(m.index + 1);
                const consume = (t = "", e = 0)=>{
                    m.consumed += t;
                    m.index += e;
                };
                const append = (t)=>{
                    m.output += t.output != null ? t.output : t.value;
                    consume(t.value);
                };
                const negate = ()=>{
                    let t = 1;
                    while(D() === "!" && (D(2) !== "(" || D(3) === "?")){
                        M();
                        m.start++;
                        t++;
                    }
                    if (t % 2 === 0) {
                        return false;
                    }
                    m.negated = true;
                    m.start++;
                    return true;
                };
                const increment = (t)=>{
                    m[t]++;
                    I.push(t);
                };
                const decrement = (t)=>{
                    m[t]--;
                    I.pop();
                };
                const push = (t)=>{
                    if (B.type === "globstar") {
                        const e = m.braces > 0 && (t.type === "comma" || t.type === "brace");
                        const u = t.extglob === true || w.length && (t.type === "pipe" || t.type === "paren");
                        if (t.type !== "slash" && t.type !== "paren" && !e && !u) {
                            m.output = m.output.slice(0, -B.output.length);
                            B.type = "star";
                            B.value = "*";
                            B.output = k;
                            m.output += B.output;
                        }
                    }
                    if (w.length && t.type !== "paren") {
                        w[w.length - 1].inner += t.value;
                    }
                    if (t.value || t.output) append(t);
                    if (B && B.type === "text" && t.type === "text") {
                        B.output = (B.output || B.value) + t.value;
                        B.value += t.value;
                        return;
                    }
                    t.prev = B;
                    A.push(t);
                    B = t;
                };
                const extglobOpen = (t, e)=>{
                    const n = {
                        ...E[e],
                        conditions: 1,
                        inner: ""
                    };
                    n.prev = B;
                    n.parens = m.parens;
                    n.output = m.output;
                    const o = (u.capture ? "(" : "") + n.open;
                    increment("parens");
                    push({
                        type: t,
                        value: e,
                        output: m.output ? "" : C
                    });
                    push({
                        type: "paren",
                        extglob: true,
                        value: M(),
                        output: o
                    });
                    w.push(n);
                };
                const extglobClose = (t)=>{
                    let n = t.close + (u.capture ? ")" : "");
                    let o;
                    if (t.type === "negate") {
                        let s = k;
                        if (t.inner && t.inner.length > 1 && t.inner.includes("/")) {
                            s = globstar(u);
                        }
                        if (s !== k || eos() || /^\)+$/.test(remaining())) {
                            n = t.close = `)$))${s}`;
                        }
                        if (t.inner.includes("*") && (o = remaining()) && /^\.[^\\/.]+$/.test(o)) {
                            const u = parse(o, {
                                ...e,
                                fastpaths: false
                            }).output;
                            n = t.close = `)${u})${s})`;
                        }
                        if (t.prev.type === "bos") {
                            m.negatedExtglob = true;
                        }
                    }
                    push({
                        type: "paren",
                        extglob: true,
                        value: G,
                        output: n
                    });
                    decrement("parens");
                };
                if (u.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(t)) {
                    let n = false;
                    let s = t.replace(i, (t, e, u, o, s, r)=>{
                        if (o === "\\") {
                            n = true;
                            return t;
                        }
                        if (o === "?") {
                            if (e) {
                                return e + o + (s ? H.repeat(s.length) : "");
                            }
                            if (r === 0) {
                                return O + (s ? H.repeat(s.length) : "");
                            }
                            return H.repeat(u.length);
                        }
                        if (o === ".") {
                            return h.repeat(u.length);
                        }
                        if (o === "*") {
                            if (e) {
                                return e + o + (s ? k : "");
                            }
                            return k;
                        }
                        return e ? t : `\\${t}`;
                    });
                    if (n === true) {
                        if (u.unescape === true) {
                            s = s.replace(/\\/g, "");
                        } else {
                            s = s.replace(/\\+/g, (t)=>t.length % 2 === 0 ? "\\\\" : t ? "\\" : "");
                        }
                    }
                    if (s === t && u.contains === true) {
                        m.output = t;
                        return m;
                    }
                    m.output = o.wrapOutput(s, m, e);
                    return m;
                }
                while(!eos()){
                    G = M();
                    if (G === "\0") {
                        continue;
                    }
                    if (G === "\\") {
                        const t = D();
                        if (t === "/" && u.bash !== true) {
                            continue;
                        }
                        if (t === "." || t === ";") {
                            continue;
                        }
                        if (!t) {
                            G += "\\";
                            push({
                                type: "text",
                                value: G
                            });
                            continue;
                        }
                        const e = /^\\+/.exec(remaining());
                        let n = 0;
                        if (e && e[0].length > 2) {
                            n = e[0].length;
                            m.index += n;
                            if (n % 2 !== 0) {
                                G += "\\";
                            }
                        }
                        if (u.unescape === true) {
                            G = M();
                        } else {
                            G += M();
                        }
                        if (m.brackets === 0) {
                            push({
                                type: "text",
                                value: G
                            });
                            continue;
                        }
                    }
                    if (m.brackets > 0 && (G !== "]" || B.value === "[" || B.value === "[^")) {
                        if (u.posix !== false && G === ":") {
                            const t = B.value.slice(1);
                            if (t.includes("[")) {
                                B.posix = true;
                                if (t.includes(":")) {
                                    const t = B.value.lastIndexOf("[");
                                    const e = B.value.slice(0, t);
                                    const u = B.value.slice(t + 2);
                                    const n = r[u];
                                    if (n) {
                                        B.value = e + n;
                                        m.backtrack = true;
                                        M();
                                        if (!f.output && A.indexOf(B) === 1) {
                                            f.output = C;
                                        }
                                        continue;
                                    }
                                }
                            }
                        }
                        if (G === "[" && D() !== ":" || G === "-" && D() === "]") {
                            G = `\\${G}`;
                        }
                        if (G === "]" && (B.value === "[" || B.value === "[^")) {
                            G = `\\${G}`;
                        }
                        if (u.posix === true && G === "!" && B.value === "[") {
                            G = "^";
                        }
                        B.value += G;
                        append({
                            value: G
                        });
                        continue;
                    }
                    if (m.quotes === 1 && G !== '"') {
                        G = o.escapeRegex(G);
                        B.value += G;
                        append({
                            value: G
                        });
                        continue;
                    }
                    if (G === '"') {
                        m.quotes = m.quotes === 1 ? 0 : 1;
                        if (u.keepQuotes === true) {
                            push({
                                type: "text",
                                value: G
                            });
                        }
                        continue;
                    }
                    if (G === "(") {
                        increment("parens");
                        push({
                            type: "paren",
                            value: G
                        });
                        continue;
                    }
                    if (G === ")") {
                        if (m.parens === 0 && u.strictBrackets === true) {
                            throw new SyntaxError(syntaxError("opening", "("));
                        }
                        const t = w[w.length - 1];
                        if (t && m.parens === t.parens + 1) {
                            extglobClose(w.pop());
                            continue;
                        }
                        push({
                            type: "paren",
                            value: G,
                            output: m.parens ? ")" : "\\)"
                        });
                        decrement("parens");
                        continue;
                    }
                    if (G === "[") {
                        if (u.nobracket === true || !remaining().includes("]")) {
                            if (u.nobracket !== true && u.strictBrackets === true) {
                                throw new SyntaxError(syntaxError("closing", "]"));
                            }
                            G = `\\${G}`;
                        } else {
                            increment("brackets");
                        }
                        push({
                            type: "bracket",
                            value: G
                        });
                        continue;
                    }
                    if (G === "]") {
                        if (u.nobracket === true || B && B.type === "bracket" && B.value.length === 1) {
                            push({
                                type: "text",
                                value: G,
                                output: `\\${G}`
                            });
                            continue;
                        }
                        if (m.brackets === 0) {
                            if (u.strictBrackets === true) {
                                throw new SyntaxError(syntaxError("opening", "["));
                            }
                            push({
                                type: "text",
                                value: G,
                                output: `\\${G}`
                            });
                            continue;
                        }
                        decrement("brackets");
                        const t = B.value.slice(1);
                        if (B.posix !== true && t[0] === "^" && !t.includes("/")) {
                            G = `/${G}`;
                        }
                        B.value += G;
                        append({
                            value: G
                        });
                        if (u.literalBrackets === false || o.hasRegexChars(t)) {
                            continue;
                        }
                        const e = o.escapeRegex(B.value);
                        m.output = m.output.slice(0, -B.value.length);
                        if (u.literalBrackets === true) {
                            m.output += e;
                            B.value = e;
                            continue;
                        }
                        B.value = `(${_}${e}|${B.value})`;
                        m.output += B.value;
                        continue;
                    }
                    if (G === "{" && u.nobrace !== true) {
                        increment("braces");
                        const t = {
                            type: "brace",
                            value: G,
                            output: "(",
                            outputIndex: m.output.length,
                            tokensIndex: m.tokens.length
                        };
                        N.push(t);
                        push(t);
                        continue;
                    }
                    if (G === "}") {
                        const t = N[N.length - 1];
                        if (u.nobrace === true || !t) {
                            push({
                                type: "text",
                                value: G,
                                output: G
                            });
                            continue;
                        }
                        let e = ")";
                        if (t.dots === true) {
                            const t = A.slice();
                            const n = [];
                            for(let e = t.length - 1; e >= 0; e--){
                                A.pop();
                                if (t[e].type === "brace") {
                                    break;
                                }
                                if (t[e].type !== "dots") {
                                    n.unshift(t[e].value);
                                }
                            }
                            e = expandRange(n, u);
                            m.backtrack = true;
                        }
                        if (t.comma !== true && t.dots !== true) {
                            const u = m.output.slice(0, t.outputIndex);
                            const n = m.tokens.slice(t.tokensIndex);
                            t.value = t.output = "\\{";
                            G = e = "\\}";
                            m.output = u;
                            for (const t of n){
                                m.output += t.output || t.value;
                            }
                        }
                        push({
                            type: "brace",
                            value: G,
                            output: e
                        });
                        decrement("braces");
                        N.pop();
                        continue;
                    }
                    if (G === "|") {
                        if (w.length > 0) {
                            w[w.length - 1].conditions++;
                        }
                        push({
                            type: "text",
                            value: G
                        });
                        continue;
                    }
                    if (G === ",") {
                        let t = G;
                        const e = N[N.length - 1];
                        if (e && I[I.length - 1] === "braces") {
                            e.comma = true;
                            t = "|";
                        }
                        push({
                            type: "comma",
                            value: G,
                            output: t
                        });
                        continue;
                    }
                    if (G === "/") {
                        if (B.type === "dot" && m.index === m.start + 1) {
                            m.start = m.index + 1;
                            m.consumed = "";
                            m.output = "";
                            A.pop();
                            B = f;
                            continue;
                        }
                        push({
                            type: "slash",
                            value: G,
                            output: b
                        });
                        continue;
                    }
                    if (G === ".") {
                        if (m.braces > 0 && B.type === "dot") {
                            if (B.value === ".") B.output = h;
                            const t = N[N.length - 1];
                            B.type = "dots";
                            B.output += G;
                            B.value += G;
                            t.dots = true;
                            continue;
                        }
                        if (m.braces + m.parens === 0 && B.type !== "bos" && B.type !== "slash") {
                            push({
                                type: "text",
                                value: G,
                                output: h
                            });
                            continue;
                        }
                        push({
                            type: "dot",
                            value: G,
                            output: h
                        });
                        continue;
                    }
                    if (G === "?") {
                        const t = B && B.value === "(";
                        if (!t && u.noextglob !== true && D() === "(" && D(2) !== "?") {
                            extglobOpen("qmark", G);
                            continue;
                        }
                        if (B && B.type === "paren") {
                            const t = D();
                            let e = G;
                            if (B.value === "(" && !/[!=<:]/.test(t) || t === "<" && !/<([!=]|\w+>)/.test(remaining())) {
                                e = `\\${G}`;
                            }
                            push({
                                type: "text",
                                value: G,
                                output: e
                            });
                            continue;
                        }
                        if (u.dot !== true && (B.type === "slash" || B.type === "bos")) {
                            push({
                                type: "qmark",
                                value: G,
                                output: v
                            });
                            continue;
                        }
                        push({
                            type: "qmark",
                            value: G,
                            output: H
                        });
                        continue;
                    }
                    if (G === "!") {
                        if (u.noextglob !== true && D() === "(") {
                            if (D(2) !== "?" || !/[!=<:]/.test(D(3))) {
                                extglobOpen("negate", G);
                                continue;
                            }
                        }
                        if (u.nonegate !== true && m.index === 0) {
                            negate();
                            continue;
                        }
                    }
                    if (G === "+") {
                        if (u.noextglob !== true && D() === "(" && D(2) !== "?") {
                            extglobOpen("plus", G);
                            continue;
                        }
                        if (B && B.value === "(" || u.regex === false) {
                            push({
                                type: "plus",
                                value: G,
                                output: g
                            });
                            continue;
                        }
                        if (B && (B.type === "bracket" || B.type === "paren" || B.type === "brace") || m.parens > 0) {
                            push({
                                type: "plus",
                                value: G
                            });
                            continue;
                        }
                        push({
                            type: "plus",
                            value: g
                        });
                        continue;
                    }
                    if (G === "@") {
                        if (u.noextglob !== true && D() === "(" && D(2) !== "?") {
                            push({
                                type: "at",
                                extglob: true,
                                value: G,
                                output: ""
                            });
                            continue;
                        }
                        push({
                            type: "text",
                            value: G
                        });
                        continue;
                    }
                    if (G !== "*") {
                        if (G === "$" || G === "^") {
                            G = `\\${G}`;
                        }
                        const t = a.exec(remaining());
                        if (t) {
                            G += t[0];
                            m.index += t[0].length;
                        }
                        push({
                            type: "text",
                            value: G
                        });
                        continue;
                    }
                    if (B && (B.type === "globstar" || B.star === true)) {
                        B.type = "star";
                        B.star = true;
                        B.value += G;
                        B.output = k;
                        m.backtrack = true;
                        m.globstar = true;
                        consume(G);
                        continue;
                    }
                    let e = remaining();
                    if (u.noextglob !== true && /^\([^?]/.test(e)) {
                        extglobOpen("star", G);
                        continue;
                    }
                    if (B.type === "star") {
                        if (u.noglobstar === true) {
                            consume(G);
                            continue;
                        }
                        const n = B.prev;
                        const o = n.prev;
                        const s = n.type === "slash" || n.type === "bos";
                        const r = o && (o.type === "star" || o.type === "globstar");
                        if (u.bash === true && (!s || e[0] && e[0] !== "/")) {
                            push({
                                type: "star",
                                value: G,
                                output: ""
                            });
                            continue;
                        }
                        const a = m.braces > 0 && (n.type === "comma" || n.type === "brace");
                        const i = w.length && (n.type === "pipe" || n.type === "paren");
                        if (!s && n.type !== "paren" && !a && !i) {
                            push({
                                type: "star",
                                value: G,
                                output: ""
                            });
                            continue;
                        }
                        while(e.slice(0, 3) === "/**"){
                            const u = t[m.index + 4];
                            if (u && u !== "/") {
                                break;
                            }
                            e = e.slice(3);
                            consume("/**", 3);
                        }
                        if (n.type === "bos" && eos()) {
                            B.type = "globstar";
                            B.value += G;
                            B.output = globstar(u);
                            m.output = B.output;
                            m.globstar = true;
                            consume(G);
                            continue;
                        }
                        if (n.type === "slash" && n.prev.type !== "bos" && !r && eos()) {
                            m.output = m.output.slice(0, -(n.output + B.output).length);
                            n.output = `(?:${n.output}`;
                            B.type = "globstar";
                            B.output = globstar(u) + (u.strictSlashes ? ")" : "|$)");
                            B.value += G;
                            m.globstar = true;
                            m.output += n.output + B.output;
                            consume(G);
                            continue;
                        }
                        if (n.type === "slash" && n.prev.type !== "bos" && e[0] === "/") {
                            const t = e[1] !== void 0 ? "|$" : "";
                            m.output = m.output.slice(0, -(n.output + B.output).length);
                            n.output = `(?:${n.output}`;
                            B.type = "globstar";
                            B.output = `${globstar(u)}${b}|${b}${t})`;
                            B.value += G;
                            m.output += n.output + B.output;
                            m.globstar = true;
                            consume(G + M());
                            push({
                                type: "slash",
                                value: "/",
                                output: ""
                            });
                            continue;
                        }
                        if (n.type === "bos" && e[0] === "/") {
                            B.type = "globstar";
                            B.value += G;
                            B.output = `(?:^|${b}|${globstar(u)}${b})`;
                            m.output = B.output;
                            m.globstar = true;
                            consume(G + M());
                            push({
                                type: "slash",
                                value: "/",
                                output: ""
                            });
                            continue;
                        }
                        m.output = m.output.slice(0, -B.output.length);
                        B.type = "globstar";
                        B.output = globstar(u);
                        B.value += G;
                        m.output += B.output;
                        m.globstar = true;
                        consume(G);
                        continue;
                    }
                    const n = {
                        type: "star",
                        value: G,
                        output: k
                    };
                    if (u.bash === true) {
                        n.output = ".*?";
                        if (B.type === "bos" || B.type === "slash") {
                            n.output = T + n.output;
                        }
                        push(n);
                        continue;
                    }
                    if (B && (B.type === "bracket" || B.type === "paren") && u.regex === true) {
                        n.output = G;
                        push(n);
                        continue;
                    }
                    if (m.index === m.start || B.type === "slash" || B.type === "dot") {
                        if (B.type === "dot") {
                            m.output += x;
                            B.output += x;
                        } else if (u.dot === true) {
                            m.output += S;
                            B.output += S;
                        } else {
                            m.output += T;
                            B.output += T;
                        }
                        if (D() !== "*") {
                            m.output += C;
                            B.output += C;
                        }
                    }
                    push(n);
                }
                while(m.brackets > 0){
                    if (u.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
                    m.output = o.escapeLast(m.output, "[");
                    decrement("brackets");
                }
                while(m.parens > 0){
                    if (u.strictBrackets === true) throw new SyntaxError(syntaxError("closing", ")"));
                    m.output = o.escapeLast(m.output, "(");
                    decrement("parens");
                }
                while(m.braces > 0){
                    if (u.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "}"));
                    m.output = o.escapeLast(m.output, "{");
                    decrement("braces");
                }
                if (u.strictSlashes !== true && (B.type === "star" || B.type === "bracket")) {
                    push({
                        type: "maybe_slash",
                        value: "",
                        output: `${b}?`
                    });
                }
                if (m.backtrack === true) {
                    m.output = "";
                    for (const t of m.tokens){
                        m.output += t.output != null ? t.output : t.value;
                        if (t.suffix) {
                            m.output += t.suffix;
                        }
                    }
                }
                return m;
            };
            parse.fastpaths = (t, e)=>{
                const u = {
                    ...e
                };
                const r = typeof u.maxLength === "number" ? Math.min(s, u.maxLength) : s;
                const a = t.length;
                if (a > r) {
                    throw new SyntaxError(`Input length: ${a}, exceeds maximum allowed length: ${r}`);
                }
                t = c[t] || t;
                const { DOT_LITERAL: i, SLASH_LITERAL: p, ONE_CHAR: l, DOTS_SLASH: f, NO_DOT: A, NO_DOTS: _, NO_DOTS_SLASH: R, STAR: E, START_ANCHOR: h } = n.globChars(u.windows);
                const g = u.dot ? _ : A;
                const b = u.dot ? R : A;
                const C = u.capture ? "" : "?:";
                const y = {
                    negated: false,
                    prefix: ""
                };
                let $ = u.bash === true ? ".*?" : E;
                if (u.capture) {
                    $ = `(${$})`;
                }
                const globstar = (t)=>{
                    if (t.noglobstar === true) return $;
                    return `(${C}(?:(?!${h}${t.dot ? f : i}).)*?)`;
                };
                const create = (t)=>{
                    switch(t){
                        case "*":
                            return `${g}${l}${$}`;
                        case ".*":
                            return `${i}${l}${$}`;
                        case "*.*":
                            return `${g}${$}${i}${l}${$}`;
                        case "*/*":
                            return `${g}${$}${p}${l}${b}${$}`;
                        case "**":
                            return g + globstar(u);
                        case "**/*":
                            return `(?:${g}${globstar(u)}${p})?${b}${l}${$}`;
                        case "**/*.*":
                            return `(?:${g}${globstar(u)}${p})?${b}${$}${i}${l}${$}`;
                        case "**/.*":
                            return `(?:${g}${globstar(u)}${p})?${i}${l}${$}`;
                        default:
                            {
                                const e = /^(.*?)\.(\w+)$/.exec(t);
                                if (!e) return;
                                const u = create(e[1]);
                                if (!u) return;
                                return u + i + e[2];
                            }
                    }
                };
                const x = o.removePrefix(t, y);
                let S = create(x);
                if (S && u.strictSlashes !== true) {
                    S += `${p}?`;
                }
                return S;
            };
            t.exports = parse;
        },
        510: (t, e, u)=>{
            const n = u(716);
            const o = u(697);
            const s = u(96);
            const r = u(154);
            const isObject = (t)=>t && typeof t === "object" && !Array.isArray(t);
            const picomatch = (t, e, u = false)=>{
                if (Array.isArray(t)) {
                    const n = t.map((t)=>picomatch(t, e, u));
                    const arrayMatcher = (t)=>{
                        for (const e of n){
                            const u = e(t);
                            if (u) return u;
                        }
                        return false;
                    };
                    return arrayMatcher;
                }
                const n = isObject(t) && t.tokens && t.input;
                if (t === "" || typeof t !== "string" && !n) {
                    throw new TypeError("Expected pattern to be a non-empty string");
                }
                const o = e || {};
                const s = o.windows;
                const r = n ? picomatch.compileRe(t, e) : picomatch.makeRe(t, e, false, true);
                const a = r.state;
                delete r.state;
                let isIgnored = ()=>false;
                if (o.ignore) {
                    const t = {
                        ...e,
                        ignore: null,
                        onMatch: null,
                        onResult: null
                    };
                    isIgnored = picomatch(o.ignore, t, u);
                }
                const matcher = (u, n = false)=>{
                    const { isMatch: i, match: c, output: p } = picomatch.test(u, r, e, {
                        glob: t,
                        posix: s
                    });
                    const l = {
                        glob: t,
                        state: a,
                        regex: r,
                        posix: s,
                        input: u,
                        output: p,
                        match: c,
                        isMatch: i
                    };
                    if (typeof o.onResult === "function") {
                        o.onResult(l);
                    }
                    if (i === false) {
                        l.isMatch = false;
                        return n ? l : false;
                    }
                    if (isIgnored(u)) {
                        if (typeof o.onIgnore === "function") {
                            o.onIgnore(l);
                        }
                        l.isMatch = false;
                        return n ? l : false;
                    }
                    if (typeof o.onMatch === "function") {
                        o.onMatch(l);
                    }
                    return n ? l : true;
                };
                if (u) {
                    matcher.state = a;
                }
                return matcher;
            };
            picomatch.test = (t, e, u, { glob: n, posix: o } = {})=>{
                if (typeof t !== "string") {
                    throw new TypeError("Expected input to be a string");
                }
                if (t === "") {
                    return {
                        isMatch: false,
                        output: ""
                    };
                }
                const r = u || {};
                const a = r.format || (o ? s.toPosixSlashes : null);
                let i = t === n;
                let c = i && a ? a(t) : t;
                if (i === false) {
                    c = a ? a(t) : t;
                    i = c === n;
                }
                if (i === false || r.capture === true) {
                    if (r.matchBase === true || r.basename === true) {
                        i = picomatch.matchBase(t, e, u, o);
                    } else {
                        i = e.exec(c);
                    }
                }
                return {
                    isMatch: Boolean(i),
                    match: i,
                    output: c
                };
            };
            picomatch.matchBase = (t, e, u)=>{
                const n = e instanceof RegExp ? e : picomatch.makeRe(e, u);
                return n.test(s.basename(t));
            };
            picomatch.isMatch = (t, e, u)=>picomatch(e, u)(t);
            picomatch.parse = (t, e)=>{
                if (Array.isArray(t)) return t.map((t)=>picomatch.parse(t, e));
                return o(t, {
                    ...e,
                    fastpaths: false
                });
            };
            picomatch.scan = (t, e)=>n(t, e);
            picomatch.compileRe = (t, e, u = false, n = false)=>{
                if (u === true) {
                    return t.output;
                }
                const o = e || {};
                const s = o.contains ? "" : "^";
                const r = o.contains ? "" : "$";
                let a = `${s}(?:${t.output})${r}`;
                if (t && t.negated === true) {
                    a = `^(?!${a}).*$`;
                }
                const i = picomatch.toRegex(a, e);
                if (n === true) {
                    i.state = t;
                }
                return i;
            };
            picomatch.makeRe = (t, e = {}, u = false, n = false)=>{
                if (!t || typeof t !== "string") {
                    throw new TypeError("Expected a non-empty string");
                }
                let s = {
                    negated: false,
                    fastpaths: true
                };
                if (e.fastpaths !== false && (t[0] === "." || t[0] === "*")) {
                    s.output = o.fastpaths(t, e);
                }
                if (!s.output) {
                    s = o(t, e);
                }
                return picomatch.compileRe(s, e, u, n);
            };
            picomatch.toRegex = (t, e)=>{
                try {
                    const u = e || {};
                    return new RegExp(t, u.flags || (u.nocase ? "i" : ""));
                } catch (t) {
                    if (e && e.debug === true) throw t;
                    return /$^/;
                }
            };
            picomatch.constants = r;
            t.exports = picomatch;
        },
        716: (t, e, u)=>{
            const n = u(96);
            const { CHAR_ASTERISK: o, CHAR_AT: s, CHAR_BACKWARD_SLASH: r, CHAR_COMMA: a, CHAR_DOT: i, CHAR_EXCLAMATION_MARK: c, CHAR_FORWARD_SLASH: p, CHAR_LEFT_CURLY_BRACE: l, CHAR_LEFT_PARENTHESES: f, CHAR_LEFT_SQUARE_BRACKET: A, CHAR_PLUS: _, CHAR_QUESTION_MARK: R, CHAR_RIGHT_CURLY_BRACE: E, CHAR_RIGHT_PARENTHESES: h, CHAR_RIGHT_SQUARE_BRACKET: g } = u(154);
            const isPathSeparator = (t)=>t === p || t === r;
            const depth = (t)=>{
                if (t.isPrefix !== true) {
                    t.depth = t.isGlobstar ? Infinity : 1;
                }
            };
            const scan = (t, e)=>{
                const u = e || {};
                const b = t.length - 1;
                const C = u.parts === true || u.scanToEnd === true;
                const y = [];
                const $ = [];
                const x = [];
                let S = t;
                let H = -1;
                let v = 0;
                let d = 0;
                let L = false;
                let T = false;
                let O = false;
                let k = false;
                let m = false;
                let w = false;
                let N = false;
                let I = false;
                let B = false;
                let G = false;
                let D = 0;
                let M;
                let P;
                let K = {
                    value: "",
                    depth: 0,
                    isGlob: false
                };
                const eos = ()=>H >= b;
                const peek = ()=>S.charCodeAt(H + 1);
                const advance = ()=>{
                    M = P;
                    return S.charCodeAt(++H);
                };
                while(H < b){
                    P = advance();
                    let t;
                    if (P === r) {
                        N = K.backslashes = true;
                        P = advance();
                        if (P === l) {
                            w = true;
                        }
                        continue;
                    }
                    if (w === true || P === l) {
                        D++;
                        while(eos() !== true && (P = advance())){
                            if (P === r) {
                                N = K.backslashes = true;
                                advance();
                                continue;
                            }
                            if (P === l) {
                                D++;
                                continue;
                            }
                            if (w !== true && P === i && (P = advance()) === i) {
                                L = K.isBrace = true;
                                O = K.isGlob = true;
                                G = true;
                                if (C === true) {
                                    continue;
                                }
                                break;
                            }
                            if (w !== true && P === a) {
                                L = K.isBrace = true;
                                O = K.isGlob = true;
                                G = true;
                                if (C === true) {
                                    continue;
                                }
                                break;
                            }
                            if (P === E) {
                                D--;
                                if (D === 0) {
                                    w = false;
                                    L = K.isBrace = true;
                                    G = true;
                                    break;
                                }
                            }
                        }
                        if (C === true) {
                            continue;
                        }
                        break;
                    }
                    if (P === p) {
                        y.push(H);
                        $.push(K);
                        K = {
                            value: "",
                            depth: 0,
                            isGlob: false
                        };
                        if (G === true) continue;
                        if (M === i && H === v + 1) {
                            v += 2;
                            continue;
                        }
                        d = H + 1;
                        continue;
                    }
                    if (u.noext !== true) {
                        const t = P === _ || P === s || P === o || P === R || P === c;
                        if (t === true && peek() === f) {
                            O = K.isGlob = true;
                            k = K.isExtglob = true;
                            G = true;
                            if (P === c && H === v) {
                                B = true;
                            }
                            if (C === true) {
                                while(eos() !== true && (P = advance())){
                                    if (P === r) {
                                        N = K.backslashes = true;
                                        P = advance();
                                        continue;
                                    }
                                    if (P === h) {
                                        O = K.isGlob = true;
                                        G = true;
                                        break;
                                    }
                                }
                                continue;
                            }
                            break;
                        }
                    }
                    if (P === o) {
                        if (M === o) m = K.isGlobstar = true;
                        O = K.isGlob = true;
                        G = true;
                        if (C === true) {
                            continue;
                        }
                        break;
                    }
                    if (P === R) {
                        O = K.isGlob = true;
                        G = true;
                        if (C === true) {
                            continue;
                        }
                        break;
                    }
                    if (P === A) {
                        while(eos() !== true && (t = advance())){
                            if (t === r) {
                                N = K.backslashes = true;
                                advance();
                                continue;
                            }
                            if (t === g) {
                                T = K.isBracket = true;
                                O = K.isGlob = true;
                                G = true;
                                break;
                            }
                        }
                        if (C === true) {
                            continue;
                        }
                        break;
                    }
                    if (u.nonegate !== true && P === c && H === v) {
                        I = K.negated = true;
                        v++;
                        continue;
                    }
                    if (u.noparen !== true && P === f) {
                        O = K.isGlob = true;
                        if (C === true) {
                            while(eos() !== true && (P = advance())){
                                if (P === f) {
                                    N = K.backslashes = true;
                                    P = advance();
                                    continue;
                                }
                                if (P === h) {
                                    G = true;
                                    break;
                                }
                            }
                            continue;
                        }
                        break;
                    }
                    if (O === true) {
                        G = true;
                        if (C === true) {
                            continue;
                        }
                        break;
                    }
                }
                if (u.noext === true) {
                    k = false;
                    O = false;
                }
                let U = S;
                let X = "";
                let F = "";
                if (v > 0) {
                    X = S.slice(0, v);
                    S = S.slice(v);
                    d -= v;
                }
                if (U && O === true && d > 0) {
                    U = S.slice(0, d);
                    F = S.slice(d);
                } else if (O === true) {
                    U = "";
                    F = S;
                } else {
                    U = S;
                }
                if (U && U !== "" && U !== "/" && U !== S) {
                    if (isPathSeparator(U.charCodeAt(U.length - 1))) {
                        U = U.slice(0, -1);
                    }
                }
                if (u.unescape === true) {
                    if (F) F = n.removeBackslashes(F);
                    if (U && N === true) {
                        U = n.removeBackslashes(U);
                    }
                }
                const Q = {
                    prefix: X,
                    input: t,
                    start: v,
                    base: U,
                    glob: F,
                    isBrace: L,
                    isBracket: T,
                    isGlob: O,
                    isExtglob: k,
                    isGlobstar: m,
                    negated: I,
                    negatedExtglob: B
                };
                if (u.tokens === true) {
                    Q.maxDepth = 0;
                    if (!isPathSeparator(P)) {
                        $.push(K);
                    }
                    Q.tokens = $;
                }
                if (u.parts === true || u.tokens === true) {
                    let e;
                    for(let n = 0; n < y.length; n++){
                        const o = e ? e + 1 : v;
                        const s = y[n];
                        const r = t.slice(o, s);
                        if (u.tokens) {
                            if (n === 0 && v !== 0) {
                                $[n].isPrefix = true;
                                $[n].value = X;
                            } else {
                                $[n].value = r;
                            }
                            depth($[n]);
                            Q.maxDepth += $[n].depth;
                        }
                        if (n !== 0 || r !== "") {
                            x.push(r);
                        }
                        e = s;
                    }
                    if (e && e + 1 < t.length) {
                        const n = t.slice(e + 1);
                        x.push(n);
                        if (u.tokens) {
                            $[$.length - 1].value = n;
                            depth($[$.length - 1]);
                            Q.maxDepth += $[$.length - 1].depth;
                        }
                    }
                    Q.slashes = y;
                    Q.parts = x;
                }
                return Q;
            };
            t.exports = scan;
        },
        96: (t, e, u)=>{
            const { REGEX_BACKSLASH: n, REGEX_REMOVE_BACKSLASH: o, REGEX_SPECIAL_CHARS: s, REGEX_SPECIAL_CHARS_GLOBAL: r } = u(154);
            e.isObject = (t)=>t !== null && typeof t === "object" && !Array.isArray(t);
            e.hasRegexChars = (t)=>s.test(t);
            e.isRegexChar = (t)=>t.length === 1 && e.hasRegexChars(t);
            e.escapeRegex = (t)=>t.replace(r, "\\$1");
            e.toPosixSlashes = (t)=>t.replace(n, "/");
            e.removeBackslashes = (t)=>t.replace(o, (t)=>t === "\\" ? "" : t);
            e.escapeLast = (t, u, n)=>{
                const o = t.lastIndexOf(u, n);
                if (o === -1) return t;
                if (t[o - 1] === "\\") return e.escapeLast(t, u, o - 1);
                return `${t.slice(0, o)}\\${t.slice(o)}`;
            };
            e.removePrefix = (t, e = {})=>{
                let u = t;
                if (u.startsWith("./")) {
                    u = u.slice(2);
                    e.prefix = "./";
                }
                return u;
            };
            e.wrapOutput = (t, e = {}, u = {})=>{
                const n = u.contains ? "" : "^";
                const o = u.contains ? "" : "$";
                let s = `${n}(?:${t})${o}`;
                if (e.negated === true) {
                    s = `(?:^(?!${s}).*$)`;
                }
                return s;
            };
            e.basename = (t, { windows: e } = {})=>{
                const u = t.split(e ? /[\\/]/ : "/");
                const n = u[u.length - 1];
                if (n === "") {
                    return u[u.length - 2];
                }
                return n;
            };
        }
    };
    var e = {};
    function __nccwpck_require__(u) {
        var n = e[u];
        if (n !== undefined) {
            return n.exports;
        }
        var o = e[u] = {
            exports: {}
        };
        var s = true;
        try {
            t[u](o, o.exports, __nccwpck_require__);
            s = false;
        } finally{
            if (s) delete e[u];
        }
        return o.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = ("TURBOPACK compile-time value", "/ROOT/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/picomatch") + "/";
    var u = __nccwpck_require__(170);
    module.exports = u;
})();
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/match-local-pattern.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    hasLocalMatch: null,
    matchLocalPattern: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    hasLocalMatch: function() {
        return hasLocalMatch;
    },
    matchLocalPattern: function() {
        return matchLocalPattern;
    }
});
const _picomatch = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/picomatch/index.js [app-client] (ecmascript)");
function matchLocalPattern(pattern, url) {
    if (pattern.search !== undefined) {
        if (pattern.search !== url.search) {
            return false;
        }
    }
    if (!(0, _picomatch.makeRe)(pattern.pathname ?? '**', {
        dot: true
    }).test(url.pathname)) {
        return false;
    }
    return true;
}
function hasLocalMatch(localPatterns, urlPathAndQuery) {
    if (!localPatterns) {
        // if the user didn't define "localPatterns", we allow all local images
        return true;
    }
    const url = new URL(urlPathAndQuery, 'http://n');
    return localPatterns.some((p)=>matchLocalPattern(p, url));
} //# sourceMappingURL=match-local-pattern.js.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/match-remote-pattern.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    hasRemoteMatch: null,
    matchRemotePattern: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    hasRemoteMatch: function() {
        return hasRemoteMatch;
    },
    matchRemotePattern: function() {
        return matchRemotePattern;
    }
});
const _picomatch = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/picomatch/index.js [app-client] (ecmascript)");
function matchRemotePattern(pattern, url) {
    if (pattern.protocol !== undefined) {
        if (pattern.protocol.replace(/:$/, '') !== url.protocol.replace(/:$/, '')) {
            return false;
        }
    }
    if (pattern.port !== undefined) {
        if (pattern.port !== url.port) {
            return false;
        }
    }
    if (pattern.hostname === undefined) {
        throw Object.defineProperty(new Error(`Pattern should define hostname but found\n${JSON.stringify(pattern)}`), "__NEXT_ERROR_CODE", {
            value: "E410",
            enumerable: false,
            configurable: true
        });
    } else {
        if (!(0, _picomatch.makeRe)(pattern.hostname).test(url.hostname)) {
            return false;
        }
    }
    if (pattern.search !== undefined) {
        if (pattern.search !== url.search) {
            return false;
        }
    }
    // Should be the same as writeImagesManifest()
    if (!(0, _picomatch.makeRe)(pattern.pathname ?? '**', {
        dot: true
    }).test(url.pathname)) {
        return false;
    }
    return true;
}
function hasRemoteMatch(domains, remotePatterns, url) {
    return domains.some((domain)=>url.hostname === domain) || remotePatterns.some((p)=>matchRemotePattern(p, url));
} //# sourceMappingURL=match-remote-pattern.js.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/image-loader.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _findclosestquality = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/find-closest-quality.js [app-client] (ecmascript)");
const _deploymentid = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/deployment-id.js [app-client] (ecmascript)");
function defaultLoader({ config, src, width, quality }) {
    if (src.startsWith('/') && src.includes('?') && config.localPatterns?.length === 1 && config.localPatterns[0].pathname === '**' && config.localPatterns[0].search === '') {
        throw Object.defineProperty(new Error(`Image with src "${src}" is using a query string which is not configured in images.localPatterns.` + `\nRead more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`), "__NEXT_ERROR_CODE", {
            value: "E871",
            enumerable: false,
            configurable: true
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        const missingValues = [];
        // these should always be provided but make sure they are
        if (!src) missingValues.push('src');
        if (!width) missingValues.push('width');
        if (missingValues.length > 0) {
            throw Object.defineProperty(new Error(`Next Image Optimization requires ${missingValues.join(', ')} to be provided. Make sure you pass them as props to the \`next/image\` component. Received: ${JSON.stringify({
                src,
                width,
                quality
            })}`), "__NEXT_ERROR_CODE", {
                value: "E188",
                enumerable: false,
                configurable: true
            });
        }
        if (src.startsWith('//')) {
            throw Object.defineProperty(new Error(`Failed to parse src "${src}" on \`next/image\`, protocol-relative URL (//) must be changed to an absolute URL (http:// or https://)`), "__NEXT_ERROR_CODE", {
                value: "E360",
                enumerable: false,
                configurable: true
            });
        }
        if (src.startsWith('/') && config.localPatterns) {
            if ("TURBOPACK compile-time truthy", 1) {
                // We use dynamic require because this should only error in development
                const { hasLocalMatch } = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/match-local-pattern.js [app-client] (ecmascript)");
                if (!hasLocalMatch(config.localPatterns, src)) {
                    throw Object.defineProperty(new Error(`Invalid src prop (${src}) on \`next/image\` does not match \`images.localPatterns\` configured in your \`next.config.js\`\n` + `See more info: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`), "__NEXT_ERROR_CODE", {
                        value: "E426",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
        if (!src.startsWith('/') && (config.domains || config.remotePatterns)) {
            let parsedSrc;
            try {
                parsedSrc = new URL(src);
            } catch (err) {
                console.error(err);
                throw Object.defineProperty(new Error(`Failed to parse src "${src}" on \`next/image\`, if using relative image it must start with a leading slash "/" or be an absolute URL (http:// or https://)`), "__NEXT_ERROR_CODE", {
                    value: "E63",
                    enumerable: false,
                    configurable: true
                });
            }
            if ("TURBOPACK compile-time truthy", 1) {
                // We use dynamic require because this should only error in development
                const { hasRemoteMatch } = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/match-remote-pattern.js [app-client] (ecmascript)");
                if (!hasRemoteMatch(config.domains, config.remotePatterns, parsedSrc)) {
                    throw Object.defineProperty(new Error(`Invalid src prop (${src}) on \`next/image\`, hostname "${parsedSrc.hostname}" is not configured under images in your \`next.config.js\`\n` + `See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host`), "__NEXT_ERROR_CODE", {
                        value: "E231",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
    }
    const q = (0, _findclosestquality.findClosestQuality)(quality, config);
    let deploymentId = (0, _deploymentid.getDeploymentId)();
    return `${config.path}?url=${encodeURIComponent(src)}&w=${width}&q=${q}${src.startsWith('/') && deploymentId ? `&dpl=${deploymentId}` : ''}`;
}
// We use this to determine if the import is the default loader
// or a custom loader defined by the user in next.config.js
defaultLoader.__next_img_default = true;
const _default = defaultLoader; //# sourceMappingURL=image-loader.js.map
}),
"[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/client/image-component.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$sentira$2d$wellness$2d$ui$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Image", {
    enumerable: true,
    get: function() {
        return Image;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _interop_require_wildcard = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _reactdom = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)"));
const _head = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/head.js [app-client] (ecmascript)"));
const _getimgprops = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/get-img-props.js [app-client] (ecmascript)");
const _imageconfig = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/image-config.js [app-client] (ecmascript)");
const _imageconfigcontextsharedruntime = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/image-config-context.shared-runtime.js [app-client] (ecmascript)");
const _warnonce = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
const _routercontextsharedruntime = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/router-context.shared-runtime.js [app-client] (ecmascript)");
const _imageloader = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/shared/lib/image-loader.js [app-client] (ecmascript)"));
const _usemergedref = __turbopack_context__.r("[project]/Downloads/sentira-wellness-ui-main/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)");
// This is replaced by webpack define plugin
const configEnv = ("TURBOPACK compile-time value", {
    "deviceSizes": ("TURBOPACK compile-time value", [
        ("TURBOPACK compile-time value", 640),
        ("TURBOPACK compile-time value", 750),
        ("TURBOPACK compile-time value", 828),
        ("TURBOPACK compile-time value", 1080),
        ("TURBOPACK compile-time value", 1200),
        ("TURBOPACK compile-time value", 1920),
        ("TURBOPACK compile-time value", 2048),
        ("TURBOPACK compile-time value", 3840)
    ]),
    "imageSizes": ("TURBOPACK compile-time value", [
        ("TURBOPACK compile-time value", 32),
        ("TURBOPACK compile-time value", 48),
        ("TURBOPACK compile-time value", 64),
        ("TURBOPACK compile-time value", 96),
        ("TURBOPACK compile-time value", 128),
        ("TURBOPACK compile-time value", 256),
        ("TURBOPACK compile-time value", 384)
    ]),
    "qualities": ("TURBOPACK compile-time value", [
        ("TURBOPACK compile-time value", 75)
    ]),
    "path": ("TURBOPACK compile-time value", "/_next/image"),
    "loader": ("TURBOPACK compile-time value", "default"),
    "dangerouslyAllowSVG": ("TURBOPACK compile-time value", false),
    "unoptimized": ("TURBOPACK compile-time value", false),
    "domains": ("TURBOPACK compile-time value", []),
    "remotePatterns": ("TURBOPACK compile-time value", []),
    "localPatterns": ("TURBOPACK compile-time value", [
        ("TURBOPACK compile-time value", {
            "pathname": ("TURBOPACK compile-time value", "**"),
            "search": ("TURBOPACK compile-time value", "")
        })
    ])
});
if (typeof window === 'undefined') {
    ;
    globalThis.__NEXT_IMAGE_IMPORTED = true;
}
// See https://stackoverflow.com/q/39777833/266535 for why we use this ref
// handler instead of the img's onLoad attribute.
function handleLoading(img, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized, sizesInput) {
    const src = img?.src;
    if (!img || img['data-loaded-src'] === src) {
        return;
    }
    img['data-loaded-src'] = src;
    const p = 'decode' in img ? img.decode() : Promise.resolve();
    p.catch(()=>{}).then(()=>{
        if (!img.parentElement || !img.isConnected) {
            // Exit early in case of race condition:
            // - onload() is called
            // - decode() is called but incomplete
            // - unmount is called
            // - decode() completes
            return;
        }
        if (placeholder !== 'empty') {
            setBlurComplete(true);
        }
        if (onLoadRef?.current) {
            // Since we don't have the SyntheticEvent here,
            // we must create one with the same shape.
            // See https://reactjs.org/docs/events.html
            const event = new Event('load');
            Object.defineProperty(event, 'target', {
                writable: false,
                value: img
            });
            let prevented = false;
            let stopped = false;
            onLoadRef.current({
                ...event,
                nativeEvent: event,
                currentTarget: img,
                target: img,
                isDefaultPrevented: ()=>prevented,
                isPropagationStopped: ()=>stopped,
                persist: ()=>{},
                preventDefault: ()=>{
                    prevented = true;
                    event.preventDefault();
                },
                stopPropagation: ()=>{
                    stopped = true;
                    event.stopPropagation();
                }
            });
        }
        if (onLoadingCompleteRef?.current) {
            onLoadingCompleteRef.current(img);
        }
        if ("TURBOPACK compile-time truthy", 1) {
            const origSrc = new URL(src, 'http://n').searchParams.get('url') || src;
            if (img.getAttribute('data-nimg') === 'fill') {
                if (!unoptimized && (!sizesInput || sizesInput === '100vw')) {
                    let widthViewportRatio = img.getBoundingClientRect().width / window.innerWidth;
                    if (widthViewportRatio < 0.6) {
                        if (sizesInput === '100vw') {
                            (0, _warnonce.warnOnce)(`Image with src "${origSrc}" has "fill" prop and "sizes" prop of "100vw", but image is not rendered at full viewport width. Please adjust "sizes" to improve page performance. Read more: https://nextjs.org/docs/api-reference/next/image#sizes`);
                        } else {
                            (0, _warnonce.warnOnce)(`Image with src "${origSrc}" has "fill" but is missing "sizes" prop. Please add it to improve page performance. Read more: https://nextjs.org/docs/api-reference/next/image#sizes`);
                        }
                    }
                }
                if (img.parentElement) {
                    const { position } = window.getComputedStyle(img.parentElement);
                    const valid = [
                        'absolute',
                        'fixed',
                        'relative'
                    ];
                    if (!valid.includes(position)) {
                        (0, _warnonce.warnOnce)(`Image with src "${origSrc}" has "fill" and parent element with invalid "position". Provided "${position}" should be one of ${valid.map(String).join(',')}.`);
                    }
                }
                if (img.height === 0) {
                    (0, _warnonce.warnOnce)(`Image with src "${origSrc}" has "fill" and a height value of 0. This is likely because the parent element of the image has not been styled to have a set height.`);
                }
            }
            const heightModified = img.height.toString() !== img.getAttribute('height');
            const widthModified = img.width.toString() !== img.getAttribute('width');
            if (heightModified && !widthModified || !heightModified && widthModified) {
                (0, _warnonce.warnOnce)(`Image with src "${origSrc}" has either width or height modified, but not the other. If you use CSS to change the size of your image, also include the styles 'width: "auto"' or 'height: "auto"' to maintain the aspect ratio.`);
            }
        }
    });
}
function getDynamicProps(fetchPriority) {
    if (Boolean(_react.use)) {
        // In React 19.0.0 or newer, we must use camelCase
        // prop to avoid "Warning: Invalid DOM property".
        // See https://github.com/facebook/react/pull/25927
        return {
            fetchPriority
        };
    }
    // In React 18.2.0 or older, we must use lowercase prop
    // to avoid "Warning: Invalid DOM property".
    return {
        fetchpriority: fetchPriority
    };
}
const ImageElement = /*#__PURE__*/ (0, _react.forwardRef)(({ src, srcSet, sizes, height, width, decoding, className, style, fetchPriority, placeholder, loading, unoptimized, fill, onLoadRef, onLoadingCompleteRef, setBlurComplete, setShowAltText, sizesInput, onLoad, onError, ...rest }, forwardedRef)=>{
    const ownRef = (0, _react.useCallback)((img)=>{
        if (!img) {
            return;
        }
        if (onError) {
            // If the image has an error before react hydrates, then the error is lost.
            // The workaround is to wait until the image is mounted which is after hydration,
            // then we set the src again to trigger the error handler (if there was an error).
            // eslint-disable-next-line no-self-assign
            img.src = img.src;
        }
        if ("TURBOPACK compile-time truthy", 1) {
            if (!src) {
                console.error(`Image is missing required "src" property:`, img);
            }
            if (img.getAttribute('alt') === null) {
                console.error(`Image is missing required "alt" property. Please add Alternative Text to describe the image for screen readers and search engines.`);
            }
        }
        if (img.complete) {
            handleLoading(img, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized, sizesInput);
        }
    }, [
        src,
        placeholder,
        onLoadRef,
        onLoadingCompleteRef,
        setBlurComplete,
        onError,
        unoptimized,
        sizesInput
    ]);
    const ref = (0, _usemergedref.useMergedRef)(forwardedRef, ownRef);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("img", {
        ...rest,
        ...getDynamicProps(fetchPriority),
        // It's intended to keep `loading` before `src` because React updates
        // props in order which causes Safari/Firefox to not lazy load properly.
        // See https://github.com/facebook/react/issues/25883
        loading: loading,
        width: width,
        height: height,
        decoding: decoding,
        "data-nimg": fill ? 'fill' : '1',
        className: className,
        style: style,
        // It's intended to keep `src` the last attribute because React updates
        // attributes in order. If we keep `src` the first one, Safari will
        // immediately start to fetch `src`, before `sizes` and `srcSet` are even
        // updated by React. That causes multiple unnecessary requests if `srcSet`
        // and `sizes` are defined.
        // This bug cannot be reproduced in Chrome or Firefox.
        sizes: sizes,
        srcSet: srcSet,
        src: src,
        ref: ref,
        onLoad: (event)=>{
            const img = event.currentTarget;
            handleLoading(img, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized, sizesInput);
        },
        onError: (event)=>{
            // if the real image fails to load, this will ensure "alt" is visible
            setShowAltText(true);
            if (placeholder !== 'empty') {
                // If the real image fails to load, this will still remove the placeholder.
                setBlurComplete(true);
            }
            if (onError) {
                onError(event);
            }
        }
    });
});
function ImagePreload({ isAppRouter, imgAttributes }) {
    const opts = {
        as: 'image',
        imageSrcSet: imgAttributes.srcSet,
        imageSizes: imgAttributes.sizes,
        crossOrigin: imgAttributes.crossOrigin,
        referrerPolicy: imgAttributes.referrerPolicy,
        ...getDynamicProps(imgAttributes.fetchPriority)
    };
    if (isAppRouter && _reactdom.default.preload) {
        _reactdom.default.preload(imgAttributes.src, opts);
        return null;
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_head.default, {
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
            rel: "preload",
            // Note how we omit the `href` attribute, as it would only be relevant
            // for browsers that do not support `imagesrcset`, and in those cases
            // it would cause the incorrect image to be preloaded.
            //
            // https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesrcset
            href: imgAttributes.srcSet ? undefined : imgAttributes.src,
            ...opts
        }, '__nimg-' + imgAttributes.src + imgAttributes.srcSet + imgAttributes.sizes)
    });
}
const Image = /*#__PURE__*/ (0, _react.forwardRef)((props, forwardedRef)=>{
    const pagesRouter = (0, _react.useContext)(_routercontextsharedruntime.RouterContext);
    // We're in the app directory if there is no pages router.
    const isAppRouter = !pagesRouter;
    const configContext = (0, _react.useContext)(_imageconfigcontextsharedruntime.ImageConfigContext);
    const config = (0, _react.useMemo)(()=>{
        const c = configEnv || configContext || _imageconfig.imageConfigDefault;
        const allSizes = [
            ...c.deviceSizes,
            ...c.imageSizes
        ].sort((a, b)=>a - b);
        const deviceSizes = c.deviceSizes.sort((a, b)=>a - b);
        const qualities = c.qualities?.sort((a, b)=>a - b);
        return {
            ...c,
            allSizes,
            deviceSizes,
            qualities,
            // During the SSR, configEnv (__NEXT_IMAGE_OPTS) does not include
            // security sensitive configs like `localPatterns`, which is needed
            // during the server render to ensure it's validated. Therefore use
            // configContext, which holds the config from the server for validation.
            localPatterns: typeof window === 'undefined' ? configContext?.localPatterns : c.localPatterns
        };
    }, [
        configContext
    ]);
    const { onLoad, onLoadingComplete } = props;
    const onLoadRef = (0, _react.useRef)(onLoad);
    (0, _react.useEffect)(()=>{
        onLoadRef.current = onLoad;
    }, [
        onLoad
    ]);
    const onLoadingCompleteRef = (0, _react.useRef)(onLoadingComplete);
    (0, _react.useEffect)(()=>{
        onLoadingCompleteRef.current = onLoadingComplete;
    }, [
        onLoadingComplete
    ]);
    const [blurComplete, setBlurComplete] = (0, _react.useState)(false);
    const [showAltText, setShowAltText] = (0, _react.useState)(false);
    const { props: imgAttributes, meta: imgMeta } = (0, _getimgprops.getImgProps)(props, {
        defaultLoader: _imageloader.default,
        imgConf: config,
        blurComplete,
        showAltText
    });
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(ImageElement, {
                ...imgAttributes,
                unoptimized: imgMeta.unoptimized,
                placeholder: imgMeta.placeholder,
                fill: imgMeta.fill,
                onLoadRef: onLoadRef,
                onLoadingCompleteRef: onLoadingCompleteRef,
                setBlurComplete: setBlurComplete,
                setShowAltText: setShowAltText,
                sizesInput: props.sizes,
                ref: forwardedRef
            }),
            imgMeta.preload ? /*#__PURE__*/ (0, _jsxruntime.jsx)(ImagePreload, {
                isAppRouter: isAppRouter,
                imgAttributes: imgAttributes
            }) : null
        ]
    });
});
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=image-component.js.map
}),
]);

//# sourceMappingURL=1e2d0_9b98315c._.js.map