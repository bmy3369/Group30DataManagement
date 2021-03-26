import unittest
import json
from rest_utils import *

class TestExample(unittest.TestCase):
    def test_api(self):
        result = get_rest_call(self, 'http://localhost:5000/example_api')
        self.assertEqual(4, result[0],"Should have returned a count of '4'")
        print("API test successfully returned a count of '4' ")

