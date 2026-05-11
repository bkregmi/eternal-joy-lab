import React, { useState, useEffect, useCallback, useRef } from 'react';

const Pranayama = () => {
  const [isActive, setIsActive] = useState(false);
  const [exerciseType, setExerciseType] = useState('mudra'); // 'mudra' or 'organ'
  const [cycle, setCycle] = useState(1);
  const [mudraIndex, setMudraIndex] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0); // 0: Inhale, 1: Hold, 2: Exhale, 3: Hold
  const [count, setCount] = useState(0);

  const mudras = [
    { name: 'Chin Mudra', description: 'Touch the tips of your thumb and index fingers. Keep the other three fingers straight and relaxed. Rest your hands on your knees with palms facing up.' },
    { name: 'Chinmaya Mudra', description: 'Touch the tips of your thumb and index fingers. Curl the remaining three fingers into your palms. Rest your hands on your knees with palms facing up.' },
    { name: 'Aadi Mudra', description: 'Place your thumb at the base of your little finger and curl the other four fingers over the thumb to make a fist. Rest your hands on your knees.' },
    { name: 'Merudanda Mudra', description: 'Make a fist with your thumb pointing upwards (like a thumbs-up). Rest your hands on your thighs with the thumbs pointing towards the ceiling.' }
  ];

  const organSteps = [
    { 
      name: 'Organ Breathing - Step 1', 
      description: 'Ratio: 4-16-8-4. Focus on deep internal circulation.',
      cycles: 5,
      phases: [
        { name: 'Inhale', max: 4, color: '#2ecc71' },
        { name: 'Hold', max: 16, color: '#f1c40f' },
        { name: 'Exhale', max: 8, color: '#3498db' },
        { name: 'Hold', max: 4, color: '#e67e22' }
      ]
    },
    { 
      name: 'Organ Breathing - Step 2', 
      description: 'Ratio: 4-4-16-8. Shifting the retention focus.',
      cycles: 5,
      phases: [
        { name: 'Inhale', max: 4, color: '#2ecc71' },
        { name: 'Hold', max: 4, color: '#f1c40f' },
        { name: 'Exhale', max: 16, color: '#3498db' },
        { name: 'Hold', max: 8, color: '#e67e22' }
      ]
    },
    { 
      name: 'Organ Breathing - Step 3', 
      description: 'Ratio: 8-4-4-16. Extending the initial intake.',
      cycles: 5,
      phases: [
        { name: 'Inhale', max: 8, color: '#2ecc71' },
        { name: 'Hold', max: 4, color: '#f1c40f' },
        { name: 'Exhale', max: 4, color: '#3498db' },
        { name: 'Hold', max: 16, color: '#e67e22' }
      ]
    },
    { 
      name: 'Organ Breathing - Step 4', 
      description: 'Ratio: 16-8-4-4. Focus on long controlled inhalation.',
      cycles: 5,
      phases: [
        { name: 'Inhale', max: 16, color: '#2ecc71' },
        { name: 'Hold', max: 8, color: '#f1c40f' },
        { name: 'Exhale', max: 4, color: '#3498db' },
        { name: 'Hold', max: 4, color: '#e67e22' }
      ]
    },
    { 
      name: 'Heart Breathing', 
      description: 'Ratio: 4-16-8. Special sequence with no empty hold after exhale.',
      cycles: 5,
      phases: [
        { name: 'Inhale', max: 4, color: '#2ecc71' },
        { name: 'Hold', max: 16, color: '#f1c40f' },
        { name: 'Exhale', max: 8, color: '#3498db' }
      ]
    }
  ];

  const phases = [
    { name: 'Inhale', max: 4, color: '#2ecc71' },
    { name: 'Hold', max: 2, color: '#f1c40f' },
    { name: 'Exhale', max: 5, color: '#3498db' },
    { name: 'Hold', max: 2, color: '#e67e22' }
  ];

  // Use a ref to keep track of the latest state without restarting the interval
  const exerciseState = useRef({ phaseIndex, cycle, mudraIndex, exerciseType });
  useEffect(() => {
    exerciseState.current = { phaseIndex, cycle, mudraIndex, exerciseType };
  }, [phaseIndex, cycle, mudraIndex, exerciseType]);

  const speak = useCallback((text) => {
    window.speechSynthesis.cancel(); // Clear queue to stay in sync with timer
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.1;
    window.speechSynthesis.speak(utterance);
  }, []);

  const resetExercise = () => {
    setIsActive(false);
    setCycle(1);
    setMudraIndex(0);
    setPhaseIndex(0);
    setCount(0);
    window.speechSynthesis.cancel();
  };

  const activeData = exerciseType === 'mudra' ? mudras : organSteps;
  const currentPhases = exerciseType === 'mudra' ? phases : organSteps[mudraIndex].phases;
  const maxCycles = exerciseType === 'mudra' ? 7 : organSteps[mudraIndex].cycles;

  const nextMudra = () => {
    if (mudraIndex < activeData.length - 1) {
      const nextIdx = mudraIndex + 1;
      setMudraIndex(nextIdx);
      setCycle(1);
      setPhaseIndex(0);
      setCount(1);
      speak(`Switching to ${activeData[nextIdx].name}`);
    } else {
      speak("This is the last step in the sequence.");
    }
  };

  // Separate side effect for speech to keep the timer logic pure
  useEffect(() => {
    if (isActive && count > 0) {
      const activePhases = exerciseType === 'mudra' ? phases : organSteps[mudraIndex].phases;
      if (count === 1) {
        speak(`${activePhases[phaseIndex].name}. 1`);
      } else {
        speak(count.toString());
      }
    }
  }, [count, phaseIndex, isActive, speak, exerciseType, mudraIndex]);

  useEffect(() => {
    let timer = null;
    if (isActive) {
      timer = setInterval(() => {
        setCount((prevCount) => {
          let nextCount = prevCount + 1;
          const { phaseIndex: currentPhaseIdx, cycle: currentCycle, mudraIndex: currentMudraIdx, exerciseType: currentType } = exerciseState.current;
          const activePhases = currentType === 'mudra' ? phases : organSteps[currentMudraIdx].phases;
          const currentMaxCycles = currentType === 'mudra' ? 7 : organSteps[currentMudraIdx].cycles;
          let currentMax = activePhases[currentPhaseIdx].max;

          if (nextCount > currentMax) {
            nextCount = 1;
            const nextPhase = currentPhaseIdx + 1;

            if (nextPhase >= activePhases.length) {
              setPhaseIndex(0);
              if (currentCycle >= currentMaxCycles) {
                if (currentMudraIdx >= (currentType === 'mudra' ? mudras.length : organSteps.length) - 1) {
                  setIsActive(false);
                  speak("All exercises complete. Relax.");
                  return 0;
                } else {
                  setMudraIndex(m => m + 1);
                  setCycle(1);
                  const nextName = (currentType === 'mudra' ? mudras : organSteps)[currentMudraIdx + 1].name;
                  speak(`Switching to ${nextName}.`);
                }
              } else {
                setCycle((c) => c + 1);
              }
            } else {
              setPhaseIndex(nextPhase);
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
            <div className="section-selector" style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <button 
                className={`btn ${exerciseType === 'mudra' ? 'btn-primary' : 'btn-default'}`} 
                onClick={() => { resetExercise(); setExerciseType('mudra'); }}
              >Mudra Pranayama</button>
              <button 
                className={`btn ${exerciseType === 'organ' ? 'btn-primary' : 'btn-default'}`} 
                style={{ marginLeft: '10px' }}
                onClick={() => { resetExercise(); setExerciseType('organ'); }}
              >Organ Breathing</button>
            </div>

            <h2>{exerciseType === 'mudra' ? 'Full Mudra Pranayama Sequence' : 'Organ Breathing Sequence'}</h2>
            
            <div className="mudra-info" style={{ marginBottom: '20px', fontSize: '1.1em' }}>
              <p><strong>{activeData[mudraIndex].name}:</strong> {activeData[mudraIndex].description}</p>
            </div>

            <div className="timer-container" style={{ 
              textAlign: 'center', 
              padding: '40px', 
              borderRadius: '15px', 
              backgroundColor: isActive ? currentPhases[phaseIndex].color : '#eee',
              transition: 'background-color 0.5s ease',
              color: isActive ? 'white' : '#333'
            }}>
              <h1 style={{ fontSize: '4em', margin: '0' }}>
                {isActive ? count : 'Ready?'}
              </h1>
              <h3>{isActive ? currentPhases[phaseIndex].name : 'Press Start to Begin'}</h3>
              <div style={{ marginTop: '10px', fontSize: '1.2em', fontWeight: 'bold' }}>
                {activeData[mudraIndex].name}
              </div>
              <div style={{ marginTop: '10px' }}>
                <strong>Cycle: {cycle} / {maxCycles}</strong>
              </div>
            </div>

            <div className="controls" style={{ marginTop: '20px', textAlign: 'center' }}>
              {!isActive ? (
                <button 
                  className="btn btn-success btn-lg" 
                  onClick={() => {
                    setCount(1);
                    setMudraIndex(0);
                    setIsActive(true);
                    speak(`Starting ${activeData[0].name}`);
                  }}
                >
                  Start Exercise
                </button>
              ) : (
                <button className="btn btn-danger btn-lg" onClick={resetExercise}>
                  Stop
                </button>
              )}
              {isActive && mudraIndex < activeData.length - 1 && (
                <button 
                  className="btn btn-info btn-lg" 
                  style={{ marginLeft: '10px' }} 
                  onClick={nextMudra}>
                  Next Step
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