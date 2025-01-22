import React, { useState } from 'react';
import UserHistory from './UserHistory';
import UserInputs from './UserInputs';

const User = () => {
    return (
        <div>
            <UserHistory />
            <UserInputs />
        </div>
    );
};

export default User;
