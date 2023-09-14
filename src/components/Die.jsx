import React from 'react';
import { firstFace, secondFace, thirdFace, fourthFace, fifthFace, sixthFace } from './DieFaces';

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? '#E6C0C7' : '#FFFFFF'
    }
    
    let classNames = []
    if (!props.isHeld && props.isShaking) {
        classNames.push('shake-animation');
    }
    let faceComponent

    switch (props.value) {
        case 1:
            faceComponent = firstFace({ style: styles })
            break
        case 2:
            faceComponent = secondFace({ style: styles })
            break
        case 3:
            faceComponent = thirdFace({ style: styles })
            break
        case 4:
            faceComponent = fourthFace({ style: styles })
            break
        case 5:
            faceComponent = fifthFace({ style: styles })
            break
        case 6:
            faceComponent = sixthFace({ style: styles })
            break
    }

    return (
        <div
            className={classNames}
            onClick={props.holdDice}
            >
            {faceComponent }
        </div>
    )
}