import json
import requests

link = "http://clinicaltrials.gov/show/NCT00984867?displayxml=true"
response = requests.get(link)
# req = urllib2.Request(link)
# req.add_header('Content-Type', 'application/json')

# response = urllib2.urlopen(req, json.dumps(data))
# print(json.loads())


""" 
import http.client, urllib.request, urllib.parse, urllib.error


headers = {
}

params = urllib.parse.urlencode({
})

conn = http.client.HTTPSConnection('clinicaltrials.gov')
conn.request("POST", "/show/NCT00984867?displayxml=true")
payload = conn.getresponse().read().decode('utf-8')

"""
""" Parsing the XML """

import xml.etree.ElementTree as etree
tree = etree.fromstring(response.text)
intervention = tree.find("intervention")
# print(intervention)
for child in intervention:
  print (child.tag, child.text)
