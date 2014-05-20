var genpass = require('../genpass-lib');

exports.testFailures = function(test){
    var data = [
        ['test', 'example.com', { passwordCase: 'default' }],
        ['test', 'example.com', { length: -1 }],
        ['test', 'example.com', { length: 0 }],
        ['test', 'example.com', { length: '12'}],
        ['test', 'example.com', { length: 3 }],
        ['test', 'example.com', { length: 33 }],
        ['test', ''],
        ['test', '/foo/'],
        ['test', false],
        [false, 'example.com'],
        [null, 'example.com'],
        [undefined, 'example.com'],
        ['', 'example.com']
    ];

    data.forEach(function(c){
        test.throws(function(){
            genpass(c[0], c[1], c[2]);
        }, 'Dataset: ' + c[0] + ', ' + c[1] + ', ' + JSON.stringify(c[2]));
    });

    test.done();
};
