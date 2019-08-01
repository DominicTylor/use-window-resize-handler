import { useEffect, useState } from 'react';

let timer;
let isResizeWindowHandlerSet = false;
const ResizeHandlers = {};
const handleWindowResize = () =>
    Object.getOwnPropertySymbols(ResizeHandlers).forEach((key) =>
        ResizeHandlers[key]()
    );
const windowResizeDebounce = () => {
    clearTimeout(timer);
    timer = setTimeout(handleWindowResize, 100);
};

export const useWindowResizeHandler = (fn, ...args) => {
    const [symbolFn] = useState(Symbol());

    ResizeHandlers[symbolFn] = fn.bind(null, ...args);

    if (!isResizeWindowHandlerSet) {
        isResizeWindowHandlerSet = true;
        window.addEventListener('resize', windowResizeDebounce);
    }

    useEffect(() => {
        fn(...args);

        return () => {
            delete ResizeHandlers[symbolFn];

            if (!Object.getOwnPropertySymbols(ResizeHandlers).length) {
                isResizeWindowHandlerSet = false;
                window.removeEventListener('resize', windowResizeDebounce);
            }
        };
    }, []);
};
