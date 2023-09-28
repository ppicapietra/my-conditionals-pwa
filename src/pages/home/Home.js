import React from 'react';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import './Home.css';
import Header from '../../components/header/Header';

function Home() {

  // Verb tenses
  const PAST_SIMPLE_TENSE = "Past simple";
  const PAST_PERFECT_TENSE = "Past perfect";
  const CONDITIONAL_TENSE = "Conditional";
  const CONDITIONAL_PERFECT_TENSE = "Conditional perfect";
  const FUTURE_TENSE = "Future";
  const PRESENT_TENSE = "Present";
  const FUTURE_TIME_MARKER_TENSE = " + FTM";

  // conditionals names
  const CONDITIONAL_NAME_0 = "Zero Conditional";
  const CONDITIONAL_NAME_1 = "First Conditional";
  const CONDITIONAL_NAME_2 = "Second Conditional";
  const CONDITIONAL_NAME_3 = "Third Conditional";
  const CONDITIONAL_NAME_MIX = "Mix";

  // reality
  const FACT_TYPE_REAL = "real";
  const FACT_TYPE_UNREAL = "unreal";

  // time context
  const TIMEFRAME_PAST = "past";
  const TIMEFRAME_PRESENT = "present";
  const TIMEFRAME_FUTURE = "future";

  // options
  const FilterOptions = [
    {
      value: TIMEFRAME_PAST,
      label: "Past"
    },
    {
      value: TIMEFRAME_PRESENT,
      label: "Present"
    },
    {
      value: TIMEFRAME_FUTURE,
      label: "Future"
    },
  ]

  const ContextOptions = [
    {
      value: FACT_TYPE_REAL,
      label: "General truth"
    },
    {
      value: FACT_TYPE_UNREAL,
      label: "Unreal"
    }
  ]

  const Combinations = {
    "past/past": {
      needContext: false,
      protasis: PAST_PERFECT_TENSE,
      apodosis: CONDITIONAL_PERFECT_TENSE,
      type: CONDITIONAL_NAME_3,
      meaning: "Something in the past that we wish we could change, but we can’t",
      example: "If she had seen the message, she would have replied"
    },
    "past/present": {
      needContext: false,
      protasis: PAST_PERFECT_TENSE,
      apodosis: CONDITIONAL_TENSE,
      type: CONDITIONAL_NAME_MIX,
      meaning: "Something in the past that we cannot change, but  it would have affected the present",
      example: "If you had not come from India, they would treat you nicely"
    },
    "past/future": {
      needContext: false,
      protasis: PAST_PERFECT_TENSE,
      apodosis: CONDITIONAL_TENSE + FUTURE_TIME_MARKER_TENSE,
      type: CONDITIONAL_NAME_MIX,
      meaning: "Something in the past that we cannot change, but it would have affected our future",
      example: "If you hadn't slapped the lady, you would not be going to jail tomorrow"
    },
    "present/past": {
      needContext: false,
      protasis: PAST_SIMPLE_TENSE,
      apodosis: CONDITIONAL_PERFECT_TENSE,
      type: CONDITIONAL_NAME_MIX,
      meaning: "Something that we would have done different if the present were different",
      example: "If my parents weren't coming back home today, I would have let you stay at my place for some days"
    },
    "present/present": {
      needContext: true,
    },
    "present/present/real": {
      needContext: true,
      protasis: PRESENT_TENSE,
      apodosis: PRESENT_TENSE,
      type: CONDITIONAL_NAME_0,
      meaning: "General truths or results that always happen if a condition is present, not about one particular situation",
      example: "If water reaches 100 degrees, it boils"
    },
    "present/present/unreal": {
      needContext: true,
      protasis: PAST_SIMPLE_TENSE,
      apodosis: CONDITIONAL_TENSE,
      type: CONDITIONAL_NAME_2,
      meaning: "Imaginary situations in the present affecting the present",
      example: "If I studied more, I would pass the exam"
    },
    "present/future": {
      needContext: false,
      protasis: PAST_SIMPLE_TENSE,
      apodosis: CONDITIONAL_TENSE + FUTURE_TIME_MARKER_TENSE,
      type: CONDITIONAL_NAME_MIX,
      meaning: "Something that we would do different if the present were different",
      example: "If I had a lot of money, I wouldn't be going to Dubai next week"
    },
    "future/past": {
      needContext: false,
      protasis: PAST_SIMPLE_TENSE + FUTURE_TIME_MARKER_TENSE,
      apodosis: CONDITIONAL_PERFECT_TENSE,
      type: CONDITIONAL_NAME_MIX,
      meaning: "Something that will happen in the future that, if I've known in the past, things would have been different ",
      example: "If my mother wasn't buying one tomorrow, I would have brought that stray dog"
    },
    "future/present": {
      needContext: false,
      protasis: PAST_SIMPLE_TENSE + FUTURE_TIME_MARKER_TENSE,
      apodosis: CONDITIONAL_TENSE,
      type: CONDITIONAL_NAME_MIX,
      meaning: "Complete with something",
      example: "If she didn't have an exam tomorrow, she would be sleeping right now"
    },
    "future/future": {
      needContext: false,
      protasis: PRESENT_TENSE,
      apodosis: FUTURE_TENSE,
      type: CONDITIONAL_NAME_1,
      meaning: "Future consequence of a realistic possibility now or in the future",
      example: "If I prepare the exam, I will pass the exam"
    },
  }

  const [ conditionTense, setConditionTense ] = useState( "" );
  const [ resultTense, setResultTense ] = useState( "" );
  const [ contextValue, setContextValue ] = useState( "" );
  const [ showContext, setShowContext ] = useState( false );
  const [ conditionalClause, setConditionalClause ] = useState( "" );

  const getCombinationKey = function ( condition, result, context ) {

    const pre_key = `${ condition }/${ result }`;

    if ( Combinations[ pre_key ] && Combinations[ pre_key ].needContext ) {
      return `${ condition }/${ result }${ context ? '/' + context : '' }`;
    } else {
      return pre_key;
    }
  }

  const getCombination = function () {
    const combinationKey = getCombinationKey( conditionTense, resultTense, contextValue );
    const combination = Combinations[ combinationKey ];

    setShowContext( combination && combination.needContext );
    setConditionalClause( combination );
  }

  const textToSpeach = function ( elementId ) {
    try {
      const text = document.getElementById( elementId ).textContent;
      const utterance = new SpeechSynthesisUtterance( text );
      window.speechSynthesis.speak( utterance );
    } catch ( error ) {
      console.error( error );
    }
  }

  useEffect( () => {
    getCombination();
  }, [ conditionTense, resultTense, contextValue ] );

  return (
    <div className="App">
      <Header />
      <main>
        <div className='filtersBar'>

          <div>
            <label htmlFor='condition-tense'>Condition time:</label>
            <select
              name='condition-tense'
              id='condition-tense'
              onChange={( e ) => setConditionTense( e.target.value )}
              value={conditionTense}
            >
              <option key="empty" value="">Select one</option>
              {FilterOptions.map( option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ) )}
            </select>
          </div>

          <div>
            <label htmlFor='result-tense'>Result time:</label>
            <select
              name='result-tense'
              id='result-tense'
              onChange={( e ) => setResultTense( e.target.value )}
              value={resultTense}
            >
              <option key="empty" value="">Select one</option>
              {FilterOptions.map( option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ) )}
            </select>
          </div>

          {showContext && (
            <div>
              <label htmlFor='sentence-context'>Conditional context:</label>
              <select
                name='sentence-context'
                id='sentence-context'
                onChange={( e ) => setContextValue( e.target.value )}
                value={contextValue}
              >
                <option key="empty" value="">Select one</option>
                {ContextOptions.map( option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ) )}
              </select>
            </div>
          )}
        </div>
        <div id='details' className='details-container'>

          <fieldset>
            <legend>Form</legend>
            {conditionalClause && conditionalClause.apodosis && conditionalClause.protasis ? (
              <p>if <strong>{conditionalClause.apodosis}</strong><br />
                then <strong>{conditionalClause.protasis}</strong></p>
            ) :
              ( "Waiting for selection...." )}
          </fieldset>
          <fieldset>
            <legend>Meaning</legend>
            {conditionalClause && conditionalClause.apodosis && conditionalClause.protasis && (
              <p>{conditionalClause.meaning}</p> )}
          </fieldset>
          <fieldset>
            <legend>Examples</legend>
            {conditionalClause && conditionalClause.example && (
              <>
                <FontAwesomeIcon
                  icon={faVolumeUp}
                  className="text-to-speach-icon"
                  onClick={() => textToSpeach( 'exampleContainer' )}
                />
                <p id='exampleContainer'>{conditionalClause.example}</p>
              </>
            )}
          </fieldset>
        </div>
      </main>
    </div>
  );
}

export default Home;
