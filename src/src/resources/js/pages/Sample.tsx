import { FC, useEffect } from 'react';

const Sample: FC = () => {
    useEffect(() => {
        console.log("Hello world");
        return () => {
            console.log("Goodbye world");
        }
    }, []);

    return (
        <div>
            これはサンプルです。
        </div>
    );
};

export default Sample;
