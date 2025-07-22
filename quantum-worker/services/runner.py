import time 
import pennylane as pnl 
import cirq as cq 
import numpy as np
from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator
from qiskit.quantum_info import Operator

RUNNER_MAPPINGS = {
    "qiskit" : "run_qiskit",
    "cirq" : "run_cirq",
    "pennylane" : "run_pennylane",
}

def run_benchmark_on_all(qasm_code: str, simulators: list) -> list:
    results = []

    for simulator in simulators:
        sim_lower  = simulator.lower()
        if sim_lower in RUNNER_MAPPINGS:
            runner_func = globals()[RUNNER_MAPPINGS[sim_lower]]
            results.append(runner_func(qasm_code))
        
    return results


def run_cirq(qasm_code):
    try:
        qc = QuantumCircuit.from_qasm_str(qasm_code)
        qc.remove_final_measurements()
        unitary = Operator(qc).data
        n_qubits = qc.num_qubits
        qubits = []

        for i in range(n_qubits):
            qubits.append(cq.LineQubit(i))

        gate = cq.MatrixGate(unitary)

        circuit = cq.Circuit(gate(*qubits))
        simulator = cq.Simulator()
    
        start_time = time.time()
        result = simulator.simulate(circuit)
        exec_time = time.time() - start_time 

        state_vector = result.final_state_vector.tolist()

        return {
            "simulator" : "Cirq",
            "exec_time" : exec_time,
            "state_vector" : state_vector
        }
    
    except Exception as e:
        return {"backend": "Cirq", "error": str(e)}

def run_qiskit(qasm_code):
    try:
        qc = QuantumCircuit.from_qasm_str(qasm_code)
        qc.remove_final_measurements()
        simulator = AerSimulator(method = "statevector")
        qc.save_statevector()
        transpiled = transpile(qc, simulator)

        start_time = time.time()
        result = simulator.run(transpiled).result()
        exec_time = time.time() - start_time

        state_vector = result.get_statevector().data.tolist()

        return {
            "backend": "Qiskit",
            "exec_time" : exec_time,
            "state_vector" : state_vector
        }
    

    except Exception as e:
        return {"backend" : "Qiskit", "error" : str(e)}
    

def run_pennylane(qasm_code):
    try:
        qc = QuantumCircuit.from_qasm_str(qasm_code)
        qc.remove_final_measurements()
        n = qc.num_qubits

        pl_qfunc = pnl.from_qiskit(qc)
        dev = pnl.device("default.qubit", wires = n)

        @pnl.qnode(dev)
        def circuit():
            pl_qfunc()
            return pnl.state()
        
        start_time = time.time()
        result_state = circuit().tolist()
        exec_time = time.time() - start_time

        return {
            "backend" : "Pennylane",
            "exec_time" : exec_time,
            "state_vector" : result_state 
        }
    

    except Exception as e:
        return {"backend" : "Pennylane", "error" : str(e)}

    
