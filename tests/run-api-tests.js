/* Simple API test runner.
   Usage:
     ENABLE_TEST_API=1 TEST_BASE_URL=http://localhost:3000 node tests/run-api-tests.js
*/
const base = process.env.TEST_BASE_URL || 'http://localhost:3000'
const headers = { 'Content-Type': 'application/json' }

function ok(name) { console.log('\x1b[32m[PASS]\x1b[0m', name) }
function fail(name, err) { console.error('\x1b[31m[FAIL]\x1b[0m', name, err) }

async function fetchJson(path, opts) {
  const res = await fetch(base + path, opts)
  const text = await res.text()
  try { return { status: res.status, body: JSON.parse(text) } } catch { return { status: res.status, body: text } }
}

;(async () => {
  try {
    console.log('Using base URL:', base)
    // 1) Create test admin
    let r = await fetchJson('/api/test/auth', { method: 'POST', headers, body: JSON.stringify({ username: 'testadmin', password: 'testpass' }) })
    if (r.status === 200) ok('create test admin')
    else fail('create test admin', r)

    // 2) Login
    r = await fetchJson('/api/auth', { method: 'POST', headers, body: JSON.stringify({ username: 'testadmin', password: 'testpass' }), credentials: 'include' })
    if (r.status === 200 && r.body && r.body.ok) ok('login')
    else fail('login', r)

    // 3) Category CRUD via test API
    r = await fetchJson('/api/test/categories', { method: 'POST', headers, body: JSON.stringify({ name: 'TestCat', slug: 'testcat', description: 'desc' }) })
    if (r.status === 200 && r.body && r.body._id) {
      ok('create category')
      const id = r.body._id
      // fetch list
      r = await fetchJson('/api/test/categories')
      if (r.status === 200 && Array.isArray(r.body)) ok('list categories')
      else fail('list categories', r)
      // update via admin API
      r = await fetchJson(`/api/admin/categories/${id}`, { method: 'PUT', headers, body: JSON.stringify({ name: 'Updated' }) })
      if (r.status === 200) ok('update category')
      else fail('update category', r)
      // delete
      r = await fetchJson(`/api/admin/categories/${id}`, { method: 'DELETE' })
      if (r.status === 200) ok('delete category')
      else fail('delete category', r)
    } else fail('create category', r)

    // 4) Operation CRUD via test API
    // create category to reference
    r = await fetchJson('/api/test/categories', { method: 'POST', headers, body: JSON.stringify({ name: 'OpCat', slug: 'opcat' }) })
    const catId = r.body._id
    r = await fetchJson('/api/test/operations', { method: 'POST', headers, body: JSON.stringify({ title: 'Op1', slug: 'op1', categoryId: catId, videoUrl: 'https://drive.google.com/file/d/1A2b3C4d5E6f7G8h9I0jK1lM2nO3pQ4r/view?usp=sharing' }) })
    if (r.status === 200 && r.body && r.body._id) {
      ok('create operation')
      const id = r.body._id
      r = await fetchJson('/api/test/operations')
      if (r.status === 200 && Array.isArray(r.body)) ok('list operations')
      else fail('list operations', r)
      r = await fetchJson(`/api/admin/operations/${id}`, { method: 'PUT', headers, body: JSON.stringify({ title: 'Op1-updated' }) })
      if (r.status === 200) ok('update operation')
      else fail('update operation', r)
      r = await fetchJson(`/api/admin/operations/${id}`, { method: 'DELETE' })
      if (r.status === 200) ok('delete operation')
      else fail('delete operation', r)
    } else fail('create operation', r)

    console.log('Tests completed')
  } catch (e) {
    console.error('Test runner error', e)
  }
})()
