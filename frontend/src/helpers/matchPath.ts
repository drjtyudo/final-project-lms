import { pathToRegexp } from 'path-to-regexp'

const cache = {}
const cacheLimit = 10000
let cacheCount = 0

function compilePath(path, options) {
  const cacheKey = `${options.end}${options.strict}${options.sensitive}`
  const pathCache = cache[cacheKey] || (cache[cacheKey] = {})

  if (pathCache[path]) return pathCache[path]

  const keys = []
  const regexp = pathToRegexp(path, keys, options)
  const result = { regexp, keys }

  if (cacheCount < cacheLimit) {
    pathCache[path] = result
    cacheCount += 1
  }

  return result
}

interface Options {
  url?: string
  path?: string | string[]
  strict?: boolean
  sensitive?: boolean
  exact?: boolean
  params?: any
}

/**
 * Public API for matching a URL pathname to a path.
 */
function matchPath(pathname, options: Options = {}) {
  if (typeof options === 'string' || Array.isArray(options)) {
    // eslint-disable-next-line no-param-reassign
    options = { path: options }
  }

  const { path, exact = false, strict = false, sensitive = false } = options

  const paths = [].concat(path)

  return paths.reduce((matched, _path) => {
    if (!_path && _path !== '') return null
    if (matched) return matched

    const { regexp, keys } = compilePath(_path, {
      end: exact,
      strict,
      sensitive,
    })
    const match = regexp.exec(pathname)

    if (!match) return null

    const [url, ...values] = match
    const isExact = pathname === url

    if (exact && !isExact) return null

    return {
      path: _path, // the path used to match
      url: _path === '/' && url === '' ? '/' : url, // the matched portion of the URL
      isExact, // whether or not we matched exactly
      params: keys.reduce((memo, key, index) => {
        // eslint-disable-next-line no-param-reassign
        memo[key.name] = values[index]
        return memo
      }, {}),
    }
  }, null)
}

export default matchPath
