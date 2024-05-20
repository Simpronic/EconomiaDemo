from http.server import HTTPServer, SimpleHTTPRequestHandler
import requests
import urllib.parse

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'x-textrazor-key, Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'x-textrazor-key, Content-Type')
        self.end_headers()

    def do_POST(self):
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            headers = {
                'x-textrazor-key': self.headers['x-textrazor-key'],
                'Content-Type': 'application/x-www-form-urlencoded'
            }

            response = requests.post('https://api.textrazor.com', headers=headers, data=post_data)
            self.send_response(response.status_code)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(response.content)

def run(server_class=HTTPServer, handler_class=CORSRequestHandler, port=8080):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Serving on port {port}')
    httpd.serve_forever()

if __name__ == '__main__':
    run()