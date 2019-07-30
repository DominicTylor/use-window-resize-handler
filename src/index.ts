import { useEffect, useState } from 'react';

let timer: number | undefined;
let isResizeWindowHandlerSet: boolean = false;
const ResizeHandlers: { [key in symbol]: () => void } = {};
const handleWindowResize = () =>
    Object.getOwnPropertySymbols(ResizeHandlers).forEach((key) =>
        ResizeHandlers[key]()
    );
const windowResizeDebounce = () => {
    // @ts-ignore
    clearTimeout(timer);
    // @ts-ignore
    timer = setTimeout(handleWindowResize, 100);
};

const useWindowResizeHandler = (
    fn: (...args: any) => void,
    ...args: any
) => {
    const [symbolFn] = useState<symbol>(Symbol());

    ResizeHandlers[symbolFn] = fn.bind(null, ...args);

    if (!isResizeWindowHandlerSet) {
        isResizeWindowHandlerSet = true;
        // @ts-ignore
        window.addEventListener('resize', windowResizeDebounce);
    }

    useEffect(() => {
        fn(...args);

        return () => {
            delete ResizeHandlers[symbolFn];

            if (!Object.getOwnPropertySymbols(ResizeHandlers).length) {
                isResizeWindowHandlerSet = false;
                // @ts-ignore
                window.removeEventListener('resize', windowResizeDebounce);
            }
        };
    }, []);
};

export default useWindowResizeHandler;
