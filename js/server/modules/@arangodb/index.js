'use strict';

// //////////////////////////////////////////////////////////////////////////////
// / DISCLAIMER
// /
// / Copyright 2016 ArangoDB GmbH, Cologne, Germany
// / Copyright 2012 triagens GmbH, Cologne, Germany
// /
// / Licensed under the Apache License, Version 2.0 (the "License")
// / you may not use this file except in compliance with the License.
// / You may obtain a copy of the License at
// /
// /     http://www.apache.org/licenses/LICENSE-2.0
// /
// / Unless required by applicable law or agreed to in writing, software
// / distributed under the License is distributed on an "AS IS" BASIS,
// / WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// / See the License for the specific language governing permissions and
// / limitations under the License.
// /
// / Copyright holder is ArangoDB GmbH, Cologne, Germany
// /
// / @author Dr. Frank Celler
// //////////////////////////////////////////////////////////////////////////////

module.isSystem = true;

var common = require('@arangodb/common');

Object.keys(common).forEach(function (key) {
  exports[key] = common[key];
});

var internal = require('internal'); // OK: db

// //////////////////////////////////////////////////////////////////////////////
// / @brief isServer
// //////////////////////////////////////////////////////////////////////////////

exports.isServer = true;

// //////////////////////////////////////////////////////////////////////////////
// / @brief isClient
// //////////////////////////////////////////////////////////////////////////////

exports.isClient = false;

// //////////////////////////////////////////////////////////////////////////////
// / @brief class "ArangoCollection"
// //////////////////////////////////////////////////////////////////////////////

// cannot yet not use arangodb
exports.ArangoCollection = require('@arangodb/arango-collection').ArangoCollection;

// //////////////////////////////////////////////////////////////////////////////
// / @brief class "ArangoDatabase"
// //////////////////////////////////////////////////////////////////////////////

// cannot yet not use arangodb
exports.ArangoDatabase = require('@arangodb/arango-database').ArangoDatabase;

// //////////////////////////////////////////////////////////////////////////////
// / @brief class "ArangoStatement"
// //////////////////////////////////////////////////////////////////////////////

// cannot yet not use arangodb
exports.ArangoStatement = require('@arangodb/arango-statement').ArangoStatement;

exports.ArangoView = require('@arangodb/arango-view').ArangoView;

// //////////////////////////////////////////////////////////////////////////////
// / @brief the global db object
// //////////////////////////////////////////////////////////////////////////////

exports.db = internal.db;

// //////////////////////////////////////////////////////////////////////////////
// / @brief the server version
// //////////////////////////////////////////////////////////////////////////////

exports.plainServerVersion = function () {
  let version = internal.version;
  let devel = version.match(/(.*)\.devel/);

  if (devel !== null) {
    version = devel[1] + '.0';
  } else {
    devel = version.match(/(.*)((alpha|beta|devel|rc)[0-9]*)$/);

    if (devel !== null) {
      version = devel[1] + '0';;
    }
  }

  return version;
};
