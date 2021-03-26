import React from 'react';
import TestNews from './NewApp';
import NewsByDdate from './NewsDate';
import NewsTopic from './NewsTopic';

function NewsDispatch(widget, parameters) {
    switch (widget) {
        case 'news':
            return <TestNews props={parameters} />;
        case 'date':
            return <NewsByDdate props={parameters} />;
        case 'topic':
            return <NewsTopic props={parameters} />
        default:
            return;
    }
}

export default NewsDispatch;