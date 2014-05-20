/*!
 * GenPass library
 * https://github.com/chriszarate/genpass-lib
 * http://supergenpass.com/genpass/
 * License: GPLv2
 */

'use strict';

var core = require('crypto-js/core');
var md5 = require('crypto-js/md5');

var defaults = {
  length: 8,
  passwordCase: 'lowercase'
};

// Hard-coded and static list of ccTLDs. Define as a string and split to save
// a few milliseconds.
var ccTLDs = 'ab.ca|ac.ac|ac.at|ac.be|ac.cn|ac.il|ac.in|ac.jp|ac.kr|ac.nz|ac.th|ac.uk|ac.za|adm.br|adv.br|agro.pl|ah.cn|aid.pl|alt.za|am.br|arq.br|art.br|arts.ro|asn.au|asso.fr|asso.mc|atm.pl|auto.pl|bbs.tr|bc.ca|bio.br|biz.pl|bj.cn|br.com|cn.com|cng.br|cnt.br|co.ac|co.at|co.il|co.in|co.jp|co.kr|co.nz|co.th|co.uk|co.za|com.au|com.br|com.cn|com.ec|com.fr|com.hk|com.mm|com.mx|com.pl|com.ro|com.ru|com.sg|com.tr|com.tw|cq.cn|cri.nz|de.com|ecn.br|edu.au|edu.cn|edu.hk|edu.mm|edu.mx|edu.pl|edu.tr|edu.za|eng.br|ernet.in|esp.br|etc.br|eti.br|eu.com|eu.lv|fin.ec|firm.ro|fm.br|fot.br|fst.br|g12.br|gb.com|gb.net|gd.cn|gen.nz|gmina.pl|go.jp|go.kr|go.th|gob.mx|gov.br|gov.cn|gov.ec|gov.il|gov.in|gov.mm|gov.mx|gov.sg|gov.tr|gov.za|govt.nz|gs.cn|gsm.pl|gv.ac|gv.at|gx.cn|gz.cn|hb.cn|he.cn|hi.cn|hk.cn|hl.cn|hn.cn|hu.com|idv.tw|ind.br|inf.br|info.pl|info.ro|iwi.nz|jl.cn|jor.br|jpn.com|js.cn|k12.il|k12.tr|lel.br|ln.cn|ltd.uk|mail.pl|maori.nz|mb.ca|me.uk|med.br|med.ec|media.pl|mi.th|miasta.pl|mil.br|mil.ec|mil.nz|mil.pl|mil.tr|mil.za|mo.cn|muni.il|nb.ca|ne.jp|ne.kr|net.au|net.br|net.cn|net.ec|net.hk|net.il|net.in|net.mm|net.mx|net.nz|net.pl|net.ru|net.sg|net.th|net.tr|net.tw|net.za|nf.ca|ngo.za|nm.cn|nm.kr|no.com|nom.br|nom.pl|nom.ro|nom.za|ns.ca|nt.ca|nt.ro|ntr.br|nx.cn|odo.br|on.ca|or.ac|or.at|or.jp|or.kr|or.th|org.au|org.br|org.cn|org.ec|org.hk|org.il|org.mm|org.mx|org.nz|org.pl|org.ro|org.ru|org.sg|org.tr|org.tw|org.uk|org.za|pc.pl|pe.ca|plc.uk|ppg.br|presse.fr|priv.pl|pro.br|psc.br|psi.br|qc.ca|qc.com|qh.cn|re.kr|realestate.pl|rec.br|rec.ro|rel.pl|res.in|ru.com|sa.com|sc.cn|school.nz|school.za|se.com|se.net|sh.cn|shop.pl|sk.ca|sklep.pl|slg.br|sn.cn|sos.pl|store.ro|targi.pl|tj.cn|tm.fr|tm.mc|tm.pl|tm.ro|tm.za|tmp.br|tourism.pl|travel.pl|tur.br|turystyka.pl|tv.br|tw.cn|uk.co|uk.com|uk.net|us.com|uy.com|vet.br|web.za|web.com|www.ro|xj.cn|xz.cn|yk.ca|yn.cn|za.com';
var ccTLDList = ccTLDs.split('|');
var ccTLDListLength = ccTLDList.length;

var generatePassword = function (hashInput, length, passwordCase) {
  var password = md5(hashInput).toString().substring(0, length);
  return changeCase(password, passwordCase);
};

var changeCase = function (password, passwordCase) {

  if (passwordCase === 'mixed') {
    var letterCount = 0;
    var letters = /[a-z]/;
    password = password.split('');
    for (var i = 0; i < password.length; i++) {
      if (letters.test(password[i])) {
        letterCount++;
        if(letterCount % 2) {
          password[i] = password[i].toUpperCase();
        }
      }
    }
    return password.join('');
  }

  if (passwordCase === 'uppercase') {
    return password.toUpperCase();
  }

  return password;

};

var validatePasswordInput = function(str) {
  if (typeof str !== 'string' || !str.length) {
    throw new Error('Password must be a non-empty string');
  }
};

var validatePasswordCase = function (str) {
  if (str !== 'lowercase' && str !== 'uppercase' && str !== 'mixed') {
    throw new Error('Password case must be "lowercase", "uppercase", or "mixed"');
  }
};

var validateLength = function (num) {
  if (num !== parseInt(num, 10) || num < 4 || 32 < num) {
    throw new Error('Length must be an integer between 4 and 32: ' + num);
  }
};

var validateOptions = function (options) {

  options = options || {};

  // Loop through defaults and test for undefined options.
  for (var option in defaults) {
    if (typeof options[option] === 'undefined') {
      options[option] = defaults[option];
    }
  }

  validateLength(options.length);
  validatePasswordCase(options.passwordCase);

  return options;

};

// Isolate the domain name of a URL.
var getDomainName = function (url, removeSubdomains) {

  var domain = /^(?:[a-z]+:\/\/)?(?:[^/@]+@)?([^/:]+)/i;
  var ipAddress = /^\d{1,3}\.\d{1,3}.\d{1,3}\.\d{1,3}$/;
  var match = url.match(domain);
  var hostname;

  if (match) {
    hostname = match[1];
  } else {
    throw new Error('URL is invalid: ' + url);
  }

  // If the hostname is an IP address, no further processing can be done.
  if (hostname.match(ipAddress)) {
    return hostname;
  }

  // Return the hostname with subdomains removed, if requested.
  return cleanDomainName(hostname);

};

// Remove subdomains while respecting a number of hard-coded secondary ccTLDs.
var cleanDomainName = function (hostname) {

  var hostnameParts = hostname.split('.');

  // A hostname with less than three parts is as short as it will get.
  if (hostnameParts.length < 3) {
    return hostname;
  }

  // Extract a potential domain name.
  var possibleDomain = hostnameParts.slice(-2).join('.');

  // Loop through list of ccTLDs.
  for (var i = 0; i < ccTLDListLength; i++) {
    if (possibleDomain === ccTLDList[i]) {
      // When matched, return the ccTLD plus one extra part.
      return hostnameParts.slice(-3).join('.');
    }
  }

  // If no ccTLDs were matched, return the domain name.
  return possibleDomain;

};

var api = function (masterPassword, url, options) {

  options = validateOptions(options);
  validatePasswordInput(masterPassword);

  var input = masterPassword + ':' + getDomainName(url);
  var words = core.enc.Latin1.parse(input);

  return generatePassword(words, options.length, options.passwordCase);

};

api.hostname = getDomainName;
module.exports = api;
