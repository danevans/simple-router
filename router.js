// first arg is a route spec
function matchRoute(
  [pathPart, specVerb, handler, subroutes], rest, verb, params
) {
  if (rest.length > 0 && subroutes) {
    return matchRoutes(subroutes, rest, verb, params);
  } else {
    const verbMatch = (verb === specVerb) || !specVerb;
    if (handler && verbMatch) {
      return { params, handler }
    }
  }
}

function matchRoutes(routes, [first, ...rest], verb, params={}) {
  for (let routeSpec of routes) {
    let pathPart = routeSpec[0];
    if (pathPart[0] === ':') {
      const name = pathPart.slice(1, pathPart.length);
      if (name === '') {
        throw new Error('Params must have a name, they cannot be empty');
      }
      if (params[name]) {
        throw new Error('Cannot match the same param more than once');
      }
      params[name] = first;
      return matchRoute(routeSpec, rest, verb, params);
    } else if (first === pathPart) {
      return matchRoute(routeSpec, rest, verb, params);
    }
  }
}

// routes is an array of route specs
// request {path, verb, body, ...}
function router(routes, request) {
  const pathParts = request.path.split('/').filter(part => part !== '');
  const responder = matchRoutes(routes, pathParts, request.verb);
  if (responder) {
    const response = { params: responder.params };
    return responder.handler(response);
  }
}
