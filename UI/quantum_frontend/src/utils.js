export const navMenu = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Dashboard",
        path: "/dashboard",
    },
    {
        name: "Results",
        path: "/results",
    },
    {
        name: "Compare",
        path: "/compare",
    },
    {
        name: "Demo",
        path: "/demo",
    }
];


export const sampleQasmCode = 'OPENQASM 2.0;\ninclude "qelib1.inc";\nqreg q[2];\nh q[0];\ncx q[0], q[1];';

export const SelectedSimulators = ['Qiskit', 'Pennylane'];
export const simulators = [
    { name: 'Qiskit', icon: '⚛️', description: 'IBM Quantum Framework' },
    { name: 'Cirq', icon: '🔬', description: 'Google Quantum Framework' },
    { name: 'PennyLane', icon: '🧠', description: 'Xanadu Quantum ML' }
];

export const mockResults = [
    {
        backend: 'Qiskit',
        time: 0.0234,
        error: null
    },
    {
        backend: 'Cirq',
        time: 0.0456,
        error: null
    },
    {
        backend: 'PennyLane',
        time: 0.0189,
        error: null
    },
    {
        backend: 'Q#',
        time: 0.0678,
        error: 'Backend timeout'
    },
    {
        backend: 'Braket',
        time: 0.0342,
        error: null
    }
];


export const calculateStateFidelity = (stateVector1, stateVector2) => {
    if (!stateVector1 || !stateVector2 || stateVector1.length !== stateVector2.length) {
        return 0;
    }
    const Length = stateVector1.length;
    let dotProductReal = 0;
    let dotProductImag = 0;
    for (let i = 0; i < Length; i++) {
        const vector1Real = Array.isArray(stateVector1[i]) ? stateVector1[i][0] : stateVector1[i];
        const vector1Imag = Array.isArray(stateVector1[i]) ? stateVector1[i][1] : 0;
        const vector2Real = Array.isArray(stateVector2[i]) ? stateVector2[i][0] : stateVector2[i];
        const vector2Imag = Array.isArray(stateVector2[i]) ? stateVector2[i][1] : 0;

        dotProductReal += (vector1Real * vector2Real) + (vector1Imag * vector2Imag);
        dotProductImag += (vector1Real * vector2Imag) - (vector1Imag * vector2Real);
    }
    const magnitudeSquared = Math.pow(dotProductReal, 2) + Math.pow(dotProductImag, 2);
    return magnitudeSquared;
};

export const getFidelityColor = (fidelity) => {
    if (fidelity >= 0.99) return 'text-green-400';
    if (fidelity >= 0.95) return 'text-yellow-400';
    return 'text-red-400';
};

export const getFidelityStatus = (fidelity) => {
    if (fidelity >= 0.99) return 'Excellent';
    if (fidelity >= 0.95) return 'Good';
    if (fidelity >= 0.90) return 'Fair';
    return 'Poor';
};

export const getPerformanceScore = (time) => {
    return Math.round((1 / time) * 1000);
};
export const getPerformanceColor = (time) => {
    if (time < 0.001) return 'text-green-400';
    if (time < 0.01) return 'text-blue-400';
    if (time < 0.1) return 'text-yellow-400';
    return 'text-red-400';
}


export const detailedMockResults = [
    {
        backend: 'Qiskit',
        time: 0.00235,
        error: null,
        statevector: [
            [0.7071067811865475, 0],
            [0, 0],
            [0, 0],
            [0.7071067811865475, 0]
        ]
    },
    {
        backend: 'Cirq',
        time: 0.00321,
        error: null,
        statevector: [
            [0.7071067811865476, 0.0000000000000001],
            [0, 0],
            [0, 0],
            [0.7071067811865474, -0.0000000000000001]
        ]
    },
    {
        backend: 'PennyLane',
        time: 0.00187,
        error: null,
        statevector: [
            [0.7071067811865475, 0],
            [0, 0],
            [0, 0],
            [0.7071067811865475, 0]
        ]
    },
    {
        backend: 'Q#',
        time: 0.00452,
        error: "Backend temporarily unavailable",
        statevector: null
    },
    {
        backend: 'Braket',
        time: 0.00389,
        error: null,
        statevector: [
            [0.7071067811865473, 0.0000000000000002],
            [0, 0],
            [0, 0],
            [0.7071067811865477, -0.0000000000000002]
        ]
    }
];

export const createTips = () => {
    return [
        'Optimizing Quantum Circuits...',
        'Warming up simulators...',
        'Loading route resources...',
        'Preparing Visualizations...',
        'Almost there...'
    ];
};
