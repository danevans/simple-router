# Simple Router

A router written using functional programming concepts that parses routes specified in a simple structure.

## Installation

**TODO**

For now, router.js can be downloaded and included with other scripts.

## Route structure

The `router` function takes an array of route specs and a request object. It tests the request object against each route spec. When it finds a matching route spec it calls that specs handler function passing it any parsed params and returns the result.

### Route Specs

A route spec is a JavaScript array. It has up to four members.

```js
['foo', 'GET', (request) => 'anything']
```

The first is a string which specifies to a part of the URL. If the string begins with a colon (`:`) then it is treated as a URL parameter and the value is passed to the handler function.

The second is a string [HTTP verb](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) which must also match the current request object's verb for the routeSpec to match. If the verb parameter is `null` or any "[falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)" value then that spec matches any verb. A parent route's verb does not affect child routes.

The third member is a handler function. This will be called if the route matches the request. It should accept a response object which has a `params` key that contains a map of all parameters parsed out of the URL. Whatever the handler function returns is what the router will return.

The final parameter is an optional array of route specs. (Yes, this is the same structure that is passed to the `router` function initially.) When this parameter is present and the current route spec matches the request object rather than call the handler function it will attempt to match the rest of the request against one of the nested route specs.

### Request Object

The request object is a JavaScript Object has two keys, a `path` and a `verb`.

The `path` is a string that is the path part of a URL.

The `verb` is  string [HTTP verb](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods).

## Tests

The tests use [Qunit](http://qunitjs.com).

`npm install`

`open test.html`

## TODO

* could validate routes earlier
* shorthands
  * less nesting for single routes
  * a namespace can be just a string
  * leaving params out just works
  * variables could be named for whether they are the route specs or the incoming request path (`pathPart` in particular)
* generate URLs from routes
  * this may require named routes
* request body should be passed to the handler
* query params should be passed to the handler
* handle requsets for static assets
  * Prevent using `..` to expose files outside static directory
* real installation
