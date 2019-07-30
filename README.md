# use-window-resize-handler

example:

    const resizeHandler = (a, b, c) => {
        /* some magic here */
    }

    useWindowResizeHandler(resizeHandler, argsA, argsB, argsC)

Hook add only one listener to window for all components usages.
And after resize call all handlers with receive arguments.