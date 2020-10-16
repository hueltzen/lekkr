const PageTransition = {
    in: {
        opacity: 1,
        x: 0
    },
    out: {
        opacity: 0,
        x: '100vw'
    },
    exit: {
        opacity: 0
    },
    transition: { 
        type: 'tween', 
        duration: .4
    }
}

export default PageTransition;