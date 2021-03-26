import React from 'react';
import Converter from './Converter';

function ConverterDispatch(widget, parameters) {
    switch (widget) {
        case 'converter':
            return <Converter props={parameters} />;
        default:
            return;
    }
}

export default ConverterDispatch;