// MAIN COMPONENT

import React, { useEffect, useState } from 'react';
import Pad from './Pad/Pad';
import classes from './LoopMachine.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Record from './Record/Record';

import bass_warwick from '../../assets/sounds/bass_warwick.mp3';
import electric_guitar from '../../assets/sounds/electric_guitar.mp3';
import funk from '../../assets/sounds/funk.mp3';
import groove_tangu from '../../assets/sounds/groove_tangu.mp3';
import maze_politics from '../../assets/sounds/maze_politics.mp3';
import pas_groove from '../../assets/sounds/pas_groove.mp3';
import silent_star from '../../assets/sounds/silent_star.mp3';
import stompy_slosh from '../../assets/sounds/stompy_slosh.mp3';
import stutter_breakbeats from '../../assets/sounds/stutter_breakbeats.mp3';

// IMPORTED SOUNDS LIST
const sounds = [
    bass_warwick,
    electric_guitar,
    funk,
    groove_tangu,
    maze_politics,
    pas_groove,
    silent_star,
    stompy_slosh,
    stutter_breakbeats,
];

const icons = [
    'fas fa-drum',
    'fa fa-ice-cream',
    'fas fa-guitar',
    'fas fa-music',
    'fab fa-affiliatetheme',
    'fas fa-anchor',
    'fas fa-ankh',
    'fas fa-archway',
    'fas fa-bicycle',
];

export default function LoopMachine() {
    const [soundsObjects, setSoundsObjects] = useState(null);
    const [machineSwitch, setMachineSwitch] = useState(false);
    const [machinePlaying, setMachinePlaying] = useState(false);
    const [recordList, setRecordList] = useState([]);
    const [recordState, setRecordState] = useState(false);

    useEffect(() => {
        // INITIALIZATION OF soundsObjects WITH:
        // sound: {sound: (Audio Object), isOn: false, isPlaying: false }
        // isOn: stands for pad switcher status
        // isPlaying: stands for pads (playing/not playing) status

        sounds.forEach((sound, index) => {
            setSoundsObjects((prev) => ({
                ...prev,
                [sound]: {
                    audio: new Audio(sound),
                    isOn: false,
                    isPlaying: false,
                    icon: icons[index],
                    index: index,
                },
            }));
        });
    }, []);

    // changeIsPlaying stands for audios isPlaying status
    // sound: (audio name)
    // isPlaying: (new isPlaying status)

    const changeIsPlaying = (sound, isPlaying) => {
        setSoundsObjects((prev) => ({
            ...prev,
            [sound]: { ...prev[sound], isPlaying: isPlaying },
        }));
    };

    // padOnHandler stands for pad switcher changings
    // id: (audio name)
    const padOnHandler = (id) => {
        setSoundsObjects((prev) => {
            return {
                ...prev,
                [id]: {
                    ...prev[id],
                    isOn: !prev[id].isOn,
                    isPlaying: false,
                },
            };
        });
    };

    // onPlayClickHandler stands for machine play click action
    const onPlayClickHandler = () => {
        if (machineSwitch) {
            setMachinePlaying(true);

            const newSoundsObjects = { ...soundsObjects };

            Object.values(newSoundsObjects).forEach((value) => {
                if (value.isOn) {
                    value.isPlaying = true;
                    value.audio.play();
                }
            });

            setSoundsObjects(newSoundsObjects);
            if (recordState) {
                startRecordingHandler();
            }
        }
    };

    // onPlayClickHandler stands for machine stop click action
    const onStopClickHandler = () => {
        setMachinePlaying(false);
        let newObj = { ...soundsObjects };
        Object.values(newObj).forEach((value) => {
            value.audio.pause();
            value.audio.currentTime = 0;
            value.isPlaying = false;
        });

        setSoundsObjects(newObj);
    };

    // MAPPING MP3s TO Pad components
    const soundsList = sounds.map((sound, index) => {
        return (
            soundsObjects && (
                <Pad
                    audio={soundsObjects[sound]}
                    sound={sound}
                    key={index}
                    padOnHandler={padOnHandler}
                    changeIsPlaying={changeIsPlaying}
                    soundsObjects={soundsObjects}
                />
            )
        );
    });

    // machineSwitcherHandler stands for machine switcher changing actions
    const machineSwitcherHandler = () => {
        if (machineSwitch) {
            onStopClickHandler();
            setMachineSwitch(false);
        } else {
            setMachineSwitch(true);
        }
    };

    const cloneArray = (array) => {
        return array.map((o) => [...o]);
    };

    //  Start loop recording action
    const startRecordingHandler = () => {
        let newRecordLoop = [];
        Object.keys(soundsObjects).forEach((key) => {
            if (soundsObjects[key].isOn) {
                newRecordLoop.push(soundsObjects[key].index);
            }
        });
        const recordListCopy = recordList;
        recordListCopy.push(newRecordLoop);
        // console.log(t, 'before');
        setRecordList(cloneArray(recordListCopy));
        // console.log(recordList);
    };

    if (machinePlaying && soundsObjects) {
        let allPaused = true;
        Object.values(soundsObjects).forEach((value) => {
            if (value.isPlaying) {
                allPaused = false;
            }
        });

        let allIsOff = false;

        Object.values(soundsObjects).forEach((value) => {
            if (value.isOn) {
                allIsOff = true;
            }
        });

        if (allPaused && allIsOff) {
            onPlayClickHandler();
        }
    }

    return (
        <div className={classes.Page}>
            {' '}
            <div className={classes.LoopMachine}>
                <div
                    className={`${classes.MachineState} ${
                        machineSwitch ? classes.On : classes.Off
                    }`}
                >
                    {machineSwitch ? 'ON' : 'OFF'}
                </div>
                <Form>
                    <strong>Machine State</strong>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        onClick={machineSwitcherHandler}
                    />
                </Form>
                <div className={classes.PadsGrid}>{soundsList}</div>

                <Button
                    className={classes.Btn}
                    variant="success"
                    onClick={() => {
                        if (!machinePlaying) {
                            onPlayClickHandler();
                        }
                    }}
                >
                    Play
                    <i
                        className="fas fa-play"
                        style={{ marginLeft: '10px' }}
                    ></i>
                </Button>
                <Button
                    className={classes.Btn}
                    variant="danger"
                    onClick={() => {
                        onStopClickHandler();
                    }}
                >
                    Stop
                    <i
                        className="fas fa-stop"
                        style={{ marginLeft: '10px' }}
                    ></i>
                </Button>
                <div className={classes.Record}>
                    <Form>
                        <strong style={{ color: 'red' }}>Record</strong>
                        <Form.Check
                            type="switch"
                            id="record-state"
                            onClick={() => {
                                if (recordState) {
                                    setRecordState(false);
                                } else if (!recordState) {
                                    setRecordList([]);
                                    setRecordState(true);
                                }
                            }}
                        />
                    </Form>
                </div>
            </div>
            {!recordState && recordList.length > 0 ? (
                <Record recordList={recordList} sounds={sounds} />
            ) : null}
        </div>
    );
}
