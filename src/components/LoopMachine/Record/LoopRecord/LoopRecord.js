import React, { useEffect, useState } from 'react';
import classes from './LoopRecord.module.css';

import bass_warwick from '../../../../assets/sounds/bass_warwick.mp3';
import electric_guitar from '../../../../assets/sounds/electric_guitar.mp3';
import funk from '../../../../assets/sounds/funk.mp3';
import groove_tangu from '../../../../assets/sounds/groove_tangu.mp3';
import maze_politics from '../../../../assets/sounds/maze_politics.mp3';
import pas_groove from '../../../../assets/sounds/pas_groove.mp3';
import silent_star from '../../../../assets/sounds/silent_star.mp3';
import stompy_slosh from '../../../../assets/sounds/stompy_slosh.mp3';
import stutter_breakbeats from '../../../../assets/sounds/stutter_breakbeats.mp3';

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
    'fas fa-drum fa-lg',
    'fa fa-ice-cream fa-lg',
    'fas fa-guitar fa-lg',
    'fas fa-music fa-lg',
    'fab fa-affiliatetheme fa-lg',
    'fas fa-anchor fa-lg',
    'fas fa-ankh fa-lg',
    'fas fa-archway fa-lg',
    'fas fa-bicycle fa-lg',
];

export default function LoopRecord({ loop, index }) {
    const [obj, setObj] = useState({});
    useEffect(() => {
        let newObj = {};
        for (const index of loop) {
            newObj[sounds[index]] = {
                audio: new Audio(sounds[index]),
                icon: icons[index],
            };
        }

        setObj(newObj);
        // eslint-disable-next-line
    }, []);

    let form = Object.values(obj).map((x) => (
        <div className={classes.Icons}>
            <i className={x.icon} style={{ paddingRight: '7px' }}></i>
        </div>
    ));



    //  PLAY HISTORY ACTION
    const play = () => {
        Object.values(obj).forEach((ob) => {
            ob.audio.play();
        });
    };


    //  STOP HISTORY ACTION
    const stop = () => {
        Object.values(obj).forEach((ob) => {
            ob.audio.pause();
            ob.audio.currentTime = 0;
        });
    };
    return (
        <div>
            <div>Loop Number: {index + 1}</div>
            <div className={classes.Container}>
                <div className={classes.BtnsContainer}>
                    <i
                        onClick={play}
                        style={{
                            color: 'green',
                            paddingRight: '7px',
                            cursor: 'pointer',
                        }}
                        className="fas fa-play fa-lg"
                    ></i>
                    <i
                        onClick={stop}
                        style={{ color: 'red', cursor: 'pointer' }}
                        className="fas fa-stop fa-lg"
                    ></i>
                </div>
                <div className={classes.IconsContainer}>{form}</div>
            </div>
        </div>
    );
}
