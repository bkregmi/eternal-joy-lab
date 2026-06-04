import React, { useState, useEffect, useCallback, useRef } from 'react';

const Pranayama = () => {
  const [isActive, setIsActive] = useState(false);
  const [exerciseType, setExerciseType] = useState('mudra'); // 'mudra', 'organ', or 'traditional'
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

  const traditionalSteps = [
    {
      name: 'Anulom-Vilom (Alternate Nostril)',
      description: 'Balances energy channels. Inhale left, exhale right; inhale right, exhale left. Focus on smooth, controlled breathing.',
      cycles: 5, // 5 full rounds (left-right, right-left)
      phases: [
        { name: 'Inhale Left', max: 4, color: '#2ecc71' },
        { name: 'Exhale Right', max: 8, color: '#3498db' },
        { name: 'Inhale Right', max: 4, color: '#2ecc71' },
        { name: 'Exhale Left', max: 8, color: '#3498db' },
      ]
    },
    {
      name: 'Bhastrika (Bellows Breath)',
      description: 'Rapid, forceful inhalations and exhalations. Energizing. Perform 20-30 rapid breaths per round within the timed phase.',
      cycles: 3, // 3 rounds of Bhastrika
      phases: [
        { name: 'Rapid Breathing', max: 30, color: '#e74c3c' }, // 30 seconds of rapid breathing
        { name: 'Rest', max: 10, color: '#bdc3c7' } // 10 seconds rest between rounds
      ]
    },
    {
      name: 'Kapalbhati (Skull Shining Breath)',
      description: 'Forceful exhalations, passive inhalations. Cleansing. Perform 20-30 forceful exhalations per round within the timed phase.',
      cycles: 3, // 3 rounds of Kapalbhati
      phases: [
        { name: 'Forceful Exhale', max: 30, color: '#9b59b6' }, // 30 seconds of forceful exhalations
        { name: 'Rest', max: 10, color: '#bdc3c7' } // 10 seconds rest between rounds
      ]
    },
    {
      name: 'Nadi Shodhana (Purification)',
      description: 'Advanced alternate nostril breathing with retention. Ratio 1:4:2. Inhale left, hold, exhale right, hold; inhale right, hold, exhale left, hold.',
      cycles: 3,
      phases: [
        { name: 'Inhale Left', max: 4, color: '#2ecc71' },
        { name: 'Hold', max: 16, color: '#f1c40f' },
        { name: 'Exhale Right', max: 8, color: '#3498db' },
        { name: 'Hold', max: 4, color: '#e67e22' },
        { name: 'Inhale Right', max: 4, color: '#2ecc71' },
        { name: 'Hold', max: 16, color: '#f1c40f' },
        { name: 'Exhale Left', max: 8, color: '#3498db' },
        { name: 'Hold', max: 4, color: '#e67e22' }
      ]
    }
  ];

  const phases = [
    { name: 'Inhale', max: 4, color: '#2ecc71' },
    { name: 'Hold', max: 2, color: '#f1c40f' },
    { name: 'Exhale', max: 5, color: '#3498db' },
    { name: 'Hold', max: 2, color: '#e67e22' }
  ];

  // Helper to get active data set based on type
  const getActiveList = (type) => {
    if (type === 'mudra') return mudras;
    if (type === 'organ') return organSteps;
    return traditionalSteps;
  };

  // Use a ref to keep track of the latest state without restarting the interval
  const exerciseState = useRef({ phaseIndex, cycle, mudraIndex, exerciseType });
  useEffect(() => {
    exerciseState.current = { phaseIndex, cycle, mudraIndex, exerciseType };
  }, [phaseIndex, cycle, mudraIndex, exerciseType]);

  const activeData = getActiveList(exerciseType);

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

  const currentPhases = exerciseType === 'mudra' ? phases : activeData[mudraIndex].phases;
  const maxCycles = exerciseType === 'mudra' ? 7 : activeData[mudraIndex].cycles;

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
      // Introduce a 500ms delay to create a natural gap after the visual update
      const speechTimer = setTimeout(() => {
        const activePhases = exerciseType === 'mudra' ? phases : activeData[mudraIndex].phases;
        if (count === 1) {
          speak(`${activePhases[phaseIndex].name}. 1`);
        } else {
          speak(count.toString());
        }
      }, 500);

      return () => clearTimeout(speechTimer);
    }
  }, [count, phaseIndex, isActive, speak, exerciseType, mudraIndex]);

  useEffect(() => {
    let timer = null;
    if (isActive) {
      timer = setInterval(() => {
        setCount((prevCount) => {
          let nextCount = prevCount + 1;
          const { phaseIndex: currentPhaseIdx, cycle: currentCycle, mudraIndex: currentMudraIdx, exerciseType: currentType } = exerciseState.current;
          const activeList = getActiveList(currentType);
          const activePhases = currentType === 'mudra' ? phases : activeList[currentMudraIdx].phases;
          const currentMaxCycles = currentType === 'mudra' ? 7 : activeList[currentMudraIdx].cycles;
          let currentMax = activePhases[currentPhaseIdx].max;

          if (nextCount > currentMax) {
            nextCount = 1;
            const nextPhase = currentPhaseIdx + 1;

            if (nextPhase >= activePhases.length) {
              setPhaseIndex(0);
              if (currentCycle >= currentMaxCycles) {
                if (currentMudraIdx >= activeList.length - 1) {
                  setIsActive(false);
                  speak("All exercises complete. Relax.");
                  return 0;
                } else {
                  setMudraIndex(m => m + 1);
                  setCycle(1);
                  const nextName = activeList[currentMudraIdx + 1].name;
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
    <div className="pranayama-page" style={{ backgroundColor: '#fcfaf5', minHeight: '100vh', padding: '20px 0' }}>
      <style>{`
        .timer-circle {
          width: 220px;
          height: 220px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 30px auto;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          border: 8px solid rgba(255,255,255,0.3);
        }
        .phase-indicator {
          display: inline-block;
          padding: 5px 15px;
          margin: 5px;
          border-radius: 15px;
          font-size: 0.9em;
          background: #fff;
          color: #777;
          border: 1px solid #eee;
          transition: all 0.3s;
        }
        .phase-indicator.active {
          background: #ff9933;
          color: #fff;
          border-color: #ff9933;
          transform: scale(1.1);
        }
        .p-btn { border-radius: 25px; padding: 10px 25px; font-weight: bold; transition: all 0.3s; text-transform: uppercase; letter-spacing: 1px; }
        .p-btn:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
      `}</style>
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <section className="whiteBG" style={{ padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <div className="section-selector text-center" style={{ marginBottom: '30px' }}>
              <button 
                className={`btn p-btn ${exerciseType === 'mudra' ? 'btn-primary' : 'btn-default'}`} 
                onClick={() => { resetExercise(); setExerciseType('mudra'); }}
                style={exerciseType === 'mudra' ? { backgroundColor: '#ff9933', borderColor: '#ff9933' } : {}}
              >Mudra Pranayama</button>
              <button 
                className={`btn p-btn ${exerciseType === 'organ' ? 'btn-primary' : 'btn-default'}`} 
                style={exerciseType === 'organ' ? { margin: '0 10px', backgroundColor: '#ff9933', borderColor: '#ff9933' } : { margin: '0 10px' }}
                onClick={() => { resetExercise(); setExerciseType('organ'); }}
              >Organ Breathing</button>
              <button 
                className={`btn p-btn ${exerciseType === 'traditional' ? 'btn-primary' : 'btn-default'}`} 
                onClick={() => { resetExercise(); setExerciseType('traditional'); }}
                style={exerciseType === 'traditional' ? { backgroundColor: '#ff9933', borderColor: '#ff9933' } : {}}
              >Traditional Pranayama</button>
            </div>

            <div className="step-selector text-center" style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
              {activeData.map((step, idx) => (
                <button
                  key={idx}
                  className={`btn btn-xs ${mudraIndex === idx ? 'btn-info' : 'btn-link'}`}
                  style={{ 
                    borderRadius: '12px', 
                    padding: '4px 12px',
                    color: mudraIndex === idx ? '#fff' : '#888'
                  }}
                  onClick={() => { resetExercise(); setMudraIndex(idx); }}
                >
                  {idx + 1}. {step.name}
                </button>
              ))}
            </div>

            <h2 className="text-center" style={{ color: '#c92200', fontFamily: "'Georgia', serif", fontWeight: 'bold', marginBottom: '25px' }}>
              {exerciseType === 'mudra' ? 'Mudra Pranayama' : exerciseType === 'organ' ? 'Organ Breathing' : 'Traditional Pranayama'}
            </h2>
            
            <div className="mudra-info" style={{ 
              marginBottom: '30px', 
              padding: '20px', 
              borderLeft: '6px solid #ff9933', 
              backgroundColor: '#fffdfa',
              borderRadius: '0 15px 15px 0'
            }}>
              <h4 style={{ color: '#ff9933', marginTop: 0, fontWeight: 'bold' }}>{activeData[mudraIndex].name}</h4>
              <p style={{ fontSize: '1.1em', color: '#555', lineHeight: '1.6', margin: 0 }}>{activeData[mudraIndex].description}</p>
            </div>

            <div className="timer-circle" style={{ backgroundColor: isActive ? currentPhases[phaseIndex].color : '#f5f5f5' }}>
              <h1 style={{ fontSize: '5em', margin: '0', color: isActive ? 'white' : '#ccc', fontWeight: 'bold' }}>
                {isActive ? count : '🕉️'}
              </h1>
              <h3 style={{ margin: '5px 0 0 0', color: isActive ? 'white' : '#999', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '1.2em' }}>
                {isActive ? currentPhases[phaseIndex].name : 'Begin'}
              </h3>
            </div>

            <div className="text-center" style={{ marginBottom: '25px' }}>
              {currentPhases.map((p, idx) => (
                <span key={idx} className={`phase-indicator ${isActive && phaseIndex === idx ? 'active' : ''}`}>
                  {p.name} ({p.max})
                </span>
              ))}
              <div style={{ marginTop: '15px', color: '#888', fontSize: '1.1em' }}>
                <strong>Cycle Progress: {cycle} of {maxCycles}</strong>
              </div>
            </div>

            <div className="controls" style={{ marginTop: '20px', textAlign: 'center' }}>
              {!isActive ? (
                <button className="btn btn-success btn-lg p-btn" onClick={() => {
                    setCount(1);
                    setMudraIndex(0);
                    setIsActive(true);
                    speak(`Starting ${activeData[0].name}`);
                  }}
                >
                  Start Exercise
                </button>
              ) : (
                <button className="btn btn-danger btn-lg p-btn" onClick={resetExercise}>Stop</button>
              )}
              {isActive && mudraIndex < activeData.length - 1 && (
                <button className="btn btn-info btn-lg p-btn" style={{ marginLeft: '10px' }} onClick={nextMudra}>
                  Next Step
                </button>
              )}
              <button className="btn btn-default btn-lg p-btn" style={{ marginLeft: '10px' }} onClick={resetExercise}>Reset</button>
            </div>
            
            <p className="text-center" style={{ marginTop: '30px', color: '#bbb', fontStyle: 'italic' }}>
              Keep your spine erect and eyes closed for maximum benefit.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Pranayama;