import requests
import sys
import json
from datetime import datetime

class QualityFindsAPITester:
    def __init__(self, base_url="https://quality-finds-3.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, expected_fields=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            print(f"   Status: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                
                # Check response content if expected_fields provided
                if expected_fields and response.content:
                    try:
                        response_data = response.json()
                        if isinstance(response_data, list) and len(response_data) > 0:
                            # Check first item in array
                            item = response_data[0]
                            for field in expected_fields:
                                if field not in item:
                                    print(f"⚠️  Warning: Expected field '{field}' not found in response")
                        elif isinstance(response_data, dict):
                            for field in expected_fields:
                                if field not in response_data:
                                    print(f"⚠️  Warning: Expected field '{field}' not found in response")
                    except json.JSONDecodeError:
                        print(f"⚠️  Warning: Could not parse JSON response")
                
                return True, response.json() if response.content else {}
            else:
                self.failed_tests.append({
                    'name': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'url': url,
                    'response': response.text[:200] if response.text else 'No response'
                })
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                if response.text:
                    print(f"   Response: {response.text[:200]}...")
                return False, {}

        except requests.exceptions.RequestException as e:
            self.failed_tests.append({
                'name': name,
                'error': str(e),
                'url': url
            })
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_get_categories(self):
        """Test get all categories"""
        expected_fields = ['id', 'name', 'slug', 'description', 'image_url']
        return self.run_test("Get Categories", "GET", "categories", 200, expected_fields=expected_fields)

    def test_get_category_by_slug(self):
        """Test get category by slug"""
        expected_fields = ['id', 'name', 'slug', 'description', 'image_url']
        success, _ = self.run_test("Get Category - Wallets", "GET", "categories/wallets", 200, expected_fields=expected_fields)
        if success:
            # Test invalid category
            self.run_test("Get Category - Invalid", "GET", "categories/invalid", 404)
        return success

    def test_get_all_products(self):
        """Test get all products"""
        expected_fields = ['id', 'name', 'description', 'price', 'category', 'image_url', 'material']
        return self.run_test("Get All Products", "GET", "products", 200, expected_fields=expected_fields)

    def test_get_products_by_category(self):
        """Test get products filtered by category"""
        expected_fields = ['id', 'name', 'description', 'price', 'category', 'image_url']
        categories = ['wallets', 'jewelry', 'bags', 'belts', 'watches']
        
        all_passed = True
        for category in categories:
            success, _ = self.run_test(f"Get Products - {category.title()}", "GET", f"products?category={category}", 200, expected_fields=expected_fields)
            if not success:
                all_passed = False
        
        return all_passed

    def test_get_featured_products(self):
        """Test get featured products"""
        expected_fields = ['id', 'name', 'is_featured']
        return self.run_test("Get Featured Products", "GET", "products?featured=true", 200, expected_fields=expected_fields)

    def test_get_product_by_id(self):
        """Test get product by ID"""
        expected_fields = ['id', 'name', 'description', 'price', 'category', 'image_url', 'material']
        
        # Test valid product IDs from seed data
        product_ids = ['prod-1', 'prod-4', 'prod-7', 'prod-10', 'prod-12']
        all_passed = True
        
        for prod_id in product_ids:
            success, _ = self.run_test(f"Get Product - {prod_id}", "GET", f"products/{prod_id}", 200, expected_fields=expected_fields)
            if not success:
                all_passed = False
        
        # Test invalid product ID
        self.run_test("Get Product - Invalid", "GET", "products/invalid-id", 404)
        
        return all_passed

    def test_contact_form(self):
        """Test contact form submission"""
        contact_data = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "email": "test@example.com",
            "subject": "Test Inquiry",
            "message": "This is a test message from the API testing suite."
        }
        
        expected_fields = ['id', 'name', 'email', 'subject', 'message', 'created_at']
        success, response = self.run_test("Contact Form Submission", "POST", "contact", 200, data=contact_data, expected_fields=expected_fields)
        
        if success and response:
            # Verify the response contains our submitted data
            if (response.get('name') == contact_data['name'] and 
                response.get('email') == contact_data['email']):
                print("✅ Contact form data correctly saved and returned")
            else:
                print("⚠️  Warning: Contact form response data doesn't match input")
        
        # Test invalid contact form (missing fields)
        invalid_data = {"name": "Test", "email": ""}
        self.run_test("Contact Form - Invalid Data", "POST", "contact", 422, data=invalid_data)
        
        return success

def main():
    print("🚀 Starting Quality Finds API Testing...")
    print("=" * 60)
    
    tester = QualityFindsAPITester()
    
    # Test all endpoints
    tests = [
        ("API Root", tester.test_root_endpoint),
        ("Categories", tester.test_get_categories),
        ("Category by Slug", tester.test_get_category_by_slug),
        ("All Products", tester.test_get_all_products),
        ("Products by Category", tester.test_get_products_by_category),
        ("Featured Products", tester.test_get_featured_products),
        ("Product by ID", tester.test_get_product_by_id),
        ("Contact Form", tester.test_contact_form),
    ]
    
    for test_name, test_func in tests:
        print(f"\n📋 Running {test_name} Tests...")
        try:
            test_func()
        except Exception as e:
            print(f"❌ Test suite '{test_name}' failed with error: {str(e)}")
            tester.failed_tests.append({
                'name': test_name,
                'error': str(e)
            })
    
    # Print summary
    print("\n" + "=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    print(f"Total Tests: {tester.tests_run}")
    print(f"Passed: {tester.tests_passed}")
    print(f"Failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed / tester.tests_run * 100):.1f}%" if tester.tests_run > 0 else "0%")
    
    if tester.failed_tests:
        print(f"\n❌ FAILED TESTS ({len(tester.failed_tests)}):")
        for i, failure in enumerate(tester.failed_tests, 1):
            print(f"{i}. {failure['name']}")
            if 'error' in failure:
                print(f"   Error: {failure['error']}")
            else:
                print(f"   Expected: {failure['expected']}, Got: {failure['actual']}")
                print(f"   URL: {failure['url']}")
            print()
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())