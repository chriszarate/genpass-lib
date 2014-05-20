var genpass = require('../genpass-lib');

exports.testHostnames = function (test) {

  var hostnames = [
    [
      'http://www.google.com/search',  // input URI
      'google.com'                     // domain name
    ],
    [
      'https://mail.google.com/mail/u/0/',
      'google.com'
    ],
    [
      'ftp://pandis.ucs.cam.ac.uk/media/',
      'cam.ac.uk'
    ],
    [
      'imap://mail.outlook.com:443',
      'outlook.com'
    ],
    [
      'ssh://server.example.com:~/public',
      'example.com'
    ],
    [
      'git://git@github.com:user/repo.git',
      'github.com'
    ],
    [
      'gopher://user:password@gopher.example.com',
      'example.com'
    ],
    [
      'ftp://user:password@ftp.example.com:21/files/',
      'example.com'
    ],
    [
      'www.example.com/path/to/page?param=value',
      'example.com'
    ],
    [
      'sapporo.hokkaido.jp',
      'hokkaido.jp'
    ],
    [
      'api.example.com:80',
      'example.com'
    ],
    [
      '192.168.0.1',
      '192.168.0.1'
    ],
    [
      'http://8.8.8.8/',
      '8.8.8.8'
    ],
    [
      'https://localhost:8000',
      'localhost'
    ]
  ];

  hostnames.forEach(function(c) {
    test.equal(genpass.hostname(c[0]), c[1]);
  });

  test.done();

};
