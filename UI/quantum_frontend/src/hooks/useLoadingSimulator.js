import { useState, useEffect } from 'react';

export const useLoadingSimulator = (tips = []) => {
    const [progress, setProgress] = useState(0);
    const [tipIndex, setTipIndex] = useState(0);

    useEffect(() => {
        const prog = setInterval(() => {
            setProgress(p => Math.min(p + Math.random() * 12 + 6, 90));
        }, 350);
        const tipsRotator = setInterval(() => {
            setTipIndex(i => (i + 1) % tips.length);
        }, 2200);
        return () => {
            clearInterval(prog);
            clearInterval(tipsRotator);
        }
    }, [tips.length]);
    return { progress, tipIndex };
}