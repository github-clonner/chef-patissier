import React from 'react';
import DefaultLayout from '../../core/templates/layouts/default.js';

const overrideHead = (DefaultHead) => {
    return (props) => (
        <>
            <DefaultHead {...props}/>
        </>
    );
};

const Index = (props) => (
    <DefaultLayout {...props} head={overrideHead}>

    </DefaultLayout>
);

export default Index;
