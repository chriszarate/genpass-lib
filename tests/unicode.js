var genpass = require('../genpass-lib');

var data = [
    ['de106d66', 'Γαζέες καὶ μυρτιὲς δὲν θὰ βρῶ πιὰ στὸ χρυσαφὶ ξέφωτο'],
    ['c73e81c1', 'Benjamín pidió una bebida de kiwi y fresa'],
    ['397f2ef2', 'Ça me fait peur de fêter noël là, sur cette île bizarroïde où'],
    ['f923626e', 'Árvíztűrő tükörfúrógép'],
    ['0140fbed', 'わかよたれそつねならむ'],
    ['dfd35c57', 'ウヰノオクヤマ ケフコエテ'],
    ['e400bc06', 'מצא לו חברה איך הקליטה'],
    ['2a361323', 'В чащах юга жил бы цитрус? Да, но фальшивый экземпляр!'],
    ['69c4ee0b', 'จงฝ่าฟันพัฒนาวิชาการ']
].map(function(row){
    return {
        input: row[1],
        output: row[0]
    };
});

exports.testUnicode = function(test) {
    data.forEach(function(row) {
        test.equal(genpass(row.input, 'example.com'), row.output);
    });
    test.done();
};
