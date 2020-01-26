import { useEffect, useState } from 'react';

let timer: number;
let isResizeWindowHandlerSet = false;
const ResizeHandlers = {};

const handleWindowResize = (): void => {
    Object.getOwnPropertySymbols(ResizeHandlers).forEach((key: symbol) => ResizeHandlers[key]());
}

const windowResizeDebounce = (): void => {
    window.clearTimeout(timer);
    timer = window.setTimeout(handleWindowResize, 100);
}

const useWindowResizeHandler = (fn: Function, ...args: any): void => {
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

export default useWindowResizeHandler;
