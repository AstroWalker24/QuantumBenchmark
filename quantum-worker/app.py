from flask import Flask, request, jsonify
from services.runner import run_benchmark_on_all
import warnings 
from dotenv import load_dotenv
import os


load_dotenv()

APP_ENV = os.getenv(key='APP_ENV', default='development')

if APP_ENV == 'production': 
    print('App running in Prod')
    warnings.filterwarnings(action='ignore')
else:
    print('App running in Dev')


app = Flask(__name__)


@app.route(rule='/benchmark', methods=['POST'])
def benchmark_circuit():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid request: No JSON payload found"}), 400
    
    qasm_code = data.get('qasm_code')
    simulators = data.get('simulators')

    if not qasm_code or not isinstance(qasm_code, str):
        return jsonify({"error": "Invalid or missing qasm_code (must be a string)"}), 400
    
    if not simulators or not isinstance(simulators, list):
        return jsonify({"error": "Invalid or missing simulators (must be a list)"}), 400
    
    try:
        results = run_benchmark_on_all(qasm_code=qasm_code, simulators=simulators)

        for res in results:
            if 'error' in res:
                return jsonify({"error": f"Error running {res['backend']}: {res['error']}"}), 500
            
        return jsonify({"results": results})
    
    except Exception as e:
        return jsonify({"error": "An internal server error occurred", "details":str(e) }), 500
    
if __name__=="__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)



