import React, { memo } from 'react';
import LoopRedcord from './LoopRecord/LoopRecord';
import classes from './Record.module.css';

//
//  RECORD COMPONENT CONTAINS LOOPS HISTORIES FORM
//

export default memo(function Record({ recordList }) {
    const list = recordList.map((loop, index) => (
        <LoopRedcord loop={loop} index={index} />
    ));
    return (
        <div className={classes.Record}>
            <div>
                <h1>Loops history</h1>
                {list}
            </div>
        </div>
    );
});
