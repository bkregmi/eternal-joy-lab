import React, { useState, useEffect, useCallback, useRef } from 'react';

const Pranayama = () => {
  const [isActive, setIsActive] = useState(false);
  const [cycle, setCycle] = useState(1);
  const [phaseIndex, setPhaseIndex] = useState(0); // 0: Inhale, 1: Hold, 2: Exhale, 3: Hold
  const [count, setCount] = useState(0);

  const phases = [
    { name: 'Breath In', max: 4, color: '#2ecc71' },
    { name: 'Hold', max: 2, color: '#f1c40f' },
    { name: 'Breath Out', max: 5, color: '#3498db' },
    { name: 'Hold', max: 2, color: '#e67e22' }
  ];

  // Use a ref to keep track of the latest state without restarting the interval
  const exerciseState = useRef({ phaseIndex, cycle });
  useEffect(() => {
    exerciseState.current = { phaseIndex, cycle };
  }, [phaseIndex, cycle]);

  const speak = useCallback((text) => {
    window.speechSynthesis.cancel(); // Clear queue to stay in sync with timer
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.1;
    window.speechSynthesis.speak(utterance);
  }, []);

  const resetExercise = () => {
    setIsActive(false);
    setCycle(1);
    setPhaseIndex(0);
    setCount(0);
    window.speechSynthesis.cancel();
  };

  // Separate side effect for speech to keep the timer logic pure
  useEffect(() => {
    if (isActive && count > 0) {
      speak(count.toString());
    }
  }, [count, isActive, speak]);

  useEffect(() => {
    let timer = null;
    if (isActive) {
      timer = setInterval(() => {
        setCount((prevCount) => {
          let nextCount = prevCount + 1;
          const { phaseIndex: currentPhaseIdx, cycle: currentCycle } = exerciseState.current;
          let currentMax = phases[currentPhaseIdx].max;

          if (nextCount > currentMax) {
            nextCount = 1;
            const nextPhase = currentPhaseIdx + 1;

            if (nextPhase >= phases.length) {
              setPhaseIndex(0);
              if (currentCycle >= 7) {
                setIsActive(false);
                speak("Exercise complete. Relax.");
                return 0;
              }
              setCycle((c) => c + 1);
              speak(phases[0].name);
            } else {
              setPhaseIndex(nextPhase);
              speak(phases[nextPhase].name);
            }
          }
          
          return nextCount;
        });
      }, 2000); // Ticks every 2 seconds as requested
    }
    return () => clearInterval(timer);
  }, [isActive, speak]);

  return (
    <div className="pranayama-page">
      <div className="row">
        <div className="col-md-12 whiteBG">
          <section style={{ padding: '10px' }}>
            <h2>Chinmaya Mudra Pranayama</h2>
            <div className="mudra-info" style={{ marginBottom: '20px', fontSize: '1.1em' }}>
              <p><strong>Instructions:</strong> Form the Chinmaya Mudra by touching the tips of your thumb and index fingers. Curl the remaining three fingers into your palms. Rest your hands on your knees, palms facing up.</p>
            </div>

            <div className="timer-container" style={{ 
              textAlign: 'center', 
              padding: '40px', 
              borderRadius: '15px', 
              backgroundColor: isActive ? phases[phaseIndex].color : '#eee',
              transition: 'background-color 0.5s ease',
              color: isActive ? 'white' : '#333'
            }}>
              <h1 style={{ fontSize: '4em', margin: '0' }}>
                {isActive ? count : 'Ready?'}
              </h1>
              <h3>{isActive ? phases[phaseIndex].name : 'Press Start to Begin'}</h3>
              <div style={{ marginTop: '10px' }}>
                <strong>Cycle: {cycle} / 7</strong>
              </div>
            </div>

            <div className="controls" style={{ marginTop: '20px', textAlign: 'center' }}>
              {!isActive ? (
                <button 
                  className="btn btn-success btn-lg" 
                  onClick={() => {
                    setCount(1);
                    setIsActive(true);
                    speak(phases[0].name);
                  }}
                >
                  Start Exercise
                </button>
              ) : (
                <button className="btn btn-danger btn-lg" onClick={resetExercise}>
                  Stop
                </button>
              )}
              <button 
                className="btn btn-default btn-lg" 
                style={{ marginLeft: '10px' }}
                onClick={resetExercise}
              >Reset</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Pranayama;