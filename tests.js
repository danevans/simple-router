const test = QUnit.test;
const routes = [
  ['foo', 'GET', () => 'foo'], // plain route
  ['bar', 'GET', () => 'bar', [ // plain + nested
      ['baz', 'GET', () => 'bar baz'] // nested
    ]
  ],
  ['baz', 'GET', null, [ // unrouted
      ['foo', 'GET', () => 'baz foo'] // nested under undefined
    ]
  ],
  ['qux', 'POST', () => 'POSTed'], // plain POST
  ['quux', 'GET', ()  => 'n/a', [
      ['foo', 'POST', () => 'POST under a GET'],
      [':id', 'GET', ({ params }) => `request with ${params.id}`]
    ]
  ],
  ['mux', null, () => 'responds to any verb']
];

test('Simple GET route', function(assert) {
  assert.equal('foo', router(routes, { path: 'foo', verb: 'GET' }));
});

test('Outer part of a nested route', function(assert) {
  assert.equal('bar', router(routes, { path: 'bar', verb: 'GET' }));
});

test('Inner part of a nested route', function(assert) {
  assert.equal('bar baz', router(routes, { path: 'bar/baz', verb: 'GET' }));
});

test('Null nested route', function(assert) {
  assert.equal(null, router(routes, { path: 'baz', verb: 'GET' }));
});

test('Simple POST route', function(assert) {
  assert.equal('POSTed', router(routes, { path: 'qux', verb: 'POST' }));
  assert.equal(undefined, router(routes, { path: 'qux', verb: 'GET' }));
});

test('POST under a GET', function(assert) {
  assert.equal('POST under a GET', router(routes, { path: 'quux/foo', verb: 'POST' }));
  assert.equal(undefined, router(routes, { path: 'quux/foo', verb: 'GET' }));
});

test('Parameter route', function(assert) {
  assert.equal('request with my-var', router(routes, { path: 'quux/my-var', verb: 'GET' }));
  assert.equal('request with :id', router(routes, { path: 'quux/:id', verb: 'GET' }));
});

test('Verbless route', function(assert) {
  assert.equal('responds to any verb', router(routes, { path: 'mux', verb: 'GET' }));
  assert.equal('responds to any verb', router(routes, { path: 'mux', verb: 'POST' }));
});
