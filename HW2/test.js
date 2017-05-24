var subject = require('./subject.js')
var mock = require('mock-fs');
subject.inc(-1,undefined);
subject.inc(1,1099511627775);
subject.inc(-1,undefined);
subject.inc(-1,1099511627775);
subject.inc(-1,undefined);
subject.inc(0,undefined);
subject.weird(7,-1,41,"strict");
subject.weird(-3,1,43,"alternate-string");
subject.weird(-3,-1,41,"werw");
subject.weird(-3,-1,41,"alternate-string");
subject.weird(17,-1,41,"strict");
subject.weird(7,0,42,"strict");
mock({"path/fileExists":{},"pathContent":{"file1":"text content"}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"path/fileExists":{"file1":"some content"}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"path/fileExists":{},"pathContent":{"file1":""}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"pathContent":{"file1":"text content"},"path/fileExists":{"file1":"some content"}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"pathContent":{"file1":""}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"path/fileExists":{"file1":"some content"},"pathContent":{"file1":""}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
subject.normalize('');
subject.normalize('');
subject.normalize('');
subject.normalize('');
subject.normalize('');
subject.normalize('');
subject.format('1-486-487-6412 x13115','(NNN) NNN-NNNN',{"normalize":true});
subject.format('551.033.3792','(###) ###-#### x#####',{"normalize":null});
subject.format('005.280.7503','(NNN) NNN-NNNN',{"notNormalize":null});
subject.format('1-567-924-9015 x98879','###-###-####',{"notNormalize":true});
subject.format('163.635.3794 x93207','(NNN) NNN-NNNN',false);
subject.format('1-480-267-8588 x83544','###-###-####',true);
subject.blackListNumber("212926422");
subject.blackListNumber('081-515-5007 x3614');
subject.blackListNumber("212926422");
subject.blackListNumber('1-436-735-1501 x813');
subject.blackListNumber("212926422");
subject.blackListNumber('(460) 526-4380');
