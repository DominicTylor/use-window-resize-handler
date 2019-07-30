# use-window-resize-handler

example:

    const resizeHandler = (a, b, c) => {
        /* some magic here */
    }

    useWindowResizeHandler(resizeHandler, argsA, argsB, argsC)

Hook will add only one listener per resize for all uses in components. The handler will be called in the useEffect when the hook is first called, later it will be called after the resize with debounce. You can pass arguments after the handler, separated by commas, they are all passed to the handler when called.
