var genpass = require('../genpass-lib');

exports.testSimple = function(test){
    var data = [
        ['74ee384f', 'test', 'example.com'],
        ['74Ee384F', 'test', 'example.com', { passwordCase: 'mixed' }],
        ['74EE', 'test', 'example.com', { length: 4, passwordCase: 'uppercase' }],
        ['74Ee384F478f3F213543460085566075', 'test', 'example.com', { length: 32, passwordCase: 'mixed' }],
        ['a04722166f1e', 'test', 'https://www.google.com/', { length: 12 }],
        ['a0472216', 'test', 'https://www.google.com/', { passwordCase: 'lowercase' }],
        ['7f138cb5', 'test', 'example.co.uk'],
        ['fcc61e68', 'test', 'example.gov.ac']
    ];

    data.forEach(function(c){
        test.equal(genpass(c[1], c[2], c[3]), c[0]);
    });

    test.done();
};
