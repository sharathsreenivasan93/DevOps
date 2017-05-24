import xml.etree.ElementTree
from pprint import pprint

if __name__=='__main__':

	testres = {}
	useless = []
	total = 0
	for i in range(100):
		total = 0
		#e = xml.etree.ElementTree.parse('junit.xml').getroot()
		path = './reports/junitResult'+str(i+1)+'.xml'
		e = xml.etree.ElementTree.parse(path)
		count = 0
		for suite in e.iter('suite'):
		#testcase = suite.find('name').text
			for cases in suite:
				for case in cases:
					total += 1
					className = case.find('className').text 
					testName = case.find('testName').text
					testcase = className + " " + testName
					# if testcase in testres:
					# 	testres[className + " " + testcase] += 1
					# else:
					# 	testres[className + " " + testcase] = 1
					
					if (len(case.findall('errorStackTrace')) == 1):
						if testcase in testres:
							testres[testcase] += 1
						else:
							testres[testcase] = 1
					else:
						if testcase in testres:
							testres[testcase] += 0
						else:
							testres[testcase] = 0
							

	#print testres
	for testcase in testres:
		if testres[testcase] == 0:
			#print testcase
			#print testres[testcase]
			useless.append(testcase);

    

	print("Useless Testcaes");
	print("=================");
	pprint(useless);
	useless = list(set(useless));
	print("=================");
	print('Total number of builds: ' + str(i+1));
	print('Total number of useless testcases: '+str(len(useless)));
	print("=================");
	#print('Number of total testcases: '+str(len(testres)));
	#print('Number of total testcases by counter: '+ str(total));
