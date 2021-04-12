


// 
// PAD COMPONENT MANAGES (PLAY/STOP) OF THE AUDIO FILE 
// 


import classes from './Pad.module.css';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

export default React.memo(function Pad({
    audio,
    padOnHandler,
    sound,
    changeIsPlaying,
}) {
    // eslint-disable-next-line
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        console.log('--------------PadDidMount-----------');

        audio.audio.addEventListener('ended', () => {
            setPlaying(false);
            changeIsPlaying(sound, false);
        });

        audio.audio.removeEventListener('ended', () => {
            setPlaying(false);
            changeIsPlaying(sound, false);
        });

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (audio.isPlaying) {
            setPlaying(true);
        }
    }, [audio.isPlaying]);

    return (
        <div
            className={`${classes.Pad} ${
                audio.isPlaying ? classes.Running : null
            } `}
        >
            <div className={classes.Icon}>
                <i className={audio.icon + ' fa-3x'}></i>
            </div>
            <Form className={classes.Switcher}>
                <Form.Check
                    type="switch"
                    id={sound}
                    onClick={() => {
                        if (audio.isPlaying) {
                            audio.audio.pause();
                            audio.audio.currentTime = 0;
                            setPlaying(false);
                            changeIsPlaying(sound, false);
                        }
                        padOnHandler(sound);
                    }}
                />
            </Form>
        </div>
    );
});
