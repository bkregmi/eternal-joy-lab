import React, { useState, useEffect, useCallback, useRef } from 'react';

const Pranayama = () => {
  const [isActive, setIsActive] = useState(false);
  const [exerciseType, setExerciseType] = useState('traditional'); // 'mudra', 'organ', or 'traditional'
  const [cycle, setCycle] = useState(1);
  const [mudraIndex, setMudraIndex] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0); // 0: Inhale, 1: Hold, 2: Exhale, 3: Hold
  const [count, setCount] = useState(0);

  const typeScrollerRef = useRef(null);
  const stepScrollerRef = useRef(null);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const mudras = [
    { name: 'Chin Mudra', description: 'Touch the tips of your thumb and index fingers. Keep the other three fingers straight and relaxed. Rest your hands on your knees with palms facing up.' },
    { name: 'Chinmaya Mudra', description: 'Touch the tips of your thumb and index fingers. Curl the remaining three fingers into your palms. Rest your hands on your knees with palms facing up.' },
    { name: 'Aadi Mudra', description: 'Place your thumb at the base of your little finger and curl the other four fingers over the thumb to make a fist. Rest your hands on your knees.' },
    { name: 'Merudanda Mudra', description: 'Make a fist with your thumb pointing upwards (like a thumbs-up). Rest your hands on your thighs with the thumbs pointing towards the ceiling.' }
  ];

  const organSteps = [
    { 
      name: 'Lungs', 
      description: 'Ratio: 4-16-8-4. Use Chin, Chinmaya, and Aadhi Mudras (3 cycles each).',
      cycles: 9,
      phases: [
        { name: 'Inhale', max: 4, color: '#2ecc71' },
        { name: 'Hold', max: 16, color: '#f1c40f' },
        { name: 'Exhale', max: 8, color: '#3498db' },
        { name: 'Hold', max: 4, color: '#e67e22' }
      ]
    },
    { 
      name: 'Liver', 
      description: 'Ratio: 4-4-16-8. Use Chin Mudra.',
      cycles: 7,
      phases: [
        { name: 'Inhale', max: 4, color: '#2ecc71' },
        { name: 'Hold', max: 4, color: '#f1c40f' },
        { name: 'Exhale', max: 16, color: '#3498db' },
        { name: 'Hold', max: 8, color: '#e67e22' }
      ]
    },
    { 
      name: 'Stomach', 
      description: 'Ratio: 8-4-4-16. Use Chin Mudra.',
      cycles: 7,
      phases: [
        { name: 'Inhale', max: 8, color: '#2ecc71' },
        { name: 'Hold', max: 4, color: '#f1c40f' },
        { name: 'Exhale', max: 4, color: '#3498db' },
        { name: 'Hold', max: 16, color: '#e67e22' }
      ]
    },
    { 
      name: 'Kidney', 
      description: 'Ratio: 16-8-4-4. Use Chin Mudra.',
      cycles: 7,
      phases: [
        { name: 'Inhale', max: 16, color: '#2ecc71' },
        { name: 'Hold', max: 8, color: '#f1c40f' },
        { name: 'Exhale', max: 4, color: '#3498db' },
        { name: 'Hold', max: 4, color: '#e67e22' }
      ]
    },
    { 
      name: 'Heart', 
      description: 'Ratio: 4-16-8. Use Chinmaya Mudra.',
      cycles: 7,
      phases: [
        { name: 'Inhale', max: 4, color: '#2ecc71' },
        { name: 'Hold', max: 16, color: '#f1c40f' },
        { name: 'Exhale', max: 8, color: '#3498db' }
      ]
    }
  ];

  const traditionalSteps = [
    {
      name: 'Sukh Kriya',
      description: 'Balances energy channels (also known as Anulom-Vilom). Inhale left, exhale right; inhale right, exhale left. Focus on smooth, equalized breathing.',
      cycles: 26, // 26 cycles of 16s ≈ 7 minutes
      phases: [
        { name: 'Inhale Left', max: 4, color: '#2ecc71' },
        { name: 'Exhale Right', max: 4, color: '#3498db' },
        { name: 'Inhale Right', max: 4, color: '#2ecc71' },
        { name: 'Exhale Left', max: 4, color: '#3498db' },
      ]
    },
    {
      name: 'Bhastrika (Bellows Breath)',
      description: 'Rapid, forceful inhalations and exhalations. Energizing. Perform 20-30 rapid breaths per round within the timed phase.',
      cycles: 7, // 7 rounds of Bhastrika
      phases: [
        { name: 'Rapid Breathing', max: 30, color: '#e74c3c' }, // 30 seconds of rapid breathing
        { name: 'Rest', max: 10, color: '#bdc3c7' } // 10 seconds rest between rounds
      ]
    },
    {
      name: 'Kapalbhati (Skull Shining Breath)',
      description: 'Forceful exhalations, passive inhalations. Cleansing. Perform 20-30 forceful exhalations per round within the timed phase.',
      cycles: 7, // 7 rounds of Kapalbhati
      phases: [
        { name: 'Forceful Exhale', max: 30, color: '#9b59b6' }, // 30 seconds of forceful exhalations
        { name: 'Rest', max: 10, color: '#bdc3c7' } // 10 seconds rest between rounds
      ]
    },
    {
      name: 'Nadi Shodhana (Purification)',
      description: 'Advanced alternate nostril breathing with internal retention (Antar Kumbhaka). Ratio 1:4:2. Inhale left, hold, exhale right; inhale right, hold, exhale left.',
      cycles: 7,
      phases: [
        { name: 'Inhale Left', max: 4, color: '#2ecc71' },
        { name: 'Hold', max: 16, color: '#f1c40f' },
        { name: 'Exhale Right', max: 8, color: '#3498db' },
        { name: 'Inhale Right', max: 4, color: '#2ecc71' },
        { name: 'Hold', max: 16, color: '#f1c40f' },
        { name: 'Exhale Left', max: 8, color: '#3498db' }
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
        const isSukhKriya = exerciseType === 'traditional' && activeData[mudraIndex]?.name === 'Sukh Kriya';

        if (isSukhKriya) {
          if (count === 1) {
            const text = activePhases[phaseIndex].name.toLowerCase().includes('inhale') ? 'In' : 'Out';
            speak(text);
          }
        } else {
          if (count === 1) {
            speak(`${activePhases[phaseIndex].name}. 1`);
          } else {
            speak(count.toString());
          }
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
      }, 1000); // Ticks every 1 second
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
            {/* Horizontal Scrolling for Category Selection */}
            <div className="section-selector-container" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '30px',
              background: '#fff',
              padding: '10px',
              borderRadius: '15px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              border: '1px solid #f0e6d2'
            }}>
              <button className="btn btn-default" onClick={() => scroll(typeScrollerRef, 'left')} style={{ borderRadius: '50%', width: '30px', height: '30px', padding: 0 }}>&lt;</button>
              <div ref={typeScrollerRef} style={{ 
                display: 'flex', 
                overflowX: 'auto', 
                whiteSpace: 'nowrap', 
                flex: 1, 
                margin: '0 10px',
                msOverflowStyle: 'none',
                scrollbarWidth: 'none'
              }}>
                <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                <button 
                  className={`btn p-btn ${exerciseType === 'mudra' ? 'btn-primary' : 'btn-default'}`} 
                  onClick={() => { resetExercise(); setExerciseType('mudra'); }}
                  style={{ 
                    marginRight: '10px', 
                    flexShrink: 0,
                    backgroundColor: exerciseType === 'mudra' ? '#ff9933' : '#fff',
                    borderColor: '#ff9933',
                    color: exerciseType === 'mudra' ? '#fff' : '#ff9933'
                  }}
                >Mudra Kriya</button>
                <button 
                  className={`btn p-btn ${exerciseType === 'organ' ? 'btn-primary' : 'btn-default'}`} 
                  onClick={() => { resetExercise(); setExerciseType('organ'); }}
                  style={{ 
                    marginRight: '10px', 
                    flexShrink: 0,
                    backgroundColor: exerciseType === 'organ' ? '#ff9933' : '#fff',
                    borderColor: '#ff9933',
                    color: exerciseType === 'organ' ? '#fff' : '#ff9933'
                  }}
                >Organ Breathing</button>
                <button 
                  className={`btn p-btn ${exerciseType === 'traditional' ? 'btn-primary' : 'btn-default'}`} 
                  onClick={() => { resetExercise(); setExerciseType('traditional'); }}
                  style={{ 
                    marginRight: '10px', 
                    flexShrink: 0,
                    backgroundColor: exerciseType === 'traditional' ? '#ff9933' : '#fff',
                    borderColor: '#ff9933',
                    color: exerciseType === 'traditional' ? '#fff' : '#ff9933'
                  }}
                >Traditional Pranayama</button>
              </div>
              <button className="btn btn-default" onClick={() => scroll(typeScrollerRef, 'right')} style={{ borderRadius: '50%', width: '30px', height: '30px', padding: 0 }}>&gt;</button>
            </div>

            {/* Horizontal Scrolling for Individual Pranayama Selection */}
            <div className="step-selector-container" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '20px',
              background: '#fcfaf5',
              padding: '5px',
              borderRadius: '15px'
            }}>
              <button className="btn btn-link btn-xs" onClick={() => scroll(stepScrollerRef, 'left')}>&lt;</button>
              <div ref={stepScrollerRef} style={{ 
                display: 'flex', 
                overflowX: 'auto', 
                whiteSpace: 'nowrap', 
                flex: 1, 
                margin: '0 10px',
                msOverflowStyle: 'none',
                scrollbarWidth: 'none'
              }}>
                {activeData.map((step, idx) => (
                  <button
                    key={idx}
                    className={`btn btn-xs ${mudraIndex === idx ? 'btn-info' : 'btn-link'}`}
                    style={{ 
                      borderRadius: '12px', 
                      padding: '4px 15px',
                      marginRight: '8px',
                      flexShrink: 0,
                      backgroundColor: mudraIndex === idx ? '#5bc0de' : 'transparent',
                      color: mudraIndex === idx ? '#fff' : '#888'
                    }}
                    onClick={() => { resetExercise(); setMudraIndex(idx); }}
                  >
                    {step.name}
                  </button>
                ))}
              </div>
              <button className="btn btn-link btn-xs" onClick={() => scroll(stepScrollerRef, 'right')}>&gt;</button>
            </div>

            <h2 className="text-center" style={{ color: '#c92200', fontFamily: "'Georgia', serif", fontWeight: 'bold', marginBottom: '25px' }}>
              {exerciseType === 'mudra' ? 'Mudra Kriya' : exerciseType === 'organ' ? 'Organ Breathing' : 'Traditional Pranayama'}
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
                    setIsActive(true);
                    speak(`Starting ${activeData[mudraIndex].name}`);
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