# genpass-lib

[![Build Status][build-status]][travis-ci]

This is the official JavaScript implementation of [GenPass][gp]. It provides
the code used by the bookmarklet and mobile version of GenPass to generate
passwords. If you are building or have built your own JavaScript-based
application for GenPass, please consider using this library.


## NPM module

```shell
npm install genpass-lib
```


## Usage

```javascript
var genpass = require('genpass-lib');

// A string containing the user's master password.
var masterPassword = 'master-password';

// A URI or hostname of the site being visited.
var URI = 'http://www.example.com/page.html';

// Generate the password.
var generatedPassword = genpass(masterPassword, URI, {/* options */});
```


## Options

As shown above, `genpass-lib` optionally accepts a hash map of options.

### length

* Default `8`
* Expects `Number`

Length of the generated password. Valid lengths are integers between 4 and 32
inclusive.

### passwordCase

* Default `lowercase`
* Expects `String`

A string indicating desired password case. Valid values are `lowercase`,
`uppercase`, and `mixed`.


## Domain name isolation

By default, `genpass-lib` isolates the domain name (e.g., `example.com`) from
the hostname by removing all subdomains. This ensures that the same password is
generated at `example.com`, `www.example.com`, and `login.example.com`. It
additionally uses a hardcoded list of country-code and special-purpose TLDs to
produce different passwords across sites registered there. While this list is
no doubt incomplete and out-of-date, it remains static to maintain backwards
compatibility.

To help provide user feedback about the exact hostname used to generate the
password, `genpass-lib` provides a `hostname` method that can be used
separately.

```javascript
// Isolate a domain name from a URL using GenPass's rules.
var hostname = genpass.hostname('http://login.example.com/doLogin.htm');
```


## Browser environments

To use `genpass-lib` in browser environments, run `gulp browserify`. Take the
created `dist/genpass-lib.browser.js` and include it on your page. Use the
global `genpass` as documented above.


## Explanation of the algorithm

GenPass is a very simple password hashing scheme. At its essence, it takes
a master password and a hostname and concatenates them together:

```
masterpassword:example.com
```

It uses this as the input for a hash function (MD5). The hash is then cut to
the user's preferred password length.

For more detail, please see the (well-commented and concise) source code.


## Dependencies and license

Hash functions are provided by [crypto-js][crypto-js]. All original code is
released under the [GPLv2][gplv2].


[gp]: http://supergenpass.com/genpass/
[build-status]: https://secure.travis-ci.org/chriszarate/genpass-lib.svg?branch=master
[travis-ci]: http://travis-ci.org/chriszarate/genpass-lib
[crypto-js]: https://www.npmjs.org/package/crypto-js
[gplv2]: http://www.gnu.org/licenses/gpl-2.0.html
